"use client";

import { motion } from "framer-motion";

export function SwitchBoardLogo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ rotate: 5, scale: 1.05 }}
      className={`relative group ${className}`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:spin animate-[spin_3s_linear_infinite]"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Outer ring */}
        <circle cx="16" cy="16" r="14" stroke="url(#logoGrad)" strokeWidth="2.5" fill="none" opacity="0.6" />
        {/* Inner connecting nodes */}
        <circle cx="16" cy="6" r="2" fill="url(#logoGrad)" />
        <circle cx="26" cy="16" r="2" fill="url(#logoGrad)" />
        <circle cx="16" cy="26" r="2" fill="url(#logoGrad)" />
        <circle cx="6" cy="16" r="2" fill="url(#logoGrad)" />
        {/* Center node */}
        <circle cx="16" cy="16" r="3" fill="#ffffff" />
        {/* Connection lines */}
        <path d="M16 8 L16 13 M24 16 L17 16 M16 24 L16 19 M8 16 L15 16" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        {/* Glow */}
        <circle cx="16" cy="16" r="16" fill="url(#logoGrad)" opacity="0.15" filter="url(#logoGlow)" />
      </svg>
      <span className="ml-2 font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
        SwitchBoard
      </span>
    </motion.div>
  );
}
