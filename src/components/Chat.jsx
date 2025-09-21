import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  
  // Ref for the messages container to enable auto-scrolling
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll whenever new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const fetchChatMessages = async () => {
    try {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true,
        });

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text, createdAt } = msg; // Assuming you have a createdAt field
            return {
                senderId: senderId._id,
                firstName: senderId.firstName,
                lastName: senderId.lastName,
                text,
                timestamp: new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
        });
        setMessages(chatMessages || []);
    } catch (error) {
        console.error("Failed to fetch chat messages:", error);
    }
  };

  useEffect(() => {
    if (targetUserId) {
        fetchChatMessages();
    }
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ senderId, firstName, lastName, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
            senderId, 
            firstName, 
            lastName, 
            text, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user.firstName]);

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (newMessage.trim() === "") return; // Don't send empty messages

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto m-5 h-[70vh] flex flex-col">
      <div className="flex flex-col flex-grow w-full max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b bg-base-300">
          <h1 className="text-xl font-semibold">Chat Room</h1>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => {
            const isCurrentUserSender = userId === msg.senderId;
            return (
              <div
                key={index}
                className={`chat ${
                  isCurrentUserSender ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-header text-xs opacity-70 mb-1">
                  {`${msg.firstName} ${msg.lastName}`}
                  <time className="ml-2">{msg.timestamp}</time>
                </div>
                <div
                  className={`chat-bubble ${
                    isCurrentUserSender ? "chat-bubble-primary" : ""
                  }`}
                >
                  {msg.text}
                </div>
                <div className="chat-footer opacity-50 text-xs mt-1">Seen</div>
              </div>
            );
          })}
          {/* Empty div to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-base-300 flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

//w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col