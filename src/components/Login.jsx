// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { Terminal, Code2, AlertCircle } from "lucide-react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // Toggle form and clear errors
  const toggleFormState = () => {
    setIsLoginForm(!isLoginForm);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 font-mono selection:bg-[#58a6ff] selection:text-[#0d1117]">
      
      {/* --- TERMINAL WINDOW CONTAINER --- */}
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] shadow-2xl rounded-sm overflow-hidden">
        
        {/* Window Header / Title Bar */}
        <div className="bg-[#010409] p-3 border-b border-[#30363d] flex items-center justify-between">
           <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 cursor-pointer"></div>
           </div>
           <div className="text-[#8b949e] text-xs flex items-center gap-2">
              <Terminal size={12} />
              <span>~/auth/{isLoginForm ? "login.js" : "signup.js"}</span>
           </div>
           <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Window Content */}
        <div className="p-8">
          
          {/* Header Logo Area */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#238636] rounded-sm mb-4 shadow-lg">
                <Code2 className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-[#c9d1d9] tracking-tight">
              {isLoginForm ? "System Login" : "Initialize User"}
            </h1>
            <p className="text-[#8b949e] text-xs mt-2">
              {isLoginForm 
                ? "Enter your credentials to access the mainframe." 
                : "Configure your parameters to join the network."}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label py-1"><span className="text-xs text-[#8b949e]">const firstName =</span></label>
                  <input
                    type="text"
                    value={firstName}
                    placeholder='"John"'
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff] placeholder-[#484f58]"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="text-xs text-[#8b949e]">const lastName =</span></label>
                  <input
                    type="text"
                    value={lastName}
                    placeholder='"Doe"'
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff] placeholder-[#484f58]"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-control">
              <label className="label py-1"><span className="text-xs text-[#8b949e]">const email =</span></label>
              <input
                type="email"
                value={emailId}
                placeholder='"developer@example.com"'
                className="w-full bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff] placeholder-[#484f58]"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label py-1"><span className="text-xs text-[#8b949e]">const password =</span></label>
              <input
                type="password"
                value={password}
                placeholder="*******"
                className="w-full bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff] placeholder-[#484f58]"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Output Console */}
            {error && (
               <div className="bg-[#3e1b1b] border border-[#ff7b72] p-3 mt-2 flex gap-2 items-start">
                  <AlertCircle size={16} className="text-[#ff7b72] mt-0.5 shrink-0" />
                  <p className="text-[#ff7b72] text-xs font-mono break-all">
                    Error: {error}
                  </p>
               </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4">
              <button
                className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-2.5 text-sm border border-[rgba(240,246,252,0.1)] transition-all active:scale-[0.98]"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Execute Login()" : "git push --force"}
              </button>
            </div>

            {/* Toggle Link */}
            <div className="text-center mt-6 border-t border-[#30363d] pt-4">
              <button
                type="button"
                onClick={toggleFormState}
                className="text-xs text-[#58a6ff] hover:text-[#79c0ff] hover:underline decoration-2 underline-offset-4"
              >
                {isLoginForm 
                  ? "// New user? Initialize repository here" 
                  : "// Already committed? Checkout main branch"}
              </button>
            </div>

          </form>
        </div>
        
        {/* Footer Status Bar */}
        <div className="bg-[#0d1117] border-t border-[#30363d] px-3 py-1 flex justify-between text-[10px] text-[#8b949e]">
            <span>UTF-8</span>
            <span>Javascript</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#238636]"></div> Ready</span>
        </div>

      </div>
    </div>
  );
};

export default Login;