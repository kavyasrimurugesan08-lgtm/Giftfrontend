import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { BlobShape } from '../common/BlobShape';
import { useHomepageMedia } from '../../context/HomepageMediaContext';

export const ColorStoryChapter = () => {
  const { getColorChaptersMedia } = useHomepageMedia();
  const rawChapters = getColorChaptersMedia();

  const chapters = [
    {
      id: "sage",
      title: "Olive Sage & Botanical Wristlets",
      subtitle: "Fashion that feels good and connects souls",
      name: "Olive Sage",
      categoryName: "Bracelets & Bands",
      slug: "bracelets",
      bgColor: "#717C6D",
      accentColor: "#FAF8F5",
      textColor: "#FFFFFF",
      headline: "Fashion that feels good and does good",
      description: "Hand-braided olive sage cords with magnetic bells that click together whenever hands meet. A timeless keepsake.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      priceRange: "from ₹99"
    },
    {
      id: "sand",
      title: "Throwback Sandstone & Pearl Phone Charms",
      subtitle: "Vintage aesthetics crafted for your modern lifestyle",
      name: "Sandstone Oat",
      categoryName: "Phone Charms",
      slug: "phone-charms",
      bgColor: "#DFD7CB",
      accentColor: "#C97D67",
      textColor: "#1A1816",
      headline: "Throwback vintage trends reimagined",
      description: "Dainty sandstone pearls, iridescent sphere beads, and durable cords that turn your smartphone into a work of art.",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      priceRange: "from ₹129"
    },
    {
      id: "ochre",
      title: "Ochre Honey & Clay Miniatures",
      subtitle: "Pocket-Sized Resin Shakers & 3D Food Miniatures",
      name: "Ochre Gold",
      categoryName: "Miniature Keychains",
      slug: "keychains",
      bgColor: "#D69E4A",
      accentColor: "#1A1816",
      textColor: "#1A1816",
      headline: "Pocket-sized treasures with personality",
      description: "Tiny hand-painted resin keepsakes, laser-engraved typography tags, and honey amber charms for your keys.",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
      priceRange: "from ₹79"
    },
    {
      id: "terracotta",
      title: "Terracotta Blush & Keepsake Hampers",
      subtitle: "Warm earthy tones curated for heartfelt celebrations",
      name: "Terracotta Clay",
      categoryName: "Gift Hampers",
      slug: "gift-sets",
      bgColor: "#C97D67",
      accentColor: "#FAF8F5",
      textColor: "#FFFFFF",
      headline: "Curated gift sets ready to delight",
      description: "Pre-packed luxury hampers wrapped in satin ribbons with personalized note cards for someone special.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      priceRange: "from ₹399"
    }
  ];

  const [activeChapter, setActiveChapter] = useState(0);
  const current = chapters[activeChapter] || chapters[0];
  const isDarkCard = current.bgColor === '#717C6D' || current.bgColor === '#C97D67';

  return (
    <section
      className="py-24 transition-colors duration-700 ease-in-out relative overflow-hidden"
      style={{ backgroundColor: current.bgColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Selector for Color Chapters */}
        <div className="flex flex-col items-center mb-16 space-y-4">
          <span className={`text-xs font-black tracking-[0.25em] uppercase ${isDarkCard ? 'text-white/90' : 'text-[#1A1816]'}`}>
            The Lookbook Color Palette
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/90">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-display font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeChapter === idx
                    ? 'bg-[#1A1816] text-white shadow-md scale-105'
                    : 'hover:bg-white text-[#1A1816]'
                }`}
              >
                <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: ch.bgColor }} />
                <span>{ch.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chapter Visual Presentation (Lookbook Split Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Chapter Text Info (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-white text-[#1A1816] shadow-sm border border-white"
            >
              Chapter 0{activeChapter + 1} • {current.categoryName}
            </span>

            <h2 className={`font-editorial text-4xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight uppercase ${isDarkCard ? '!text-white text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]' : '!text-[#121110] text-[#121110]'}`}>
              {current.headline}
            </h2>

            <div className={`w-12 h-[2px] ${isDarkCard ? 'bg-white/60' : 'bg-[#1A1816]/40'} mx-auto lg:mx-0`} />

            <p className={`text-base sm:text-lg font-medium leading-relaxed max-w-xl font-sans ${isDarkCard ? '!text-[#FAF8F5] text-[#FAF8F5]' : '!text-[#36322E] text-[#36322E]'}`}>
              {current.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link
                to={current.link || `/shop?category=${current.slug || 'all'}`}
                className="px-8 py-4 bg-[#1A1816] text-white hover:bg-white hover:text-[#1A1816] rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE {current.name}</span>
                <ArrowRight className="w-4 h-4 text-[#D69E4A]" />
              </Link>
              
              <span className={`text-xs font-black tracking-wider uppercase ${isDarkCard ? 'text-white' : 'text-[#1A1816]'}`}>
                {current.priceRange}
              </span>
            </div>
          </div>

          {/* Chapter Image Card (6 Cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-102 transition-transform duration-500">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="text-white text-xs font-black tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                  Lookbook Feature 0{activeChapter + 1}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
