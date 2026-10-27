import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { DoodleSparkle } from '../common/BlobShape';

export const BrandIntro = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#EDE8E1] border-y border-[#D4C9BA]/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5 sm:space-y-6">
        
        {/* Editorial Sub-Heading with Minimal Line */}
        <div className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.25em] text-[#C97D67] uppercase">
          <span className="w-5 sm:w-8 h-[1px] bg-[#C97D67]" />
          <span>The Atelier Philosophy</span>
          <span className="w-5 sm:w-8 h-[1px] bg-[#C97D67]" />
        </div>

        <h2 className="font-editorial text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#121110] leading-snug sm:leading-tight font-black tracking-tight max-w-3xl mx-auto">
          We believe the smallest gifts carry the biggest warmth.
        </h2>

        <div className="w-12 sm:w-16 h-[2px] bg-[#717C6D] mx-auto my-3 sm:my-4 opacity-60" />

        <p className="font-hand text-xl sm:text-3xl text-[#544E48] font-bold max-w-2xl mx-auto leading-relaxed">
          "Every bead threaded, every letter stamped, and every gift wrapped with care to make someone's ordinary day extraordinary."
        </p>

        {/* Lookbook Palette Badges */}
        <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-display font-bold text-[#1A1816]">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#DFD7CB] rounded-full border border-[#C8BEAF] shadow-2xs hover:scale-105 transition-transform">
            🌸 Custom Phone Charms
          </span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#9E8EB8]/30 text-[#2A203A] rounded-full border border-[#9E8EB8]/50 shadow-2xs hover:scale-105 transition-transform">
            💫 Couple Magnetic Bracelets
          </span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#717C6D]/25 text-[#141C12] rounded-full border border-[#717C6D]/40 shadow-2xs hover:scale-105 transition-transform">
            🥑 Mini Clay Keychains
          </span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#D69E4A]/30 text-[#211709] rounded-full border border-[#D69E4A]/50 shadow-2xs hover:scale-105 transition-transform">
            ✨ Night Glow Buddies
          </span>
        </div>

      </div>
    </section>
  );
};
