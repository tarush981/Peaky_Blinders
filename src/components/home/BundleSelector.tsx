"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, BundleOption } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { ShoppingBag, Zap, Check, Gift, ShieldCheck, Flame, Sparkles } from "lucide-react";

interface BundleSelectorProps {
  product: Product;
}

export default function BundleSelector({ product }: BundleSelectorProps) {
  const router = useRouter();
  const { addBundle, setIsCartOpen } = useCart();
  const [selectedBundleId, setSelectedBundleId] = useState<string>(
    product.bundles.find((b) => b.isPopular)?.id || product.bundles[0]?.id
  );

  const activeBundle =
    product.bundles.find((b) => b.id === selectedBundleId) || product.bundles[0];

  const handleAddToCart = () => {
    addBundle(product, activeBundle);
  };

  const handleBuyNow = () => {
    addBundle(product, activeBundle);
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="space-y-6" id="bundle-deals">
      {/* Bundle Selection Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <span>Select Exclusive Syndicate Bundle:</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Bulk orders include free artisan aroma essences & priority air courier.
          </p>
        </div>
        <div className="text-xs text-gold-400 font-mono font-bold bg-gold-500/10 border border-gold-500/30 px-2.5 py-1 rounded">
          ALL INDIA SHIPPING: FREE
        </div>
      </div>

      {/* 3 Bundle Options Cards */}
      <div className="space-y-3">
        {product.bundles.map((bundle) => {
          const isSelected = bundle.id === selectedBundleId;

          return (
            <div
              key={bundle.id}
              onClick={() => setSelectedBundleId(bundle.id)}
              className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all ${
                isSelected
                  ? "border-gold-500 bg-gradient-to-r from-gold-950/40 via-vintage-900 to-vintage-900 shadow-gold-sm"
                  : "border-zinc-800 bg-vintage-900/60 hover:border-zinc-700"
              }`}
            >
              {/* Badge Tag */}
              {bundle.isPopular && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-gold-500 text-vintage-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider">
                  ★ MOST POPULAR • 55% OFF
                </div>
              )}
              {bundle.isBestValue && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-vintage-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider">
                  🔥 BEST VALUE • SAVE ₹8,998
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                {/* Radio selection circle & Name */}
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-gold-400 bg-gold-500 text-vintage-950"
                        : "border-zinc-600 bg-vintage-950"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-zinc-100">
                        {bundle.name}
                      </h4>
                      <span className="text-[11px] font-bold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                        {bundle.discountBadge}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 mt-0.5">
                      {bundle.tagline}
                    </p>

                    {/* Free Gifts list if present */}
                    {bundle.freeGifts.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {bundle.freeGifts.map((gift, gIdx) => (
                          <div
                            key={gIdx}
                            className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium"
                          >
                            <Gift className="w-3.5 h-3.5 shrink-0" />
                            <span>{gift}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right shrink-0">
                  <div className="text-base font-extrabold text-gold-400 font-serif">
                    {formatINR(bundle.totalPrice)}
                  </div>
                  <div className="text-xs text-zinc-500 line-through">
                    {formatINR(bundle.originalPrice)}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    ({formatINR(bundle.pricePerUnit)} / unit)
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Bundle Summary Bar */}
      <div className="bg-vintage-950/90 rounded-xl p-3.5 border border-gold-500/20 flex items-center justify-between text-xs">
        <div className="text-zinc-300">
          Total Savings on this bundle:
        </div>
        <div className="text-emerald-400 font-bold font-mono text-sm">
          You Save {formatINR(activeBundle.savings)}
        </div>
      </div>

      {/* Action Buttons: Add to Cart & Buy Now */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-vintage-850 hover:bg-vintage-800 text-gold-400 border border-gold-500/40 font-bold text-sm tracking-wide transition-all hover:border-gold-400"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add To Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-black text-sm tracking-wide hover:brightness-110 shadow-gold-glow transition-all"
        >
          <Zap className="w-4 h-4 fill-vintage-950" />
          <span>Buy Now (Express Checkout)</span>
        </button>
      </div>

      {/* Scarcity Notice */}
      <div className="flex items-center justify-center gap-2 text-xs text-amber-400/90 bg-amber-950/20 border border-amber-500/30 py-2 rounded-lg text-center">
        <Flame className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          <strong>High Demand:</strong> Only <strong>{product.stock} units</strong> remaining in today's handcrafted consignment.
        </span>
      </div>

      {/* Payment & Trust Signals */}
      <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>100% Verified UPI</span>
        </div>
        <span>•</span>
        <div>Direct UPI (GPay, PhonePe, Paytm, QR)</div>
        <span>•</span>
        <div>7 Days Replacement</div>
        <span>•</span>
        <div className="text-gold-400/90 font-medium">COD Available on Orders ₹5,000+</div>
      </div>
    </div>
  );
}
