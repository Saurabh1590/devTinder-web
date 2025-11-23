// src/components/NavBar.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Terminal, User, LogOut, Zap, Bell, Code2 } from "lucide-react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    // Sticky, High Z-Index, Hard Border Bottom
    <div className="fixed top-0 w-full z-50 bg-[#0d1117] border-b border-[#30363d] font-mono text-[#c9d1d9]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-1 flex items-center gap-4">
          <Link to={user ? "/" : "/login"} className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
            <div className="bg-[#238636] p-1 rounded-sm">
                <Terminal size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              DevTinder<span className="text-[#238636]">_</span>
            </span>
          </Link>
        </div>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-6">
            {/* Welcome Text (Hidden on mobile) */}
            <div className="hidden md:block text-sm">
              <span className="text-[#8b949e]">user:</span> 
              <span className="text-[#79c0ff] ml-1">{user.firstName}</span>
            </div>

            {/* Premium CTA */}
            <Link to="/premium" className="hidden md:flex items-center gap-1 text-xs font-bold text-[#e3b341] border border-[#e3b341] px-3 py-1 hover:bg-[#e3b341] hover:text-[#0d1117] transition-colors uppercase tracking-wider">
               <Zap size={14} /> PRO
            </Link>

            {/* Dropdown Menu */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-[#161b22] rounded-none"
              >
                <div className="w-9 h-9 ring-2 ring-[#30363d] p-[2px] rounded-sm">
                  {/* Square Avatar with slight rounding */}
                  <img 
                    alt="Profile" 
                    src={user.photoUrl} 
                    className="rounded-sm object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Dropdown Content - Styled like a Context Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] w-56 p-0 shadow-2xl bg-[#161b22] border border-[#30363d] rounded-sm text-[#c9d1d9]"
              >
                <li className="border-b border-[#30363d]">
                    <Link to="/profile" className="py-3 px-4 hover:bg-[#0d1117] hover:text-[#58a6ff] rounded-none flex gap-3">
                        <User size={16} />
                        Profile Config
                    </Link>
                </li>
                <li className="border-b border-[#30363d]">
                    <Link to="/connections" className="py-3 px-4 hover:bg-[#0d1117] hover:text-[#58a6ff] rounded-none flex gap-3">
                        <Code2 size={16} />
                        Connections
                    </Link>
                </li>
                <li className="border-b border-[#30363d]">
                    <Link to="/requests" className="py-3 px-4 hover:bg-[#0d1117] hover:text-[#58a6ff] rounded-none flex gap-3">
                        <Bell size={16} />
                        Pull Requests
                        <span className="badge badge-sm bg-[#238636] text-white border-none rounded-sm h-5">New</span>
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="py-3 px-4 hover:bg-[#da3633] hover:text-white rounded-none flex gap-3 text-[#ff7b72]">
                        <LogOut size={16} />
                        Exit(0)
                    </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Login Button for non-auth users
          <Link to="/login" className="text-[#c9d1d9] hover:text-white font-mono text-sm hover:underline decoration-[#238636] decoration-2 underline-offset-4">
            ~/login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;