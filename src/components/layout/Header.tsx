"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { ShoppingBag, Menu, X, Shield, Sparkles } from "lucide-react";

export default function Header() {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-vintage-950/90 backdrop-blur-md border-b border-gold-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-gold-400 p-2 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo / Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-gradient-to-b from-gold-500/20 to-vintage-900 flex items-center justify-center text-gold-400 font-serif font-black text-xl shadow-gold-sm group-hover:scale-105 transition-transform">
            PB
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-zinc-100 group-hover:text-gold-400 transition-colors uppercase">
              {siteConfig.name}
            </span>
            <span className="text-[10px] tracking-[0.25em] text-gold-500/80 font-mono uppercase">
              Birmingham • 1919 • Luxury
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link
            href="/#product-showcase"
            className="text-zinc-300 hover:text-gold-400 transition-colors"
          >
            The Diffuser
          </Link>
          <Link
            href="/#bundle-deals"
            className="text-zinc-300 hover:text-gold-400 transition-colors flex items-center gap-1.5"
          >
            <span>Bundle Deals</span>
            <span className="text-[10px] bg-gold-500/20 text-gold-400 px-1.5 py-0.5 rounded border border-gold-500/30 font-semibold">
              SAVE 60%
            </span>
          </Link>
          <Link
            href="/#mist-demo"
            className="text-zinc-300 hover:text-gold-400 transition-colors"
          >
            Mist Tech
          </Link>
          <Link
            href="/#reviews"
            className="text-zinc-300 hover:text-gold-400 transition-colors"
          >
            Reviews (4.9★)
          </Link>
          <Link
            href="/track-order"
            className="text-zinc-300 hover:text-gold-400 transition-colors"
          >
            Track Order
          </Link>
        </nav>

        {/* Right Actions: Currency badge & Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1 text-xs text-zinc-400 border border-zinc-800 bg-vintage-900/80 px-2.5 py-1.5 rounded-full">
            <span className="text-gold-400 font-bold">🇮🇳 INR (₹)</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-300">Free Delivery</span>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-vintage-850 to-vintage-900 border border-gold-500/30 text-gold-400 hover:border-gold-400 hover:shadow-gold-sm transition-all"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-vintage-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-vintage-900 border-b border-gold-500/20 px-6 py-5 space-y-4 text-base font-medium">
          <Link
            href="/#product-showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-gold-400"
          >
            The Tommy Shelby Diffuser
          </Link>
          <Link
            href="/#bundle-deals"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-zinc-200 hover:text-gold-400"
          >
            <span>Exclusive Bundles</span>
            <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded font-semibold">
              Save Up to 60%
            </span>
          </Link>
          <Link
            href="/#mist-demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-gold-400"
          >
            Ultrasonic Mist Mechanics
          </Link>
          <Link
            href="/#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-gold-400"
          >
            Verified Customer Reviews
          </Link>
          <Link
            href="/track-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-gold-400"
          >
            Track Order Status
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gold-400 text-sm pt-2 border-t border-zinc-800"
          >
            Admin Dashboard Portal →
          </Link>
        </div>
      )}
    </header>
  );
}
