import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, receipt } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid order amount" },
        { status: 400 }
      );
    }

    const orderNumber = receipt || generateOrderNumber();
    const razorpayOrder = await createRazorpayOrder({
      amountInRupees: amount,
      receipt: orderNumber,
      notes: {
        store: "PeakyBlinders-Tommyshelby",
        orderNumber,
      },
    });

    return NextResponse.json({
      success: true,
      order: razorpayOrder,
      orderNumber,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
