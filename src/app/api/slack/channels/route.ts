import { NextResponse } from "next/server";
import { slackClient } from "@/lib/slack";

export async function GET() {
  if (!slackClient.isInitialized()) {
    return NextResponse.json({ error: "Slack client not initialized" }, { status: 400 });
  }
  const channels = await slackClient.getChannels();
  return NextResponse.json(channels);
}
