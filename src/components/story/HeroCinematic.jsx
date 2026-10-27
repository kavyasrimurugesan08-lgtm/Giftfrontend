import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, Star, ShieldCheck, Zap, Gift } from 'lucide-react';
import { BlobShape, DoodleSparkle, DoodleArrow } from '../common/BlobShape';
import { useHomepageMedia } from '../../context/HomepageMediaContext';

export const HeroCinematic = () => {
  const { getHeroMedia } = useHomepageMedia();
  const { main, polaroid1, polaroid2 } = getHeroMedia();

  const mainImg = (main?.image && !main.image.includes('unsplash')) ? main.image : '/uploads/products/phone-charm-pastel-tulip.jpg';
  const pol1Img = (polaroid1?.image && !polaroid1.image.includes('unsplash')) ? polaroid1.image : '/uploads/products/flower-bell-charms.jpg';
  const pol2Img = (polaroid2?.image && !polaroid2.image.includes('unsplash')) ? polaroid2.image : '/uploads/products/miniature-panda-bamboo-set.jpg';

  return (
    <section className="relative min-h-[90vh] sm:min-h-[94vh] flex items-center justify-center pt-28 sm:pt-32 pb-14 sm:pb-20 overflow-hidden gradient-mesh-bg">
      
      {/* Background Animated Ambient Glowing Orbs */}
      <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-[#F4D2BE]/60 blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#C9BDD8]/50 blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[#E8D49A]/40 blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Floating Organic Blobs & Doodles */}
      <div className="absolute -top-12 -left-12 w-72 h-72 pointer-events-none opacity-60">
        <BlobShape variant={1} color="#F4D2BE" />
      </div>
      <div className="absolute top-1/3 -right-16 w-80 h-80 pointer-events-none opacity-50">
        <BlobShape variant={2} color="#C9BDD8" />
      </div>
      <div className="absolute -bottom-16 left-1/4 w-96 h-96 pointer-events-none opacity-40">
        <BlobShape variant={3} color="#E8D49A" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Large Editorial Typography & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            
            {/* Glassmorphic Animated Sub-badge with Editorial Minimalist Style */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-badge shadow-sm border border-white/90 animate-in fade-in slide-in-from-top-4 duration-500 hover:scale-105 transition-transform cursor-default max-w-full">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C97D67] flex items-center justify-center text-white shadow-2xs shrink-0">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
              </div>
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#1A1816] uppercase truncate">
                Artisan Keepsakes & Charms
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#717C6D] shrink-0 hidden xs:inline-block" />
              <span className="text-[11px] sm:text-xs font-hand text-[#C97D67] font-bold shrink-0 hidden xs:inline-block">handmade with love ♡</span>
            </div>

            {/* Main Headline with Editorial Serif Elegance */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-editorial text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#121110] leading-tight tracking-tight">
                Little things. <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C97D67] via-[#717C6D] to-[#1A1816]">
                  Big smiles.
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-lg text-[#544E48] max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed font-medium">
              Thoughtfully handcrafted phone charms, couple magnetic wristlets, miniature keepsakes & wholesale treasures designed to make everyday moments joyful.
            </p>

            {/* Action Buttons with Editorial Palette */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#C97D67] to-[#B06550] hover:from-[#1A1816] hover:to-[#1A1816] text-white rounded-full font-display font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-[#C97D67]/25 flex items-center justify-center gap-2.5 group hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              
              <Link
                to="/customized"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FAF8F5] hover:bg-white text-[#1A1816] border-2 border-[#D4C9BA] rounded-full font-display font-bold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D69E4A]" />
                <span>CUSTOMIZE YOUR GIFT</span>
              </Link>
            </div>

            {/* Glass Trust Metrics Bar */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-[#1A1816] font-bold">
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/90 shadow-2xs backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-[#717C6D] animate-pulse" />
                Free Delivery Above ₹499
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/90 shadow-2xs backdrop-blur-xs">
                <Zap className="w-3.5 h-3.5 text-[#D69E4A]" />
                24-Hour Dispatch
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/90 shadow-2xs backdrop-blur-xs">
                <Star className="w-3.5 h-3.5 fill-[#D69E4A] text-[#D69E4A]" />
                4.9/5 Rating (1,400+ Smiles)
              </span>
            </div>

          </div>

          {/* Right Column: Layered Editorial Floating Collage (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md aspect-[4/5] flex items-center justify-center mx-auto">
              
              {/* Decorative Glowing Backdrop Disk */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#F4D2BE] via-[#E8D49A] to-[#C9BDD8] blur-2xl opacity-70 animate-pulse-slow" />

              {/* Central Primary Product Frame — Static Image, No Hover Animation */}
              <div className="relative z-20 w-4/5 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2">
                <img
                  src={mainImg}
                  alt={main?.title || 'Customized Phone Charms'}
                  className="w-full h-full object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#332822]/80 via-[#332822]/20 to-transparent flex flex-col justify-end p-4 sm:p-5 text-[#F8E8D5]">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#E8D49A] uppercase">
                    {main?.tag || 'Bestselling Charm'}
                  </span>
                  <p className="font-display font-bold text-sm sm:text-base leading-tight">{main?.title || 'Pastel Beaded Tulip Charm'}</p>
                  <p className="text-[11px] sm:text-xs text-[#D9A99A]">{main?.subtitle || 'from ₹149'}</p>
                </div>
              </div>

              {/* Top-Right Mini Card with Glass Tag — Static */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-30 w-24 xs:w-28 sm:w-36 aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-white transform rotate-6">
                <img
                  src={pol1Img}
                  alt={polaroid1?.title || 'Friendship Bracelet'}
                  className="w-full h-full object-cover block"
                />
                <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 px-1.5 sm:px-2 py-0.5 bg-[#332822]/85 backdrop-blur-md rounded-full text-[8px] sm:text-[9px] text-white font-bold shadow-xs">
                  {polaroid1?.title ? polaroid1.title.slice(0, 12) : 'Charm Lanyard'}
                </div>
              </div>

              {/* Bottom-Left Mini Card — Static */}
              <div className="absolute -bottom-3 -left-2 sm:-bottom-6 sm:-left-3 z-30 w-28 xs:w-32 sm:w-40 aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-white transform -rotate-6">
                <img
                  src={pol2Img}
                  alt={polaroid2?.title || 'Mini Desk Buddy'}
                  className="w-full h-full object-cover block"
                />
                <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 px-2 sm:px-2.5 py-0.5 bg-[#B96F58] text-[#F8E8D5] rounded-full text-[8px] sm:text-[9px] font-bold shadow-xs">
                  {polaroid2?.title ? polaroid2.title.slice(0, 12) : 'Desk Buddy'}
                </div>
              </div>

              {/* Decorative Handwritten Floating Sticker */}
              <div className="absolute -top-5 left-2 sm:-top-8 sm:left-4 z-40 bg-[#E8D49A] text-[#6F5145] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-hand text-xs sm:text-base font-bold shadow-lg transform -rotate-12 hover:rotate-0 transition-transform cursor-default">
                "tiny treasures ♡"
              </div>

              {/* Decorative Floating Sparkle Icon */}
              <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:right-8 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#B96F58] animate-bounce" style={{ animationDuration: '3s' }}>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
