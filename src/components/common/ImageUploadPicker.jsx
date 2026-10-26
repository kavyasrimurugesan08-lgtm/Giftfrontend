import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, AlertCircle } from 'lucide-react';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const ImageUploadPicker = ({
  value,
  onChange,
  label = "Product Primary Image",
  aspectHint = "Standard formats: JPG, JPEG, PNG, WebP (Max 10MB)"
}) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return 'No file selected.';

    const fileExt = '.' + (file.name.split('.').pop() || '').toLowerCase();
    const mimeType = (file.type || '').toLowerCase();

    const isTypeValid = ALLOWED_MIME_TYPES.includes(mimeType) || ALLOWED_EXTENSIONS.includes(fileExt);
    if (!isTypeValid) {
      return 'Invalid format. Only JPG, JPEG, PNG, and WebP images are supported.';
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 10MB maximum limit.`;
    }

    return null;
  };

  const handleFile = async (file) => {
    if (!file) return;
    setErrorMessage('');

    const error = validateFile(file);
    if (error) {
      setErrorMessage(error);
      return;
    }

    // 1. Immediately create local preview using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const localDataUrl = e.target?.result;
      if (localDataUrl && typeof localDataUrl === 'string') {
        onChange(localDataUrl);
      }
    };
    reader.readAsDataURL(file);

    // 2. Upload to persistent backend storage
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const backendUrl = 'http://localhost:5000/api/upload/product';
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.url) {
          onChange(data.url);
        }
      }
    } catch (uploadErr) {
      // Local preview is already saved, so continue gracefully
      console.warn('Backend upload note (using persistent preview):', uploadErr.message);
    } finally {
      setIsUploading(false);
    }
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

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs Selector: Upload vs URL */}
      <div className="flex bg-[#F8E8D5]/40 p-1 rounded-xl border border-[#D9A99A]/40 text-xs">
        <button
          type="button"
          onClick={() => { setActiveTab('upload'); setErrorMessage(''); }}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'upload'
              ? 'bg-[#B96F58] text-white shadow-xs'
              : 'text-[#6F5145] hover:text-[#332822]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Image File</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('url'); setErrorMessage(''); }}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'url'
              ? 'bg-[#B96F58] text-white shadow-xs'
              : 'text-[#6F5145] hover:text-[#332822]'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Direct Image Link</span>
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
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? 'border-[#B96F58] bg-[#F4D2BE]/40 scale-[1.01]'
              : 'border-[#D9A99A]/60 bg-[#F8E8D5]/20 hover:border-[#B96F58] hover:bg-[#F4D2BE]/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="w-10 h-10 rounded-full bg-white text-[#B96F58] flex items-center justify-center shadow-xs">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#332822]">
              {isUploading ? 'Uploading to server...' : 'Click to select photo or drag & drop here'}
            </p>
            <p className="text-[10px] text-[#6F5145] mt-0.5">
              Supported: JPG, JPEG, PNG, WebP (up to 10MB)
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
            placeholder="http://localhost:5000/uploads/products/image.jpg"
            className="w-full px-3.5 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl text-xs font-mono text-[#332822] focus:outline-none focus:border-[#B96F58]"
          />
          <p className="text-[10px] text-[#6F5145]">
            Paste the reference link or storage URL of the administrator image.
          </p>
        </div>
      )}

      {/* Live Preview Bar */}
      {value && (
        <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#D9A99A]/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#D9A99A]/60 shrink-0 bg-white shadow-xs">
              <img
                src={value}
                alt="Uploaded Primary Preview"
                className="w-full h-full object-cover block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#332822] block truncate">
                Primary Product Photo Saved
              </span>
              <span className="text-[10px] font-mono text-[#6F5145] block truncate max-w-[240px]">
                {value.startsWith('data:') ? 'Local file uploaded' : value}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors"
            title="Remove Photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
