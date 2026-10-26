import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOODS } from '../data/products';
import { useCollections } from '../context/CollectionsContext';
import { useProducts } from '../context/ProductsContext';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  X, 
  Search, 
  Star, 
  Tag, 
  Check, 
  RotateCcw, 
  Grid3X3, 
  LayoutGrid, 
  ChevronDown, 
  ChevronUp,
  Moon,
  Gift,
  Store,
  Paintbrush
} from 'lucide-react';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCollections();
  const { products } = useProducts();
  
  // URL Query Initial State
  const initialCategory = searchParams.get('category') || 'all';
  const initialMood = searchParams.get('mood') || '';
  const initialFilter = searchParams.get('filter') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [selectedMood, setSelectedMood] = useState(initialMood);
  const [onlyCustomizable, setOnlyCustomizable] = useState(initialFilter === 'customized');
  const [onlyWholesale, setOnlyWholesale] = useState(initialFilter === 'wholesale');
  const [onlyGlow, setOnlyGlow] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [pricePreset, setPricePreset] = useState('all'); // 'all', 'under-99', '100-199', '200-349', '350-plus'
  const [maxPrice, setMaxPrice] = useState(600);
  
  // UI States
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState('3'); // '2', '3', '4'
  
  // Collapsible sidebar sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    features: true,
    moods: true,
    rating: false
  });

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const mood = searchParams.get('mood') || '';
    const filter = searchParams.get('filter') || '';
    
    setSelectedCategory(cat);
    setSelectedMood(mood);
    if (filter === 'bestseller') setSelectedSort('rating');
    if (filter === 'new') setSelectedSort('newest');
    if (filter === 'customized') setOnlyCustomizable(true);
    if (filter === 'wholesale') setOnlyWholesale(true);
  }, [searchParams]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Price preset handler
  const handlePricePreset = (preset) => {
    setPricePreset(preset);
    if (preset === 'all') setMaxPrice(600);
    else if (preset === 'under-99') setMaxPrice(99);
    else if (preset === '100-199') setMaxPrice(199);
    else if (preset === '200-349') setMaxPrice(349);
    else if (preset === '350-plus') setMaxPrice(600);
  };

  // Calculate live count of items per category
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    categories.forEach(cat => {
      counts[cat.slug] = products.filter(p => p.category === cat.slug).length;
    });
    return counts;
  }, [categories, products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Mood / tag filter
      if (selectedMood) {
        const moodObj = MOODS.find(m => m.filter === selectedMood || m.id === selectedMood);
        const targetTag = moodObj ? moodObj.filter.toLowerCase() : selectedMood.toLowerCase();
        const hasMatchingTag = product.tags?.some(t => t.toLowerCase().includes(targetTag)) ||
                               product.description.toLowerCase().includes(targetTag) ||
                               product.name.toLowerCase().includes(targetTag);
        if (!hasMatchingTag) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.tags?.some((t) => t.toLowerCase().includes(q)) ||
          product.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Customizable toggle
      if (onlyCustomizable && !product.isCustomizable) {
        return false;
      }

      // Wholesale toggle
      if (onlyWholesale && !product.isWholesale) {
        return false;
      }

      // Glow in dark toggle
      if (onlyGlow && !product.tags?.includes('glow') && product.category !== 'radium-toys') {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Price preset & slider filter
      if (pricePreset === '100-199' && (product.price < 100 || product.price > 199)) {
        return false;
      }
      if (pricePreset === '200-349' && (product.price < 200 || product.price > 349)) {
        return false;
      }
      if (pricePreset === '350-plus' && product.price < 350) {
        return false;
      }
      if (pricePreset === 'all' && product.price > maxPrice) {
        return false;
      }
      if (pricePreset === 'under-99' && product.price > 99) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.price - b.price;
      if (selectedSort === 'price-high') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'newest') return b.id.localeCompare(a.id);
      return 0; // Default featured
    });
  }, [
    selectedCategory, 
    searchQuery, 
    selectedSort, 
    selectedMood, 
    onlyCustomizable, 
    onlyWholesale, 
    onlyGlow, 
    minRating, 
    pricePreset, 
    maxPrice
  ]);

  const handleCategorySelect = (catSlug) => {
    setSelectedCategory(catSlug);
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      if (catSlug === 'all') updated.delete('category');
      else updated.set('category', catSlug);
      return updated;
    });
  };

  const handleMoodSelect = (moodFilter) => {
    const nextMood = selectedMood === moodFilter ? '' : moodFilter;
    setSelectedMood(nextMood);
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      if (!nextMood) updated.delete('mood');
      else updated.set('mood', nextMood);
      return updated;
    });
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedMood('');
    setSearchQuery('');
    setOnlyCustomizable(false);
    setOnlyWholesale(false);
    setOnlyGlow(false);
    setMinRating(0);
    setPricePreset('all');
    setMaxPrice(600);
    setSelectedSort('featured');
    setSearchParams({});
  };

  // Check active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedMood) count++;
    if (searchQuery.trim()) count++;
    if (onlyCustomizable) count++;
    if (onlyWholesale) count++;
    if (onlyGlow) count++;
    if (minRating > 0) count++;
    if (pricePreset !== 'all' || maxPrice < 600) count++;
    return count;
  }, [selectedCategory, selectedMood, searchQuery, onlyCustomizable, onlyWholesale, onlyGlow, minRating, pricePreset, maxPrice]);

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 01. EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9A99A]/40 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#B96F58]/15 text-[#B96F58] text-[11px] font-bold tracking-widest uppercase">
                Curated Gift Catalogue
              </span>
              {selectedCategory !== 'all' && (
                <span className="text-xs text-[#6F5145] font-semibold flex items-center gap-1">
                  / <span className="capitalize">{selectedCategory.replace('-', ' ')}</span>
                </span>
              )}
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#332822] font-black">
              {selectedCategory === 'all' 
                ? 'All Little Treasures' 
                : categories.find(c => c.slug === selectedCategory)?.name || 'Collection'}
            </h1>
            <p className="text-xs sm:text-sm text-[#6F5145] mt-1 font-hand text-lg">
              "Find the little thing that makes someone's day." ♡
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-[#6F5145] font-semibold bg-white/70 px-4 py-2 rounded-full border border-[#D9A99A]/50 shadow-xs">
              Showing <strong className="text-[#B96F58]">{filteredProducts.length}</strong> items
            </div>

            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 rounded-full bg-[#B96F58] text-[#F8E8D5] text-xs font-bold shadow-md flex items-center gap-2 relative hover:bg-[#332822] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E8D49A] text-[#6F5145] text-[10px] font-extrabold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 02. QUICK HORIZONTAL CATEGORY PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2 rounded-full text-xs font-display font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#AC5B44] text-white shadow-md scale-102'
                : 'bg-white text-[#18110D] hover:bg-[#F4D2BE] border border-[#D9A99A]'
            }`}
          >
            <span>All Items</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${selectedCategory === 'all' ? 'bg-white/30 text-white' : 'bg-[#FAF5EE] text-[#47342C] border border-[#D9A99A]/40'}`}>
              {categoryCounts.all}
            </span>
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-display font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#AC5B44] text-white shadow-md scale-102'
                    : 'bg-white text-[#18110D] hover:bg-[#F4D2BE] border border-[#D9A99A]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/30 text-white' : 'bg-[#FAF5EE] text-[#47342C] border border-[#D9A99A]/40'}`}>
                  {categoryCounts[cat.slug] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* 03. APPLIED ACTIVE FILTERS CHIP BAR */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-white/70 rounded-2xl border border-[#D9A99A]/40 shadow-xs animate-fade-in">
            <span className="text-xs font-bold text-[#6F5145] uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#B96F58]" />
              <span>Applied:</span>
            </span>

            {/* Category Tag */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4D2BE] text-[#332822] text-xs font-medium border border-[#D9A99A]/60">
                <span>Chapter: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}</span>
                <button onClick={() => handleCategorySelect('all')} className="hover:text-[#B96F58]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Mood Tag */}
            {selectedMood && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9BDD8]/50 text-[#332822] text-xs font-medium border border-[#C9BDD8]">
                <span>Mood: {MOODS.find(m => m.filter === selectedMood)?.title || selectedMood}</span>
                <button onClick={() => handleMoodSelect(selectedMood)} className="hover:text-[#B96F58]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Search Query Tag */}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D49A]/50 text-[#332822] text-xs font-medium border border-[#E8D49A]">
                <span>"{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-[#B96F58]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Price Tag */}
            {pricePreset !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9C5A0]/40 text-[#332822] text-xs font-medium border border-[#B9C5A0]">
                <span>
                  {pricePreset === 'under-99' && 'Under ₹99'}
                  {pricePreset === '100-199' && '₹100 - ₹199'}
                  {pricePreset === '200-349' && '₹200 - ₹349'}
                  {pricePreset === '350-plus' && '₹350+'}
                </span>
                <button onClick={() => handlePricePreset('all')} className="hover:text-[#B96F58]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {pricePreset === 'all' && maxPrice < 600 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9C5A0]/40 text-[#332822] text-xs font-medium border border-[#B9C5A0]">
                <span>Max: ₹{maxPrice}</span>
                <button onClick={() => setMaxPrice(600)} className="hover:text-[#B96F58]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Customizable Tag */}
            {onlyCustomizable && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B96F58]/15 text-[#B96F58] text-xs font-bold border border-[#B96F58]/30">
                <span>✨ Customizable</span>
                <button onClick={() => setOnlyCustomizable(false)} className="hover:text-[#332822]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Wholesale Tag */}
            {onlyWholesale && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#67949A]/20 text-[#67949A] text-xs font-bold border border-[#67949A]/30">
                <span>🏬 Wholesale Bulk</span>
                <button onClick={() => setOnlyWholesale(false)} className="hover:text-[#332822]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Glow Tag */}
            {onlyGlow && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#67949A]/20 text-[#332822] text-xs font-medium border border-[#67949A]/40">
                <span>🌙 Glow in Dark</span>
                <button onClick={() => setOnlyGlow(false)} className="hover:text-[#B96F58]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Rating Tag */}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D49A]/40 text-[#332822] text-xs font-medium border border-[#E8D49A]">
                <span>★ {minRating}+ Stars</span>
                <button onClick={() => setMinRating(0)} className="hover:text-[#B96F58]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Reset Button */}
            <button
              onClick={resetAllFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#B96F58] hover:text-[#332822] hover:underline px-2 py-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* 04. MAIN LAYOUT: SIDEBAR + PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP FILTER SIDEBAR (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#D9A99A]/50 shadow-xs space-y-6 sticky top-28 max-h-[85vh] overflow-y-auto scrollbar-thin">
            
            {/* Sidebar Top Header */}
            <div className="flex items-center justify-between border-b border-[#D9A99A]/30 pb-3">
              <h3 className="font-editorial text-xl font-bold text-[#332822] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#B96F58]" />
                <span>Filter & Refine</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#B96F58] hover:text-[#332822] font-semibold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* In-page Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block">
                Quick Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#6F5145]" />
                <input
                  type="text"
                  placeholder="e.g. Lavender, Keychain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-[#F8E8D5]/60 rounded-2xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] focus:bg-white text-[#332822] placeholder-[#6F5145]/60 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-xs text-[#6F5145] hover:text-[#B96F58] p-0.5 rounded-full hover:bg-[#F8E8D5]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Section 1: Categories / Chapters */}
            <div className="border-t border-[#D9A99A]/30 pt-4">
              <button
                onClick={() => toggleSection('categories')}
                className="w-full flex items-center justify-between text-xs font-bold text-[#332822] uppercase tracking-wider mb-3 hover:text-[#B96F58] transition-colors"
              >
                <span>Chapters & Categories</span>
                {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expandedSections.categories && (
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-[#B96F58] text-[#F8E8D5] font-bold shadow-xs'
                        : 'text-[#332822] hover:bg-[#F4D2BE]/60'
                    }`}
                  >
                    <span>All Collections</span>
                    <span className="text-[11px] opacity-80">{categoryCounts.all}</span>
                  </button>

                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#B96F58] text-[#F8E8D5] font-bold shadow-xs'
                            : 'text-[#332822] hover:bg-[#F4D2BE]/60'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span className="text-[11px] opacity-80">{categoryCounts[cat.slug] || 0}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 2: Price Filters & Presets */}
            <div className="border-t border-[#D9A99A]/30 pt-4">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between text-xs font-bold text-[#332822] uppercase tracking-wider mb-3 hover:text-[#B96F58] transition-colors"
              >
                <span>Price & Budget</span>
                {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expandedSections.price && (
                <div className="space-y-4">
                  {/* Preset Pills */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handlePricePreset('under-99')}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-center transition-all ${
                        pricePreset === 'under-99'
                          ? 'bg-[#B96F58] text-[#F8E8D5] shadow-xs'
                          : 'bg-[#F8E8D5]/70 text-[#332822] hover:bg-[#F4D2BE] border border-[#D9A99A]/30'
                      }`}
                    >
                      Under ₹99
                    </button>
                    <button
                      onClick={() => handlePricePreset('100-199')}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-center transition-all ${
                        pricePreset === '100-199'
                          ? 'bg-[#B96F58] text-[#F8E8D5] shadow-xs'
                          : 'bg-[#F8E8D5]/70 text-[#332822] hover:bg-[#F4D2BE] border border-[#D9A99A]/30'
                      }`}
                    >
                      ₹100 - ₹199
                    </button>
                    <button
                      onClick={() => handlePricePreset('200-349')}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-center transition-all ${
                        pricePreset === '200-349'
                          ? 'bg-[#B96F58] text-[#F8E8D5] shadow-xs'
                          : 'bg-[#F8E8D5]/70 text-[#332822] hover:bg-[#F4D2BE] border border-[#D9A99A]/30'
                      }`}
                    >
                      ₹200 - ₹349
                    </button>
                    <button
                      onClick={() => handlePricePreset('350-plus')}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-center transition-all ${
                        pricePreset === '350-plus'
                          ? 'bg-[#B96F58] text-[#F8E8D5] shadow-xs'
                          : 'bg-[#F8E8D5]/70 text-[#332822] hover:bg-[#F4D2BE] border border-[#D9A99A]/30'
                      }`}
                    >
                      ₹350 & Above
                    </button>
                  </div>

                  {/* Range Slider */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#6F5145]">Max Cap:</span>
                      <span className="text-[#B96F58] font-bold">₹{maxPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="49"
                      max="600"
                      step="25"
                      value={maxPrice}
                      onChange={(e) => {
                        setPricePreset('all');
                        setMaxPrice(Number(e.target.value));
                      }}
                      className="w-full accent-[#B96F58] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#6F5145]">
                      <span>₹49</span>
                      <span>₹300</span>
                      <span>₹600</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Special Features & Badges */}
            <div className="border-t border-[#D9A99A]/30 pt-4">
              <button
                onClick={() => toggleSection('features')}
                className="w-full flex items-center justify-between text-xs font-bold text-[#332822] uppercase tracking-wider mb-3 hover:text-[#B96F58] transition-colors"
              >
                <span>Special Attributes</span>
                {expandedSections.features ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expandedSections.features && (
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#332822] hover:text-[#B96F58] transition-colors p-1.5 rounded-xl hover:bg-[#F4D2BE]/30">
                    <input
                      type="checkbox"
                      checked={onlyCustomizable}
                      onChange={(e) => setOnlyCustomizable(e.target.checked)}
                      className="w-4 h-4 rounded text-[#B96F58] focus:ring-[#B96F58] accent-[#B96F58]"
                    />
                    <span className="flex items-center gap-1.5">
                      <Paintbrush className="w-3.5 h-3.5 text-[#B96F58]" />
                      <span>Customizable / Personalized</span>
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#332822] hover:text-[#B96F58] transition-colors p-1.5 rounded-xl hover:bg-[#F4D2BE]/30">
                    <input
                      type="checkbox"
                      checked={onlyWholesale}
                      onChange={(e) => setOnlyWholesale(e.target.checked)}
                      className="w-4 h-4 rounded text-[#B96F58] focus:ring-[#B96F58] accent-[#B96F58]"
                    />
                    <span className="flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-[#6F5145]" />
                      <span>Wholesale B2B Eligible</span>
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#332822] hover:text-[#B96F58] transition-colors p-1.5 rounded-xl hover:bg-[#F4D2BE]/30">
                    <input
                      type="checkbox"
                      checked={onlyGlow}
                      onChange={(e) => setOnlyGlow(e.target.checked)}
                      className="w-4 h-4 rounded text-[#B96F58] focus:ring-[#B96F58] accent-[#B96F58]"
                    />
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-[#67949A]" />
                      <span>Glow-In-The-Dark & Radium</span>
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Section 4: Mood & Occasions */}
            <div className="border-t border-[#D9A99A]/30 pt-4">
              <button
                onClick={() => toggleSection('moods')}
                className="w-full flex items-center justify-between text-xs font-bold text-[#332822] uppercase tracking-wider mb-3 hover:text-[#B96F58] transition-colors"
              >
                <span>Mood & Occasion</span>
                {expandedSections.moods ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expandedSections.moods && (
                <div className="flex flex-wrap gap-1.5">
                  {MOODS.map((mood) => {
                    const isSelected = selectedMood === mood.filter;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood.filter)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#B96F58] text-[#F8E8D5] font-bold shadow-xs'
                            : 'bg-[#F8E8D5]/70 text-[#332822] hover:bg-[#F4D2BE] border border-[#D9A99A]/40'
                        }`}
                      >
                        {mood.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 5: Customer Ratings */}
            <div className="border-t border-[#D9A99A]/30 pt-4">
              <button
                onClick={() => toggleSection('rating')}
                className="w-full flex items-center justify-between text-xs font-bold text-[#332822] uppercase tracking-wider mb-3 hover:text-[#B96F58] transition-colors"
              >
                <span>Minimum Rating</span>
                {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expandedSections.rating && (
                <div className="space-y-1.5">
                  {[4.5, 4.0, 3.5].map((ratingVal) => (
                    <button
                      key={ratingVal}
                      onClick={() => setMinRating(minRating === ratingVal ? 0 : ratingVal)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                        minRating === ratingVal
                          ? 'bg-[#B96F58] text-[#F8E8D5] font-bold shadow-xs'
                          : 'text-[#332822] hover:bg-[#F4D2BE]/60'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Star className={`w-3.5 h-3.5 fill-current ${minRating === ratingVal ? 'text-[#E8D49A]' : 'text-amber-500'}`} />
                        <span>{ratingVal} Stars & up</span>
                      </div>
                      {minRating === ratingVal && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* PRODUCTS GRID & TOOLBAR (9 COLS) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-[#D9A99A]/40 shadow-xs">
              <div className="text-xs text-[#6F5145]">
                Showing <strong className="text-[#332822] text-sm">{filteredProducts.length}</strong> cute finds
              </div>

              <div className="flex items-center gap-3">
                
                {/* Desktop Grid Layout Selector */}
                <div className="hidden sm:flex items-center gap-1 bg-[#F8E8D5] p-1 rounded-xl border border-[#D9A99A]/40">
                  <button
                    onClick={() => setGridCols('2')}
                    className={`p-1.5 rounded-lg transition-colors ${gridCols === '2' ? 'bg-[#B96F58] text-[#F8E8D5]' : 'text-[#6F5145] hover:text-[#332822]'}`}
                    title="2 Columns"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols('3')}
                    className={`p-1.5 rounded-lg transition-colors ${gridCols === '3' ? 'bg-[#B96F58] text-[#F8E8D5]' : 'text-[#6F5145] hover:text-[#332822]'}`}
                    title="3 Columns"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#6F5145] hidden sm:inline">Sort:</span>
                  <div className="relative">
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 bg-[#F8E8D5] text-xs font-bold text-[#332822] rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] cursor-pointer"
                    >
                      <option value="featured">✨ Curated / Featured</option>
                      <option value="price-low">💸 Price: Low to High</option>
                      <option value="price-high">💎 Price: High to Low</option>
                      <option value="rating">⭐ Highest Rated</option>
                      <option value="newest">🎁 New Arrivals</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-3 text-[#6F5145] pointer-events-none" />
                  </div>
                </div>

              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid grid-cols-2 ${gridCols === '2' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 sm:gap-6`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white/70 backdrop-blur-md rounded-3xl border border-[#D9A99A]/40 p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4D2BE] text-[#B96F58] flex items-center justify-center mx-auto shadow-inner">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#332822] font-bold">
                  "No treasures match these filters yet."
                </h3>
                <p className="text-xs sm:text-sm text-[#6F5145] max-w-md mx-auto leading-relaxed">
                  Try adjusting your budget, clearing search terms, or resetting category tags to explore more cute items.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-full text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters ({activeFiltersCount})</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 05. MOBILE SLIDE-OVER FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#332822]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#F8E8D5] text-[#332822] shadow-2xl flex flex-col border-l border-[#D9A99A]/40">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#D9A99A]/30 flex items-center justify-between bg-[#F4D2BE]/60">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#B96F58]" />
                  <span className="font-editorial text-xl font-bold">Filter Products</span>
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#B96F58] text-[#F8E8D5] text-[10px] font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full text-[#6F5145] hover:bg-[#D9A99A]/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-6 space-y-6 overflow-y-auto flex-grow">
                
                {/* Search */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-[#6F5145]" />
                    <input
                      type="text"
                      placeholder="Keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl text-xs border border-[#D9A99A]/60"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block">Chapters</label>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => handleCategorySelect('all')}
                      className={`p-2 rounded-xl text-xs font-medium text-left ${selectedCategory === 'all' ? 'bg-[#B96F58] text-[#F8E8D5] font-bold' : 'bg-white text-[#332822]'}`}
                    >
                      All Items
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.slug)}
                        className={`p-2 rounded-xl text-xs font-medium text-left truncate ${selectedCategory === cat.slug ? 'bg-[#B96F58] text-[#F8E8D5] font-bold' : 'bg-white text-[#332822]'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Presets */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block">Budget</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['all', 'under-99', '100-199', '200-349', '350-plus'].map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePricePreset(p)}
                        className={`p-2 rounded-xl text-xs text-center font-medium ${pricePreset === p ? 'bg-[#B96F58] text-[#F8E8D5] font-bold' : 'bg-white text-[#332822]'}`}
                      >
                        {p === 'all' && 'All Prices'}
                        {p === 'under-99' && '< ₹99'}
                        {p === '100-199' && '₹100 - ₹199'}
                        {p === '200-349' && '₹200 - ₹349'}
                        {p === '350-plus' && '₹350+'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attributes */}
                <div className="space-y-3 pt-2 border-t border-[#D9A99A]/30">
                  <label className="flex items-center gap-3 text-xs font-medium text-[#332822]">
                    <input
                      type="checkbox"
                      checked={onlyCustomizable}
                      onChange={(e) => setOnlyCustomizable(e.target.checked)}
                      className="w-4 h-4 rounded text-[#B96F58]"
                    />
                    <span>Personalized & Customizable</span>
                  </label>

                  <label className="flex items-center gap-3 text-xs font-medium text-[#332822]">
                    <input
                      type="checkbox"
                      checked={onlyWholesale}
                      onChange={(e) => setOnlyWholesale(e.target.checked)}
                      className="w-4 h-4 rounded text-[#B96F58]"
                    />
                    <span>Wholesale Bulk Available</span>
                  </label>

                  <label className="flex items-center gap-3 text-xs font-medium text-[#332822]">
                    <input
                      type="checkbox"
                      checked={onlyGlow}
                      onChange={(e) => setOnlyGlow(e.target.checked)}
                      className="w-4 h-4 rounded text-[#B96F58]"
                    />
                    <span>Glow in the Dark / Radium</span>
                  </label>
                </div>

              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-4 border-t border-[#D9A99A]/30 bg-white/90 flex items-center gap-3">
                <button
                  onClick={resetAllFilters}
                  className="w-1/3 py-3 rounded-2xl bg-[#F8E8D5] text-[#332822] text-xs font-bold hover:bg-[#F4D2BE] transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-2/3 py-3 rounded-2xl bg-[#B96F58] text-[#F8E8D5] text-xs font-bold shadow-md hover:bg-[#332822] transition-colors"
                >
                  View {filteredProducts.length} Finds
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

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
