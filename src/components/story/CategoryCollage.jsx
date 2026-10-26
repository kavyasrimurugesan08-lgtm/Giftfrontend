import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useCollections } from '../../context/CollectionsContext';

// Helper to verify if an image was provided/uploaded by the user
const isUserUploadedImage = (img) => {
  if (!img || typeof img !== 'string') return false;
  const trimmed = img.trim();
  if (!trimmed) return false;
  // Strictly filter out external stock photo CDNs, unsplash, and placeholder services
  if (
    trimmed.includes('unsplash.com') ||
    trimmed.includes('placeholder') ||
    trimmed.includes('dummyimage') ||
    trimmed.includes('istockphoto') ||
    trimmed.includes('shutterstock') ||
    trimmed.includes('pexels.com')
  ) {
    return false;
  }
  return true;
};

export const CategoryCollage = () => {
  const { categories, updateCategory } = useCollections();

  const handleImageUpload = (categoryId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG, WEBP, GIF).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result;
        if (result && typeof result === 'string') {
          updateCategory(categoryId, { image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-24 bg-[#EDE8E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Editorial Gold Accent */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] text-[#B8860B] uppercase">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span>Artisan Lookbook Collections</span>
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#121110] font-black tracking-tight">
            Pick your little obsession
          </h2>
          <p className="text-sm text-[#544E48] font-medium font-sans max-w-md mx-auto">
            Explore our curated departments of customized charms, couple wristlets, and keepsakes.
          </p>
        </div>

        {/* Stable Grid with Designated Frames & Consistent Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat) => {
            const hasUploadedImage = isUserUploadedImage(cat.image);

            return (
              <div
                key={cat.id}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#D4AF37] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5"
              >
                {/* Header Tag Pill & Optional Change Photo Action */}
                <div className="flex items-center justify-between mb-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-[#FAF7F2] text-[#8C6D48] border border-[#EADBCE] shadow-xs uppercase">
                    {cat.itemCount || 15} Items
                  </span>

                  {/* Device upload button if user wants to swap/upload photo */}
                  <label
                    title={hasUploadedImage ? "Change uploaded photo" : "Upload your photo"}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-xl bg-white text-[#705638] hover:text-[#9A6B2F] hover:bg-[#FAF7F2] border border-[#E2DAD0] cursor-pointer shadow-xs transition-all flex items-center gap-1"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold hidden sm:inline">
                      {hasUploadedImage ? 'Change' : 'Upload'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(cat.id, e)}
                    />
                  </label>
                </div>

                {/* Designated Image Frame with Consistent Sizing & Alignment */}
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-[#F7F4EE] border border-[#EAE3D9] flex items-center justify-center mb-4">
                  {hasUploadedImage ? (
                    /* Static, Rock-Solid Image Display — No Blinking, Flashing, or Animation */
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover block select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      decoding="sync"
                      onError={(e) => {
                        // Suppress error without infinite reload or stock image fallback
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    /* Frame Awaiting User-Provided Image — No Default/Placeholder/Stock Images */
                    <div className="flex flex-col items-center justify-center text-center p-4 space-y-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#EDE7DF] border border-[#DACFBF] flex items-center justify-center text-[#8C755E]">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#8C755E] tracking-wide uppercase">
                        Awaiting Image
                      </span>
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#8C6D48] hover:text-[#5E462B] border border-[#DECDBB] text-[10px] font-black uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(cat.id, e)}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Name & Explore Link */}
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="block space-y-1.5 pt-1"
                >
                  <h3 className="font-editorial text-lg sm:text-xl font-black text-[#2B231D] group-hover:text-[#B96F58] transition-colors leading-snug uppercase tracking-wide">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#9A6B2F] group-hover:text-[#B96F58] font-bold transition-colors">
                    <span className="tracking-wider uppercase text-[11px]">Explore Department</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
