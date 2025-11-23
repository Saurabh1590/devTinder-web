import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { Terminal, MessageSquare, ShieldCheck, Ghost, Signal } from "lucide-react";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!connections) {
      fetchConnections();
    }
  }, []);

  // --- EMPTY STATE: TERMINAL ERROR ---
  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center font-mono text-[#c9d1d9] p-4">
         <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] p-8 shadow-xl rounded-sm">
             <div className="flex items-center gap-2 border-b border-[#30363d] pb-4 mb-6 text-[#ff7b72]">
                <Ghost size={24} />
                <span className="font-bold text-lg">404_CONNECTIONS_NOT_FOUND</span>
             </div>
             
             <p className="text-[#8b949e] mb-6">
               Network scan complete. No active peers discovered in your subnet.
             </p>
             
             {/* Fake Terminal Output */}
             <div className="bg-[#0d1117] p-4 border border-[#30363d] text-sm font-mono mb-6">
               <div className="flex gap-2 mb-1">
                  <span className="text-[#238636]">➜</span> 
                  <span className="text-[#58a6ff]">~</span> 
                  <span className="text-[#c9d1d9]">netstat -a | grep ESTABLISHED</span>
               </div>
               <div className="text-[#8b949e] italic">
                  (empty result)
               </div>
             </div>

             <div className="text-center">
                <Link to="/" className="inline-flex items-center gap-2 text-[#58a6ff] hover:text-white hover:underline decoration-2 underline-offset-4 text-sm transition-colors">
                  <Terminal size={14} />
                  Return to Feed to initialize handshake
                </Link>
             </div>
         </div>
      </div>
    );
  }

  // --- MAIN LIST: NETWORK MONITOR ---
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-mono min-h-screen text-[#c9d1d9]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-[#30363d] pb-4">
         <div className="flex items-center gap-3">
            <div className="bg-[#238636]/20 p-2 rounded-sm">
                <ShieldCheck className="text-[#238636]" size={24} />
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Active Sessions</h1>
                <p className="text-xs text-[#8b949e]">Secure connections established via TLS 1.3</p>
            </div>
         </div>
         <div className="text-xs bg-[#161b22] border border-[#30363d] px-3 py-1 text-[#8b949e]">
            Total Peers: <span className="text-[#c9d1d9] font-bold">{connections.length}</span>
         </div>
      </div>

      {/* Connection Rows */}
      <div className="grid grid-cols-1 gap-3">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, about, photoUrl } = connection;

          return (
            <div
              key={_id}
              className="group relative flex flex-col md:flex-row items-center p-4 bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {/* Left: Signal Indicator (Decorative) */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#30363d] group-hover:bg-[#238636] transition-colors"></div>

              {/* Avatar Section */}
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 relative pl-2">
                <div className="w-16 h-16 border border-[#30363d] p-[2px] bg-[#0d1117]">
                   <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                {/* Status Dot */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0d1117] flex items-center justify-center rounded-full border border-[#30363d]">
                    <div className="w-2 h-2 bg-[#238636] rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-grow text-center md:text-left w-full md:w-auto">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                    <h2 className="text-lg font-bold text-[#c9d1d9] group-hover:text-[#58a6ff] transition-colors">
                    {firstName} {lastName}
                    </h2>
                    {age && (
                        <span className="text-[10px] text-[#8b949e] border border-[#30363d] px-1 bg-[#0d1117]">
                            v{age}.0
                        </span>
                    )}
                </div>
                
                <p className="text-[#8b949e] text-sm line-clamp-1 max-w-xl mx-auto md:mx-0">
                   {about || "// User has not configured a bio string."}
                </p>

                {/* Meta Data (Hidden by default, shown on hover) */}
                <div className="mt-2 text-[10px] text-[#8b949e] flex items-center justify-center md:justify-start gap-4 opacity-60 group-hover:opacity-100 transition-opacity font-mono">
                    <span className="flex items-center gap-1"><Signal size={10}/> Latency: 24ms</span>
                    <span>•</span>
                    <span>ID: {_id.slice(-8)}...</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 md:mt-0 md:ml-auto pl-4 border-l border-[#30363d] border-dashed border-opacity-0 md:border-opacity-100">
                <Link to={"/chat/" + _id}>
                  <button className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2.5 text-sm font-bold border border-[rgba(240,246,252,0.1)] transition-all active:translate-y-[1px]">
                    <MessageSquare size={16} />
                    <span>ssh {firstName.toLowerCase()}</span>
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;