import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, MapPin, Heart, User, LogOut, CheckCircle2, Truck, Clock, ShieldCheck, ArrowRight, Sparkles, Plus, Edit2, Check } from 'lucide-react';

export const AccountPage = () => {
  const { user, logout, updateProfile, isAuthenticated, login } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Address adding state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const orders = user?.orders || [];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone
    });
    setIsEditingProfile(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city || !newAddress.pincode) return;
    const added = {
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: (user?.addresses?.length || 0) === 0
    };
    updateProfile({
      addresses: [...(user?.addresses || []), added]
    });
    setIsAddingAddress(false);
    setNewAddress({
      name: user?.name || '',
      phone: user?.phone || '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    });
  };

  if (!user || !isAuthenticated) {
    return (
      <div className="min-h-[80vh] bg-[#F8E8D5] pt-36 sm:pt-40 pb-20 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FAF8F5] text-[#C97D67] flex items-center justify-center mx-auto shadow-md border border-[#D4C9BA]">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-editorial text-3xl font-bold text-[#121110]">Sign in to your account</h2>
          <p className="text-xs text-[#544E48]">
            Sign in to check your order history, manage saved delivery addresses, and track real-time shipments.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              to="/login"
              className="px-6 py-3 bg-[#C97D67] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#121110] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-[#FAF8F5] text-[#121110] rounded-full text-xs font-bold border border-[#D4C9BA] hover:bg-[#DFD7CB] transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Banner with Proper Spacing */}
        <div className="p-6 sm:p-8 bg-[#FAF8F5]/90 rounded-3xl border border-[#D4C9BA] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#C97D67] to-[#B06550] text-white flex items-center justify-center font-editorial font-black text-2xl sm:text-3xl shadow-md shrink-0 border border-white/40">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-editorial text-2xl sm:text-3xl font-black text-[#121110]">
                  {user?.name || "Customer Account"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-black tracking-widest bg-[#D69E4A] text-[#1A1816] uppercase border border-[#C88E35]">
                  {user?.role || "CUSTOMER"}
                </span>
              </div>
              <p className="text-xs text-[#544E48] font-medium mt-0.5 truncate">
                {user?.email || "No email on file"} {user?.phone && `• ${user.phone}`}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#717C6D] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GIFTPocket Rewards Member</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/wishlist"
              className="px-4 py-2.5 bg-[#DFD7CB] hover:bg-[#C97D67] text-[#1A1816] hover:text-white rounded-xl text-xs font-display font-bold transition-all flex items-center gap-1.5 border border-[#C8BEAF]"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist</span>
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-display font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="flex gap-2 border-b border-[#D4C9BA] pb-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'orders', name: 'My Orders', count: orders.length, icon: Package },
            { id: 'addresses', name: 'Saved Addresses', count: user?.addresses?.length || 0, icon: MapPin },
            { id: 'profile', name: 'Profile Details', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-display font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#1A1816] text-white shadow-md scale-102'
                    : 'bg-[#FAF8F5] text-[#544E48] hover:text-[#1A1816] hover:bg-[#DFD7CB] border border-[#D4C9BA]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${isActive ? 'bg-white/30 text-white' : 'bg-[#D69E4A] text-[#1A1816]'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-12 bg-[#FAF8F5]/90 rounded-3xl text-center space-y-4 border border-[#D4C9BA] shadow-sm">
                <Package className="w-12 h-12 text-[#C97D67] mx-auto opacity-70" />
                <h3 className="font-editorial text-2xl text-[#121110] font-black">No orders placed yet</h3>
                <p className="text-xs text-[#544E48] max-w-sm mx-auto">
                  Browse our handcrafted charms, matching friendship bands & keepsakes to send something special.
                </p>
                <div className="pt-2">
                  <Link
                    to="/shop"
                    className="inline-block px-7 py-3 bg-[#C97D67] hover:bg-[#1A1816] text-white rounded-full text-xs font-display font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer"
                  >
                    Explore Boutique
                  </Link>
                </div>
              </div>
            ) : (
              orders.map((ord) => {
                const totalAmount = Number(ord.total) || 0;
                return (
                  <div
                    key={ord.id}
                    className="p-6 sm:p-7 bg-[#FAF8F5]/95 rounded-3xl border border-[#D4C9BA] shadow-sm space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D4C9BA]/60 pb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-sm text-[#C97D67]">
                            Order {ord.id}
                          </span>
                          <span className="text-[10px] font-mono text-[#544E48] bg-[#EDE8E1] px-2 py-0.5 rounded-md border border-[#D4C9BA]">
                            {ord.date}
                          </span>
                        </div>
                        {ord.paymentMethod && (
                          <span className="text-[11px] text-[#544E48] block mt-0.5">
                            Payment: {ord.paymentMethod}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-black flex items-center gap-1.5 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          {ord.status || 'Confirmed'}
                        </span>
                        <span className="font-display font-black text-base text-[#121110]">
                          Total: ₹{totalAmount > 0 ? totalAmount : '148'}
                        </span>
                      </div>
                    </div>

                    {/* Order Items List with NaN Safe Price calculation */}
                    <div className="space-y-3">
                      {ord.items?.map((item, idx) => {
                        const price = Number(item.price) || Number(item.unitPrice) || 129;
                        const qty = Number(item.quantity) || 1;
                        const itemTotal = price * qty;
                        return (
                          <div key={idx} className="flex justify-between items-start py-2 border-b border-[#D4C9BA]/30 last:border-0">
                            <div>
                              <span className="font-display font-bold text-sm text-[#1A1816]">{item.name}</span>
                              <span className="text-xs font-bold text-[#544E48] ml-2">× {qty}</span>
                              {item.customization?.name && (
                                <span className="text-xs font-semibold text-[#C97D67] block mt-0.5">
                                  Custom Name: "{item.customization.name}"
                                </span>
                              )}
                              {item.customization?.colorTheme && (
                                <span className="text-[11px] text-[#544E48] block">
                                  Color: {item.customization.colorTheme}
                                </span>
                              )}
                            </div>
                            <span className="font-display font-bold text-sm text-[#1A1816]">
                              ₹{itemTotal}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tracking Timeline Component */}
                    {ord.tracking && (
                      <div className="p-4 bg-[#EDE8E1]/75 rounded-2xl border border-[#D4C9BA] space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                          <span className="font-bold text-[#1A1816] flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-[#C97D67]" />
                            Courier: {ord.tracking.courier}
                          </span>
                          <span className="font-mono text-[#544E48] bg-white/60 px-2 py-0.5 rounded border border-[#D4C9BA]">
                            AWB: {ord.tracking.trackingNumber}
                          </span>
                        </div>

                        {/* Visual Timeline Steps */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                          {ord.tracking.steps?.map((st, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-1 p-2 bg-white/60 rounded-xl border border-white/80">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  st.done
                                    ? 'bg-[#C97D67] text-white shadow-2xs'
                                    : 'bg-[#DFD7CB] text-[#544E48]'
                                }`}
                              >
                                {st.done ? '✓' : i + 1}
                              </div>
                              <span className="text-[10px] font-bold text-[#1A1816] leading-tight">
                                {st.status}
                              </span>
                              <span className="text-[9px] text-[#544E48] font-medium">{st.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-xl font-bold text-[#121110]">
                Delivery Addresses
              </h3>
              <button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="px-4 py-2 bg-[#1A1816] hover:bg-[#C97D67] text-white rounded-xl text-xs font-display font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Add Address Form */}
            {isAddingAddress && (
              <form onSubmit={handleAddAddress} className="p-6 bg-[#FAF8F5] rounded-3xl border-2 border-[#C97D67] space-y-4 animate-in fade-in">
                <h4 className="font-display font-bold text-sm text-[#1A1816]">New Delivery Location</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Recipient Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="px-3 py-2 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="px-3 py-2 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address, House/Flat No."
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="sm:col-span-2 px-3 py-2 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="px-3 py-2 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="px-3 py-2 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="px-3 py-2 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816]"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C97D67] text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                  >
                    Save Location
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user?.addresses?.map((addr) => (
                <div
                  key={addr.id}
                  className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#D4C9BA] shadow-sm space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <strong className="text-sm text-[#121110] font-bold">{addr.name}</strong>
                    {addr.isDefault && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D69E4A] text-[#1A1816] text-[10px] font-black uppercase">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[#544E48]">{addr.street}</p>
                  <p className="text-[#544E48] font-medium">{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-[#544E48] pt-1 font-bold">Contact: {addr.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile Details */}
        {activeTab === 'profile' && (
          <div className="p-8 bg-[#FAF8F5] rounded-3xl border border-[#D4C9BA] shadow-sm max-w-lg space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-[#D4C9BA]/60 pb-3">
              <h3 className="font-editorial text-xl font-black text-[#121110]">Profile Information</h3>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-1 text-[#C97D67] hover:underline font-bold"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Info</span>
                </button>
              )}
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="font-bold text-[#1A1816] block mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={isEditingProfile ? profileName : user?.name || ''}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816] disabled:bg-[#EDE8E1]/60"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A1816] block mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-3.5 py-2.5 bg-[#EDE8E1]/60 rounded-xl border border-[#D4C9BA] text-xs text-[#544E48]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A1816] block mb-1">Contact Phone Number</label>
                <input
                  type="tel"
                  disabled={!isEditingProfile}
                  value={isEditingProfile ? profilePhone : user?.phone || ''}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D4C9BA] text-xs text-[#1A1816] disabled:bg-[#EDE8E1]/60"
                />
              </div>

              {isEditingProfile && (
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C97D67] text-white rounded-xl font-bold shadow-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export const TrackOrderPage = () => {
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [searched, setSearched] = useState(false);
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    const found = user?.orders?.find(
      (o) =>
        o.id.toLowerCase() === trackingQuery.trim().toLowerCase() ||
        o.tracking?.trackingNumber?.toLowerCase() === trackingQuery.trim().toLowerCase()
    );
    setTrackedOrder(found || null);
  };

  return (
    <div className="min-h-screen pt-36 sm:pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black tracking-[0.25em] text-[#C97D67] uppercase">
            Live Shipment Status
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#121110] font-black">
            Track Your GiftPocket Package
          </h1>
          <p className="text-xs sm:text-sm text-[#544E48] max-w-md mx-auto font-medium">
            Enter your Order ID (e.g. GP-123456) or Courier AWB number to check real-time status.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
          <input
            type="text"
            required
            placeholder="e.g. GP-123456"
            value={trackingQuery}
            onChange={(e) => setTrackingQuery(e.target.value)}
            className="w-full px-4 py-3.5 bg-white rounded-2xl border border-[#D4C9BA] text-xs font-mono uppercase focus:outline-none focus:border-[#C97D67] shadow-2xs"
          />
          <button
            type="submit"
            className="px-7 py-3.5 bg-[#1A1816] text-white rounded-2xl text-xs font-display font-bold tracking-wider uppercase hover:bg-[#C97D67] transition-colors shadow-md cursor-pointer"
          >
            Track
          </button>
        </form>

        {searched && trackedOrder && (
          <div className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#D4C9BA] shadow-md space-y-4 animate-fade-in text-xs">
            <div className="flex justify-between border-b border-[#D4C9BA]/40 pb-3">
              <div>
                <strong className="text-sm text-[#121110]">Order {trackedOrder.id}</strong>
                <p className="text-[#544E48]">Carrier: {trackedOrder.tracking?.courier}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full font-bold self-start">
                {trackedOrder.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2">
              {trackedOrder.tracking?.steps?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                      step.done ? 'bg-[#C97D67] text-white' : 'bg-[#DFD7CB] text-[#544E48]'
                    }`}
                  >
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#121110]">{step.status}</p>
                    <p className="text-[11px] text-[#544E48]">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searched && !trackedOrder && (
          <div className="p-8 bg-[#FAF8F5] rounded-3xl border border-[#D4C9BA] text-center space-y-2 text-xs text-[#544E48]">
            <p className="font-bold text-[#121110] text-sm">No shipment found for "{trackingQuery}"</p>
            <p>Please double check your Order ID from your confirmation email or order history.</p>
          </div>
        )}
      </div>
    </div>
  );
};
