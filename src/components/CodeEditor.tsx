"use client";

import Editor from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  language: string;
  code: string;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditor({ language, code, onChange }: CodeEditorProps) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-[#1e1e1e] shadow-2xl relative">
      <Editor
        height="100%"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-mono)",
          lineHeight: 24,
          padding: { top: 20, bottom: 20 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
        }}
        loading={
          <div className="flex items-center justify-center w-full h-full bg-[#1e1e1e]">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        }
      />
    </div>
  );
}
