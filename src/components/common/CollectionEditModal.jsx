import React, { useState, useEffect, useRef } from 'react';
import { useCollections } from '../../context/CollectionsContext';
import { X, Upload, Sparkles, Check, Trash2, Palette, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Radium & Glow Toys', url: '/images/products/radium-toys.jpg' },
  { label: 'Keychains', url: '/images/products/keychains.jpg' },
  { label: 'Miniature Toys', url: '/images/products/miniature-toys.jpg' },
  { label: 'Hair Accessories', url: '/images/products/hair-accessories.jpg' },
  { label: 'Bag Charms', url: '/images/products/bag-charms.jpg' },
  { label: 'Friendship Bracelets', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80' },
  { label: 'Gift Hamper Box', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80' },
  { label: 'DIY Studio Kit', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80' }
];

const PRESET_COLORS = [
  { name: 'Peach Cream', hex: '#F4D2BE', text: '#6F5145' },
  { name: 'Pastel Lavender', hex: '#C9BDD8', text: '#332822' },
  { name: 'Matcha Sage', hex: '#B9C5A0', text: '#332822' },
  { name: 'Warm Terracotta', hex: '#D9A99A', text: '#332822' },
  { name: 'Butter Cream', hex: '#E8D49A', text: '#6F5145' },
  { name: 'Ocean Teal', hex: '#67949A', text: '#F8E8D5' },
  { name: 'Deep Cocoa', hex: '#332822', text: '#F8E8D5' }
];

export const CollectionEditModal = () => {
  const { isEditModalOpen, editingCategory, closeEditModal, updateCategory, addCategory, deleteCategory } = useCollections();
  
  const isNew = !editingCategory?.id || editingCategory?.id.startsWith('new');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '/images/products/bag-charms.jpg',
    color: '#F4D2BE',
    textColor: '#6F5145',
    itemCount: 15
  });

  const [imageTab, setImageTab] = useState('presets'); // 'presets' | 'upload' | 'url'
  const [customUrl, setCustomUrl] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || '',
        description: editingCategory.description || '',
        image: editingCategory.image || '/images/products/bag-charms.jpg',
        color: editingCategory.color || '#F4D2BE',
        textColor: editingCategory.textColor || '#6F5145',
        itemCount: editingCategory.itemCount || 12
      });
      setCustomUrl(editingCategory.image?.startsWith('http') ? editingCategory.image : '');
    } else {
      setFormData({
        name: '',
        description: '',
        image: '/images/products/bag-charms.jpg',
        color: '#F4D2BE',
        textColor: '#6F5145',
        itemCount: 15
      });
      setCustomUrl('');
    }
  }, [editingCategory, isEditModalOpen]);

  if (!isEditModalOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result;
        if (result) {
          setFormData((prev) => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a collection name');
      return;
    }

    if (isNew) {
      addCategory(formData);
    } else {
      updateCategory(editingCategory.id, formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#332822]/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-[#F8E8D5] rounded-3xl border-2 border-[#D9A99A] shadow-2xl w-full max-w-3xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#332822] text-[#F8E8D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B96F58] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#F8E8D5] fill-current" />
            </div>
            <div>
              <h3 className="font-editorial text-lg sm:text-xl font-bold">
                {isNew ? 'Create New Collection' : `Edit Collection: ${editingCategory?.name}`}
              </h3>
              <p className="text-[11px] text-[#D9A99A]">
                Customize visual presentation, photos, and department details
              </p>
            </div>
          </div>
          <button
            onClick={closeEditModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#D9A99A] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body with 2-Column Form & Live Preview */}
        <form onSubmit={handleSave} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Edit Form (7 cols) */}
          <div className="md:col-span-7 space-y-4 text-xs">
            
            {/* Collection Name */}
            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Collection Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Radium & Glow Toys"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D9A99A] text-sm font-semibold text-[#332822] focus:outline-none focus:border-[#B96F58]"
              />
            </div>

            {/* Subtitle / Description */}
            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Description / Tagline
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this collection..."
                className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#D9A99A] text-xs text-[#332822] focus:outline-none focus:border-[#B96F58]"
              />
            </div>

            {/* Estimated Item Count */}
            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Display Item Count
              </label>
              <input
                type="number"
                min="1"
                max="999"
                value={formData.itemCount}
                onChange={(e) => setFormData({ ...formData, itemCount: parseInt(e.target.value, 10) || 0 })}
                className="w-32 px-3.5 py-2 bg-white rounded-xl border border-[#D9A99A] text-xs font-bold text-[#332822]"
              />
            </div>

            {/* Cover Image Selector */}
            <div className="space-y-2 border-t border-[#D9A99A]/40 pt-4">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#332822] uppercase tracking-wider block">
                  Collection Cover Image
                </label>
                <div className="flex gap-1 bg-[#F4D2BE] p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setImageTab('presets')}
                    className={`px-2 py-0.5 rounded-md ${imageTab === 'presets' ? 'bg-white text-[#B96F58] shadow-xs' : 'text-[#6F5145]'}`}
                  >
                    Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    className={`px-2 py-0.5 rounded-md ${imageTab === 'upload' ? 'bg-white text-[#B96F58] shadow-xs' : 'text-[#6F5145]'}`}
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    className={`px-2 py-0.5 rounded-md ${imageTab === 'url' ? 'bg-white text-[#B96F58] shadow-xs' : 'text-[#6F5145]'}`}
                  >
                    Link URL
                  </button>
                </div>
              </div>

              {/* Preset Thumbnails */}
              {imageTab === 'presets' && (
                <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1 bg-white/60 rounded-xl border border-[#D9A99A]/40">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all group ${
                        formData.image === img.url ? 'border-[#B96F58] ring-2 ring-[#B96F58]/30 scale-95' : 'border-transparent hover:border-[#D9A99A]'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      {formData.image === img.url && (
                        <div className="absolute inset-0 bg-[#B96F58]/30 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* File Upload Input */}
              {imageTab === 'upload' && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 border-2 border-dashed border-[#B96F58] bg-white/80 rounded-2xl text-center cursor-pointer hover:bg-white transition-colors"
                >
                  <Upload className="w-6 h-6 text-[#B96F58] mx-auto mb-1" />
                  <p className="font-bold text-[#332822]">Click to upload photo from your computer</p>
                  <p className="text-[10px] text-[#6F5145]">PNG, JPG, WEBP up to 5MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {/* Custom URL Input */}
              {imageTab === 'url' && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      setFormData({ ...formData, image: e.target.value });
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#D9A99A] text-xs text-[#332822]"
                  />
                </div>
              )}
            </div>

            {/* Theme Color Presets */}
            <div className="space-y-1.5 border-t border-[#D9A99A]/40 pt-4">
              <label className="font-bold text-[#332822] uppercase tracking-wider block">
                Card Theme Color
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: c.hex, textColor: c.text })}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform flex items-center justify-center ${
                      formData.color === c.hex ? 'border-[#332822] scale-110 shadow-sm' : 'border-white hover:scale-105'
                    }`}
                  >
                    {formData.color === c.hex && (
                      <Check className="w-3.5 h-3.5" style={{ color: c.text }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Card Preview (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
            <span className="text-[11px] font-bold text-[#6F5145] uppercase tracking-widest">
              Live Preview Card
            </span>

            {/* Visual Card Mockup */}
            <div
              className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-2 border-[#D9A99A]/60 flex flex-col justify-end p-5 relative transition-all"
              style={{ backgroundColor: formData.color }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={formData.image}
                  alt={formData.name || 'Preview'}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#332822]/90 via-[#332822]/30 to-transparent" />
              </div>

              {/* Tag & Item Count */}
              <div className="relative z-10 mb-auto self-start">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-[#332822] shadow-xs">
                  {formData.itemCount} Items
                </span>
              </div>

              {/* Name & Subtitle */}
              <div className="relative z-10 text-[#F8E8D5] space-y-1">
                <h4 className="font-editorial text-xl font-bold leading-tight">
                  {formData.name || 'Collection Title'}
                </h4>
                <p className="text-[11px] text-[#F8E8D5]/80 line-clamp-2">
                  {formData.description || 'Collection description...'}
                </p>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#6F5145]">
              Edits automatically update across Home, Shop, and Categories pages.
            </p>
          </div>

          {/* Action Buttons (12 cols) */}
          <div className="md:col-span-12 flex items-center justify-between pt-4 border-t border-[#D9A99A]/40">
            <div>
              {!isNew && (
                <button
                  type="button"
                  onClick={() => deleteCategory(editingCategory.id)}
                  className="px-3 py-2 text-rose-600 hover:bg-rose-100/60 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Collection</span>
                </button>
              )}
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-5 py-2.5 bg-white/80 hover:bg-white text-[#332822] rounded-xl font-display font-bold text-xs border border-[#D9A99A]/60 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-xl font-display font-bold text-xs transition-colors shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{isNew ? 'Create Collection' : 'Save Changes'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
