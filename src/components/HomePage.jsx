// src/components/HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Heart, Terminal, Coffee, GitPullRequest, Cpu, Zap } from 'lucide-react';
import Footer from './Footer';

const HomePage = () => {
  const [hoveredSnippet, setHoveredSnippet] = useState(null);

  // Hard edge animation variants (Snappy, not floaty)
  const glitchVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.1, type: "spring", stiffness: 300 } }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono overflow-x-hidden selection:bg-[#58a6ff] selection:text-[#0d1117]">

      {/* --- HERO SECTION: Split Layout (Asymmetrical) --- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] border-b border-[#30363d]">
        
        {/* Left: The Hook */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-center border-r border-[#30363d] relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#30363d 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={glitchVariant}
            className="z-10"
          >
            <div className="inline-block bg-[#238636] text-white px-2 py-1 text-xs font-bold mb-6 border border-[#2ea043] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              STATUS: DEPLOYED
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-none">
              <span className="text-[#7ee787]">git checkout</span><br />
              <span className="text-[#ff7b72]">-b</span> partner
            </h1>

            <p className="text-xl text-[#8b949e] max-w-xl mb-8 leading-relaxed">
              Stop trying to explain why you spent 4 hours configuring Neovim to "normal" people. 
              Find someone who accepts your pull requests.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="bg-[#238636] text-white px-8 py-4 font-bold text-lg border border-white hover:bg-[#2ea043] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#ffffff] transition-all active:translate-y-[0px] active:shadow-none">
                Start Matching()
              </Link>
              <button className="px-8 py-4 font-bold text-[#58a6ff] border border-[#30363d] hover:bg-[#161b22]">
                View_Source
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right: The "Live" Feed (Visual Chaos) */}
        <div className="lg:col-span-5 bg-[#161b22] relative overflow-hidden flex items-center justify-center p-4">
           {/* Floating Elements that aren't "blobs" but code blocks */}
           <div className="relative w-full max-w-md">
              <motion.div 
                className="bg-[#0d1117] border border-[#30363d] p-4 shadow-2xl mb-4 rotate-[-2deg]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-2 border-b border-[#30363d] pb-2">
                  <span className="text-xs text-[#8b949e]">user_id: 8472</span>
                  <span className="text-xs text-[#238636] flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#238636]"></div> Online</span>
                </div>
                <div className="text-sm">
                  <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">Sarah</span> = &#123; <br/>
                  &nbsp;&nbsp;stack: [<span className="text-[#a5d6ff]">'Rust'</span>, <span className="text-[#a5d6ff]">'WASM'</span>],<br/>
                  &nbsp;&nbsp;coffee: <span className="text-[#79c0ff]">true</span>,<br/>
                  &nbsp;&nbsp;tabs: <span className="text-[#ff7b72]">false</span> <span className="text-[#8b949e]">// Space gang</span><br/>
                  &#125;;
                </div>
                <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-[#1f6feb] text-white py-1 text-xs font-bold hover:bg-[#388bfd]">CONNECT</button>
                    <button className="flex-1 bg-[#21262d] text-[#8b949e] py-1 text-xs font-bold border border-[#30363d] hover:text-[#ff7b72]">IGNORE</button>
                </div>
              </motion.div>

              <motion.div 
                className="bg-[#0d1117] border border-[#30363d] p-4 shadow-xl absolute top-20 -right-4 rotate-[3deg] blur-[1px] hover:blur-0 transition-all z-0"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.6 }}
                transition={{ delay: 0.4 }}
              >
                 <div className="text-sm opacity-50">
                  <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">Mike</span> = ...
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* --- MARQUEE: The Tech Stack (No standard icons) --- */}
      <section className="bg-[#161b22] border-b border-[#30363d] py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {["React", "Node", "Docker", "K8s", "AWS", "Vim", "Linux", "GraphQL", "Mongo", "Redis"].map((tech, i) => (
            <span key={i} className="mx-6 text-xl font-bold text-[#8b949e] uppercase tracking-widest hover:text-white cursor-default">
              {tech} <span className="text-[#238636] text-sm">v{Math.floor(Math.random() * 20)}.0</span>
            </span>
          ))}
        </div>
      </section>

      {/* --- FEATURES: The "Release Notes" Layout --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="mb-16 border-l-4 border-[#ff7b72] pl-6">
          <h2 className="text-4xl font-bold text-white mb-2">Release Notes v1.0</h2>
          <p className="text-[#8b949e]">Why we built this (and why you need it).</p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-[#30363d]">
            {/* Feature 1 */}
            <div className="p-8 border-r border-b md:border-b-0 border-[#30363d] hover:bg-[#161b22] transition-colors group">
                <Terminal className="w-10 h-10 text-[#79c0ff] mb-4 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Filter by Syntax</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">
                    Don't waste time on someone who puts curly braces on a new line. Our parser detects stylistic incompatibilities before you match.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border-r border-b md:border-b-0 border-[#30363d] hover:bg-[#161b22] transition-colors group">
                <GitPullRequest className="w-10 h-10 text-[#d2a8ff] mb-4 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Code Review Dates</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">
                    The perfect date isn't dinner. It's refactoring a legacy codebase together. Share your screen, not just your feelings.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border-[#30363d] hover:bg-[#161b22] transition-colors group">
                <Zap className="w-10 h-10 text-[#ffbd2e] mb-4 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Zero Latency Chat</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">
                    Powered by WebSockets. Because waiting for a text back feels longer than `npm install` on a bad network.
                </p>
            </div>
        </div>
      </section>

      {/* --- INTERACTIVE DEMO: The "Diff" View --- */}
      <section className="bg-[#0d1117] py-20 border-y border-[#30363d]">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
             <div>
                <div className="text-[#ff7b72] font-mono font-bold mb-2">// THE PROBLEM</div>
                <h2 className="text-3xl font-bold text-white mb-6">Rubber Ducks Don't Talk Back</h2>
                <p className="text-[#8b949e] mb-6">
                    You've explained your logic to a yellow piece of plastic for 3 years. 
                    It's time for a human who understands the difference between `slice` and `splice`.
                </p>
                <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3 text-[#8b949e]">
                        <div className="w-4 h-4 bg-[#238636] flex items-center justify-center text-[10px] text-white">✓</div>
                        Matches based on GitHub activity
                    </li>
                    <li className="flex items-center gap-3 text-[#8b949e]">
                        <div className="w-4 h-4 bg-[#238636] flex items-center justify-center text-[10px] text-white">✓</div>
                        VS Code & IntelliJ Extension support
                    </li>
                </ul>
             </div>
             
             {/* "Code Editor" UI Visual */}
             <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden shadow-2xl">
                 <div className="bg-[#0d1117] p-2 flex gap-2 border-b border-[#30363d]">
                     <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                 </div>
                 <div className="p-6 font-mono text-sm overflow-x-auto">
                     <div className="flex">
                         <div className="text-[#484f58] select-none mr-4 text-right">
                             1<br/>2<br/>3<br/>4<br/>5
                         </div>
                         <div>
                             <span className="text-[#ff7b72]">if</span> (user.<span className="text-[#d2a8ff]">isLonely</span>()) &#123;<br/>
                             &nbsp;&nbsp;<span className="text-[#8b949e]">// The old way</span><br/>
                             &nbsp;&nbsp;<span className="text-[#ff7b72] line-through opacity-50">user.buyCat();</span><br/>
                             &nbsp;&nbsp;<span className="text-[#8b949e]">// The DevTinder way</span><br/>
                             &nbsp;&nbsp;<span className="text-[#79c0ff]">DevTinder</span>.<span className="text-[#d2a8ff]">findMatch</span>(&#123;<br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;caffeineLevel: <span className="text-[#79c0ff]">"HIGH"</span><br/>
                             &nbsp;&nbsp;&#125;);<br/>
                             &#125;
                         </div>
                     </div>
                 </div>
             </div>
          </div>
      </section>

    </div>
  );
};

export default HomePage;