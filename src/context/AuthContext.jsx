import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: "usr-01",
  name: "Aanya Sharma",
  email: "aanya@example.com",
  phone: "+91 98420 13465",
  role: "CUSTOMER", // CUSTOMER | WHOLESALE | ADMIN
  wholesaleTier: null,
  addresses: [
    {
      id: "addr-1",
      name: "Aanya Sharma",
      phone: "+91 98420 13465",
      street: "Flat 402, Bloom Residency, 12th Main, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      isDefault: true
    }
  ],
  orders: [
    {
      id: "ORD-98214",
      date: "2026-08-24",
      status: "Delivered",
      total: 447,
      items: [
        { name: "Custom Name Pastel Phone Charm", quantity: 1, price: 149, customization: { name: "AANYA", color: "Pastel Lavender" } },
        { name: "DIY Bead Jewellery & Phone Charm Making Kit", quantity: 1, price: 399 }
      ],
      tracking: {
        courier: "BlueDart Express",
        trackingNumber: "BD982149812IN",
        steps: [
          { status: "Confirmed", date: "24 Aug, 10:30 AM", done: true },
          { status: "Processing & Customizing", date: "24 Aug, 02:15 PM", done: true },
          { status: "Packed in Gift Box", date: "25 Aug, 11:00 AM", done: true },
          { status: "Shipped", date: "25 Aug, 06:45 PM", done: true },
          { status: "Out for Delivery", date: "27 Aug, 09:00 AM", done: true },
          { status: "Delivered", date: "27 Aug, 02:40 PM", done: true }
        ]
      }
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_user');
      if (!saved) return DEFAULT_USER;
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === 'object' ? { ...DEFAULT_USER, ...parsed, orders: Array.isArray(parsed.orders) ? parsed.orders : DEFAULT_USER.orders, addresses: Array.isArray(parsed.addresses) ? parsed.addresses : DEFAULT_USER.addresses } : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('giftpocket_user', JSON.stringify(user));
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
      phone: "+91 98420 13465",
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
