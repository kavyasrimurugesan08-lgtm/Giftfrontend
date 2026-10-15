import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { useHomepageMedia } from '../../context/HomepageMediaContext';

export const GiftMoments = () => {
  const { getGiftMomentsMedia } = useHomepageMedia();
  const moments = getGiftMomentsMedia();

  return (
    <section className="py-20 bg-[#F4D2BE]/25 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase">
            Storytelling Moments
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#332822]">
            There's always a reason to gift.
          </h2>
          <p className="text-sm text-[#6F5145] font-sans">
            Life is made of little moments. Celebrate them with something tailored and heartfelt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moments.map((m, idx) => (
            <div
              key={m.id || idx}
              className="bg-white/80 rounded-3xl overflow-hidden border border-[#D9A99A]/50 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={m.image}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80';
                  }}
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#332822]/80 backdrop-blur-xs text-[#F8E8D5] text-[10px] font-bold tracking-wider rounded-full uppercase">
                  {m.tag || 'Moment'}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#332822] group-hover:text-[#B96F58] transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#6F5145] leading-relaxed mt-2">
                    {m.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9A99A]/30">
                  <Link
                    to={m.link || '/shop'}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B96F58] hover:text-[#332822] transition-colors group-hover:translate-x-1"
                  >
                    <span>Explore Gifts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
