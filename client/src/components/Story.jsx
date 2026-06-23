import React, { useState, useEffect, useRef } from 'react';
import { Crown, Sparkles } from 'lucide-react';

const Story = () => {
  const stats = [
    { value: 96, suffix: '+', label: 'Years of Legacy' },
    { value: 200, suffix: '+', label: 'Royal Recipes' },
    { value: 15, suffix: 'K+', label: 'Patrons Served' },
    { value: 4.9, suffix: '', label: 'Michelin Rating', isDecimal: true },
  ];

  // Animated counter hook
  const [countersVisible, setCountersVisible] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersVisible) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersVisible]);

  useEffect(() => {
    if (!countersVisible) return;

    stats.forEach((stat, i) => {
      const target = stat.value;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        // Ease-out quad
        const progress = 1 - Math.pow(1 - step / steps, 2);
        current = stat.isDecimal
          ? parseFloat((target * progress).toFixed(1))
          : Math.round(target * progress);

        setCounters((prev) => {
          const next = [...prev];
          next[i] = current;
          return next;
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters((prev) => {
            const next = [...prev];
            next[i] = target;
            return next;
          });
        }
      }, duration / steps);
    });
  }, [countersVisible]);

  return (
    <section id="story" className="relative py-28 md:py-36 bg-[#050C1A] overflow-hidden section-glow">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A0E17]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Visuals Column with Royal Frame */}
          <div className="lg:col-span-5 flex justify-center reveal-on-scroll-left">
            <div className="relative p-3 border border-gold/20 max-w-sm sm:max-w-md w-full ornamental-frame">
              {/* Double border effect */}
              <div className="absolute inset-1 border border-gold/8 pointer-events-none" />
              
              <div className="relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&h=1000&q=80"
                  alt="Royal Culinary Crafting"
                  className="w-full h-[480px] md:h-[540px] object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <p className="font-serif text-lg text-gold font-semibold tracking-wider">Chef Devendra Raja</p>
                  <p className="font-sans text-[10px] text-gold-light/80 tracking-[0.2em] uppercase">Grand Culinary Patron</p>
                </div>
                
                {/* Floating badge on image */}
                <div className="absolute top-4 right-4 bg-[#050C1A]/80 backdrop-blur-sm border border-gold/25 px-3 py-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gold" strokeWidth={2} />
                  <span className="text-[9px] uppercase tracking-widest text-gold font-semibold">Master Chef</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left reveal-on-scroll-right">
            {/* Section label with diamond */}
            <div className="section-diamond-divider lg:justify-start mb-4">
              <span className="diamond" />
            </div>
            <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-4 block">Our Heritage</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light mb-8 tracking-wide text-balance">
              The Grandeur of <br />
              <span className="text-gold-gradient-animated">Indian Palace Culinary Art</span>
            </h2>
            
            <div className="space-y-5 text-[#FDFBF7]/80 font-sans font-light tracking-wide text-sm md:text-base leading-relaxed">
              {/* Drop cap on first paragraph */}
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.8]">
                Urban Maharaja was born from a desire to resurrect the lost banquets of the Rajputana, Awadh, and Mughal royal houses. Our kitchen is a sanctum where centuries-old recipes, secret spice blends, and ancestral cooking techniques are preserved and elevated for the modern connoisseur.
              </p>
              <p>
                Every preparation is an artistic celebration. From the slow charcoal dum-cooking methods of Lucknow to the vibrant, roasted clay tandoori preparations of Rajasthan, we curate experiences that honor the grandeur of historical royal courts.
              </p>
              <p>
                We do not simply serve food; we host a courtly ritual. Impeccable hospitality, hand-hammered copper vessels, gold-leaf garnishments, and a regal atmosphere await you. Welcome to the dining table of the kings.
              </p>
            </div>

            {/* Signature Showcase */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 border-t border-gold/10 pt-8">
              <div>
                <span className="font-accent text-gold text-2xl tracking-wider block italic font-bold">Devendra Raja</span>
                <span className="font-sans text-[10px] tracking-[0.25em] text-gold-light/60 uppercase block mt-1">Grand Culinary Patron</span>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-gold/20" />
              <div className="text-left text-xs text-gold-light/70 tracking-wider max-w-xs leading-relaxed italic">
                "Each spice is measured, each flavor is balanced to tell a story of imperial India."
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row with Animated Counters */}
        <div ref={statsRef} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 reveal-on-scroll">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card-premium p-6 md:p-8 text-center border border-gold/10 group cursor-default"
            >
              <div className="flex justify-center mb-3">
                <Crown className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient block tabular-nums">
                {stat.isDecimal ? counters[i].toFixed(1) : counters[i]}{stat.suffix}
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-gold-light/55 uppercase mt-2 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
