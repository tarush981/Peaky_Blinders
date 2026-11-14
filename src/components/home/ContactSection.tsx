"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err?.message || "Error submitting message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-vintage-950 border-b border-gold-500/15" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                DIRECT CONCIERGE DESK
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-zinc-100 mt-1">
                Contact The Garrison Chambers
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Have a question regarding corporate gifting, custom batch orders, or tracking an existing delivery? Our Bangalore concierge team is at your disposal.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-vintage-900 border border-zinc-800">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-zinc-200">Central Dispatch & Office</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    {siteConfig.contact.address.street}, {siteConfig.contact.address.city}, {siteConfig.contact.address.state} - {siteConfig.contact.address.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-vintage-900 border border-zinc-800">
                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-zinc-200">Email Inquiries</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">{siteConfig.contact.supportEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-vintage-900 border border-zinc-800">
                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-zinc-200">Telephone / WhatsApp</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">{siteConfig.contact.phone} ({siteConfig.contact.supportHours})</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-vintage-900 border border-gold-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
              {success ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-zinc-100">
                    Message Delivered
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                    Our concierge desk has received your communication and will reply via email or phone within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-gold-400 mt-2"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-zinc-100 mb-2">
                    Send A Direct Message
                  </h3>

                  {error && (
                    <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your inquiry or question here..."
                      className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-bold text-xs sm:text-sm tracking-wide hover:brightness-110 shadow-gold-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Transmitting..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
