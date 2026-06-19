import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi';

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Full Durbar' },
    { id: 'starters', name: 'Royal Starters' },
    { id: 'mains', name: 'Main Durbar' },
    { id: 'thali', name: 'Shahi Thali' },
    { id: 'desserts', name: 'Desserts & Elixirs' }
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Tandoori Lobster Durbar',
      category: 'mains',
      price: '$52',
      diet: 'non-veg',
      tag: 'Imperial Signature',
      desc: 'Fresh spiny lobster marinated in hung curd, Kashmiri chili, cardamoms, and finished in our wood-fired clay tandoor.',
      image: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Maharaja Royal Thali',
      category: 'thali',
      price: '$48',
      diet: 'veg',
      tag: 'Grand Feast',
      desc: 'A grand platter featuring 12 regal dishes, including dal makhani, shahi cottage cheese, organic greens, saffron rice, and butter naans.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Shahi Dum Biryani',
      category: 'mains',
      price: '$34',
      diet: 'non-veg',
      tag: 'Slow-Cooked',
      desc: 'Fragrant basmati rice, tender organic lamb, fresh mint, and pure saffron threads, sealed in a clay handi and cooked over coals.',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Paneer Khazana Tikka',
      category: 'starters',
      price: '$18',
      diet: 'veg',
      tag: 'Chef Special',
      desc: 'Handcrafted cottage cheese blocks stuffed with green mango tapenade, bathed in crushed yellow mustard seeds, and gently seared.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Murgh Tikka Lahori',
      category: 'starters',
      price: '$22',
      diet: 'non-veg',
      tag: 'Palace Classic',
      desc: 'Boneless chicken leg cubes steeped in robust yogurt masala, stone-ground ginger-garlic paste, and roasted on open skewers.',
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Kesar Pista Kulfi Falooda',
      category: 'desserts',
      price: '$16',
      diet: 'veg',
      tag: 'Royal Sweet',
      desc: 'Dense frozen saffron and pistachio reduction, draped in sweet vermicelli, organic rose nectar, and sweet basil seeds.',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-[#050C1A] border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Epicurean Selections</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline">
            Our Signature Dishes
          </h2>
          <p className="font-sans text-sm text-gold-light/60 mt-4 max-w-xl mx-auto font-light">
            Each recipe is an authentic recreation of imperial cuisine, masterfully presented by our royal culinary panel.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 reveal-on-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gold text-royal-navy font-semibold shadow-md'
                  : 'border border-gold/10 hover:border-gold/45 text-gold-light/80 hover:text-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-on-scroll">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel group card-hover-zoom flex flex-col h-full border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-500 hover:shadow-lg"
            >
              {/* Product Image Frame */}
              <div className="relative overflow-hidden h-64 bg-[#050C1A]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Diet indicator */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#050C1A]/85 backdrop-blur-sm border border-gold/20">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.diet === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-[10px] uppercase font-sans tracking-widest text-gold-light/80">{item.diet === 'veg' ? 'Veg' : 'Non-Veg'}</span>
                </div>

                {/* Shimmer label */}
                {item.tag && (
                  <div className="absolute top-4 right-4 z-10 bg-gold text-royal-navy text-[9px] font-sans font-bold tracking-widest uppercase px-3 py-1 flex items-center gap-1">
                    <HiSparkles className="w-2.5 h-2.5" />
                    {item.tag}
                  </div>
                )}

                {/* Price tag */}
                <div className="absolute bottom-4 right-6 text-gold font-serif text-2xl font-bold">
                  {item.price}
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-semibold text-gold-light tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="font-sans text-xs md:text-sm text-gold-light/70 font-light leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>
                
                {/* CTA inside card */}
                <Link
                  to="/reserve"
                  className="mt-auto inline-flex items-center justify-between text-xs tracking-widest uppercase text-gold hover:text-gold-light font-semibold border-t border-gold/10 pt-4 group-hover:border-gold/20 transition-all duration-300"
                >
                  <span>Reserve Table For This</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MenuSection;
