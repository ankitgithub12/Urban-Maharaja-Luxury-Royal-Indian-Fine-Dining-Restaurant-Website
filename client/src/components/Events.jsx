import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Check, Crown } from 'lucide-react';

const Events = () => {
  const features = [
    'Customizable configurations for parties between 15 to 150 guests',
    'Curated catering options featuring traditional Mughlai & Awadhi courses',
    'State-of-the-art audiovisual setups for private corporate summits'
  ];

  return (
    <section id="events" className="py-28 md:py-36 bg-[#050C1A] border-t border-gold/10 relative overflow-hidden section-glow">
      {/* Visual background maroon color splash */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4A0E17]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gold/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Text details column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left reveal-on-scroll-left">
            <div className="section-diamond-divider lg:justify-start mb-4">
              <span className="diamond" />
            </div>
            <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-4 block">Banquets & Celebrations</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light mb-6 tracking-wide text-balance">
              Host Your Events in <br />
              <span className="text-gold-gradient-animated">Regal Grandeur</span>
            </h2>
            
            <p className="font-sans text-sm md:text-base text-gold-light/70 tracking-wider font-light leading-relaxed mb-8">
              Whether celebrating a wedding milestone, hosting a foreign trade delegate, or organizing a private family gathering, Urban Maharaja offers a majestic setting that guarantees success. Our events panel handles all aspects, including custom royal catering menus, live musician hires, flower setups, and premium sommelier packages.
            </p>

            {/* Showcase list with check icons */}
            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 justify-center lg:justify-start group">
                  <div className="mt-0.5 p-1.5 bg-gold/10 border border-gold/20 flex-shrink-0 group-hover:bg-gold/20 group-hover:border-gold/35 transition-all duration-400">
                    <Check className="w-3 h-3 text-gold" strokeWidth={2.5} />
                  </div>
                  <span className="font-sans text-xs md:text-sm text-gold-light/85 group-hover:text-gold-light transition-colors duration-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex justify-center lg:justify-start">
              <Link
                to="/contact?subject=Private Event Booking Inquiry"
                id="events-inquire-btn"
                className="btn-gold-shimmer px-8 py-3.5 rounded-none font-sans text-xs tracking-widest uppercase font-semibold flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4" strokeWidth={2} />
                Inquire Private Events
              </Link>
            </div>
          </div>

          {/* Visual card column */}
          <div className="lg:col-span-5 flex justify-center reveal-on-scroll-right">
            <div className="relative p-3 border border-gold/20 max-w-sm sm:max-w-md w-full ornamental-frame">
              {/* Double border */}
              <div className="absolute inset-1 border border-gold/8 pointer-events-none" />
              
              <div className="relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80"
                  alt="Royal Event Space Setup"
                  className="w-full h-[420px] object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A]/60 via-transparent to-transparent" />
                
                {/* Shimmer overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                
                {/* Overlay badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass-panel px-5 py-3 flex items-center gap-3 border border-gold/15">
                    <Crown className="w-5 h-5 text-gold flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block">Private Events</span>
                      <span className="text-[9px] text-gold-light/60 tracking-wider">15 – 150 Guests Capacity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Events;
