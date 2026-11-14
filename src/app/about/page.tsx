import React from "react";
import Link from "next/link";
import { ArrowLeft, Award, Flame, Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About The Brand | PeakyBlinders-Tommyshelby",
  description: "Learn about the craftsmanship, materials, and vision behind the PeakyBlinders-Tommyshelby collectible ultrasonic diffuser.",
};

export default function AboutPage() {
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
          The Birmingham Heritage & Craftsmanship
        </h1>
        <p className="text-xs text-gold-400 font-mono mb-8 uppercase tracking-widest">
          Vintage Stoicism • Precision Ultrasonic Engineering
        </p>

        <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold-400" />
              <span>Artisan Sculpting & Cold-Cast Polyresin</span>
            </h2>
            <p>
              Every {siteConfig.name} sculpture originates in our artisan studio. We hand-sculpt each anatomical nuance—from the signature tilt of the 1919 tweed peaked cap to the austere, determined facial expression and folds of the heavy overcoat.
            </p>
            <p>
              Unlike injection-molded plastic gadgets that weigh mere grams, our statues are cold-cast using dense mineral-filled polyresin, resulting in a solid 780-gram luxury desktop centerpiece that commands reverence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-gold-400" />
              <span>Ultrasonic Smoke Illusion (Zero Fire Hazard)</span>
            </h2>
            <p>
              We wanted the silhouette of Tommy Shelby’s ever-present cigarette to come to life without heat, fire, or toxic smoke. By engineering a high-frequency 2.4MHz ultrasonic atomizer with a micro-routed internal brass chimney, cool vapor is pushed gracefully out of the cigarette tip, perfectly replicating smoke plumes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
              <span>Committed to Indian Collectors</span>
            </h2>
            <p>
              Headquartered with central fulfillment in Bengaluru, Karnataka, we ship across India with premium courier networks, secure Razorpay checkout, and full domestic warranty backing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
