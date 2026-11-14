"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon, Flame, Sparkles, Check } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);

  // Gallery view angle labels matching original product
  const angleLabels = [
    "Front View: Hand-Painted Boss in Armchair",
    "Back View: Tufted Chesterfield & USB-C Port",
    "Video Poster: Misting in Ambient Bar-Cart Lighting",
    "Detail: Sculpted Wool Tweed Suit & Watch Chain",
    "Detail: Cigarette Tip & Ultrasonic Mist Vent",
    "Detail: Brushed Brass Base with Warm LED Ring",
  ];

  return (
    <div className="space-y-4">
      {/* Top Media Mode Toggle (Photos vs Real Video) */}
      <div className="flex items-center justify-between bg-vintage-900 border border-zinc-800 p-1.5 rounded-xl">
        <button
          onClick={() => setIsVideoMode(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            !isVideoMode
              ? "bg-gold-500 text-vintage-950 shadow-gold-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Product Photos ({images.length})</span>
        </button>

        <button
          onClick={() => setIsVideoMode(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            isVideoMode
              ? "bg-gold-500 text-vintage-950 shadow-gold-sm"
              : "text-zinc-400 hover:text-gold-400"
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Live Mist Video</span>
          <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.2 rounded font-black border border-red-500/30">
            REAL
          </span>
        </button>
      </div>

      {/* Main Showcase Stage */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-vintage-900 border border-gold-500/30 shadow-2xl group">
        {isVideoMode ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls
              poster="/img/figure-poster.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/img/figure.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-4 left-4 pointer-events-none bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold-500/40 text-xs text-gold-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Actual Video: Statue misting while remote is pressed</span>
            </div>
          </div>
        ) : (
          <>
            <Image
              src={images[selectedIndex] || images[0]}
              alt={title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />

            {/* Ambient Dark Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-950/80 via-transparent to-black/20 pointer-events-none" />

            {/* Quick angle indicator */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700 text-[11px] text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <span>{angleLabels[selectedIndex] || "Official Product View"}</span>
              </div>

              <button
                onClick={() => setIsVideoMode(true)}
                className="bg-gold-500/20 hover:bg-gold-500/40 backdrop-blur-md border border-gold-500/40 px-2.5 py-1 rounded text-[11px] font-bold text-gold-300 flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-gold-400" />
                <span>Watch Video</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedIndex(idx);
              setIsVideoMode(false);
            }}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              !isVideoMode && selectedIndex === idx
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
          </button>
        ))}
      </div>
    </div>
  );
}
