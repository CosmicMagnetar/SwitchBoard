"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Link as LinkIcon,
  Mail,
  Kanban,
  Bot,
  Mic,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { SwitchBoardLogo } from "@/components/layout/logo";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { key: "connections", label: "Connections", icon: LinkIcon, href: "/connections" },
  { key: "inbox", label: "Unified Inbox", icon: Mail, href: "/inbox" },
  { key: "board", label: "Team Board", icon: Kanban, href: "/board" },
  { key: "agents", label: "AI Agents", icon: Bot, href: "/agents" },
  { key: "voice", label: "Voice Capture", icon: Mic, href: "/voice" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { toggleTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-72 border-r border-border bg-card/95 backdrop-blur-xl flex flex-col">
      <div className="flex items-center justify-between h-16 px-5 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <SwitchBoardLogo className="" />
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-secondary hover:border-border-hover"
          aria-label="Toggle theme"
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${active
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-border-hover border border-transparent"}
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border shrink-0">
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 rounded-xl border border-transparent hover:border-border-hover"
          aria-label="Settings"
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
