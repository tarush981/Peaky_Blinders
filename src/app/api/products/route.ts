import { NextRequest, NextResponse } from "next/server";
import { getProducts, updateProduct } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { error: "Unauthorized access. Administrator authorization required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const updated = await updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
