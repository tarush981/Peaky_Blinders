"use client";

import React, { useState } from "react";
import { initialFaqs } from "@/data/mockData";
import { ChevronDown, HelpCircle, ShieldAlert } from "lucide-react";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-vintage-900 border-b border-gold-500/15" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Everything You Need To Know
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-zinc-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Answers regarding delivery timelines, aroma oil compatibility, warranty, and payment safety.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {initialFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-vintage-950 border border-zinc-800 rounded-xl overflow-hidden transition-colors hover:border-gold-500/30"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-zinc-100 font-semibold text-sm sm:text-base focus:outline-none"
                >
                  <span className="font-medium text-zinc-200">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-850">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
