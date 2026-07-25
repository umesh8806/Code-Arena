"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Code2, Zap, LayoutDashboard, PenTool, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-24 overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-5xl w-full text-center space-y-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>The Next Generation Code Arena</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 pb-2">
            Write. Compile. Dominate.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A professional-grade coding environment built for developers. 
            Experience lightning-fast execution, robust multi-language support, and an interface that stays out of your way.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link 
            href="/compiler" 
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:-translate-y-1"
          >
            <Terminal className="w-5 h-5" />
            Code Compiler
          </Link>
          <Link 
            href="/live-preview" 
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transform hover:-translate-y-1"
          >
            <LayoutDashboard className="w-5 h-5" />
            Live Web Preview
          </Link>
          <Link 
            href="/whiteboard" 
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all backdrop-blur-md transform hover:-translate-y-1"
          >
            <PenTool className="w-5 h-5" />
            Whiteboard
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.2)] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Code2 className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Monaco Engine</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Powered by the same core as VS Code. Enjoy intelligent auto-completion, multi-cursor support, and syntax highlighting.
            </p>
          </div>
          
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.2)] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 relative z-10 border border-emerald-500/20">
              <Terminal className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Instant Execution</h3>
            <p className="text-gray-400 text-base leading-relaxed relative z-10">
              Run your Python, JS, C++, or Java code instantly in an isolated sandbox environment. No more waiting.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.2)] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
              <Zap className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Clean UI / UX</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Designed explicitly for developer students. Zero clutter, perfect dark mode, and optimized for productivity.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-24 pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 z-10 relative">
        <div className="text-gray-400 text-sm font-medium">
          Made by <span className="text-white font-bold tracking-wide">Developer</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:bhamareumeshn1536@gmail.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium">
            <Mail className="w-5 h-5" />
            Gmail
          </a>
          <a href="https://github.com/umesh8806" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/profile-umesh-bhamare/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors flex items-center gap-2 text-sm font-medium">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
