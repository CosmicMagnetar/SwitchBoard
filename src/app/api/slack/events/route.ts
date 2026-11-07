import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  // Slack URL verification challenge
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  // Handle events
  if (body.type === "event_callback") {
    const event = body.event;
    // Process message events, app_mentions, etc.
    // This is where you route Slack messages to Switch rooms
    console.log("Slack event:", event);
  }

  return NextResponse.json({ status: "ok" });
}
