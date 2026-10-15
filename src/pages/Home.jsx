import React, { useState } from 'react';
import { HeroCinematic } from '../components/story/HeroCinematic';
import { BrandIntro } from '../components/story/BrandIntro';
import { ShopByMood } from '../components/story/ShopByMood';
import { FeaturedShowcase } from '../components/story/FeaturedShowcase';
import { ColorStoryChapter } from '../components/story/ColorStoryChapter';
import { CategoryCollage } from '../components/story/CategoryCollage';
import { InteractiveCustomizationStory } from '../components/story/InteractiveCustomizationStory';
import { GiftMoments } from '../components/story/GiftMoments';
import { PinterestGallery } from '../components/story/PinterestGallery';
import { WholesaleTeaser } from '../components/story/WholesaleTeaser';
import { CustomerLoveTestimonials } from '../components/story/CustomerLoveTestimonials';
import { FinalBrandFrame } from '../components/story/FinalBrandFrame';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const bestSellers = PRODUCTS.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8E8D5]">
      
      {/* 01 — CINEMATIC HERO */}
      <HeroCinematic />

      {/* 02 — BRAND INTRO */}
      <BrandIntro />

      {/* 03 — SHOP BY MOOD */}
      <ShopByMood />

      {/* 04 — FEATURED EDITORIAL PRODUCTS */}
      <FeaturedShowcase />

      {/* 05 — COLOR STORY CHAPTER (SCROLL TRANSITIONS) */}
      <ColorStoryChapter />

      {/* 06 — CATEGORY COLLAGE (PINTEREST MASONRY) */}
      <CategoryCollage />

      {/* 07 — INTERACTIVE CUSTOMIZATION STORY */}
      <InteractiveCustomizationStory />

      {/* 08 — BESTSELLERS CAROUSEL / GRID */}
      <section className="py-20 bg-[#F4D2BE]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase block mb-1">
                Trending Treasures
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#332822]">
                Our Most Loved Bestsellers
              </h2>
            </div>
            <Link
              to="/shop?filter=bestseller"
              className="mt-4 md:mt-0 text-xs font-display font-bold tracking-wider text-[#6F5145] hover:text-[#B96F58] flex items-center gap-1.5 transition-colors"
            >
              <span>EXPLORE ALL BESTSELLERS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 09 — GIFT MOMENTS */}
      <GiftMoments />

      {/* 10 — PINTEREST-STYLE GALLERY */}
      <PinterestGallery />

      {/* 11 — WHOLESALE / RESELLER TEASER */}
      <WholesaleTeaser />

      {/* 12 — CUSTOMER LOVE TESTIMONIALS */}
      <CustomerLoveTestimonials />

      {/* 14 — FINAL BRAND FRAME */}
      <FinalBrandFrame />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

    </div>
  );
};
