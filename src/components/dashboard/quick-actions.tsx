"use client"

import { ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { memoWithName } from "@/lib/performance";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Quick actions</h3>
          <p className="text-xs text-muted-foreground">Do more in one click</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionButton
          icon={<Zap size={16} className="text-switch-600" />}
          label="Route message"
          desc="Send to agent or person"
          className="border-primary/20"
        />
        <ActionButton
          icon={<ShieldCheck size={16} className="text-green-500" />}
          label="Approve draft"
          desc="Approve AI email draft"
          className="border-green-500/20"
        />
        <ActionButton
          icon={<ArrowRight size={16} className="text-blue-500" />}
          label="New task"
          desc="Create from voice or text"
          className="border-blue-500/20"
        />
      </div>
    </div>
  )
}

const ActionButton = memoWithName(
  ({ icon, label, desc, className }: { icon: React.ReactNode; label: string; desc: string; className?: string }) => {
    return (
      <button className={cn(
        "flex flex-col items-start gap-1.5 p-4 rounded-xl border border-border bg-background hover:bg-accent hover:border-primary/30 transition-all duration-200 text-left",
        className
      )}>
      <span className="p-1.5 rounded-lg bg-secondary">{icon}</span>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
      </button>
    )
  },
  "ActionButton"
);
