import React, { useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Heart, ShoppingBag, Sparkles, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check, ArrowRight, Package } from 'lucide-react';
import { LiveCustomizerCanvas } from '../components/customizer/LiveCustomizerCanvas';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetail = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const shouldOpenCustomizer = searchParams.get('customize') === 'true';
  const navigate = useNavigate();

  const { products, getProduct } = useProducts();
  const product = getProduct(slug) || products[0] || {};

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(shouldOpenCustomizer);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const primaryImage = product?.image || (Array.isArray(product?.images) && product?.images[0]) || '';
  const images = (Array.isArray(product?.images) && product.images.length > 0)
    ? product.images.filter(Boolean)
    : (primaryImage ? [primaryImage] : []);
  const activeImage = images[selectedImage] || primaryImage;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const relatedProducts = (products || []).filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6F5145] mb-8">
          <Link to="/" className="hover:text-[#B96F58]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#B96F58]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product?.category || ''}`} className="hover:text-[#B96F58] capitalize">
            {(product?.category || '').replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#332822] truncate max-w-xs">{product?.name}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Gallery on Left (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white/60 border-2 border-[#D9A99A]/50 shadow-lg relative group flex items-center justify-center">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product?.name || 'Product'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F4DCD1]/30 text-[#6F5145]/70 p-6 text-center">
                  <Package className="w-16 h-16 stroke-[1.2] mb-3 text-[#B96F58]/60" />
                  <span className="text-sm font-semibold tracking-wide">Awaiting Product Photo</span>
                  <span className="text-xs text-[#6F5145]/50 mt-1">Upload via Admin Panel</span>
                </div>
              )}
              {product?.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#E8D49A] text-[#6F5145] text-xs font-bold rounded-full uppercase shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel (only if multiple images) */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === idx
                        ? 'border-[#B96F58] scale-105 shadow-md'
                        : 'border-white/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase on Right (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Reviews */}
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase">
                {product.category.replace('-', ' ')}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#332822] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#332822]">{product.rating}</span>
                <span className="text-xs text-[#6F5145]">({product.reviewCount} happy reviews)</span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/70 border border-[#D9A99A]/40 flex items-baseline gap-3">
              <span className="font-display font-extrabold text-3xl text-[#B96F58]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-[#6F5145]/60 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#B96F58] text-[#F8E8D5] text-xs font-bold">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#6F5145] leading-relaxed">
              {product.description}
            </p>

            {/* Customization Banner Trigger if customizable */}
            {product.isCustomizable && (
              <div className="p-4 rounded-2xl bg-[#F4D2BE]/60 border border-[#D9A99A] flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-[#332822] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#B96F58]" />
                    Customizable Product
                  </h4>
                  <p className="text-xs text-[#6F5145]">
                    Personalize your bead colors, name letters & charm attachment.
                  </p>
                </div>
                <button
                  onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
                  className="px-4 py-2 bg-[#B96F58] text-[#F8E8D5] rounded-xl text-xs font-bold hover:bg-[#332822] transition-colors"
                >
                  {isCustomizerOpen ? "Hide Studio" : "Open 2D Studio"}
                </button>
              </div>
            )}

            {/* Wholesale Tier Pricing Breakdown if Wholesale eligible */}
            {product.isWholesale && product.wholesaleTiers && (
              <div className="p-4 rounded-2xl bg-[#E8D49A]/30 border border-[#E8D49A] space-y-2">
                <span className="text-[11px] font-bold text-[#6F5145] uppercase tracking-wider block">
                  Wholesale Bulk Tier Pricing (MOQ: {product.moq} pcs)
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {product.wholesaleTiers.map((t, idx) => (
                    <div key={idx} className="p-2 bg-white/70 rounded-xl border border-[#D9A99A]/40">
                      <p className="font-semibold text-[#332822]">{t.minQty}+ pcs</p>
                      <p className="font-bold text-[#B96F58]">₹{t.price} / pc</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#332822] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#D9A99A]/60 rounded-full bg-white px-3 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#B96F58]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#B96F58]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-4 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-2xl font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B96F58]/20"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Bag (₹{product.price * quantity})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="px-6 py-4 bg-[#332822] hover:bg-[#B96F58] text-[#F8E8D5] rounded-2xl font-display font-semibold text-sm transition-colors"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-2xl border transition-colors ${
                    isLiked
                      ? 'bg-[#D9A99A] text-[#332822] border-[#D9A99A]'
                      : 'bg-white/80 border-[#D9A99A]/60 hover:bg-[#F4D2BE]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#D9A99A]/30 text-xs text-[#6F5145]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B96F58]" />
                <span>Dispatched within 24-48 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B96F58]" />
                <span>100% Quality Checked</span>
              </div>
            </div>

          </div>

        </div>

        {/* Embedded Interactive Customizer if toggled */}
        {isCustomizerOpen && product.isCustomizable && (
          <div className="mb-16">
            <LiveCustomizerCanvas product={product} />
          </div>
        )}

        {/* Product Information Tabs */}
        <div className="bg-white/80 rounded-3xl p-6 sm:p-10 border border-[#D9A99A]/40 shadow-xs mb-16">
          <div className="flex items-center gap-4 border-b border-[#D9A99A]/30 pb-4 overflow-x-auto">
            {['description', 'material & care', 'shipping & returns', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-display font-bold uppercase tracking-wider transition-colors pb-2 relative shrink-0 ${
                  activeTab === tab ? 'text-[#B96F58]' : 'text-[#6F5145] hover:text-[#332822]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B96F58] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 text-sm text-[#332822] leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p>
                  Every piece from GIFTPocket is assembled by hand by skilled artisans. We take pride in the intricate bead selection, balanced weight distribution, and durable tying techniques that ensure your gift lasts.
                </p>
              </div>
            )}

            {activeTab === 'material & care' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#F8E8D5]/60 rounded-2xl space-y-1">
                  <strong>Materials:</strong>
                  <p>{product.material || "High Grade Acrylic & Polymer Resin"}</p>
                </div>
                <div className="p-4 bg-[#F8E8D5]/60 rounded-2xl space-y-1">
                  <strong>Size & Dimensions:</strong>
                  <p>{product.size || "Standard Gift Dimensions"}</p>
                </div>
                <div className="p-4 bg-[#F8E8D5]/60 rounded-2xl space-y-1">
                  <strong>Weight:</strong>
                  <p>{product.weight || "Lightweight & Portable"}</p>
                </div>
                <div className="p-4 bg-[#F8E8D5]/60 rounded-2xl space-y-1">
                  <strong>Care Guidelines:</strong>
                  <p>{product.care || "Avoid direct contact with perfumes and water immersion."}</p>
                </div>
              </div>
            )}

            {activeTab === 'shipping & returns' && (
              <div className="space-y-3 text-xs text-[#6F5145]">
                <p>• <strong>Free Shipping:</strong> Automatically applied at checkout for all Indian orders above ₹499.</p>
                <p>• <strong>Standard Shipping:</strong> ₹49 flat fee across India via BlueDart, Delhivery & SpeedPost.</p>
                <p>• <strong>Customized Products Return Policy:</strong> Since customized name items are individually crafted, they cannot be returned unless received damaged or defective.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#F4D2BE]/40 rounded-2xl">
                  <div className="text-3xl font-bold font-editorial text-[#B96F58]">
                    {product.rating} / 5.0
                  </div>
                  <div className="text-xs text-[#6F5145]">
                    Based on {product.reviewCount} verified customer purchases
                  </div>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-white rounded-2xl border border-[#D9A99A]/30">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-[#332822]">Aarushi K.</strong>
                      <span className="text-emerald-700 font-semibold">Verified Buyer</span>
                    </div>
                    <p className="text-[#6F5145]">"Super pretty and feels sturdy! Exactly as described."</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-editorial text-2xl text-[#332822]">
              You might also adore these
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
