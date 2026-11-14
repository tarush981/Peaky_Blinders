import { NextRequest, NextResponse } from "next/server";
import { getDiscount } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, cartSubtotal } = body;

    if (!code) {
      return NextResponse.json({ error: "Promo code required" }, { status: 400 });
    }

    const discount = await getDiscount(code);
    if (!discount) {
      return NextResponse.json(
        { error: "Invalid or expired promotional code" },
        { status: 404 }
      );
    }

    if (discount.minOrderValue && cartSubtotal < discount.minOrderValue) {
      return NextResponse.json(
        {
          error: `Minimum order value of ₹${discount.minOrderValue} required for this code`,
        },
        { status: 400 }
      );
    }

    let calculatedDiscount = 0;
    if (discount.discountPercent > 0) {
      calculatedDiscount = Math.round((cartSubtotal * discount.discountPercent) / 100);
    } else if (discount.flatDiscount) {
      calculatedDiscount = Math.min(discount.flatDiscount, cartSubtotal);
    }

    return NextResponse.json({
      success: true,
      discount: {
        code: discount.code,
        amount: calculatedDiscount,
        description: discount.description,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to validate discount" }, { status: 500 });
  }
}
