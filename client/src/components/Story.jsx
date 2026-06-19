import React from 'react';

const Story = () => {
  return (
    <section id="story" className="relative py-24 bg-[#050C1A] overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A0E17]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visuals Column with Royal Frame */}
          <div className="lg:col-span-5 flex justify-center reveal-on-scroll">
            <div className="relative p-3 border border-gold/20 max-w-sm sm:max-w-md w-full">
              {/* Gold corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />
              
              <div className="relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&h=1000&q=80"
                  alt="Royal Culinary Crafting"
                  className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <p className="font-serif text-lg text-gold font-semibold tracking-wider">Chef Devendra Raja</p>
                  <p className="font-sans text-xs text-gold-light/80 tracking-widest uppercase">Grand Culinary Patron</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left reveal-on-scroll">
            <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3">Our Heritage</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light mb-8 tracking-wide">
              The Grandeur of <br />
              <span className="text-gold text-gradient">Indian Palace Culinary Art</span>
            </h2>
            
            <div className="space-y-6 text-[#FDFBF7]/85 font-sans font-light tracking-wide text-sm md:text-base leading-relaxed">
              <p>
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
                <span className="font-serif text-gold text-3xl tracking-wider block italic font-bold">Devendra Raja</span>
                <span className="font-sans text-[10px] tracking-[0.25em] text-gold-light/60 uppercase block mt-1">Grand Culinary Patron</span>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-gold/20" />
              <div className="text-left text-xs text-gold-light/75 tracking-wider max-w-xs leading-relaxed">
                "Each spice is measured, each flavor is balanced to tell a story of imperial India."
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Story;
