"use client";

import React, { useState } from "react";
import { Order } from "@/types";
import { formatINR, formatDate } from "@/lib/utils";
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${query.trim()}`);
      const data = await res.json();
      if (!res.ok || !data.order) {
        throw new Error("No consignment found matching this order reference.");
      }
      setOrder(data.order);
    } catch (err: any) {
      setError(err?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>

        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-3">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-zinc-100">
            Track Garrison Consignment
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Enter your Order Number (e.g. PB-IND-BIRM-9821) or Order ID provided in your receipt.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2 mb-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              placeholder="e.g. PB-IND-BIRM-9821"
              className="w-full pl-10 pr-4 py-3 bg-vintage-900 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500 uppercase font-mono tracking-wider"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-bold text-xs sm:text-sm rounded-xl hover:brightness-110 shadow-gold-sm transition-all shrink-0"
          >
            {loading ? "Searching..." : "Track Order"}
          </button>
        </form>

        {error && (
          <div className="max-w-lg mx-auto p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 text-center mb-8">
            {error}
          </div>
        )}

        {/* Result Display */}
        {order && (
          <div className="bg-vintage-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
              <div>
                <span className="text-[11px] text-zinc-500 uppercase font-mono">
                  Consignment
                </span>
                <div className="text-lg font-bold text-gold-400 font-mono">
                  {order.orderNumber}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-500 uppercase font-mono">
                  Status
                </span>
                <div>
                  <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-500 uppercase font-mono">
                  Tracking AWB
                </span>
                <div className="text-sm font-bold text-zinc-200 font-mono">
                  {order.trackingNumber || "Assigned on Dispatch"}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-500 uppercase font-mono">
                  Destination
                </span>
                <div className="text-sm font-semibold text-zinc-300">
                  {order.customer.city}, {order.customer.state}
                </div>
              </div>
            </div>

            {/* Tracking Steps Timeline */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-base font-bold text-zinc-100">
                Transit Timeline
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-zinc-200">Order Placed & Verified</h5>
                    <p className="text-zinc-500 mt-0.5">{formatDate(order.createdAt)} • Garrison Dispatch Hub</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    order.orderStatus === "shipped" || order.orderStatus === "delivered"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "bg-vintage-800 text-zinc-500 border-zinc-700"
                  }`}>
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-zinc-200">Dispatched via BlueDart Express Air</h5>
                    <p className="text-zinc-500 mt-0.5">
                      {order.trackingNumber ? `AWB: ${order.trackingNumber}` : "Packing in protective velvet box"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    order.orderStatus === "delivered"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "bg-vintage-800 text-zinc-500 border-zinc-700"
                  }`}>
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-zinc-200">Doorstep Delivery Completed</h5>
                    <p className="text-zinc-500 mt-0.5">
                      {order.orderStatus === "delivered"
                        ? "Delivered to recipient"
                        : "Estimated delivery: 2-4 business days"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
