import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiCrown } from 'react-icons/gi';
import { FiMail, FiSend, FiShield, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/newsletter', {
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
      // Fallback local success
      setSubscribed(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#030811] text-[#FDFBF7]/80 border-t border-gold/15 py-16 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
        
        {/* Logo and Intro (Col 1) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2">
            <GiCrown className="w-7 h-7 text-gold" />
            <span className="font-serif text-xl font-bold tracking-widest text-gold-light">
              URBAN <span className="text-gold">MAHARAJA</span>
            </span>
          </div>
          <p className="font-sans text-xs md:text-sm text-gold-light/65 font-light leading-relaxed">
            Recreating the culinary grandeur of traditional Indian royal courts. Experience five-star palace hospitality and ancestral recipes cooked with modern luxury.
          </p>
          {/* Social icons */}
          <div className="flex gap-4">
            <a href="#" className="p-2 border border-gold/15 hover:border-gold text-gold hover:text-gold-light transition-all rounded-full">
              <FiInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 border border-gold/15 hover:border-gold text-gold hover:text-gold-light transition-all rounded-full">
              <FiFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 border border-gold/15 hover:border-gold text-gold hover:text-gold-light transition-all rounded-full">
              <FiTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links (Col 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold uppercase">The Palace</h4>
          <ul className="space-y-2.5 font-sans text-xs md:text-sm font-light">
            <li>
              <Link to="/story" className="hover:text-gold transition-colors">Our Story</Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-gold transition-colors">Signature Menu</Link>
            </li>
            <li>
              <Link to="/experience" className="hover:text-gold transition-colors">Experience</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link>
            </li>
          </ul>
        </div>

        {/* Contact info (Col 3) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold uppercase">Contact</h4>
          <ul className="space-y-2.5 font-sans text-xs md:text-sm font-light">
            <li>Colaba, Mumbai, India</li>
            <li>+91 22 8989 1234</li>
            <li>concierge@urbanmaharaja.com</li>
          </ul>
        </div>

        {/* Newsletter Marketing lead capture (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="font-serif text-sm tracking-widest text-gold font-semibold uppercase">The Maharaja Club</h4>
          <p className="font-sans text-xs text-gold-light/65 font-light leading-relaxed">
            Join the Maharaja Club for complimentary champagne invitations, seasonal menu premieres, and private court events.
          </p>

          {subscribed ? (
            <div className="p-3.5 bg-gold/5 border border-gold/20 text-gold text-xs tracking-wider flex items-center gap-2">
              <FiShield className="w-4 h-4" />
              Your invitation to the club has been registered.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border border-gold/20 focus-within:border-gold transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-[#050C1A] px-4 py-3 text-gold-light text-xs outline-none font-light"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gold hover:bg-gold-dark text-royal-navy px-4 py-3 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiSend className="w-4.5 h-4.5" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Copyright Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gold/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
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
