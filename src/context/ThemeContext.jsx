import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEME_PRESETS, DEFAULT_THEME } from '../data/themePresets';
import { generateThemeTokens } from '../utils/contrastUtils';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('giftpocket_store_theme_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_THEME;
  });

  // Calculate and apply all mathematical semantic design tokens to DOM
  const applyThemeToDOM = (themeObj) => {
    if (!themeObj) return;
    const root = document.documentElement;
    const tokens = generateThemeTokens(themeObj.colors || {});

    // Set Theme Mode attribute for CSS selectors
    root.setAttribute('data-theme-mode', tokens.isDark ? 'dark' : 'light');

    // 1. Semantic Design Tokens
    root.style.setProperty('--background', tokens.background);
    root.style.setProperty('--foreground', tokens.foreground);
    root.style.setProperty('--heading', tokens.heading);
    root.style.setProperty('--muted-foreground', tokens.foregroundMuted);
    
    root.style.setProperty('--surface', tokens.surface);
    root.style.setProperty('--surface-foreground', tokens.surfaceForeground);
    root.style.setProperty('--surface-muted', tokens.surfaceMuted);

    root.style.setProperty('--primary', tokens.primary);
    root.style.setProperty('--primary-hover', tokens.primaryHover);
    root.style.setProperty('--primary-foreground', tokens.primaryForeground);

    root.style.setProperty('--secondary', tokens.secondary);
    root.style.setProperty('--secondary-foreground', tokens.secondaryForeground);

    root.style.setProperty('--accent', tokens.accent);
    root.style.setProperty('--accent-foreground', tokens.accentForeground);

    root.style.setProperty('--border', tokens.border);
    root.style.setProperty('--nav-bg', tokens.navBackground);
    root.style.setProperty('--nav-fg', tokens.navForeground);
    root.style.setProperty('--nav-muted', tokens.navMuted);

    root.style.setProperty('--input-bg', tokens.inputBackground);
    root.style.setProperty('--input-fg', tokens.inputForeground);
    root.style.setProperty('--input-border', tokens.inputBorder);

    // 2. Backward Compatible Palette Properties
    root.style.setProperty('--color-warm-cream', tokens.background);
    root.style.setProperty('--color-terracotta', tokens.primary);
    root.style.setProperty('--color-soft-peach', tokens.secondary);
    root.style.setProperty('--color-dark-chocolate', tokens.heading);
    root.style.setProperty('--color-warm-brown', tokens.foregroundMuted);
    root.style.setProperty('--color-dusty-pink', tokens.border);
    root.style.setProperty('--color-butter-yellow', tokens.accent);

    // 3. Directly style root body
    document.body.style.backgroundColor = tokens.background;
    document.body.style.color = tokens.foreground;
  };

  // Sync to DOM and LocalStorage
  useEffect(() => {
    applyThemeToDOM(currentTheme);
    try {
      localStorage.setItem('giftpocket_store_theme_v1', JSON.stringify(currentTheme));
    } catch {
      // safe fallback
    }
  }, [currentTheme]);

  // Listen to cross-tab storage, window events & sync bridge
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'giftpocket_store_theme_v1' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setCurrentTheme(parsed);
          applyThemeToDOM(parsed);
        } catch {}
      }
    };

    const handleBridgeSync = (e) => {
      if (e.detail?.key === 'giftpocket_store_theme_v1' && e.detail?.value) {
        setCurrentTheme(e.detail.value);
        applyThemeToDOM(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('giftpocket_store_synced', handleBridgeSync);
    window.addEventListener('giftpocket_theme_change', (e) => {
      if (e.detail) {
        setCurrentTheme(e.detail);
        applyThemeToDOM(e.detail);
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('giftpocket_store_synced', handleBridgeSync);
    };
  }, []);

  const applyPreset = (presetId) => {
    const found = THEME_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setCurrentTheme(found);
      applyThemeToDOM(found);
      window.dispatchEvent(new CustomEvent('giftpocket_theme_change', { detail: found }));
    }
  };

  const updateCustomColors = (newColors) => {
    const mergedColors = {
      ...currentTheme.colors,
      ...newColors
    };

    const updatedTheme = {
      ...currentTheme,
      id: 'custom',
      name: 'Custom Tailored Theme',
      description: 'Hand-picked brand colors configured in Admin Control Centre.',
      previewHex: mergedColors.primary,
      colors: mergedColors
    };

    setCurrentTheme(updatedTheme);
    applyThemeToDOM(updatedTheme);
    window.dispatchEvent(new CustomEvent('giftpocket_theme_change', { detail: updatedTheme }));
  };

  const resetTheme = () => {
    setCurrentTheme(DEFAULT_THEME);
    applyThemeToDOM(DEFAULT_THEME);
    window.dispatchEvent(new CustomEvent('giftpocket_theme_change', { detail: DEFAULT_THEME }));
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        applyPreset,
        updateCustomColors,
        resetTheme,
        presets: THEME_PRESETS
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
