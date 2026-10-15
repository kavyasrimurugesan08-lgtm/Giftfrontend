import React, { useState } from 'react';
import { Heart, Sparkles, Tag, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHomepageMedia } from '../../context/HomepageMediaContext';

export const PinterestGallery = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const { getGalleryMedia } = useHomepageMedia();
  const galleryItems = getGalleryMedia();

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-[#F8E8D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#B96F58] uppercase">
            Pinterest-Inspired Feed
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#332822]">
            Little moments from the GiftPocket world.
          </h2>
          <p className="text-sm text-[#6F5145] font-sans">
            Snapshots of finished custom creations, packing tables & smiling unboxings.
          </p>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => {
            const isLiked = likedPosts[item.id];
            return (
              <div
                key={item.id}
                className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-md group border border-[#D9A99A]/40 bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Top Floating Heart Button */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isLiked
                      ? 'bg-rose-500 text-white scale-110'
                      : 'bg-white/85 text-[#332822] hover:bg-white'
                  }`}
                  aria-label="Save photo"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                {/* Bottom Overlay Details */}
                <div className="p-4 bg-white/95 backdrop-blur-md flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#B96F58] uppercase">
                      {item.tag || 'Handmade'}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E8D49A]" />
                  </div>
                  <h4 className="font-editorial text-sm font-bold text-[#332822] line-clamp-1">
                    {item.title}
                  </h4>
                  <Link
                    to={item.link || '/shop'}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6F5145] hover:text-[#B96F58] transition-colors"
                  >
                    <span>Shop this aesthetic</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
