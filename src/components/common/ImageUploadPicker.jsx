import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Sparkles, X, Check } from 'lucide-react';

const BRAND_PRESET_PHOTOS = [
  { label: 'Floral Phone Charm', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80' },
  { label: 'Letter Charm Wristlet', url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80' },
  { label: 'Couple Bracelets', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80' },
  { label: 'Pastel Flower Clips', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80' },
  { label: 'Mini Bamboo Panda', url: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=600&q=80' },
  { label: 'Luxury Gift Hamper', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80' },
  { label: 'Radium Glow Toys', url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80' },
  { label: 'DIY Bead Craft Kit', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80' }
];

export const ImageUploadPicker = ({
  value,
  onChange,
  label = "Product / Feature Image",
  aspectHint = "Recommended: Square 1:1 or Portrait 4:5"
}) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url' | 'presets'
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP, GIF).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      {/* Label and Sub-hint */}
      <div className="flex items-center justify-between">
        <label className="font-bold text-[#332822] text-xs flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#B96F58]" />
          <span>{label} *</span>
        </label>
        {aspectHint && (
          <span className="text-[10px] text-[#6F5145]/70 font-medium">
            {aspectHint}
          </span>
        )}
      </div>

      {/* Tabs Selector: Upload vs URL vs Presets */}
      <div className="flex bg-[#F8E8D5]/40 p-1 rounded-xl border border-[#D9A99A]/40 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'upload'
              ? 'bg-[#B96F58] text-white shadow-xs'
              : 'text-[#6F5145] hover:text-[#332822]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Device Upload</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'url'
              ? 'bg-[#B96F58] text-white shadow-xs'
              : 'text-[#6F5145] hover:text-[#332822]'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Web URL</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'presets'
              ? 'bg-[#B96F58] text-white shadow-xs'
              : 'text-[#6F5145] hover:text-[#332822]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Presets</span>
        </button>
      </div>

      {/* Tab 1: Device Photo Upload */}
      {activeTab === 'upload' && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? 'border-[#B96F58] bg-[#F4D2BE]/40 scale-[1.01]'
              : 'border-[#D9A99A]/60 bg-[#F8E8D5]/20 hover:border-[#B96F58] hover:bg-[#F4D2BE]/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="w-10 h-10 rounded-full bg-white text-[#B96F58] flex items-center justify-center shadow-xs">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#332822]">
              Click to choose photo or drag & drop here
            </p>
            <p className="text-[10px] text-[#6F5145] mt-0.5">
              Supports PNG, JPG, WEBP, GIF (up to 10MB)
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: URL Input */}
      {activeTab === 'url' && (
        <div className="space-y-1.5">
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-3.5 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl text-xs font-mono text-[#332822] focus:outline-none focus:border-[#B96F58]"
          />
          <p className="text-[10px] text-[#6F5145]">
            Paste any public image link or CDN URL.
          </p>
        </div>
      )}

      {/* Tab 3: Brand Photo Presets */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
          {BRAND_PRESET_PHOTOS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(preset.url)}
              className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all group ${
                value === preset.url ? 'border-[#B96F58] ring-2 ring-[#B96F58]/40 scale-105' : 'border-[#D9A99A]/40 hover:border-[#B96F58]'
              }`}
              title={preset.label}
            >
              <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-[8px] text-white font-bold text-center leading-tight">
                {preset.label}
              </div>
              {value === preset.url && (
                <div className="absolute top-1 right-1 bg-[#B96F58] text-white rounded-full p-0.5 shadow-xs">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Live Preview Bar */}
      {value && (
        <div className="p-2.5 bg-[#FAF5EE] rounded-xl border border-[#D9A99A]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={value}
              alt="Selected Preview"
              className="w-12 h-12 rounded-lg object-cover border border-[#D9A99A]/50 shrink-0 bg-white"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80';
              }}
            />
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-[#332822] block truncate">
                Photo Selected
              </span>
              <span className="text-[9px] font-mono text-[#6F5145] block truncate max-w-[220px]">
                {value.startsWith('data:') ? 'Local file uploaded' : value}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-[10px] font-bold transition-colors"
            title="Clear Photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
