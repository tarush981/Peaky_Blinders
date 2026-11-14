"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Flame, Eye, ShieldCheck, Check } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showMistSimulation, setShowMistSimulation] = useState(true);

  // Gallery view angles with descriptors
  const angleLabels = [
    "Front Angle: Smoking Pose",
    "Close-up: Sculpted Profile & Peak Hat",
    "Ambient Night: Amber Hearth Glow",
    "Executive Desk Placement",
  ];

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-vintage-900 border border-gold-500/30 shadow-2xl group">
        <Image
          src={images[selectedIndex] || images[0]}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />

        {/* Ambient Vignette & Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-vintage-950/90 via-transparent to-black/30 pointer-events-none" />

        {/* Simulated Ultrasonic Cigarette Vapor & Ember Glow Effect */}
        {showMistSimulation && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Glowing cigarette ember spot */}
            <div className="absolute top-[48%] left-[54%] w-3 h-3 rounded-full bg-amber-500 blur-[2px] animate-pulse shadow-[0_0_15px_#f59e0b]" />
            <div className="absolute top-[48%] left-[54%] w-1.5 h-1.5 rounded-full bg-white animate-ping" />

            {/* Rising smoke curls */}
            <div className="absolute top-[34%] left-[53%] w-10 h-16 bg-gradient-to-t from-zinc-300/40 via-zinc-400/20 to-transparent blur-md rounded-full animate-smoke" />
            <div className="absolute top-[30%] left-[55%] w-12 h-20 bg-gradient-to-t from-white/30 via-zinc-300/10 to-transparent blur-lg rounded-full animate-smoke [animation-delay:1.5s]" />
          </div>
        )}

        {/* Interactive Mist / Light Toggle Badge */}
        <button
          onClick={() => setShowMistSimulation(!showMistSimulation)}
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vintage-950/80 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-semibold hover:bg-gold-500/20 transition-all shadow-lg"
        >
          <Flame className={`w-3.5 h-3.5 ${showMistSimulation ? "text-amber-400 fill-amber-400" : "text-zinc-400"}`} />
          <span>{showMistSimulation ? "Mist & Ember Active" : "Click to Preview Mist"}</span>
        </button>

        {/* Bottom angle descriptor */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700/80 text-[11px] text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>{angleLabels[selectedIndex] || "Authentic Hand-detailed View"}</span>
          </div>

          <div className="bg-gold-500/20 backdrop-blur-md border border-gold-500/40 px-2.5 py-1 rounded text-[10px] font-bold text-gold-300 uppercase tracking-widest">
            100% Cold-Cast Resin
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              selectedIndex === idx
                ? "border-gold-500 shadow-gold-sm scale-102 bg-gold-500/10"
                : "border-zinc-800 hover:border-zinc-600 bg-vintage-900 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Angle ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            {selectedIndex === idx && (
              <div className="absolute inset-0 bg-gold-500/10 flex items-end p-1">
                <span className="w-full text-center text-[9px] font-bold text-gold-300 bg-black/80 rounded py-0.5">
                  VIEW
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
