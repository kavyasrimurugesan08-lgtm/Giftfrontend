import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Gift, Check, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    totalItemCount,
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

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#332822]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8E8D5] text-[#332822] shadow-2xl flex flex-col border-l-2 border-[#D9A99A]/40">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#D9A99A]/30 bg-[#F4D2BE]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#B96F58] text-[#F8E8D5] flex items-center justify-center font-bold text-sm">
                {totalItemCount}
              </div>
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#332822]">
                  Your Gift Basket
                </h3>
                <p className="text-xs font-hand text-[#B96F58] text-base">
                  Your little collection is growing ♡
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-[#D9A99A]/30 text-[#6F5145] hover:text-[#332822] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3 bg-[#E8D49A]/30 border-b border-[#D9A99A]/30">
            <div className="flex items-center justify-between text-xs font-medium text-[#6F5145] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#B96F58]" />
                {isFreeShipping
                  ? "Yay! You unlocked FREE India Delivery! 🎉"
                  : `Add ₹${remainingForFreeShip} more for Free Shipping`}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-[#F8E8D5] rounded-full overflow-hidden border border-[#D9A99A]/50">
              <div
                className="h-full bg-[#B96F58] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-[#F4D2BE] flex items-center justify-center text-[#B96F58] mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h4 className="font-editorial text-2xl text-[#332822] mb-2">
                  Basket is Empty
                </h4>
                <p className="text-sm text-[#6F5145] font-hand text-lg mb-6">
                  "Your gift basket is waiting for something special."
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-full font-medium text-sm transition-colors shadow-md"
                >
                  Explore Little Treasures
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.itemKey}
                  className="p-4 bg-white/75 rounded-2xl border border-[#D9A99A]/40 shadow-xs flex gap-3 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#D9A99A]/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-display font-medium text-sm text-[#332822] line-clamp-2 pr-6">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="text-[#6F5145]/60 hover:text-[#B96F58] transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Customization Details if any */}
                    {item.customization && (
                      <div className="mt-1 p-1.5 bg-[#F8E8D5]/80 rounded-lg text-[11px] text-[#6F5145] space-y-1 border border-[#D9A99A]/30">
                        {item.customization.name && (
                          <div>
                            <span className="font-semibold">Name:</span> {item.customization.name}
                          </div>
                        )}
                        {item.customization.colorTheme && (
                          <div>
                            <span className="font-semibold">Color:</span> {item.customization.colorTheme}
                          </div>
                        )}
                        {item.customization.customPhoto && (
                          <div className="flex items-center gap-2 pt-0.5">
                            <img
                              src={item.customization.customPhoto}
                              alt="Custom Photo"
                              className="w-7 h-7 rounded-lg object-cover border border-[#B96F58] shadow-xs"
                            />
                            <span className="text-[10px] font-bold text-[#B96F58]">Custom Photo Attached ✓</span>
                          </div>
                        )}
                        {item.customization.charmAccent && (
                          <div>
                            <span className="font-semibold">Charm:</span> {item.customization.charmAccent}
                          </div>
                        )}
                        {item.customization.notes && (
                          <div>
                            <span className="font-semibold">Note:</span> {item.customization.notes}
                          </div>
                        )}
                      </div>
                    )}

                    {item.isWholesale && (
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#E8D49A] text-[#221609] text-[10px] font-black rounded-full border border-[#D8BC78]">
                        WHOLESALE (MOQ: {item.moq})
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#AC5B44]">
                          ₹{item.price * item.quantity}
                        </span>
                        <span className="text-xs text-[#70584D] font-medium">
                          (₹{item.price} each)
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D9A99A] rounded-full bg-white px-2 py-0.5 shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          className="p-1 text-[#18110D] hover:text-[#AC5B44] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#18110D] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          className="p-1 text-[#18110D] hover:text-[#AC5B44] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#D9A99A]/50 bg-[#F4D2BE]/40 space-y-4">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#E8D49A]/60 border border-[#D5BE7E] rounded-xl text-xs text-[#221609]">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#AC5B44]" />
                    <span>
                      Coupon <strong className="text-[#18110D] font-bold">{appliedCoupon.code}</strong> applied (-₹{discountAmount})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#AC5B44] hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-[#D9A99A] rounded-xl uppercase font-sans placeholder:normal-case placeholder-[#70584D] focus:outline-none focus:border-[#AC5B44] text-[#18110D]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#18110D] text-white rounded-xl text-xs font-bold hover:bg-[#AC5B44] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-700 font-bold">{couponError}</p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#6F5145]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#332822]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#B96F58]">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Delivery (India)</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#332822] pt-2 border-t border-[#D9A99A]/40">
                  <span>Total (Incl. Taxes)</span>
                  <span className="text-[#B96F58]">₹{total}</span>
                </div>
              </div>

              {/* WhatsApp Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-2xl font-display font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order via WhatsApp (₹{total})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-[11px] text-[#6F5145]/80 font-hand text-sm">
                Instant order confirmation & UPI / COD support on WhatsApp ♡
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
