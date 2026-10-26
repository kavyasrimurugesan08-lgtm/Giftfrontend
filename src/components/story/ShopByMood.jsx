import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useHomepageMedia } from '../../context/HomepageMediaContext';

export const ShopByMood = () => {
  const { getMoodsMedia } = useHomepageMedia();
  const rawMoods = getMoodsMedia();

  return (
    <section className="py-24 bg-[#EDE8E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Editorial Gold Accent */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] text-[#B8860B] uppercase">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span>Curated For Every Feeling</span>
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#121110] font-black tracking-tight">
            What are you gifting for?
          </h2>
          <p className="text-sm text-[#544E48] font-sans font-medium max-w-md mx-auto">
            Choose a mood to explore matched charms, friendship cords & ready hampers.
          </p>
        </div>

        {/* Rectangular Category Frames / Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rawMoods.map((mood, idx) => {
            return (
              <Link
                key={mood.id}
                to={mood.link || `/shop?mood=${mood.id.replace('mood-', '')}`}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#D4AF37] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-7 sm:p-8 ${
                  idx === 0 || idx === 3 ? 'lg:col-span-2 min-h-[240px]' : 'min-h-[240px]'
                }`}
              >
                {/* Tag Pill */}
                <div className="mb-6 self-start">
                  <span className="px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest bg-[#FAF7F2] text-[#8C6D48] border border-[#EADBCE] shadow-xs uppercase">
                    {mood.tag || 'Curated Mood'}
                  </span>
                </div>

                {/* Content with Warm Editorial Style */}
                <div className="space-y-2 mt-auto">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-[#2B231D] group-hover:text-[#B96F58] transition-colors leading-tight tracking-wide uppercase">
                    {mood.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E645B] font-medium leading-relaxed max-w-xl">
                    {mood.subtitle}
                  </p>
                  <div className="pt-3 flex items-center gap-2 text-xs font-black text-[#9A6B2F] group-hover:text-[#B96F58] transition-colors">
                    <span className="tracking-wider uppercase">Explore Mood Chapter</span>
                    <ArrowRight className="w-4 h-4 text-[#9A6B2F] group-hover:translate-x-1.5 transition-transform" />
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
