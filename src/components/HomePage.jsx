import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, GitPullRequest, Zap, ChevronRight, Hash } from 'lucide-react';

// --- Typewriter Component for that "Terminal" feel ---
const Typewriter = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 50); // Speed of typing
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-5 bg-[#58a6ff] ml-1 align-middle"
      />
    </span>
  );
};

const HomePage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax for background
  const y2 = useTransform(scrollY, [0, 500], [0, -150]); // Parallax for floating elements

  // Stagger container for features
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono overflow-x-hidden selection:bg-[#58a6ff] selection:text-[#0d1117]">

      {/* --- HERO SECTION --- */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[90vh] border-b border-[#30363d] overflow-hidden">
        
        {/* Animated Background Grid (Parallax) */}
        <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
            initial={{ backgroundPosition: "0 0" }}
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        >
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </motion.div>

        {/* Left: The Hook */}
        <div className="lg:col-span-7 p-8 lg:p-16 flex flex-col justify-center border-r border-[#30363d] relative z-10 backdrop-blur-[2px]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-[#238636]/10 text-[#238636] px-3 py-1 text-xs font-bold mb-6 border border-[#238636]/50 rounded-full shadow-[0_0_15px_rgba(35,134,54,0.3)] cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#238636] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#238636]"></span>
              </span>
              STATUS: DEPLOYED v1.0
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-none">
              <span className="block text-[#7ee787] overflow-hidden whitespace-nowrap">
                 git checkout
              </span>
              <span className="flex items-center gap-2 text-[#ff7b72]">
                <ChevronRight className="w-8 h-8 lg:w-12 lg:h-12 animate-pulse" /> 
                <Typewriter text="-b partner" delay={1} />
              </span>
            </h1>

            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="text-xl text-[#8b949e] max-w-xl mb-8 leading-relaxed"
            >
              Stop trying to explain why you spent 4 hours configuring Neovim to "normal" people. 
              Find someone who accepts your <span className="text-[#a5d6ff] bg-[#1f6feb]/10 px-1 border border-[#1f6feb]/30 rounded">Pull Requests</span>.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="flex flex-wrap gap-4"
            >
              <Link to="/login" className="group relative bg-[#238636] text-white px-8 py-4 font-bold text-lg border border-[#2ea043] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_4px_0_#1a6328] active:shadow-none active:translate-y-1 rounded-sm">
                <span className="relative z-10 flex items-center gap-2">
                   Start Matching() <Terminal size={18} />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
              
              <button className="px-8 py-4 font-bold text-[#58a6ff] border border-[#30363d] hover:bg-[#161b22] hover:border-[#58a6ff] transition-all rounded-sm flex items-center gap-2">
                <Hash size={18} /> View_Source
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: The "Live" Feed (Floating Elements) */}
        <div className="lg:col-span-5 bg-[#0d1117] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Animated Circles Background */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1] 
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1f6feb] blur-[100px] rounded-full opacity-10"
                />
            </div>

           <div className="relative w-full max-w-md z-10 perspective-1000">
              {/* Card 1: Main User */}
              <motion.div 
                style={{ y: y2 }}
                initial={{ rotateX: 20, rotateY: -20, opacity: 0, z: -100 }}
                animate={{ rotateX: 0, rotateY: -5, opacity: 1, z: 0 }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                className="bg-[#161b22] border border-[#30363d] p-0 shadow-2xl rounded-lg overflow-hidden"
              >
                {/* Window Header */}
                <div className="bg-[#010409] p-3 border-b border-[#30363d] flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <span className="text-[10px] text-[#8b949e] ml-2 font-mono">user_profile.json</span>
                </div>

                <div className="p-5 font-mono text-sm relative">
                  <motion.div 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 text-[10px] text-[#238636] border border-[#238636] px-1 rounded"
                  >
                    ONLINE
                  </motion.div>

                  <div className="space-y-1">
                      <div><span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">Saurabh</span> = &#123;</div>
                      <div className="pl-4">role: <span className="text-[#a5d6ff]">'FullStack'</span>,</div>
                      <div className="pl-4">coffee: <span className="text-[#79c0ff]">true</span>,</div>
                      <div className="pl-4">sleep: <span className="text-[#ff7b72]">null</span>,</div>
                      <div className="pl-4">tabs: <span className="text-[#ff7b72]">99</span>,</div>
                      <div className="pl-4">
                        stack: [<span className="text-[#a5d6ff]">'React'</span>, <span className="text-[#a5d6ff]">'Rust'</span>]
                      </div>
                      <div>&#125;;</div>
                  </div>

                  <div className="mt-6 flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-[#238636] text-white py-2 text-xs font-bold rounded-sm border border-[#2ea043] shadow-lg"
                      >
                        git merge
                      </motion.button>
                      <motion.button 
                         whileHover={{ scale: 1.05, borderColor: '#ff7b72', color: '#ff7b72' }}
                         whileTap={{ scale: 0.95 }}
                         className="flex-1 bg-[#0d1117] text-[#8b949e] py-2 text-xs font-bold rounded-sm border border-[#30363d]"
                      >
                        git reset
                      </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Floating behind */}
              <motion.div 
                animate={{ 
                    y: [-10, 10, -10],
                    rotate: [3, 5, 3]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#0d1117] border border-[#30363d] p-4 shadow-xl absolute -top-12 -right-12 rounded-lg -z-10 w-48 opacity-60 grayscale blur-[1px]"
              >
                 <div className="space-y-1 text-xs">
                    <div><span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">Mike</span>...</div>
                    <div className="w-full h-2 bg-[#30363d] rounded mt-2"></div>
                    <div className="w-3/4 h-2 bg-[#30363d] rounded"></div>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <section className="bg-[#0d1117] border-y border-[#30363d] py-6 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0d1117] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0d1117] to-transparent z-10"></div>
        
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 mx-6">
                {["React", "Node","AWS","SES", "Express", "MongoDb", "Razorpay", "TypeScript", "CronJob"].map((tech) => (
                    <div key={tech} className="flex items-center gap-2 group cursor-default">
                        <Hash size={16} className="text-[#30363d] group-hover:text-[#238636] transition-colors" />
                        <span className="text-xl font-bold text-[#8b949e] group-hover:text-white transition-colors">
                        {tech}
                        </span>
                    </div>
                ))}
              </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16 border-l-4 border-[#ff7b72] pl-6"
        >
          <h2 className="text-4xl font-bold text-white mb-2">Release Notes v1.0</h2>
          <p className="text-[#8b949e]">Why we built this (and why you need it).</p>
        </motion.div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-0 border border-[#30363d] bg-[#0d1117]"
        >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="p-8 border-r border-b md:border-b-0 border-[#30363d] hover:bg-[#161b22] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Code2 size={100} />
                </div>
                <div className="relative z-10">
                    <div className="bg-[#1f6feb]/10 w-fit p-3 rounded-sm mb-4 group-hover:bg-[#1f6feb]/20 transition-colors">
                         <Terminal className="w-8 h-8 text-[#79c0ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Filter by Syntax</h3>
                    <p className="text-[#8b949e] text-sm leading-relaxed">
                        Don't waste time on someone who puts curly braces on a new line. Our parser detects stylistic incompatibilities before you match.
                    </p>
                </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="p-8 border-r border-b md:border-b-0 border-[#30363d] hover:bg-[#161b22] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <GitPullRequest size={100} />
                </div>
                <div className="relative z-10">
                     <div className="bg-[#a371f7]/10 w-fit p-3 rounded-sm mb-4 group-hover:bg-[#a371f7]/20 transition-colors">
                        <GitPullRequest className="w-8 h-8 text-[#d2a8ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Code Review Dates</h3>
                    <p className="text-[#8b949e] text-sm leading-relaxed">
                        The perfect date isn't dinner. It's refactoring a legacy codebase together. Share your screen, not just your feelings.
                    </p>
                </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="p-8 border-[#30363d] hover:bg-[#161b22] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap size={100} />
                </div>
                <div className="relative z-10">
                     <div className="bg-[#d29922]/10 w-fit p-3 rounded-sm mb-4 group-hover:bg-[#d29922]/20 transition-colors">
                        <Zap className="w-8 h-8 text-[#ffbd2e]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Zero Latency Chat</h3>
                    <p className="text-[#8b949e] text-sm leading-relaxed">
                        Powered by WebSockets. Because waiting for a text back feels longer than `npm install` on a bad network.
                    </p>
                </div>
            </motion.div>
        </motion.div>
      </section>

      {/* --- INTERACTIVE DEMO --- */}
      <section className="bg-[#010409] py-24 border-y border-[#30363d] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#238636] to-transparent opacity-50"></div>
          
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
             <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
             >
                <div className="flex items-center gap-2 text-[#ff7b72] font-mono font-bold mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#ff7b72] animate-pulse"></div>
                    // THE PROBLEM
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Rubber Ducks Don't Talk Back</h2>
                <p className="text-[#8b949e] mb-8 text-lg">
                    You've explained your logic to a yellow piece of plastic for 3 years. 
                    It's time for a human who understands the difference between <code className="bg-[#30363d] px-1 rounded text-[#c9d1d9]">slice</code> and <code className="bg-[#30363d] px-1 rounded text-[#c9d1d9]">splice</code>.
                </p>
                <ul className="space-y-4 font-mono text-sm">
                    {["Matches based on GitHub activity", "VS Code & IntelliJ Extension support", "Integrated Linter for red flags"].map((item, i) => (
                         <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-[#c9d1d9]"
                        >
                            <div className="w-5 h-5 bg-[#238636]/20 border border-[#238636] flex items-center justify-center text-[#238636] rounded-sm">✓</div>
                            {item}
                        </motion.li>
                    ))}
                </ul>
             </motion.div>
             
             {/* Animated Code Editor */}
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
             >
                 <div className="bg-[#161b22] p-3 flex gap-2 border-b border-[#30363d]">
                     <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                     <div className="flex-1 text-center text-xs text-[#8b949e] font-mono">relationship.js</div>
                 </div>
                 <div className="p-6 font-mono text-sm overflow-x-auto">
                     <div className="flex">
                         <div className="text-[#484f58] select-none mr-4 text-right border-r border-[#30363d] pr-4">
                             1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7
                         </div>
                         <div className="pl-2">
                             <div><span className="text-[#ff7b72]">if</span> (user.<span className="text-[#d2a8ff]">isLonely</span>()) &#123;</div>
                             <div className="pl-4 text-[#8b949e]">// The old way</div>
                             <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pl-4 relative w-fit"
                             >
                                <span className="text-[#ff7b72] opacity-50">user.buyCat();</span>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute top-1/2 left-0 h-[1px] bg-[#ff7b72]"
                                />
                             </motion.div>
                             
                             <div className="pl-4 mt-2 text-[#8b949e]">// The DevTinder way</div>
                             <div className="pl-4">
                                <span className="text-[#79c0ff]">DevTinder</span>.<span className="text-[#d2a8ff]">findMatch</span>(&#123;
                             </div>
                             <div className="pl-8">
                                caffeineLevel: <span className="text-[#79c0ff]">"HIGH"</span>
                             </div>
                             <div className="pl-4">&#125;);</div>
                             <div>&#125;</div>
                         </div>
                     </div>
                 </div>
             </motion.div>
          </div>
      </section>

    </div>
  );
};

export default HomePage;