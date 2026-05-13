'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    phone: '',
    message: ''
  });
  const [settings, setSettings] = useState({
    email: 'hello@kalakarstudio.com.np',
    phone: '+977 9800000000',
    address: 'Janakpur, Nepal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ brideName: '', groomName: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight uppercase text-black">GET IN TOUCH</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          We’d love to hear your story. Based in the heart of {settings.address.split(',')[0]}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
        <div className="space-y-12">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-accent">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-serif mb-1 text-black">Email Us</h3>
              <p className="text-gray-500">{settings.email}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-accent">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-serif mb-1 text-black">Call Us</h3>
              <p className="text-gray-500">{settings.phone}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-accent">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-serif mb-1 text-black">Visit Us</h3>
              <p className="text-gray-500">{settings.address}</p>
            </div>
          </div>
        </div>

        <div className="relative">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 p-12 rounded-2xl border border-green-100 text-center flex flex-col items-center justify-center h-full"
            >
              <CheckCircle2 size={64} className="text-green-500 mb-6" />
              <h2 className="text-2xl font-serif mb-2 text-green-900">Thank you!</h2>
              <p className="text-green-700">Your inquiry has been received. We will get back to you soon.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-sm font-bold uppercase tracking-widest text-green-800 border-b border-green-800"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Bride&apos;s Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.brideName}
                    onChange={(e) => setFormData({...formData, brideName: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent text-black" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Groom&apos;s Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.groomName}
                    onChange={(e) => setFormData({...formData, groomName: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent text-black" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent text-black" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent text-black"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Inquiry</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
