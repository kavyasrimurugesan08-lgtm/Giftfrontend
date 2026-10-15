import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Trash2, Plus, Minus, ShoppingBag, Heart, ArrowRight, Sparkles, Tag, Gift, Check } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';

export const CartPage = () => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart
  } = useCart();

  const [couponCode, setCouponCode] = React.useState('');
  const [couponError, setCouponError] = React.useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFree = Math.max(0, freeShippingThreshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[85vh] pt-36 sm:pt-40 pb-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#DFD7CB] flex items-center justify-center text-[#C97D67] mx-auto shadow-sm">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="font-editorial text-3xl text-[#121110] font-black">
            Your Bag is Empty
          </h2>
          <p className="text-sm text-[#544E48] font-medium">
            Looks like you haven't added any cute charms, friendship bands or keepsakes yet.
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1816] hover:bg-[#C97D67] text-white rounded-full font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              <span>Explore Little Things</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div className="border-b border-[#D4C9BA] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-black tracking-[0.25em] text-[#C97D67] uppercase block mb-1">
              Your Order Basket
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#121110] font-black tracking-tight">
              Shopping Bag ({cartItems.length} items)
            </h1>
          </div>
          <Link
            to="/shop"
            className="text-xs font-display font-bold tracking-wider text-[#544E48] hover:text-[#C97D67] transition-colors"
          >
            ← Continue Browsing
          </Link>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] rounded-3xl border border-[#D4C9BA] space-y-2 shadow-2xs">
          <div className="flex justify-between text-xs font-display font-bold">
            <span className="text-[#121110] flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#C97D67]" />
              {isFreeShipping ? (
                <span className="text-emerald-700">Congratulations! You've unlocked FREE India Delivery 🎉</span>
              ) : (
                <span>Add ₹{amountNeededForFree} more for <strong>FREE India Delivery</strong></span>
              )}
            </span>
            <span className="text-[#C97D67]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-[#EDE8E1] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D69E4A] to-[#C97D67] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items Table (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.itemKey}
                className="p-5 bg-[#FAF8F5] rounded-3xl border border-[#D4C9BA] shadow-xs flex flex-col sm:flex-row items-center gap-5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-[#D4C9BA]/60 shrink-0 bg-[#DFD7CB]/40"
                />

                <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-1">
                    <h3 className="font-display font-bold text-base text-[#121110]">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.itemKey)}
                      className="text-[#544E48]/60 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.customization && (
                    <div className="p-2.5 bg-[#EDE8E1] rounded-xl text-xs text-[#544E48] space-y-1 border border-[#D4C9BA]">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.customization.name && <span><strong>Name:</strong> {item.customization.name} • </span>}
                        {item.customization.colorTheme && <span><strong>Color:</strong> {item.customization.colorTheme}</span>}
                        {item.customization.charmAccent && <span> • <strong>Charm:</strong> {item.customization.charmAccent}</span>}
                      </div>
                      {item.customization.customPhoto && (
                        <div className="flex items-center gap-2 pt-1 border-t border-[#D4C9BA]/40">
                          <img
                            src={item.customization.customPhoto}
                            alt="Custom Photo"
                            className="w-8 h-8 rounded-lg object-cover border border-[#C97D67]"
                          />
                          <span className="text-[11px] font-bold text-[#C97D67]">Custom Keepsake Photo Attached ✓</span>
                        </div>
                      )}
                      {item.customization.notes && (
                        <div className="text-[11px] italic text-[#544E48]">Note: {item.customization.notes}</div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-base text-[#C97D67]">
                        ₹{(Number(item.price) || 0) * (Number(item.quantity) || 1)}
                      </span>
                      <span className="text-xs text-[#544E48]">
                        (₹{item.price} each)
                      </span>
                    </div>

                    <div className="flex items-center border border-[#D4C9BA] rounded-full bg-[#EDE8E1] px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                        className="p-1 hover:text-[#C97D67] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold min-w-[24px] text-center text-[#1A1816]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                        className="p-1 hover:text-[#C97D67] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary (4 Cols) */}
          <div className="lg:col-span-4 bg-[#FAF8F5] rounded-3xl p-6 border border-[#D4C9BA] shadow-sm space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#121110]">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. CUTE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D4C9BA] text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#C97D67]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#1A1816] hover:bg-[#C97D67] text-white rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-[11px] text-rose-600">{couponError}</p>
              )}
              {appliedCoupon && (
                <div className="flex items-center justify-between p-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs border border-emerald-200">
                  <span className="font-bold">✓ Coupon '{appliedCoupon.code}' applied</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-rose-700 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-[#544E48] font-medium border-t border-[#D4C9BA]/60 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#121110]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>India Shipping Fee</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-[#121110] pt-3 border-t border-[#D4C9BA]">
                <span>Total Amount</span>
                <span className="text-[#C97D67]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#C97D67] hover:bg-[#1A1816] text-white rounded-2xl font-display font-bold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export const WishlistPage = () => {
  const { wishlist, moveToCart, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[85vh] pt-36 sm:pt-40 pb-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#DFD7CB] flex items-center justify-center text-[#C97D67] mx-auto shadow-sm">
            <Heart className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="font-editorial text-3xl text-[#121110] font-black">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-[#544E48] font-hand text-2xl font-bold">
            "Save the little things you love ♡"
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1816] hover:bg-[#C97D67] text-white rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
            >
              <span>Browse Little Things</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#D4C9BA] pb-4 flex items-baseline justify-between">
          <div>
            <span className="text-xs font-black tracking-[0.25em] text-[#C97D67] uppercase block mb-1">
              Saved For Later
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#121110] font-black">
              My Wishlist ({wishlist.length} items)
            </h1>
          </div>
          <Link to="/shop" className="text-xs font-display font-bold text-[#544E48] hover:text-[#C97D67]">
            ← Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
