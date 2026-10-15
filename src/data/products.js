// Real products catalog for GIFTPocket with realistic INR pricing, wholesale tiers, variants and customization schemas

export const CATEGORIES = [
  {
    id: "phone-charms",
    name: "Bag & Phone Charms",
    slug: "phone-charms",
    description: "Handcrafted floral bell charms, customized pendants, and aesthetic lanyards.",
    icon: "Sparkles",
    color: "#F4D2BE",
    textColor: "#6F5145",
    image: "/images/products/bag-charms.jpg",
    itemCount: 24
  },
  {
    id: "bracelets",
    name: "Bracelets",
    slug: "bracelets",
    description: "Friendship cords, magnetic couple bands, and invisible crystal charms.",
    icon: "Heart",
    color: "#C9BDD8",
    textColor: "#332822",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    itemCount: 18
  },
  {
    id: "keychains",
    name: "Miniature Keychains",
    slug: "keychains",
    description: "Cute strap cartoon character keychains, name tags, and pocket keepsakes.",
    icon: "Key",
    color: "#B9C5A0",
    textColor: "#332822",
    image: "/images/products/keychains.jpg",
    itemCount: 32
  },
  {
    id: "hair-accessories",
    name: "Hair Accessories",
    slug: "hair-accessories",
    description: "Pastel flower claw clips, crystal blue hair barrettes, and vintage bows.",
    icon: "Scissors",
    color: "#D9A99A",
    textColor: "#332822",
    image: "/images/products/hair-accessories.jpg",
    itemCount: 15
  },
  {
    id: "miniature-toys",
    name: "Miniature Toys",
    slug: "miniature-toys",
    description: "Cute panda bamboo companions, pocket desk buddies, and tiny figurines.",
    icon: "Smile",
    color: "#E8D49A",
    textColor: "#6F5145",
    image: "/images/products/miniature-toys.jpg",
    itemCount: 20
  },
  {
    id: "radium-toys",
    name: "Radium & Glow Toys",
    slug: "radium-toys",
    description: "Glow-in-the-dark galaxy buddies and phosphorescent desk collectibles.",
    icon: "Moon",
    color: "#67949A",
    textColor: "#F8E8D5",
    image: "/images/products/radium-toys.jpg",
    itemCount: 12
  },
  {
    id: "invisible-jewellery",
    name: "Invisible Jewellery",
    slug: "invisible-jewellery",
    description: "Floating illusion nylon necklaces, delicate crystal pendants & aura chokers.",
    icon: "Gem",
    color: "#F8E8D5",
    textColor: "#332822",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    itemCount: 14
  },
  {
    id: "diy-kits",
    name: "DIY Kits",
    slug: "diy-kits",
    description: "All-in-one bead making, charm weaving, and keychain craft stations.",
    icon: "Palette",
    color: "#E8D49A",
    textColor: "#6F5145",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    itemCount: 9
  },
  {
    id: "fridge-magnets",
    name: "Fridge Magnets",
    slug: "fridge-magnets",
    description: "Cute bakery pastries, clay cats, and quirky nostalgia magnets.",
    icon: "Compass",
    color: "#F4D2BE",
    textColor: "#6F5145",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    itemCount: 22
  },
  {
    id: "gift-sets",
    name: "Gift Sets & Hampers",
    slug: "gift-sets",
    description: "Curated gift boxes with greeting cards, ribbons and paired treasures.",
    icon: "Gift",
    color: "#B96F58",
    textColor: "#F8E8D5",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    itemCount: 16
  }
];

export const MOODS = [
  {
    id: "birthday",
    title: "Birthday Treats",
    subtitle: "Make their special day sparkle",
    color: "#F4D2BE",
    tag: "Celebration",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    filter: "birthday"
  },
  {
    id: "besties",
    title: "For Besties",
    subtitle: "Matching charms & secret notes",
    color: "#C9BDD8",
    tag: "Friendship",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    filter: "bestie"
  },
  {
    id: "couples",
    title: "For Couples",
    subtitle: "Magnetic pairs & initials",
    color: "#D9A99A",
    tag: "Love & Romance",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
    filter: "couple"
  },
  {
    id: "just-because",
    title: "Just Because",
    subtitle: "Tiny spontaneous pick-me-ups",
    color: "#B9C5A0",
    tag: "Surprise",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80",
    filter: "cute"
  },
  {
    id: "tiny-treats",
    title: "Pocket Delights",
    subtitle: "Under ₹99 everyday magic",
    color: "#E8D49A",
    tag: "Budget Friendly",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    filter: "budget"
  },
  {
    id: "return-gifts",
    title: "Return Gifts",
    subtitle: "Bulk party favors kids love",
    color: "#67949A",
    tag: "Bulk & Wholesale",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    filter: "bulk"
  }
];

export const PRODUCTS = [
  {
    id: "gp-001",
    name: "Custom Name Pastel Phone Charm",
    slug: "custom-name-pastel-phone-charm",
    category: "phone-charms",
    price: 149,
    originalPrice: 199,
    wholesalePrice: 79,
    moq: 20,
    wholesaleTiers: [
      { minQty: 20, price: 79 },
      { minQty: 50, price: 69 },
      { minQty: 100, price: 59 }
    ],
    rating: 4.9,
    reviewCount: 142,
    badge: "BESTSELLER",
    isCustomizable: true,
    isWholesale: true,
    inStock: true,
    stock: 450,
    description: "A dreamy handcrafted pastel beaded phone charm customized with your name or initials. Features candy beads, resin stars, iridescent pearls, and a high-tensile braided nylon cord.",
    material: "Acrylic Beads, Resin Charms, High-Tensile Braided Cord",
    size: "18 cm total loop length",
    weight: "25 grams",
    care: "Wipe with a soft dry cloth. Keep away from harsh chemicals.",
    images: [
      "/images/products/bag-charms.jpg",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["bag-charm", "custom", "flower-charm", "bestseller", "gifts-for-her"],
    customizerSchema: {
      type: "phone-charm",
      letterLimit: 8,
      defaultName: "",
      colorThemes: [
        { name: "Pastel Lavender", hex: "#C9BDD8", beadPalette: ["#C9BDD8", "#F4D2BE", "#F8E8D5"] },
        { name: "Candy Peach", hex: "#F4D2BE", beadPalette: ["#F4D2BE", "#D9A99A", "#F8E8D5"] },
        { name: "Matcha Sage", hex: "#B9C5A0", beadPalette: ["#B9C5A0", "#E8D49A", "#F8E8D5"] },
        { name: "Butter Cream", hex: "#E8D49A", beadPalette: ["#E8D49A", "#F8E8D5", "#D9A99A"] }
      ],
      charmAccents: [
        { id: "bear", name: "Gummy Bear", icon: "🧸", surcharge: 0 },
        { id: "star", name: "Sparkle Star", icon: "⭐", surcharge: 0 },
        { id: "heart", name: "Puffy Heart", icon: "💖", surcharge: 0 },
        { id: "bow", name: "Ribbon Bow", icon: "🎀", surcharge: 10 }
      ]
    }
  },
  {
    id: "gp-002",
    name: "Cute Beaded Daisy Phone Charm",
    slug: "cute-beaded-daisy-phone-charm",
    category: "phone-charms",
    price: 129,
    originalPrice: 179,
    wholesalePrice: 69,
    moq: 20,
    wholesaleTiers: [
      { minQty: 20, price: 69 },
      { minQty: 50, price: 59 },
      { minQty: 100, price: 49 }
    ],
    rating: 4.8,
    reviewCount: 98,
    badge: "TRENDING",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 280,
    description: "Delicate woven daisy flower beads combined with luminous seed pearls. The perfect lightweight companion for your phone case or camera.",
    material: "Glass Seed Beads, Acrylic Daisies",
    size: "16 cm loop",
    weight: "18 grams",
    care: "Do not pull forcefully.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["daisy", "phone-charm", "floral", "cute"]
  },
  {
    id: "gp-003",
    name: "Handmade Friendship Braided Bracelet Set",
    slug: "handmade-friendship-braided-bracelet-set",
    category: "bracelets",
    price: 99,
    originalPrice: 149,
    wholesalePrice: 49,
    moq: 30,
    wholesaleTiers: [
      { minQty: 30, price: 49 },
      { minQty: 60, price: 42 },
      { minQty: 120, price: 36 }
    ],
    rating: 4.9,
    reviewCount: 210,
    badge: "HOT PICK",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 520,
    description: "Set of 2 matching adjustable macrame cords with cute metal charms. Share one with your bestie and keep one forever.",
    material: "Waterproof Wax Cord, Alloy Charm",
    size: "Adjustable 14 - 24 cm",
    weight: "12 grams",
    care: "Water resistant. Safe for daily wear.",
    images: [
      "https://images.unsplash.com/photo-1611591475152-4735d387e982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["friendship", "bracelets", "besties", "handmade"]
  },
  {
    id: "gp-004",
    name: "Magnetic Attraction Couple Bracelets",
    slug: "magnetic-attraction-couple-bracelets",
    category: "bracelets",
    price: 199,
    originalPrice: 299,
    wholesalePrice: 99,
    moq: 15,
    wholesaleTiers: [
      { minQty: 15, price: 99 },
      { minQty: 40, price: 89 },
      { minQty: 100, price: 79 }
    ],
    rating: 5.0,
    reviewCount: 340,
    badge: "BESTSELLER",
    isCustomizable: true,
    isWholesale: true,
    inStock: true,
    stock: 310,
    description: "Two complementary bracelets with half-heart magnetic bells that snap together when hands hold. Comes in a romantic Kraft gift card.",
    material: "Braided Miland Cord, Neodymium Magnet Bell",
    size: "Adjustable sliding knot",
    weight: "20 grams",
    care: "Keep magnetic charms clean.",
    images: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591475152-4735d387e982?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["couple", "love", "magnetic", "gifts-for-him", "gifts-for-her"],
    customizerSchema: {
      type: "couple-bracelet",
      letterLimit: 4,
      defaultName: "A & M",
      colorThemes: [
        { name: "Classic Midnight & Cream", hex: "#332822", beadPalette: ["#332822", "#F8E8D5"] },
        { name: "Terracotta & Sage", hex: "#B96F58", beadPalette: ["#B96F58", "#B9C5A0"] }
      ]
    }
  },
  {
    id: "gp-005",
    name: "Cute Strap Cartoon Character Keychains",
    slug: "customized-miniature-name-keychain",
    category: "keychains",
    price: 149,
    originalPrice: 199,
    wholesalePrice: 75,
    moq: 25,
    wholesaleTiers: [
      { minQty: 25, price: 75 },
      { minQty: 50, price: 65 },
      { minQty: 100, price: 55 }
    ],
    rating: 4.9,
    reviewCount: 165,
    badge: "COLLECTIBLE",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 600,
    description: "Cute 3D embossed strap keychains with charming cartoon character pendants (Tom & Jerry, Astronauts, Rabbits, Capybaras) with durable metal rings.",
    material: "Silicone Rubber Strap, 3D Resin Pendant, Alloy Ring",
    size: "10 cm strap length",
    weight: "25 grams",
    care: "Wipe clean with a damp cloth.",
    images: [
      "/images/products/keychains.jpg",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["keychain", "cartoon", "straps", "cute", "capybara"]
  },
  {
    id: "gp-006",
    name: "Mini Food Clay Keychain — Boba & Croissant",
    slug: "mini-food-clay-keychain-boba-croissant",
    category: "keychains",
    price: 79,
    originalPrice: 119,
    wholesalePrice: 39,
    moq: 40,
    wholesaleTiers: [
      { minQty: 40, price: 39 },
      { minQty: 80, price: 34 },
      { minQty: 200, price: 29 }
    ],
    rating: 4.7,
    reviewCount: 88,
    badge: "UNDER ₹99",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 400,
    description: "Hand-sculpted miniature polymer food keychain featuring glossy boba cup and freshly baked croissant with tiny bell.",
    material: "Polymer Clay, Gloss Varnish, Alloy Ring",
    size: "3.5 cm",
    weight: "15 grams",
    care: "Keep away from high heat.",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["food-keychain", "boba", "croissant", "clay", "cute"]
  },
  {
    id: "gp-007",
    name: "Pastel Flower Claw Clip & Barrette Set",
    slug: "pastel-daisy-bow-hair-clip-set",
    category: "hair-accessories",
    price: 129,
    originalPrice: 189,
    wholesalePrice: 65,
    moq: 20,
    wholesaleTiers: [
      { minQty: 20, price: 65 },
      { minQty: 50, price: 55 },
      { minQty: 100, price: 45 }
    ],
    rating: 4.8,
    reviewCount: 112,
    badge: "HOT COLLECTION",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 350,
    description: "Iridescent blue floral claw clips, daisy hair barrettes, and soft plush hair clamps in assorted pastel oceanic shades.",
    material: "Acrylic Resin, Gold Trims, Stainless Steel Spring",
    size: "6 cm - 8 cm each",
    weight: "25 grams",
    care: "Store in a dry vanity pouch.",
    images: [
      "/images/products/hair-accessories.jpg",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["hair-clip", "accessories", "floral", "claw-clip"]
  },
  {
    id: "gp-008",
    name: "Miniature Panda & Bamboo Figurines Set",
    slug: "miniature-whimsical-garden-animal-toy",
    category: "miniature-toys",
    price: 99,
    originalPrice: 149,
    wholesalePrice: 49,
    moq: 30,
    wholesaleTiers: [
      { minQty: 30, price: 49 },
      { minQty: 60, price: 42 },
      { minQty: 150, price: 35 }
    ],
    rating: 4.9,
    reviewCount: 76,
    badge: "DESK BUDDY",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 500,
    description: "Cute miniature panda figurines eating green bamboo shoots, sleeping on logs, and holding lucky rocks for desks, car dashboards, or planters.",
    material: "Resin, Hand-Painted Detailing",
    size: "3 cm - 4 cm height",
    weight: "18 grams each",
    care: "Wipe with a soft cloth.",
    images: [
      "/images/products/miniature-toys.jpg",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["panda", "miniature", "desk-decor", "toy", "cute"]
  },
  {
    id: "gp-009",
    name: "Glow-in-the-Dark Radium Pocket Creatures",
    slug: "glow-in-the-dark-radium-space-astronaut-toy",
    category: "radium-toys",
    price: 149,
    originalPrice: 220,
    wholesalePrice: 79,
    moq: 25,
    wholesaleTiers: [
      { minQty: 25, price: 79 },
      { minQty: 50, price: 69 },
      { minQty: 100, price: 59 }
    ],
    rating: 5.0,
    reviewCount: 194,
    badge: "GLOWS AT NIGHT",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 220,
    description: "Assorted translucent pocket creatures (turtles, ducks, bunnies, bears) that absorb light and glow brightly with magical phosphorescence at night.",
    material: "Phosphorescent Strontium Aluminate Resin",
    size: "2.5 cm - 3.5 cm",
    weight: "10 grams each",
    care: "Rechargeable under sunlight or flashlight indefinitely.",
    images: [
      "/images/products/radium-toys.jpg",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["radium", "glow-in-the-dark", "miniature", "toys", "glowing"]
  },
  {
    id: "gp-010",
    name: "Invisible Crystal Aura Floating Choker",
    slug: "invisible-crystal-aura-floating-choker",
    category: "invisible-jewellery",
    price: 199,
    originalPrice: 299,
    wholesalePrice: 110,
    moq: 15,
    wholesaleTiers: [
      { minQty: 15, price: 110 },
      { minQty: 30, price: 95 },
      { minQty: 80, price: 85 }
    ],
    rating: 4.9,
    reviewCount: 84,
    badge: "ETHEREAL",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 180,
    description: "An ultra-fine illusion transparent nylon line with a floating iridescent Austrian crystal pendant that rests weightlessly on your collarbone.",
    material: "Transparent Monofilament, 8mm Aurora Borealis Crystal, 925 Silver Clasp",
    size: "38 cm + 5 cm extension chain",
    weight: "5 grams",
    care: "Store flat to prevent kinking.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["invisible-jewellery", "crystal", "necklace", "minimalist"]
  },
  {
    id: "gp-011",
    name: "DIY Bead Jewellery & Phone Charm Making Kit",
    slug: "diy-bead-jewellery-phone-charm-making-kit",
    category: "diy-kits",
    price: 399,
    originalPrice: 599,
    wholesalePrice: 220,
    moq: 10,
    wholesaleTiers: [
      { minQty: 10, price: 220 },
      { minQty: 25, price: 195 },
      { minQty: 50, price: 175 }
    ],
    rating: 4.9,
    reviewCount: 312,
    badge: "BEST VALUE BUNDLE",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 150,
    description: "Complete 15-grid organizer packed with over 600+ pastel beads, alphabet letter tiles, candy charms, elastic cords, phone lanyard strings, and a mini safety scissor.",
    material: "Acrylic Beads, Elastic Fiber, Storage Case",
    size: "17 cm x 10 cm x 2.2 cm organizer box",
    weight: "210 grams",
    care: "Contains small parts. Recommended age 6+.",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["diy-kit", "crafts", "beads", "starter-set", "creative"]
  },
  {
    id: "gp-012",
    name: "Handcrafted Ceramic Cute Toast Fridge Magnet",
    slug: "handcrafted-ceramic-cute-toast-fridge-magnet",
    category: "fridge-magnets",
    price: 79,
    originalPrice: 120,
    wholesalePrice: 39,
    moq: 40,
    wholesaleTiers: [
      { minQty: 40, price: 39 },
      { minQty: 80, price: 33 },
      { minQty: 200, price: 28 }
    ],
    rating: 4.8,
    reviewCount: 65,
    badge: "UNDER ₹99",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 390,
    description: "Smile-faced buttered toast 3D ceramic fridge magnet with a strong neodymium magnetic back. Holds up to 5 sheets of paper easily.",
    material: "Glazed Ceramic, Neodymium Magnet",
    size: "4 cm x 4 cm",
    weight: "30 grams",
    care: "Fragile if dropped on tile floor.",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["magnet", "fridge", "toast", "home-decor", "kitchen"]
  },
  {
    id: "gp-013",
    name: "Personalized Birthday Keepsake Gift Hamper",
    slug: "personalized-birthday-keepsake-gift-hamper",
    category: "gift-sets",
    price: 499,
    originalPrice: 799,
    wholesalePrice: 299,
    moq: 8,
    wholesaleTiers: [
      { minQty: 8, price: 299 },
      { minQty: 20, price: 265 },
      { minQty: 50, price: 235 }
    ],
    rating: 5.0,
    reviewCount: 220,
    badge: "GIFT HAMPER",
    isCustomizable: true,
    isWholesale: true,
    inStock: true,
    stock: 95,
    description: "Includes: 1 Customized Name Phone Charm + 1 Friendship Bracelet + 1 Miniature Glow Toy + 1 Handcrafted Fridge Magnet + Birthday Greeting Card in a ribbon-tied Kraft gift box.",
    material: "Curated Mixed Mediums in Sustainable Gift Box",
    size: "20 cm x 15 cm x 5 cm box",
    weight: "320 grams",
    care: "Ready-to-gift packaging.",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["gift-set", "birthday", "hamper", "personalized", "custom"],
    customizerSchema: {
      type: "gift-set",
      letterLimit: 8,
      defaultName: "RIYA",
      colorThemes: [
        { name: "Sunset Pink & Cream", hex: "#D9A99A" },
        { name: "Ocean Breeze", hex: "#67949A" }
      ]
    }
  },
  {
    id: "gp-014",
    name: "Best Friend Forever (BFF) Gift Box Set",
    slug: "best-friend-forever-gift-box-set",
    category: "gift-sets",
    price: 399,
    originalPrice: 549,
    wholesalePrice: 240,
    moq: 10,
    wholesaleTiers: [
      { minQty: 10, price: 240 },
      { minQty: 25, price: 210 },
      { minQty: 60, price: 185 }
    ],
    rating: 4.9,
    reviewCount: 180,
    badge: "BESTIE FAVOURITE",
    isCustomizable: false,
    isWholesale: true,
    inStock: true,
    stock: 140,
    description: "Includes 2 matching friendship bracelets, 2 mini boba keychains, and 2 cute handwritten postcard notes packed in an aesthetic pastel duo-box.",
    material: "Mixed Crafted Keepsakes",
    size: "18 cm x 12 cm box",
    weight: "240 grams",
    care: "Gift ready.",
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["bestie", "bff", "gift-set", "matching"]
  },
  {
    id: "gp-015",
    name: "Couple Love Story Keepsake Combo",
    slug: "couple-love-story-keepsake-combo",
    category: "gift-sets",
    price: 449,
    originalPrice: 650,
    wholesalePrice: 270,
    moq: 8,
    wholesaleTiers: [
      { minQty: 8, price: 270 },
      { minQty: 20, price: 240 },
      { minQty: 50, price: 210 }
    ],
    rating: 5.0,
    reviewCount: 155,
    badge: "VALENTINE & ANNIVERSARY",
    isCustomizable: true,
    isWholesale: true,
    inStock: true,
    stock: 110,
    description: "Magnetic couple bracelets + 2 engraved initial acrylic keychains + Mini anniversary message parchment wrapped with wax seal.",
    material: "Miland Cord, Acrylic, Parchment, Wax Seal",
    size: "Aesthetic Kraft Gift Box",
    weight: "260 grams",
    care: "Handle wax seal gently.",
    images: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["couple", "combo", "anniversary", "love-story"],
    customizerSchema: {
      type: "couple-combo",
      letterLimit: 6,
      defaultName: "S & V",
      colorThemes: [
        { name: "Earthy Terracotta & Cream", hex: "#B96F58" }
      ]
    }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "The custom phone charm with my name 'ANANYA' is even cuter in person! The pastel beads look so aesthetic on my phone case. Received compliments all day at college!",
    productName: "Custom Name Pastel Phone Charm",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Rohan & Sneha",
    location: "Bengaluru, Karnataka",
    rating: 5,
    review: "We ordered the magnetic couple bracelets for our anniversary. The little magnetic click when our hands brush is the sweetest detail. Packaging was 10/10!",
    productName: "Magnetic Attraction Couple Bracelets",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Pooja Verma",
    location: "Delhi NCR",
    rating: 5,
    review: "I run a boutique stationary & gift stall. I bought 50 pcs wholesale of the mini food keychains and radium astronauts — they sold out in 3 days! Outstanding wholesale margins.",
    productName: "Wholesale Partner (Silver Tier)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }
];

export const WHOLESALE_TIERS = [
  {
    id: "standard",
    name: "Standard Reseller",
    badge: "BRONZE",
    minMonthlyOrder: "₹5,000",
    discount: "Up to 50% Off Retail",
    perks: [
      "Access to base wholesale pricing",
      "Low MOQ (starts at 20-30 pcs)",
      "Standard insured courier delivery",
      "GST Invoice support"
    ]
  },
  {
    id: "silver",
    name: "Silver Partner",
    badge: "SILVER",
    minMonthlyOrder: "₹20,000",
    discount: "Additional 5% Off Wholesale",
    perks: [
      "Priority dispatch in 24 hours",
      "Free display stand cards for retail stalls",
      "Early preview access for new seasonal launches",
      "Custom gift tag branding options"
    ]
  },
  {
    id: "gold",
    name: "Gold Distributor",
    badge: "GOLD",
    minMonthlyOrder: "₹50,000",
    discount: "Additional 10% Off Wholesale",
    perks: [
      "Dedicated account manager & WhatsApp support",
      "Zero MOQ on re-orders",
      "Free express air shipping across India",
      "Custom product formulation & design support"
    ]
  },
  {
    id: "premium",
    name: "Institutional & Bulk",
    badge: "PLATINUM",
    minMonthlyOrder: "₹1,00,000+",
    discount: "Custom Factory Quotes",
    perks: [
      "White-label / Private-label packaging",
      "Direct artisan manufacturing batch",
      "Flexible credit payment terms (post-KYC)",
      "Custom laser branding & exclusive collections"
    ]
  }
];
