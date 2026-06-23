import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Leaf, Flame } from 'lucide-react';

// Currency formatter for Indian Rupees
const formatINR = (amount) => {
  return '₹' + amount.toLocaleString('en-IN');
};

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
      price: 3900,
      diet: 'non-veg',
      tag: 'Imperial Signature',
      desc: 'Fresh spiny lobster marinated in hung curd, Kashmiri chili, cardamoms, and finished in our wood-fired clay tandoor.',
      image: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Maharaja Royal Thali',
      category: 'thali',
      price: 3600,
      diet: 'veg',
      tag: 'Grand Feast',
      desc: 'A grand platter featuring 12 regal dishes, including dal makhani, shahi cottage cheese, organic greens, saffron rice, and butter naans.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Shahi Dum Biryani',
      category: 'mains',
      price: 2500,
      diet: 'non-veg',
      tag: 'Slow-Cooked',
      desc: 'Fragrant basmati rice, tender organic lamb, fresh mint, and pure saffron threads, sealed in a clay handi and cooked over coals.',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Paneer Khazana Tikka',
      category: 'starters',
      price: 1350,
      diet: 'veg',
      tag: 'Chef Special',
      desc: 'Handcrafted cottage cheese blocks stuffed with green mango tapenade, bathed in crushed yellow mustard seeds, and gently seared.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Murgh Tikka Lahori',
      category: 'starters',
      price: 1650,
      diet: 'non-veg',
      tag: 'Palace Classic',
      desc: 'Boneless chicken leg cubes steeped in robust yogurt masala, stone-ground ginger-garlic paste, and roasted on open skewers.',
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Kesar Pista Kulfi Falooda',
      category: 'desserts',
      price: 1200,
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
    <section id="menu" className="py-28 md:py-36 bg-[#050C1A] border-t border-gold/10 relative overflow-hidden section-glow">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/[0.03] rounded-full blur-[200px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 reveal-on-scroll">
          <div className="section-diamond-divider mb-4">
            <span className="diamond" />
          </div>
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-4 block">Epicurean Selections</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline text-balance">
            Our Signature Dishes
          </h2>
          <p className="font-sans text-sm text-gold-light/55 mt-6 max-w-xl mx-auto font-light leading-relaxed">
            Each recipe is an authentic recreation of imperial cuisine, masterfully presented by our royal culinary panel.
          </p>
        </div>

        {/* Categories Tab Bar with Sliding Indicator */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 reveal-on-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 font-sans text-[10px] tracking-widest uppercase transition-all duration-500 cursor-pointer relative overflow-hidden ${
                activeCategory === cat.id
                  ? 'bg-gold text-royal-navy font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'border border-gold/10 hover:border-gold/40 text-gold-light/70 hover:text-gold hover:bg-gold/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-on-scroll">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="card-premium group card-hover-zoom flex flex-col h-full overflow-hidden"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Product Image Frame */}
              <div className="relative overflow-hidden h-64 bg-[#050C1A]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-[#050C1A]/20 to-transparent" />
                
                {/* Diet indicator with proper icons */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#050C1A]/85 backdrop-blur-sm border border-gold/15">
                  {item.diet === 'veg' ? (
                    <Leaf className="w-3 h-3 text-emerald-400" strokeWidth={2} />
                  ) : (
                    <Flame className="w-3 h-3 text-red-400" strokeWidth={2} />
                  )}
                  <span className="text-[9px] uppercase font-sans tracking-widest text-gold-light/80 font-medium">{item.diet === 'veg' ? 'Vegetarian' : 'Non-Veg'}</span>
                </div>

                {/* Shimmer label */}
                {item.tag && (
                  <div className="absolute top-4 right-4 z-10 bg-gold text-royal-navy text-[8px] font-sans font-bold tracking-widest uppercase px-3 py-1.5 flex items-center gap-1 shadow-md shadow-gold/20">
                    <Sparkles className="w-2.5 h-2.5" strokeWidth={2} />
                    {item.tag}
                  </div>
                )}

                {/* Price tag in INR */}
                <div className="absolute bottom-4 right-6 text-gold font-serif text-2xl font-bold drop-shadow-lg">
                  {formatINR(item.price)}
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-lg font-semibold text-gold-light tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="font-sans text-xs md:text-sm text-gold-light/65 font-light leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>
                
                {/* CTA inside card */}
                <Link
                  to="/reserve"
                  className="mt-auto inline-flex items-center justify-between text-[10px] tracking-widest uppercase text-gold hover:text-gold-light font-semibold border-t border-gold/10 pt-4 group-hover:border-gold/25 transition-all duration-300"
                >
                  <span>Reserve Table For This</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2} />
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
