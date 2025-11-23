// src/components/UserCard.jsx
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";
import { GitMerge, GitPullRequest, XCircle, Code2, MapPin } from "lucide-react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    // Card Container - Fixed width, "IDE" aesthetic
    <div className="w-full max-w-sm md:max-w-md bg-[#0d1117] border border-[#30363d] rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden font-mono group">
      
      {/* --- IDE HEADER --- */}
      <div className="bg-[#161b22] border-b border-[#30363d] p-3 flex items-center justify-between">
         <div className="flex items-center gap-2 text-xs text-[#8b949e]">
            <Code2 size={14} className="text-[#58a6ff]" />
            <span>{firstName.toLowerCase()}_profile.json</span>
         </div>
         <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#30363d]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#30363d]"></div>
         </div>
      </div>

      {/* --- IMAGE & CONTENT --- */}
      <div className="p-0">
        
        {/* Image Banner */}
        <div className="relative h-64 overflow-hidden bg-[#161b22] border-b border-[#30363d]">
           <img
            src={photoUrl}
            alt={firstName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          {/* Age Badge overlay */}
          {age && (
            <div className="absolute bottom-3 right-3 bg-[#0d1117]/90 border border-[#30363d] px-2 py-1 text-xs text-[#c9d1d9] shadow-sm backdrop-blur-md">
              v{age}.0.0
            </div>
          )}
        </div>

        {/* Code Content Area */}
        <div className="p-5">
           
           {/* Name as Variable Declaration */}
           <div className="mb-4">
              <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">developer</span> = <span className="text-[#a5d6ff]">"{firstName} {lastName}"</span>;
           </div>

           {/* "About" as Comments */}
           <div className="mb-4 text-sm text-[#8b949e]">
              /** <br/>
              &nbsp;* {about || "No description provided."} <br/>
              &nbsp;*/
           </div>

           {/* Skills Array */}
           <div className="mb-6">
              <div className="text-[#8b949e] text-xs mb-2 flex items-center gap-1">
                <GitPullRequest size={12} />
                <span>Tech Stack:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span key={index} className="bg-[#161b22] border border-[#30363d] text-[#79c0ff] px-2 py-1 text-xs hover:border-[#58a6ff] transition-colors cursor-default">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-[#8b949e] text-xs">// No skills listed</span>
                )}
              </div>
           </div>

           {/* --- ACTION BAR --- */}
           <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#30363d]">
              
              {/* IGNORE Button */}
              <button
                onClick={() => handleSendRequest("ignored", _id)}
                className="flex items-center justify-center gap-2 py-3 bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:bg-[#da3633] hover:text-white hover:border-[#da3633] transition-all active:scale-95 group/btn"
              >
                 <XCircle size={18} />
                 <span className="text-xs font-bold">GIT IGNORE</span>
              </button>

              {/* LIKE Button */}
              <button
                onClick={() => handleSendRequest("interested", _id)}
                className="flex items-center justify-center gap-2 py-3 bg-[#238636] text-white border border-[#2ea043] hover:bg-[#2ea043] hover:shadow-[0_0_10px_rgba(46,160,67,0.5)] transition-all active:scale-95"
              >
                 <GitMerge size={18} />
                 <span className="text-xs font-bold">MERGE</span>
              </button>

           </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;