import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

// Reusable ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Reusable premium header for subpages
const PageHeader = ({ title, subtitle, bgImage }) => {
  return (
    <div className="relative h-[45vh] min-h-[320px] w-full flex items-center justify-center overflow-hidden bg-[#050C1A] pt-16">
      {/* Background Image / Gradient */}
      {bgImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0E17] via-[#050C1A] to-[#4A0E17] opacity-60" />
      )}
      
      {/* Gold Radial Shimmer Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-transparent to-[#050C1A]/80" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050C1A]/95" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Decorative badge */}
        <div className="inline-block border border-gold/30 px-3 py-1 bg-[#050C1A]/60 backdrop-blur-sm mb-4">
          <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase block">{subtitle}</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-gold-light tracking-wide royal-underline">
          {title}
        </h1>
      </div>
    </div>
  );
};

// Home (Main Page) containing all sections sequentially
const Home = () => {
  return (
    <>
      <Hero />
      <main className="relative">
        <Story />
        <MenuSection />
        <Experience />
        <Events />
        <AmbienceGallery />
        <Testimonials />
        <ReservationForm />
        <ContactSection />
      </main>
    </>
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Intersection Observer for scroll reveal animations (only for home page or subpages with reveal classes)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [location.pathname]);

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-[#050C1A] text-[#FDFBF7] antialiased selection:bg-gold selection:text-royal-navy">
      <ScrollToTop />
      
      {/* Do not render client elements on Admin screens */}
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<Home />} />

        {/* Dedicated Page: Our Story */}
        <Route path="/story" element={
          <>
            <PageHeader 
              title="Our Heritage & Story" 
              subtitle="The Sovereign Legacy" 
              bgImage="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80" 
            />
            <Story />
            <Testimonials />
          </>
        } />

        {/* Dedicated Page: Signature Menu */}
        <Route path="/menu" element={
          <>
            <PageHeader 
              title="Imperial Dining Menu" 
              subtitle="Epicurean Selections" 
              bgImage="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1920&q=80" 
            />
            <MenuSection />
          </>
        } />

        {/* Dedicated Page: Fine Dining Experience */}
        <Route path="/experience" element={
          <>
            <PageHeader 
              title="The Maharaja Experience" 
              subtitle="Regal Hospitality Protocols" 
              bgImage="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80" 
            />
            <Experience />
            <Testimonials />
          </>
        } />

        {/* Dedicated Page: Ambience Gallery */}
        <Route path="/gallery" element={
          <>
            <PageHeader 
              title="Gallery of Royal Ambience" 
              subtitle="Visual Splendor" 
              bgImage="https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&w=1920&q=80" 
            />
            <AmbienceGallery />
          </>
        } />

        {/* Dedicated Page: Private Events */}
        <Route path="/events" element={
          <>
            <PageHeader 
              title="Banquets & Private Celebrations" 
              subtitle="Host In Royal Splendor" 
              bgImage="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1920&q=80" 
            />
            <Events />
          </>
        } />

        {/* Dedicated Page: Secure Reservation */}
        <Route path="/reserve" element={
          <>
            <PageHeader 
              title="Online Reservation Desk" 
              subtitle="Guarantee Your Throne" 
              bgImage="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80" 
            />
            <ReservationForm />
          </>
        } />

        {/* Dedicated Page: Contact Concierge */}
        <Route path="/contact" element={
          <>
            <PageHeader 
              title="Reach the Sovereign Court" 
              subtitle="Concierge & Directions" 
              bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80" 
            />
            <ContactSection />
          </>
        } />

        {/* Admin Dashboard Page */}
        <Route path="/admin" element={<Dashboard navigate={navigate} />} />
        <Route path="/admin/*" element={<Dashboard navigate={navigate} />} />
      </Routes>

      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingCTA />}
    </div>
  );
}

export default App;
