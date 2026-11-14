# PeakyBlinders-Tommyshelby — Premium E-Commerce Store 🥃💨

> **"Style Lives in the Mist"** — A bespoke, luxury dark-aesthetic e-commerce experience crafted for the Indian market, featuring the handcrafted Tommy Shelby Ultrasonic Mist Statue & Aromatherapy Diffuser.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.18-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Market](https://img.shields.io/badge/Market-India%20(INR%20₹)-gold?style=for-the-badge)](#)
[![Payments](https://img.shields.io/badge/Payments-UPI%20%7C%20Razorpay-green?style=for-the-badge)](#)

---

## 🌟 Overview

**PeakyBlinders-Tommyshelby** reproduces the high-converting luxury shopping flow of top direct-to-consumer lifestyle brands with an independent brand identity. Engineered with **Next.js 14 App Router**, **Tailwind CSS**, and **TypeScript**, the platform delivers blazing-fast performance, vintage Birmingham 1919 visual design, real-time UPI payments, and automated search engine indexing.

---

## ✨ Key Features

### 🛍️ Luxury Storefront & Product Showcase
* **Real Multimedia Assets**: High-definition video player (`figure.mp4`) and high-res multi-angle photography of the Tommy Shelby Smoking Boss statue.
* **Ultrasonic Vapor Demonstration**: Interactive technical visualizer showcasing the internal ceramic transducer, wireless remote control, and cool ambient LED brass base.
* **Multi-Tier Bundle Selector**:
  * **Solo Executive Collector** — 1 Unit @ ₹3,499 (Save ₹1,500)
  * **Duo Syndicate Pack** — 2 Units @ ₹6,299 (Save ₹3,700 + Free USB Hub)
  * **Trio Garrison Club Master** — 3 Units @ ₹8,999 (Save ₹6,000 + Priority Air + VIP Gift Box)
* **Interactive Cart & Drawer**: Instant subtotal updates, free shipping badge, coupon code support (`PEAKY10`, `SHELBY200`, `GARRISONVIP`).

### 💳 Indian Payment Gateway & Real Money Direct UPI
* **Direct Bank UPI**:
  * Custom UPI ID: `peakyy@slc`
  * Merchant Name: `PeakyBlinders`
  * Uploaded Real UPI QR Code modal with 1-click mobile deep links (`upi://pay?pa=peakyy@slc...`).
  * Direct UTR (Unique Transaction Reference) confirmation tracking.
* **Strict Cash on Delivery (COD) Rule**:
  * Cash on Delivery is strictly restricted and **locked for orders under ₹5,000**.
  * Enabled only for orders ₹5,000 and above (e.g., Duo Syndicate or Trio Master bundles).
* **Razorpay Ready**: Pre-configured webhook handlers and signature verification routes.

### 🛡️ Garrison Command Admin Console (`/admin`)
* **Secure Access**: Protected by master passcode (`pb_boss_admin_2026`).
* **Live Revenue Analytics**: Total sales, active orders, pending verification, stock alerts.
* **Order Management**: Filter orders by status (Pending, Paid, Shipped, Delivered), verify customer UPI UTR codes with one click.
* **Product & Bundle Editor**: Live editing of prices, descriptions, specifications, and inventory without code redeployment.
* **Review Moderation**: Approve or flag customer reviews.
* **Bank & Payment Gateway Settings**: Change receiving UPI ID and Razorpay credentials dynamically.
* **Search Engine & SEO Dispatcher**: 1-click trigger for instant IndexNow submissions across global search engines.

### 🌐 Global Search Engine Indexing & SEO
* **XML Sitemap ([`/sitemap.xml`](/sitemap.xml))**: Auto-generated Next.js metadata route with all canonical pages, priority weighting, and update frequencies.
* **Robots Directives ([`/robots.txt`](/robots.txt))**: Explicit allow rules for `Googlebot`, `Bingbot`, `DuckDuckBot`, `Slurp` (Yahoo), `YandexBot`, and `Applebot`.
* **Schema.org JSON-LD**:
  * `Product` Rich Snippets (Rating: 4.9★, Price: ₹3,499, InStock).
  * `FAQPage` Rich Snippets (Expandable questions inside Google SERP results).
  * `BreadcrumbList`, `Organization`, and `WebSite` SearchAction.
* **IndexNow Protocol**:
  * Verification key at [`/pb70198cd4e37b2d4f89a14c6e95213b.txt`](/pb70198cd4e37b2d4f89a14c6e95213b.txt).
  * API route [`/api/seo/indexnow`](/api/seo/indexnow) to instantly ping Bing, Yahoo, DuckDuckGo, and Yandex.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with vintage charcoal & metallic gold palette
* **Icons**: [Lucide React](https://lucide.dev/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Database / State**: File-backed JSON repository (`src/data/db.json`) + Supabase schema ready

---

## 🚀 Quick Start & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) v18.17+ or v20+
* npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/tarush981/Peaky_Blinders.git
cd Peaky_Blinders
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Merchant Direct UPI Details
NEXT_PUBLIC_MERCHANT_UPI_VPA=peakyy@slc
NEXT_PUBLIC_MERCHANT_NAME=PeakyBlinders

# Razorpay (Optional - for card/netbanking)
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Search Engine Webmaster Verification (Optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
NEXT_PUBLIC_YANDEX_VERIFICATION=
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔐 Admin Dashboard Access

* **URL**: `http://localhost:3000/admin`
* **Passcode**: `pb_boss_admin_2026`

---

## 📁 Project Structure

```
PeakyBlinders/
├── public/
│   ├── assets/              # High-res photography & UI graphics
│   ├── img/                 # Reference videos (figure.mp4) & customer avatars
│   └── pb70198cd4e37b2d4...txt # IndexNow search engine verification key
├── src/
│   ├── app/
│   │   ├── admin/           # Garrison Command Admin Console
│   │   ├── api/             # Orders, payments, reviews, and SEO routes
│   │   ├── cart/            # Cart drawer & full cart page
│   │   ├── checkout/        # Checkout flow with ₹5000 COD lock & UPI QR
│   │   ├── order-success/   # Post-purchase confirmation page
│   │   ├── product/         # Dynamic product details routes
│   │   ├── layout.tsx       # Root layout with SEO metadata & JSON-LD
│   │   ├── page.tsx         # High-converting homepage
│   │   ├── robots.ts        # Search engine crawler directives
│   │   └── sitemap.ts       # Dynamic XML sitemap generator
│   ├── components/          # Reusable UI, layout & checkout components
│   ├── config/              # Centralized site & business configuration
│   ├── context/             # React Cart Context with persistent localStorage
│   ├── data/                # Initial seed data & local JSON database
│   ├── lib/                 # Database abstraction & currency helpers
│   └── types/               # TypeScript interfaces
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 License & Attribution

Designed and developed for educational and portfolio demonstration purposes. All trademarks and media belong to their respective copyright holders.
