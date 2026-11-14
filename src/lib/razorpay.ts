import crypto from "crypto";
import Razorpay from "razorpay";

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

export const isRazorpayConfigured = Boolean(keyId && keySecret);

let razorpayInstance: Razorpay | null = null;

if (isRazorpayConfigured) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (err) {
    console.error("Failed to initialize Razorpay instance:", err);
  }
}

export interface CreateOrderParams {
  amountInRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  isTestMock: boolean;
}

export async function createRazorpayOrder({
  amountInRupees,
  receipt,
  notes = {},
}: CreateOrderParams): Promise<RazorpayOrderResult> {
  const amountInPaise = Math.round(amountInRupees * 100);

  if (razorpayInstance && isRazorpayConfigured) {
    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receipt.slice(0, 40),
      notes,
    });

    return {
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      isTestMock: false,
    };
  }

  // Simulated Test Order for local development / testing without live keys
  const mockOrderId = `order_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  return {
    orderId: mockOrderId,
    amount: amountInPaise,
    currency: "INR",
    isTestMock: true,
  };
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!isRazorpayConfigured || !keySecret) {
    // In local test mock mode, accept valid-format test signatures
    return orderId.startsWith("order_test_") || signature.length > 5;
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}

export function verifyWebhookSignature({
  body,
  signature,
  secret,
}: {
  body: string;
  signature: string;
  secret: string;
}): boolean {
  if (!secret) return true;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expected === signature;
}
