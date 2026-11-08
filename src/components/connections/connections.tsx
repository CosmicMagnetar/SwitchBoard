"use client";

import { MessageCircle, Mail, Users, ShieldCheck, Play, RefreshCw, Link, Terminal, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORMS } from "@/data/mock";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSwitchData } from "@/hooks/use-switch-data";

const platformMeta: Record<string, { icon: any; color: string; bg: string }> = {
  slack: { icon: MessageCircle, color: "text-primary", bg: "bg-primary/10" },
  discord: { icon: MessageCircle, color: "text-purple-400 dark:text-purple-500", bg: "bg-purple-500/10" },
  teams: { icon: Users, color: "text-blue-400 dark:text-blue-500", bg: "bg-blue-500/10" },
  telegram: { icon: MessageCircle, color: "text-blue-400 dark:text-blue-500", bg: "bg-blue-500/10" },
  gmail: { icon: Mail, color: "text-red-400 dark:text-red-500", bg: "bg-red-500/10" },
};

export default function ConnectionsPage() {
  const { status, rooms, agents, isLoading, isDemo, reconnect } = useSwitchData();

  return (
    <div className="space-y-6">
      {/* Demo mode banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-2xl border p-4 flex items-center gap-3",
          isDemo
            ? "border-amber-500/30 bg-amber-500/10 dark:border-amber-500/30 dark:bg-amber-900/10"
            : "border-success/30 bg-success/10 dark:border-success/30 dark:bg-success/900/10"
        )}
      >
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", isDemo ? "bg-amber-500" : "bg-success")}>
          {isDemo ? <AlertCircle size={16} className="text-white" /> : <ShieldCheck size={16} className="text-white" />}
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">{isDemo ? "Demo Mode — Switch not connected" : "Switch Connected — Live data"}</CardTitle>
          <CardDescription className="text-xs">
            {isDemo
              ? "You are viewing simulated data. Connect real Switch rooms and agents using the steps below."
              : "Live data from Switch server at " + (status.serverUrl || "localhost:8765")}
          </CardDescription>
        </div>
        {!isDemo && (
          <Button variant="outline" size="sm" onClick={reconnect}>
            <RefreshCw size={14} className="mr-2" />
            Reconnect
          </Button>
        )}
      </motion.div>

      {/* Switch server status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-background"
      >
        <CardHeader>
          <CardTitle>Switch Server Status</CardTitle>
          <CardDescription>
            Switch is self-hosted on your computer via Docker. Status updates in real time.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4 md:grid-cols-4">
            <StatItem
              label="Connected"
              value={status.connected ? "Yes" : "No"}
              color={status.connected ? "text-success" : "text-muted-foreground"}
            />
            <StatItem label="Rooms" value={status.rooms} color="text-primary" />
            <StatItem label="Agents" value={status.agents} color="text-purple-400 dark:text-purple-500" />
            <StatItem
              label="Bridge"
              value={status.bridge || "—"}
              color="text-muted-foreground"
            />
          </div>
          {!status.connected && (
            <div className="mt-4 p-4 rounded-xl border border-border bg-secondary/50">
              <p className="text-sm text-muted-foreground mb-3">
                Switch server not reachable at <code className="bg-secondary px-1 py-0.5 rounded">{status.serverUrl || "http://localhost:8765"}</code>.
              </p>
              <Button variant="outline" size="sm" onClick={reconnect}>
                <Play size={14} className="mr-2" />
                Retry connection
              </Button>
            </div>
          )}
        </CardContent>
      </motion.div>

      {/* What is Switch */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-background"
      >
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
      </motion.div>

      {/* How to connect */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border bg-background"
      >
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
      </motion.div>

      {/* Live rooms */}
      {!isDemo && rooms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-background"
        >
          <CardHeader>
            <CardTitle>Live Switch Rooms</CardTitle>
            <CardDescription>
              Rooms from your connected Switch server.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {rooms.map((room) => (
                <div key={room.id} className="p-4 rounded-xl border border-border/50 bg-background/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{room.name}</span>
                      <Badge variant="outline" className="px-2 py-0.5 text-xs">{room.platform}</Badge>
                    </div>
                    <Badge variant={room.unread > 0 ? "warning" : "secondary"} className="px-2 py-1 text-xs">
                      {room.unread} unread
                    </Badge>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {room.agents.map((agent) => (
                      <span key={agent} className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium">
                        {agent}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{room.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </motion.div>
      )}

      {/* Live agents */}
      {!isDemo && agents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-background"
        >
          <CardHeader>
            <CardTitle>Live AI Agents</CardTitle>
            <CardDescription>
              Agents from your connected Switch server.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-4 md:grid-cols-3">
              {agents.map((agent) => (
                <Card key={agent.id} className="p-4 border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <BotIcon size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.provider}</div>
                      </div>
                    </div>
                    <Badge variant={agent.status === "active" ? "success" : "outline"} className="px-2 py-1.5 text-xs">
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{agent.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div>
                      <div className="text-muted-foreground">Room</div>
                      <div className="font-medium">{agent.room}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Tasks handled</div>
                      <div className="font-bold">{agent.tasksHandled}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Last run</span>
                    <span className="text-xs font-medium">{new Date(agent.lastRun).toLocaleTimeString()}</span>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </motion.div>
      )}

      {/* Platform connections */}
      {!isDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
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
                    <Badge variant="success" className="px-2 py-1 text-xs">Connected</Badge>
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
        </motion.div>
      )}

      {isDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {PLATFORMS.map((p) => {
            const meta = platformMeta[p.id];
            return (
              <Card key={p.id} className="rounded-2xl border border-border bg-background">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className={`p-2.5 rounded-xl ${meta.bg}`}>
                    <meta.icon size={20} className={meta.color} />
                  </div>
                  <Badge variant="outline" className="px-2 py-1 text-xs">Demo</Badge>
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
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
      )}

      {/* How this dashboard uses Switch */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl border border-border bg-background"
      >
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
      </motion.div>
    </div>
  );
}

function BotIcon({ size = 18, className }: any) {
  return (
    <svg width={size} height={size} className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function StatItem({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div>
      <div className={`text-xs font-medium ${color}`}>{label}</div>
      <div className="text-lg font-bold">{value}</div>
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
