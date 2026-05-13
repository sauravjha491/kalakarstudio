'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Globe, 
  User, 
  Users, 
  GraduationCap, 
  Monitor, 
  Phone,
  ArrowRight,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Films', href: '/twf-films', icon: Globe },
  { name: 'About', href: '/about-us', icon: User },
  { name: 'Crew', href: '/crew', icon: Users },
  { name: 'Workshop', href: '/workshop', icon: GraduationCap },
  { name: 'Blog & Press', href: '/blogs', icon: Monitor },
  { name: 'Contact', href: '/contact', icon: Phone },
  { name: 'Admin', href: '/admin', icon: Lock },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-black text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-10 mb-4">
        <Link href="/">
          <div className="relative">
            <h1 className="text-3xl font-serif font-bold tracking-tighter leading-[0.8] text-white">
              THE <br /> 
              <span className="text-4xl">KALAKAR</span> <br /> 
              STUDIO
            </h1>
            <div className="absolute -bottom-4 left-0 w-12 h-[1px] bg-white/20" />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-4 px-6 py-4 transition-all duration-300 group rounded-l-full ml-2",
                    isActive ? "bg-white text-black" : "text-gray-400 hover:text-white"
                  )}
                >
                  <item.icon 
                    size={18} 
                    className={cn(
                      "transition-colors",
                      isActive ? "text-red-500" : "group-hover:text-white"
                    )} 
                  />
                  <span className="text-sm font-bold tracking-wide">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom CTA */}
      <div className="p-6 mt-auto">
        <div className="p-6 rounded-[2rem] bg-gradient-to-b from-[#1a1a1a] to-black border border-white/5 text-center">
          <p className="font-serif text-lg leading-tight mb-6 text-gray-200">
            We&apos;d love to <br /> hear your story!
          </p>
          <Link 
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#f04438] text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#d93a2f] transition-all group shadow-lg shadow-red-500/20"
          >
            Enquire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
