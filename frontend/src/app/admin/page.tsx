'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Film, Music, Settings, LogOut, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-8 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'films', name: 'Manage Films', icon: Film },
            { id: 'music', name: 'Manage Music', icon: Music },
            { id: 'settings', name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Plus size={20} />
            Add New {activeTab === 'films' ? 'Film' : activeTab === 'music' ? 'Track' : 'Entry'}
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Films</p>
              <h3 className="text-4xl font-bold text-gray-900">24</h3>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Tracks</p>
              <h3 className="text-4xl font-bold text-gray-900">12</h3>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Inquiries</p>
              <h3 className="text-4xl font-bold text-gray-900">156</h3>
            </div>
          </div>
        )}

        {activeTab === 'films' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-medium text-gray-900">Sample Wedding Film {i}</td>
                    <td className="px-6 py-4 text-gray-600">June 2025</td>
                    <td className="px-6 py-4 text-gray-600">Italy</td>
                    <td className="px-6 py-4 space-x-4">
                      <button className="text-blue-600 hover:underline">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
