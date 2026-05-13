'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Film, 
  Music, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit2, 
  Mail, 
  Save,
  CheckCircle,
  MapPin,
  Phone
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    location: '',
    address: '',
    email: '',
    phone: '',
    instagram: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Fetch inquiries
    fetch('http://localhost:5000/api/inquiries')
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(err => console.error('Error fetching inquiries:', err));

    // Fetch settings
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setInquiries(inquiries.filter(i => i.id !== id));
        }
      } catch (err) {
        console.error('Error deleting inquiry:', err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 right-10 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100]"
        >
          <CheckCircle className="text-green-500" size={20} />
          <span className="font-bold uppercase tracking-widest text-xs">Settings Saved Successfully</span>
        </motion.div>
      )}

      {/* Admin Sidebar */}
      <aside className="w-72 bg-black text-white flex flex-col">
        <div className="p-10">
          <h2 className="text-2xl font-serif font-bold tracking-tight uppercase leading-none text-white">
            Kalakar <br /> Studio <span className="text-accent block text-xs tracking-[0.4em] mt-2 font-sans">Admin</span>
          </h2>
        </div>
        <nav className="flex-1 px-6 space-y-2">
          {[
            { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
            { id: 'inquiries', name: 'Inquiries', icon: Mail },
            { id: 'films', name: 'Films', icon: Film },
            { id: 'music', name: 'Music', icon: Music },
            { id: 'settings', name: 'Studio Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                activeTab === item.id ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-6">
          <Link 
            href="/admin"
            className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-bold uppercase tracking-widest text-xs">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">System Management</span>
            <h1 className="text-5xl font-serif capitalize text-black">{activeTab.replace('-', ' ')}</h1>
          </div>
          {activeTab === 'films' || activeTab === 'music' ? (
            <button className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl font-bold uppercase tracking-widest text-xs">
              <Plus size={18} /> Add New {activeTab === 'films' ? 'Film' : 'Track'}
            </button>
          ) : null}
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Total Inquiries', value: inquiries.length.toString(), trend: 'Active', color: 'bg-green-500' },
              { label: 'Total Films', value: '24', trend: '+12%', color: 'bg-blue-500' },
              { label: 'Original Tracks', value: '12', trend: '+2', color: 'bg-accent' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`} />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-5xl font-serif text-black">{stat.value}</h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Couple</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Contact</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Message</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-serif text-xl italic">No inquiries yet.</td>
                  </tr>
                ) : inquiries.map((inquiry, i) => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-serif text-lg text-black">{inquiry.brideName} & {inquiry.groomName}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-medium text-black">{inquiry.phone}</div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-gray-500 max-w-xs truncate">{inquiry.message}</p>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl">
            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Studio Location (City/Country)</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="text" 
                      value={settings.location}
                      onChange={(e) => setSettings({...settings, location: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Public Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="text" 
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-black"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Full Address</label>
                <textarea 
                  rows={3}
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Email</label>
                  <input 
                    type="email" 
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-black"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Instagram Username</label>
                  <input 
                    type="text" 
                    value={settings.instagram}
                    onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-black"
                    placeholder="@username"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="px-12 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl disabled:bg-gray-400"
              >
                {isSaving ? 'Saving Changes...' : <><Save size={18} /> Save Settings</>}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
