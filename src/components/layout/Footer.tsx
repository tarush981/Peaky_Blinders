"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Truck, RotateCcw, Award, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-vintage-950 border-t border-gold-500/20 text-zinc-400 text-sm">
      {/* Trust Banner */}
      <div className="border-b border-zinc-800/80 bg-vintage-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.trustHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                {idx === 0 && <Truck className="w-5 h-5" />}
                {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                {idx === 2 && <RotateCcw className="w-5 h-5" />}
                {idx === 3 && <Award className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-zinc-200 font-semibold text-xs tracking-wide uppercase">
                  {highlight.title}
                </h4>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  {highlight.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gold-500/40 bg-gold-500/20 flex items-center justify-center text-gold-400 font-serif font-black text-lg">
              PB
            </div>
            <span className="font-serif text-lg font-bold tracking-widest text-zinc-100 uppercase">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Recreating the iconic vintage aesthetics of 1919 Birmingham. Dedicated to delivering premium handcrafted executive art, collectibles, and ultrasonic aromatherapy statues across India.
          </p>
          <div className="text-xs text-gold-400 font-medium">
            "By Order of The Peaky Blinders."
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h5 className="font-serif text-zinc-200 font-bold uppercase tracking-wider text-xs border-b border-gold-500/30 pb-2">
            The Collection
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/#product-showcase" className="hover:text-gold-400 transition-colors">
                The Tommy Shelby Smoking Diffuser
              </Link>
            </li>
            <li>
              <Link href="/#bundle-deals" className="hover:text-gold-400 transition-colors">
                The Syndicate Duo Pack (Save 55%)
              </Link>
            </li>
            <li>
              <Link href="/#bundle-deals" className="hover:text-gold-400 transition-colors">
                The Garrison Trio Gift Box (Save 60%)
              </Link>
            </li>
            <li>
              <Link href="/#mist-demo" className="hover:text-gold-400 transition-colors">
                Ultrasonic Vapor Technology
              </Link>
            </li>
            <li>
              <Link href="/#reviews" className="hover:text-gold-400 transition-colors">
                Customer Photo Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div className="space-y-3">
          <h5 className="font-serif text-zinc-200 font-bold uppercase tracking-wider text-xs border-b border-gold-500/30 pb-2">
            Customer Care & Policies
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/track-order" className="hover:text-gold-400 transition-colors">
                Track Your Consignment
              </Link>
            </li>
            <li>
              <Link href="/policies/shipping" className="hover:text-gold-400 transition-colors">
                Shipping & Delivery Policy (All India)
              </Link>
            </li>
            <li>
              <Link href="/policies/refund" className="hover:text-gold-400 transition-colors">
                7-Day Replacement & Return Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/privacy" className="hover:text-gold-400 transition-colors">
                Privacy & Data Security Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/terms" className="hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-zinc-500 hover:text-gold-500 transition-colors">
                Administrator Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <h5 className="font-serif text-zinc-200 font-bold uppercase tracking-wider text-xs border-b border-gold-500/30 pb-2">
            Garrison Headquarters
          </h5>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>
                {siteConfig.contact.address.street}, {siteConfig.contact.address.city},{" "}
                {siteConfig.contact.address.state} - {siteConfig.contact.address.postalCode},{" "}
                {siteConfig.contact.address.country}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <a
                href={`mailto:${siteConfig.contact.supportEmail}`}
                className="hover:text-gold-400 transition-colors"
              >
                {siteConfig.contact.supportEmail}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{siteConfig.contact.phone}</span>
            </div>
            <div className="pt-2 text-[11px] text-zinc-500">
              Operating Hours: {siteConfig.contact.supportHours}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="border-t border-zinc-900 bg-black/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Independent vintage luxury brand.
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-zinc-400 font-medium">
              100% Secure Payments Powered By:
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-gold-400/90 bg-vintage-900 border border-gold-500/20 px-3 py-1 rounded">
              <span>Razorpay</span>
              <span>•</span>
              <span>UPI / Cards / Netbanking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
