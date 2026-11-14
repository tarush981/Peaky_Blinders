"use client";

import React, { useState } from "react";
import { Star, X, CheckCircle, ShieldCheck } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
  productId: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onReviewSubmitted,
  productId,
}: ReviewModalProps) {
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content || !title) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          author,
          location: location || "India",
          rating,
          title,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setSubmitted(true);
      setTimeout(() => {
        onReviewSubmitted();
        onClose();
        setSubmitted(false);
        setAuthor("");
        setLocation("");
        setTitle("");
        setContent("");
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-vintage-900 border border-gold-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-zinc-100 shadow-2xl z-10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-400 hover:text-gold-400"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-zinc-100">
                Review Submitted!
              </h3>
              <p className="text-zinc-400 text-sm">
                Thank you for contributing your thoughts to the Garrison community.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
                  Write A Customer Review
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Share your experience with the Tommy Shelby Smoking Boss Diffuser.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (hoverRating || rating) >= star
                            ? "fill-amber-400"
                            : "stroke-zinc-600 fill-transparent"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gold-400 font-bold self-center ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Karan Malhotra"
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    City, State
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai, MH"
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The cigarette mist looks unbelievable on my desk"
                  className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Detailed Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share details about the packaging, build quality, smoke effect, and aroma..."
                  className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-bold text-xs sm:text-sm tracking-wide hover:brightness-110 shadow-gold-sm transition-all"
              >
                {submitting ? "Publishing Review..." : "Submit Verified Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
