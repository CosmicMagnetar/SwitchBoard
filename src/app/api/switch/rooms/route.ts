import { NextResponse } from "next/server";
import { switchClient } from "@/lib/switch";

export async function GET() {
  const rooms = await switchClient.getRooms();
  return NextResponse.json(rooms);
}
