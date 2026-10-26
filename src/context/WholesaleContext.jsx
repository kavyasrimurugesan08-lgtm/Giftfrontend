import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const WholesaleContext = createContext();

export const WholesaleProvider = ({ children }) => {
  const { showToast } = useCart();
  const [wholesaleApplications, setWholesaleApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_wholesale_apps');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(a => !['app-101', 'app-102'].includes(a.id));
        }
      }
    } catch {
      // safe fallback
    }
    return [];
  });

  const [bulkEnquiries, setBulkEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_bulk_enquiries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(e => !['ENQ-501'].includes(e.id));
        }
      }
    } catch {
      // safe fallback
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('giftpocket_wholesale_apps', JSON.stringify(wholesaleApplications));
  }, [wholesaleApplications]);

  useEffect(() => {
    localStorage.setItem('giftpocket_bulk_enquiries', JSON.stringify(bulkEnquiries));
  }, [bulkEnquiries]);

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
