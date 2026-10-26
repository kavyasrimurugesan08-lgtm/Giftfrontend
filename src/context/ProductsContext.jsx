import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

const STORAGE_KEY = 'giftpocket_admin_products_v2';
const BACKEND_API_URL = 'http://localhost:5000/api/products';

// Check if an image URL is an approved user-uploaded/provided image
export const isApprovedProductImage = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('unsplash.com')) return false;
  return url.startsWith('/uploads/') ||
         url.startsWith('http://localhost:5000/uploads/') ||
         url.startsWith('https://localhost:5000/uploads/') ||
         url.startsWith('data:image/') ||
         url.includes('earrings-silver-jhumka') ||
         url.includes('phone-charm-pastel-tulip') ||
         url.includes('flower-bell-charms') ||
         url.includes('pastel-flower-claw-clip-set') ||
         url.includes('miniature-panda-bamboo-set') ||
         url.includes('enamel-mini-phone-charms') ||
         url.includes('ethnic-kundan-hair-ties') ||
         url.includes('lavender-crystal-flower-bracelet') ||
         url.includes('gold-charm-link-bracelet') ||
         url.includes('miniature-glass-flower-vases') ||
         url.includes('miniature-couple-character-figurines');
};

// Sanitize product items to ensure single primary image and clean properties
const sanitizeProducts = (list) => {
  if (!Array.isArray(list)) return INITIAL_PRODUCTS;
  return list.map((item) => {
    let primaryImg = (Array.isArray(item.images) && item.images[0]) || item.image || '';
    if (!isApprovedProductImage(primaryImg)) {
      primaryImg = '';
    }
    return {
      ...item,
      image: primaryImg,
      images: primaryImg ? [primaryImg] : []
    };
  });
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map(p => p.id));
          const missing = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
          const combined = missing.length > 0 ? [...parsed, ...missing] : parsed;
          return sanitizeProducts(combined);
        }
      }
    } catch (e) {
      console.warn('Error reading cached products from storage:', e);
    }
    return sanitizeProducts(INITIAL_PRODUCTS);
  });

  // Fetch updated products from backend API
  const fetchBackendProducts = async () => {
    try {
      const res = await fetch(BACKEND_API_URL);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          const sanitized = sanitizeProducts(data.products);
          setProducts(sanitized);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        }
      }
    } catch (err) {
      // Graceful offline fallback to cached state
      console.warn('Backend products fetch notice:', err.message);
    }
  };

  useEffect(() => {
    fetchBackendProducts();
  }, []);

  // Listen to storage events and cross-origin admin sync bridge
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setProducts(sanitizeProducts(parsed));
          }
        } catch {}
      }
    };

    const handleBridgeSync = (e) => {
      if (e.detail?.key === STORAGE_KEY && e.detail?.value) {
        if (Array.isArray(e.detail.value)) {
          setProducts(sanitizeProducts(e.detail.value));
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('giftpocket_store_synced', handleBridgeSync);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('giftpocket_store_synced', handleBridgeSync);
    };
  }, []);

  const getProduct = (slugOrId) => {
    if (!slugOrId) return null;
    return products.find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
  };

  const bestSellers = products.filter((p) => p.isBestseller || p.badge?.toLowerCase().includes('bestseller')).length > 0
    ? products.filter((p) => p.isBestseller || p.badge?.toLowerCase().includes('bestseller'))
    : products.slice(0, 8);

  return (
    <ProductsContext.Provider
      value={{
        products,
        bestSellers,
        getProduct,
        refreshProducts: fetchBackendProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
