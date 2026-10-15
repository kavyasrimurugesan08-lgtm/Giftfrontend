import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, MOODS } from '../data/products';
import { useCollections } from '../context/CollectionsContext';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Sparkles, 
  Heart, 
  Key, 
  Scissors, 
  Smile, 
  Moon, 
  Gem, 
  Palette, 
  Compass, 
  Gift, 
  ArrowRight, 
  Search, 
  Layers, 
  Sparkle,
  Store,
  Paintbrush,
  SlidersHorizontal
} from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  Heart: Heart,
  Key: Key,
  Scissors: Scissors,
  Smile: Smile,
  Moon: Moon,
  Gem: Gem,
  Palette: Palette,
  Compass: Compass,
  Gift: Gift,
};

export const CategoriesPage = () => {
  const navigate = useNavigate();
  const { categories } = useCollections();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(categories[0]?.slug || 'phone-charms');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter categories by search term
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get products for the active tab preview
  const tabProducts = PRODUCTS.filter(p => p.category === activeTab).slice(0, 4);
  const activeCategoryObj = categories.find(c => c.slug === activeTab) || categories[0];

  const getCategoryHighlights = (slug) => {
    switch (slug) {
      case 'phone-charms':
        return ['Custom Name Beads', 'Y2K Pastels', 'Anti-Drop Cord'];
      case 'bracelets':
        return ['Magnetic Couple Charms', 'Braided Threads', 'Water-Resistant'];
      case 'keychains':
        return ['3D Clay Pastries', 'Initials & Acrylic', 'Pocket Sized'];
      case 'hair-accessories':
        return ['Pastel Daisy Clips', 'Silk Scrunchies', 'Vintage Bows'];
      case 'miniature-toys':
        return ['Desk Companions', 'Tiny Collectibles', 'Stress Relievers'];
      case 'radium-toys':
        return ['Glow-In-The-Dark', 'Cosmic Figurines', 'Night Glow Collectibles'];
      case 'invisible-jewellery':
        return ['Floating Illusion Line', 'Delicate Pendants', 'Aura Crystals'];
      case 'diy-kits':
        return ['Bead Loom Stations', 'Charm Weaving Sets', 'Starter Tools'];
      case 'fridge-magnets':
        return ['Mini Food Bakery', 'Resin Keepsakes', 'Super Strong Magnet'];
      case 'gift-sets':
        return ['Pre-Packed Gift Hampers', 'Ribbons & Notes', 'Ready to Surprise'];
      default:
        return ['Handcrafted', 'Aesthetic Curation', 'Pocket Magic'];
    }
  };

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 01. EDITORIAL HERO HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F4D2BE]/70 via-[#F8E8D5] to-[#E8D49A]/50 border border-[#D9A99A]/60 p-8 sm:p-12 shadow-sm">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AC5B44]/20 border border-[#AC5B44] text-[#AC5B44] text-xs font-black uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>The Department of Cute</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl text-[#18110D] leading-tight font-black">
              Explore Our Chapters & Collections
            </h1>

            <p className="text-[#47342C] text-base sm:text-lg mt-3 font-sans max-w-2xl leading-relaxed font-medium">
              Every category is a carefully curated world of handcrafted charms, delicate adornments, pocket toys, and joyful gifts designed to brighten every little moment.
            </p>

            {/* In-page Category Search Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 absolute left-4 top-3.5 text-[#47342C]" />
                <input
                  type="text"
                  placeholder="Search a chapter (e.g. Phone Charms, Radium, Keychains)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-xs sm:text-sm font-sans border border-[#D9A99A] shadow-xs focus:outline-none focus:border-[#AC5B44] focus:ring-2 focus:ring-[#AC5B44]/20 text-[#18110D] placeholder-[#70584D]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs text-[#18110D] hover:text-[#AC5B44] font-bold px-2 py-0.5 rounded-lg bg-[#FAF5EE]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none text-[#AC5B44]">
            <Sparkles className="w-96 h-96" />
          </div>
        </section>


        {/* 02. FULL CATEGORY SHOWCASE GRID - DARK THEMED BOXES WITH HIGH CONTRAST */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9A99A]/50 pb-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#AC5B44] uppercase block mb-1">
                Visual Directory
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18110D] font-bold">
                All {filteredCategories.length} Departments
              </h2>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#D9A99A]/60">
              <p className="font-editorial text-2xl text-[#18110D] mb-2 font-bold">No chapters found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 px-5 py-2 bg-[#AC5B44] text-white text-xs font-bold rounded-full cursor-pointer hover:bg-[#18110D] transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCategories.map((cat, idx) => {
                const IconComponent = iconMap[cat.icon] || Sparkles;
                const highlights = getCategoryHighlights(cat.slug);

                return (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    className="group relative bg-[#18110D] text-white rounded-3xl border-2 border-[#3D2C24] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#AC5B44] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    {/* Top Image Banner with Deep Contrast Mask */}
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-[#2B1C14]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#18110D] via-[#18110D]/65 via-40% to-black/15" />

                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-[11px] font-display font-black bg-white text-[#18110D] shadow-md border border-white flex items-center gap-1.5">
                          <IconComponent className="w-3.5 h-3.5 text-[#AC5B44]" />
                          <span>Chapter {String(idx + 1).padStart(2, '0')}</span>
                        </span>
                      </div>

                      {/* Top Right: Item Count */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="bg-[#AC5B44] text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                          {cat.itemCount || 15}+ Items
                        </div>
                      </div>

                      {/* Name on image - Brilliant White with Shadow */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-editorial text-2xl !text-white text-white font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:text-[#E8D49A] transition-colors leading-snug">
                          {cat.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body with High Contrast Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs sm:text-sm !text-[#F4D2BE] text-[#F4D2BE] line-clamp-2 leading-relaxed font-medium">
                          {cat.description}
                        </p>

                        {/* Highlight Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {highlights.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-bold bg-white/10 text-[#E8D49A] px-2.5 py-1 rounded-lg border border-white/15"
                            >
                              • {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions Footer */}
                      <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                        <span className="text-xs font-display font-bold !text-[#F5E8DC] text-[#F5E8DC]">
                          View Collection
                        </span>

                        <div
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#AC5B44] group-hover:bg-[#E8D49A] group-hover:text-[#18110D] text-white text-xs font-display font-bold transition-all shadow-md"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>


        {/* 03. INTERACTIVE CATEGORY QUICK-PREVIEW */}
        <section className="bg-white rounded-3xl border border-[#D9A99A]/60 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#AC5B44] uppercase block mb-1">
                Curated Sampler
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18110D] font-bold">
                Sample by Chapter
              </h2>
              <p className="text-xs sm:text-sm text-[#47342C] mt-1 font-medium">
                Preview hot items inside each category before jumping into the full catalog.
              </p>
            </div>

            {activeCategoryObj && (
              <Link
                to={`/shop?category=${activeCategoryObj.slug}`}
                className="text-xs font-display font-bold text-[#AC5B44] hover:text-[#18110D] flex items-center gap-1 transition-colors self-start sm:self-auto"
              >
                <span>View all in {activeCategoryObj.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#D9A99A]/40">
            {categories.map((cat) => {
              const isActive = activeTab === cat.slug;
              const IconComponent = iconMap[cat.icon] || Sparkles;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.slug)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-display font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#AC5B44] text-white shadow-md -translate-y-0.5'
                      : 'bg-[#FAF5EE] text-[#18110D] hover:bg-[#F4D2BE] border border-[#D9A99A]'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Products Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {tabProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>


        {/* 04. SHOP BY MOOD & OCCASION */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black tracking-widest text-[#AC5B44] uppercase block mb-1">
              Gifting Occasions
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18110D] font-bold">
              Shop by Mood & Feeling
            </h2>
            <p className="text-xs sm:text-sm text-[#47342C] mt-1 font-hand text-2xl font-bold">
              "Whether it's for your soulmate bestie or a tiny desk buddy for yourself." ♡
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {MOODS.map((mood) => (
              <Link
                key={mood.id}
                to={`/shop?mood=${mood.filter}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#D9A99A]/60 p-4 flex flex-col items-center text-center hover:shadow-lg transition-all hover:-translate-y-1 shadow-2xs"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-3 shadow-sm">
                  <img
                    src={mood.image}
                    alt={mood.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[10px] font-black text-[#AC5B44] uppercase tracking-wider">
                  {mood.tag}
                </span>
                <h4 className="font-editorial text-base font-bold text-[#18110D] mt-0.5">
                  {mood.title}
                </h4>
                <p className="text-[11px] text-[#47342C] mt-1 line-clamp-1 font-sans font-medium">
                  {mood.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </section>


        {/* 05. DUAL SHORTCUT CALLOUT: CUSTOMIZER & WHOLESALE */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Customizer Box */}
          <div className="relative rounded-3xl bg-[#18110D] text-white border-2 border-[#3D2C24] p-8 flex flex-col justify-between overflow-hidden shadow-xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AC5B44] text-white text-[10px] font-black uppercase tracking-widest mb-3 shadow-xs">
                <Paintbrush className="w-3 h-3" />
                <span>Custom Workshop</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl !text-white text-white font-bold">
                Design Your Own Beaded Masterpiece
              </h3>
              <p className="text-xs sm:text-sm text-[#F4D2BE] mt-2 leading-relaxed font-medium">
                Choose letters, charm cords, pastel beads, and glow charms in real-time with our live interactive preview customizer.
              </p>
            </div>
            <div className="mt-6 relative z-10">
              <Link
                to="/customized"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#AC5B44] hover:bg-[#E8D49A] hover:text-[#18110D] text-white text-xs font-display font-bold transition-all shadow-md"
              >
                <span>Launch Customizer Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Wholesale Box */}
          <div className="relative rounded-3xl bg-[#18110D] text-white border-2 border-[#3D2C24] p-8 flex flex-col justify-between overflow-hidden shadow-xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AC5B44] text-white text-[10px] font-black uppercase tracking-widest mb-3 shadow-xs">
                <Store className="w-3 h-3" />
                <span>B2B Wholesale Hub</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl !text-white text-white font-bold">
                Stock GIFTPocket in Your Boutique
              </h3>
              <p className="text-xs sm:text-sm text-[#F4D2BE] mt-2 leading-relaxed font-medium">
                Get up to 50% discount on MOQ 10+ pcs with live tier pricing, GST invoicing, and custom branded packaging.
              </p>
            </div>
            <div className="mt-6 relative z-10">
              <Link
                to="/wholesale"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#AC5B44] hover:bg-[#E8D49A] hover:text-[#18110D] text-white text-xs font-display font-bold transition-all shadow-md"
              >
                <span>Explore Wholesale Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </section>

      </div>

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
