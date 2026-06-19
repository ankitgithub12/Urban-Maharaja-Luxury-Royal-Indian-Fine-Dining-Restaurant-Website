import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMessageSquare } from 'react-icons/fi';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const number = '1234567890';
    const text = "Hello Urban Maharaja, I'd like to ask about table availability for dining.";
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 animate-fade-up">
      {/* WhatsApp chat support float */}
      <button
        onClick={openWhatsApp}
        className="bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-full shadow-lg border border-green-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center group cursor-pointer"
        title="Chat on WhatsApp"
      >
        <FiMessageSquare className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-sans text-xs tracking-widest uppercase font-semibold whitespace-nowrap pl-0 group-hover:pl-2">
          WhatsApp Concierge
        </span>
      </button>

      {/* Booking float */}
      <Link
        to="/reserve"
        className="btn-gold-shimmer p-3.5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        title="Reserve a Table"
      >
        <FiCalendar className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-sans text-xs tracking-widest uppercase font-semibold whitespace-nowrap pl-0 group-hover:pl-2">
          Book a Table
        </span>
      </Link>
    </div>
  );
};

export default FloatingCTA;
