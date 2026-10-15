export const THEME_PRESETS = [
  {
    id: "classic-peach",
    name: "Editorial Linen & Earth (FLEMY)",
    description: "Signature high-fashion editorial aesthetic: warm linen oat, olive sage slate, ochre gold, and terracotta clay.",
    isDark: false,
    previewHex: "#717C6D",
    colors: {
      primary: "#C97D67",           // Terracotta Clay
      primaryHover: "#B06550",
      primaryText: "#FFFFFF",
      secondary: "#DFD7CB",         // Warm Sandstone Oat
      secondaryText: "#1A1816",
      background: "#EDE8E1",        // High-end Linen Canvas
      surface: "#FFFFFF",
      surfaceText: "#1A1816",
      textPrimary: "#1A1816",       // Jet Noir Editorial Typography
      textSecondary: "#544E48",     // Refined Stone Gray
      accent: "#D69E4A",            // Ochre Honey Amber
      border: "#D4C9BA",            // Linen Border
      navBg: "rgba(237, 232, 225, 0.65)",
      cardBg: "#FAF8F5"
    }
  },
  {
    id: "matcha-sage",
    name: "Olive Sage & Botanical",
    description: "Muted olive sage slate, organic matcha tone, and clean oat linen.",
    isDark: false,
    previewHex: "#717C6D",
    colors: {
      primary: "#717C6D",
      primaryHover: "#5B6658",
      primaryText: "#FFFFFF",
      secondary: "#DCE3D8",
      secondaryText: "#1A2218",
      background: "#ECEFEA",
      surface: "#FFFFFF",
      surfaceText: "#1A2218",
      textPrimary: "#141C12",
      textSecondary: "#4A5647",
      accent: "#D69E4A",
      border: "#C2CCC0",
      navBg: "rgba(236, 239, 234, 0.7)",
      cardBg: "#FFFFFF"
    }
  },
  {
    id: "butter-cream",
    name: "Ochre Gold & Warm Amber",
    description: "Rich honey mustard, warm sandstone, and golden hour aesthetic.",
    isDark: false,
    previewHex: "#D69E4A",
    colors: {
      primary: "#D69E4A",
      primaryHover: "#B87F28",
      primaryText: "#FFFFFF",
      secondary: "#F3E6D0",
      secondaryText: "#2C1E0A",
      background: "#F5EFE4",
      surface: "#FFFFFF",
      surfaceText: "#211709",
      textPrimary: "#211709",
      textSecondary: "#594324",
      accent: "#C97D67",
      border: "#E0D0B6",
      navBg: "rgba(245, 239, 228, 0.7)",
      cardBg: "#FFFFFF"
    }
  },
  {
    id: "lavender-dream",
    name: "Lilac Amethyst & Sand",
    description: "Soft lilac sphere purple, cool amethyst, and minimalist sandstone.",
    isDark: false,
    previewHex: "#9E8EB8",
    colors: {
      primary: "#9E8EB8",
      primaryHover: "#8472A0",
      primaryText: "#FFFFFF",
      secondary: "#EAE5F2",
      secondaryText: "#2A203A",
      background: "#F3EFF7",
      surface: "#FFFFFF",
      surfaceText: "#1A1424",
      textPrimary: "#1A1424",
      textSecondary: "#524468",
      accent: "#D69E4A",
      border: "#D2C7E0",
      navBg: "rgba(243, 239, 247, 0.7)",
      cardBg: "#FFFFFF"
    }
  },
  {
    id: "strawberry-rose",
    name: "Terracotta Blush & Clay",
    description: "Earthy terracotta clay, coral blush, and warm linen.",
    isDark: false,
    previewHex: "#C97D67",
    colors: {
      primary: "#C97D67",
      primaryHover: "#B06550",
      primaryText: "#FFFFFF",
      secondary: "#F5DFD8",
      secondaryText: "#381B13",
      background: "#FAF1EE",
      surface: "#FFFFFF",
      surfaceText: "#24110C",
      textPrimary: "#24110C",
      textSecondary: "#5E3B32",
      accent: "#717C6D",
      border: "#E5C5BC",
      navBg: "rgba(250, 241, 238, 0.7)",
      cardBg: "#FFFFFF"
    }
  },
  {
    id: "ocean-breeze",
    name: "Nordic Slate & Marine",
    description: "Muted marine slate, crisp sea glass, and pure oat white.",
    isDark: false,
    previewHex: "#4A7C87",
    colors: {
      primary: "#4A7C87",
      primaryHover: "#37626C",
      primaryText: "#FFFFFF",
      secondary: "#DCE9EC",
      secondaryText: "#12252A",
      background: "#EEF4F5",
      surface: "#FFFFFF",
      surfaceText: "#0E1C20",
      textPrimary: "#0E1C20",
      textSecondary: "#3E575E",
      accent: "#D69E4A",
      border: "#BFCFD3",
      navBg: "rgba(238, 244, 245, 0.7)",
      cardBg: "#FFFFFF"
    }
  },
  {
    id: "midnight-gold",
    name: "Editorial Velvet Noir",
    description: "High-fashion jet obsidian noir, warm linen accents, and luminous ochre gold.",
    isDark: true,
    previewHex: "#D69E4A",
    colors: {
      primary: "#D69E4A",
      primaryHover: "#BF8732",
      primaryText: "#14100C",
      secondary: "#28231E",
      secondaryText: "#EDE8E1",
      background: "#141210",
      surface: "#1F1C18",
      surfaceText: "#FAF8F5",
      textPrimary: "#FAF8F5",
      textSecondary: "#D4CBBF",
      accent: "#C97D67",
      border: "#3B352E",
      navBg: "rgba(20, 18, 16, 0.75)",
      cardBg: "rgba(31, 28, 24, 0.85)"
    }
  }
];

export const getPresetById = (id) => {
  return THEME_PRESETS.find((p) => p.id === id) || THEME_PRESETS[0];
};

export const DEFAULT_THEME = THEME_PRESETS[0];
