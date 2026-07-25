"use client";

import { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import { Maximize2, LayoutTemplate } from "lucide-react";

export default function ArenaPage() {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "javascript">("html");
  
  const [html, setHtml] = useState(`<!-- Welcome to Code Arena Live! -->\n<div class="container">\n  <h1>Hello, Coder!</h1>\n  <p>Edit HTML, CSS, or JS and see changes instantly.</p>\n  <button id="clickMe">Click Me</button>\n</div>`);
  const [css, setCss] = useState(`body {\n  font-family: system-ui, sans-serif;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #0f172a;\n  color: white;\n}\n\n.container {\n  text-align: center;\n  padding: 2rem;\n  background: #1e293b;\n  border-radius: 1rem;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);\n}\n\nbutton {\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-weight: bold;\n  margin-top: 1rem;\n}\n\nbutton:hover {\n  background: #2563eb;\n}`);
  const [js, setJs] = useState(`document.getElementById('clickMe').addEventListener('click', () => {\n  alert('Button clicked! Live preview works perfectly!');\n});`);
  
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 250); // Debounce to prevent lag while typing

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const getCurrentCode = () => {
    if (activeTab === "html") return html;
    if (activeTab === "css") return css;
    return js;
  };

  const handleCodeChange = (value: string | undefined) => {
    const val = value || "";
    if (activeTab === "html") setHtml(val);
    else if (activeTab === "css") setCss(val);
    else setJs(val);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      
      {/* Toolbar */}
      <div className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0c]">
        <div className="flex items-center gap-2 bg-[#1a1a1f] p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab("html")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "html" ? 'bg-orange-500/20 text-orange-500' : 'text-gray-400 hover:text-white'}`}
          >
            HTML
          </button>
          <button 
            onClick={() => setActiveTab("css")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "css" ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            CSS
          </button>
          <button 
            onClick={() => setActiveTab("javascript")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "javascript" ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-400 hover:text-white'}`}
          >
            JavaScript
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 text-emerald-400 font-medium text-sm bg-emerald-400/10 rounded-xl border border-emerald-400/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Preview
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">
        
        {/* Editor Pane (Left) */}
        <div className="flex-1 min-h-[300px] lg:min-h-0 relative group lg:max-w-[50%] flex flex-col">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CodeEditor 
            language={activeTab}
            code={getCurrentCode()}
            onChange={handleCodeChange}
          />
        </div>

        {/* Live Preview Pane (Right) */}
        <div className="flex-1 min-h-[500px] lg:min-h-0 lg:max-w-[50%] relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4 shrink-0 text-gray-500">
            <div className="flex items-center gap-2 text-sm font-medium">
              <LayoutTemplate className="w-4 h-4" />
              Output
            </div>
            <Maximize2 className="w-4 h-4 cursor-pointer hover:text-black transition-colors" />
          </div>
          <iframe 
            srcDoc={srcDoc}
            title="Live Preview"
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts"
          />
        </div>

      </div>
    </div>
  );
}
