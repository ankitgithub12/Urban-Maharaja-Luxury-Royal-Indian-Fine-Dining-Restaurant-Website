import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const reviews = [
    {
      name: 'Lord Harrison Bentley',
      title: 'Luxury Hospitality Critic, UK',
      comment: 'The Sheesh Mahal private suite was spectacular. The service protocols are reminiscent of Udaipur palace hotels, and the clay-pot Biryani was exceptionally complex. A masterclass in fine dining.',
      rating: 5,
      verified: 'Google Verified VIP Review'
    },
    {
      name: 'Priyanjali Sen',
      title: 'Gourmet Travelogue Editor',
      comment: 'Urban Maharaja is not just dinner; it is a cultural pilgrimage. The live Sufi ragas, the custom brass chalices, and the Shahi Thali flavor complexity are unmatched globally.',
      rating: 5,
      verified: 'Verified Review'
    },
    {
      name: 'Maharaja Vikramaditya Singh',
      title: 'Royal Family Patron, Jodhpur',
      comment: 'An absolute masterpiece of heritage restoration. Every single dish is a rich tapestry of spices and exquisite plating. Our banqueting guests were completely spellbound.',
      rating: 5,
      verified: 'Verified Royal Patron'
    }
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#050C1A] border-t border-gold/10 relative overflow-hidden">
      {/* Decorative backdrop graphics */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Guest Testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline">
            Patron Praise
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="glass-panel p-8 md:p-16 border border-gold/10 relative reveal-on-scroll">
          {/* Decorative Quote Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#050C1A] border border-gold/15 p-3 rounded-full">
            <Quote className="w-6 h-6 text-gold" />
          </div>

          {/* Active Review Slide */}
          <div className="min-h-[220px] flex flex-col justify-between items-center text-center">
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>

            {/* Comment */}
            <p className="font-serif text-lg md:text-2xl text-gold-light/90 italic leading-relaxed mb-8 max-w-2xl font-light">
              "{reviews[activeIdx].comment}"
            </p>

            {/* Reviewer Details */}
            <div>
              <h3 className="font-sans text-sm font-semibold tracking-wider text-gold">
                {reviews[activeIdx].name}
              </h3>
              <p className="font-sans text-[11px] text-gold-light/65 uppercase tracking-widest mt-1">
                {reviews[activeIdx].title}
              </p>
              
              <div className="inline-block mt-4 px-3 py-1 bg-gold/5 border border-gold/15 rounded-full text-[9px] uppercase tracking-widest text-gold-light/80">
                {reviews[activeIdx].verified}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-12 border-t border-gold/10 pt-8">
            <button
              onClick={handlePrev}
              className="p-2 border border-gold/10 text-gold-light hover:text-gold hover:border-gold/40 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            {/* Slide Indicators */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? 'bg-gold w-6' : 'bg-gold/25'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 border border-gold/10 text-gold-light hover:text-gold hover:border-gold/40 transition-colors duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
