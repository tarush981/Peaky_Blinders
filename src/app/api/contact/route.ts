import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
    }

    // In production, dispatch notification email or CRM webhook
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to the Garrison Chambers. Our concierge team will respond within 24 hours.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
