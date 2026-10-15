import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_wishlist');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter(item => item && (item.id || item.name)) : [];
    } catch {
      return [];
    }
  });

  const { showToast, addToCart } = useCart();

  useEffect(() => {
    try {
      localStorage.setItem('giftpocket_wishlist', JSON.stringify(wishlist));
    } catch {
      // safe
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    if (!productId || !Array.isArray(wishlist)) return false;
    return wishlist.some(item => item && (item.id === productId || item.slug === productId));
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    const targetId = product.id || product.slug;
    setWishlist(prev => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const exists = safePrev.some(item => item && (item.id === targetId || item.slug === targetId));
      if (exists) {
        if (showToast) showToast("Removed from your wishlist.");
        return safePrev.filter(item => item && item.id !== targetId && item.slug !== targetId);
      } else {
        if (showToast) showToast("Saved for later ♡");
        return [...safePrev, product];
      }
    });
  };

  const moveToCart = (product) => {
    if (!product) return;
    if (addToCart) addToCart(product, 1);
    const targetId = product.id || product.slug;
    setWishlist(prev => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter(item => item && item.id !== targetId && item.slug !== targetId);
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: Array.isArray(wishlist) ? wishlist : [],
        wishlistCount: Array.isArray(wishlist) ? wishlist.length : 0,
        isInWishlist,
        toggleWishlist,
        moveToCart
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
