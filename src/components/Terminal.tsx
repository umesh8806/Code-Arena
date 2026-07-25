import { Terminal as TerminalIcon, CheckCircle, XCircle } from "lucide-react";

interface TerminalProps {
  output: string;
  isError: boolean;
  isExecuting: boolean;
  executionTime?: number;
}

export default function Terminal({ output, isError, isExecuting, executionTime }: TerminalProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0c] rounded-2xl overflow-hidden border border-white/5">
      {/* Header */}
      <div className="h-12 bg-[#121216] border-b border-white/5 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2 text-gray-400 font-mono text-xs">
          <TerminalIcon className="w-4 h-4" />
          Output Terminal
        </div>
        
        {executionTime && (
          <div className="text-gray-500 font-mono text-xs">
            Finished in {executionTime}ms
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed">
        {isExecuting ? (
          <div className="flex items-center gap-3 text-gray-400 animate-pulse">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            Executing code...
          </div>
        ) : output ? (
          <div className="space-y-4">
            <div className={`flex items-center gap-2 font-medium ${isError ? 'text-red-400' : 'text-emerald-400'}`}>
              {isError ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              {isError ? 'Execution Error' : 'Success'}
            </div>
            <pre className={`whitespace-pre-wrap break-words ${isError ? 'text-red-300' : 'text-gray-300'}`}>
              {output}
            </pre>
          </div>
        ) : (
          <div className="text-gray-500 italic">
            Waiting for execution... Run your code to see the output here.
          </div>
        )}
      </div>
    </div>
  );
}
