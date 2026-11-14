"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Review } from "@/types";
import { initialReviews } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import ReviewModal from "./ReviewModal";
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, ShieldCheck } from "lucide-react";

interface ReviewsSectionProps {
  productId: string;
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [modalOpen, setModalOpen] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const toggleHelpful = (id: string) => {
    if (helpfulClicked[id]) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    setHelpfulClicked((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 bg-vintage-950 border-b border-gold-500/15" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Rating Summary */}
        <div className="bg-vintage-900/80 rounded-2xl border border-zinc-800 p-8 mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: Overall Score */}
            <div className="text-center md:text-left">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-mono">
                CUSTOMER TESTIMONIALS & REVIEWS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-1">
                4.9 Out Of 5 Stars
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-zinc-400">
                  Based on 1,204+ verified customer reviews
                </span>
              </div>
            </div>

            {/* Middle: Rating Breakdown Bars */}
            <div className="w-full max-w-xs space-y-1.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-8">5 Star</span>
                <div className="flex-1 h-2 bg-vintage-800 rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-gold-400 rounded-full" />
                </div>
                <span className="w-8 text-right font-mono">96%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8">4 Star</span>
                <div className="flex-1 h-2 bg-vintage-800 rounded-full overflow-hidden">
                  <div className="w-[3%] h-full bg-gold-400 rounded-full" />
                </div>
                <span className="w-8 text-right font-mono">3%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8">3 Star</span>
                <div className="flex-1 h-2 bg-vintage-800 rounded-full overflow-hidden">
                  <div className="w-[1%] h-full bg-gold-400 rounded-full" />
                </div>
                <span className="w-8 text-right font-mono">1%</span>
              </div>
            </div>

            {/* Right: Write Review Button */}
            <div>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-vintage-950 font-extrabold text-xs sm:text-sm shadow-gold-sm transition-all"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write A Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-vintage-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-500/30 transition-all shadow-lg"
            >
              {/* Review photo if available */}
              {rev.avatar && (
                <div className="relative w-full aspect-video bg-zinc-800 overflow-hidden">
                  <Image
                    src={rev.avatar}
                    alt={rev.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-gold-300">
                    Customer Photo
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Stars & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? "fill-amber-400 text-amber-400"
                              : "stroke-zinc-600 fill-transparent"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {formatDate(rev.date)}
                    </span>
                  </div>

                  {/* Title & Content */}
                  <h4 className="font-bold text-sm text-zinc-100 mb-2">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {rev.content}
                  </p>
                </div>

                {/* Footer: Author Info & Helpful */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-zinc-200">{rev.author}</div>
                    <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <span>{rev.location}</span>
                      <span>•</span>
                      <span className="text-emerald-400 flex items-center gap-0.5 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleHelpful(rev.id)}
                    disabled={helpfulClicked[rev.id]}
                    className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded transition-colors ${
                      helpfulClicked[rev.id]
                        ? "text-gold-400 bg-gold-500/10"
                        : "text-zinc-500 hover:text-zinc-300 bg-vintage-950 border border-zinc-800"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.helpfulCount}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onReviewSubmitted={fetchReviews}
        productId={productId}
      />
    </section>
  );
}
