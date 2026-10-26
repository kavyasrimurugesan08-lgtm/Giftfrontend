import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        // If it's the legacy mock user, purge it
        if (parsed.id === 'usr-01' || parsed.name === 'Aanya Sharma' || parsed.email === 'aanya@example.com') {
          localStorage.removeItem('giftpocket_user');
          return null;
        }
        const userOrders = Array.isArray(parsed.orders)
          ? parsed.orders.filter(o => o.id !== 'ORD-98214')
          : [];
        return {
          ...parsed,
          orders: userOrders,
          addresses: Array.isArray(parsed.addresses) ? parsed.addresses : []
        };
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_user');
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      return !!(parsed && parsed.id !== 'usr-01' && parsed.email !== 'aanya@example.com');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('giftpocket_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('giftpocket_user');
    }
  }, [user]);

  const login = (email, password, role = 'CUSTOMER') => {
    // If admin test login
    if (email.includes('admin') || role === 'ADMIN') {
      const adminUser = {
        id: "admin-01",
        name: "Aaditya Roy (Admin)",
        email: email || "admin@giftpocket.in",
        phone: "+91 99000 11223",
        role: "ADMIN",
        wholesaleTier: null,
        addresses: [],
        orders: []
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      return { success: true, user: adminUser };
    }

    if (email.includes('wholesale') || role === 'WHOLESALE') {
      const wholesaleUser = {
        id: "ws-01",
        name: "Pooja's Gift Boutique",
        email: email || "pooja@boutique.in",
        phone: "+91 98111 22334",
        role: "WHOLESALE",
        wholesaleTier: "silver",
        addresses: [
          {
            id: "addr-ws-1",
            name: "Pooja's Gift Boutique",
            phone: "+91 98111 22334",
            street: "Shop 14, City Centre Market, Karol Bagh",
            city: "New Delhi",
            state: "Delhi",
            pincode: "110005",
            isDefault: true
          }
        ],
        orders: []
      };
      setUser(wholesaleUser);
      setIsAuthenticated(true);
      return { success: true, user: wholesaleUser };
    }

    const regularUser = {
      id: "usr-" + Math.floor(Math.random() * 10000),
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: "",
      role: "CUSTOMER",
      wholesaleTier: null,
      addresses: [],
      orders: []
    };
    setUser(regularUser);
    setIsAuthenticated(true);
    return { success: true, user: regularUser };
  };

  const register = (userData) => {
    const newUser = {
      id: "usr-" + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "",
      role: userData.role || "CUSTOMER",
      wholesaleTier: userData.wholesaleTier || null,
      addresses: [],
      orders: []
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('giftpocket_user');
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: "Confirmed",
      total: orderData.total,
      items: orderData.items,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      tracking: {
        courier: "Delhivery Surface",
        trackingNumber: `DL${Math.floor(100000000 + Math.random() * 900000000)}IN`,
        steps: [
          { status: "Confirmed", date: "Just now", done: true },
          { status: "Processing & Customizing", date: "Pending", done: false },
          { status: "Packed in Gift Box", date: "Pending", done: false },
          { status: "Shipped", date: "Pending", done: false },
          { status: "Delivered", date: "Pending", done: false }
        ]
      }
    };

    setUser(prev => ({
      ...prev,
      orders: [newOrder, ...(prev?.orders || [])]
    }));

    return newOrder;
  };

  const updateProfile = (updated) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        addOrder,
        updateProfile,
        isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPERADMIN',
        isWholesale: user?.role === 'WHOLESALE'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
