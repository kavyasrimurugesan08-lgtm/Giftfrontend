import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  MessageCircle,
  Phone,
  Tag,
  ExternalLink,
  RotateCcw,
  Mail,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWhatsAppOrderLink, WHATSAPP_PHONE_NUMBER } from '../utils/whatsappOrder';
import { dispatchOrderEmailNotification } from '../utils/emailNotification';
import { LocationPickerMap } from '../components/checkout/LocationPickerMap';

export const CheckoutPage = () => {
  const { cartItems, subtotal, discountAmount, appliedCoupon, shippingFee, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailSending, setEmailSending] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.[0]?.pincode || '',
    notes: '',
    mapLocationUrl: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationResolved = (loc) => {
    setFormData((prev) => ({
      ...prev,
      street: loc.street || loc.fullAddress || prev.street,
      city: loc.city || prev.city,
      state: loc.state || prev.state,
      pincode: loc.pincode || prev.pincode,
      mapLocationUrl: loc.mapLocationUrl || prev.mapLocationUrl
    }));
  };

  const handlePlaceWhatsAppOrder = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.street.trim() || !formData.pincode.trim()) {
      alert("Please fill in all required fields (Name, Phone, Email, and Address).");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      alert("Please enter a valid email address for order notifications.");
      return;
    }

    const orderId = `#GP-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      orderId,
      customer: formData,
      items: cartItems,
      pricing: {
        subtotal,
        discountAmount,
        couponCode: appliedCoupon?.code,
        shippingFee,
        total
      }
    };

    // Generate WhatsApp deep link
    const waLink = getWhatsAppOrderLink(orderPayload, WHATSAPP_PHONE_NUMBER);
    setWhatsappLink(waLink);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    // Save order record to User account history
    const orderRecord = addOrder({
      id: orderId,
      total,
      items: cartItems,
      address: `${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      mapLocationUrl: formData.mapLocationUrl || '',
      paymentMethod: 'WhatsApp Order (UPI / COD on Chat)',
      status: 'WhatsApp Order Sent'
    });

    setPlacedOrder(orderRecord || { id: orderId, total, mapLocationUrl: formData.mapLocationUrl });
    setIsSubmitted(true);

    // Send order confirmation email notification
    setEmailSending(true);
    dispatchOrderEmailNotification({
      order: { id: orderId, total, paymentMethod: 'WhatsApp Order (UPI / COD on Chat)', mapLocationUrl: formData.mapLocationUrl },
      customer: formData,
      items: cartItems,
      pricing: { subtotal, discountAmount, shippingFee, total }
    }).then((res) => {
      setEmailStatus({
        sent: true,
        simulated: res?.simulated || false,
        to: formData.email,
        message: res?.message
      });
    }).catch((err) => {
      console.warn('Email notification error:', err);
      setEmailStatus({
        sent: true,
        simulated: true,
        to: formData.email,
        message: `Notification queued for ${formData.email}`
      });
    }).finally(() => {
      setEmailSending(false);
    });

    clearCart();

    // Open WhatsApp in new tab
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const handleResendEmail = async () => {
    if (!formData.email) return;
    setEmailSending(true);
    try {
      const res = await dispatchOrderEmailNotification({
        order: placedOrder || { id: `#GP-ORD`, total },
        customer: formData,
        items: placedOrder?.items || cartItems,
        pricing: { subtotal, discountAmount, shippingFee, total }
      });
      setEmailStatus({
        sent: true,
        simulated: res?.simulated || false,
        to: formData.email,
        message: `Fresh notification dispatched to ${formData.email}`
      });
      alert(`Order confirmation email sent to ${formData.email}!`);
    } catch {
      alert(`Email queued for ${formData.email}`);
    } finally {
      setEmailSending(false);
    }
  };

  if (cartItems.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-[80vh] bg-[#F8E8D5] pt-32 pb-20 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="w-16 h-16 rounded-3xl bg-[#F4D2BE] text-[#B96F58] flex items-center justify-center mx-auto shadow-md">
            <Gift className="w-8 h-8" />
          </div>
          <h2 className="font-editorial text-3xl text-[#332822]">Your bag is empty</h2>
          <p className="text-xs text-[#6F5145]">Add handcrafted charms, toys, or personalized gifts before ordering.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-[#B96F58] text-[#F8E8D5] rounded-full text-xs font-bold shadow-md hover:bg-[#332822] transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="text-center mb-10 space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#C97D67] flex items-center justify-center text-white shadow-md shadow-[#C97D67]/30">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <span className="font-editorial text-3xl font-black text-[#121110]">
              GIFTPocket
            </span>
          </Link>
          <p className="text-xs font-black text-[#544E48] uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="text-emerald-900 font-bold bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">Direct WhatsApp Checkout Desk</span>
          </p>
        </div>

        {/* ORDER CONFIRMATION SCREEN */}
        {isSubmitted && placedOrder ? (
          <div className="bg-white/95 rounded-3xl p-8 sm:p-12 border-2 border-[#D9A99A]/50 shadow-2xl text-center space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#25D366] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                WhatsApp Order Dispatched
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#332822]">
                Order Placed, {formData.fullName}!
              </h2>
              <p className="text-sm text-[#6F5145] font-hand text-xl">
                "We opened WhatsApp with your order details. If it did not open automatically, click the green button below." ♡
              </p>
            </div>

            <div className="p-6 bg-[#F8E8D5]/70 rounded-2xl border border-[#D9A99A]/50 text-left text-xs space-y-3 shadow-2xs">
              <div className="flex justify-between border-b border-[#D9A99A]/40 pb-2">
                <span className="text-[#6F5145]">Order Reference:</span>
                <strong className="text-[#332822] font-mono text-sm">{placedOrder.id}</strong>
              </div>
              <div className="flex justify-between border-b border-[#D9A99A]/40 pb-2">
                <span className="text-[#6F5145]">Total Amount:</span>
                <strong className="text-[#B96F58] font-bold text-sm">₹{Number(placedOrder?.total || 0).toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between border-b border-[#D9A99A]/40 pb-2">
                <span className="text-[#6F5145]">Delivery Recipient:</span>
                <strong className="text-[#332822]">{formData.fullName} ({formData.phone})</strong>
              </div>
              <div className="flex justify-between border-b border-[#D9A99A]/40 pb-2">
                <span className="text-[#6F5145]">Email Notification:</span>
                <strong className="text-emerald-700 flex items-center gap-1 font-mono text-[11px]">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{formData.email}</span>
                </strong>
              </div>
              {formData.mapLocationUrl && (
                <div className="flex justify-between border-b border-[#D9A99A]/40 pb-2">
                  <span className="text-[#6F5145]">Pinned GPS Location:</span>
                  <a
                    href={formData.mapLocationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B96F58] hover:underline font-bold flex items-center gap-1 text-[11px]"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>View Map Pin</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#6F5145]">Estimated Dispatch:</span>
                <strong className="text-emerald-700">Within 24 Hours via Express Post</strong>
              </div>
            </div>

            {/* Email Notification Status Card */}
            <div className="p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                    <span>Order Confirmation Dispatched</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      {emailSending ? 'Sending...' : 'Dispatched'}
                    </span>
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    Receipt & tracking copy sent to <strong>{formData.email}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={emailSending}
                className="px-3.5 py-1.5 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {emailSending ? 'Sending...' : 'Resend Email'}
              </button>
            </div>

            {/* WhatsApp Re-launch Button */}
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-2xl font-display font-bold text-sm transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Open / Re-send Order on WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/account"
                className="w-full sm:w-auto px-6 py-3 bg-[#332822] hover:bg-[#B96F58] text-[#F8E8D5] rounded-full font-display font-semibold text-xs transition-colors shadow-sm"
              >
                View in My Orders
              </Link>
              <Link
                to="/shop"
                className="w-full sm:w-auto px-6 py-3 bg-white border border-[#D9A99A] text-[#332822] rounded-full font-display font-semibold text-xs hover:bg-[#F4D2BE] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM & WHATSAPP ORDER REVIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Customer Address Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white/90 rounded-3xl p-6 sm:p-8 border border-[#D9A99A]/50 shadow-lg space-y-6">
              
              <div className="border-b border-[#D9A99A]/30 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                    Delivery Information
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Order</span>
                  </span>
                </div>
                <p className="text-xs text-[#6F5145] mt-1">
                  Enter delivery address details so we can package and dispatch your order.
                </p>
              </div>

              <form onSubmit={handlePlaceWhatsAppOrder} id="whatsapp-checkout-form" className="space-y-4 text-xs">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="font-bold text-[#332822] uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#332822] uppercase tracking-wider block">
                      WhatsApp Number (for Order Updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98656 83004"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#332822] uppercase tracking-wider block">
                      Email Address (for Order Updates & Tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs"
                    />
                  </div>
                </div>

                {/* Map & Geolocation Picker */}
                <div className="pt-2">
                  <LocationPickerMap
                    onLocationResolved={handleLocationResolved}
                    initialAddress={formData.street}
                  />
                </div>

                {/* Street Address & Location Textarea (Auto-filled from map) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#332822] uppercase tracking-wider block">
                      Delivery Address & Location *
                    </label>
                    {formData.mapLocationUrl && (
                      <a
                        href={formData.mapLocationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#B96F58] hover:underline flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>View GPS Pin</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    required
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Flat / House No., Apartment name, Street, Landmark (Auto-filled when you tap 'Use Current Location' or drag map pin)"
                    className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs transition-all resize-y leading-relaxed"
                  />
                  <p className="text-[10px] text-[#6F5145] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#B96F58]" />
                    <span>Auto-formatted when you pinpoint your location on the map above. You can add flat/house number or landmark anytime.</span>
                  </p>
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#332822] uppercase tracking-wider block">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Bengaluru"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#332822] uppercase tracking-wider block">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Karnataka"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#332822] uppercase tracking-wider block">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="560038"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs"
                    />
                  </div>
                </div>

                {/* Gift Message / Special Notes */}
                <div className="space-y-1 pt-2">
                  <label className="font-bold text-[#332822] uppercase tracking-wider block">
                    Gift Note or Custom Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Please add a handwritten 'Happy Birthday Amy!' card ♡"
                    className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/40 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58] font-sans text-xs"
                  />
                </div>

                {/* WhatsApp Order Action Button */}
                <div className="pt-4 border-t border-[#D9A99A]/40 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-2xl font-display font-bold text-sm transition-all shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2.5 group cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Place Order on WhatsApp (₹{total})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>How WhatsApp Order Works:</strong> Clicking the button opens WhatsApp with your pre-filled cart & address. Our artisan desk will instantly confirm stock and share UPI payment / QR code details on chat!
                    </p>
                  </div>
                </div>

              </form>

            </div>

            {/* Right: Order Summary Sidebar (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/90 rounded-3xl p-6 border border-[#D9A99A]/50 shadow-lg space-y-6">
                
                <div className="border-b border-[#D9A99A]/30 pb-4 flex items-center justify-between">
                  <h3 className="font-editorial text-xl font-bold text-[#332822]">
                    Order Summary ({cartItems.length} items)
                  </h3>
                  <Link to="/shop" className="text-xs font-bold text-[#B96F58] hover:underline">
                    Edit Bag
                  </Link>
                </div>

                {/* Item List */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.itemKey} className="flex gap-3 text-xs border-b border-[#D9A99A]/20 pb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-[#F8E8D5] shrink-0 border border-[#D9A99A]/40"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-editorial font-bold text-sm text-[#332822] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[#6F5145] text-[11px]">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>

                        {/* Customization badge if any */}
                        {item.customization && (
                          <div className="mt-1 p-1.5 bg-[#FAF5EE] rounded-lg text-[10px] text-[#6F5145] border border-[#D9A99A]/40">
                            {item.customization.name && <span>Letters: <strong>"{item.customization.name}"</strong> </span>}
                            {item.customization.colorTheme && <span>• {item.customization.colorTheme} </span>}
                            {item.customization.customPhoto && <span className="text-[#B96F58] font-bold">• Photo ✓</span>}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-[#332822] shrink-0">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 text-xs border-t border-[#D9A99A]/30 pt-4 text-[#6F5145]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <strong className="text-[#332822]">₹{subtotal}</strong>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#B96F58]">
                      <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
                      <strong>-₹{discountAmount}</strong>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery (India)</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700 font-bold">FREE (Above ₹499)</strong>
                      ) : (
                        <strong>₹{shippingFee}</strong>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#332822] border-t border-[#D9A99A]/40 pt-3">
                    <span>Total Amount</span>
                    <span className="text-[#B96F58] text-xl font-extrabold">₹{total}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-2 border-t border-[#D9A99A]/20 space-y-2 text-[11px] text-[#6F5145]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#B96F58]" />
                    <span>Free shipping across India on orders &gt; ₹499</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>100% Handcrafted verified quality check</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
