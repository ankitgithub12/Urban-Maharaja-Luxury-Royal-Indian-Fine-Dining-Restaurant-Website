import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiChevronDown, FiCompass } from 'react-icons/fi';

const Hero = () => {
  const images = [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80'
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Carousel */}
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            idx === activeIdx ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 8s ease-in-out, opacity 2s ease-in-out'
          }}
        />
      ))}

      {/* Gold Radial Shimmer Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-transparent to-[#050C1A]/60" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050C1A]/90" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Palace Crown Crest Badge */}
        <div className="flex justify-center mb-6 animate-pulse-slow">
          <div className="border border-gold/45 rounded-full p-2 bg-[#050C1A]/70 backdrop-blur-sm">
            <div className="border border-gold/20 rounded-full px-4 py-1 flex items-center gap-1.5">
              <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-gold uppercase">Est. 1928</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-gold-light tracking-wide leading-tight mb-6">
          Experience Royal Dining <br />
          <span className="text-gold text-gradient">Like Never Before</span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-sm md:text-lg text-gold-light/75 tracking-wider max-w-2xl mb-12 font-light leading-relaxed">
          Step into a world of majestic flavors, timeless elegance, and unforgettable culinary experiences inspired by the grandeur of Indian palace hospitality.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
          <Link
            to="/reserve"
            className="btn-gold-shimmer w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
          >
            <FiCalendar className="w-4 h-4" />
            Reserve a Table
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-semibold border border-gold/40 hover:border-gold hover:text-gold text-gold-light bg-[#050C1A]/40 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiCompass className="w-4 h-4" />
            Explore Menu
          </Link>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60">Descend</span>
        <Link
          to="/story"
          className="text-gold hover:text-gold-light transition-colors duration-300 animate-bounce"
        >
          <FiChevronDown className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
