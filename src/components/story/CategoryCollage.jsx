import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCollections } from '../../context/CollectionsContext';

export const CategoryCollage = () => {
  const { categories } = useCollections();
  const flemyPalette = ['#DFD7CB', '#717C6D', '#D69E4A', '#C97D67', '#9E8EB8', '#717C6D', '#DFD7CB', '#C97D67'];

  return (
    <section className="py-24 bg-[#EDE8E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Minimalist Line */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] text-[#C97D67] uppercase">
            <span className="w-6 h-[1.5px] bg-[#C97D67]" />
            <span>Artisan Lookbook Collections</span>
            <span className="w-6 h-[1.5px] bg-[#C97D67]" />
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#121110] font-black tracking-tight">
            Pick your little obsession
          </h2>
          <p className="text-sm text-[#544E48] font-medium font-sans max-w-md mx-auto">
            Explore our curated departments of customized charms, couple wristlets, and keepsakes.
          </p>
        </div>

        {/* Pinterest & Lookbook Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const cardBg = flemyPalette[idx % flemyPalette.length];
            return (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className={`group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-white/60 flex flex-col justify-between p-5 ${
                  idx === 0 || idx === 7 ? 'row-span-2 min-h-[380px]' : 'min-h-[220px]'
                }`}
                style={{ backgroundColor: cardBg }}
              >
                {/* Category Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {/* High-Contrast Gradient Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/70 via-40% to-black/15" />
                </div>

                {/* Tag & Item Count */}
                <div className="relative z-10 mb-auto self-start">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-white/95 text-[#1A1816] shadow-md border border-white uppercase">
                    {cat.itemCount || 15} Items
                  </span>
                </div>

                {/* Name & Arrow Link */}
                <div className="relative z-10 block space-y-0.5">
                  <h3 className="font-editorial text-lg sm:text-xl font-black !text-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:text-[#D69E4A] transition-colors leading-snug uppercase tracking-wide">
                    {cat.name}
                  </h3>
                  <div className="pt-1 flex items-center gap-1 text-[11px] !text-[#FAF8F5] text-[#FAF8F5] font-bold group-hover:translate-x-1 transition-transform drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    <span className="tracking-wider uppercase">Explore Department</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D69E4A]" />
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
