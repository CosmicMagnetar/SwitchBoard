"use client";

import { useState } from "react";
import { StatsRow } from "@/components/dashboard/stats";
import { QuickActions } from "@/components/dashboard/quick-actions";
import UnifiedInbox from "@/components/inbox/unified-inbox";
import KanbanBoard from "@/components/kanban/kanban";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import VoiceCapture from "@/components/voice/voice";
import { TutorialOverlay } from "@/components/tutorial/tutorial-overlay";
import { AppShell } from "@/components/layout/page-transition";
import { motion } from "framer-motion";
import { useSwitchData } from "@/hooks/use-switch-data";
import { LoadingSkeletonPage } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [showTutorial, setShowTutorial] = useState(false);
  const { rooms, agents, isLoading, isDemo } = useSwitchData();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-72">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <AppShell>
            {isLoading ? (
              <LoadingSkeletonPage />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      S
                    </div>
                    <span className="font-bold text-lg">SwitchBoard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      isDemo ? "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400" : "bg-success/10 text-success dark:bg-success/20 dark:text-success-400"
                    )}>
                      {isDemo ? "Demo Mode" : "Live"}
                    </span>
                    <div className="text-right">
                      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your human + AI agent team OS, powered by Switch.
                      </p>
                    </div>
                  </div>
                </div>

                <StatsRow rooms={rooms.length} agents={agents.length} />

                <div className="grid gap-6 mt-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-8"
                    >
                      <QuickActions />
                    </motion.div>
                    <div className="mb-8">
                      <UnifiedInbox />
                    </div>
                  </div>
                  <div>
                    <VoiceCapture />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8"
                >
                  <KanbanBoard />
                </motion.div>
              </motion.div>
            )}
          </AppShell>
        </main>
      </div>
    </div>
  );
}
