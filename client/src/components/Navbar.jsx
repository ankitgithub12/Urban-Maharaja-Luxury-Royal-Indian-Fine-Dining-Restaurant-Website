import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiCalendar } from 'react-icons/fi';
import { GiCrown } from 'react-icons/gi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Our Story', path: '/story' },
    { name: 'Signature Menu', path: '/menu' },
    { name: 'Experience', path: '/experience' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Private Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#050C1Ac0] backdrop-blur-md border-b border-gold/15 py-4 shadow-lg' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <GiCrown className="w-8 h-8 text-gold transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="font-serif text-2xl font-bold tracking-widest text-gold-light group-hover:text-gold transition-colors duration-300">
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
                className={`font-sans text-sm tracking-widest transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:height-[1px] after:bg-gold after:transition-all after:duration-300 ${
                  isActive 
                    ? 'text-gold after:w-full' 
                    : 'text-[#FDFBF7]/80 hover:text-gold after:w-0 hover:after:w-full'
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
            className="btn-gold-shimmer px-6 py-2.5 rounded-none font-sans text-xs tracking-widest uppercase font-semibold flex items-center gap-2"
          >
            <FiCalendar className="w-4 h-4" />
            Reserve Table
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gold hover:text-gold-light focus:outline-none cursor-pointer"
        >
          {isMobileMenuOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 top-[72px] bg-[#050C1A]/95 backdrop-blur-lg border-t border-gold/10 z-40 transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)] gap-8 p-8 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-serif text-2xl tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-gold font-semibold' : 'text-gold-light hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/reserve"
            className="btn-gold-shimmer px-8 py-3.5 rounded-none font-sans text-sm tracking-widest uppercase font-semibold flex items-center gap-2 mt-4"
          >
            <FiCalendar className="w-5 h-5" />
            Reserve Table
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
