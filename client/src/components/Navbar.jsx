import React, { useState, useEffect } from 'react';
import { Menu, X, Crown, CalendarRange } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Signature Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Private Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#050C1Ac0] backdrop-blur-md border-b border-gold/15 py-4 shadow-lg' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Crown className="w-8 h-8 text-gold transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="font-serif text-2xl font-bold tracking-widest text-gold-light group-hover:text-gold transition-colors duration-300">
            URBAN <span className="text-gold">MAHARAJA</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-sans text-sm tracking-widest text-[#FDFBF7]/80 hover:text-gold transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:height-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="#reserve"
            onClick={(e) => handleLinkClick(e, '#reserve')}
            className="btn-gold-shimmer px-6 py-2.5 rounded-none font-sans text-xs tracking-widest uppercase font-semibold flex items-center gap-2"
          >
            <CalendarRange className="w-4 h-4" />
            Reserve Table
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gold hover:text-gold-light focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 top-[72px] bg-[#050C1A]/95 backdrop-blur-lg border-t border-gold/10 z-40 transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-serif text-2xl tracking-widest text-gold-light hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#reserve"
            onClick={(e) => handleLinkClick(e, '#reserve')}
            className="btn-gold-shimmer px-8 py-3.5 rounded-none font-sans text-sm tracking-widest uppercase font-semibold flex items-center gap-2 mt-4"
          >
            <CalendarRange className="w-5 h-5" />
            Reserve Table
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
