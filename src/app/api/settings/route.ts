import { NextRequest, NextResponse } from "next/server";
import { getGatewaySettings, updateGatewaySettings } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { error: "Unauthorized access. Administrator authorization required." },
        { status: 401 }
      );
    }

    const settings = await getGatewaySettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { error: "Unauthorized access. Administrator authorization required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const updated = await updateGatewaySettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update gateway settings" }, { status: 500 });
  }
}
