'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Phone,
  Eye,
  X,
  Calendar,
  User,
  Instagram
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inquiries'); // Set Inquiries as default tab
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
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
    fetchInquiries();
    fetchSettings();
  }, []);

  const fetchInquiries = () => {
    fetch('http://localhost:5000/api/inquiries')
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(err => console.error('Error fetching inquiries:', err));
  };

  const fetchSettings = () => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error fetching settings:', err));
  };

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
          if (selectedInquiry?.id === id) setSelectedInquiry(null);
        }
      } catch (err) {
        console.error('Error deleting inquiry:', err);
      }
    }
  };

  const navItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
    { id: 'inquiries', name: 'Inquiries', icon: Mail }, // This is the tab for Enquiries
    { id: 'films', name: 'Films', icon: Film },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'settings', name: 'Studio Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100]"
          >
            <CheckCircle className="text-green-500" size={20} />
            <span className="font-bold uppercase tracking-widest text-xs">Settings Saved Successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Sidebar - Always Visible when logged in */}
      <aside className="w-72 bg-black text-white flex flex-col shadow-2xl z-20">
        <div className="p-10">
          <Link href="/">
            <h2 className="text-2xl font-serif font-bold tracking-tight uppercase leading-none text-white cursor-pointer">
              Kalakar <br /> Studio <span className="text-accent block text-xs tracking-[0.4em] mt-2 font-sans">Admin</span>
            </h2>
          </Link>
        </div>
        <nav className="flex-1 px-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
                activeTab === item.id ? 'bg-white text-black shadow-lg scale-[1.02]' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-accent' : 'group-hover:text-accent transition-colors'} />
              <span className="font-bold uppercase tracking-widest text-xs">{item.name}</span>
              {item.id === 'inquiries' && inquiries.length > 0 && (
                <span className="ml-auto bg-accent text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {inquiries.length}
                </span>
              )}
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-12 bg-[#F8FAFC]">
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block font-sans">System Management</span>
            <h1 className="text-5xl font-serif capitalize text-black">{activeTab.replace('-', ' ')}</h1>
          </div>
          {(activeTab === 'films' || activeTab === 'music') && (
            <button className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl font-bold uppercase tracking-widest text-xs">
              <Plus size={18} /> Add New {activeTab === 'films' ? 'Film' : 'Track'}
            </button>
          )}
        </header>

        {/* Dashboard / Overview Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Total Inquiries', value: inquiries.length.toString(), trend: 'Active Leads', color: 'bg-green-500', icon: Mail },
              { label: 'Total Films', value: '24', trend: '+12% this month', color: 'bg-blue-500', icon: Film },
              { label: 'Original Tracks', value: '12', trend: '+2 new', color: 'bg-accent', icon: Music },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                onClick={() => stat.label === 'Total Inquiries' && setActiveTab('inquiries')}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700`} />
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} text-white shadow-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full uppercase tracking-widest">{stat.trend}</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h3 className="text-5xl font-serif text-black">{stat.value}</h3>
              </motion.div>
            ))}
          </div>
        )}

        {/* Inquiries / Enquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Couple Details</th>
                  <th className="px-10 py-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Contact Info</th>
                  <th className="px-10 py-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Submission Date</th>
                  <th className="px-10 py-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-10 py-20 text-center text-gray-300 font-serif text-2xl italic">No inquiries found in the database.</td>
                  </tr>
                ) : inquiries.map((inquiry, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="font-serif text-xl text-black">{inquiry.brideName} & {inquiry.groomName}</div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Wedding Inquiry</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2 text-black font-medium">
                        <Phone size={14} className="text-gray-400" />
                        {inquiry.phone}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(inquiry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="px-5 py-3 bg-white border border-gray-100 text-black hover:bg-black hover:text-white rounded-xl shadow-sm transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                        >
                          <Eye size={14} /> View
                        </button>
                        <button 
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 rounded-xl shadow-sm transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Studio Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl">
            <form onSubmit={handleSaveSettings} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Studio Location (City/Country)</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="text" 
                      value={settings.location}
                      onChange={(e) => setSettings({...settings, location: e.target.value})}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Public Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="text" 
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Full Address</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-6 text-gray-300" size={20} />
                  <textarea 
                    rows={3}
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="email" 
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Instagram Username</label>
                  <div className="relative">
                    <Instagram className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="text" 
                      value={settings.instagram}
                      onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="px-14 py-5 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-gray-800 transition-all shadow-2xl disabled:bg-gray-400"
              >
                {isSaving ? 'Saving Changes...' : <><Save size={18} /> Save Settings</>}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-12">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">Inquiry Details</span>
                    <h2 className="text-4xl font-serif text-black">{selectedInquiry.brideName} & {selectedInquiry.groomName}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedInquiry(null)}
                    className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-lg font-medium text-black">{selectedInquiry.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Submitted On</p>
                    <p className="text-lg font-medium text-black">{new Date(selectedInquiry.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
                  </div>
                </div>

                <div className="space-y-3 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client Message</p>
                  <p className="text-gray-700 leading-relaxed italic font-serif text-xl">
                    &quot;{selectedInquiry.message}&quot;
                  </p>
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                    onClick={() => window.location.href = `tel:${selectedInquiry.phone}`}
                    className="flex-1 py-5 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all"
                  >
                    <Phone size={16} /> Call Client
                  </button>
                  <button 
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    className="px-10 py-5 border border-red-100 text-red-500 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-red-50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
