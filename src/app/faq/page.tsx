import React from "react";
import FaqAccordion from "@/components/home/FaqAccordion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | PeakyBlinders-Tommyshelby",
  description: "Find answers regarding ultrasonic mist diffusion, delivery times across India, aromatherapy oils, and safety.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
      </div>
      <FaqAccordion />
    </div>
  );
}
