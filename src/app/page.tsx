"use client";

import { StatsRow } from "@/components/dashboard/stats";
import { QuickActions } from "@/components/dashboard/quick-actions";
import UnifiedInbox from "@/components/inbox/unified-inbox";
import KanbanBoard from "@/components/kanban/kanban";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import VoiceCapture from "@/components/voice/voice";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Your human + AI agent team OS, powered by Switch.
                </p>
              </div>
            </div>

            <StatsRow />

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
        </main>
      </div>
    </div>
  );
}
