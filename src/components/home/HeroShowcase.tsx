"use client";

import React from "react";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import ProductGallery from "./ProductGallery";
import BundleSelector from "./BundleSelector";
import { Star, CheckCircle, ShieldCheck, Truck, Clock, Sparkles } from "lucide-react";

interface HeroShowcaseProps {
  product: Product;
}

export default function HeroShowcase({ product }: HeroShowcaseProps) {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-vintage-950 via-vintage-900 to-vintage-950 border-b border-gold-500/15" id="product-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Drop Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{product.badge}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium">In Stock & Ready to Dispatch Across India</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            <ProductGallery images={product.images} title={product.title} />

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-vintage-900/80 border border-zinc-800 rounded-xl p-3 text-center">
                <div className="text-gold-400 font-serif font-bold text-sm">2.4 MHz</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Ultrasonic Engine</div>
              </div>
              <div className="bg-vintage-900/80 border border-zinc-800 rounded-xl p-3 text-center">
                <div className="text-gold-400 font-serif font-bold text-sm">780 Grams</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Cold-Cast Resin</div>
              </div>
              <div className="bg-vintage-900/80 border border-zinc-800 rounded-xl p-3 text-center">
                <div className="text-gold-400 font-serif font-bold text-sm">6-8 Hours</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Continuous Mist</div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Bundle Selector (6 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-zinc-200">{product.rating} / 5.0</span>
                <span className="text-xs text-zinc-400">({product.reviewCount} Verified Indian Buyers)</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-gold-400/90 font-medium mt-2 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Price Anchor */}
            <div className="flex items-baseline gap-3 p-4 rounded-xl bg-vintage-900 border border-gold-500/20">
              <span className="font-serif text-3xl sm:text-4xl font-black text-gold-400">
                {formatINR(product.sellingPrice)}
              </span>
              <span className="text-base text-zinc-500 line-through">
                {formatINR(product.originalPrice)}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded">
                SAVE {product.discountPercentage}% TODAY
              </span>
            </div>

            {/* Key Value Bullets */}
            <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {product.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Bundle Selector Component */}
            <BundleSelector product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
