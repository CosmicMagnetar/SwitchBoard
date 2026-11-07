"use client";

import { Bell, MoreHorizontal, User, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function Header() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-xl shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-secondary hover:border-border-hover"
          aria-label="Toggle theme"
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
        </button>
        <div className="h-5 w-px bg-border"></div>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="hidden sm:inline">Notifications</span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-secondary hover:border-border-hover" aria-label="More">
          <MoreHorizontal size={18} />
          <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center">
            <span className="inline-block h-[10px] w-[10px] transform rotate-45 rounded-full bg-destructive" />
          </span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <User size={18} className="shrink-0" />
          <span className="hidden sm:inline truncate max-w-[120px]">Solo Founder</span>
        </div>
      </div>
    </header>
  );
}
