import React from 'react';
import { Eye, Edit3 } from 'lucide-react';
import logo from '../assets/logo.png'; 

export default function Navbar({ isPreview, setIsPreview }) {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-8 sticky top-0 z-50 shadow-sm w-full">
      <div className="flex items-center min-w-0 shrink cursor-pointer">
        <img 
          src={logo} 
          alt="Dynamic Builder Logo" 
          className="h-38 md:h-42 w-auto object-contain transition-transform hover:scale-105 active:scale-95"
          onClick={() => window.location.reload()}
        />
      </div>
      
      <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-2">
        <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-green-600">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border-2 border-green-100"></span>
          <span className="hidden md:inline">Auto-saved</span>
        </div>
        
        <button 
          onClick={() => setIsPreview(!isPreview)} 
          className={`flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold transition-all active:scale-95 shadow-md ${
            isPreview 
            ? 'bg-amber-500 text-white shadow-amber-100' 
            : 'bg-slate-900 text-white shadow-slate-200'
          }`}
        >
          {isPreview ? (
            <>
              <Edit3 size={16} />
              <span className="hidden md:inline">Edit mode</span>
            </>
          ) : (
            <>
              <Eye size={16} />
              <span className="hidden md:inline">Preview</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}