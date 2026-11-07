"use client";

import { Bot, Clock, MessageCircle, Type } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_AGENTS, relativeTime } from "@/data/mock";
import { motion } from "framer-motion";

export default function AgentsPage() {
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-sm text-muted-foreground">
            Agents join Switch rooms like teammates. Review and approve their actions.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Type size={14} className="mr-2" />
          Add agent
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        transition={{ delay: 0.1 }}
      >
        {MOCK_AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </motion.div>
    </div>
  );
}

function AgentCard({ agent }: { agent: (typeof MOCK_AGENTS)[number] }) {
  const isActive = agent.status === "active";
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="transition-all duration-300"
    >
      <Card className="p-4 hover:shadow-lg transition-shadow duration-300 border-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-15 transition-opacity">
          <Bot size={48} className="text-purple-500 dark:text-purple-400" />
        </div>
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shadow-lg shadow-purple-500/20">
                <Bot size={18} />
              </div>
              <div>
                <CardTitle className="text-base">{agent.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{agent.provider}</p>
              </div>
            </div>
            <Badge variant={isActive ? "success" : "outline"} className="px-2 py-1.5 text-xs">
              {agent.status}
            </Badge>
          </div>
          <CardDescription className="mt-2 text-sm">{agent.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 relative z-10">
          <div className="grid grid-cols-2 gap-4 text-xs mb-4">
            <div>
              <div className="text-muted-foreground">Room</div>
              <div className="font-medium">{agent.room}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Tasks handled</div>
              <div className="font-bold text-lg">{agent.tasksHandled}</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">Last run</div>
              <div className="font-medium">{relativeTime(agent.lastRun)}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => {}}>
              <Type size={14} className="mr-1.5" />
              View log
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <MessageCircle size={14} className="mr-1.5" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
