"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import PaymentModal from "@/components/checkout/PaymentModal";
import {
  ShieldCheck,
  Truck,
  Lock,
  ArrowLeft,
  CheckCircle,
  Tag,
  CreditCard,
  Banknote,
  Gift,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discountAmount,
    discountCode,
    shippingCharges,
    totalAmount,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Maharashtra",
    postalCode: "",
    country: "India",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Test Payment Modal State
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [currentOrderData, setCurrentOrderData] = useState<{
    orderNumber: string;
    razorpayOrderId: string;
    totalAmount: number;
    orderDetails: any;
  } | null>(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      // Allow slight grace on initial mount
    }
  }, [items]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before proceeding.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.city || !formData.postalCode) {
      setErrorMessage("Please complete all required shipping fields.");
      return;
    }

    setSubmitting(true);

    try {
      if (paymentMethod === "cod") {
        // Handle Cash On Delivery direct order creation
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: formData,
            items,
            subtotal,
            discountAmount,
            discountCode,
            shippingCharges,
            totalAmount,
            paymentMethod: "cod",
            notes: formData.notes,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to place COD order");

        clearCart();
        router.push(`/order-success/${data.order.id}`);
        return;
      }

      // Handle Razorpay Payment flow
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          receipt: `PB-${Date.now().toString(36).toUpperCase()}`,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to initialize payment");

      const orderDetails = {
        orderNumber: orderData.orderNumber,
        customer: formData,
        items,
        subtotal,
        discountAmount,
        discountCode,
        shippingCharges,
        totalAmount,
        paymentMethod: "razorpay",
        notes: formData.notes,
      };

      // Check if official window.Razorpay script loaded and credentials exist
      const hasRealKey =
        orderData.keyId &&
        orderData.keyId !== "rzp_test_placeholder" &&
        typeof window !== "undefined" &&
        window.Razorpay;

      if (hasRealKey) {
        const options = {
          key: orderData.keyId,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: siteConfig.name,
          description: "Tommy Shelby Smoking Boss Diffuser",
          order_id: orderData.order.orderId,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#d4af37",
          },
          handler: async function (response: any) {
            await verifyAndCompleteOrder({
              orderId: orderData.order.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              orderDetails,
            });
          },
          modal: {
            ondismiss: function () {
              setSubmitting(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          setErrorMessage(response.error.description || "Payment was unsuccessful. Please retry.");
          setSubmitting(false);
        });
        rzp.open();
      } else {
        // Open the built-in Razorpay Test Sandbox modal
        setCurrentOrderData({
          orderNumber: orderData.orderNumber,
          razorpayOrderId: orderData.order.orderId,
          totalAmount,
          orderDetails,
        });
        setTestModalOpen(true);
        setSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Checkout error occurred");
      setSubmitting(false);
    }
  };

  const verifyAndCompleteOrder = async ({
    orderId,
    paymentId,
    signature,
    orderDetails,
  }: {
    orderId: string;
    paymentId: string;
    signature: string;
    orderDetails: any;
  }) => {
    try {
      const verifyRes = await fetch("/api/razorpay/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
          orderDetails,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || "Payment verification failed");

      clearCart();
      router.push(`/order-success/${verifyData.order.id}`);
    } catch (err: any) {
      setErrorMessage(err?.message || "Order verification failed");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-vintage-950 text-zinc-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>

          <div className="border-b border-zinc-800 pb-5 mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
              Garrison Express Checkout
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Complete your consignment delivery details. Fast dispatch across all 28 states & UTs in India.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs sm:text-sm">
              {errorMessage}
            </div>
          )}

          {items.length === 0 ? (
            <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto">
              <h3 className="font-serif text-xl font-bold text-zinc-200">
                Your Cart Is Currently Empty
              </h3>
              <p className="text-xs text-zinc-400">
                Choose a single unit or value syndicate pack to initiate checkout.
              </p>
              <Link
                href="/#product-showcase"
                className="inline-block px-6 py-3 rounded-xl bg-gold-500 text-vintage-950 font-bold text-xs"
              >
                Return to Product Showcase
              </Link>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Customer & Shipping Address (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Contact Information */}
                <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-zinc-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-mono">
                      1
                    </span>
                    <span>Contact Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Thomas Shelby"
                        className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Email Address (for order tracking) *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. thomas@garrison.in"
                        className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Phone Number (for Courier Delivery SMS/Call) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3.5 bg-vintage-850 border border-r-0 border-zinc-700 rounded-l-xl text-xs text-zinc-400 font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98765 43210"
                        className="flex-1 px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-r-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-zinc-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-mono">
                      2
                    </span>
                    <span>Shipping Address (India)</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Street Address & House/Flat No. *
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      required
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="e.g. Flat 302, Richmond Residency, MG Road"
                      className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Apartment, Landmark, Suite (Optional)
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="e.g. Near Metro Station / Garrison Lane"
                      className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Mumbai"
                        className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-gold-500"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        maxLength={6}
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="e.g. 400001"
                        className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Call before delivery, leave with building security..."
                      className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                {/* 3. Payment Method Selection */}
                <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-zinc-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-mono">
                      3
                    </span>
                    <span>Select Payment Option</span>
                  </h3>

                  <div className="space-y-3">
                    {/* Razorpay Online */}
                    <label
                      onClick={() => setPaymentMethod("razorpay")}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "razorpay"
                          ? "border-gold-500 bg-gold-500/10 shadow-gold-sm"
                          : "border-zinc-800 bg-vintage-950"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="mt-1 text-gold-500 focus:ring-gold-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gold-400" />
                            <span>Razorpay Instant Online Payment</span>
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                            FASTEST DISPATCH
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Google Pay, PhonePe, Paytm, BHIM UPI, Credit/Debit Cards, Netbanking (50+ banks).
                        </p>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-gold-500 bg-gold-500/10 shadow-gold-sm"
                          : "border-zinc-800 bg-vintage-950"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1 text-gold-500 focus:ring-gold-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-zinc-400" />
                            <span>Cash on Delivery (COD)</span>
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Available across India
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Pay cash or UPI directly to the courier executive upon doorstep inspection.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Place Order (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-vintage-900 border border-gold-500/30 rounded-2xl p-6 shadow-xl sticky top-28 space-y-5">
                  <h3 className="font-serif text-lg font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                    Consignment Summary
                  </h3>

                  {/* Items List */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 text-xs bg-vintage-950/80 p-2.5 rounded-xl border border-zinc-850"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-zinc-100 line-clamp-1">
                            {item.title}
                          </div>
                          {item.bundleName && (
                            <div className="text-[11px] text-gold-400 font-medium">
                              {item.bundleName}
                            </div>
                          )}
                          <div className="flex justify-between items-center mt-1 text-zinc-400">
                            <span>Qty: {item.quantity}</span>
                            <span className="font-bold text-zinc-200">
                              {formatINR(item.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-zinc-800 pt-4 space-y-2 text-xs text-zinc-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-zinc-200 font-medium">{formatINR(subtotal)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Coupon Savings ({discountCode})</span>
                        <span>-{formatINR(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>All India Express Courier</span>
                      <span className="text-gold-400 font-bold">
                        {shippingCharges === 0 ? "FREE" : formatINR(shippingCharges)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-extrabold text-zinc-100 pt-3 border-t border-zinc-800">
                      <span className="font-serif">Total Payable</span>
                      <span className="text-gold-400 font-serif text-lg">
                        {formatINR(totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-black text-sm tracking-wider uppercase hover:brightness-110 shadow-gold-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {submitting
                        ? "Connecting Gateway..."
                        : paymentMethod === "cod"
                        ? "Confirm Cash On Delivery Order"
                        : `Pay ${formatINR(totalAmount)} with Razorpay`}
                    </span>
                  </button>

                  {/* Trust guarantees */}
                  <div className="space-y-2 pt-2 border-t border-zinc-850 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>BlueDart / Delhivery Air Priority 3-5 Days Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Razorpay Test Payment Sandbox Modal */}
      {currentOrderData && (
        <PaymentModal
          isOpen={testModalOpen}
          onClose={() => setTestModalOpen(false)}
          orderNumber={currentOrderData.orderNumber}
          razorpayOrderId={currentOrderData.razorpayOrderId}
          totalAmount={currentOrderData.totalAmount}
          customerName={formData.fullName}
          onSuccess={async ({ paymentId, signature }) => {
            setTestModalOpen(false);
            await verifyAndCompleteOrder({
              orderId: currentOrderData.razorpayOrderId,
              paymentId,
              signature,
              orderDetails: currentOrderData.orderDetails,
            });
          }}
          onFailure={(error) => {
            setTestModalOpen(false);
            setErrorMessage(error);
          }}
        />
      )}
    </>
  );
}
