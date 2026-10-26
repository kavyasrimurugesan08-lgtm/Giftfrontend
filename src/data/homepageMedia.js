// Clean Media Catalog for All Sections of GIFTPocket Home Page — Only Approved User-Uploaded Photos

export const INITIAL_HOMEPAGE_MEDIA = [
  // 01 — HERO CINEMATIC PICTURES
  {
    id: "hero-main",
    section: "hero",
    sectionName: "Hero Cinematic",
    title: "Pastel Beaded Tulip Phone Charm",
    subtitle: "Handmade pastel charms with golden chimes",
    tag: "Primary Hero Focus",
    image: "/uploads/products/phone-charm-pastel-tulip.jpg",
    link: "/shop?filter=bestseller",
    aspect: "portrait"
  },
  {
    id: "hero-polaroid-1",
    section: "hero",
    sectionName: "Hero Cinematic",
    title: "Floral Bell Charm Lanyards",
    subtitle: "Handcrafted flower bell charms with chiming bells",
    tag: "Floating Polaroid 1",
    image: "/uploads/products/flower-bell-charms.jpg",
    link: "/shop?category=phone-charms",
    aspect: "square"
  },
  {
    id: "hero-polaroid-2",
    section: "hero",
    sectionName: "Hero Cinematic",
    title: "Handcrafted Silver Bell Jumkas",
    subtitle: "Oxidized traditional jhumki earrings",
    tag: "Floating Polaroid 2",
    image: "/uploads/products/earrings-silver-jhumka.jpg",
    link: "/shop?category=jumkas",
    aspect: "square"
  },

  // 02 — SHOP BY MOOD PICTURES
  {
    id: "mood-birthday",
    section: "moods",
    sectionName: "Shop by Mood",
    title: "Birthday Treats",
    subtitle: "Make their special day sparkle with ready gift hampers",
    tag: "Celebration",
    color: "#F4D2BE",
    image: "/uploads/products/pastel-flower-claw-clip-set.jpg",
    link: "/shop?mood=birthday",
    aspect: "landscape"
  },
  {
    id: "mood-besties",
    section: "moods",
    sectionName: "Shop by Mood",
    title: "For Besties",
    subtitle: "Matching cords, secret charms & initials",
    tag: "Friendship",
    color: "#C9BDD8",
    image: "/uploads/products/flower-bell-charms.jpg",
    link: "/shop?mood=bestie",
    aspect: "landscape"
  },
  {
    id: "mood-couples",
    section: "moods",
    sectionName: "Shop by Mood",
    title: "For Couples",
    subtitle: "Magnetic pairs & custom anniversary tokens",
    tag: "Love & Romance",
    color: "#D9A99A",
    image: "/uploads/products/miniature-couple-character-figurines.png",
    link: "/shop?mood=couple",
    aspect: "landscape"
  },
  {
    id: "mood-just-because",
    section: "moods",
    sectionName: "Shop by Mood",
    title: "Just Because",
    subtitle: "Tiny spontaneous pick-me-ups to make someone smile",
    tag: "Surprise",
    color: "#B9C5A0",
    image: "/uploads/products/miniature-panda-bamboo-set.jpg",
    link: "/shop?mood=cute",
    aspect: "landscape"
  },

  // 03 — COLOR STORY CHAPTER PICTURES
  {
    id: "color-peach",
    section: "color-chapters",
    sectionName: "Color Chapters",
    title: "Candy Peach Phone Charms",
    subtitle: "Aesthetic phone charms for your everyday case",
    tag: "Chapter: Peach",
    bgColor: "#F4D2BE",
    image: "/uploads/products/phone-charm-pastel-tulip.jpg",
    link: "/shop?category=phone-charms",
    aspect: "square"
  },
  {
    id: "color-lavender",
    section: "color-chapters",
    sectionName: "Color Chapters",
    title: "Floral Bell Charm Wristlets",
    subtitle: "Keepsake friendship & floral charm drops",
    tag: "Chapter: Lavender",
    bgColor: "#C9BDD8",
    image: "/uploads/products/flower-bell-charms.jpg",
    link: "/shop?category=bracelets",
    aspect: "square"
  },
  {
    id: "color-sage",
    section: "color-chapters",
    sectionName: "Color Chapters",
    title: "Miniature Panda & Bamboo Companions",
    subtitle: "Pocket-sized desk figurines and zen buddies",
    tag: "Chapter: Sage",
    bgColor: "#B9C5A0",
    image: "/uploads/products/miniature-panda-bamboo-set.jpg",
    link: "/shop?category=miniature-toys",
    aspect: "square"
  },
  {
    id: "color-yellow",
    section: "color-chapters",
    sectionName: "Color Chapters",
    title: "Pastel Flower Hair Barrettes",
    subtitle: "Floral claw clips and aesthetic hair pins",
    tag: "Chapter: Yellow",
    bgColor: "#E8D49A",
    image: "/uploads/products/pastel-flower-claw-clip-set.jpg",
    link: "/shop?category=hair-accessories",
    aspect: "square"
  },

  // 04 — STORYTELLING GIFT MOMENTS
  {
    id: "moment-birthday",
    section: "gift-moments",
    sectionName: "Gift Moments",
    title: "The Birthday Surprise",
    subtitle: "Personalized hampers filled with custom charms, floral accessories & handwritten wishes.",
    tag: "BIRTHDAY",
    image: "/uploads/products/pastel-flower-claw-clip-set.jpg",
    link: "/shop?mood=birthday",
    aspect: "landscape"
  },
  {
    id: "moment-bestie",
    section: "gift-moments",
    sectionName: "Gift Moments",
    title: "The Unbreakable Bestie Bond",
    subtitle: "Matching pastel cords and secret charms that make miles feel like inches.",
    tag: "BESTIE",
    image: "/uploads/products/flower-bell-charms.jpg",
    link: "/shop?mood=bestie",
    aspect: "landscape"
  },
  {
    id: "moment-just-because",
    section: "gift-moments",
    sectionName: "Gift Moments",
    title: "The 'Just Because' Smile",
    subtitle: "Tiny pocket surprises sent for no other reason than to brighten their afternoon.",
    tag: "JUST BECAUSE",
    image: "/uploads/products/phone-charm-pastel-tulip.jpg",
    link: "/shop?mood=cute",
    aspect: "landscape"
  },

  // 05 — PINTEREST LIFESTYLE GALLERY
  {
    id: "gallery-1",
    section: "gallery",
    sectionName: "Pinterest Feed",
    title: "Miniature Panda & Bamboo Desk Companions",
    subtitle: "Tiny desk companions and zen buddies",
    tag: "Miniature Toys",
    image: "/uploads/products/miniature-panda-bamboo-set.jpg",
    link: "/shop?category=miniature-toys",
    aspect: "portrait"
  },
  {
    id: "gallery-2",
    section: "gallery",
    sectionName: "Pinterest Feed",
    title: "Pastel Beaded Tulip Phone Charms",
    subtitle: "Hand-strung flower charms and stem drops",
    tag: "Phone Charms",
    image: "/uploads/products/phone-charm-pastel-tulip.jpg",
    link: "/shop?category=phone-charms",
    aspect: "portrait"
  },
  {
    id: "gallery-3",
    section: "gallery",
    sectionName: "Pinterest Feed",
    title: "Traditional Silver Bell Jumka Earrings",
    subtitle: "Detailed oxidized ghungroo bell drops",
    tag: "Jumkas",
    image: "/uploads/products/earrings-silver-jhumka.jpg",
    link: "/shop?category=jumkas",
    aspect: "square"
  },
  {
    id: "gallery-4",
    section: "gallery",
    sectionName: "Pinterest Feed",
    title: "Pastel Flower Claw Clips & Hair Barrettes",
    subtitle: "Matte aesthetic hair accessories and floral pins",
    tag: "Hair Accessories",
    image: "/uploads/products/pastel-flower-claw-clip-set.jpg",
    link: "/shop?category=hair-accessories",
    aspect: "portrait"
  },
  {
    id: "gallery-5",
    section: "gallery",
    sectionName: "Pinterest Feed",
    title: "Floral Bell Bag Charms & Pendants",
    subtitle: "Handcrafted lanyard with gentle chiming bells",
    tag: "Bag Charms",
    image: "/uploads/products/flower-bell-charms.jpg",
    link: "/shop?category=phone-charms",
    aspect: "portrait"
  },
  {
    id: "gallery-6",
    section: "gallery",
    sectionName: "Pinterest Feed",
    title: "Miniature Couple & Character Figurines",
    subtitle: "Adorable desk keepsakes & car dashboard buddies",
    tag: "Figurines",
    image: "/uploads/products/miniature-couple-character-figurines.png",
    link: "/shop?category=miniature-toys",
    aspect: "square"
  }
];

export const HOMEPAGE_SECTIONS = [
  { id: "all", name: "All Homepage Pictures" },
  { id: "hero", name: "Hero Cinematic Media" },
  { id: "moods", name: "Shop by Mood Cards" },
  { id: "color-chapters", name: "Color Story Chapters" },
  { id: "gift-moments", name: "Gift Moments Cards" },
  { id: "gallery", name: "Pinterest Lifestyle Feed" }
];
