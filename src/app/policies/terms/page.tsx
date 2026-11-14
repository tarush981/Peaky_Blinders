import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function TermsOfServicePage() {
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
          Terms of Service & Brand Notice
        </h1>
        <p className="text-xs text-gold-400 font-mono mb-8 uppercase tracking-widest">
          Independent Educational & Collectible Commerce Notice
        </p>

        <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>1. Independent Brand Statement</span>
            </h2>
            <p>
              {siteConfig.name} is an independent artisanal design workshop producing vintage-inspired decorative sculptures and ultrasonic mist diffusers. We are not officially affiliated with, endorsed by, or directly sponsored by Caryn Mandabach Productions, Tiger Aspect Productions, the BBC, or official television rights holders.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold-400" />
              <span>2. Product Use & Safety Guidelines</span>
            </h2>
            <p>
              The Tommy Shelby Smoking Boss Diffuser operates strictly on cold ultrasonic vapor technology using water and water-soluble essential oils. It produces NO smoke, NO fire, and NO combustion. Do not attempt to burn real tobacco or ignite combustible substances inside the statue.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-zinc-100">
              3. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service and any transactional disputes arising hereunder shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Bengaluru, Karnataka.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
