"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Check, Flame, Wind, Droplets, ShieldCheck } from "lucide-react";

export default function MistExperienceDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-16 bg-vintage-950 border-b border-gold-500/15 relative overflow-hidden" id="mist-demo">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Real Video Demonstration */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-gold-500/30 bg-black shadow-2xl group">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/img/figure-poster.jpg"
              className="w-full h-auto aspect-square object-cover"
            >
              <source src="/img/figure.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>

            {/* Video Control Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-zinc-700">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-gold-500 text-vintage-950 hover:brightness-110 transition-all"
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-xs text-zinc-300 font-mono">
                  Real Video Demonstration
                </span>
              </div>

              <span className="text-[10px] bg-gold-500/20 text-gold-400 font-bold px-2 py-0.5 rounded border border-gold-500/30">
                WIRELESS REMOTE CONTROL
              </span>
            </div>
          </div>

          {/* Right Column: Story & Mechanics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Official Product Experience
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100 leading-tight">
              Style Lives in the Mist.
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Meet the 28 cm hand-painted boss of Small Heath: tweed three-piece, flat cap, pocket watch chain and a stare that could clear a pub. He sits in a tufted leather-look Chesterfield on a brushed-brass base.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Press the remote and real cool mist curls off the cigarette while a warm LED ring lights the base from below. USB-C powered, fill with a few drops of water, runs for about 40 minutes a fill. Comes in a black gift box, because someone you know needs this.
            </p>

            {/* Quick feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-vintage-900 border border-zinc-800 text-xs text-zinc-200">
                <Wind className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Real Ultrasonic Mist Vapor</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-vintage-900 border border-zinc-800 text-xs text-zinc-200">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Warm Golden LED Base Glow</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-vintage-900 border border-zinc-800 text-xs text-zinc-200">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Wireless Multi-button Remote</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-vintage-900 border border-zinc-800 text-xs text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Heat, Completely Pet-Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
