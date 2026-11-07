/**
 * Slack Integration (stub)
 *
 * Real Slack integration requires @slack/web-api and Slack app credentials.
 * For the hackathon demo, this returns empty data so the app builds and runs.
 * To wire up real Slack, install @slack/web-api and add SLACK_BOT_TOKEN to env.
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

class SlackClient {
  private initialized = false;

  initialize(_token: string) {
    this.initialized = true;
  }

  isInitialized() {
    return this.initialized;
  }

  async getChannels(): Promise<SlackChannel[]> {
    return [];
  }

  async getHistory(_channelId: string, _limit = 50): Promise<SlackMessage[]> {
    return [];
  }

  async sendMessage(_channelId: string, _text: string): Promise<void> {
    // No-op stub
  }

  async postEphemeral(_channelId: string, _userId: string, _text: string): Promise<void> {
    // No-op stub
  }
}

export const slackClient = new SlackClient();
