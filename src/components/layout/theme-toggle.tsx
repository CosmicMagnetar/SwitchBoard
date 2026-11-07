"use client"

import * as React from "react"
import { Sun, Moon, Monitor, Smartphone, Tablet } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-all"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        className={React.useMemo(
          () => (isDark ? "hidden" : "block"),
          [isDark]
        )}
        size={16}
      />
      <Moon
        className={React.useMemo(
          () => (isDark ? "block" : "hidden"),
          [isDark]
        )}
        size={16}
      />
    </button>
  )
}
