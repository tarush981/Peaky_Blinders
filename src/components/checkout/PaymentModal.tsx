"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, AlertCircle, Smartphone, CreditCard, Landmark, X } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  razorpayOrderId: string;
  totalAmount: number;
  customerName: string;
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
  onSuccess,
  onFailure,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const simulateSuccess = () => {
    setProcessing(true);
    setTimeout(() => {
      const simulatedPaymentId = `pay_rzp_${Date.now()}`;
      const simulatedSignature = `sig_${Date.now()}_pb_verified`;
      onSuccess({
        paymentId: simulatedPaymentId,
        signature: simulatedSignature,
      });
      setProcessing(false);
    }, 1200);
  };

  const simulateFailure = () => {
    setProcessing(true);
    setTimeout(() => {
      onFailure("Bank server declined transaction: Insufficient balance or test user decline.");
      setProcessing(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-vintage-900 border border-gold-500/40 rounded-2xl max-w-md w-full p-6 text-zinc-100 shadow-2xl z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="border-b border-zinc-800 pb-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Razorpay Test Sandbox</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-100 mt-1">
              Complete Payment ({formatINR(totalAmount)})
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Ref: {orderNumber} • Client: {customerName}
            </p>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            <button
              onClick={() => setMethod("upi")}
              className={`p-3 rounded-xl border text-center transition-all ${
                method === "upi"
                  ? "border-gold-500 bg-gold-500/10 text-gold-300 font-bold"
                  : "border-zinc-800 bg-vintage-950 text-zinc-400"
              }`}
            >
              <Smartphone className="w-4 h-4 mx-auto mb-1 text-gold-400" />
              <span className="text-[11px] block">UPI / QR</span>
            </button>

            <button
              onClick={() => setMethod("card")}
              className={`p-3 rounded-xl border text-center transition-all ${
                method === "card"
                  ? "border-gold-500 bg-gold-500/10 text-gold-300 font-bold"
                  : "border-zinc-800 bg-vintage-950 text-zinc-400"
              }`}
            >
              <CreditCard className="w-4 h-4 mx-auto mb-1 text-gold-400" />
              <span className="text-[11px] block">Debit / Card</span>
            </button>

            <button
              onClick={() => setMethod("netbanking")}
              className={`p-3 rounded-xl border text-center transition-all ${
                method === "netbanking"
                  ? "border-gold-500 bg-gold-500/10 text-gold-300 font-bold"
                  : "border-zinc-800 bg-vintage-950 text-zinc-400"
              }`}
            >
              <Landmark className="w-4 h-4 mx-auto mb-1 text-gold-400" />
              <span className="text-[11px] block">Net Banking</span>
            </button>
          </div>

          {/* Method Content */}
          <div className="p-4 rounded-xl bg-vintage-950 border border-zinc-800 text-xs space-y-3 mb-6">
            {method === "upi" && (
              <div className="text-center space-y-2">
                <div className="font-semibold text-zinc-200">
                  Select Instant UPI App
                </div>
                <div className="flex justify-center gap-2 pt-1 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-gold-300">Google Pay</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-purple-300">PhonePe</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-cyan-300">Paytm</span>
                </div>
                <p className="text-[11px] text-zinc-500 pt-1">
                  Razorpay Order ID: <code className="text-gold-400">{razorpayOrderId}</code>
                </p>
              </div>
            )}

            {method === "card" && (
              <div className="space-y-2 text-zinc-300">
                <div className="flex justify-between text-[11px]">
                  <span>Test Card:</span>
                  <span className="font-mono text-gold-400">4111 •••• •••• 1111</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Gateway:</span>
                  <span>Razorpay SafePass 2.0 (Verified by Visa / RuPay)</span>
                </div>
              </div>
            )}

            {method === "netbanking" && (
              <div className="space-y-1 text-center text-zinc-400">
                <p className="text-zinc-200 font-medium">Supported Banks (50+)</p>
                <p className="text-[11px]">HDFC, ICICI, SBI, Axis, Kotak Mahindra</p>
              </div>
            )}
          </div>

          {/* Test Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={simulateSuccess}
              disabled={processing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm tracking-wide hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {processing ? "Authorizing with Bank..." : `Pay ${formatINR(totalAmount)} (Success)`}
              </span>
            </button>

            <button
              onClick={simulateFailure}
              disabled={processing}
              className="w-full py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Simulate Payment Failure (Test Error Handling)</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-center text-[10px] text-zinc-500">
            Razorpay Test Environment. No real funds will be deducted.
          </div>
        </div>
      </div>
    </div>
  );
}
