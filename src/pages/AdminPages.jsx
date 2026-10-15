import React, { useState } from 'react';
import { PRODUCTS, WHOLESALE_TIERS } from '../data/products';
import { useCollections } from '../context/CollectionsContext';
import { useWholesale } from '../context/WholesaleContext';
import { useHomepageMedia } from '../context/HomepageMediaContext';
import { useCustomizer } from '../context/CustomizerContext';
import { useTheme } from '../context/ThemeContext';
import { HOMEPAGE_SECTIONS } from '../data/homepageMedia';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
  FileText,
  AlertTriangle,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Layers,
  Sparkles,
  RotateCcw,
  Tag,
  Eye,
  X,
  Check,
  Printer,
  Search,
  Image,
  ExternalLink,
  Palette,
  Brush
} from 'lucide-react';
import { ImageUploadPicker } from '../components/common/ImageUploadPicker';

export const AdminDashboard = () => {
  const [adminTab, setAdminTab] = useState('overview');
  const [productList, setProductList] = useState(PRODUCTS);
  const { categories, openEditModal, deleteCategory, resetCategories } = useCollections();
  const { wholesaleApplications, updateApplicationStatus, bulkEnquiries } = useWholesale();
  const { mediaList, addMediaItem, updateMediaItem, deleteMediaItem, resetMediaItems } = useHomepageMedia();
  const { config, themes, shapes, updateConfig, addTheme, updateTheme, deleteTheme, resetThemes, toggleShape, addPrompt, deletePrompt, resetAll } = useCustomizer();
  const { currentTheme, applyPreset, updateCustomColors, resetTheme, presets } = useTheme();

  // Selected Section for Media Filtering
  const [mediaSectionFilter, setMediaSectionFilter] = useState('all');

  // Media Modal state
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [mediaForm, setMediaForm] = useState({
    title: '',
    subtitle: '',
    section: 'hero',
    tag: '',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    link: '/shop'
  });

  // Admin Orders
  const [adminOrders, setAdminOrders] = useState([
    {
      id: 'ORD-98214',
      customer: 'Priya Patel',
      email: 'priya.patel@gmail.com',
      phone: '+91 98201 44512',
      address: 'Flat 402, Sunshine Heights, Bandra West, Mumbai - 400050',
      total: 447,
      status: 'Delivered',
      date: '2026-08-24',
      type: 'Retail',
      items: [{ name: 'Handcrafted Floral Bell Charm', quantity: 2, price: 149, customName: 'PRIYA' }]
    },
    {
      id: 'ORD-98215',
      customer: 'Twinkle Trinkets Store (Rohit Verma)',
      email: 'orders@twinkletrinkets.in',
      phone: '+91 91102 99881',
      address: 'Shop 14, Commercial Plaza, Indiranagar, Bengaluru - 560038',
      total: 3950,
      status: 'Shipped',
      date: '2026-08-28',
      type: 'Wholesale',
      items: [{ name: 'Floral Bell Phone Charm (Wholesale Pack)', quantity: 40, price: 65 }]
    },
    {
      id: 'ORD-98216',
      customer: 'Ananya Sharma',
      email: 'ananya.s@outlook.com',
      phone: '+91 98450 12389',
      address: 'Villa 22, Green Meadows, Hyderabad - 500032',
      total: 149,
      status: 'Processing',
      date: '2026-08-30',
      type: 'Retail',
      items: [{ name: 'Pocket Bamboo Panda Companion', quantity: 1, price: 129 }]
    }
  ]);

  // Story CMS State
  const [storyFrames, setStoryFrames] = useState([
    { id: 1, title: 'Little things. Big smiles.', subtitle: 'A cute organic gift boutique', bg: '#F8E8D5', animation: 'fade' },
    { id: 2, title: 'Make it yours.', subtitle: '4-step phone charm customization', bg: '#F4D2BE', animation: 'pinned' },
    { id: 3, title: 'Give a little. Make it big.', subtitle: 'Final cinematic brand closing', bg: '#F8E8D5', animation: 'scale' }
  ]);

  // Coupons State
  const [coupons, setCoupons] = useState([
    { id: 'c1', code: 'WELCOME10', discountType: 'percentage', value: 10, minOrderAmount: 299, isActive: true },
    { id: 'c2', code: 'SMILE50', discountType: 'fixed', value: 50, minOrderAmount: 399, isActive: true },
    { id: 'c3', code: 'FREESHIP', discountType: 'shipping', value: 49, minOrderAmount: 499, isActive: true }
  ]);

  // Modals state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  // Form states for Product Modal
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'phone-charms',
    price: 149,
    stock: 100,
    isCustomizable: true,
    badge: 'New',
    description: '',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
  });

  // Form states for Coupon Modal
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'percentage',
    value: 10,
    minOrderAmount: 299,
    isActive: true
  });

  // Metrics
  const totalRevenue = 148520;
  const todaySales = 8450;
  const totalOrders = adminOrders.length + 339;
  const lowStockItems = productList.filter((p) => p.stock < 50);

  // Media Handlers
  const handleOpenAddMedia = () => {
    setEditingMedia(null);
    setMediaForm({
      title: '',
      subtitle: '',
      section: 'hero',
      tag: '',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
      link: '/shop'
    });
    setIsMediaModalOpen(true);
  };

  const handleOpenEditMedia = (media) => {
    setEditingMedia(media);
    setMediaForm({
      title: media.title,
      subtitle: media.subtitle || '',
      section: media.section || 'hero',
      tag: media.tag || '',
      image: media.image,
      link: media.link || '/shop'
    });
    setIsMediaModalOpen(true);
  };

  const handleSaveMediaSubmit = (e) => {
    e.preventDefault();
    if (!mediaForm.title.trim() || !mediaForm.image.trim()) return;

    const secObj = HOMEPAGE_SECTIONS.find((s) => s.id === mediaForm.section);

    if (editingMedia) {
      updateMediaItem(editingMedia.id, {
        ...mediaForm,
        sectionName: secObj ? secObj.name : 'Homepage Section'
      });
    } else {
      addMediaItem({
        ...mediaForm,
        sectionName: secObj ? secObj.name : 'Homepage Section'
      });
    }
    setIsMediaModalOpen(false);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setAdminOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductList((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: 'phone-charms',
      price: 149,
      stock: 100,
      isCustomizable: true,
      badge: 'New Arrival',
      description: '',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProdForm({
      name: prod.name,
      category: prod.category || 'phone-charms',
      price: prod.price,
      stock: prod.stock,
      isCustomizable: prod.isCustomizable || false,
      badge: prod.badge || '',
      description: prod.description || '',
      image: prod.images?.[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodForm.name.trim()) return;

    if (editingProduct) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: prodForm.name,
                category: prodForm.category,
                price: Number(prodForm.price),
                stock: Number(prodForm.stock),
                isCustomizable: prodForm.isCustomizable,
                badge: prodForm.badge,
                description: prodForm.description,
                images: [prodForm.image]
              }
            : p
        )
      );
    } else {
      const newP = {
        id: `prod-${Date.now()}`,
        name: prodForm.name,
        slug: prodForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: prodForm.category,
        price: Number(prodForm.price),
        stock: Number(prodForm.stock),
        isCustomizable: prodForm.isCustomizable,
        badge: prodForm.badge,
        description: prodForm.description,
        rating: 5.0,
        reviewsCount: 0,
        images: [prodForm.image]
      };
      setProductList((prev) => [newP, ...prev]);
    }
    setIsProductModalOpen(false);
  };

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;
    const newC = {
      id: `c-${Date.now()}`,
      code: couponForm.code.toUpperCase().trim(),
      discountType: couponForm.discountType,
      value: Number(couponForm.value),
      minOrderAmount: Number(couponForm.minOrderAmount) || 0,
      isActive: couponForm.isActive
    };
    setCoupons((prev) => [newC, ...prev]);
    setIsCouponModalOpen(false);
  };

  const filteredMediaList = mediaList.filter(
    (m) => mediaSectionFilter === 'all' || m.section === mediaSectionFilter
  );

  return (
    <div className="min-h-screen bg-[#F4D2BE]/20 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="p-6 bg-[#332822] text-[#F8E8D5] rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#B96F58]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B96F58] flex items-center justify-center font-bold text-white shadow-md">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="font-editorial text-2xl font-bold">
                GIFTPocket Control Centre
              </h1>
              <p className="text-xs text-[#D9A99A]">
                E-Commerce & Wholesale Administration Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-emerald-900/60 text-emerald-300 rounded-full font-bold border border-emerald-700">
              Live Production Store (₹ INR)
            </span>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex gap-2 border-b border-[#D9A99A]/40 pb-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', name: 'Overview & KPIs', icon: LayoutDashboard },
            { id: 'themes', name: 'Website Colors & Theme', icon: Brush },
            { id: 'media', name: 'Homepage Pictures CMS', icon: Image },
            { id: 'customizer', name: 'Customizer Studio CMS', icon: Palette },
            { id: 'collections', name: 'Collections & Chapters', icon: Layers },
            { id: 'products', name: 'Products & Customizer', icon: Package },
            { id: 'orders', name: 'Orders Pipeline', icon: ShoppingCart },
            { id: 'wholesale', name: 'Wholesale B2B', icon: Store },
            { id: 'cms', name: 'Story CMS', icon: Sparkles },
            { id: 'coupons', name: 'Coupons & Promos', icon: Tag },
            { id: 'inventory', name: 'Inventory Alerts', icon: AlertTriangle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-display font-bold transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#B96F58] text-[#F8E8D5] shadow-sm'
                    : 'bg-white/80 text-[#332822] hover:bg-[#F4D2BE]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview KPIs */}
        {adminTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-1">
                <span className="text-xs font-bold text-[#6F5145] uppercase">Total Revenue</span>
                <h3 className="font-display font-extrabold text-3xl text-[#B96F58]">₹{totalRevenue.toLocaleString('en-IN')}</h3>
                <p className="text-[11px] text-emerald-700 font-semibold">+18.4% this month</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-1">
                <span className="text-xs font-bold text-[#6F5145] uppercase">Today's Sales</span>
                <h3 className="font-display font-extrabold text-3xl text-[#332822]">₹{todaySales.toLocaleString('en-IN')}</h3>
                <p className="text-[11px] text-[#6F5145]">14 retail & 2 wholesale orders</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-1">
                <span className="text-xs font-bold text-[#6F5145] uppercase">Total Orders</span>
                <h3 className="font-display font-extrabold text-3xl text-[#332822]">{totalOrders}</h3>
                <p className="text-[11px] text-emerald-700 font-semibold">98.2% on-time dispatch</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-1">
                <span className="text-xs font-bold text-[#6F5145] uppercase">Low Stock Alerts</span>
                <h3 className="font-display font-extrabold text-3xl text-amber-600">{lowStockItems.length}</h3>
                <p className="text-[11px] text-[#6F5145]">Items below threshold</p>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl p-6 border border-[#D9A99A]/40 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-xl font-bold text-[#332822]">Recent Orders</h3>
                <button onClick={() => setAdminTab('orders')} className="text-xs font-bold text-[#B96F58] hover:underline">
                  View Pipeline
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#D9A99A]/30 text-[#6F5145] uppercase">
                    <tr>
                      <th className="py-2.5">Order ID</th>
                      <th>Customer</th>
                      <th>Channel</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9A99A]/20">
                    {adminOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#F8E8D5]/20">
                        <td className="py-3 font-mono font-bold text-[#B96F58]">{ord.id}</td>
                        <td className="font-medium text-[#332822]">{ord.customer}</td>
                        <td>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8D49A] text-[#6F5145]">
                            {ord.type}
                          </span>
                        </td>
                        <td className="font-bold">₹{ord.total}</td>
                        <td>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {ord.status}
                          </span>
                        </td>
                        <td className="text-[#6F5145]">{ord.date}</td>
                        <td className="text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(ord)}
                            className="px-2.5 py-1 bg-[#F8E8D5] hover:bg-[#B96F58] hover:text-white rounded-lg text-xs font-bold transition-all"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Website Colors & Theme */}
        {adminTab === 'themes' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A99A]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#B96F58] uppercase tracking-widest block mb-1">
                  🎨 Storefront Visual Identity
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                  Website Color Theme & Aesthetics
                </h3>
                <p className="text-xs text-[#6F5145] mt-1">
                  1-Click instant palette changes applied live across all customer pages.
                </p>
              </div>

              <button
                type="button"
                onClick={resetTheme}
                className="px-3.5 py-2 bg-white text-[#6F5145] rounded-xl text-xs font-bold border border-[#D9A99A]/50 hover:bg-[#F8E8D5] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Classic Peach</span>
              </button>
            </div>

            {/* Presets Grid */}
            <div className="space-y-4">
              <h4 className="font-editorial text-xl font-bold text-[#332822]">
                Curated Color Schemes ({presets.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {presets.map((preset) => {
                  const isSelected = currentTheme?.id === preset.id;
                  const c = preset.colors;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#B96F58] bg-white ring-2 ring-[#B96F58]/40 shadow-md scale-[1.02]'
                          : 'border-[#D9A99A]/40 bg-white/80 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div
                          className="h-20 rounded-2xl p-3 flex flex-col justify-between shadow-inner border border-white/60 mb-3"
                          style={{ backgroundColor: c.background }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: c.primary }}>
                              Preview
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>Active</span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/80">
                            <span className="w-4 h-4 rounded-md" style={{ backgroundColor: c.primary }} />
                            <span className="w-4 h-4 rounded-md" style={{ backgroundColor: c.secondary }} />
                            <span className="w-4 h-4 rounded-md" style={{ backgroundColor: c.background }} />
                            <span className="w-4 h-4 rounded-md" style={{ backgroundColor: c.textPrimary }} />
                          </div>
                        </div>

                        <h4 className="font-editorial text-lg font-bold text-[#332822]">
                          {preset.name}
                        </h4>
                        <p className="text-xs text-[#6F5145] mt-1 line-clamp-2 leading-relaxed">
                          {preset.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#D9A99A]/30 flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] text-[#6F5145]">
                          Hex: <strong>{c.primary}</strong>
                        </span>
                        <button
                          type="button"
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                            isSelected ? 'bg-[#B96F58] text-white' : 'bg-[#FAF5EE] text-[#332822]'
                          }`}
                        >
                          {isSelected ? 'Applied ✓' : 'Apply Theme'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Fine-Tuning */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-4">
              <h4 className="font-editorial text-xl font-bold text-[#332822]">
                Custom Palette Fine-Tuning
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#D9A99A]/40">
                  <label className="text-[11px] font-bold text-[#332822] uppercase block mb-1">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.colors?.primary || '#B96F58'}
                      onChange={(e) => updateCustomColors({ primary: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-white"
                    />
                    <span className="text-xs font-mono font-bold text-[#332822]">{currentTheme.colors?.primary}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#D9A99A]/40">
                  <label className="text-[11px] font-bold text-[#332822] uppercase block mb-1">Background Canvas</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.colors?.background || '#F8E8D5'}
                      onChange={(e) => updateCustomColors({ background: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-white"
                    />
                    <span className="text-xs font-mono font-bold text-[#332822]">{currentTheme.colors?.background}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#D9A99A]/40">
                  <label className="text-[11px] font-bold text-[#332822] uppercase block mb-1">Main Text Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.colors?.textPrimary || '#332822'}
                      onChange={(e) => updateCustomColors({ textPrimary: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-white"
                    />
                    <span className="text-xs font-mono font-bold text-[#332822]">{currentTheme.colors?.textPrimary}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Homepage Pictures & Media CMS */}
        {adminTab === 'media' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                  Home Page Pictures & Visual Media CMS ({mediaList.length})
                </h3>
                <p className="text-xs text-[#6F5145]">
                  Add, edit image URLs, modify captions, or remove pictures across all home page sections
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetMediaItems}
                  className="px-3 py-2 bg-white text-[#6F5145] rounded-xl text-xs font-bold border border-[#D9A99A]/50 hover:bg-[#F8E8D5] transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default Photos</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAddMedia}
                  className="px-4 py-2 bg-[#B96F58] text-[#F8E8D5] rounded-xl text-xs font-bold hover:bg-[#332822] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Picture</span>
                </button>
              </div>
            </div>

            {/* Section Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#D9A99A]/30">
              {HOMEPAGE_SECTIONS.map((sec) => {
                const count =
                  sec.id === 'all'
                    ? mediaList.length
                    : mediaList.filter((m) => m.section === sec.id).length;
                const isActive = mediaSectionFilter === sec.id;

                return (
                  <button
                    key={sec.id}
                    onClick={() => setMediaSectionFilter(sec.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#332822] text-white shadow-xs'
                        : 'bg-white/80 text-[#6F5145] hover:bg-[#F4D2BE]'
                    }`}
                  >
                    <span>{sec.name}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-[#B96F58] text-white' : 'bg-[#FAF5EE] text-[#6F5145]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Pictures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMediaList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative h-48 bg-[#FAF5EE] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#332822]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#332822]/80 text-white backdrop-blur-xs">
                        {item.sectionName || item.section}
                      </span>
                    </div>

                    {item.tag && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8D49A] text-[#332822]">
                          {item.tag}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-editorial text-base font-bold leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                    <div className="space-y-1">
                      <p className="text-[#6F5145] line-clamp-2 leading-relaxed">
                        {item.subtitle || 'Customized home page photography.'}
                      </p>
                      {item.link && (
                        <div className="pt-1 flex items-center gap-1 text-[11px] font-mono text-[#B96F58]">
                          <ExternalLink className="w-3 h-3" />
                          <span>Link: {item.link}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#D9A99A]/30">
                      <button
                        onClick={() => handleOpenEditMedia(item)}
                        className="px-3.5 py-1.5 bg-[#B96F58] hover:bg-[#332822] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Picture</span>
                      </button>

                      <button
                        onClick={() => deleteMediaItem(item.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Picture"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Customizer Studio CMS */}
        {adminTab === 'customizer' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A99A]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#B96F58] uppercase tracking-widest block mb-1">
                  ✨ Interactive Customizer CMS
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                  Customized Studio & Live Bead Palettes
                </h3>
                <p className="text-xs text-[#6F5145] mt-1">
                  Configure real-time color themes, beads, letter limits, and charm options on <strong>/customized</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-3.5 py-2 bg-white text-[#6F5145] rounded-xl text-xs font-bold border border-[#D9A99A]/50 hover:bg-[#F8E8D5] transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* General Settings Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-4">
              <h4 className="font-editorial text-xl font-bold text-[#332822]">
                Studio Titles & Character Limits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#6F5145] uppercase tracking-wider block mb-1">Studio Title</label>
                  <input
                    type="text"
                    value={config.studioTitle}
                    onChange={(e) => updateConfig({ studioTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] rounded-xl border border-[#D9A99A]/50 text-xs font-semibold text-[#332822]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6F5145] uppercase tracking-wider block mb-1">Subtitle Tag</label>
                  <input
                    type="text"
                    value={config.studioSubtitle}
                    onChange={(e) => updateConfig({ studioSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] rounded-xl border border-[#D9A99A]/50 text-xs font-semibold text-[#332822]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6F5145] uppercase tracking-wider block mb-1">Max Letters Limit</label>
                  <input
                    type="number"
                    min={4}
                    max={20}
                    value={config.maxLetterLength}
                    onChange={(e) => updateConfig({ maxLetterLength: parseInt(e.target.value) || 8 })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] rounded-xl border border-[#D9A99A]/50 text-xs font-semibold text-[#332822]"
                  />
                </div>
              </div>
            </div>

            {/* Color Themes Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-editorial text-xl font-bold text-[#332822]">
                  Live Color Themes & Bead Palettes ({themes.length})
                </h4>
                <button
                  type="button"
                  onClick={resetThemes}
                  className="text-xs text-[#B96F58] font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Themes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((t, idx) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="h-20 rounded-2xl p-4 flex items-center justify-between shadow-inner border border-white/60 mb-3"
                        style={{ backgroundColor: t.hex }}
                      >
                        <span className="font-editorial text-lg font-bold" style={{ color: t.textColor }}>
                          {t.name}
                        </span>
                        <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/80">
                          {t.beadPalette?.map((color, i) => (
                            <span key={i} className="w-4 h-4 rounded-full shadow-xs" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-[#6F5145] leading-relaxed mb-3">
                        {t.description || "Customized hand-crafted bead color scheme."}
                      </p>

                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#6F5145] bg-[#FAF5EE] p-2 rounded-xl border border-[#D9A99A]/40">
                        <span>Hex: <strong>{t.hex}</strong></span>
                        <span>•</span>
                        <span>Beads: <strong>{t.beadPalette?.length || 3}</strong></span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#D9A99A]/30 flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Active in Studio
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteTheme(t.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete theme"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspiration Prompts */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-4">
              <h4 className="font-editorial text-xl font-bold text-[#332822]">
                Letter Inspiration Prompts ({config.inspirationPrompts?.length || 0})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.inspirationPrompts?.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#D9A99A]/40 flex items-center justify-between"
                  >
                    <div>
                      <strong className="text-xs text-[#332822] block">{p.tag}</strong>
                      <span className="text-xs text-[#6F5145]">{p.example}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => deletePrompt(p.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Collections & Chapters */}
        {adminTab === 'collections' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                  Collections & Chapters ({categories.length})
                </h3>
                <p className="text-xs text-[#6F5145]">
                  Manage visual collections, upload photos, and organize catalog categories.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetCategories}
                  className="px-3 py-2 bg-white text-[#6F5145] rounded-xl text-xs font-bold border border-[#D9A99A]/50 hover:bg-[#F8E8D5] transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(null)}
                  className="px-4 py-2 bg-[#B96F58] text-[#F8E8D5] rounded-xl text-xs font-bold hover:bg-[#332822] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Collection</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="p-5 bg-white rounded-3xl border border-[#D9A99A]/50 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-[#F4D2BE]/30">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#332822]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs"
                        style={{ backgroundColor: cat.color || '#F4D2BE', color: cat.textColor || '#332822' }}
                      >
                        Chapter {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-[#332822]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {cat.itemCount || 15} Items
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="font-editorial text-lg font-bold text-white leading-tight">
                        {cat.name}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-[#6F5145] line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#D9A99A]/30">
                    <button
                      type="button"
                      onClick={() => openEditModal(cat)}
                      className="px-3.5 py-1.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Collection</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteCategory(cat.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Collection"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Products */}
        {adminTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                  Product Catalogue ({productList.length})
                </h3>
                <p className="text-xs text-[#6F5145]">
                  Manage prices, inventory units, and customizer tags
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 bg-[#B96F58] text-[#F8E8D5] rounded-xl text-xs font-bold hover:bg-[#332822] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((prod) => (
                <div key={prod.id} className="p-4 bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs flex gap-4 items-center justify-between">
                  <img
                    src={prod.images?.[0] || prod.image}
                    alt={prod.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-slate-100 shrink-0"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#332822] truncate">{prod.name}</h4>
                    <p className="text-[11px] text-[#6F5145]">Retail: ₹{prod.price} | Stock: {prod.stock}</p>
                    {prod.isCustomizable && (
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-[#F4D2BE] text-[#B96F58] rounded-full inline-block mt-1">
                        2D Customizer Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="p-1.5 text-[#B96F58] hover:bg-[#F8E8D5] rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Orders */}
        {adminTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-[#D9A99A]/40 shadow-xs space-y-4 animate-in fade-in duration-150">
            <h3 className="font-editorial text-2xl font-bold text-[#332822]">
              Order Fulfillment & Timeline Status
            </h3>
            <div className="space-y-3">
              {adminOrders.map((ord) => (
                <div key={ord.id} className="p-4 bg-[#F8E8D5]/40 rounded-2xl border border-[#D9A99A]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <strong className="text-sm font-mono text-[#B96F58]">{ord.id}</strong>
                    <p className="text-[#332822] font-semibold">{ord.customer} — ₹{ord.total}</p>
                    <p className="text-[11px] text-[#6F5145]">Channel: {ord.type} • Date: {ord.date}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#6F5145]">Update Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                      className="px-3 py-1.5 bg-white border border-[#D9A99A] rounded-xl font-semibold text-[#332822]"
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Processing</option>
                      <option>Packed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                    <button
                      onClick={() => setSelectedOrderDetails(ord)}
                      className="px-3 py-1.5 bg-[#B96F58] text-white rounded-xl font-bold hover:bg-[#332822]"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Wholesale */}
        {adminTab === 'wholesale' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-6 border border-[#D9A99A]/40 shadow-xs space-y-4">
              <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                Wholesale Partner Applications ({wholesaleApplications.length})
              </h3>
              <div className="space-y-3 text-xs">
                {wholesaleApplications.map((app) => (
                  <div key={app.id} className="p-4 bg-[#F8E8D5]/40 rounded-2xl border border-[#D9A99A]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#332822]">{app.businessName}</strong>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-[#6F5145]">Contact: {app.contactPerson || app.name} • {app.phone} • {app.email}</p>
                      <p className="text-[#6F5145]">Location: {app.city} • Type: {app.businessType}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'APPROVED', 'silver')}
                        className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors"
                      >
                        Approve (Silver Tier)
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                        className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-xl font-bold hover:bg-rose-200 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Enquiries */}
            <div className="bg-white rounded-3xl p-6 border border-[#D9A99A]/40 shadow-xs space-y-4">
              <h3 className="font-editorial text-xl font-bold text-[#332822]">
                Custom Bulk Event Enquiries ({bulkEnquiries.length})
              </h3>
              <div className="space-y-3 text-xs">
                {bulkEnquiries.map((enq) => (
                  <div key={enq.id} className="p-4 bg-white rounded-2xl border border-[#D9A99A]/30 space-y-1">
                    <div className="flex justify-between">
                      <strong className="text-[#332822]">{enq.name} ({enq.business})</strong>
                      <span className="font-bold text-[#B96F58]">{enq.quantity} pcs of {enq.productName}</span>
                    </div>
                    <p className="text-[#6F5145]">{enq.phone} • {enq.email}</p>
                    {enq.notes && <p className="text-[11px] text-[#332822] italic">"{enq.notes}"</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Story CMS */}
        {adminTab === 'cms' && (
          <div className="bg-white rounded-3xl p-6 border border-[#D9A99A]/40 shadow-xs space-y-6 animate-in fade-in duration-150">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                  Story Section & Frame CMS
                </h3>
                <p className="text-xs text-[#6F5145]">
                  Manage cinematic visual frames and campaign stories without code changes.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {storyFrames.map((frame) => (
                <div key={frame.id} className="p-4 rounded-2xl border border-[#D9A99A]/40 flex justify-between items-center" style={{ backgroundColor: frame.bg }}>
                  <div>
                    <strong className="text-sm font-editorial text-[#332822] block">{frame.title}</strong>
                    <span className="text-[#6F5145]">{frame.subtitle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold uppercase">
                      {frame.animation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 8: Coupons */}
        {adminTab === 'coupons' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#332822]">
                  Discount Coupons & Promos ({coupons.length})
                </h3>
                <p className="text-xs text-[#6F5145]">
                  Create promotional codes and discount thresholds
                </p>
              </div>

              <button
                onClick={() => {
                  setCouponForm({ code: '', discountType: 'percentage', value: 10, minOrderAmount: 299, isActive: true });
                  setIsCouponModalOpen(true);
                }}
                className="px-4 py-2 bg-[#B96F58] text-white rounded-xl text-xs font-bold hover:bg-[#332822] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {coupons.map((c) => (
                <div key={c.id} className="p-5 bg-white rounded-3xl border border-[#D9A99A]/40 shadow-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-[#B96F58] text-sm bg-[#F8E8D5] px-2.5 py-1 rounded-xl">
                      {c.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#332822]">
                      {c.discountType === 'percentage' ? `${c.value}% OFF` : `₹${c.value} OFF`}
                    </h4>
                    <p className="text-[11px] text-[#6F5145]">Min Order: ₹{c.minOrderAmount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 9: Inventory Tracker */}
        {adminTab === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 border border-[#D9A99A]/40 shadow-xs space-y-4 animate-in fade-in duration-150">
            <h3 className="font-editorial text-2xl font-bold text-[#332822]">
              Inventory Stock & Low-Stock Alerts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#D9A99A]/30 text-[#6F5145] uppercase">
                  <tr>
                    <th className="py-2.5">Product Name</th>
                    <th>Category</th>
                    <th>Current Stock</th>
                    <th>Status</th>
                    <th>Reorder Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9A99A]/20">
                  {productList.map((p) => (
                    <tr key={p.id} className="py-2 hover:bg-[#F8E8D5]/20">
                      <td className="py-2.5 font-medium text-[#332822]">{p.name}</td>
                      <td className="text-[#6F5145] capitalize">{p.category}</td>
                      <td className="font-bold">{p.stock} units</td>
                      <td>
                        {p.stock < 50 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                            Low Stock Alert
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Healthy
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setProductList((prev) =>
                              prev.map((item) =>
                                item.id === p.id ? { ...item, stock: item.stock + 50 } : item
                              )
                            );
                            alert(`Stock updated for ${p.name} (+50 units)`);
                          }}
                          className="px-3 py-1 bg-[#6F5145] text-white rounded-lg text-[10px] font-bold hover:bg-[#332822]"
                        >
                          + Restock 50
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Media Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#332822]/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#D9A99A]/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-[#332822] text-[#F8E8D5] px-6 py-4 flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold">
                {editingMedia ? 'Edit Homepage Picture' : 'Add Homepage Picture'}
              </h3>
              <button onClick={() => setIsMediaModalOpen(false)} className="text-[#D9A99A] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMediaSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#332822]">Homepage Section Placement</label>
                <select
                  value={mediaForm.section}
                  onChange={(e) => setMediaForm({ ...mediaForm, section: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl font-semibold"
                >
                  {HOMEPAGE_SECTIONS.filter(s => s.id !== 'all').map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#332822]">Title / Headline *</label>
                  <input
                    type="text"
                    required
                    value={mediaForm.title}
                    onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#332822]">Ribbon / Tag</label>
                  <input
                    type="text"
                    value={mediaForm.tag}
                    onChange={(e) => setMediaForm({ ...mediaForm, tag: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#332822]">Subtitle / Caption</label>
                <textarea
                  rows={2}
                  value={mediaForm.subtitle}
                  onChange={(e) => setMediaForm({ ...mediaForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl resize-none"
                />
              </div>

              {/* Homepage Media Image Upload & Picker */}
              <div className="p-3.5 bg-[#F8E8D5]/30 rounded-2xl border border-[#D9A99A]/40">
                <ImageUploadPicker
                  value={mediaForm.image}
                  onChange={(newUrl) => setMediaForm({ ...mediaForm, image: newUrl })}
                  label="Homepage Photo / Asset"
                  aspectHint="Select from device, paste URL, or pick from presets"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#332822]">Store Route Link</label>
                <input
                  type="text"
                  value={mediaForm.link}
                  onChange={(e) => setMediaForm({ ...mediaForm, link: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#D9A99A]/30">
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B96F58] hover:bg-[#332822] text-white font-bold rounded-xl"
                >
                  Save Picture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#332822]/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#D9A99A]/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-[#332822] text-[#F8E8D5] px-6 py-4 flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold">
                {editingProduct ? 'Edit Product Item' : 'Add New Product Item'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-[#D9A99A] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#332822]">Product Name *</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#332822]">Retail Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl font-bold text-[#B96F58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#332822]">Stock Inventory</label>
                  <input
                    type="number"
                    required
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Product Photo Upload & Picker */}
              <div className="p-3.5 bg-[#F8E8D5]/30 rounded-2xl border border-[#D9A99A]/40">
                <ImageUploadPicker
                  value={prodForm.image}
                  onChange={(newUrl) => setProdForm({ ...prodForm, image: newUrl })}
                  label="Product Photograph"
                  aspectHint="Recommended: 1:1 Square"
                />
              </div>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-[#D9A99A]/40 bg-[#F8E8D5]/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prodForm.isCustomizable}
                  onChange={(e) => setProdForm({ ...prodForm, isCustomizable: e.target.checked })}
                  className="accent-[#B96F58] w-4 h-4 rounded"
                />
                <span className="font-bold text-[#332822]">Enable 2D Customizer</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#D9A99A]/30">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B96F58] hover:bg-[#332822] text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#332822]/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#D9A99A]/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-[#332822] text-[#F8E8D5] px-6 py-4 flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold">
                Order #{selectedOrderDetails.id}
              </h3>
              <button onClick={() => setSelectedOrderDetails(null)} className="text-[#D9A99A] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-[#FAF5EE] rounded-2xl space-y-1">
                <strong className="text-sm text-[#332822] block">{selectedOrderDetails.customer}</strong>
                <p className="text-[#6F5145]">{selectedOrderDetails.email} • {selectedOrderDetails.phone}</p>
                <p className="text-[#6F5145]">{selectedOrderDetails.address}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-[#332822] uppercase tracking-wider block">Items Summary</span>
                {selectedOrderDetails.items?.map((it, idx) => (
                  <div key={idx} className="p-3 bg-[#F8E8D5]/30 rounded-xl flex justify-between items-center">
                    <div>
                      <strong className="text-[#332822]">{it.name}</strong>
                      {it.customName && (
                        <span className="block text-[10px] text-[#B96F58] font-bold">
                          Custom Charm: "{it.customName}"
                        </span>
                      )}
                    </div>
                    <span className="font-bold">Qty: {it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#D9A99A]/30">
                <span className="font-bold text-sm">Total Paid: ₹{selectedOrderDetails.total}</span>
                <button
                  type="button"
                  onClick={() => setSelectedOrderDetails(null)}
                  className="px-5 py-2 bg-[#332822] text-[#F8E8D5] font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#332822]/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full border border-[#D9A99A]/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-[#332822] text-[#F8E8D5] px-6 py-4 flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold">Create Coupon Code</h3>
              <button onClick={() => setIsCouponModalOpen(false)} className="text-[#D9A99A] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#332822]">Promo Code *</label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. FLASH20"
                  className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl font-mono uppercase font-bold text-[#B96F58]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#332822]">Discount Type</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (₹)</option>
                    <option value="shipping">Free Shipping</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#332822]">Value</label>
                  <input
                    type="number"
                    required
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8E8D5]/20 border border-[#D9A99A]/60 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#D9A99A]/30">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B96F58] text-white font-bold rounded-xl hover:bg-[#332822]"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
