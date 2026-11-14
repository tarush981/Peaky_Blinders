"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Gift,
  Truck,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    discountCode,
    shippingCharges,
    totalAmount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    setCouponMessage(null);
    const res = await applyCoupon(couponInput);
    setIsApplying(false);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) setCouponInput("");
  };

  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Browsing</span>
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100 mb-8">
          Your Garrison Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <Gift className="w-12 h-12 text-zinc-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-zinc-200">
              Your cart is empty
            </h3>
            <p className="text-xs text-zinc-400">
              You haven't added any Tommy Shelby collector's pieces yet.
            </p>
            <Link
              href="/#product-showcase"
              className="inline-block px-6 py-3 rounded-xl bg-gold-500 text-vintage-950 font-bold text-xs"
            >
              Explore Hero Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.bundleId || idx}`}
                  className="bg-vintage-900 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h3 className="font-bold text-base text-zinc-100">
                      {item.title}
                    </h3>
                    {item.bundleName && (
                      <span className="inline-block text-xs font-semibold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                        {item.bundleName}
                      </span>
                    )}
                    {item.freeGifts && item.freeGifts.length > 0 && (
                      <div className="text-xs text-emerald-400 flex items-center justify-center sm:justify-start gap-1 pt-1">
                        <Gift className="w-3.5 h-3.5" />
                        <span>Includes {item.freeGifts[0]}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-950 overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.bundleId
                          )
                        }
                        className="p-2 text-zinc-400 hover:text-zinc-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.bundleId
                          )
                        }
                        className="p-2 text-zinc-400 hover:text-zinc-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="font-serif font-bold text-gold-400 text-base w-24 text-right">
                      {formatINR(item.totalPrice)}
                    </div>

                    <button
                      onClick={() => removeItem(item.productId, item.bundleId)}
                      className="text-zinc-500 hover:text-red-400 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price & Checkout Summary */}
            <div className="lg:col-span-4">
              <div className="bg-vintage-900 border border-gold-500/30 rounded-2xl p-6 shadow-xl space-y-5">
                <h3 className="font-serif text-lg font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                  Summary
                </h3>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon (e.g. PEAKY10)"
                    className="flex-1 px-3 py-2 text-xs bg-vintage-950 border border-zinc-700 rounded-lg text-zinc-100 uppercase"
                  />
                  <button
                    type="submit"
                    disabled={isApplying || !couponInput.trim()}
                    className="px-4 py-2 bg-zinc-800 text-gold-400 border border-gold-500/30 text-xs font-bold rounded-lg"
                  >
                    Apply
                  </button>
                </form>

                {couponMessage && (
                  <p
                    className={`text-xs ${
                      couponMessage.error ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}

                {discountCode && (
                  <div className="flex justify-between text-xs text-gold-400 bg-gold-500/10 p-2 rounded border border-gold-500/30">
                    <span>Applied: {discountCode}</span>
                    <button onClick={removeCoupon} className="underline text-[11px]">
                      Remove
                    </button>
                  </div>
                )}

                <div className="space-y-2 text-xs text-zinc-400 border-t border-zinc-800 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-200 font-medium">{formatINR(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Air Courier</span>
                    <span className="text-gold-400 font-bold">
                      {shippingCharges === 0 ? "FREE" : formatINR(shippingCharges)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-zinc-100 pt-3 border-t border-zinc-800">
                    <span className="font-serif">Total Amount</span>
                    <span className="text-gold-400 font-serif text-lg">
                      {formatINR(totalAmount)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-black text-sm tracking-wider uppercase hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>Proceed To Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
