import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
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
          Privacy Policy & Data Security
        </h1>
        <p className="text-xs text-gold-400 font-mono mb-8 uppercase tracking-widest">
          Compliant with Indian Information Technology Act (IT Act 2000 & SPDI Rules)
        </p>

        <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold-400" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              When placing an order with {siteConfig.name}, we collect shipping information including full name, postal delivery address, email, and contact phone number to coordinate parcel dispatch and delivery SMS notifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold-400" />
              <span>2. Payment Data Security</span>
            </h2>
            <p>
              We do NOT store or process your credit/debit card numbers or UPI MPINs on our servers. All financial transactions are processed directly through <strong>Razorpay Software Private Limited</strong>, an RBI-regulated and PCI-DSS Level 1 certified payment aggregator.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100">
              3. Data Retention & Your Rights
            </h2>
            <p>
              Your contact details are strictly utilized for delivery fulfillment, invoice generation, and customer service inquiries. We will never sell or lease your personal information to third-party marketing entities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
