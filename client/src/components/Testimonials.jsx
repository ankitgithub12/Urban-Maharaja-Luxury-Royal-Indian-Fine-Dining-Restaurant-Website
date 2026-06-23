import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const reviews = [
    {
      name: 'Lord Harrison Bentley',
      title: 'Luxury Hospitality Critic, UK',
      initials: 'HB',
      comment: 'The Sheesh Mahal private suite was spectacular. The service protocols are reminiscent of Udaipur palace hotels, and the clay-pot Biryani was exceptionally complex. A masterclass in fine dining.',
      rating: 5,
      verified: 'Google Verified VIP Review'
    },
    {
      name: 'Priyanjali Sen',
      title: 'Gourmet Travelogue Editor',
      initials: 'PS',
      comment: 'Urban Maharaja is not just dinner; it is a cultural pilgrimage. The live Sufi ragas, the custom brass chalices, and the Shahi Thali flavor complexity are unmatched globally.',
      rating: 5,
      verified: 'Verified Review'
    },
    {
      name: 'Maharaja Vikramaditya Singh',
      title: 'Royal Family Patron, Jodhpur',
      initials: 'VS',
      comment: 'An absolute masterpiece of heritage restoration. Every single dish is a rich tapestry of spices and exquisite plating. Our banqueting guests were completely spellbound.',
      rating: 5,
      verified: 'Verified Royal Patron'
    }
  ];

  const changeSlide = useCallback((newIdx) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setIsTransitioning(false);
      setProgressKey(prev => prev + 1);
    }, 350);
  }, []);

  const handleNext = useCallback(() => {
    changeSlide((activeIdx + 1) % reviews.length);
  }, [activeIdx, changeSlide, reviews.length]);

  const handlePrev = useCallback(() => {
    changeSlide((activeIdx - 1 + reviews.length) % reviews.length);
  }, [activeIdx, changeSlide, reviews.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, 7000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const autoPlayDuration = 7; // seconds

  return (
    <section className="py-28 md:py-36 bg-[#050C1A] border-t border-gold/10 relative overflow-hidden section-glow">
      {/* Decorative backdrop graphics */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4A0E17]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 reveal-on-scroll">
          <div className="section-diamond-divider mb-4">
            <span className="diamond" />
          </div>
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-4 block">Guest Testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline text-balance">
            Patron Praise
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="glass-panel p-8 md:p-16 border border-gold/10 relative reveal-on-scroll ornamental-frame">
          {/* Decorative Quote Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#050C1A] border border-gold/15 p-3.5 rounded-full shadow-lg shadow-black/30">
            <Quote className="w-6 h-6 text-gold" strokeWidth={1.5} />
          </div>

          {/* Active Review Slide */}
          <div className={`min-h-[260px] flex flex-col justify-between items-center text-center transition-all duration-350 ${
            isTransitioning ? 'opacity-0 transform translate-x-6' : 'opacity-100 transform translate-x-0'
          }`}>
            {/* Avatar initials */}
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/25 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-lg font-bold text-gold">{reviews[activeIdx].initials}</span>
              </div>
              
              {/* Stars */}
              <div className="flex gap-1.5 justify-center">
                {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" strokeWidth={0} />
                ))}
              </div>
            </div>

            {/* Comment */}
            <p className="font-accent text-lg md:text-2xl text-gold-light/90 italic leading-relaxed mb-8 max-w-2xl font-light">
              "{reviews[activeIdx].comment}"
            </p>

            {/* Reviewer Details */}
            <div>
              <div className="gold-divider w-12 mx-auto mb-4" />
              <h3 className="font-sans text-sm font-semibold tracking-wider text-gold">
                {reviews[activeIdx].name}
              </h3>
              <p className="font-sans text-[10px] text-gold-light/55 uppercase tracking-widest mt-1.5">
                {reviews[activeIdx].title}
              </p>
              
              <div className="inline-block mt-4 px-3.5 py-1.5 bg-gold/5 border border-gold/[0.12] rounded-full text-[9px] uppercase tracking-widest text-gold-light/70">
                {reviews[activeIdx].verified}
              </div>
            </div>
          </div>

          {/* Auto-progress bar */}
          <div className="mt-10 h-[2px] bg-gold/10 rounded-full overflow-hidden">
            <div
              key={progressKey}
              className="h-full bg-gradient-to-r from-gold/40 to-gold rounded-full"
              style={{
                animation: `progress-bar ${autoPlayDuration}s linear forwards`
              }}
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8 border-t border-gold/10 pt-8">
            <button
              onClick={handlePrev}
              className="p-2.5 border border-gold/10 text-gold-light/70 hover:text-gold hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            
            {/* Slide Indicators */}
            <div className="flex gap-2.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => changeSlide(idx)}
                  aria-label={`View testimonial ${idx + 1}`}
                  className={`rounded-full transition-all duration-500 cursor-pointer ${
                    idx === activeIdx ? 'bg-gold w-8 h-2 shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'bg-gold/20 w-2 h-2 hover:bg-gold/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 border border-gold/10 text-gold-light/70 hover:text-gold hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
