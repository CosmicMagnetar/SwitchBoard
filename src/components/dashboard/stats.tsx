"use client";

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

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stats = [
  {
    label: "Active Rooms",
    value: "4",
    sub: "across Slack, Discord & Teams",
    icon: LayoutDashboard,
    color: "text-primary",
    glow: "bg-primary-glow",
  },
  {
    label: "AI Agents",
    value: "5",
    sub: "working alongside your team",
    icon: Bot,
    color: "text-purple-400 dark:text-purple-500",
    glow: "bg-purple-500/10",
  },
  {
    label: "Unread Messages",
    value: "13",
    sub: "AI-triaged and routed",
    icon: MessageCircle,
    color: "text-amber-400 dark:text-amber-500",
    glow: "bg-amber-500/10",
  },
  {
    label: "Pending Tasks",
    value: "3",
    sub: "waiting for your review",
    icon: Clock,
    color: "text-blue-400 dark:text-blue-500",
    glow: "bg-blue-500/10",
  },
];

export function StatsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={statVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-5 shadow relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <stat.icon size={48} className={stat.color} />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.sub}
              </p>
            </div>
            <div className={`p-2 rounded-xl ${stat.glow}`}>
              <stat.icon size={16} className={stat.color} />
            </div>
          </div>
        </motion.div>
      ))}
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

function ActionButton({
  icon,
  label,
  desc,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex flex-col items-start gap-1.5 p-4 rounded-xl border border-border bg-background text-left transition-all duration-200
        ${className}
      `}
    >
      <span className="p-1.5 rounded-lg bg-secondary">{icon}</span>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </motion.button>
  );
}
