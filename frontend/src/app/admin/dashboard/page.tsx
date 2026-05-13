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
  Instagram,
  Menu,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [films, setFilms] = useState<any[]>([]);
  const [music, setMusic] = useState<any[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'film' | 'music' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  
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
    fetchFilms();
    fetchMusic();
    fetchSettings();
  }, []);

  const fetchInquiries = () => {
    fetch('http://localhost:5000/api/inquiries').then(res => res.json()).then(data => setInquiries(data));
  };
  const fetchFilms = () => {
    fetch('http://localhost:5000/api/films').then(res => res.json()).then(data => setFilms(data));
  };
  const fetchMusic = () => {
    fetch('http://localhost:5000/api/music').then(res => res.json()).then(data => setMusic(data));
  };
  const fetchSettings = () => {
    fetch('http://localhost:5000/api/settings').then(res => res.json()).then(data => setSettings(data));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await fetch('http://localhost:5000/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    setIsSaving(false);
  };

  const handleDelete = async (type: 'inquiries' | 'films' | 'music', id: number) => {
    if (confirm(`Delete this ${type.slice(0, -1)}?`)) {
      const res = await fetch(`http://localhost:5000/api/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (type === 'inquiries') fetchInquiries();
        if (type === 'films') fetchFilms();
        if (type === 'music') fetchMusic();
      }
    }
  };

  const openModal = (type: 'film' | 'music', item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || (type === 'film' ? {
      title: '', date: '', location: '', image: '', videoUrl: '', category: 'Wedding Film'
    } : {
      title: '', artist: '', image: '', spotifyUrl: ''
    }));
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const type = modalType === 'film' ? 'films' : 'music';
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `http://localhost:5000/api/${type}/${editingItem.id}` : `http://localhost:5000/api/${type}`;
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      modalType === 'film' ? fetchFilms() : fetchMusic();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[110]">
            <CheckCircle className="text-green-500" size={20} />
            <span className="font-bold uppercase tracking-widest text-[10px]">Action Successful</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-black text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-10 flex justify-between items-center">
          <Link href="/">
            <h2 className="text-2xl font-serif font-bold tracking-tight uppercase leading-none">
              Kalakar <br /> Studio <span className="text-accent block text-xs tracking-[0.4em] mt-2 font-sans">Admin</span>
            </h2>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white"><X size={24} /></button>
        </div>
        <nav className="flex-1 px-6 space-y-2">
          {[
            { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
            { id: 'inquiries', name: 'Inquiries', icon: Mail, count: inquiries.length },
            { id: 'films', name: 'Manage Films', icon: Film },
            { id: 'music', name: 'Manage Music', icon: Music },
            { id: 'settings', name: 'Studio Settings', icon: Settings },
          ].map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-white text-black shadow-lg scale-[1.02]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={18} className={activeTab === item.id ? 'text-accent' : 'group-hover:text-accent transition-colors'} />
              <span className="font-bold uppercase tracking-widest text-[10px]">{item.name}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="ml-auto bg-accent text-black text-[9px] font-black px-2 py-0.5 rounded-full">{item.count}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-6">
          <Link href="/admin" className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors">
            <LogOut size={18} />
            <span className="font-bold uppercase tracking-widest text-[10px]">Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-40">
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-50 rounded-xl text-black"><Menu size={20} /></button>
           <h2 className="font-serif font-bold uppercase tracking-widest text-sm">Kalakar Admin</h2>
           <div className="w-10 h-10 bg-black rounded-full overflow-hidden flex items-center justify-center text-white font-black text-xs">AD</div>
        </header>

        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block font-sans">System Management</span>
              <h1 className="text-4xl md:text-6xl font-serif capitalize text-black">{activeTab.replace('-', ' ')}</h1>
            </div>
            {activeTab === 'films' && (
              <button onClick={() => openModal('film')} className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl font-bold uppercase tracking-widest text-[10px] w-full md:w-auto justify-center">
                <Plus size={16} /> Add New Film
              </button>
            )}
            {activeTab === 'music' && (
              <button onClick={() => openModal('music')} className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl font-bold uppercase tracking-widest text-[10px] w-full md:w-auto justify-center">
                <Plus size={16} /> Add New Track
              </button>
            )}
          </header>

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Total Inquiries', value: inquiries.length, trend: 'Active leads', color: 'bg-green-500', icon: Mail },
                { label: 'Total Films', value: films.length, trend: 'Live on site', color: 'bg-blue-500', icon: Film },
                { label: 'Original Tracks', value: music.length, trend: 'Featured music', color: 'bg-accent', icon: Music },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700`} />
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} text-white shadow-lg`}><stat.icon size={24} /></div>
                    <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                  <h3 className="text-5xl font-serif text-black">{stat.value}</h3>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead><tr className="bg-gray-50/50"><th className="px-10 py-8 text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Couple Details</th><th className="px-10 py-8 text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Contact</th><th className="px-10 py-8 text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Date</th><th className="px-10 py-8 text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Actions</th></tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent"><User size={20} /></div>
                          <div><div className="font-serif text-lg text-black">{inquiry.brideName} & {inquiry.groomName}</div><div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Wedding Film Inquiry</div></div>
                        </div>
                      </td>
                      <td className="px-10 py-8 font-medium text-black text-sm">{inquiry.phone}</td>
                      <td className="px-10 py-8 text-gray-500 text-sm">{new Date(inquiry.date).toLocaleDateString()}</td>
                      <td className="px-10 py-8"><div className="flex gap-3"><button onClick={() => setSelectedInquiry(inquiry)} className="px-5 py-3 bg-white border border-gray-100 text-black hover:bg-black hover:text-white rounded-xl shadow-sm transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Eye size={14} /> Details</button><button onClick={() => handleDelete('inquiries', inquiry.id)} className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 rounded-xl shadow-sm transition-all"><Trash2 size={16} /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'films' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {films.map((film) => (
                <div key={film.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={film.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button onClick={() => openModal('film', film)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-accent hover:text-white transition-all"><Edit2 size={20} /></button>
                      <button onClick={() => handleDelete('films', film.id)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-serif text-2xl text-black">{film.title}</h3>
                       <span className="text-[9px] font-black uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">{film.category}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                       <span>{film.date}</span>
                       <div className="w-1 h-1 bg-gray-300 rounded-full" />
                       <span>{film.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'music' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {music.map((track) => (
                <div key={track.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group p-6">
                  <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-6">
                    <img src={track.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button onClick={() => openModal('music', track)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-accent hover:text-white transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete('music', track.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-black mb-1">{track.title}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{track.artist}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl">
              <form onSubmit={handleSaveSettings} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Studio Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                      <input type="text" value={settings.location} onChange={(e) => setSettings({...settings, location: e.target.value})}
                        className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Public Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                      <input type="text" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})}
                        className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Full Address</label>
                  <textarea rows={3} value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})}
                    className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Email</label>
                    <input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})}
                      className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Instagram</label>
                    <input type="text" value={settings.instagram} onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                      className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-black transition-all text-black font-medium" />
                  </div>
                </div>
                <button type="submit" disabled={isSaving} className="w-full md:w-auto px-14 py-5 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-2xl disabled:bg-gray-400">
                  {isSaving ? 'Updating...' : <><Save size={18} /> Update Settings</>}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Content Management Modal (Films & Music) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleFormSubmit} className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-black">{editingItem ? 'Edit' : 'Add New'} {modalType === 'film' ? 'Film' : 'Track'}</h2>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-all"><X size={20} /></button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                  </div>

                  {modalType === 'film' ? (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date (e.g. JUN 2025)</label>
                          <input type="text" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label>
                          <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12} /> Thumbnail Image URL</label>
                        <input type="url" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Video size={12} /> Video URL (YouTube/Vimeo)</label>
                        <input type="url" required value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Artist</label>
                        <input type="text" required value={formData.artist} onChange={(e) => setFormData({...formData, artist: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12} /> Cover Image URL</label>
                        <input type="url" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ExternalLink size={12} /> Spotify/Music URL</label>
                        <input type="url" required value={formData.spotifyUrl} onChange={(e) => setFormData({...formData, spotifyUrl: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-black font-medium" />
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-12 flex gap-4">
                  <button type="submit" className="flex-1 py-5 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gray-800 transition-all shadow-xl">
                    {editingItem ? 'Save Changes' : 'Add to Collection'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-5 border border-gray-100 text-gray-400 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedInquiry(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden p-12">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">Inquiry Details</span>
                  <h2 className="text-4xl font-serif text-black">{selectedInquiry.brideName} & {selectedInquiry.groomName}</h2>
                </div>
                <button onClick={() => setSelectedInquiry(null)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-all"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-2 gap-10 mb-12">
                <div className="space-y-1"><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Phone</p><p className="text-lg font-medium text-black">{selectedInquiry.phone}</p></div>
                <div className="space-y-1"><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Date</p><p className="text-lg font-medium text-black">{new Date(selectedInquiry.date).toLocaleDateString()}</p></div>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 mb-12">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Client Message</p>
                <p className="text-gray-700 leading-relaxed italic font-serif text-xl">&quot;{selectedInquiry.message}&quot;</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => window.location.href = `tel:${selectedInquiry.phone}`} className="flex-1 py-5 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-lg"><Phone size={16} /> Call Client</button>
                <button onClick={() => handleDelete('inquiries', selectedInquiry.id)} className="px-10 py-5 border border-red-100 text-red-500 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-red-50 transition-all">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
