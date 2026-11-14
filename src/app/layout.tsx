import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Handcrafted Tommy Shelby Diffuser & Collectibles`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Tommy Shelby Diffuser",
    "Peaky Blinders Statue",
    "Smoking Boss Figurine",
    "Ultrasonic Mist Humidifier",
    "Vintage Luxury Decor",
    "Birmingham 1919 Collectible",
    "India E-Commerce",
    "Aromatherapy Diffuser India",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — Handcrafted Tommy Shelby Diffuser`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/assets/hero-front.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Handcrafted Tommy Shelby Diffuser`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/assets/hero-front.jpg`],
  },
  verification: {
    google: siteConfig.seo.googleVerification || undefined,
    yandex: siteConfig.seo.yandexVerification || undefined,
    ...(siteConfig.seo.bingVerification
      ? { other: { "msvalidate.01": siteConfig.seo.bingVerification } }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-vintage-950 text-zinc-100 flex flex-col selection:bg-gold-500 selection:text-vintage-950">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
