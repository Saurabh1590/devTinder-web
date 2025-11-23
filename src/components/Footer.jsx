// src/components/Footer.jsx
import React from "react";
import { Github, Twitter, Linkedin, GitBranch, Wifi } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#161b22] border-t border-[#30363d] text-[#8b949e] font-mono text-sm fixed bottom-0 w-full z-40 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-8">
        
        {/* Left Side: Status Indicators */}
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <GitBranch size={14} />
            <span>main*</span>
          </a>
          
          <div className="flex items-center gap-1 hover:text-white cursor-pointer">
             <div className="w-2 h-2 rounded-full bg-[#238636] animate-pulse"></div>
             <span className="text-xs">System: Online</span>
          </div>

          <span className="hidden lg:inline text-xs opacity-50">
            © {currentYear} DevTinder Inc.
          </span>
        </div>

        {/* Right Side: Social / Tech Links */}
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 text-xs">
             <span>UTF-8</span>
             <span>React</span>
             <span>{currentYear}</span>
           </div>
           
           <div className="h-4 w-[1px] bg-[#30363d]"></div>

           <div className="flex gap-3">
              <a href="#" className="hover:text-[#58a6ff] transition-colors"><Github size={14} /></a>
              <a href="#" className="hover:text-[#58a6ff] transition-colors"><Twitter size={14} /></a>
              <a href="#" className="hover:text-[#58a6ff] transition-colors"><Linkedin size={14} /></a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;