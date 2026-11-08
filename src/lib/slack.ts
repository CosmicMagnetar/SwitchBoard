/**
 * Slack Integration
 *
 * Connects SwitchBoard to Slack using the Slack Web API and Events API.
 * Requires a Slack app with Bot Token Scopes and Event Subscriptions configured.
 *
 * Setup:
 * 1. Create a Slack app at https://api.slack.com/apps
 * 2. Add Bot Token Scopes: app_mentions:read, channels:history, chat:write, commands
 * 3. Install app to workspace, copy Bot User OAuth Token
 * 4. Enable Event Subscriptions, set Request URL to /api/slack/events
 * 5. Subscribe to bot events: app_mention, message.channels
 * 6. Add SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET to .env.local
 */

export interface SlackMessage {
  type: string;
  channel: string;
  user: string;
  text: string;
  ts: string;
  thread_ts?: string;
}

export interface SlackChannel {
  id: string;
  name: string;
  is_channel: boolean;
  is_group: boolean;
  is_im: boolean;
  created: number;
  creator: string;
}

let client: any = null;
let token: string | null = null;

export class SlackClient {
  initialize(slackToken: string) {
    token = slackToken;
    try {
      const { WebClient } = require("@slack/web-api");
      client = new WebClient(slackToken);
    } catch {
      // @slack/web-api not installed — client remains null
      client = null;
    }
  }

  isInitialized() {
    return client !== null;
  }

  async getChannels(): Promise<SlackChannel[]> {
    if (!client) throw new Error("Slack client not initialized. Install @slack/web-api and call initialize().");
    const res = await client.conversations.list({
      types: "public_channel,private_channel,im,mpim",
      limit: 100,
    });
    return (res.channels || []).map((c: any) => ({
      id: c.id || "",
      name: c.name || "direct-message",
      is_channel: c.is_channel || false,
      is_group: c.is_group || false,
      is_im: c.is_im || false,
      created: c.created || 0,
      creator: c.creator || "",
    }));
  }

  async getHistory(channelId: string, limit = 50): Promise<SlackMessage[]> {
    if (!client) throw new Error("Slack client not initialized.");
    const res = await client.conversations.history({
      channel: channelId,
      limit,
    });
    return (res.messages || []).map((m: any) => ({
      type: m.type || "message",
      channel: m.channel || channelId,
      user: m.user || "bot",
      text: m.text || "",
      ts: m.ts || "",
      thread_ts: m.thread_ts,
    }));
  }

  async sendMessage(channelId: string, text: string): Promise<void> {
    if (!client) throw new Error("Slack client not initialized.");
    await client.chat.postMessage({
      channel: channelId,
      text,
    });
  }

  async postEphemeral(channelId: string, userId: string, text: string): Promise<void> {
    if (!client) throw new Error("Slack client not initialized.");
    await client.chat.postEphemeral({
      channel: channelId,
      user: userId,
      text,
    });
  }
}

export const slackClient = new SlackClient();
