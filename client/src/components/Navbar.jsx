import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CalendarDays, Crown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Our Story', path: '/story' },
    { name: 'Signature Menu', path: '/menu' },
    { name: 'Experience', path: '/experience' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Private Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-[#050C1A]/95 backdrop-blur-2xl border-b border-gold/10 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* Subtle gold line at the very top */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-opacity duration-700 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" id="brand-logo">
          <div className="relative">
            <Crown className="w-8 h-8 text-gold transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-serif text-xl font-bold tracking-widest text-gold-light group-hover:text-gold transition-colors duration-300">
            URBAN <span className="text-gold">MAHARAJA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link-animated font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300 py-1 ${
                  isActive 
                    ? 'text-gold font-semibold active' 
                    : 'text-[#FDFBF7]/70 hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            to="/reserve"
            id="nav-reserve-btn"
            className="btn-gold-shimmer px-6 py-2.5 rounded-none font-sans text-[10px] tracking-widest uppercase font-semibold flex items-center gap-2"
          >
            <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
            Reserve Table
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gold hover:text-gold-light focus:outline-none cursor-pointer p-1 transition-colors duration-300"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 top-0 bg-[#050C1A]/[0.98] backdrop-blur-2xl z-40 transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        {/* Close button in mobile menu */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gold hover:text-gold-light p-1 cursor-pointer transition-colors duration-300"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-7 p-8 overflow-y-auto">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-gold" strokeWidth={1.5} />
            <span className="font-serif text-lg font-bold tracking-widest text-gold-light">
              URBAN <span className="text-gold">MAHARAJA</span>
            </span>
          </div>
          
          {/* Gold Divider */}
          <div className="gold-divider w-24" />
          
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-serif text-xl tracking-[0.15em] transition-all duration-500 ${
                  isActive ? 'text-gold font-semibold' : 'text-gold-light/80 hover:text-gold'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(15px)'
                }}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="gold-divider w-24 mt-2" />
          
          <Link
            to="/reserve"
            className="btn-gold-shimmer px-10 py-4 rounded-none font-sans text-xs tracking-widest uppercase font-semibold flex items-center gap-2 mt-2"
            style={{
              transitionDelay: isMobileMenuOpen ? `${navLinks.length * 80}ms` : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(15px)'
            }}
          >
            <CalendarDays className="w-4 h-4" strokeWidth={2} />
            Reserve Table
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
