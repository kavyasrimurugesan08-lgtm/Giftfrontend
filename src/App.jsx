import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { WholesaleProvider } from './context/WholesaleContext';
import { CollectionsProvider } from './context/CollectionsContext';
import { HomepageMediaProvider } from './context/HomepageMediaContext';
import { CustomizerProvider } from './context/CustomizerContext';
import { ThemeProvider } from './context/ThemeContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { Toast } from './components/common/Toast';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetail } from './pages/ProductDetail';
import { CustomizerPage } from './pages/CustomizerPage';
import { WholesalePage } from './pages/WholesalePage';
import { CartPage, WishlistPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage, TrackOrderPage } from './pages/AccountPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { AdminDashboard } from './pages/AdminPages';
import { AboutPage, ContactPage, FAQPage } from './pages/InfoPages';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper to hide standard header/footer on distraction-free checkout
const AppLayout = () => {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isCheckout && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/new-arrivals" element={<Shop />} />
          <Route path="/best-sellers" element={<Shop />} />
          <Route path="/offers" element={<Shop />} />
          <Route path="/gift-sets" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/customized" element={<CustomizerPage />} />
          <Route path="/wholesale" element={<WholesalePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping" element={<FAQPage />} />
          <Route path="/returns" element={<FAQPage />} />
          <Route path="/privacy" element={<AboutPage />} />
          <Route path="/terms" element={<AboutPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!isCheckout && <Footer />}
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CollectionsProvider>
          <HomepageMediaProvider>
            <CustomizerProvider>
              <CartProvider>
                <WishlistProvider>
                  <WholesaleProvider>
                    <Router>
                      <AppLayout />
                    </Router>
                  </WholesaleProvider>
                </WishlistProvider>
              </CartProvider>
            </CustomizerProvider>
          </HomepageMediaProvider>
        </CollectionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
