'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogIn, Lock, Mail, ArrowRight, Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check for demo purposes
    // In a real app, this would be a backend request
    if (password === 'admin123') {
      setTimeout(() => {
        localStorage.setItem('kalakar_admin_auth', 'true');
        router.push('/admin/dashboard');
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid administrative credentials');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -ml-48 -mb-48" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-white mb-4 tracking-tighter uppercase">
            Kalakar <span className="text-accent italic">Studio</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">
            <Lock size={12} />
            <span>Secure Admin Access</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-8">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Administrative Password</label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access key"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-400 text-xs font-medium text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-accent hover:text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl disabled:bg-gray-800 disabled:text-gray-500"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Access Dashboard <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            Return to main site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
