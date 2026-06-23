import React, { useState, useEffect, useCallback } from 'react';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

const AmbienceGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filters = [
    { id: 'all', name: 'Show All' },
    { id: 'interior', name: 'Palace Ambience' },
    { id: 'culinary', name: 'Signature Dishes' },
    { id: 'drinks', name: 'Royal Libations' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Sheesh Mahal Suite',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1585938338392-50a59970d2ee?auto=format&fit=crop&w=800&q=80',
      span: 'md:row-span-2' // tall
    },
    {
      id: 2,
      title: 'The Maharaja Grand Darbar',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      span: ''
    },
    {
      id: 3,
      title: 'Peacock Pavilion Al Fresco',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&w=800&q=80',
      span: ''
    },
    {
      id: 4,
      title: 'Maharaja Royal Thali Platter',
      category: 'culinary',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      span: ''
    },
    {
      id: 5,
      title: 'Shahi Lobster Presentation',
      category: 'culinary',
      image: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=800&q=80',
      span: 'md:row-span-2' // tall
    },
    {
      id: 6,
      title: 'Heritage Saffron Elixir',
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      span: ''
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const getCategoryLabel = (category) => {
    const map = { interior: 'Palace Ambience', culinary: 'Signature Dishes', drinks: 'Royal Libations' };
    return map[category] || category;
  };

  const openLightbox = (item) => {
    const idx = filteredItems.findIndex(i => i.id === item.id);
    setLightboxIdx(idx);
    setSelectedImg(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImg(null);
    document.body.style.overflow = '';
  };

  const navigateLightbox = useCallback((direction) => {
    const newIdx = (lightboxIdx + direction + filteredItems.length) % filteredItems.length;
    setLightboxIdx(newIdx);
    setSelectedImg(filteredItems[newIdx]);
  }, [lightboxIdx, filteredItems]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImg) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImg, navigateLightbox]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#050C1A] border-t border-gold/10 relative noise-overlay section-glow">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Visual Splendor</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide text-balance">
            Gallery of Royal Ambience
          </h2>
          <div className="section-diamond-divider my-6">
            <div className="diamond" />
          </div>
          <p className="font-sans text-sm text-gold-light/60 mt-4 max-w-xl mx-auto font-light leading-relaxed">
            Glimpse into the majestic interiors, curated regal suites, and ancestral culinary creations of Urban Maharaja.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 reveal-on-scroll">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 font-sans text-[10px] tracking-widest uppercase transition-all duration-500 border rounded-full cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-gold/10 border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.15)] font-semibold'
                  : 'text-gold-light/60 hover:text-gold hover:border-gold/50 bg-[#050C1A]/40 border-gold/15'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid — Masonry-style with alternating tall items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-4 md:gap-5 reveal-on-scroll">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative overflow-hidden cursor-pointer border border-gold/10 hover:border-gold/40 shadow-lg hover:shadow-gold/5 transition-all duration-700 bg-[#0d172a]/40 ${
                activeFilter === 'all' ? item.span : ''
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Image Container with Zoom */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-700" />
              </div>

              {/* Corner framing overlay on hover */}
              <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/25 transition-all duration-700 pointer-events-none z-10" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#050C1A]/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-6 text-center z-20">
                <div className="p-3 border border-gold/30 rounded-full bg-[#050C1A]/95 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Eye className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-gold-light font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-[50ms]">
                  {item.title}
                </h3>
                <span className="font-sans text-[9px] text-gold tracking-[0.25em] uppercase mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-[100ms] bg-gold/5 border border-gold/10 px-2.5 py-0.5 rounded-full">
                  {getCategoryLabel(item.category)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal with Keyboard Navigation */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-gold-light hover:text-gold focus:outline-none p-2 cursor-pointer transition-colors duration-300 z-30"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" strokeWidth={1.5} />
            </button>
            
            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 border border-gold/20 hover:border-gold/50 bg-[#050C1A]/80 backdrop-blur-sm text-gold hover:text-gold-light transition-all duration-300 cursor-pointer z-30 hover:bg-gold/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 border border-gold/20 hover:border-gold/50 bg-[#050C1A]/80 backdrop-blur-sm text-gold hover:text-gold-light transition-all duration-300 cursor-pointer z-30 hover:bg-gold/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Image counter */}
            <div className="absolute top-6 left-6 font-sans text-xs tracking-widest text-gold/60 z-30">
              {lightboxIdx + 1} / {filteredItems.length}
            </div>
            
            {/* Modal Image frame */}
            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center glass-panel border border-gold/30 p-4 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] lightbox-enter"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 border-t-2 border-l-2 border-gold/40 w-6 h-6 pointer-events-none" />
              <div className="absolute top-2 right-2 border-t-2 border-r-2 border-gold/40 w-6 h-6 pointer-events-none" />
              <div className="absolute bottom-2 left-2 border-b-2 border-l-2 border-gold/40 w-6 h-6 pointer-events-none" />
              <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-gold/40 w-6 h-6 pointer-events-none" />

              <img
                src={selectedImg.image}
                alt={selectedImg.title}
                className="max-w-full max-h-[60vh] object-contain border border-gold/10"
              />
              <div className="text-center mt-6">
                <h3 className="font-serif text-xl md:text-2xl text-gold-gradient-animated font-bold">{selectedImg.title}</h3>
                <p className="font-sans text-[10px] text-gold tracking-[0.25em] uppercase mt-2 bg-gold/5 border border-gold/10 px-3 py-1 rounded-full inline-block">
                  {getCategoryLabel(selectedImg.category)}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AmbienceGallery;
