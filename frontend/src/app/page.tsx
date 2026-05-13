'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, Music, MapPin, Star, ArrowRight, Instagram, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [music, setMusic] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/music')
      .then(res => res.json())
      .then(data => setMusic(data.slice(0, 3))); // Show top 3

    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="px-8 py-12">
        <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" 
            alt="Hero Background"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight"
              >
                Capturing the <br /> <span className="italic">Soul of Celebration</span>
              </motion.h1>
              <p className="text-gray-300 text-lg font-light tracking-wide max-w-lg">
                We don&apos;t just film weddings; we weave together the threads of emotion, culture, and love into cinematic masterpieces.
              </p>
            </div>
            <Link 
              href="/twf-films"
              className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group/btn"
            >
              <Play fill="currentColor" size={24} className="ml-1 group-hover/btn:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-8 md:px-24">
        <div className="max-w-5xl mx-auto flex flex-col md:row gap-16 items-center">
          <div className="flex-1 space-y-8 text-black">
            <div className="flex items-center gap-4 text-accent uppercase tracking-[0.3em] text-xs font-bold">
              <div className="w-12 h-[1px] bg-accent" />
              Our Philosophy
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
              Nothing is ever lost to us as long as we remember it.
            </h2>
            <p className="text-gray-500 text-xl font-light leading-relaxed">
              Based in {settings?.location || 'Janakpur, Nepal'}, Kalakar Studio is dedicated to preserving your most precious memories through cinematic excellence.
            </p>
            <Link href="/about-us" className="group inline-flex items-center gap-3 text-black font-bold uppercase tracking-widest text-sm border-b-2 border-black pb-2 hover:text-accent hover:border-accent transition-all">
              Read Our Story <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" 
                alt="Philosophy" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Featured Work / Music */}
      <section className="py-24 px-8 md:px-24 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="text-black">
            <h3 className="text-accent uppercase tracking-widest text-xs font-bold mb-4">Original Compositions</h3>
            <h2 className="text-4xl md:text-6xl font-serif">Music that makes you feel.</h2>
          </div>
          <button className="mt-8 md:mt-0 px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors">
            Listen on Spotify
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {music.length > 0 ? music.map((track, i) => (
            <motion.div 
              key={track.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => window.open(track.spotifyUrl, '_blank')}
            >
              <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl shadow-lg">
                <img src={track.image} alt={track.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play size={48} className="text-white" fill="white" />
                </div>
              </div>
              <h4 className="text-2xl font-serif mb-1 text-black">{track.title}</h4>
              <p className="text-gray-500 font-medium tracking-wide">{track.artist}</p>
            </motion.div>
          )) : (
            <div className="col-span-3 text-center py-20 text-gray-400 font-serif italic text-2xl">
              New compositions coming soon...
            </div>
          )}
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-32 px-8 md:px-24">
        <div className="bg-black rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center gap-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="flex-1 relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">Around the <br /> <span className="italic text-accent">World.</span></h2>
            <p className="text-gray-400 text-xl font-light leading-relaxed mb-12">
              From the palaces of Rajasthan to the villas of Lake Como, we&apos;ve travelled across cultures.
            </p>
            <div className="flex gap-12">
              <div className="space-y-2">
                <div className="text-4xl font-serif text-white">25+</div>
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Countries</div>
              </div>
              <div className="w-[1px] h-16 bg-gray-800" />
              <div className="space-y-2">
                <div className="text-4xl font-serif text-white">500+</div>
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Weddings</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
             <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" 
                 alt="Global Map" 
                 className="w-full h-full object-cover opacity-80"
               />
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 md:px-24 border-t border-gray-100 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-2 text-black">
            <h2 className="text-4xl font-serif font-bold tracking-tighter leading-none mb-8 uppercase">
              KALAKAR <br /> STUDIO
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm mb-6">
              Inspired by the art of storytelling.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-accent" />
                <span>{settings?.address || 'Janakpur, Nepal'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-accent" />
                <span>{settings?.phone || '+977 9800000000'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-accent" />
                <span>{settings?.email || 'hello@kalakarstudio.com'}</span>
              </div>
            </div>
          </div>
          <div className="text-black">
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><Link href="/twf-films" className="hover:text-accent transition-colors">Films</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Music</Link></li>
              <li><Link href="/workshop" className="hover:text-accent transition-colors">Workshops</Link></li>
              <li><Link href="/about-us" className="hover:text-accent transition-colors">About</Link></li>
            </ul>
          </div>
          <div className="text-black">
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold mb-8">Social</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href={`https://instagram.com/${settings?.instagram || 'kalakarstudio'}`} target="_blank" className="hover:text-accent transition-colors flex items-center gap-2"><Instagram size={14} /> Instagram</a></li>
              <li className="hover:text-accent transition-colors cursor-pointer">YouTube</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Spotify</li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} KALAKAR STUDIO. ALL RIGHTS RESERVED.</p>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">CRAFTED IN NEPAL</p>
        </div>
      </footer>
    </main>
  );
}
