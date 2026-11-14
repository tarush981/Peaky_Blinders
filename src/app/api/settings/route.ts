import { NextRequest, NextResponse } from "next/server";
import { getGatewaySettings, updateGatewaySettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await getGatewaySettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateGatewaySettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update gateway settings" }, { status: 500 });
  }
}
