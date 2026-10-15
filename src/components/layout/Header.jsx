import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  User, 
  ShoppingBag, 
  Sparkles, 
  Store, 
  ShieldCheck, 
  Package, 
  LogOut, 
  LogIn, 
  Gift, 
  Star 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchModal } from '../common/SearchModal';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll progress & scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'CATEGORIES', path: '/categories' },
    { name: 'CUSTOMIZED', path: '/customized', isSpecial: true },
    { name: 'WHOLESALE', path: '/wholesale', badge: 'B2B' },
    { name: 'NEW ARRIVALS', path: '/new-arrivals' },
    { name: 'ABOUT', path: '/about' }
  ];

  return (
    <>
      {/* Dynamic Header Container: Edge-to-edge at top -> Floating detached on scroll */}
      <div 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? 'px-3 sm:px-6 lg:px-8 pt-3 pointer-events-none'
            : 'w-full px-0 pt-0 pointer-events-auto'
        }`}
      >
        
        {/* Top Scroll Progress Indicator */}
        <div 
          className="h-[2px] bg-gradient-to-r from-[#B96F58] via-[#E8D49A] to-[#67949A] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Full-Width Announcement Bar (Visible at top, smoothly collapses on scroll) */}
        <div 
          className={`bg-[#18110D] text-[#FFFDF7] text-[11px] font-sans font-medium tracking-wide transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 sm:gap-4 ${
            isScrolled 
              ? 'h-0 py-0 opacity-0 border-0' 
              : 'h-8 py-1 px-4 opacity-100 border-b border-white/10'
          }`}
        >
          <span className="flex items-center gap-1.5 shrink-0">
            <Gift className="w-3.5 h-3.5 text-[#E8D49A]" />
            <span className="font-semibold text-white">Free Pan-India Delivery on orders over ₹499</span>
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:flex items-center gap-1.5 text-[#E8D49A] font-semibold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Handcrafted Aesthetic Boutique</span>
          </span>
          <span className="hidden md:inline text-white/40">•</span>
          <Link to="/wholesale" className="hidden md:flex items-center gap-1 text-[#E8D49A] hover:text-white font-bold transition-colors shrink-0">
            <Store className="w-3 h-3 text-[#E8D49A]" />
            <span>Wholesale Desk →</span>
          </Link>
        </div>

        {/* Morphing Navbar: Full-width rectangle -> Floating curved capsule on scroll */}
        <header
          className={`pointer-events-auto transition-all duration-500 ease-out relative ${
            isScrolled
              ? 'max-w-7xl mx-auto rounded-full floating-capsule-nav glass-nav-scrolled py-2 px-4 sm:px-7 border border-white/50'
              : 'w-full rounded-none glass-nav-transparent py-3 px-4 sm:px-8 border-b border-white/30'
          }`}
        >
          {/* Top Specular Glass Reflection Edge */}
          <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20 rounded-full" />
          
          {/* Bottom Sheen Ambient Line */}
          <div className="absolute inset-x-10 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-6 relative z-10">
            
            {/* LEFT: Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#AC5B44] via-[#8F3E28] to-[#47342C] flex items-center justify-center text-white shadow-md shadow-[#AC5B44]/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 border border-white/30">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white" />
                </div>
                {/* Floating Micro Ping Glow */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E8D49A] animate-ping" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E8D49A] border-2 border-white" />
              </div>

              <div className="flex flex-col justify-center text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-editorial text-xl sm:text-2xl font-black tracking-tight text-[#18110D] group-hover:text-[#AC5B44] transition-colors leading-none">
                    GIFTPocket
                  </span>
                  <span className="text-[8.5px] font-sans font-black uppercase px-2 py-0.5 rounded-full bg-[#C97D67]/15 text-[#C97D67] border border-[#C97D67]/30 tracking-wider hidden sm:inline-block shadow-2xs backdrop-blur-xs">
                    Studio
                  </span>
                </div>
                <span className="text-[9.5px] font-hand text-[#47342C] font-bold tracking-wider leading-tight mt-0.5 group-hover:translate-x-0.5 transition-transform whitespace-nowrap hidden xs:inline-block">
                  Little Things. Big Smiles. ♡
                </span>
              </div>
            </Link>

            {/* CENTER: Horizontal Navigation Links (Web Desktop Style) */}
            <nav className="flex items-center gap-1 xl:gap-2 overflow-x-auto scrollbar-none py-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold tracking-wider transition-all duration-200 relative flex items-center gap-1.5 whitespace-nowrap group/nav ${
                      isActive
                        ? 'bg-gradient-to-r from-[#AC5B44] to-[#8F3E28] text-white shadow-md shadow-[#AC5B44]/30 scale-105 border border-white/30'
                        : 'text-[#18110D] hover:text-[#AC5B44] hover:bg-black/5 hover:shadow-2xs backdrop-blur-xs'
                    }`}
                  >
                    <span>{link.name}</span>

                    {/* Special Customized Star */}
                    {link.isSpecial && (
                      <Star className={`w-3 h-3 ${isActive ? 'text-[#E8D49A] fill-current' : 'text-[#AC5B44] group-hover/nav:rotate-45 transition-transform'}`} />
                    )}

                    {/* Badge */}
                    {link.badge && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-black ${
                        isActive 
                          ? 'bg-white/30 text-white' 
                          : 'bg-[#E8D49A] text-[#221609] border border-[#D8BC78]'
                      }`}>
                        {link.badge}
                      </span>
                    )}

                    {/* Active Indicator Dot */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8D49A] shadow-xs" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Transparent Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Search Glass Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2 h-9 px-3.5 rounded-full bg-white/20 hover:bg-white/35 text-xs text-[#18110D] border border-white/50 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-xs group relative overflow-hidden backdrop-blur-md cursor-pointer font-bold"
                aria-label="Search"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <Search className="w-3.5 h-3.5 text-[#AC5B44] group-hover:scale-110 transition-transform" />
                <span className="font-sans font-bold text-[11px] xl:text-xs">Search...</span>
                <kbd className="text-[9px] bg-black/5 px-1.5 py-0.5 rounded-md border border-white/50 text-[#18110D] font-mono font-bold shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#18110D] hover:text-[#AC5B44] bg-white/20 hover:bg-white/35 border border-white/50 rounded-full transition-all backdrop-blur-md cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
                aria-label="Search items"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Link with Bounce Badge */}
              <Link
                to="/wishlist"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#18110D] hover:text-[#AC5B44] bg-white/20 hover:bg-white/35 border border-white/50 rounded-full transition-all relative group backdrop-blur-md cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
                aria-label="View Wishlist"
              >
                <Heart className="w-4 h-4 group-hover:scale-110 group-hover:fill-current text-[#AC5B44] transition-all" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#AC5B44] text-white text-[8.5px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Direct Link & Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsAccountMenuOpen(true)}
                onMouseLeave={() => setIsAccountMenuOpen(false)}
              >
                <Link
                  to="/account"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#18110D] hover:text-[#AC5B44] bg-white/20 hover:bg-white/35 border border-white/50 rounded-full transition-all group backdrop-blur-md cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
                  aria-label="Account Profile"
                  title="My Profile & Orders"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>

                {/* Dropdown Menu with Transparent Frosted Glass Texture */}
                {isAccountMenuOpen && (
                  <div
                    className="absolute right-0 mt-3 w-64 transparent-texture-drawer rounded-3xl shadow-[0_20px_50px_rgba(29,21,17,0.18)] border border-white/80 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl"
                    onMouseLeave={() => setIsAccountMenuOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-white/50 bg-white/40">
                      <p className="text-xs font-black text-[#18110D] truncate">
                        {user?.name || "Guest Visitor"}
                      </p>
                      <p className="text-[11px] text-[#47342C] capitalize font-semibold">
                        {user?.role ? user.role.toLowerCase() : "Welcome to GIFTPocket"}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/account"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#18110D] hover:bg-white/60 transition-colors font-bold"
                      >
                        <User className="w-3.5 h-3.5 text-[#AC5B44]" />
                        <span>My Profile & Orders</span>
                      </Link>
                      
                      <Link
                        to="/track-order"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#18110D] hover:bg-white/60 transition-colors font-bold"
                      >
                        <Package className="w-3.5 h-3.5 text-[#AC5B44]" />
                        <span>Track Shipment</span>
                      </Link>

                      <Link
                        to="/wholesale"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#18110D] font-bold hover:bg-white/60 transition-colors"
                      >
                        <Store className="w-3.5 h-3.5 text-[#AC5B44]" />
                        <span>Wholesale B2B Hub</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#AC5B44] font-black hover:bg-white/60 transition-colors border-t border-white/40"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Admin Control Centre</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-white/40 pt-1 mt-1 px-2">
                      {isAuthenticated ? (
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountMenuOpen(false);
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-700 hover:bg-rose-50/80 rounded-xl transition-colors font-bold text-left cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      ) : (
                        <Link
                          to="/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-[#AC5B44] font-black hover:bg-white/60 rounded-xl transition-colors"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Sign In / Register</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Bag Trigger Button with Frosted Terracotta Glass */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-3 sm:px-4 bg-gradient-to-r from-[#AC5B44] to-[#8F3E28] hover:from-[#18110D] hover:to-[#18110D] text-white rounded-full transition-all shadow-[0_4px_16px_rgba(172,91,68,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-white/30 group hover:scale-105 active:scale-95 shrink-0 cursor-pointer backdrop-blur-md"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-display font-bold">
                  Bag {totalItemCount > 0 && `(${totalItemCount})`}
                </span>
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E8D49A] rounded-full animate-ping" />
                )}
              </button>

            </div>
          </div>
        </header>
      </div>

      {/* Quick Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
