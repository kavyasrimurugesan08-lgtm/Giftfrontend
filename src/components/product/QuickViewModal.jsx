import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Sparkles, Check, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const QuickViewModal = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);
  const primaryImage = product.image || (Array.isArray(product.images) && product.images[0]) || '';
  const images = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images.filter(Boolean)
    : (primaryImage ? [primaryImage] : []);
  const activeImage = images[selectedImage] || primaryImage;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#332822]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F8E8D5] rounded-3xl shadow-2xl border border-[#D9A99A]/50 flex flex-col md:flex-row scrollbar-thin">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-[#B96F58] hover:text-[#F8E8D5] text-[#6F5145] transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery on Left */}
        <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between bg-[#F4D2BE]/30">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white/60 mb-3 border border-[#D9A99A]/40 flex items-center justify-center">
            {activeImage ? (
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#F4DCD1]/40 text-[#6F5145]/70 p-4 text-center">
                <Package className="w-12 h-12 stroke-[1.2] mb-2 text-[#B96F58]/60" />
                <span className="text-xs font-semibold">Awaiting Product Photo</span>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-[#B96F58] scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details on Right */}
        <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.badge && (
                <span className="px-2.5 py-0.5 bg-[#E8D49A] text-[#6F5145] text-[10px] font-bold rounded-full uppercase">
                  {product.badge}
                </span>
              )}
              <span className="text-xs text-[#6F5145] capitalize">
                {product.category.replace('-', ' ')}
              </span>
            </div>

            <h3 className="font-editorial text-xl font-bold text-[#332822]">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#6F5145]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-display font-bold text-2xl text-[#B96F58]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#6F5145]/60 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-[#6F5145] leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-[#D9A99A]/30">
            {product.isCustomizable ? (
              <Link
                to={`/product/${product.slug}?customize=true`}
                onClick={onClose}
                className="w-full py-3 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-2xl font-display font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Customization Studio</span>
              </Link>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-2xl font-display font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-2xl border border-[#D9A99A]/60 transition-colors ${
                    isLiked ? 'bg-[#D9A99A] text-[#332822]' : 'bg-white/80 hover:bg-[#F4D2BE]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            )}

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs font-semibold text-[#6F5145] hover:text-[#B96F58] hover:underline"
            >
              View Full Product Story & Care Guide →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
