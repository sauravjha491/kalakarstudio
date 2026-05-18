// 'use client';

// import React from 'react';
// import { Search, ArrowRight } from 'lucide-react';

// export default function Header() {
//   return (
//     <header className="h-24 px-10 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
//       {/* Search Bar */}
//       <div className="flex-1 max-w-3xl relative group">
//         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors pointer-events-none">
//           <Search size={18} />
//         </div>
//         <input 
//           type="text" 
//           placeholder="Search a film here"
//           className="w-full h-14 pl-14 pr-14 bg-gray-50 border border-transparent rounded-full text-sm font-medium focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-100 transition-all text-black placeholder:text-gray-400"
//         />
//         <button className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
//           <ArrowRight size={18} />
//         </button>
//       </div>

//       {/* Actions */}
//       <div className="flex items-center gap-4 ml-10">
//         <button className="px-8 py-3.5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/5">
//           FAQs
//         </button>
//         <button className="px-8 py-3.5 bg-[#f04438] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full flex items-center gap-2.5 hover:bg-[#d93a2f] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/10">
//           Enquire <ArrowRight size={14} strokeWidth={3} />
//         </button>
//       </div>
//     </header>
//   );
// }
'use client';

import React, { useMemo, useState } from 'react';
import {
  Search,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  
} from 'lucide-react';
import { motion } from 'framer-motion';

const movies = [
  'Inception',
  'Interstellar',
  'The Dark Knight',
  'Avatar',
  'Titanic',
  'John Wick',
  'Avengers Endgame',
  'Spider-Man No Way Home',
  'The Batman',
  'Oppenheimer',
];

const faqData = [
  {
    question: 'What photography services do you offer?',
    answer:
      'We provide photo shoots, video shoots, wedding photography, studio portraits, event coverage, and professional editing services.',
  },
  {
    question: 'How can I book a photo or video shoot?',
    answer:
      'You can contact us through our booking form, phone number, or social media to schedule your session.',
  },
  {
    question: 'Do you provide wedding and event coverage?',
    answer:
      'Yes, we offer full wedding, engagement, birthday, and event photography and videography packages.',
  },
  {
    question: 'Can I choose my own shoot location?',
    answer:
      'Yes, you can choose either an outdoor location or our studio for your photo or video shoot.',
  },
  {
    question: 'How long does it take to receive edited photos or videos?',
    answer:
      'Delivery time depends on the project, but most edited photos and videos are completed within a few days.',
  },
  {
    question: 'Do you offer professional video editing?',
    answer:
      'Yes, we provide cinematic video editing, color grading, and social media ready video production.',
  },
];export default function Header() {
  const [search, setSearch] = useState('');
  const [showFaqs, setShowFaqs] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [faqs, setFaqs] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/faqs')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error(err));
  }, []);

  // Filter Movies
  const filteredMovies = useMemo(() => {
    if (!search) return [];

    return movies.filter((movie) =>
      movie.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    phone: '',
    message: ''
  });

  // Search Submit
  const handleSearch = () => {
    if (!search.trim()) {
      alert('Please enter a movie name.');
      return;
    }

    if (filteredMovies.length > 0) {
      alert(`Found ${filteredMovies.length} result(s)!`);
    } else {
      alert('No movies found.');
    }
  };

  // Enquiry Submit
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
    <>
      <header className="h-24 px-10 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        {/* Search Bar */}
        <div className="flex-1 max-w-3xl relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors pointer-events-none z-10">
            <Search size={18} />
          </div>

          <input
            type="text"
            placeholder="Search a film here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full h-14 pl-14 pr-14 bg-gray-50 border border-transparent rounded-full text-sm font-medium focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-100 transition-all text-black placeholder:text-gray-400"
          />

          <button
            onClick={handleSearch}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
          >
            <ArrowRight size={18} />
          </button>

          {/* Search Results */}
          {search && (
            <div className="absolute top-16 left-0 w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-3 z-50">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 rounded-2xl hover:bg-gray-100 cursor-pointer transition-all text-sm font-medium"
                    onClick={() => setSearch(movie)}
                  >
                    {movie}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No movies found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-10">
          <button
            onClick={() => setShowFaqs(true)}
            className="px-8 py-3.5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/5"
          >
            FAQs
          </button>

          <button
            onClick={() => setShowEnquiry(true)}
            className="px-8 py-3.5 bg-[#f04438] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full flex items-center gap-2.5 hover:bg-[#d93a2f] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/10"
          >
            Enquire <ArrowRight size={14} strokeWidth={3} />
          </button>
        </div>
      </header>

      {/* FAQ Modal */}
      {showFaqs && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-2xl relative">
            <button
              onClick={() => setShowFaqs(false)}
              className="absolute right-5 top-5 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold"
                    >
                      {faq.question}

                      {openFaq === index ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {openFaq === index && (
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-7">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold"
                    >
                      {faq.question}

                      {openFaq === index ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {openFaq === index && (
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-7">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {showEnquiry && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    
    {/* Popup Container */}
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-2xl"
    >
      
      {/* Close Button */}
      <button
        onClick={() => {
          setShowEnquiry(false);
          setIsSuccess(false);
        }}
        className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition-all"
      >
        ✕
      </button>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl border border-green-100 text-center flex flex-col items-center justify-center shadow-2xl"
        >
          <CheckCircle2 size={64} className="text-green-500 mb-6" />

          <h2 className="text-3xl font-serif mb-3 text-green-900">
            Thank you!
          </h2>

          <p className="text-green-700 max-w-md leading-7">
            Your inquiry has been received. We will get back to you soon.
          </p>

          <button
            onClick={() => setIsSuccess(false)}
            className="mt-8 px-6 py-3 rounded-full bg-green-600 text-white text-sm font-bold uppercase tracking-widest hover:bg-green-700 transition-all"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-2xl"
        >
          <div className="mb-4">
            <h2 className="text-3xl font-serif text-black">
              Wedding Inquiry
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Fill out the form below and we’ll contact you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Bride&apos;s Name
              </label>

              <input
                type="text"
                required
                value={formData.brideName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brideName: e.target.value,
                  })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Groom&apos;s Name
              </label>

              <input
                type="text"
                required
                value={formData.groomName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    groomName: e.target.value,
                  })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Phone Number
            </label>

            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Message
            </label>

            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all disabled:bg-gray-400"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <Send size={18} />
                Send Inquiry
              </>
            )}
          </button>
        </motion.form>
      )}
    </motion.div>
  </div>
)}
    </>
  );
}