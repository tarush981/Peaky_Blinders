import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { createOrder, getOrderById } from "@/lib/db";
import { Order } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required payment parameters" },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || "simulated_valid_sig",
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed: Invalid signature" },
        { status: 400 }
      );
    }

    // Check duplicate order prevention
    if (orderDetails?.id) {
      const existing = await getOrderById(orderDetails.id);
      if (existing) {
        return NextResponse.json({
          success: true,
          message: "Order already verified and recorded",
          order: existing,
        });
      }
    }

    // Construct confirmed order
    const finalOrder: Order = {
      id: orderDetails.id || `pb_ord_${Date.now()}`,
      orderNumber: orderDetails.orderNumber,
      createdAt: new Date().toISOString(),
      customer: orderDetails.customer,
      items: orderDetails.items,
      subtotal: orderDetails.subtotal,
      discountAmount: orderDetails.discountAmount || 0,
      discountCode: orderDetails.discountCode,
      shippingCharges: orderDetails.shippingCharges || 0,
      totalAmount: orderDetails.totalAmount,
      orderStatus: "confirmed",
      paymentStatus: "paid",
      paymentMethod: orderDetails.paymentMethod || "razorpay",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      trackingNumber: `PB-EXP-${Math.floor(100000 + Math.random() * 900000)}IN`,
      notes: orderDetails.notes || "",
    };

    const savedOrder = await createOrder(finalOrder);

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and order recorded",
      order: savedOrder,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
