import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronDown, Compass, Crown, Sparkles } from 'lucide-react';

const Hero = () => {
  const images = [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80'
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Mark as loaded after mount for entrance animations
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setParallaxY(window.scrollY * 0.3);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating particles config
  const particles = [
    { top: '12%', left: '8%', size: 'w-1.5 h-1.5', opacity: 'bg-gold/25', delay: '0s', dur: '7s' },
    { top: '22%', right: '12%', size: 'w-2 h-2', opacity: 'bg-gold/15', delay: '1s', dur: '8s' },
    { top: '55%', left: '18%', size: 'w-1 h-1', opacity: 'bg-gold/20', delay: '2s', dur: '6s' },
    { top: '38%', right: '22%', size: 'w-1 h-1', opacity: 'bg-gold/25', delay: '3s', dur: '9s' },
    { top: '65%', right: '8%', size: 'w-1.5 h-1.5', opacity: 'bg-gold/10', delay: '4s', dur: '7s' },
    { top: '48%', left: '32%', size: 'w-0.5 h-0.5', opacity: 'bg-gold/20', delay: '1.5s', dur: '5s' },
    { top: '75%', left: '45%', size: 'w-1 h-1', opacity: 'bg-gold/15', delay: '0.5s', dur: '8s' },
    { top: '18%', left: '55%', size: 'w-0.5 h-0.5', opacity: 'bg-gold/30', delay: '2.5s', dur: '6s' },
  ];

  return (
    <section ref={sectionRef} id="hero-section" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Carousel with Ken Burns Effect */}
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
            idx === activeIdx ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${parallaxY * 0.15}px) scale(${idx === activeIdx ? 1.08 : 1.0})`,
            transition: 'transform 8s ease-in-out, opacity 2.5s ease-in-out'
          }}
        />
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-transparent to-[#050C1A]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050C1A_80%)]" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,12,26,0.5)_100%)]" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Decorative Mughal arch overlay (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0 C40 30 10 40 10 60 L70 60 C70 40 40 30 40 0Z' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute ${p.size} ${p.opacity} rounded-full animate-float`}
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Palace Crown Crest Badge */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '300ms' }}>
          <div className="border border-gold/40 rounded-full p-2.5 bg-[#050C1A]/70 backdrop-blur-sm shadow-lg shadow-gold/5 animate-glow-pulse">
            <div className="border border-gold/25 rounded-full px-5 py-1.5 flex items-center gap-2.5">
              <Crown className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.3em] font-sans font-medium text-gold uppercase">Est. 1928</span>
              <Sparkles className="w-3 h-3 text-gold/60" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Headline with entrance animation */}
        <div className="overflow-hidden">
          <h1 className={`font-serif text-4xl md:text-6xl lg:text-[5.5rem] font-bold text-gold-light tracking-wide leading-[1.1] mb-6 text-balance transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '500ms' }}>
            Experience Royal Dining <br />
            <span className="text-gold-gradient-animated">Like Never Before</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className={`font-sans text-sm md:text-lg text-gold-light/70 tracking-wider max-w-2xl mb-12 font-light leading-relaxed transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '700ms' }}>
          Step into a world of majestic flavors, timeless elegance, and unforgettable culinary experiences inspired by the grandeur of Indian palace hospitality.
        </p>

        {/* Call to Actions */}
        <div className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '900ms' }}>
          <Link
            to="/reserve"
            id="hero-reserve-btn"
            className="btn-gold-shimmer w-full sm:w-auto px-10 py-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5"
          >
            <CalendarDays className="w-4 h-4" strokeWidth={2} />
            Reserve a Table
          </Link>
          <Link
            to="/menu"
            id="hero-menu-btn"
            className="w-full sm:w-auto px-10 py-4 text-xs uppercase tracking-widest font-semibold border border-gold/30 hover:border-gold hover:text-gold text-gold-light bg-[#050C1A]/40 backdrop-blur-sm transition-all duration-500 flex items-center justify-center gap-2.5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]"
          >
            <Compass className="w-4 h-4" strokeWidth={2} />
            Explore Menu
          </Link>
        </div>

        {/* Image carousel dots */}
        <div className={`flex gap-2.5 mt-14 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1100ms' }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`View slide ${idx + 1}`}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                idx === activeIdx ? 'bg-gold w-8 h-2 shadow-[0_0_12px_rgba(212,175,55,0.4)]' : 'bg-gold/20 w-2 h-2 hover:bg-gold/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '1300ms' }}>
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50">Discover</span>
        <Link
          to="/story"
          className="text-gold/60 hover:text-gold transition-colors duration-300"
          aria-label="Discover our story"
        >
          <ChevronDown className="w-5 h-5 animate-bounce-gentle" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
