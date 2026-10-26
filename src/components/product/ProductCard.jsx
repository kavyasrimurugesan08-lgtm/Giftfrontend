import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const productId = product.id || product.slug || 'item';
  const isLiked = isInWishlist(productId);

  const price = Number(product.price) || 129;
  const origPrice = Number(product.originalPrice) || 0;
  const discountPercent = origPrice > price
    ? Math.round(((origPrice - price) / origPrice) * 100)
    : 0;

  // Single primary image only - no secondary images, no hover flips, no random/stock defaults
  const primaryImage = (Array.isArray(product.images) && product.images[0]) || product.image || '';
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [primaryImage]);

  const categoryName = (product.category || 'Charms & Keepsakes').replace('-', ' ');
  const productSlug = product.slug || product.id || 'product';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.isCustomizable) {
      if (onQuickView) onQuickView(product);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div
      className="group relative bg-[#FAF8F5] hover:bg-white rounded-3xl p-3 sm:p-4 border border-[#D4C9BA] hover:border-[#C97D67]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#DFD7CB]/40 mb-3.5 border border-[#D4C9BA]/60 flex items-center justify-center">
        
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {product.badge && (
            <span className="px-2.5 py-1 bg-[#D69E4A] text-[#1A1816] text-[9.5px] font-black tracking-widest rounded-full shadow-xs uppercase border border-[#C88E35]">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-[#C97D67] text-white text-[9.5px] font-black rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
            isLiked
              ? 'bg-[#C97D67] text-white'
              : 'bg-white/90 text-[#1A1816] hover:text-[#C97D67] shadow-xs'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Static Product Primary Image — Strictly no hover image switching or animation */}
        <Link to={`/product/${productSlug}`} className="block w-full h-full">
          {primaryImage && !imgError ? (
            <img
              src={primaryImage}
              alt={product.name || 'GIFTPocket Item'}
              className="w-full h-full object-cover block select-none pointer-events-none"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#EDE8E1]/50 text-[#7D746B]">
              <ShoppingBag className="w-8 h-8 opacity-35 mb-1.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">Awaiting Photo</span>
            </div>
          )}
        </Link>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1.5 bg-[#1A1816]/90 hover:bg-[#1A1816] text-white rounded-full text-xs font-bold backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#D69E4A]" />
            <span>Quick Look</span>
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className="space-y-1.5">
        
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] text-[#544E48]">
          <span className="capitalize font-semibold tracking-wider">{categoryName}</span>
          <div className="flex items-center gap-1 text-[#D69E4A] font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating || 4.9}</span>
            <span className="text-[#544E48] font-medium">({product.reviewCount || 15})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${productSlug}`}>
          <h3 className="font-display font-bold text-sm text-[#1A1816] group-hover:text-[#C97D67] transition-colors line-clamp-2 leading-snug">
            {product.name || 'Handcrafted Gift'}
          </h3>
        </Link>

        {/* Price Row & Wholesale indicator */}
        <div className="flex items-baseline justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-base text-[#C97D67]">
              ₹{price}
            </span>
            {origPrice > price && (
              <span className="text-xs text-[#7D746B] font-medium line-through">
                ₹{origPrice}
              </span>
            )}
          </div>
          {product.isWholesale && (
            <span className="text-[10px] text-[#1A1816] bg-[#D69E4A]/30 px-2 py-0.5 rounded-md font-bold border border-[#D69E4A]/60">
              WS: ₹{product.wholesalePrice || 79}
            </span>
          )}
        </div>

      </div>

      {/* Action CTA Button */}
      <div className="pt-3 mt-2 border-t border-[#D4C9BA]/60">
        {product.isCustomizable ? (
          <Link
            to={`/product/${productSlug}?customize=true`}
            className="w-full py-2.5 bg-[#DFD7CB] hover:bg-[#C97D67] text-[#1A1816] hover:text-white rounded-xl font-display font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#C8BEAF] shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C97D67] group-hover:text-white" />
            <span>Customize Gift</span>
          </Link>
        ) : (
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#1A1816] hover:bg-[#C97D67] text-white rounded-xl font-display font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Basket</span>
          </button>
        )}
      </div>

    </div>
  );
};
