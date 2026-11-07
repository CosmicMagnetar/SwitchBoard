"use client";

import { MessageCircle, Mail, Users, ShieldCheck, Play, RefreshCw, Link, Terminal, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORMS } from "@/data/mock";
import { cn } from "@/lib/utils";

const platformMeta: Record<string, { icon: any; color: string; bg: string }> = {
  slack: { icon: MessageCircle, color: "text-primary", bg: "bg-primary/10" },
  discord: { icon: MessageCircle, color: "text-purple-400 dark:text-purple-500", bg: "bg-purple-500/10" },
  teams: { icon: Users, color: "text-blue-400 dark:text-blue-500", bg: "bg-blue-500/10" },
  telegram: { icon: MessageCircle, color: "text-blue-400 dark:text-blue-500", bg: "bg-blue-500/10" },
  gmail: { icon: Mail, color: "text-red-400 dark:text-red-500", bg: "bg-red-500/10" },
};

export default function ConnectionsPage() {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:border-amber-500/30 dark:bg-amber-900/10">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-amber-500" />
            <div>
              <CardTitle className="text-base">Demo Mode — Switch not connected</CardTitle>
              <CardDescription>
                You are viewing simulated data. To connect real Switch rooms and agents, see the setup steps below.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="rounded-2xl border border-border bg-background">
        <CardHeader>
          <CardTitle>What is Switch?</CardTitle>
          <CardDescription>
            Switch is open-source infrastructure that puts AI agents into team chat. Every Slack/Discord/Teams channel
            becomes a Switch room where AI agents join like teammates.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureItem icon={<ShieldCheck size={18} className="text-primary" />} title="Self-hosted locally" desc="Switch Console runs on your computer via Docker. Your data stays with you." />
            <FeatureItem icon={<Link size={18} className="text-primary" />} title="Agent protocol" desc="SSE in, HTTP out. Any AI agent (Claude Code, Codex, OpenCode, Cursor) can join a room." />
            <FeatureItem icon={<Terminal size={18} className="text-primary" />} title="Local server" desc="Hosted on your machine at http://localhost:8765 by default." />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-border bg-background">
        <CardHeader>
          <CardTitle>Connect real Switch</CardTitle>
          <CardDescription>
            Follow these steps to connect your live Switch server and messaging apps.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="list-decimal pl-6 space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Install Switch Console</span> — Download from{" "}
              <a href="https://github.com/sandbox-quantum/switch/releases" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                github.com/sandbox-quantum/switch/releases
              </a>
            </li>
            <li>
              <span className="font-medium text-foreground">Start the local server</span> — Open Switch Console, select
              "On this computer," then "Start." The server runs at{" "}
              <code className="bg-secondary px-1 py-0.5 rounded">http://localhost:8765</code>.
            </li>
            <li>
              <span className="font-medium text-foreground">Choose an AI agent</span> — Claude Code, Codex, OpenCode, or
              Cursor. Switch Console opens a chat with switch-buddy.
            </li>
            <li>
              <span className="font-medium text-foreground">Connect a messaging app</span> — Tell switch-buddy to connect
              Slack, Discord, Teams, Telegram, or Mattermost.
            </li>
            <li>
              <span className="font-medium text-foreground">Set the environment variable</span> — Add to{" "}
              <code className="bg-secondary px-1 py-0.5 rounded">.env.local</code>:
              <br />
              <code className="bg-primary/10 text-primary block mt-1 p-2 rounded">
                NEXT_PUBLIC_SWITCH_SERVER_URL=http://localhost:8765
              </code>
            </li>
            <li>
              <span className="font-medium text-foreground">Refresh this page</span> — Live rooms and agents will appear
              below.
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {PLATFORMS.map((p) => {
          const meta = platformMeta[p.id];
          const connected = p.id === "slack" || p.id === "gmail";
          return (
            <Card key={p.id} className={cn("rounded-2xl border border-border bg-background", connected && "border-primary/20 dark:border-primary/30")}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className={`p-2.5 rounded-xl ${meta.bg}`}>
                  <meta.icon size={20} className={meta.color} />
                </div>
                {connected ? (
                  <Badge variant="success" className="px-2 py-1 text-xs">Demo connected</Badge>
                ) : (
                  <Badge variant="outline" className="px-2 py-1 text-xs">Not connected</Badge>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.id === "slack"
                    ? "Rooms: #incidents, #product, #community"
                    : p.id === "gmail"
                    ? "Inbox: support@aurburalz.com"
                    : "Connect this workspace to route messages to agents"}
                </p>
                {!connected && (
                  <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => {}}>
                    Connect {p.name}
                  </Button>
                )}
                {connected && (
                  <Button variant="ghost" size="sm" className="w-full mt-4" onClick={() => {}}>
                    Manage
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="rounded-2xl border border-border bg-background">
        <CardHeader>
          <CardTitle>How SwitchBoard uses Switch</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>Slack/Discord/Teams channels become Switch rooms</li>
            <li>AI agents join rooms with their own name and avatar</li>
            <li>Messages flow into the Unified Inbox and get AI-triaged</li>
            <li>Agent actions (send email, post message) wait for your approval</li>
            <li>Tasks appear on the Team Board kanban</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <div className="text-xs font-medium text-muted-foreground">{title}</div>
        <div className="text-[10px] text-muted-foreground/70">{desc}</div>
      </div>
    </div>
  );
}
