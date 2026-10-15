import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Store, 
  Gift, 
  Star,
  ArrowRight,
  Phone,
  Mail,
  Palette,
  Compass,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCollections } from '../../context/CollectionsContext';

export const MobileMenu = ({ isOpen, onClose, navLinks }) => {
  const location = useLocation();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { categories } = useCollections();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Frosted Backdrop with Dark Tint */}
      <div
        className="fixed inset-0 bg-[#332822]/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        {/* Transparent Textured Slide Drawer */}
        <div className="w-screen max-w-md sm:max-w-lg transparent-texture-drawer text-[#332822] flex flex-col justify-between overflow-y-auto grain-bg border-r border-white/40 shadow-[0_25px_60px_-15px_rgba(51,40,34,0.3)] animate-in slide-in-from-left duration-300">
          
          {/* Header Bar inside Drawer */}
          <div className="p-6 border-b border-white/40 flex items-center justify-between bg-white/30 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#B96F58] to-[#9E5742] flex items-center justify-center text-white shadow-md shadow-[#B96F58]/20">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-editorial text-xl font-bold tracking-tight text-[#332822] block leading-none">
                  GIFTPocket
                </span>
                <span className="text-[10px] font-hand text-[#6F5145] tracking-wider leading-tight mt-0.5 block">
                  Studio Directory & Navigation
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/70 hover:bg-[#332822] text-[#332822] hover:text-white flex items-center justify-center shadow-xs transition-all hover:rotate-90"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Status Ribbon */}
          <div className="px-6 py-3.5 bg-white/40 border-b border-white/30 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-[#332822]">
                {isAuthenticated ? `Hello, ${user?.name}` : "Welcome to GIFTPocket"}
              </p>
              <p className="text-[11px] text-[#6F5145] font-medium">
                {isAuthenticated ? (user?.email || 'Logged In Account') : 'Handcrafted Boutique Experience'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8D49A]/80 text-[#6F5145] font-extrabold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B96F58] animate-ping" />
              <span>Free Delivery Above ₹499</span>
            </div>
          </div>

          {/* Primary Nav Links (Editorial Numbered List) */}
          <div className="p-6 space-y-6 flex-1">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold tracking-widest text-[#B96F58] uppercase block mb-3">
                Main Directory
              </span>

              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={onClose}
                    className={`flex items-center justify-between p-3.5 rounded-2xl font-display transition-all duration-200 group ${
                      isActive
                        ? 'bg-[#B96F58] text-white shadow-md font-bold scale-[1.02]'
                        : 'text-[#332822] hover:bg-white/60 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-white/70' : 'text-[#B96F58]'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base tracking-wide">{link.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {link.isSpecial && (
                        <Star className={`w-3.5 h-3.5 ${isActive ? 'text-[#E8D49A] fill-current' : 'text-[#B96F58]'}`} />
                      )}
                      {link.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                          isActive ? 'bg-white/30 text-white' : 'bg-[#E8D49A] text-[#6F5145]'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-[#6F5145]'}`} />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Categories Visual Pills */}
            <div className="pt-4 border-t border-white/40 space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-[#6F5145] uppercase block">
                Popular Categories & Chapters
              </span>

              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="p-2.5 rounded-xl bg-white/60 hover:bg-[#B96F58] hover:text-white text-xs font-medium text-[#332822] border border-white/60 transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[9px] opacity-70 group-hover:opacity-100 shrink-0 ml-1">
                      {cat.itemCount || 15}+
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Admin Control Centre Link (if admin) */}
            {isAdmin && (
              <div className="pt-2">
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#332822] text-[#F8E8D5] text-xs font-bold hover:bg-[#B96F58] transition-colors shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#E8D49A]" />
                    <span>Admin Control Centre</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Footer Contact & Social Desk */}
          <div className="p-6 border-t border-white/40 bg-white/30 backdrop-blur-md text-xs text-[#6F5145] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-semibold text-[#332822]">
                <Phone className="w-3.5 h-3.5 text-[#B96F58]" />
                <span>+91 98420 13465</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Live WhatsApp</span>
              </span>
            </div>
            <p className="text-[10px] text-[#6F5145]/80">
              Wholesale inquiries: wholesale@giftpocket.in
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
