import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useHomepageMedia } from '../../context/HomepageMediaContext';

export const ShopByMood = () => {
  const { getMoodsMedia } = useHomepageMedia();
  const rawMoods = getMoodsMedia();

  // Flemy Lookbook Color Progression
  const flemyPalette = ['#717C6D', '#D69E4A', '#DFD7CB', '#C97D67', '#9E8EB8'];

  return (
    <section className="py-24 bg-[#EDE8E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Editorial Line */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] text-[#C97D67] uppercase">
            <span className="w-6 h-[1.5px] bg-[#C97D67]" />
            <span>Curated For Every Feeling</span>
            <span className="w-6 h-[1.5px] bg-[#C97D67]" />
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#121110] font-black tracking-tight">
            What are you gifting for?
          </h2>
          <p className="text-sm text-[#544E48] font-sans font-medium max-w-md mx-auto">
            Choose a mood to explore matched charms, friendship cords & ready hampers.
          </p>
        </div>

        {/* Asymmetric Editorial Lookbook Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rawMoods.map((mood, idx) => {
            const cardColor = flemyPalette[idx % flemyPalette.length];
            return (
              <Link
                key={mood.id}
                to={mood.link || `/shop?mood=${mood.id.replace('mood-', '')}`}
                className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-7 border border-white/60 ${
                  idx === 0 || idx === 3 ? 'lg:col-span-2 min-h-[340px]' : 'min-h-[340px]'
                }`}
                style={{ backgroundColor: cardColor }}
              >
                {/* Background Lifestyle Image with Mask */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={mood.image}
                    alt={mood.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Deep High-Contrast Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/70 via-45% to-black/20" />
                </div>

                {/* Tag Pill */}
                <div className="relative z-10 mb-auto self-start">
                  <span className="px-3.5 py-1.5 rounded-full text-[10.5px] font-black tracking-widest bg-white/95 text-[#1A1816] shadow-md border border-white uppercase">
                    {mood.tag || 'Lookbook'}
                  </span>
                </div>

                {/* Content with Editorial Luxury Style */}
                <div className="relative z-10 space-y-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-black !text-white text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] group-hover:text-[#D69E4A] transition-colors leading-tight tracking-wide uppercase">
                    {mood.title}
                  </h3>
                  <p className="text-xs sm:text-sm !text-[#FAF8F5] text-[#FAF8F5] font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] opacity-95">
                    {mood.subtitle}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-black !text-white text-white group-hover:translate-x-1 transition-transform drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    <span className="tracking-wider uppercase">Explore Mood Chapter</span>
                    <ArrowRight className="w-4 h-4 text-[#D69E4A]" />
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
