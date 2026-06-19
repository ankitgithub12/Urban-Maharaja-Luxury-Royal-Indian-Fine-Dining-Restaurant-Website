
import React from 'react';
import { Calendar, Crown, ShieldAlert } from 'lucide-react';

const Events = () => {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSec = document.querySelector('#contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
      // Pre-fill subject if possible
      const subjectInput = document.getElementById('contact-subject');
      if (subjectInput) {
        subjectInput.value = 'Private Event Booking Inquiry';
      }
    }
  };

  return (
    <section id="events" className="py-24 bg-[#050C1A] border-t border-gold/10 relative overflow-hidden">
      {/* Visual background maroon color splash */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4A0E17]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text details column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left reveal-on-scroll">
            <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Banquets & Celebrations</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light mb-6 tracking-wide">
              Host Your Events in <br />
              <span className="text-gold text-gradient">Regal Grandeur</span>
            </h2>
            
            <p className="font-sans text-sm md:text-base text-gold-light/75 tracking-wider font-light leading-relaxed mb-8">
              Whether celebrating a wedding milestone, hosting a foreign trade delegate, or organizing a private family gathering, Urban Maharaja offers a majestic setting that guarantees success. Our events panel handles all aspects, including custom royal catering menus, live musician hires, flower setups, and premium sommelier packages.
            </p>

            {/* Showcase list */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 justify-center lg:justify-start">
                <Crown className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-xs md:text-sm text-gold-light/90">Customizable configurations for parties between 15 to 150 guests</span>
              </div>
              <div className="flex items-start gap-3 justify-center lg:justify-start">
                <Crown className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-xs md:text-sm text-gold-light/90">Curated catering options featuring traditional Mughlai & Awadhi courses</span>
              </div>
              <div className="flex items-start gap-3 justify-center lg:justify-start">
                <Crown className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-xs md:text-sm text-gold-light/90">State-of-the-art audiovisual setups for private corporate summits</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex justify-center lg:justify-start">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="btn-gold-shimmer px-8 py-3.5 rounded-none font-sans text-xs tracking-widest uppercase font-semibold flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Inquire Private Events
              </a>
            </div>
          </div>

          {/* Visual card column */}
          <div className="lg:col-span-5 flex justify-center reveal-on-scroll">
            <div className="relative p-3 border border-gold/20 max-w-sm sm:max-w-md w-full">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold" />
              
              <div className="relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80"
                  alt="Royal Event Space Setup"
                  className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#050C1A]/20" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Events;
