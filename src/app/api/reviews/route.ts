import { NextRequest, NextResponse } from "next/server";
import { getReviews, getAllReviews, createReview, updateReviewStatus } from "@/lib/db";
import { Review } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const productId = searchParams.get("productId") || undefined;

    const reviews = all ? await getAllReviews() : await getReviews(productId);
    return NextResponse.json({ success: true, reviews });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, location, rating, title, content, productId } = body;

    if (!author || !content || !rating) {
      return NextResponse.json({ error: "Missing required review fields" }, { status: 400 });
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: productId || "pb-shelby-diffuser-01",
      author,
      location: location || "India",
      rating: Number(rating),
      date: new Date().toISOString().split("T")[0],
      title: title || "Customer Review",
      content,
      verifiedPurchase: true,
      helpfulCount: 0,
      status: "approved", // auto-approve for seamless testing, can be moderated in admin
    };

    const saved = await createReview(newReview);
    return NextResponse.json({ success: true, review: saved });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to post review" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Review ID and status required" }, { status: 400 });
    }

    const updated = await updateReviewStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}
