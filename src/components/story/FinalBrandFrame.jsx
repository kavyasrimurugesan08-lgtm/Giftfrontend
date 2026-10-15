import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { BlobShape, DoodleSparkle } from '../common/BlobShape';

export const FinalBrandFrame = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-24 bg-[#EDE8E1] overflow-hidden">
      
      {/* Ambient background blobs with Lookbook Earth Tones */}
      <div className="absolute top-1/4 left-10 w-72 h-72 pointer-events-none opacity-40">
        <BlobShape variant={1} color="#DFD7CB" />
      </div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 pointer-events-none opacity-30">
        <BlobShape variant={2} color="#717C6D" />
      </div>

      {/* Floating Product 1 (Top Left) */}
      <div className="absolute top-12 left-6 md:left-24 z-10 w-28 md:w-36 aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-white transform -rotate-12 animate-float hidden sm:block">
        <img
          src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80"
          alt="Custom Charm"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Product 2 (Top Right) */}
      <div className="absolute top-16 right-6 md:right-28 z-10 w-24 md:w-32 aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-white transform rotate-12 animate-float-reverse hidden sm:block">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80"
          alt="Bracelet"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Product 3 (Bottom Left) */}
      <div className="absolute bottom-12 left-12 md:left-32 z-10 w-24 md:w-32 aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-white transform rotate-6 animate-float hidden sm:block">
        <img
          src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80"
          alt="Mini Keychain"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Product 4 (Bottom Right) */}
      <div className="absolute bottom-16 right-10 md:right-32 z-10 w-28 md:w-36 aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-white transform -rotate-6 animate-float-reverse hidden sm:block">
        <img
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80"
          alt="Gift Box"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center Cinematic Brand Typography */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-20 space-y-6">
        
        <DoodleSparkle className="w-8 h-8 text-[#C97D67] mx-auto animate-pulse-slow" />

        <h2 className="font-editorial text-4xl sm:text-7xl md:text-8xl text-[#121110] font-black tracking-tight leading-none uppercase">
          Give a little. <br />
          <span className="text-[#C97D67] italic font-normal">Make it big.</span>
        </h2>

        {/* Brand Lockup */}
        <div className="pt-2 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#C97D67] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <span className="font-editorial text-3xl font-black text-[#121110]">
              GIFTPocket
            </span>
          </div>
          <p className="font-hand text-2xl text-[#544E48] font-bold">
            "Little things. Big smiles." ♡
          </p>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#C97D67] hover:bg-[#1A1816] text-white rounded-full font-display font-bold text-sm tracking-widest uppercase transition-all shadow-2xl shadow-[#C97D67]/30 hover:scale-105 cursor-pointer"
          >
            <span>SHOP ALL CREATIONS</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>

    </section>
  );
};
