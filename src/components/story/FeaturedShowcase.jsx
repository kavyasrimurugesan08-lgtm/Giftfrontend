import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Eye, Heart, ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { QuickViewModal } from '../product/QuickViewModal';
import { DoodleSparkle } from '../common/BlobShape';

export const FeaturedShowcase = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();
  const { products } = useProducts();

  const heroProduct = products.find(p => p.image) || products[0] || {};
  const remaining = products.filter(p => p.id !== heroProduct.id);
  const secondary1 = remaining.find(p => p.image) || remaining[0] || {};
  const secondary2 = remaining.filter(p => p.id !== secondary1.id).find(p => p.image) || remaining[1] || {};

  const heroImg = heroProduct.image || (Array.isArray(heroProduct.images) && heroProduct.images[0]) || '';
  const sec1Img = secondary1.image || (Array.isArray(secondary1.images) && secondary1.images[0]) || '';
  const sec2Img = secondary2.image || (Array.isArray(secondary2.images) && secondary2.images[0]) || '';

  return (
    <section className="py-24 bg-[#EDE8E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with Editorial Framing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-[#D4C9BA] pb-6">
          <div>
            <span className="text-xs font-black tracking-[0.25em] text-[#C97D67] uppercase block mb-1">
              Lookbook Atelier
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#121110] font-black tracking-tight">
              Handcrafted with Personality
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs font-display font-black tracking-widest uppercase text-[#1A1816] hover:text-[#C97D67] flex items-center gap-1.5 transition-colors"
          >
            <span>VIEW COMPLETE CATALOGUE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Magazine Editorial Composition: 1 Large Hero + 2 Stacked Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Highlight (7 Cols) with Sandstone Tone */}
          <div className="lg:col-span-7 bg-[#DFD7CB]/75 rounded-3xl p-5 sm:p-10 border border-[#D4C9BA] flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300">
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[#C97D67] text-white rounded-full text-[11px] sm:text-xs font-black tracking-wider shadow-xs uppercase">
                MOST LOVED
              </span>
              <span className="font-hand text-base sm:text-xl text-[#C97D67] font-bold">
                Handmade just for you ♡
              </span>
            </div>

            {/* Center Product Image — Static Frame */}
            <div className="my-6 sm:my-8 relative flex items-center justify-center">
              <div className="w-52 h-52 xs:w-64 xs:h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex items-center justify-center bg-white/40">
                {heroImg ? (
                  <img
                    src={heroImg}
                    alt={heroProduct.name || 'Featured Item'}
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#EDE8E1]/40" />
                )}
              </div>
              <DoodleSparkle className="absolute -top-3 right-6 sm:-top-4 sm:right-12 w-6 h-6 sm:w-8 sm:h-8 text-[#D69E4A]" />
            </div>

            {/* Bottom Info & CTAs */}
            <div className="relative z-10 space-y-3">
              <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-1">
                <h3 className="font-editorial text-xl sm:text-3xl text-[#121110] font-black">
                  {heroProduct.name}
                </h3>
                <span className="font-display font-extrabold text-xl sm:text-2xl text-[#C97D67]">
                  ₹{heroProduct.price}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#544E48] font-medium leading-relaxed max-w-lg">
                {heroProduct.description}
              </p>

              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <Link
                  to={`/product/${heroProduct.slug}?customize=true`}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#C97D67] hover:bg-[#1A1816] text-white rounded-full font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Sparkles className="w-4 h-4 text-[#D69E4A]" />
                  <span>Customize in 2D Studio</span>
                </Link>
                <button
                  onClick={() => setQuickViewProduct(heroProduct)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 bg-white hover:bg-[#FAF8F5] text-[#1A1816] rounded-full font-display font-bold text-xs tracking-wider uppercase border border-[#D4C9BA] transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer text-center"
                >
                  <Eye className="w-4 h-4 text-[#544E48]" />
                  <span>Quick View</span>
                </button>
              </div>
            </div>

          </div>

          {/* Secondary Stack (5 Cols) with Sage and Sandstone */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            
            {/* Secondary 1 - Sage Tone */}
            <div className="flex-1 bg-[#717C6D]/20 rounded-3xl p-4 sm:p-6 border border-[#717C6D]/40 flex flex-row items-center gap-4 sm:gap-6 shadow-sm">
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 flex items-center justify-center bg-white/40">
                {sec1Img ? (
                  <img
                    src={sec1Img}
                    alt={secondary1.name || 'Keepsake'}
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <div className="w-full h-full bg-[#EDE8E1]/40" />
                )}
              </div>
              <div className="flex-1 space-y-1.5 sm:space-y-2 text-left min-w-0">
                <span className="text-[9.5px] sm:text-[10px] font-black tracking-widest text-[#717C6D] uppercase block truncate">
                  Couple Keepsake
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#121110] line-clamp-1">
                  {secondary1.name}
                </h4>
                <div className="font-extrabold text-[#C97D67] text-sm sm:text-base">
                  ₹{secondary1.price}
                </div>
                <Link
                  to={`/product/${secondary1.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1816] hover:text-[#C97D67]"
                >
                  <span>Discover Pair</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Secondary 2 - Lilac / Ochre Tone */}
            <div className="flex-1 bg-[#9E8EB8]/20 rounded-3xl p-4 sm:p-6 border border-[#9E8EB8]/40 flex flex-row items-center gap-4 sm:gap-6 shadow-sm">
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 flex items-center justify-center bg-white/40">
                {sec2Img ? (
                  <img
                    src={sec2Img}
                    alt={secondary2.name || 'Keepsake'}
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <div className="w-full h-full bg-[#EDE8E1]/40" />
                )}
              </div>
              <div className="flex-1 space-y-1.5 sm:space-y-2 text-left min-w-0">
                <span className="text-[9.5px] sm:text-[10px] font-black tracking-widest text-[#9E8EB8] uppercase block truncate">
                  Miniature Keychain
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#121110] line-clamp-1">
                  {secondary2.name}
                </h4>
                <div className="font-extrabold text-[#C97D67] text-sm sm:text-base">
                  ₹{secondary2.price}
                </div>
                <Link
                  to={`/product/${secondary2.slug}?customize=true`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1816] hover:text-[#C97D67]"
                >
                  <span>Engrave Name</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};
