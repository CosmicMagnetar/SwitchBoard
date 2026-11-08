import { NextResponse } from "next/server";
import { slackClient } from "@/lib/slack";

export async function GET() {
  try {
    if (!slackClient.isInitialized()) {
      return NextResponse.json({
        error: "Slack client not initialized",
        message: "Install @slack/web-api and call slackClient.initialize(token) with SLACK_BOT_TOKEN",
        channels: [],
      });
    }
    const channels = await slackClient.getChannels();
    return NextResponse.json(channels);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch Slack channels", channels: [] },
      { status: 200 }
    );
  }
}
