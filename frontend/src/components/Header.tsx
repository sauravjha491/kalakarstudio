'use client';

import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-24 px-10 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-3xl relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors pointer-events-none">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search a film here"
          className="w-full h-14 pl-14 pr-14 bg-gray-50 border border-transparent rounded-full text-sm font-medium focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-100 transition-all text-black placeholder:text-gray-400"
        />
        <button className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-10">
        <button className="px-8 py-3.5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/5">
          FAQs
        </button>
        <button className="px-8 py-3.5 bg-[#f04438] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full flex items-center gap-2.5 hover:bg-[#d93a2f] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/10">
          Enquire <ArrowRight size={14} strokeWidth={3} />
        </button>
      </div>
    </header>
  );
}
