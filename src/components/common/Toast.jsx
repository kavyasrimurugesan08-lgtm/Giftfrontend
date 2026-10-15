import React from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, Heart } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#332822] text-[#F8E8D5] rounded-full shadow-2xl border border-[#B96F58]/40 backdrop-blur-md">
        <span className="p-1.5 bg-[#B96F58] rounded-full text-[#F8E8D5]">
          <Heart className="w-4 h-4 fill-current" />
        </span>
        <span className="font-sans font-medium text-sm tracking-wide">
          {toastMessage}
        </span>
        <Sparkles className="w-4 h-4 text-[#E8D49A]" />
      </div>
    </div>
  );
};
