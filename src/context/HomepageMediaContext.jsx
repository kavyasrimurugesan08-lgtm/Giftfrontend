import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_HOMEPAGE_MEDIA } from '../data/homepageMedia';

const HomepageMediaContext = createContext();

const STORAGE_KEY = 'giftpocket_homepage_media_v1';

export const HomepageMediaProvider = ({ children }) => {
  const [mediaList, setMediaList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading homepage media from storage', e);
    }
    return INITIAL_HOMEPAGE_MEDIA;
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mediaList));
    } catch (e) {
      console.error('Error saving homepage media to storage', e);
    }
  }, [mediaList]);

  // Listen to cross-origin sync bridge & storage events
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setMediaList(JSON.parse(e.newValue));
        } catch {}
      }
    };
    const handleBridgeSync = (e) => {
      if (e.detail?.key === STORAGE_KEY && e.detail?.value) {
        setMediaList(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('giftpocket_store_synced', handleBridgeSync);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('giftpocket_store_synced', handleBridgeSync);
    };
  }, []);

  // Add new media
  const addMediaItem = (item) => {
    const newItem = {
      ...item,
      id: item.id || `media-${Date.now()}`
    };
    setMediaList((prev) => [newItem, ...prev]);
  };

  // Update existing media
  const updateMediaItem = (id, updatedFields) => {
    setMediaList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  // Delete media
  const deleteMediaItem = (id) => {
    if (window.confirm('Are you sure you want to remove this picture from the homepage?')) {
      setMediaList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Reset to initial defaults
  const resetMediaItems = () => {
    if (window.confirm('Reset all homepage photography to brand defaults?')) {
      setMediaList(INITIAL_HOMEPAGE_MEDIA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Helper getters for specific sections
  const getHeroMedia = () => {
    const main = mediaList.find((m) => m.id === 'hero-main') || mediaList.find((m) => m.section === 'hero');
    const polaroid1 = mediaList.find((m) => m.id === 'hero-polaroid-1');
    const polaroid2 = mediaList.find((m) => m.id === 'hero-polaroid-2');
    return { main, polaroid1, polaroid2 };
  };

  const getMoodsMedia = () => mediaList.filter((m) => m.section === 'moods');
  const getColorChaptersMedia = () => mediaList.filter((m) => m.section === 'color-chapters');
  const getGiftMomentsMedia = () => mediaList.filter((m) => m.section === 'gift-moments');
  const getGalleryMedia = () => mediaList.filter((m) => m.section === 'gallery');

  return (
    <HomepageMediaContext.Provider
      value={{
        mediaList,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        resetMediaItems,
        getHeroMedia,
        getMoodsMedia,
        getColorChaptersMedia,
        getGiftMomentsMedia,
        getGalleryMedia
      }}
    >
      {children}
    </HomepageMediaContext.Provider>
  );
};

export const useHomepageMedia = () => {
  const context = useContext(HomepageMediaContext);
  if (!context) {
    throw new Error('useHomepageMedia must be used within a HomepageMediaProvider');
  }
  return context;
};
