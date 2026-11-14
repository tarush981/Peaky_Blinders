"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Order } from "@/types";
import { formatINR, formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import {
  CheckCircle,
  Truck,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Printer,
  ArrowRight,
  ShieldCheck,
  Mail,
} from "lucide-react";

export default function OrderSuccessPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire celebratory gold confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f59e0b", "#ffffff", "#10b981"],
      });
    } catch {
      // ignore
    }

    // Fetch order details
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${params.orderId}`);
        const data = await res.json();
        if (data.order) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error("Order fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-vintage-950 flex items-center justify-center text-gold-400">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest font-mono">
            Verifying Garrison Consignment...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-vintage-950 flex items-center justify-center text-zinc-100 p-4">
        <div className="text-center max-w-md space-y-4">
          <h2 className="font-serif text-2xl font-bold">Consignment Not Found</h2>
          <p className="text-xs text-zinc-400">
            We could not locate order details for reference ID #{params.orderId}.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-gold-500 text-vintage-950 rounded-xl text-xs font-bold"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="inline-block text-xs font-bold text-gold-400 tracking-widest uppercase bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/30 font-mono">
            PAYMENT CONFIRMED & ORDER SECURED
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100">
            By Order Of The Peaky Blinders
          </h1>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            Your consignment has been entered into the Garrison dispatch manifest. A confirmation dispatch has been sent to{" "}
            <strong className="text-zinc-200">{order.customer.email}</strong>.
          </p>
        </div>

        {/* Order Meta Card */}
        <div className="bg-vintage-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                Order Reference
              </span>
              <div className="text-lg font-bold text-gold-400 font-mono">
                {order.orderNumber}
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                Order Date
              </span>
              <div className="text-sm font-semibold text-zinc-200">
                {formatDate(order.createdAt)}
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                Payment Status
              </span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {order.paymentStatus === "paid" ? "VERIFIED (PAID)" : "COD PENDING"}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                Air Waybill / Tracking
              </span>
              <div className="text-sm font-bold text-zinc-200 font-mono">
                {order.trackingNumber || "Assigned on Dispatch"}
              </div>
            </div>
          </div>

          {/* Delivery Timeline Indicator */}
          <div className="p-4 rounded-xl bg-vintage-950 border border-zinc-800">
            <div className="text-xs font-semibold text-zinc-400 mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-gold-400" />
              <span>Consignment Status: Express Air Priority (BlueDart/Delhivery)</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className="p-2 rounded bg-gold-500/20 border border-gold-500 text-gold-300 font-bold">
                1. Order Confirmed
              </div>
              <div className="p-2 rounded bg-vintage-900 border border-zinc-800 text-zinc-400">
                2. Quality Checked
              </div>
              <div className="p-2 rounded bg-vintage-900 border border-zinc-800 text-zinc-400">
                3. In Air Transit
              </div>
              <div className="p-2 rounded bg-vintage-900 border border-zinc-800 text-zinc-400">
                4. Doorstep Delivered
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div>
            <h3 className="font-serif text-base font-bold text-zinc-100 mb-3">
              Included Consignment Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-vintage-950 border border-zinc-850 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-200">{item.title}</div>
                      {item.bundleName && (
                        <div className="text-[11px] text-gold-400 font-mono">
                          {item.bundleName}
                        </div>
                      )}
                      <div className="text-zinc-500 text-[11px]">
                        Qty: {item.quantity} × {formatINR(item.unitPrice)}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gold-400">
                    {formatINR(item.totalPrice)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address & Pricing summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800 text-xs">
            <div>
              <h4 className="font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Shipping Destination</span>
              </h4>
              <p className="text-zinc-200 font-medium">{order.customer.fullName}</p>
              <p className="text-zinc-400 mt-0.5">{order.customer.addressLine1}</p>
              {order.customer.addressLine2 && (
                <p className="text-zinc-400">{order.customer.addressLine2}</p>
              )}
              <p className="text-zinc-400">
                {order.customer.city}, {order.customer.state} - {order.customer.postalCode}
              </p>
              <p className="text-zinc-500 mt-1 font-mono">Phone: +91 {order.customer.phone}</p>
            </div>

            <div className="space-y-1.5 text-right">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-zinc-200 font-medium">{formatINR(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Savings ({order.discountCode || "Promo"})</span>
                  <span>-{formatINR(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-500">Air Express Shipping</span>
                <span className="text-gold-400 font-bold">
                  {order.shippingCharges === 0 ? "FREE" : formatINR(order.shippingCharges)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-zinc-100 pt-2 border-t border-zinc-800">
                <span className="font-serif">Total Settled</span>
                <span className="text-gold-400 text-base">{formatINR(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-vintage-850 hover:bg-vintage-800 text-xs font-semibold text-zinc-300 border border-zinc-700"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Invoice</span>
            </button>

            <div className="flex gap-3">
              <Link
                href="/track-order"
                className="px-5 py-2.5 rounded-xl bg-vintage-850 hover:bg-vintage-800 text-gold-400 border border-gold-500/30 text-xs font-bold"
              >
                Track Consignment
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-vintage-950 text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
