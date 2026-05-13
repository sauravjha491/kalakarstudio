'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Camera, Film, Users } from 'lucide-react';

export default function WorkshopPage() {
  return (
    <div className="p-8">
      <div className="text-center py-16 bg-black text-white rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80" alt="Workshop" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Education</span>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 tracking-tighter uppercase">Workshop</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            Empowering the next generation of storytellers. We’ve conducted workshops in over 15 cities, educating thousands.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {[
          { icon: Camera, title: "Cinematography", desc: "Master the art of visual storytelling with small-format cameras." },
          { icon: Film, title: "Editing", desc: "Learn the secrets of rhythmic editing and color grading." },
          { icon: BookOpen, title: "Direction", desc: "How to direct real people and capture authentic emotions." },
          { icon: Users, title: "Business", desc: "Building a premium brand in the wedding industry." }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors mb-6">
              <item.icon size={24} />
            </div>
            <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-gray-50 rounded-3xl p-12 md:p-24 text-center">
        <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">Ready to learn?</h2>
        <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
          Join our upcoming 3-day masterclass in Mumbai. Limited seats available for dedicated artists only.
        </p>
        <button className="px-12 py-4 bg-black text-white rounded-full font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
          Register Interest
        </button>
      </div>
    </div>
  );
}
