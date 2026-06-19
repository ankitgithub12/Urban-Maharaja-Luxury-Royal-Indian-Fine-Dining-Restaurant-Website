import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import MenuSection from './components/MenuSection';
import Experience from './components/Experience';
import Events from './components/Events';
import AmbienceGallery from './components/AmbienceGallery';
import Testimonials from './components/Testimonials';
import ReservationForm from './components/ReservationForm';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Dashboard from './admin/Dashboard';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    if (currentPath === '/admin') return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Grab all elements configured for scroll reveal
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPath]);

  // Listen to browser navigation changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    return <Dashboard navigate={navigate} />;
  }

  return (
    <div className="relative min-h-screen bg-[#050C1A] text-[#FDFBF7] antialiased selection:bg-gold selection:text-royal-navy">
      {/* Premium Glassmorphic Top Navigation Header */}
      <Navbar />

      {/* Hero Banner Section */}
      <Hero />

      <main className="relative">
        {/* Our Royal Story Section */}
        <Story />

        {/* Signature Dishes & Chef Specials */}
        <MenuSection />

        {/* Fine Dining Experience Details */}
        <Experience />

        {/* Private Events & Banquets */}
        <Events />

        {/* Ambience Gallery & Lightbox Viewer */}
        <AmbienceGallery />

        {/* Customer Testimonials & Reviews Slider */}
        <Testimonials />

        {/* Interactive Reservation Wizard */}
        <ReservationForm />

        {/* Contact Coordinates & Google Map */}
        <ContactSection />
      </main>

      {/* Gold-trimmed Footer with Lead Capture */}
      <Footer />

      {/* Mobile-optimized Floating CTA Action Buttons */}
      <FloatingCTA />
    </div>
  );
}

export default App;
