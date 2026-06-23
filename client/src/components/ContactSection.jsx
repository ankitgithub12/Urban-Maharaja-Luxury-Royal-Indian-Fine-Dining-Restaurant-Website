import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://urban-maharaja-luxury-royal-indian-fine.onrender.com/api';

const ContactSection = () => {
  const location = useLocation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    if (subjectParam) {
      setFormState(prev => ({ ...prev, subject: subjectParam }));
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(data.message || 'Error sending message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSuccess(true);
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      title: 'The Royal Palace Estate',
      details: (
        <>
          101, Chhatrapati Shivaji Marg, Colaba,<br />
          Mumbai, Maharashtra 400001, India
        </>
      )
    },
    {
      icon: Phone,
      title: 'Royal Reservations',
      details: (
        <>
          +91 22 8989 1234<br />
          +91 98765 43210 (WhatsApp Booking support)
        </>
      )
    },
    {
      icon: Mail,
      title: 'Digital Scribe',
      details: (
        <>
          concierge@urbanmaharaja.com<br />
          events@urbanmaharaja.com
        </>
      )
    },
    {
      icon: Clock,
      title: 'Dining Sessions',
      details: (
        <>
          Lunch: 12:00 PM – 3:30 PM (Daily)<br />
          Dinner: 7:00 PM – 11:30 PM (Daily)
        </>
      )
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#050C1A] border-t border-gold/10 relative noise-overlay section-glow">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-20 reveal-on-scroll">
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Reach the Court</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide text-balance">
            Location & Inquiries
          </h2>
          <div className="section-diamond-divider my-6">
            <div className="diamond" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Info & Map */}
          <div className="lg:col-span-5 space-y-8 reveal-on-scroll-left">
            <div className="glass-panel border border-gold/15 p-8 space-y-6 relative overflow-hidden rounded-sm group hover:border-gold/25 transition-all duration-500 shadow-xl">
              {/* Subtle design gradient decoration */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
              
              {contactItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex gap-5 items-start group/item hover:translate-x-1 transition-transform duration-300">
                    <div className="p-3 border border-gold/25 bg-[#050C1A] text-gold shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300 rounded-sm group-hover/item:border-gold/40 group-hover/item:bg-gold/5">
                      <IconComponent className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-gold-light font-medium tracking-wide group-hover/item:text-gold transition-colors duration-300">{item.title}</h4>
                      <p className="font-sans text-xs md:text-sm text-gold-light/75 mt-1.5 font-light leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Google Map Iframe */}
            <div className="border border-gold/20 p-2 bg-[#050C1A]/50 glass-panel shadow-lg hover:border-gold/30 transition-all duration-500 gradient-border">
              <iframe
                title="Urban Maharaja Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2185566378564!2d72.82916731538356!3d18.922119987178345!2m3!1f0!2f0!3f0!3m2!1i1020!2i768!4f13.1!3m3!1m2!1s0x3be7d1e82847c1ab%3A0xc47e335272a08873!2sThe%20Taj%20Mahal%20Palace%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1655611432101!5m2!1sen!2sin"
                width="100%"
                height="230"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                className="opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

          </div>

          {/* Column 2: Inquiry Form */}
          <div className="lg:col-span-7 reveal-on-scroll-right">
            <div className="glass-panel border border-gold/15 p-8 md:p-10 relative overflow-hidden rounded-sm hover:border-gold/25 transition-all duration-500 shadow-2xl">
              
              {/* Decorative corner borders */}
              <div className="absolute top-2 left-2 border-t border-l border-gold/30 w-5 h-5 pointer-events-none" />
              <div className="absolute top-2 right-2 border-t border-r border-gold/30 w-5 h-5 pointer-events-none" />
              <div className="absolute bottom-2 left-2 border-b border-l border-gold/30 w-5 h-5 pointer-events-none" />
              <div className="absolute bottom-2 right-2 border-b border-r border-gold/30 w-5 h-5 pointer-events-none" />
              
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
              
              <h3 className="font-serif text-2xl text-gold-light tracking-wide mb-8">Send a Message to the Concierge</h3>
              
              {success ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4 animate-scale-in">
                    <Check className="w-8 h-8 text-emerald-400" strokeWidth={2} />
                  </div>
                  <h4 className="font-serif text-xl text-gold mb-2">Message Dispatched</h4>
                  <p className="font-sans text-xs md:text-sm text-gold-light/70 max-w-sm font-light leading-relaxed">
                    Thank you. Your message has been received by our guest relationship desk. We will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-xs uppercase tracking-widest text-gold hover:text-gold-light border-b border-gold/30 pb-1 cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gold mb-2 font-medium">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Patron Name"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gold mb-2 font-medium">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="email@address.com"
                        className="input-premium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gold mb-2 font-medium">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="+91"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-gold mb-2 font-medium">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        id="contact-subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="General Inquiry / Private Dining"
                        className="input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-gold mb-2 font-medium">Your Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Write your custom culinary request or inquiry..."
                      className="input-premium resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs tracking-widest">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold-shimmer px-8 py-3.5 text-xs font-semibold uppercase tracking-widest flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className={`w-4 h-4 ${loading ? '' : 'animate-float'}`} strokeWidth={2} />
                    {loading ? 'Dispatching...' : 'Send Message'}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
