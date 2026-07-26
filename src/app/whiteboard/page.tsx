"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, Download, ArrowLeft, Pen, Square, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3b82f6");
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  
  // Pagination State
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    
    clearCanvas(false); // fill with default background without saving to history yet
  }, []);

  // Load a page when switching
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (pages[currentPage]) {
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = pages[currentPage];
    } else {
      clearCanvas(false);
    }
  }, [currentPage]);

  const saveCurrentPage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL("image/png");
    setPages(prev => {
      const newPages = [...prev];
      newPages[currentPage] = dataUrl;
      return newPages;
    });
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    
    ctx.strokeStyle = tool === "eraser" ? "#0f172a" : color;
    ctx.lineWidth = tool === "eraser" ? brushSize * 4 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) ctx.closePath();
    
    if (isDrawing) {
      saveCurrentPage(); // auto-save stroke to current page
    }
    setIsDrawing(false);
  };

  const clearCanvas = (save: boolean = true) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (save) saveCurrentPage();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `code-arena-whiteboard-page-${currentPage + 1}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const addNewPage = () => {
    saveCurrentPage();
    const newPageIndex = pages.length > 0 ? pages.length : 1;
    setCurrentPage(newPageIndex);
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

        <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block" />

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
          className="w-16 sm:w-24 accent-blue-600"
          title="Brush Size"
        />

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button 
          onClick={() => clearCanvas(true)}
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
        
        {/* Pagination UI */}
        <div className="flex items-center gap-1 bg-[#0f172a] rounded-xl p-1 border border-white/5 ml-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-gray-300 text-xs font-mono font-medium min-w-[3rem] text-center">
            {currentPage + 1} / {Math.max(pages.length, currentPage + 1)}
          </span>
          
          {currentPage === Math.max(0, pages.length - 1) || pages.length === 0 ? (
            <button 
              onClick={addNewPage}
              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
              title="Add New Page"
            >
              <Plus className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

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
