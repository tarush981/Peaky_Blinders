"use client";

import React, { useState } from "react";
import { Flame, Wind, Droplet, Moon, Sparkles, Check } from "lucide-react";

export default function MistExperienceDemo() {
  const [activeMode, setActiveMode] = useState<"smoking" | "amber" | "aroma" | "stealth">("smoking");

  const modes = [
    {
      id: "smoking",
      title: "Cigarette Mist Pose",
      desc: "Micro-chimney guides ultrasonic vapor out of the glowing cigarette tip.",
      icon: Wind,
      color: "from-amber-500/20 to-gold-500/10",
      accent: "text-amber-400",
    },
    {
      id: "amber",
      title: "Hearth Ember Glow",
      desc: "Simulates warm firelight on Tommy's sculpted trench coat and cheekbones.",
      icon: Flame,
      color: "from-orange-500/20 to-amber-500/10",
      accent: "text-orange-400",
    },
    {
      id: "aroma",
      title: "Artisan Aromatherapy",
      desc: "Diffuses rich essential oils (Tobacco, Cedar, Sandalwood) up to 25 sq.m.",
      icon: Droplet,
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
    },
    {
      id: "stealth",
      title: "Executive Sleep Mode",
      desc: "Lights dimmed, ultra-silent (<25dB) whisper vapor with auto-cutoff.",
      icon: Moon,
      color: "from-blue-500/20 to-indigo-500/10",
      accent: "text-blue-400",
    },
  ];

  return (
    <section className="py-16 bg-vintage-950 border-b border-gold-500/15 relative overflow-hidden" id="mist-demo">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering & Artistry
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            The Ultrasonic Smoking Mechanism
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Unlike standard plastic humidifiers, this statue houses an internally routed brass-lined micro-conduit. Watch how real cool-mist mimics Tommy's cigarette smoke without flame or heat.
          </p>
        </div>

        {/* Interactive Mode Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id as any)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-gold-500 bg-gradient-to-b from-vintage-850 to-vintage-900 shadow-gold-sm"
                    : "border-zinc-800 bg-vintage-900/60 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? "bg-gold-500 text-vintage-950"
                        : "bg-vintage-800 text-zinc-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-zinc-100">{mode.title}</h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{mode.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Display Console */}
        <div className="bg-gradient-to-b from-vintage-900 to-vintage-950 border border-gold-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visualizer Box */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-xl bg-black border border-zinc-800 overflow-hidden flex items-center justify-center">
              {/* Radial gradient background based on mode */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeMode === "smoking"
                    ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/60 via-zinc-950 to-black"
                    : activeMode === "amber"
                    ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/80 via-zinc-950 to-black"
                    : activeMode === "aroma"
                    ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/50 via-zinc-950 to-black"
                    : "bg-black"
                }`}
              />

              {/* Statuette Silhouette */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-36 h-48 rounded-t-full bg-gradient-to-b from-zinc-800 to-zinc-950 border border-gold-500/20 relative shadow-2xl flex flex-col items-center pt-4">
                  {/* Peak hat rim */}
                  <div className="w-28 h-4 rounded-full bg-zinc-900 border-b border-zinc-700 shadow-md" />
                  {/* Face silhouette */}
                  <div className="w-16 h-20 bg-zinc-850 rounded-b-xl mt-1 flex flex-col items-center justify-center relative">
                    {/* Cigarette protruding */}
                    <div className="absolute -bottom-1 -right-4 w-7 h-1.5 bg-zinc-300 rounded-sm shadow-sm flex items-center justify-end pr-0.5">
                      {/* Burning ember */}
                      {(activeMode === "smoking" || activeMode === "amber") && (
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping shadow-[0_0_12px_#f59e0b]" />
                      )}
                    </div>
                  </div>
                  {/* Trench coat collar */}
                  <div className="w-32 h-20 bg-zinc-900 rounded-t-lg mt-2 border-t border-zinc-700" />
                </div>

                {/* Base with LED fire ring */}
                <div
                  className={`w-48 h-8 rounded-full border transition-all duration-700 ${
                    activeMode === "amber"
                      ? "border-amber-500/80 bg-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.6)]"
                      : activeMode === "aroma"
                      ? "border-emerald-500/80 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                      : "border-gold-500/40 bg-vintage-900 shadow-gold-sm"
                  }`}
                />

                {/* Animated Rising Vapor */}
                {(activeMode === "smoking" || activeMode === "aroma") && (
                  <div className="absolute -top-10 right-1/3 flex flex-col items-center pointer-events-none">
                    <div className="w-8 h-16 bg-gradient-to-t from-zinc-200/50 via-zinc-400/20 to-transparent blur-sm rounded-full animate-smoke" />
                    <div className="w-12 h-24 bg-gradient-to-t from-white/40 via-zinc-300/10 to-transparent blur-md rounded-full animate-smoke [animation-delay:1.2s]" />
                  </div>
                )}
              </div>

              {/* Live Status Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-vintage-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-700 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300 font-mono">
                  {activeMode === "smoking" && "Cigarette Mist Output: 40 ml/h"}
                  {activeMode === "amber" && "Amber Hearth LED: Breathing Active"}
                  {activeMode === "aroma" && "Essential Oil Diffusing: Active"}
                  {activeMode === "stealth" && "Whisper Sleep Mode: < 22dB"}
                </span>
              </div>
            </div>

            {/* Feature Description Details */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
                {activeMode === "smoking" && "Authentic Cigar / Cigarette Mist"}
                {activeMode === "amber" && "Warm Ambient Hearth Ember"}
                {activeMode === "aroma" && "Bespoke Aromatherapy Reservoir"}
                {activeMode === "stealth" && "Whisper-Quiet Sleep Engine"}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {activeMode === "smoking" &&
                  "A micro-machined internal channel routes ultrasonic cold mist straight to the cigarette tip, giving the illusion of continuous smoke. 100% cool to touch, completely pet-safe and fire-hazard free."}
                {activeMode === "amber" &&
                  "Warm 2200K LEDs illuminate the statue from within the pedestal and cigarette tip, casting cinematic shadows across the vintage peaked cap and facial profile."}
                {activeMode === "aroma" &&
                  "Formulated to work with concentrated botanical oils. Just 3 drops of Tobacco & English Oak scent infuse your living room or executive office with an aristocratic scent."}
                {activeMode === "stealth" &&
                  "Engineered with a ceramic ultrasonic core operating below 25 decibels—quieter than a whisper. Features auto-cutoff when the 180ml reservoir empties."}
              </p>

              <div className="pt-2 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>No heat, hot water or combustible components</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Universal USB-C powered for desk, bedroom or car</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Certified CE, RoHS and FCC compliant electronics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
