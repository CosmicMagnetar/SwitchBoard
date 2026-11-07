import { NextResponse } from "next/server";
import { switchClient } from "@/lib/switch";

export async function GET() {
  const agents = await switchClient.getAgents();
  return NextResponse.json(agents);
}
