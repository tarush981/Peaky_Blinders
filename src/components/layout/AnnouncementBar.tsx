"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Clock, Truck, ShieldCheck } from "lucide-react";

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 48, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-vintage-950 via-gold-950 to-vintage-950 text-gold-300 border-b border-gold-500/20 text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/30">
            FESTIVE DROP
          </span>
          <span className="text-zinc-200">
            Flat 50% OFF + Free Express Shipping across India Today Only
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-gold-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-zinc-400">Ends in:</span>
            <span className="font-mono font-bold tracking-wider text-gold-300 bg-black/40 px-2 py-0.5 rounded border border-gold-500/30">
              {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-zinc-400">
            <Truck className="w-3.5 h-3.5 text-gold-500" />
            <span>Dispatched in 24 Hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
