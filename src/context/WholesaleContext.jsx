import React, { createContext, useContext, useState } from 'react';
import { useCart } from './CartContext';

const WholesaleContext = createContext();

export const WholesaleProvider = ({ children }) => {
  const { showToast } = useCart();
  const [wholesaleApplications, setWholesaleApplications] = useState([
    {
      id: "app-101",
      businessName: "Twinkle Trinkets & Crafts",
      contactPerson: "Ritika Sen",
      email: "ritika@twinkletrinkets.in",
      phone: "+91 98200 44556",
      city: "Kolkata, West Bengal",
      businessType: "Retail Gift Boutique & Online Instagram Store",
      interestedProducts: ["Phone Charms", "Keychains", "DIY Kits"],
      monthlyBudget: "₹25,000 - ₹50,000",
      status: "APPROVED",
      tier: "silver",
      submittedAt: "2026-08-20"
    },
    {
      id: "app-102",
      businessName: "Little Miracles Birthday Supplies",
      contactPerson: "Kunal Mehra",
      email: "kunal@littlemiracles.com",
      phone: "+91 97111 88990",
      city: "Jaipur, Rajasthan",
      businessType: "Event Planner & Return Gift Specialist",
      interestedProducts: ["Miniature Toys", "Radium Space Toys", "Fridge Magnets"],
      monthlyBudget: "₹10,000 - ₹20,000",
      status: "PENDING",
      tier: "standard",
      submittedAt: "2026-08-28"
    }
  ]);

  const [bulkEnquiries, setBulkEnquiries] = useState([
    {
      id: "ENQ-501",
      name: "Radhika Kulkarni",
      business: "Cherry Blossom Cafe & Shop, Pune",
      email: "radhika@cherrycafe.in",
      phone: "+91 94220 11990",
      productName: "Custom Name Pastel Phone Charm",
      quantity: 150,
      notes: "Custom name tags for cafe 3rd anniversary giveaway in Lavender theme.",
      status: "NEW",
      createdAt: "2026-08-29"
    }
  ]);

  const submitApplication = (formData) => {
    const newApp = {
      id: `app-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
      status: "PENDING",
      tier: "standard",
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setWholesaleApplications(prev => [newApp, ...prev]);
    showToast("Wholesale application received! Our team will verify within 24 hours ♡");
    return { success: true };
  };

  const submitBulkEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: `ENQ-${Math.floor(500 + Math.random() * 500)}`,
      ...enquiryData,
      status: "NEW",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBulkEnquiries(prev => [newEnquiry, ...prev]);
    showToast("Bulk quotation request sent! We will contact you with custom pricing ♡");
    return { success: true };
  };

  const updateApplicationStatus = (appId, status, tier = 'standard') => {
    setWholesaleApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, status, tier } : app))
    );
    showToast(`Application updated to ${status}`);
  };

  return (
    <WholesaleContext.Provider
      value={{
        wholesaleApplications,
        bulkEnquiries,
        submitApplication,
        submitBulkEnquiry,
        updateApplicationStatus
      }}
    >
      {children}
    </WholesaleContext.Provider>
  );
};

export const useWholesale = () => useContext(WholesaleContext);
