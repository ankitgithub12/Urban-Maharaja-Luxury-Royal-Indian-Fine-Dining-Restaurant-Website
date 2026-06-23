import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Send, Shield } from 'lucide-react';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://urban-maharaja-luxury-royal-indian-fine.onrender.com/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.success) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
      setSubscribed(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: 'fab fa-instagram', 
      href: '#',
      hoverColor: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-400/50'
    },
    { 
      name: 'Facebook', 
      icon: 'fab fa-facebook-f', 
      href: '#',
      hoverColor: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50'
    },
    { 
      name: 'Twitter', 
      icon: 'fab fa-x-twitter', 
      href: '#',
      hoverColor: 'hover:bg-white/10 hover:border-white/30'
    },
    { 
      name: 'YouTube', 
      icon: 'fab fa-youtube', 
      href: '#',
      hoverColor: 'hover:bg-[#FF0000]/15 hover:border-[#FF0000]/40'
    }
  ];

  return (
    <footer id="site-footer" className="bg-[#030811] text-[#FDFBF7]/80 border-t border-gold/15 py-16 md:py-20 relative overflow-hidden noise-overlay">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-deep-maroon/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Logo and Intro (Col 1) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 group cursor-pointer w-fit">
            <Crown className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" strokeWidth={1.5} />
            <span className="font-serif text-xl font-bold tracking-widest text-gold-light">
              URBAN <span className="text-gold group-hover:text-gold-light transition-colors duration-500">MAHARAJA</span>
            </span>
          </div>
          <p className="font-sans text-xs md:text-sm text-gold-light/65 font-light leading-relaxed">
            Recreating the culinary grandeur of traditional Indian royal courts. Experience five-star palace hospitality and ancestral recipes cooked with modern luxury.
          </p>
          {/* Social icons with brand colors */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`p-2.5 border border-gold/15 text-gold hover:text-white transition-all duration-300 rounded-full shadow-[0_0_5px_rgba(212,175,55,0.05)] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 ${social.hoverColor}`}
                aria-label={social.name}
              >
                <i className={`${social.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links (Col 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold uppercase">The Palace</h4>
          <ul className="space-y-3 font-sans text-xs md:text-sm font-light">
            {[
              { name: 'Our Story', path: '/story' },
              { name: 'Signature Menu', path: '/menu' },
              { name: 'Experience', path: '/experience' },
              { name: 'Gallery', path: '/gallery' },
            ].map((link) => (
              <li key={link.name} className="flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Link to={link.path} className="hover:text-gold transition-all duration-300 transform group-hover:translate-x-1">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info (Col 3) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold uppercase">Contact</h4>
          <ul className="space-y-3 font-sans text-xs md:text-sm font-light text-gold-light/75">
            <li className="leading-relaxed">Colaba, Mumbai, India</li>
            <li>+91 22 8989 1234</li>
            <li className="hover:text-gold transition-colors duration-300 cursor-pointer truncate">concierge@urbanmaharaja.com</li>
          </ul>
          
          {/* Extra links */}
          <div className="pt-4 border-t border-gold/10 space-y-2">
            <a href="#" className="block font-sans text-[10px] tracking-widest uppercase text-gold-light/40 hover:text-gold transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="block font-sans text-[10px] tracking-widest uppercase text-gold-light/40 hover:text-gold transition-colors duration-300">Terms of Service</a>
            <a href="#" className="block font-sans text-[10px] tracking-widest uppercase text-gold-light/40 hover:text-gold transition-colors duration-300">Accessibility</a>
          </div>
        </div>

        {/* Newsletter Marketing lead capture (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold uppercase">The Maharaja Club</h4>
          <p className="font-sans text-xs text-gold-light/65 font-light leading-relaxed">
            Join the Maharaja Club for complimentary champagne invitations, seasonal menu premieres, and private court events.
          </p>

          {subscribed ? (
            <div className="p-3.5 bg-gold/5 border border-gold/20 text-gold text-xs tracking-wider flex items-center gap-2 rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.05)] animate-scale-in">
              <Shield className="w-4 h-4 animate-pulse" strokeWidth={2} />
              <span>Your invitation to the club has been registered.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border border-gold/20 focus-within:border-gold transition-all duration-300 rounded-sm overflow-hidden bg-[#050C1A]/55 backdrop-blur-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-transparent px-4 py-3 text-gold-light text-xs outline-none font-light placeholder:text-gold-light/35 focus:bg-[#050C1A]/40 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gold hover:bg-gold-dark text-royal-navy px-5 py-3 flex items-center justify-center transition-all duration-300 cursor-pointer hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]"
                aria-label="Subscribe to newsletter"
              >
                <Send className="w-4 h-4" strokeWidth={2} />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Copyright Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gold/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="font-sans text-[10px] tracking-widest uppercase text-gold-light/45">
          &copy; {new Date().getFullYear()} Urban Maharaja. All Sovereign Rights Reserved.
        </p>
        <p className="font-sans text-[10px] tracking-widest uppercase text-gold/45">
          Developed in Fine Royal Hospitality standards.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
