import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/products';

const CollectionsContext = createContext();

const STORAGE_KEY = 'giftpocket_collections_v1';

export const CollectionsProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading collections from storage', e);
    }
    return INITIAL_CATEGORIES;
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
      localStorage.setItem('giftpocket_admin_categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving collections to storage', e);
    }
  }, [categories]);

  // Listen to cross-origin sync bridge & storage events
  useEffect(() => {
    const handleStorage = (e) => {
      if ((e.key === STORAGE_KEY || e.key === 'giftpocket_admin_categories') && e.newValue) {
        try {
          setCategories(JSON.parse(e.newValue));
        } catch {}
      }
    };
    const handleBridgeSync = (e) => {
      if ((e.detail?.key === STORAGE_KEY || e.detail?.key === 'giftpocket_admin_categories') && e.detail?.value) {
        setCategories(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('giftpocket_store_synced', handleBridgeSync);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('giftpocket_store_synced', handleBridgeSync);
    };
  }, []);

  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingCategory(null);
    setIsEditModalOpen(false);
  };

  const updateCategory = (categoryId, updatedFields) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, ...updatedFields } : cat))
    );
    closeEditModal();
  };

  const addCategory = (newCat) => {
    const slug = (newCat.name || 'new-collection')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const category = {
      id: `col-${Date.now()}`,
      slug,
      name: newCat.name || 'New Collection',
      description: newCat.description || 'Handcrafted bespoke collection.',
      icon: newCat.icon || 'Sparkles',
      color: newCat.color || '#F4D2BE',
      textColor: newCat.textColor || '#332822',
      image: newCat.image || '/images/products/bag-charms.jpg',
      itemCount: parseInt(newCat.itemCount || 10, 10),
      ...newCat
    };

    setCategories((prev) => [category, ...prev]);
    closeEditModal();
  };

  const deleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
      if (editingCategory?.id === categoryId) {
        closeEditModal();
      }
    }
  };

  const resetCategories = () => {
    if (window.confirm('Reset all collections to initial defaults?')) {
      setCategories(INITIAL_CATEGORIES);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <CollectionsContext.Provider
      value={{
        categories,
        editingCategory,
        isEditModalOpen,
        isEditMode,
        setIsEditMode,
        openEditModal,
        closeEditModal,
        updateCategory,
        addCategory,
        deleteCategory,
        resetCategories
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
};
