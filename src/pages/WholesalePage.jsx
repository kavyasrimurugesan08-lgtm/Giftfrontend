import React, { useState } from 'react';
import { Store, TrendingUp, PackageCheck, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Send } from 'lucide-react';
import { WHOLESALE_TIERS, PRODUCTS } from '../data/products';
import { useWholesale } from '../context/WholesaleContext';
import { useCart } from '../context/CartContext';

export const WholesalePage = () => {
  const { submitApplication, submitBulkEnquiry } = useWholesale();
  const { addToCart } = useCart();

  // Reseller Application Form State
  const [appForm, setAppForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    businessType: 'Retail Gift Shop',
    interestedProducts: 'Phone Charms & Keychains',
    expectedQuantity: '20 - 50 pieces',
    message: ''
  });

  // Bulk Quick Enquiry Form State
  const [bulkForm, setBulkForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    productName: 'Custom Name Pastel Phone Charm',
    quantity: 50,
    notes: ''
  });

  const [appSubmitted, setAppSubmitted] = useState(false);
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  const handleAppSubmit = (e) => {
    e.preventDefault();
    submitApplication(appForm);
    setAppSubmitted(true);
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    submitBulkEnquiry(bulkForm);
    setBulkSubmitted(true);
  };

  const wholesaleProducts = PRODUCTS.filter((p) => p.isWholesale);

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Wholesale Hero */}
        <div className="relative rounded-3xl bg-[#18110D] text-white p-8 sm:p-14 overflow-hidden border-2 border-[#AC5B44]/40 shadow-2xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AC5B44]/30 border border-[#AC5B44] text-[#E8D49A] text-xs font-black uppercase tracking-widest">
              <Store className="w-4 h-4" />
              <span>B2B Reseller & Wholesale Portal</span>
            </span>

            <h1 className="font-editorial text-4xl sm:text-6xl !text-white text-white leading-tight font-black">
              Love cute things? <br />
              <span className="text-[#E8D49A] italic font-normal">Make them your business.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#F4D2BE] font-medium leading-relaxed">
              Bring GIFTPocket to your retail store, college fest stall, or Instagram shop. Enjoy low MOQs from just 20 pieces, 50-60% retail profit margins, and prompt pan-India dispatch.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#apply"
                className="px-8 py-4 bg-[#AC5B44] hover:bg-[#E8D49A] hover:text-[#18110D] text-white rounded-full font-display font-bold text-xs transition-all shadow-xl"
              >
                APPLY FOR WHOLESALE ACCOUNT
              </a>
              <a
                href="#catalogue"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-display font-bold text-xs border border-white/30 transition-colors"
              >
                VIEW WHOLESALE MOQ & PRICES
              </a>
            </div>
          </div>
        </div>

        {/* 4 Wholesale Partner Tiers */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase">
              Growth Program
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#332822]">
              Wholesale Partner Tiers
            </h2>
            <p className="text-xs sm:text-sm text-[#6F5145]">
              As your monthly order volume grows, unlock higher discounts and custom packaging benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHOLESALE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className="bg-white/80 rounded-3xl p-6 border border-[#D9A99A]/50 shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8D49A] text-[#6F5145] uppercase">
                    {tier.badge} TIER
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-[#332822]">
                    {tier.name}
                  </h3>
                  <div className="font-display font-extrabold text-lg text-[#B96F58]">
                    {tier.discount}
                  </div>
                  <p className="text-xs text-[#6F5145]">
                    Min. Order: <strong>{tier.minMonthlyOrder}</strong>
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#D9A99A]/30 text-xs text-[#6F5145]">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wholesale Product Catalogue Table with Volume Breaks */}
        <div id="catalogue" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9A99A]/40 pb-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase block mb-1">
                Direct Catalogue
              </span>
              <h2 className="font-editorial text-3xl text-[#332822]">
                Wholesale Price Matrix & MOQs
              </h2>
            </div>
            <p className="text-xs text-[#6F5145]">
              Includes individual display packaging cards ready for store shelving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wholesaleProducts.map((p) => (
              <div
                key={p.id}
                className="p-5 bg-white/85 rounded-3xl border border-[#D9A99A]/50 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="flex gap-4">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-[#D9A99A]/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#B96F58] uppercase">
                      MOQ: {p.moq} Pcs
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#332822] line-clamp-2">
                      {p.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-base text-[#B96F58]">
                        ₹{p.wholesalePrice} <span className="text-xs font-normal text-[#6F5145]">/ pc</span>
                      </span>
                      <span className="text-xs text-[#6F5145]/60 line-through">
                        Retail: ₹{p.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tier Breaks */}
                {p.wholesaleTiers && (
                  <div className="p-2.5 rounded-xl bg-[#F8E8D5]/70 text-[11px] text-[#6F5145] space-y-1">
                    {p.wholesaleTiers.map((t, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{t.minQty}+ pieces</span>
                        <strong className="text-[#332822]">₹{t.price} each</strong>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => addToCart(p, p.moq, null, true)}
                  className="w-full py-2.5 bg-[#6F5145] hover:bg-[#B96F58] text-[#F8E8D5] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>Add MOQ Pack ({p.moq} Pcs)</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reseller Application & Bulk Order Forms */}
        <div id="apply" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-mt-28">
          
          {/* Form 1: Reseller Application (7 Cols) */}
          <div className="lg:col-span-7 bg-white/90 rounded-3xl p-8 border border-[#D9A99A]/50 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase block mb-1">
                Onboarding
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                Apply for Wholesale Account
              </h3>
              <p className="text-xs text-[#6F5145] mt-1">
                Fill this form to register your store. We will review and approve your wholesale discount account within 24 hours.
              </p>
            </div>

            {appSubmitted ? (
              <div className="p-6 bg-[#E8D49A]/40 border border-[#E8D49A] rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-editorial text-xl text-[#332822]">Application Received!</h4>
                <p className="text-xs text-[#6F5145]">
                  Our B2B account team will verify your details and activate your partner tier via WhatsApp/Email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAppSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                      placeholder="e.g. Ritika Sen"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/50 rounded-xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      Business / Shop Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appForm.businessName}
                      onChange={(e) => setAppForm({ ...appForm, businessName: e.target.value })}
                      placeholder="e.g. Twinkle Trinkets Store"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/50 rounded-xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={appForm.email}
                      onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                      placeholder="ritika@store.in"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/50 rounded-xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={appForm.phone}
                      onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                      placeholder="+91 98200 44556"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/50 rounded-xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      City & State *
                    </label>
                    <input
                      type="text"
                      required
                      value={appForm.city}
                      onChange={(e) => setAppForm({ ...appForm, city: e.target.value })}
                      placeholder="e.g. Pune, Maharashtra"
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/50 rounded-xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      Business Type
                    </label>
                    <select
                      value={appForm.businessType}
                      onChange={(e) => setAppForm({ ...appForm, businessType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/50 rounded-xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    >
                      <option>Retail Gift Boutique</option>
                      <option>Instagram / Online Shop</option>
                      <option>College Flea / Pop-up Stall</option>
                      <option>Event Planner / Return Gifts</option>
                      <option>Corporate / Institutional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#332822] uppercase tracking-wider block mb-1">
                    Message / Custom Request
                  </label>
                  <textarea
                    rows={3}
                    value={appForm.message}
                    onChange={(e) => setAppForm({ ...appForm, message: e.target.value })}
                    placeholder="Tell us what products you are interested in stocking..."
                    className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/50 rounded-xl text-xs border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-2xl font-display font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale Partner Application</span>
                </button>
              </form>
            )}
          </div>

          {/* Form 2: Quick Bulk Party Order / Custom Quote (5 Cols) */}
          <div className="lg:col-span-5 bg-[#F4D2BE]/50 rounded-3xl p-8 border border-[#D9A99A]/50 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase block mb-1">
                Custom Orders
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                Bulk Event & Party Favours
              </h3>
              <p className="text-xs text-[#6F5145] mt-1">
                Ordering 50+ pieces for birthdays, weddings, or corporate giveaways? Request a customized batch quote.
              </p>
            </div>

            {bulkSubmitted ? (
              <div className="p-6 bg-white/80 rounded-2xl text-center space-y-2 border border-[#D9A99A]/50">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-editorial text-lg text-[#332822]">Quotation Request Sent!</h4>
                <p className="text-xs text-[#6F5145]">
                  We will contact you via WhatsApp with personalized bulk sample designs and volume pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bulkForm.name}
                    onChange={(e) => setBulkForm({ ...bulkForm, name: e.target.value })}
                    placeholder="e.g. Radhika"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                    WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bulkForm.phone}
                    onChange={(e) => setBulkForm({ ...bulkForm, phone: e.target.value })}
                    placeholder="+91 94220 11990"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      Product
                    </label>
                    <select
                      value={bulkForm.productName}
                      onChange={(e) => setBulkForm({ ...bulkForm, productName: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    >
                      <option>Phone Charms</option>
                      <option>Keychains</option>
                      <option>Couple Bracelets</option>
                      <option>Radium Toys</option>
                      <option>Birthday Hampers</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                      Estimated Qty
                    </label>
                    <input
                      type="number"
                      min="20"
                      value={bulkForm.quantity}
                      onChange={(e) => setBulkForm({ ...bulkForm, quantity: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                    Customization Details
                  </label>
                  <textarea
                    rows={2}
                    value={bulkForm.notes}
                    onChange={(e) => setBulkForm({ ...bulkForm, notes: e.target.value })}
                    placeholder="e.g. Wedding return gifts with initial tags..."
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#6F5145] hover:bg-[#332822] text-[#F8E8D5] rounded-xl font-display font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Custom Bulk Quote</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
