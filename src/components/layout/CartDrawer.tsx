"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Gift, Truck } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-vintage-900 border-l border-gold-500/20 text-zinc-100 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-vintage-950">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-wide text-zinc-100">
                Garrison Vault Cart
              </span>
              <span className="text-xs bg-gold-500/20 text-gold-400 font-bold px-2 py-0.5 rounded-full border border-gold-500/30">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-zinc-400 hover:text-gold-400 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Banner */}
          <div className="bg-gradient-to-r from-gold-950/60 to-vintage-950 px-6 py-2.5 border-b border-gold-500/20 flex items-center gap-2 text-xs text-gold-300">
            <Truck className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong>Eligible for Free Air Express Delivery</strong> across all states in India.
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-vintage-800 border border-zinc-700 flex items-center justify-center text-zinc-500">
                  <Gift className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-zinc-200">Your Cart is Empty</h4>
                  <p className="text-zinc-400 text-sm mt-1 max-w-xs">
                    Choose from our single unit or value syndicate bundles to claim your piece of Birmingham heritage.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-gold-600 to-gold-500 text-vintage-950 font-bold text-sm hover:brightness-110 transition-all shadow-gold-sm"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.bundleId || idx}`}
                  className="bg-vintage-850/80 rounded-xl p-4 border border-zinc-800 flex gap-4 transition-all hover:border-gold-500/30"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-zinc-100 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.bundleId)}
                          className="text-zinc-500 hover:text-red-400 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.bundleName && (
                        <span className="inline-block text-[11px] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded mt-1">
                          {item.bundleName}
                        </span>
                      )}

                      {item.freeGifts && item.freeGifts.length > 0 && (
                        <div className="text-[11px] text-zinc-400 mt-1 space-y-0.5">
                          {item.freeGifts.map((gift, gIdx) => (
                            <div key={gIdx} className="flex items-center gap-1 text-emerald-400">
                              <Gift className="w-3 h-3" />
                              <span className="line-clamp-1">{gift}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/80">
                      <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-900/60 overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.bundleId
                            )
                          }
                          className="px-2 py-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-zinc-200">
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
                          className="px-2 py-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-gold-400">
                          {formatINR(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (Only if cart has items) */}
          {items.length > 0 && (
            <div className="border-t border-zinc-800 bg-vintage-950 p-6 space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon (e.g. PEAKY10)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-vintage-900 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500 uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isApplying || !couponInput.trim()}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-semibold text-gold-400 border border-gold-500/30 rounded-lg transition-all"
                >
                  {isApplying ? "..." : "Apply"}
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
                <div className="flex items-center justify-between text-xs bg-gold-500/10 border border-gold-500/30 px-3 py-1.5 rounded-lg text-gold-300">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-gold-400" />
                    <span>Coupon applied: <strong>{discountCode}</strong></span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-zinc-400 hover:text-red-400 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-medium">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Savings</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Across India</span>
                  <span className="text-gold-400 font-medium">
                    {shippingCharges === 0 ? "FREE" : formatINR(shippingCharges)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-100 pt-2 border-t border-zinc-800">
                  <span className="font-serif">Final Total (INR)</span>
                  <span className="text-gold-400 text-base">{formatINR(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-extrabold text-sm tracking-wide hover:brightness-110 shadow-gold-glow transition-all"
              >
                <span>Proceed To Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                <span>Verified 256-Bit SSL Encrypted Razorpay Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
