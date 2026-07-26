"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, Download, ArrowLeft, Pen, Square } from "lucide-react";
import Link from "next/link";

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3b82f6");
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set proper dimensions based on container
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Fill background with dark color
    ctx.fillStyle = "#0f172a"; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set initial stroke style
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.beginPath();
    ctx.moveTo(
      'touches' in e ? e.touches[0].clientX - canvas.offsetLeft : e.nativeEvent.offsetX,
      'touches' in e ? e.touches[0].clientY - canvas.offsetTop : e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.lineTo(
      'touches' in e ? e.touches[0].clientX - canvas.offsetLeft : e.nativeEvent.offsetX,
      'touches' in e ? e.touches[0].clientY - canvas.offsetTop : e.nativeEvent.offsetY
    );
    
    ctx.strokeStyle = tool === "eraser" ? "#0f172a" : color;
    ctx.lineWidth = tool === "eraser" ? brushSize * 4 : brushSize;
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "code-arena-whiteboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] relative overflow-hidden">
      
      {/* Toolbar */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-10 flex flex-wrap justify-center items-center gap-2 sm:gap-4 p-2 bg-[#1e293b] rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md w-[95%] sm:w-auto">
        <Link 
          href="/" 
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors border-r border-white/5 mr-0 sm:mr-2 pr-2 sm:pr-4"
          title="Return Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        <button 
          onClick={() => setTool("pen")}
          className={`p-3 rounded-xl transition-all ${tool === "pen" ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-gray-400 hover:bg-white/5'}`}
          title="Pen Tool"
        >
          <Pen className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setTool("eraser")}
          className={`p-3 rounded-xl transition-all ${tool === "eraser" ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-gray-400 hover:bg-white/5'}`}
          title="Eraser Tool"
        >
          <Eraser className="w-5 h-5" />
        </button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded-full border-0 outline-none cursor-pointer p-0 bg-transparent"
          title="Color Picker"
        />
        
        <input 
          type="range" 
          min="1" 
          max="20" 
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-24 accent-blue-600"
          title="Brush Size"
        />

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button 
          onClick={clearCanvas}
          className="p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
          title="Clear Board"
        >
          <Square className="w-5 h-5" />
        </button>
        <button 
          onClick={downloadCanvas}
          className="p-3 text-emerald-400 hover:bg-emerald-400/10 rounded-xl transition-colors"
          title="Download Image"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 w-full h-full relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full touch-none"
        />
      </div>
    </div>
  );
}
