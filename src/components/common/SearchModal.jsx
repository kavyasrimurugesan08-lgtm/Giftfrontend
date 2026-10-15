import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, Tag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { useCollections } from '../../context/CollectionsContext';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { categories } = useCollections();
  const navigate = useNavigate();

  const popularSearches = [
    "Phone Charm",
    "Custom Keychain",
    "Couple Bracelet",
    "Radium Astronaut",
    "DIY Beads Kit",
    "Toast Magnet",
    "Under ₹99"
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some(tag => tag.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (product) => {
    onClose();
    navigate(`/product/${product.slug}`);
  };

  const handleSearchCategory = (slug) => {
    onClose();
    navigate(`/shop?category=${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 md:pt-24 bg-[#332822]/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#F8E8D5] rounded-3xl shadow-2xl border-2 border-[#D9A99A]/50 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Header Input */}
        <div className="p-6 border-b border-[#D9A99A]/30 flex items-center gap-4 bg-[#F4D2BE]/40">
          <Search className="w-6 h-6 text-[#B96F58]" />
          <input
            type="text"
            placeholder="Search custom charms, bracelets, gift sets, toys..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-[#332822] placeholder-[#6F5145]/60 text-lg md:text-xl font-display focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 text-[#6F5145] hover:text-[#332822] rounded-full hover:bg-[#D9A99A]/40"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-[#332822] hover:bg-[#B96F58] hover:text-[#F8E8D5] rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Quick Categories Bar */}
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#6F5145] uppercase mb-3 block">
              Quick Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleSearchCategory(cat.slug)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#F8E8D5] hover:bg-[#B96F58] hover:text-[#F8E8D5] text-[#6F5145] border border-[#D9A99A]/60 transition-colors flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results or Suggestions */}
          {query.trim() === '' ? (
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#6F5145] uppercase mb-3 block">
                Popular Discoveries
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full text-sm font-sans bg-white/60 hover:bg-[#F4D2BE] text-[#332822] border border-[#D9A99A]/40 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#B96F58]" />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wider text-[#6F5145] uppercase">
                  Found {results.length} Little Treasures
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-3 bg-white/70 hover:bg-white rounded-2xl border border-[#D9A99A]/40 flex items-center gap-3 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-medium text-sm text-[#332822] truncate group-hover:text-[#B96F58] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#6F5145]/80 capitalize mt-0.5">
                        {product.category.replace('-', ' ')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-sm text-[#B96F58]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#6F5145]/60 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        {product.badge && (
                          <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#E8D49A] text-[#221609] border border-[#D8BC78]">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#AC5B44] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-editorial italic text-2xl text-[#18110D] mb-2 font-bold">
                "No match yet. Let's find you something cute."
              </p>
              <p className="text-sm text-[#47342C] mb-6 font-medium">
                Try searching for 'phone charm', 'keychain', or browse our curated collections.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/shop');
                }}
                className="px-6 py-2.5 bg-[#AC5B44] text-white rounded-full font-bold text-sm hover:bg-[#18110D] transition-colors cursor-pointer shadow-sm"
              >
                Browse All Little Treasures
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-[#F4D2BE]/30 border-t border-[#D9A99A]/30 text-center text-xs text-[#6F5145]">
          Press <kbd className="px-1.5 py-0.5 bg-white/80 rounded border border-[#D9A99A]/50">ESC</kbd> to exit search
        </div>
      </div>
    </div>
  );
};
