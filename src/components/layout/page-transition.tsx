"use client";

import { motion } from "framer-motion";
import { SwitchBoardLogo } from "@/components/layout/logo";
import { useTheme } from "@/components/providers/theme-provider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      key={pathname}
      className="min-h-screen bg-background"
    >
      {children}
    </motion.div>
  );
}

const loaderVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  hidden2: { opacity: 0 },
};

export function LoadingScreen() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden2"
          transition={{ duration: 0.4 }}
          className="relative w-20 h-20 mx-auto mb-6"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="absolute inset-0"
          >
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
          >
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
          </motion.div>
        </motion.div>
        <motion.h2
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Loading SwitchBoard
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground mt-2"
        >
          Preparing your team workspace
        </motion.p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-background"
    >
      {children}
    </motion.div>
  );
}
