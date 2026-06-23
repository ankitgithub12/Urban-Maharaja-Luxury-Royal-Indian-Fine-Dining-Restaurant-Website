import React from 'react';
import { Landmark, Music, Shield, Wine } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      icon: Landmark,
      title: 'Maharaja Royal Protocols',
      desc: 'Be received with ancestral hospitality rituals. Traditional rosewater hand sprits, a soft silk stole placement, and custom brass thali table settings set a regal tone.',
      accent: 'from-[#4A0E17]/20 to-transparent',
      num: '01'
    },
    {
      icon: Music,
      title: 'Live Sufi & Sitar Recitals',
      desc: 'Sip on champagne while listening to the delicate, acoustic melodies of the sitar and classical Sufi performance in the central court during twilight hours.',
      accent: 'from-purple-900/15 to-transparent',
      num: '02'
    },
    {
      icon: Shield,
      title: 'Diwan Private Dining Suites',
      desc: 'For private banquets or high-security dining, choose our Sheesh Mahal (Mirror Room) or Maharani chambers with personal service stewards.',
      accent: 'from-blue-900/15 to-transparent',
      num: '03'
    },
    {
      icon: Wine,
      title: 'Royal Sommelier Pairings',
      desc: 'Explore curated old-world vintage selections paired seamlessly with rich, aromatic Indian gravies and charcoal tandoori courses.',
      accent: 'from-amber-900/15 to-transparent',
      num: '04'
    }
  ];

  return (
    <section id="experience" className="py-28 md:py-36 bg-[#050C1A] border-t border-gold/10 relative overflow-hidden section-glow">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A0E17]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-20 reveal-on-scroll">
          <div className="section-diamond-divider mb-4">
            <span className="diamond" />
          </div>
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-4 block">Regal Hospitality</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline text-balance">
            The Fine Dining Experience
          </h2>
          <p className="font-sans text-sm text-gold-light/55 mt-6 max-w-xl mx-auto font-light leading-relaxed">
            Every moment at Urban Maharaja is designed to evoke the splendor of a five-star royal resort.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 reveal-on-scroll">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={index}
                className="card-premium p-8 md:p-10 flex gap-6 group relative overflow-hidden"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Accent gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                {/* Step number */}
                <div className="absolute top-4 right-5 font-serif text-5xl font-bold text-gold/[0.06] group-hover:text-gold/[0.12] transition-colors duration-700 select-none pointer-events-none">
                  {exp.num}
                </div>

                {/* Icon container */}
                <div className="flex-shrink-0 p-4 bg-gold/5 border border-gold/15 h-16 w-16 flex items-center justify-center relative z-10 group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-500">
                  <IconComponent className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>
                
                {/* Text details */}
                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-semibold text-gold-light tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-gold-light/65 font-light leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cinematic Callout Banner */}
        <div className="mt-20 border border-gold/15 bg-gradient-to-r from-[#4A0E17]/30 via-[#050C1A] to-[#4A0E17]/30 p-8 md:p-14 text-center relative overflow-hidden reveal-on-scroll ornamental-frame">
          {/* Decorative shimmer lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <p className="font-accent text-xl md:text-3xl text-gold-light/90 tracking-wide mb-5 italic leading-relaxed">
            "A dining court designed for modern royalty."
          </p>
          <div className="gold-divider w-16 mx-auto mb-4" />
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold/70">
            Architectural Digest, 2025
          </p>
        </div>

      </div>
    </section>
  );
};

export default Experience;
