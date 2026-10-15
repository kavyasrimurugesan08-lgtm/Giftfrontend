export const INITIAL_CUSTOMIZER_THEMES = [
  {
    id: "theme-lavender",
    name: "Pastel Lavender",
    hex: "#C9BDD8",
    textColor: "#332822",
    beadPalette: ["#C9BDD8", "#F4D2BE", "#F8E8D5"],
    description: "Dreamy lavender cords with cream accent beads",
    isActive: true
  },
  {
    id: "theme-peach",
    name: "Candy Peach",
    hex: "#F4D2BE",
    textColor: "#6F5145",
    beadPalette: ["#F4D2BE", "#D9A99A", "#F8E8D5"],
    description: "Warm sunset peach beads and golden accents",
    isActive: true
  },
  {
    id: "theme-sage",
    name: "Matcha Sage",
    hex: "#B9C5A0",
    textColor: "#332822",
    beadPalette: ["#B96F58", "#E8D49A", "#F8E8D5"],
    description: "Earthy matcha green with cozy butter cream beads",
    isActive: true
  },
  {
    id: "theme-butter",
    name: "Butter Cream",
    hex: "#E8D49A",
    textColor: "#6F5145",
    beadPalette: ["#E8D49A", "#F8E8D5", "#D9A99A"],
    description: "Sunny butter yellow and iridescent glass pearls",
    isActive: true
  },
  {
    id: "theme-bubblegum",
    name: "Bubblegum Pink",
    hex: "#D9A99A",
    textColor: "#332822",
    beadPalette: ["#D9A99A", "#F4D2BE", "#C9BDD8"],
    description: "Sweet strawberry milk tones with silver stars",
    isActive: true
  }
];

export const INITIAL_CUSTOMIZER_SHAPES = [
  { id: "round", name: "Classic Round", icon: "Circle", isActive: true },
  { id: "heart", name: "Sweetheart", icon: "Heart", isActive: true },
  { id: "square", name: "Modern Square", icon: "Square", isActive: true },
  { id: "star", name: "Cosmic Star", icon: "Sparkles", isActive: true }
];

export const INITIAL_CUSTOMIZER_CONFIG = {
  studioTitle: "The Customization Studio",
  studioSubtitle: "Handmade Just For You",
  studioDescription: "Choose a canvas below, pick your pastel bead palettes, spell out your letters, and preview your creation live in real-time.",
  maxLetterLength: 10,
  defaultLetterText: "SMILE",
  charPriceExtra: 0,
  photoUploadEnabled: true,
  inspirationPrompts: [
    { id: "p1", tag: "💖 Bestie Initials", example: 'e.g. "RIA & AMY"' },
    { id: "p2", tag: "⭐ Lucky Word", example: 'e.g. "MAGIC", "HOPE"' },
    { id: "p3", tag: "🧸 Cute Nicknames", example: 'e.g. "BOBA", "SUNNY"' },
    { id: "p4", tag: "🎂 Special Date", example: 'e.g. "24.08.26"' }
  ]
};
