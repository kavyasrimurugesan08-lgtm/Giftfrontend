import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('giftpocket_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, quantity = 1, customization = null, isWholesale = false) => {
    // Generate unique key based on product id + serialized customization + wholesale flag
    const customKey = customization ? JSON.stringify(customization) : 'default';
    const itemKey = `${product.id}-${customKey}-${isWholesale ? 'ws' : 'ret'}`;

    // Price calculation
    let unitPrice = product.price;
    if (isWholesale && product.wholesalePrice) {
      unitPrice = product.wholesalePrice;
      // Check volume breaks if quantity >= threshold
      if (product.wholesaleTiers && product.wholesaleTiers.length > 0) {
        const tier = [...product.wholesaleTiers].reverse().find(t => quantity >= t.minQty);
        if (tier) unitPrice = tier.price;
      }
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.itemKey === itemKey);
      if (existing) {
        const updatedQty = existing.quantity + quantity;
        // Recalculate tier price for new quantity
        let updatedPrice = unitPrice;
        if (isWholesale && product.wholesaleTiers) {
          const tier = [...product.wholesaleTiers].reverse().find(t => updatedQty >= t.minQty);
          if (tier) updatedPrice = tier.price;
        }

        return prev.map(item =>
          item.itemKey === itemKey
            ? { ...item, quantity: updatedQty, price: updatedPrice }
            : item
        );
      } else {
        return [
          ...prev,
          {
            itemKey,
            productId: product.id,
            product,
            name: product.name,
            price: unitPrice,
            originalPrice: product.originalPrice,
            image: product.images ? product.images[0] : '',
            quantity,
            customization,
            isWholesale,
            moq: product.moq || 1
          }
        ];
      }
    });

    showToast("Added to your little collection ♡");
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }

    setCartItems(prev =>
      prev.map(item => {
        if (item.itemKey === itemKey) {
          let updatedPrice = item.price;
          if (item.isWholesale && item.product.wholesaleTiers) {
            const tier = [...item.product.wholesaleTiers].reverse().find(t => quantity >= t.minQty);
            if (tier) updatedPrice = tier.price;
          }
          return { ...item, quantity, price: updatedPrice };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', discountType: 'percentage', value: 10, description: '10% First Order Discount' });
      showToast("Coupon WELCOME10 applied! (10% Off) ♡");
      return { success: true, message: "10% discount applied successfully!" };
    } else if (cleanCode === 'SMILE50') {
      setAppliedCoupon({ code: 'SMILE50', discountType: 'fixed', value: 50, minOrder: 299, description: '₹50 Flat Off on orders above ₹299' });
      showToast("Coupon SMILE50 applied! (₹50 Off) ♡");
      return { success: true, message: "₹50 flat discount applied!" };
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', discountType: 'shipping', value: 0, description: 'Free Standard Shipping' });
      showToast("Coupon FREESHIP applied! ♡");
      return { success: true, message: "Free shipping unlocked!" };
    } else {
      return { success: false, message: "Invalid promo code. Try WELCOME10 or SMILE50!" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed.");
  };

  // Computations
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)), 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.discountType === 'fixed') {
      discountAmount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  // Free shipping threshold = ₹499 or if coupon freeship
  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold || (appliedCoupon && appliedCoupon.discountType === 'shipping') || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 49;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST included estimation
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        discountAmount,
        shippingFee,
        isFreeShipping,
        freeShippingThreshold,
        taxAmount,
        total,
        appliedCoupon,
        isCartOpen,
        toastMessage,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
