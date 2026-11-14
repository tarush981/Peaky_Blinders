import React from "react";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, ShieldCheck, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ShippingPolicyPage() {
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

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100 mb-4">
          Shipping & Delivery Policy (All India)
        </h1>
        <p className="text-xs text-gold-400 font-mono mb-8 uppercase tracking-widest">
          Last Updated: November 2026 • Certified Air Express Transit
        </p>

        <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-gold-400" />
              <span>1. Domestic Delivery Network</span>
            </h2>
            <p>
              {siteConfig.name} ships to all 28 states and 8 Union Territories across India. Every order is dispatched from our central air hub in Bengaluru, Karnataka via tier-1 express logistics partners including BlueDart, Delhivery Air, and DTDC Express.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-400" />
              <span>2. Dispatch & Delivery Timelines</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs sm:text-sm">
              <li><strong>Order Processing Time:</strong> 12–24 business hours from receipt of order and payment confirmation.</li>
              <li><strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 business days.</li>
              <li><strong>Tier 2 & Tier 3 Cities:</strong> 3 to 5 business days.</li>
              <li><strong>Northeast & Remote Locations:</strong> 4 to 6 business days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
              <span>3. Shipping Charges & Free Delivery</span>
            </h2>
            <p>
              We are currently offering <strong>Complimentary Free Express Shipping</strong> on all Tommy Shelby Diffuser orders and bundle packs across India. There are zero hidden courier surcharges.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>4. Real-Time Tracking & Notifications</span>
            </h2>
            <p>
              Upon parcel handover to the courier, an automated SMS and email containing the Air Waybill (AWB) number and live tracking link will be dispatched to your registered contact credentials. You may also track status anytime at <Link href="/track-order" className="text-gold-400 underline">Track Order</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
