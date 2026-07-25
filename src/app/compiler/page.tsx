"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import Terminal from "@/components/Terminal";
import { Play } from "lucide-react";
import axios from "axios";

export default function CompilerPage() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("print('Welcome to the Code Compiler!')");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | undefined>();

  const handleRunCode = async () => {
    setIsExecuting(true);
    setIsError(false);
    setOutput("");
    const startTime = Date.now();

    try {
      const response = await axios.post("/api/execute", {
        language,
        sourceCode: code,
      });

      const { run, error } = response.data;
      if (error) {
        setIsError(true);
        setOutput(error);
      } else {
        setIsError(run.code !== 0);
        setOutput(run.output || run.stderr || run.stdout || "Execution successful (no output)");
      }
    } catch (err: any) {
      setIsError(true);
      setOutput(err.response?.data?.error || err.message || "Failed to execute code.");
    } finally {
      setIsExecuting(false);
      setExecutionTime(Date.now() - startTime);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      
      {/* Toolbar */}
      <div className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0c]">
        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#1a1a1f] text-white border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500 transition-colors"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript (Node)</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <button 
          onClick={handleRunCode}
          disabled={isExecuting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
        >
          {isExecuting ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          Run Code
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">
        
        {/* Editor Pane (Left) */}
        <div className="flex-1 min-h-[300px] lg:min-h-0 relative group lg:max-w-[50%] flex flex-col">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CodeEditor 
            language={language}
            code={code}
            onChange={(v) => setCode(v || "")}
          />
        </div>

        {/* Terminal Pane (Right) */}
        <div className="flex-1 min-h-[300px] lg:min-h-0 lg:max-w-[50%] flex flex-col relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Terminal 
            output={output}
            isError={isError}
            isExecuting={isExecuting}
            executionTime={executionTime}
          />
        </div>

      </div>
    </div>
  );
}
