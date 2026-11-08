"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Bot,
  MessageCircle,
  Clock,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memoWithName } from "@/lib/performance";

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StatCard = memoWithName(
  ({ label, value, sub, icon: Icon, color, glow }: {
    label: string;
    value: number | string;
    sub: string;
    icon: any;
    color: string;
    glow: string;
  }) => (
    <motion.div
      variants={statVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-border bg-card p-5 shadow relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon size={48} className={color} />
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
        </div>
        <div className={`p-2 rounded-xl ${glow}`}>
          <Icon size={16} className={color} />
        </div>
      </div>
    </motion.div>
  ),
  "StatCard"
);

export function StatsRow({ rooms = 4, agents = 5 }: { rooms?: number; agents?: number } = {}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Active Rooms"
        value={rooms}
        sub="across Slack, Discord & Teams"
        icon={LayoutDashboard}
        color="text-primary"
        glow="bg-primary-glow"
      />
      <StatCard
        label="AI Agents"
        value={agents}
        sub="working alongside your team"
        icon={Bot}
        color="text-purple-400 dark:text-purple-500"
        glow="bg-purple-500/10"
      />
      <StatCard
        label="Unread Messages"
        value="13"
        sub="AI-triaged and routed"
        icon={MessageCircle}
        color="text-amber-400 dark:text-amber-500"
        glow="bg-amber-500/10"
      />
      <StatCard
        label="Pending Tasks"
        value="3"
        sub="waiting for your review"
        icon={Clock}
        color="text-blue-400 dark:text-blue-500"
        glow="bg-blue-500/10"
      />
    </div>
  );
}

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Quick actions</h3>
          <p className="text-xs text-muted-foreground">Do more in one click</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionButton
          icon={<Zap size={16} className="text-primary" />}
          label="Route message"
          desc="Send to agent or person"
          className="border-primary/20 hover:bg-primary/5 hover:border-primary/40"
        />
        <ActionButton
          icon={<ShieldCheck size={16} className="text-success" />}
          label="Approve draft"
          desc="Approve AI email draft"
          className="border-success/20 hover:bg-success/5 hover:border-success/40"
        />
        <ActionButton
          icon={<ArrowRight size={16} className="text-info" />}
          label="New task"
          desc="Create from voice or text"
          className="border-info/20 hover:bg-info/5 hover:border-info/40"
        />
      </div>
    </div>
  );
}

const ActionButton = memoWithName(
  ({ icon, label, desc, className }: { icon: React.ReactNode; label: string; desc: string; className?: string }) => {
    return (
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex flex-col items-start gap-1.5 p-4 rounded-xl border border-border bg-background text-left transition-all duration-200",
          className
        )}
      >
        <span className="p-1.5 rounded-lg bg-secondary">{icon}</span>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </motion.button>
    );
  },
  "ActionButton"
);
