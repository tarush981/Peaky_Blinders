import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { updateOrderStatus } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    if (webhookSecret) {
      const isValid = verifyWebhookSignature({
        body: rawBody,
        signature,
        secret: webhookSecret,
      });

      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 400 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const notes = payment.notes || {};
      const orderNumber = notes.orderNumber;
      if (orderNumber) {
        await updateOrderStatus(orderNumber, "confirmed", "paid");
      }
    } else if (event === "payment.failed") {
      const payment = payload.payload.payment.entity;
      const notes = payment.notes || {};
      const orderNumber = notes.orderNumber;
      if (orderNumber) {
        await updateOrderStatus(orderNumber, "cancelled", "failed");
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Razorpay webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
