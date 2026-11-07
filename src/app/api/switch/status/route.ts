import { NextResponse } from "next/server";
import { switchClient } from "@/lib/switch";

export async function GET() {
  const status = await switchClient.getStatus();
  return NextResponse.json(status);
}

export async function POST() {
  switchClient.connect();
  return NextResponse.json({ connected: true });
}
