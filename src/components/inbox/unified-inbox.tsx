"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_MESSAGES, relativeTime } from "@/data/mock";
import { motion } from "framer-motion";

const platformMeta: Record<string, { label: string; color: string; dot: string }> = {
  slack: { label: "Slack", color: "text-primary", dot: "bg-primary" },
  discord: { label: "Discord", color: "text-purple-400 dark:text-purple-500", dot: "bg-purple-500" },
  gmail: { label: "Gmail", color: "text-red-400 dark:text-red-500", dot: "bg-red-500" },
  teams: { label: "Teams", color: "text-blue-400 dark:text-blue-500", dot: "bg-blue-500" },
  telegram: { label: "Telegram", color: "text-blue-400 dark:text-blue-500", dot: "bg-blue-500" },
};

export default function UnifiedInbox() {
  const unreadCount = MOCK_MESSAGES.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Unified Inbox</h1>
          <p className="text-sm text-muted-foreground">
            Every message from every room, triaged by AI and routed to the right person.
          </p>
        </div>
        <Badge variant="default">{unreadCount} unread</Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide"
        transition={{ delay: 0.1 }}
      >
        {[
          { label: "All", key: "all", active: true },
          { label: "Unread", key: "unread", active: false },
          { label: "Bugs", key: "bugs", active: false },
          { label: "Requests", key: "requests", active: false },
          { label: "Updates", key: "updates", active: false },
        ].map((f) => (
          <motion.button
            key={f.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all border
              ${f.active
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"}
            `}
          >
            {f.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-background overflow-hidden shadow"
        transition={{ delay: 0.2 }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-4 w-20">Source</th>
              <th className="p-4">Message</th>
              <th className="p-4 hidden sm:table-cell">Intent</th>
              <th className="p-4 hidden lg:table-cell">Routed to</th>
              <th className="p-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {MOCK_MESSAGES.map((m) => {
              const meta = platformMeta[m.platform] || platformMeta.slack;
              const isAgent = m.senderType === "agent";
              return (
                <motion.tr
                  key={m.id}
                  className={`
                    border-b border-border/50 last:border-0
                    group hover:bg-secondary/50 transition-colors
                  `}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`
                          w-7 h-7 rounded flex items-center justify-center text-xs font-bold text-white
                          ${meta.dot}
                        `}
                      >
                        {m.platform.toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{m.room}</div>
                        <div className="text-xs text-muted-foreground">
                          {isAgent ? "Agent" : "Human"} • {meta.label}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          w-7 h-7 rounded-full flex items-center justify-center shrink-0
                          ${isAgent
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"}
                        `}
                      >
                        {isAgent ? "A" : m.sender.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{m.sender}</div>
                        <div className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                          {m.content}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <Badge variant="info" className="text-xs px-2 py-1">
                      {m.intent}
                    </Badge>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span className="text-xs text-muted-foreground">{m.routedTo}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`
                      text-xs font-medium
                      ${m.status === "unread" ? "text-primary" : "text-muted-foreground"}
                    `}>
                      {relativeTime(m.timestamp)}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-background p-4 shadow"
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info dark:text-info-foreground text-xs font-bold">
            A
          </div>
          <div>
            <div className="text-sm font-medium">Triage rules active</div>
            <div className="text-xs text-muted-foreground">
              Bugs &rarr; triager &middot; Requests &rarr; support agent &middot; Tasks &rarr; your board
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
