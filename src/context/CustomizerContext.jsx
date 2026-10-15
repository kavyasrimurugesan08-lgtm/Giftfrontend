import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CUSTOMIZER_THEMES,
  INITIAL_CUSTOMIZER_SHAPES,
  INITIAL_CUSTOMIZER_CONFIG
} from '../data/customizerData';

const CustomizerContext = createContext();

export const CustomizerProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('giftpocket_customizer_config_v1');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMIZER_CONFIG;
  });

  const [themes, setThemes] = useState(() => {
    const saved = localStorage.getItem('giftpocket_customizer_themes_v1');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMIZER_THEMES;
  });

  const [shapes, setShapes] = useState(() => {
    const saved = localStorage.getItem('giftpocket_customizer_shapes_v1');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMIZER_SHAPES;
  });

  // LocalStorage Persistence
  useEffect(() => {
    localStorage.setItem('giftpocket_customizer_config_v1', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('giftpocket_customizer_themes_v1', JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem('giftpocket_customizer_shapes_v1', JSON.stringify(shapes));
  }, [shapes]);

  // Listen to cross-origin sync bridge & storage events
  useEffect(() => {
    const handleStorage = (e) => {
      if (!e.newValue) return;
      try {
        if (e.key === 'giftpocket_customizer_config_v1') setConfig(JSON.parse(e.newValue));
        if (e.key === 'giftpocket_customizer_themes_v1') setThemes(JSON.parse(e.newValue));
        if (e.key === 'giftpocket_customizer_shapes_v1') setShapes(JSON.parse(e.newValue));
      } catch {}
    };
    const handleBridgeSync = (e) => {
      if (!e.detail?.value) return;
      if (e.detail.key === 'giftpocket_customizer_config_v1') setConfig(e.detail.value);
      if (e.detail.key === 'giftpocket_customizer_themes_v1') setThemes(e.detail.value);
      if (e.detail.key === 'giftpocket_customizer_shapes_v1') setShapes(e.detail.value);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('giftpocket_store_synced', handleBridgeSync);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('giftpocket_store_synced', handleBridgeSync);
    };
  }, []);

  // Config actions
  const updateConfig = (newConfig) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Theme CRUD
  const addTheme = (themeData) => {
    const newTheme = {
      ...themeData,
      id: `theme-${Date.now()}`,
      isActive: true
    };
    setThemes((prev) => [...prev, newTheme]);
  };

  const updateTheme = (themeId, updatedData) => {
    setThemes((prev) =>
      prev.map((t) => (t.id === themeId ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTheme = (themeId) => {
    setThemes((prev) => prev.filter((t) => t.id !== themeId));
  };

  const resetThemes = () => {
    setThemes(INITIAL_CUSTOMIZER_THEMES);
  };

  // Shapes Toggle
  const toggleShape = (shapeId) => {
    setShapes((prev) =>
      prev.map((s) => (s.id === shapeId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // Prompt actions
  const addPrompt = (promptData) => {
    const newP = {
      ...promptData,
      id: `p-${Date.now()}`
    };
    setConfig((prev) => ({
      ...prev,
      inspirationPrompts: [...(prev.inspirationPrompts || []), newP]
    }));
  };

  const deletePrompt = (promptId) => {
    setConfig((prev) => ({
      ...prev,
      inspirationPrompts: (prev.inspirationPrompts || []).filter((p) => p.id !== promptId)
    }));
  };

  const resetAll = () => {
    setConfig(INITIAL_CUSTOMIZER_CONFIG);
    setThemes(INITIAL_CUSTOMIZER_THEMES);
    setShapes(INITIAL_CUSTOMIZER_SHAPES);
  };

  return (
    <CustomizerContext.Provider
      value={{
        config,
        themes,
        shapes,
        updateConfig,
        addTheme,
        updateTheme,
        deleteTheme,
        resetThemes,
        toggleShape,
        addPrompt,
        deletePrompt,
        resetAll
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
