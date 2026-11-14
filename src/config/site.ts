export const siteConfig = {
  name: "PeakyBlinders-Tommyshelby",
  shortName: "PeakyBlinders",
  tagline: "By Order Of The Peaky Blinders — Birmingham 1919 Luxury",
  description: "Experience the quintessential vintage luxury aesthetic. Official handcrafted Tommy Shelby smoking boss collectible figurine with ultrasonic mist diffuser, ambient flame LED, and artisan aromatherapy aroma.",
  url: "https://peakyblinders-tommyshelby.vercel.app",
  
  // Market & Currency
  country: "India",
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
  },
  
  // Contact & Business Info
  contact: {
    supportEmail: "support@peakyblinders-tommyshelby.in",
    salesEmail: "concierge@peakyblinders-tommyshelby.in",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    supportHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
    address: {
      street: "Garrison Chambers, Industrial Area 4",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
  },

  // Social Links
  social: {
    instagram: "https://instagram.com/peakyblinders_india",
    facebook: "https://facebook.com/peakyblinders.in",
    twitter: "https://twitter.com/peakyblinders_in",
    youtube: "https://youtube.com/@peakyblinders_india",
  },

  // Logistics & Policies
  shipping: {
    freeShippingThreshold: 0, // Free shipping for all orders today!
    standardShippingFee: 99,
    expressShippingFee: 149,
    estimatedDaysMin: 3,
    estimatedDaysMax: 5,
    returnWindowDays: 7,
    warrantyMonths: 12,
  },

  // Trust Highlights
  trustHighlights: [
    {
      title: "Free Express Shipping",
      desc: "Delivered in 3–5 days across all 28 states & UTs in India",
      icon: "Truck",
    },
    {
      title: "100% Secure Checkout",
      desc: "Powered by Razorpay — UPI, Cards, Netbanking & EMI",
      icon: "ShieldCheck",
    },
    {
      title: "7-Day Replacement",
      desc: "Hassle-free replacement policy for defective pieces",
      icon: "RotateCcw",
    },
    {
      title: "Handcrafted Cold-Cast Resin",
      desc: "Individually hand-detailed with antique bronze patina",
      icon: "Award",
    },
  ],

  // Payment Configuration
  payments: {
    razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    allowCod: true,
    codAdditionalFee: 0,
    testMode: process.env.NODE_ENV !== "production" || !process.env.RAZORPAY_KEY_SECRET,
  },

  // Admin Credentials (default for demo / test environment)
  admin: {
    defaultUsername: "admin@peakyblinders.in",
    defaultPasswordHash: "pb_boss_admin_2026",
  },
};

export type SiteConfig = typeof siteConfig;
