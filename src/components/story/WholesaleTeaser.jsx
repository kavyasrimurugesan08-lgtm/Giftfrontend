import React from 'react';
import { Link } from 'react-router-dom';
import { Store, TrendingUp, Sparkles, ShieldCheck, ArrowRight, PackageCheck } from 'lucide-react';
import { BlobShape } from '../common/BlobShape';

export const WholesaleTeaser = () => {
  return (
    <section className="py-24 bg-[#1A1816] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Background Blobs with Subtle Glow */}
      <div className="absolute -top-16 -left-16 w-80 h-80 opacity-20 pointer-events-none">
        <BlobShape variant={1} color="#C97D67" />
      </div>
      <div className="absolute -bottom-16 -right-16 w-80 h-80 opacity-15 pointer-events-none">
        <BlobShape variant={2} color="#D69E4A" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C97D67]/30 border border-[#C97D67] text-[#D69E4A] text-xs font-black tracking-widest uppercase">
              <Store className="w-3.5 h-3.5" />
              <span>For Retailers & Resellers</span>
            </span>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl !text-white text-white font-black leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Love cute things? <br />
              <span className="italic font-normal !text-[#D69E4A] text-[#D69E4A]">Make them your business.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#DFD7CB] font-medium leading-relaxed max-w-xl">
              Bring GIFTPocket to your boutique, Instagram shop, or campus flea market with our low MOQ wholesale collection and tiered partner discounts.
            </p>

            {/* Benefit Highlights */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1 backdrop-blur-xs">
                <p className="font-black text-[#D69E4A] text-xs sm:text-sm uppercase tracking-wider">Low MOQ</p>
                <p className="text-[11px] sm:text-xs text-[#DFD7CB]">Starts at only 20 pcs</p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1 backdrop-blur-xs">
                <p className="font-black text-[#D69E4A] text-xs sm:text-sm uppercase tracking-wider">Up to 60% Margin</p>
                <p className="text-[11px] sm:text-xs text-[#DFD7CB]">High-profit impulse items</p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1 backdrop-blur-xs">
                <p className="font-black text-[#D69E4A] text-xs sm:text-sm uppercase tracking-wider">Pan-India Courier</p>
                <p className="text-[11px] sm:text-xs text-[#DFD7CB]">Insured express dispatch</p>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/wholesale"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#C97D67] hover:bg-[#D69E4A] hover:text-[#1A1816] text-white rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer text-center"
              >
                <span>EXPLORE WHOLESALE CATALOGUE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/wholesale#apply"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-display font-bold text-xs tracking-widest uppercase border border-white/30 transition-colors cursor-pointer text-center"
              >
                Apply as a Reseller
              </Link>
            </div>
          </div>

          {/* Right Card: Wholesale Tier Summary Preview (5 Cols) */}
          <div className="lg:col-span-5 bg-[#EDE8E1] text-[#1A1816] rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-[#C97D67]/40 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#1A1816]/25 pb-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#C97D67] uppercase block mb-0.5">
                  Wholesale Sample Pricing
                </span>
                <h3 className="font-editorial text-xl font-black !text-[#1A1816] text-[#1A1816]">
                  Custom Name Phone Charms
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-[#D69E4A] text-[#1A1816] text-[10px] font-black rounded-md border border-[#C88E35]">
                MOQ 20 Pcs
              </span>
            </div>

            {/* Quantity Breakdown Table */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-white font-medium border border-[#D4C9BA]/60">
                <span className="text-[#1A1816] font-bold">20 – 49 pieces</span>
                <span className="font-black text-[#C97D67]">₹79 / pc <span className="text-[10px] text-[#7D746B] line-through ml-1">₹149</span></span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-white font-medium border border-[#D4C9BA]/60">
                <span className="text-[#1A1816] font-bold">50 – 99 pieces</span>
                <span className="font-black text-[#C97D67]">₹69 / pc <span className="text-[10px] text-[#7D746B] line-through ml-1">₹149</span></span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#D69E4A]/30 border border-[#D69E4A]/60">
                <span className="font-black text-[#1A1816]">100+ pieces (Bulk Saver)</span>
                <span className="font-black text-[#C97D67]">₹59 / pc</span>
              </div>
            </div>

            <div className="p-3 bg-[#DFD7CB] rounded-2xl text-[11px] text-[#544E48] font-bold flex items-center gap-2 border border-[#D4C9BA]">
              <PackageCheck className="w-4 h-4 text-[#C97D67] shrink-0" />
              <span>Includes individual hanging display cards ready for your boutique shelves.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
