import React from 'react';
import { Star, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';

export const CustomerLoveTestimonials = () => {
  return (
    <section className="py-20 bg-[#F8E8D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase">
            Customer Love
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#332822]">
            Over 1,400+ smiles delivered.
          </h2>
          <p className="text-sm text-[#6F5145] font-sans">
            Real stories from our retail gift lovers and wholesale reseller partners across India.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white/80 rounded-3xl p-8 border border-[#D9A99A]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#332822] leading-relaxed font-sans italic">
                  "{t.review}"
                </p>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#D9A99A]/30">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#B96F58]/30"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#B96F58] text-[#F8E8D5] flex items-center justify-center font-display font-bold text-sm shadow-xs shrink-0">
                    {t.name ? t.name.charAt(0) : '♡'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-bold text-sm text-[#332822]">
                      {t.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-[11px] text-[#6F5145] truncate">
                    {t.location} • <span className="font-medium text-[#B96F58]">{t.productName}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
