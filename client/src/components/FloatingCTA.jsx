import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowUp } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);

      // Calculate scroll progress (0 to 1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const number = '1234567890';
    const text = "Hello Urban Maharaja, I'd like to ask about table availability for dining.";
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress dimensions
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Scroll to top with progress ring */}
      <button
        onClick={scrollToTop}
        className="relative bg-[#050C1A]/80 backdrop-blur-sm hover:bg-[#0D172A] text-gold p-0 rounded-full shadow-lg border border-gold/20 hover:border-gold/50 hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer w-11 h-11 animate-fade-up group"
        title="Back to Top"
        aria-label="Scroll to top"
        style={{ animationDelay: '0ms' }}
      >
        {/* Progress ring */}
        <svg className="scroll-progress-ring absolute inset-0 w-full h-full" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <ArrowUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={2} />
      </button>

      {/* WhatsApp chat support float */}
      <button
        onClick={openWhatsApp}
        className="bg-[#25D366] hover:bg-[#1ebe5d] text-white p-3.5 rounded-full shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 flex items-center justify-center group cursor-pointer relative animate-fade-up"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        style={{ animationDelay: '100ms' }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" style={{ animationDuration: '2s' }} />
        <FaWhatsapp className="w-6 h-6 relative z-10" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-sans text-[10px] tracking-widest uppercase font-semibold whitespace-nowrap pl-0 group-hover:pl-2 relative z-10">
          WhatsApp
        </span>
      </button>

      {/* Booking float */}
      <Link
        to="/reserve"
        className="btn-gold-shimmer p-3.5 rounded-full shadow-lg shadow-gold/10 hover:shadow-gold/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-fade-up animate-bounce-gentle"
        title="Reserve a Table"
        aria-label="Reserve a table"
        style={{ animationDelay: '200ms' }}
      >
        <CalendarDays className="w-5 h-5" strokeWidth={2} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-sans text-[10px] tracking-widest uppercase font-semibold whitespace-nowrap pl-0 group-hover:pl-2">
          Book Table
        </span>
      </Link>
    </div>
  );
};

export default FloatingCTA;
