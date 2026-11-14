import { NextRequest, NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
    }

    const res = await subscribeNewsletter(email);
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json({ error: "Subscription error" }, { status: 500 });
  }
}
