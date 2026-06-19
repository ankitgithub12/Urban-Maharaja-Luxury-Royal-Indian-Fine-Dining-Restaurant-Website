import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

const AmbienceGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

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
      image: 'https://images.unsplash.com/photo-1585938338392-50a59970d2ee?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'The Maharaja Grand Darbar',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Peacock Pavilion Al Fresco',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Maharaja Royal Thali Platter',
      category: 'culinary',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Shahi Lobster Presentation',
      category: 'culinary',
      image: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Heritage Saffron Elixir',
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-[#050C1A] border-t border-gold/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Visual Splendor</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline">
            Gallery of Royal Ambience
          </h2>
          <p className="font-sans text-sm text-gold-light/60 mt-4 max-w-xl mx-auto font-light">
            Glimpse into the majestic interiors and epicurean artistry of Urban Maharaja.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 reveal-on-scroll">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 font-sans text-[10px] tracking-widest uppercase transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'border-b-2 border-gold text-gold font-semibold'
                  : 'text-gold-light/70 hover:text-gold'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImg(item)}
              className="relative overflow-hidden aspect-[4/3] group border border-gold/10 hover:border-gold/30 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center">
                <div className="p-3 border border-gold/40 rounded-full bg-[#050C1A]/80 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Eye className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-gold-light font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h3>
                <p className="font-sans text-[9px] text-gold tracking-[0.2em] uppercase mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedImg(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-gold-light hover:text-gold focus:outline-none p-2"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Modal Image frame */}
            <div
              className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.image}
                alt={selectedImg.title}
                className="max-w-full max-h-[70vh] object-contain border border-gold/25"
              />
              <div className="text-center mt-6">
                <h3 className="font-serif text-2xl text-gold">{selectedImg.title}</h3>
                <p className="font-sans text-xs text-gold-light/60 uppercase tracking-[0.25em] mt-1">{selectedImg.category}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AmbienceGallery;
