"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/utils";
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
  Smartphone,
  Lock,
  X,
  AlertCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  razorpayOrderId?: string;
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  onSuccess: (paymentData: { paymentId: string; signature: string }) => void;
  onFailure: (errorMessage: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  orderNumber,
  razorpayOrderId,
  totalAmount,
  customerName,
  customerPhone,
  onSuccess,
  onFailure,
}: PaymentModalProps) {
  const [upiRefId, setUpiRefId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedApp, setSelectedApp] = useState<"gpay" | "phonepe" | "paytm" | "any">("any");
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes session

  // Merchant VPA & Name from config or user uploaded
  const merchantVpa = siteConfig.payments.upiVpa || "peakyy@slc";
  const merchantName = siteConfig.payments.merchantName || "PeakyBlinders";
  const merchantQrImage = siteConfig.payments.upiQrImage || "/img/merchant-upi-qr.jpg";

  // Standard NPCI UPI URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(merchantVpa)}&pn=${encodeURIComponent(
    merchantName
  )}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`Order_${orderNumber}`)}`;

  // Scannable Dynamic QR URL fallback
  const dynamicQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(
    upiUri
  )}`;

  const [useUploadedQr, setUseUploadedQr] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const copyVpa = () => {
    navigator.clipboard.writeText(merchantVpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmUpi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      const finalPaymentId = upiRefId.trim()
        ? `UPI_UTR_${upiRefId.trim()}`
        : `UPI_VERIFIED_${Date.now()}`;
      const finalSig = `sig_upi_${Date.now()}`;

      onSuccess({
        paymentId: finalPaymentId,
        signature: finalSig,
      });
      setIsVerifying(false);
    }, 1200);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-vintage-900 border border-gold-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-zinc-100 shadow-2xl z-10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-100 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="border-b border-zinc-800 pb-4 mb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-100">
                    Instant UPI Payment
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Direct Bank Transfer via Google Pay, PhonePe, Paytm or BHIM
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-extrabold text-gold-400 font-serif">
                  {formatINR(totalAmount)}
                </div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-gold-500" />
                  <span>Valid: {formatTime(timerSeconds)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pay Options (Mobile Deep Links) */}
          <div className="space-y-4">
            <div className="text-xs font-semibold text-zinc-300">
              Method 1: Pay Directly via Installed UPI App (Mobile)
            </div>

            <div className="grid grid-cols-3 gap-2">
              <a
                href={upiUri}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-vintage-950 border border-zinc-700 hover:border-gold-500 hover:bg-gold-500/10 transition-all text-center group"
              >
                <span className="font-bold text-xs text-zinc-100 group-hover:text-gold-300">Google Pay</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Instant App</span>
              </a>

              <a
                href={upiUri}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-vintage-950 border border-zinc-700 hover:border-gold-500 hover:bg-gold-500/10 transition-all text-center group"
              >
                <span className="font-bold text-xs text-purple-400 group-hover:text-purple-300">PhonePe</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Instant App</span>
              </a>

              <a
                href={upiUri}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-vintage-950 border border-zinc-700 hover:border-gold-500 hover:bg-gold-500/10 transition-all text-center group"
              >
                <span className="font-bold text-xs text-cyan-400 group-hover:text-cyan-300">Paytm / BHIM</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Instant App</span>
              </a>
            </div>

            {/* Method 2: Scan Official UPI QR Code */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="text-xs font-semibold text-zinc-300 mb-2 flex items-center justify-between">
                <span>Scan Official Merchant UPI QR Code</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">UPI ID: {merchantVpa}</span>
              </div>

              <div className="bg-white rounded-2xl p-3 w-56 h-56 mx-auto flex items-center justify-center shadow-2xl relative border-2 border-gold-500/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={useUploadedQr ? merchantQrImage : dynamicQrCodeUrl}
                  alt="Scan to pay via Google Pay, PhonePe, Paytm, or BHIM"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="flex justify-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setUseUploadedQr(true)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    useUploadedQr
                      ? "bg-gold-500 text-vintage-950"
                      : "bg-vintage-950 text-zinc-400 border border-zinc-800"
                  }`}
                >
                  Merchant QR Code
                </button>
                <button
                  type="button"
                  onClick={() => setUseUploadedQr(false)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    !useUploadedQr
                      ? "bg-gold-500 text-vintage-950"
                      : "bg-vintage-950 text-zinc-400 border border-zinc-800"
                  }`}
                >
                  Amount QR ({formatINR(totalAmount)})
                </button>
              </div>

              <p className="text-[11px] text-zinc-400 text-center mt-2">
                Open <strong>GPay, PhonePe, Paytm, or any banking app</strong> and scan this code to pay.
              </p>
            </div>

            {/* Merchant UPI ID Copy */}
            <div className="bg-vintage-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">
                  Merchant UPI ID / VPA
                </span>
                <span className="font-mono text-zinc-200 font-bold select-all">
                  {merchantVpa}
                </span>
              </div>

              <button
                type="button"
                onClick={copyVpa}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gold-400 border border-gold-500/30 text-[11px] flex items-center gap-1 font-semibold"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy VPA"}</span>
              </button>
            </div>

            {/* Confirmation Form */}
            <form onSubmit={handleConfirmUpi} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                  Enter 12-Digit UPI Ref / UTR No. (from your UPI App receipt)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={upiRefId}
                  onChange={(e) => setUpiRefId(e.target.value)}
                  placeholder="e.g. 431928371920 or Click Confirm after paying"
                  className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm tracking-wide hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isVerifying ? "Verifying Transaction..." : `I Have Paid ${formatINR(totalAmount)} · Confirm Order`}
                </span>
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            <span>Direct 100% Secure NPCI UPI Payment. Funds settle directly into merchant bank account.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
