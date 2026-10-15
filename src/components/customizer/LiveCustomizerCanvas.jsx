import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Heart, 
  Check, 
  ShoppingBag, 
  Upload, 
  X, 
  Circle, 
  Square
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCustomizer } from '../../context/CustomizerContext';

export const LiveCustomizerCanvas = ({ product, onAddToCartSuccess }) => {
  const { addToCart } = useCart();
  const { config, themes, shapes } = useCustomizer();
  const fileInputRef = useRef(null);
  
  // Customization themes & shapes from context
  const activeThemes = themes.filter((t) => t.isActive !== false);
  const activeShapes = shapes.filter((s) => s.isActive !== false);
  const maxLetters = config?.maxLetterLength || product?.customizerSchema?.letterLimit || 10;

  const [customName, setCustomName] = useState(config?.defaultLetterText || "");
  const [selectedTheme, setSelectedTheme] = useState(activeThemes[0] || {
    name: "Pastel Lavender",
    hex: "#C9BDD8",
    beadPalette: ["#C9BDD8", "#F4D2BE", "#F8E8D5"]
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [frameShape, setFrameShape] = useState(activeShapes[0]?.id || 'round');
  const [specialNotes, setSpecialNotes] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);

  const finalPrice = product?.price || 149;

  // Handle Image Upload from File Input
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Process and read file as DataURL
  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setActiveStep(3);
    };
    reader.readAsDataURL(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddToCart = () => {
    const customizationData = {
      name: customName.trim().toUpperCase(),
      colorTheme: selectedTheme.name,
      customPhoto: uploadedImage,
      photoFileName: imageFileName || (uploadedImage ? "Custom Picture" : null),
      frameShape: frameShape,
      notes: specialNotes
    };

    addToCart(product, 1, customizationData, false);
    if (onAddToCartSuccess) onAddToCartSuccess();
  };

  return (
    <div className="bg-[#F8E8D5] rounded-3xl border-2 border-[#D9A99A]/40 shadow-xl overflow-hidden max-w-4xl mx-auto">
      
      {/* Studio Header */}
      <div className="p-6 bg-[#F4D2BE]/60 border-b border-[#D9A99A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#B96F58] uppercase block mb-1">
            ✨ Customization Studio
          </span>
          <h2 className="font-editorial text-2xl md:text-3xl text-[#332822]">
            Make It Yours
          </h2>
          <p className="text-xs text-[#6F5145] font-hand text-base">
            "Because the best gifts feel like they were made just for them."
          </p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                activeStep === step
                  ? 'bg-[#B96F58] text-[#F8E8D5] shadow-md scale-110'
                  : 'bg-white/80 text-[#6F5145] hover:bg-[#D9A99A]/40'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Controls Form */}
      <div className="p-6 md:p-10 space-y-8">
        
        {/* Step 1: Pick Colors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold tracking-wider text-[#332822] uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#B96F58] text-[#F8E8D5] text-[11px] flex items-center justify-center">1</span>
              Pick Your Color Theme
            </label>
            <span className="text-xs font-semibold text-[#B96F58]">
              {selectedTheme.name}
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeThemes.map((theme) => {
              const isSelected = selectedTheme.name === theme.name;
              return (
                <button
                  key={theme.id || theme.name}
                  type="button"
                  onClick={() => {
                    setSelectedTheme(theme);
                    setActiveStep(1);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col items-start gap-2.5 ${
                    isSelected
                      ? 'border-[#B96F58] bg-white shadow-md ring-2 ring-[#B96F58]/30'
                      : 'border-[#D9A99A]/50 bg-white/60 hover:bg-white'
                  }`}
                >
                  <div className="w-full h-7 rounded-xl flex gap-1 p-1" style={{ backgroundColor: theme.hex }}>
                    {theme.beadPalette?.map((c, i) => (
                      <span key={i} className="w-4 h-full rounded-full bg-white/70" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-xs font-display font-semibold text-[#332822]">
                    {theme.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Add Name / Letters */}
        <div className="space-y-3 border-t border-[#D9A99A]/30 pt-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold tracking-wider text-[#332822] uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#B96F58] text-[#F8E8D5] text-[11px] flex items-center justify-center">2</span>
              Add Your Name or Initials
            </label>
            <span className="text-xs text-[#6F5145]">
              {customName.length}/{maxLetters} letters
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={customName}
              maxLength={maxLetters}
              onChange={(e) => {
                setCustomName(e.target.value.toUpperCase());
                setActiveStep(2);
              }}
              placeholder="e.g. YOUR NAME, BESTIE, INITIALS"
              className="w-full px-5 py-3.5 bg-white rounded-2xl border-2 border-[#D9A99A]/60 text-lg font-display font-bold uppercase tracking-widest text-[#332822] focus:outline-none focus:border-[#B96F58] transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Step 3: UPLOAD YOUR PICTURE / PHOTO */}
        <div className="space-y-3 border-t border-[#D9A99A]/30 pt-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold tracking-wider text-[#332822] uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#B96F58] text-[#F8E8D5] text-[11px] flex items-center justify-center">3</span>
              Upload Your Custom Picture / Photo
            </label>
            {uploadedImage && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Photo Ready</span>
              </span>
            )}
          </div>

          {/* Hidden HTML File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          {!uploadedImage ? (
            /* Drag & Drop / Click to Upload Box */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 ${
                isDragOver
                  ? 'border-[#B96F58] bg-[#F4D2BE]/60 scale-101'
                  : 'border-[#D9A99A] bg-white/70 hover:bg-white hover:border-[#B96F58]'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F4D2BE] text-[#B96F58] flex items-center justify-center shadow-xs">
                <Upload className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <p className="text-sm font-display font-bold text-[#332822]">
                  Click to upload your image or drag & drop here
                </p>
                <p className="text-xs text-[#6F5145] mt-1">
                  Upload a photo of your bestie, pet, couple, artwork or special memory (PNG, JPG, WEBP)
                </p>
              </div>
            </div>
          ) : (
            /* Uploaded Image Preview & Controls */
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D9A99A]/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-300 bg-[#F8E8D5] shrink-0 shadow-md">
                  <img
                    src={uploadedImage}
                    alt="Uploaded Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#332822] truncate max-w-[240px]">
                    {imageFileName || "custom-picture.jpg"}
                  </p>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5">
                    ✓ Custom photo attached to charm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#F8E8D5] hover:bg-[#F4D2BE] text-[#332822] rounded-xl text-xs font-semibold border border-[#D9A99A]/50 transition-colors"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove picture"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Frame Shape Selector */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-semibold text-[#6F5145]">Pendant Frame:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFrameShape('round')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  frameShape === 'round'
                    ? 'bg-[#B96F58] text-[#F8E8D5] font-bold shadow-xs'
                    : 'bg-white text-[#332822] border border-[#D9A99A]/50'
                }`}
              >
                <Circle className="w-3 h-3 fill-current" />
                <span>Round Medallion</span>
              </button>
              <button
                type="button"
                onClick={() => setFrameShape('heart')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  frameShape === 'heart'
                    ? 'bg-[#B96F58] text-[#F8E8D5] font-bold shadow-xs'
                    : 'bg-white text-[#332822] border border-[#D9A99A]/50'
                }`}
              >
                <Heart className="w-3 h-3 fill-current" />
                <span>Heart Locket</span>
              </button>
              <button
                type="button"
                onClick={() => setFrameShape('square')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  frameShape === 'square'
                    ? 'bg-[#B96F58] text-[#F8E8D5] font-bold shadow-xs'
                    : 'bg-white text-[#332822] border border-[#D9A99A]/50'
                }`}
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Polaroid Mini</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 4: Special Request Notes */}
        <div className="space-y-2 border-t border-[#D9A99A]/30 pt-6">
          <label className="text-xs font-bold tracking-wider text-[#332822] uppercase flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#B96F58] text-[#F8E8D5] text-[11px] flex items-center justify-center">4</span>
            Special Instructions (Optional)
          </label>
          <textarea
            rows={2}
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="e.g. Please crop the photo close to the face, add a star spacer between letters..."
            className="w-full px-4 py-3 bg-white rounded-2xl border border-[#D9A99A]/60 text-xs text-[#332822] focus:outline-none focus:border-[#B96F58] transition-colors"
          />
        </div>

        {/* Creation Summary Card & Add to Cart Button */}
        <div className="p-5 rounded-2xl bg-white/90 border border-[#D9A99A]/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[10px] font-bold tracking-widest text-[#6F5145] uppercase block">
              YOUR CREATION SUMMARY
            </span>
            <div className="text-xs text-[#332822] mt-1 space-x-2">
              <strong>Name:</strong> <span>{customName || "None"}</span> • 
              <strong> Color:</strong> <span>{selectedTheme.name}</span> • 
              <strong> Photo:</strong> <span>{uploadedImage ? "Custom Picture Attached ✓" : "None"}</span>
            </div>
            <div className="text-lg font-bold text-[#B96F58] mt-1">
              ₹{finalPrice} <span className="text-xs text-[#6F5145] font-normal">incl. of all custom crafting</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-2xl font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B96F58]/20 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Custom Charm to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};
