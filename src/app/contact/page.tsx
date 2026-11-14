import React from "react";
import ContactSection from "@/components/home/ContactSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Contact Concierge Desk | PeakyBlinders-Tommyshelby",
  description: "Reach out to the PeakyBlinders-Tommyshelby concierge team for corporate gifting, delivery tracking, and wholesale inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
      </div>
      <ContactSection />
    </div>
  );
}
