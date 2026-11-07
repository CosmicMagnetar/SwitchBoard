"use client";

import { MessageCircle, Mail, Users, ShieldCheck, Play, RefreshCw, Link, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORMS } from "@/data/mock";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Connections</h1>
          <p className="text-sm text-muted-foreground">
            Connect your team chat apps and let Switch bridge them with your AI agents.
          </p>
        </div>
        <Button className="hidden sm:flex">
          <Terminal size={16} className="mr-2" />
          Open Switch Console
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-primary/20 dark:border-primary/30 bg-primary-glow/30"
        transition={{ delay: 0.1 }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-primary" />
            <div>
              <CardTitle className="text-base">Switch Bridge</CardTitle>
              <p className="text-xs text-muted-foreground">
                Open-source infrastructure connecting AI agents to team chat rooms.
              </p>
            </div>
          </div>
          <Badge variant="default" className="px-2 py-1.5 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Connected via local server
            </span>
          </Badge>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4">
            Switch runs locally (Docker) and bridges your Slack/Discord/Teams rooms to AI agents.
            Each channel becomes a Switch room where agents join like teammates.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <FeatureItem
              icon={<Play size={14} className="text-primary" />}
              title="Agent protocol"
              desc="Server-sent events in, HTTP out"
            />
            <FeatureItem
              icon={<Link size={14} className="text-primary" />}
              title="Bridge support"
              desc="Slack &middot; Discord &middot; Teams &middot; Telegram &middot; Mattermost"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => window.open("https://docs.switchagents.ai/switch-rooms/getting-started", "_blank")}>
            <RefreshCw size={14} className="mr-2" />
            10-minute quickstart
          </Button>
        </CardContent>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        transition={{ delay: 0.2 }}
      >
        {PLATFORMS.map((p) => {
          const meta = platformMeta[p.id];
          const connected = p.id === "slack" || p.id === "gmail";
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -2 }}
              className={cn(
                "rounded-2xl border border-border bg-background",
                connected && "border-primary/20 dark:border-primary/30"
              )}
            >
              <Card className="border-0 bg-transparent p-0 shadow-none">
                <CardHeader className="flex-row items-center justify-between pb-3">
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
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-background shadow"
        transition={{ delay: 0.3 }}
      >
        <CardHeader>
          <CardTitle>How Switch fits this dashboard</CardTitle>
          <CardDescription>
            Switch is the bridge between your team chat and AI agents. This dashboard shows all
            Switch rooms, agent activity, and routed messages in one place. Agents join rooms like
            teammates; you approve their actions before they send.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>Slack/Discord/Teams channels become Switch rooms</li>
            <li>AI agents join rooms with their own name and avatar</li>
            <li>Messages flow into this unified inbox and get routed</li>
            <li>Agent actions (send email, post message) wait for your approval</li>
          </ul>
        </CardContent>
      </motion.div>
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
