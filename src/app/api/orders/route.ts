import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/db";
import { generateOrderNumber } from "@/lib/utils";
import { Order } from "@/types";

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderNumber = generateOrderNumber();

    const newOrder: Order = {
      id: `pb_ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: body.customer,
      items: body.items,
      subtotal: body.subtotal,
      discountAmount: body.discountAmount || 0,
      discountCode: body.discountCode,
      shippingCharges: body.shippingCharges || 0,
      totalAmount: body.totalAmount,
      orderStatus: "confirmed",
      paymentStatus: body.paymentMethod === "cod" ? "pending" : "paid",
      paymentMethod: body.paymentMethod || "cod",
      trackingNumber: `PB-EXP-${Math.floor(100000 + Math.random() * 900000)}IN`,
      notes: body.notes || "",
    };

    const saved = await createOrder(newOrder);
    return NextResponse.json({ success: true, order: saved });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
