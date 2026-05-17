'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function FilmsPage() {
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/films')
      .then(res => res.json())
      .then(data => {
        setFilms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching films:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-12 bg-white min-h-screen text-black">
      <div className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-serif tracking-[0.3em]">KWF FILMS</h1>
        <div className="w-20 h-[1px] bg-gray-200 mx-auto mt-10" />
      </div>

      <div className="mt-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif tracking-widest uppercase">Latest Films</h2>
          <button className="px-8 py-2.5 bg-black text-white text-[10px] font-bold rounded-full uppercase tracking-[0.3em] hover:bg-gray-800 transition-all">
            view all
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : films.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {films.map((film, i) => (
              <motion.div 
                key={film.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group cursor-pointer"
                onClick={() => film.videoUrl && window.open(film.videoUrl, '_blank')}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gray-100">
                  <img 
                    src={film.image} 
                    alt={film.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Play className="text-white ml-1.5" fill="white" size={28} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 tracking-[0.3em] mb-3 uppercase">
                  <span>{film.date}</span>
                  <span className="w-6 h-[1px] bg-gray-200" />
                  <span className="text-accent">{film.location}</span>
                </div>
                <h3 className="text-2xl font-serif tracking-tight">{film.title}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-serif italic text-2xl">
            Our latest stories are being crafted...
          </div>
        )}
      </div>
    </div>
  );
}
