"use client";

import React, { useState } from "react";
import { Mail, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");

      setStatus("success");
      setCouponCode("PEAKY10");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Error subscribing");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-vintage-950 to-vintage-900 border-b border-gold-500/15 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-4">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100">
          Join The Garrison Private Syndicate
        </h2>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          Subscribe to confidential product drop alerts, limited batch numbers, and receive an instant 10% coupon for your first order.
        </p>

        {status === "success" ? (
          <div className="mt-8 p-6 bg-vintage-900 border border-gold-500/40 rounded-2xl max-w-md mx-auto space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-zinc-100">
              Welcome to the Inner Circle
            </h4>
            <p className="text-xs text-zinc-400">
              Use your exclusive coupon code below at checkout:
            </p>
            <div className="inline-block px-4 py-2 bg-gold-500/20 border border-gold-500 font-mono font-bold text-gold-300 text-base rounded-lg tracking-widest">
              {couponCode}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your private email..."
              className="flex-1 px-4 py-3 bg-vintage-900 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-bold text-xs sm:text-sm rounded-xl hover:brightness-110 shadow-gold-sm transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>{status === "loading" ? "Joining..." : "Get 10% OFF"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-xs mt-3">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
