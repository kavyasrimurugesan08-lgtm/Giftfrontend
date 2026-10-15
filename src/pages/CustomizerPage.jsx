import React, { useState } from 'react';
import { LiveCustomizerCanvas } from '../components/customizer/LiveCustomizerCanvas';
import { PRODUCTS } from '../data/products';
import { Sparkles, Heart, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCustomizer } from '../context/CustomizerContext';

export const CustomizerPage = () => {
  const customizableProducts = PRODUCTS.filter((p) => p.isCustomizable);
  const [selectedProduct, setSelectedProduct] = useState(customizableProducts[0]);
  const { config } = useCustomizer();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>{config?.studioSubtitle || "Handmade Just For You"}</span>
            <Sparkles className="w-4 h-4" />
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#332822]">
            {config?.studioTitle || "The Customization Studio"}
          </h1>
          <p className="text-sm sm:text-base text-[#6F5145] font-sans">
            {config?.studioDescription || "Choose a canvas below, pick your pastel bead palettes, spell out your letters, and preview your creation live in real-time."}
          </p>
        </div>

        {/* Product Base Switcher Pills */}
        <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
          {customizableProducts.map((prod) => (
            <button
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className={`px-5 py-3 rounded-2xl text-xs font-display font-bold transition-all flex items-center gap-2 ${
                selectedProduct.id === prod.id
                  ? 'bg-[#B96F58] text-[#F8E8D5] shadow-lg scale-105'
                  : 'bg-white/80 text-[#332822] hover:bg-[#F4D2BE] border border-[#D9A99A]/50'
              }`}
            >
              <span>{prod.name}</span>
              <span className="text-[11px] opacity-80">(₹{prod.price})</span>
            </button>
          ))}
        </div>

        {/* Live Interactive Studio Canvas */}
        <div className="mb-16">
          <LiveCustomizerCanvas
            product={selectedProduct}
            onAddToCartSuccess={() => {}}
          />
        </div>

        {/* Studio Inspiration Cards */}
        {config?.inspirationPrompts && config.inspirationPrompts.length > 0 && (
          <div className="bg-white/60 rounded-3xl p-8 border border-[#D9A99A]/40 text-center space-y-6">
            <h3 className="font-editorial text-2xl text-[#332822]">
              Need inspiration for your letters?
            </h3>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-[#6F5145]">
              {config.inspirationPrompts.map((prompt) => (
                <span
                  key={prompt.id}
                  className="px-4 py-2 bg-white/80 rounded-full border border-[#D9A99A]/60 shadow-2xs"
                >
                  <strong className="text-[#332822]">{prompt.tag}</strong> {prompt.example}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
