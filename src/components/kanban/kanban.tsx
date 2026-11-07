"use client";

import { Plus, Clock, Mail, Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_TASKS, relativeTime } from "@/data/mock";
import { motion } from "framer-motion";

const statusColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  todo: { bg: "bg-secondary/50", border: "border-border", text: "text-muted-foreground", dot: "bg-border" },
  "in-progress": { bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-100 dark:border-blue-800/50", text: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
  review: { bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-100 dark:border-amber-800/50", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  done: { bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-100 dark:border-green-800/50", text: "text-green-600 dark:text-green-400", dot: "bg-green-500" },
};

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
] as const;

const sourceIcon: Record<string, any> = {
  slack: null,
  discord: null,
  email: Mail,
  voice: Mic,
};

export default function KanbanBoard() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Board</h1>
          <p className="text-sm text-muted-foreground">
            Kanban board for tasks from messages, email, and voice.
          </p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Add task
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        transition={{ delay: 0.1 }}
      >
        {columns.map((col) => {
          const tasks = MOCK_TASKS.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="flex w-[300px] flex-col gap-2 shrink-0">
              <Card className="border-b border-border px-4 py-3">
                <CardHeader className="flex items-center justify-between pb-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{col.title}</span>
                    <Badge variant="outline" className="px-2 py-0.5 text-xs">
                      {tasks.length}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
              <CardContent className="p-2 min-h-[420px] flex flex-col gap-2 overflow-y-auto">
                {tasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
                {tasks.length === 0 && (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No tasks
                  </div>
                )}
              </CardContent>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function TaskCard({ task }: { task: (typeof MOCK_TASKS)[number] }) {
  const style = statusColors[task.status];
  const SourceIcon = sourceIcon[task.source] || Clock;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer transition-shadow duration-200"
    >
      <Card className="p-3 relative border-border group hover:shadow-md">
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="px-2 py-0.5 text-xs">
            {task.priority}
          </Badge>
        </div>
        <div className="flex items-start justify-between mb-2">
          <div className={`p-1.5 rounded-md ${style.bg} ${style.border}`}>
            <SourceIcon size={12} className={style.text} />
          </div>
        </div>
        <div className="font-medium text-sm mb-1 line-clamp-2">{task.title}</div>
        <div className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: task.assignee === "You" ? "#3b82f6" : "#a855f7",
              }}
            />
            <span className="text-xs text-muted-foreground">{task.assignee}</span>
          </div>
          <span className="text-xs text-muted-foreground">{relativeTime(task.createdAt)}</span>
        </div>
      </Card>
    </motion.div>
  );
}
