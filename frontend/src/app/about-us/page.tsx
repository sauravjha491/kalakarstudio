'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center py-16">
        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">TWF's Story</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-12 italic tracking-tight">Where it all began</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-left mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif mb-6">Vishal Punjabi</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A Bollywood film-maker discovers small-format cameras. Driven by passion, Vishal moved from Ghana to India, landing his dream job as a creative director at SRK's Red Chillies.
            </p>
            <div className="space-y-4 text-sm font-medium tracking-wide">
              <div className="flex gap-4">
                <span className="text-gray-400 w-32 uppercase">Place of Birth</span>
                <span>GHANA</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-400 w-32 uppercase">Currently</span>
                <span>MUMBAI, INDIA</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-gray-100 rounded-sm overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80" 
              alt="Vishal Punjabi"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>

      <div className="py-24 border-t border-gray-100 mt-12">
        <h2 className="text-center text-4xl font-serif mb-16">Scene 1: The Discovery</h2>
        <div className="relative border-l-2 border-gray-100 ml-4 md:ml-0 md:left-1/2 space-y-24">
          {[
            { year: "2001-2009", title: "The Red Chillies Era", desc: "Working with Shah Rukh Khan on some of Bollywood's biggest films." },
            { year: "2010", title: "The Wedding Filmer is Born", desc: "Vishal gets married and films his own wedding. It goes viral." },
            { year: "2012", title: "The First Studio", desc: "TWF opens its first doors in Mumbai, assembled by a team of visionaries." }
          ].map((item, i) => (
            <div key={i} className="relative pl-12 md:pl-0">
              <div className="absolute left-[-9px] md:left-[-9px] top-0 w-4 h-4 rounded-full bg-black border-4 border-white ring-1 ring-gray-100" />
              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right md:ml-0' : 'md:pl-16 md:ml-auto'}`}>
                <span className="text-accent font-bold text-sm tracking-widest">{item.year}</span>
                <h3 className="text-2xl font-serif mt-2 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
