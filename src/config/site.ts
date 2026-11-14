export const siteConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "PeakyBlinders-Tommyshelby",
  shortName: process.env.NEXT_PUBLIC_SHORT_NAME || "MistyBlinders",
  tagline: "Style Lives in the Mist — The Hand-Painted Smoking Boss Statue",
  description: "Official handcrafted 28 cm Tommy Shelby smoking boss statue with misting cigarette, tufted Chesterfield armchair, warm glowing brass base, and wireless remote control.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://peakyblinders-store.vercel.app",
  
  // SEO & Search Engine Indexing
  seo: {
    indexNowKey: "pb70198cd4e37b2d4f89a14c6e95213b",
    googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
  },
  
  // Market & Currency
  country: "India",
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
  },
  
  // Contact & Business Info
  contact: {
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@peakyblinders-tommyshelby.in",
    salesEmail: process.env.NEXT_PUBLIC_SALES_EMAIL || "concierge@peakyblinders-tommyshelby.in",
    phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+91 98765 43210",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+91 98765 43210",
    supportHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
    address: {
      street: "Garrison Chambers, Industrial Area 4",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
  },

  // Logistics & COD Restrictions
  shipping: {
    freeShippingThreshold: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD ?? 0),
    standardShippingFee: Number(process.env.NEXT_PUBLIC_STANDARD_SHIPPING_FEE ?? 0),
    codMinOrderAmount: Number(process.env.NEXT_PUBLIC_COD_MIN_ORDER_AMOUNT ?? 5000), // COD strictly available ONLY for orders ₹5,000 and above!
    estimatedDaysMin: 3,
    estimatedDaysMax: 5,
    returnWindowDays: Number(process.env.NEXT_PUBLIC_RETURN_WINDOW_DAYS ?? 7),
    warrantyMonths: 12,
  },

  // Payment Gateway & Real Money UPI Configuration
  payments: {
    // Only UPI is enabled for online payments
    allowedOnlineMethods: ["upi"],
    
    // Direct Bank / Merchant UPI configuration (Money lands directly into your bank account)
    upiVpa: process.env.NEXT_PUBLIC_MERCHANT_UPI_VPA || "peakyy@slc",
    merchantName: process.env.NEXT_PUBLIC_MERCHANT_NAME || "PeakyBlinders",
    upiQrImage: "/img/merchant-upi-qr.jpg",
    
    // Razorpay Live / Test Credentials
    razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    isLiveMode: Boolean(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
      !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.includes("placeholder")
    ),
  },

  // Trust Highlights
  trustHighlights: [
    {
      title: "Free Express Priority Air",
      desc: "Delivered in 3–5 business days across all 28 states & UTs in India",
      icon: "Truck",
    },
    {
      title: "Direct UPI & Instant QR",
      desc: "Fast payment via Google Pay, PhonePe, Paytm, or BHIM UPI",
      icon: "Smartphone",
    },
    {
      title: "7-Day Replacement Guarantee",
      desc: "Hassle-free replacement for any transit damage or defect",
      icon: "RotateCcw",
    },
    {
      title: "Hand-Painted 900g Solid Statue",
      desc: "Cold-cast polyresin on brushed-brass glowing base",
      icon: "Award",
    },
  ],

  admin: {
    defaultUsername: "admin@peakyblinders.in",
    defaultPasswordHash: "pb_boss_admin_2026",
  },
};

export type SiteConfig = typeof siteConfig;
