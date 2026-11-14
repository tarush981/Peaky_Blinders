"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { CheckCircle, ShieldCheck, Box, Zap, Settings, Award } from "lucide-react";

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "included" | "story">("specs");

  return (
    <section className="py-16 bg-vintage-900 border-b border-gold-500/15" id="specifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-3xl font-extrabold text-zinc-100 tracking-tight">
            Craftsmanship & Specifications
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Every curve and seam engineered to perfection. Cold-cast bronze & stone polyresin with modern ultrasonic internals.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-2 mb-8 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "specs"
                ? "bg-gold-500/20 text-gold-400 border border-gold-500/40 shadow-gold-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Technical Specifications</span>
          </button>

          <button
            onClick={() => setActiveTab("included")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "included"
                ? "bg-gold-500/20 text-gold-400 border border-gold-500/40 shadow-gold-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Box className="w-4 h-4" />
            <span>What's In The Box</span>
          </button>

          <button
            onClick={() => setActiveTab("story")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "story"
                ? "bg-gold-500/20 text-gold-400 border border-gold-500/40 shadow-gold-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>The Garrison Heritage</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "specs" && (
            <div className="bg-vintage-950 rounded-2xl border border-gold-500/20 overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                {/* Column 1 */}
                <div className="p-6 space-y-4">
                  {Object.entries(product.specs)
                    .slice(0, 5)
                    .map(([key, value], idx) => (
                      <div key={idx} className="flex justify-between py-2 border-b border-zinc-850 text-xs sm:text-sm">
                        <span className="text-zinc-400 font-medium">{key}</span>
                        <span className="text-zinc-200 font-bold text-right ml-4">{value}</span>
                      </div>
                    ))}
                </div>

                {/* Column 2 */}
                <div className="p-6 space-y-4">
                  {Object.entries(product.specs)
                    .slice(5)
                    .map(([key, value], idx) => (
                      <div key={idx} className="flex justify-between py-2 border-b border-zinc-850 text-xs sm:text-sm">
                        <span className="text-zinc-400 font-medium">{key}</span>
                        <span className="text-zinc-200 font-bold text-right ml-4">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "included" && (
            <div className="bg-vintage-950 rounded-2xl border border-gold-500/20 p-8 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-gold-400 mb-6">
                Official Garrison Collector's Packaging
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.includedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-vintage-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200"
                  >
                    <CheckCircle className="w-5 h-5 text-gold-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300">
                ★ <strong>Note for Syndicate & Garrison Bundles:</strong> Includes additional free 10ml artisan aromatherapy oils and custom engraved black matte gift packaging with gold foil crest.
              </div>
            </div>
          )}

          {activeTab === "story" && (
            <div className="bg-vintage-950 rounded-2xl border border-gold-500/20 p-8 shadow-xl space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <h3 className="font-serif text-xl font-bold text-zinc-100 mb-2">
                By Order Of The Peaky Blinders — Birmingham 1919
              </h3>
              <p>
                In 1919 post-war Birmingham, Thomas Shelby commanded respect not with loudness, but with ruthless poise, a calculating gaze, and a cigarette held between steadfast fingers.
              </p>
              <p>
                We conceived the Tommy Shelby Smoking Boss Diffuser as a tribute to that aura of stoic determination. Each piece begins with traditional clay modeling to capture the sharp jawline, the tilted wool tweed flat cap, and the crisp collar. It is then cold-cast in dense mineral polyresin and polished with antique patinas to give it the gravitas of a historical monument.
              </p>
              <p>
                Whether stationed on your executive mahogany desk, inside your library, or beside your bed, it serves as a daily statement of resilience and leadership.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
