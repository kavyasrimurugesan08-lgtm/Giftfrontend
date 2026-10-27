import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { WavyDivider } from '../common/BlobShape';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="relative bg-[#1A1816] text-[#FAF8F5] pt-12 pb-8 overflow-hidden">
      
      {/* Top Organic Wavy Curve */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-[98%]">
        <WavyDivider color="#1A1816" height={45} />
      </div>

      {/* Trust Badges Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C97D67] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display text-xs font-bold !text-white text-white">Handmade & Custom</h5>
              <p className="text-[11px] !text-[#DFD7CB] text-[#DFD7CB] font-medium">Crafted with love & care</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C97D67] text-white flex items-center justify-center shrink-0 shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display text-xs font-bold !text-white text-white">Pan-India Shipping</h5>
              <p className="text-[11px] !text-[#DFD7CB] text-[#DFD7CB] font-medium">Free delivery above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C97D67] text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display text-xs font-bold !text-white text-white">B2B & Wholesale</h5>
              <p className="text-[11px] !text-[#DFD7CB] text-[#DFD7CB] font-medium">Low MOQ reseller tiers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C97D67] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display text-xs font-bold !text-white text-white">Secure INR Payments</h5>
              <p className="text-[11px] !text-[#DFD7CB] text-[#DFD7CB] font-medium">UPI, Cards, NetBanking, COD</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/20">
          
          {/* Col 1 & 2: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#C97D67] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight !text-white text-white">
                GIFTPocket
              </span>
            </Link>
            <p className="text-xs !text-[#DFD7CB] text-[#DFD7CB] leading-relaxed max-w-sm font-normal">
              "Little things. Big smiles." An organic boutique of customized phone charms, invisible jewellery, cute mini keychains, and joyful keepsakes.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-semibold !text-white text-white mb-2">
                Get first access to new arrivals & cute finds:
              </p>
              {isSubscribed ? (
                <div className="p-3 bg-[#C97D67]/40 border border-[#C97D67] rounded-2xl text-xs text-[#D69E4A] flex items-center gap-2 font-medium">
                  <Heart className="w-4 h-4 fill-current text-[#DFD7CB]" />
                  Welcome to the GiftPocket family! Check your inbox soon ♡
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-xs text-white placeholder-[#DFD7CB]/70 focus:outline-none focus:border-[#D69E4A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#C97D67] hover:bg-[#D69E4A] hover:text-[#1A1816] text-white rounded-2xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#C97D67] flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#C97D67] flex items-center justify-center text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#C97D67] flex items-center justify-center text-white transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 3: SHOP */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-black tracking-widest !text-[#D69E4A] text-[#D69E4A] uppercase">
              Shop
            </h4>
            <ul className="space-y-2 text-xs !text-[#DFD7CB] text-[#DFD7CB]">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/customized" className="hover:text-white transition-colors">Customized Studio</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Special Offers</Link></li>
              <li><Link to="/gift-sets" className="hover:text-white transition-colors">Gift Hampers</Link></li>
            </ul>
          </div>

          {/* Col 4: CATEGORIES */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-black tracking-widest !text-[#D69E4A] text-[#D69E4A] uppercase">
              Categories
            </h4>
            <ul className="space-y-2 text-xs !text-[#DFD7CB] text-[#DFD7CB]">
              <li><Link to="/shop?category=phone-charms" className="hover:text-white transition-colors">Phone Charms</Link></li>
              <li><Link to="/shop?category=bracelets" className="hover:text-white transition-colors">Bracelets</Link></li>
              <li><Link to="/shop?category=keychains" className="hover:text-white transition-colors">Miniature Keychains</Link></li>
              <li><Link to="/shop?category=hair-accessories" className="hover:text-white transition-colors">Hair Accessories</Link></li>
              <li><Link to="/shop?category=miniature-toys" className="hover:text-white transition-colors">Miniature & Radium Toys</Link></li>
              <li><Link to="/shop?category=diy-kits" className="hover:text-white transition-colors">DIY Craft Kits</Link></li>
              <li><Link to="/shop?category=fridge-magnets" className="hover:text-white transition-colors">Fridge Magnets</Link></li>
            </ul>
          </div>

          {/* Col 5: HELP & TRACKING */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-black tracking-widest !text-[#D69E4A] text-[#D69E4A] uppercase">
              Help & Support
            </h4>
            <ul className="space-y-2 text-xs !text-[#DFD7CB] text-[#DFD7CB]">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Col 6: BUSINESS & COMPANY */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-black tracking-widest !text-[#D69E4A] text-[#D69E4A] uppercase">
              B2B Business
            </h4>
            <ul className="space-y-2 text-xs !text-[#DFD7CB] text-[#DFD7CB]">
              <li><Link to="/wholesale" className="hover:text-white transition-colors">Wholesale Portal</Link></li>
              <li><Link to="/wholesale#apply" className="hover:text-white transition-colors">Reseller Registration</Link></li>
              <li><Link to="/wholesale#samples" className="hover:text-white transition-colors">Order Sample Kit</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Studio Story</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs !text-[#DFD7CB] text-[#DFD7CB]">
          <p>© {new Date().getFullYear()} GIFTPocket Studio India. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <span className="text-[#D69E4A] font-bold">Made with ♥ in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
