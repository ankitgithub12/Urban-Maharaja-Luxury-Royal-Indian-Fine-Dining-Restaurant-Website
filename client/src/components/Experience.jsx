import React from 'react';
import { FiMusic, FiShield } from 'react-icons/fi';
import { FaUniversity } from 'react-icons/fa';
import { GiWineGlass } from 'react-icons/gi';

const Experience = () => {
  const experiences = [
    {
      icon: <FaUniversity className="w-8 h-8 text-gold" />,
      title: 'Maharaja Royal Protocols',
      desc: 'Be received with ancestral hospitality rituals. Traditional rosewater hand sprits, a soft silk stole placement, and custom brass thali table settings set a regal tone.'
    },
    {
      icon: <FiMusic className="w-8 h-8 text-gold" />,
      title: 'Live Sufi & Sitar Recitals',
      desc: 'Sip on champagne while listening to the delicate, acoustic melodies of the sitar and classical Sufi performance in the central court during twilight hours.'
    },
    {
      icon: <FiShield className="w-8 h-8 text-gold" />,
      title: 'Diwan Private Dining Suites',
      desc: 'For private banquets or high-security dining, choose our Sheesh Mahal (Mirror Room) or Maharani chambers with personal service stewards.'
    },
    {
      icon: <GiWineGlass className="w-8 h-8 text-gold" />,
      title: 'Royal Sommelier Pairings',
      desc: 'Explore curated old-world vintage selections paired seamlessly with rich, aromatic Indian gravies and charcoal tandoori courses.'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-[#050C1A] border-t border-gold/10 relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4A0E17]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-20 reveal-on-scroll">
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Regal Hospitality</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline">
            The Fine Dining Experience
          </h2>
          <p className="font-sans text-sm text-gold-light/60 mt-4 max-w-xl mx-auto font-light">
            Every moment at Urban Maharaja is designed to evoke the splendor of a five-star royal resort.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 reveal-on-scroll">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass-panel p-8 md:p-10 border border-gold/10 flex gap-6 hover:border-gold/30 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Icon container */}
              <div className="flex-shrink-0 p-3 bg-gold/5 border border-gold/20 h-16 w-16 flex items-center justify-center">
                {exp.icon}
              </div>
              
              {/* Text details */}
              <div>
                <h3 className="font-serif text-xl font-semibold text-gold-light tracking-wide mb-3">
                  {exp.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-gold-light/70 font-light leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cinematic Callout Banner */}
        <div className="mt-20 border border-gold/15 bg-gradient-to-r from-[#4A0E17]/40 via-[#050C1A] to-[#4A0E17]/40 p-8 md:p-12 text-center relative overflow-hidden reveal-on-scroll">
          {/* Gold corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold" />

          <p className="font-serif text-xl md:text-2xl text-gold-light tracking-wide mb-4">
            "A dining court designed for modern royalty."
          </p>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold">
            Architectural Digest, 2025
          </p>
        </div>

      </div>
    </section>
  );
};

export default Experience;
