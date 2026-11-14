import React from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ShieldCheck, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function RefundPolicyPage() {
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
          7-Day Replacement & Refund Policy
        </h1>
        <p className="text-xs text-gold-400 font-mono mb-8 uppercase tracking-widest">
          Garrison Quality Assurance Guarantee
        </p>

        <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-gold-400" />
              <span>1. 7-Day Hassle-Free Replacement</span>
            </h2>
            <p>
              We stand behind the uncompromising craftsmanship of each sculpted piece. If your item arrives damaged in transit, with defective ultrasonic circuitry, or missing accessories, you are entitled to a brand new replacement unit within 7 days of delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
              <span>2. 12-Month Mechanical Warranty</span>
            </h2>
            <p>
              Every unit includes a 1-year internal hardware warranty covering the ultrasonic ceramic transducer plate, LED lighting circuit, and Type-C power module.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gold-400" />
              <span>3. How to Initiate a Claim</span>
            </h2>
            <p>
              Simply email our concierge at{" "}
              <a href={`mailto:${siteConfig.contact.supportEmail}`} className="text-gold-400 underline">
                {siteConfig.contact.supportEmail}
              </a>{" "}
              or message our WhatsApp desk at {siteConfig.contact.phone} with your Order Number and a short 10-second video displaying the issue. Our team will arrange free reverse courier pickup.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
