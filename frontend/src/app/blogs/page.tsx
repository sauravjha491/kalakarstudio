'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 py-12 border-b border-gray-100">
        <div>
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Insights & Press</span>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Stay Updated.</h1>
        </div>
        <div className="mt-8 md:mt-0 flex gap-4">
          <button className="px-6 py-2 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">All</button>
          <button className="px-6 py-2 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Celeb Wedding</button>
          <button className="px-6 py-2 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Press</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogs.map((blog, i) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-sm mb-6 relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-black">
                  {blog.category || 'Filmmaking'}
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium tracking-wide">
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <h3 className="text-2xl font-serif mt-2 group-hover:text-accent transition-colors">{blog.title}</h3>
              <p className="text-gray-500 text-sm mt-3 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
            </motion.article>
          ))}
        </div>
      )}

      <div className="mt-24 p-12 bg-gray-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-serif mb-2 italic">Subscribe to our blog</h2>
          <p className="text-gray-400">Stay updated with wedding inspiration, filmmaking tips, and latest news.</p>
        </div>
        <div className="flex w-full md:w-auto gap-4">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-full px-6 py-3 focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all">Join</button>
        </div>
      </div>
    </div>
  );
}
