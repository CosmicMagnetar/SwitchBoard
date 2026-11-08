"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ChevronRight,
  X,
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
  Mail,
  Kanban,
  Bot,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    title: "Connect your team chat",
    icon: LayoutDashboard,
    description:
      "Link Slack, Discord, or Teams through Switch. Every channel becomes a room where AI agents join like teammates.",
    color: "text-primary",
  },
  {
    id: 2,
    title: "Unified inbox",
    icon: Mail,
    description:
      "All messages from every room flow into one inbox. AI triages each message by intent and routes it to the right person or agent.",
    color: "text-amber-500",
  },
  {
    id: 3,
    title: "Team board",
    icon: Kanban,
    description:
      "Tasks from messages, email, or voice appear on a kanban board. Drag to change status — To Do, In Progress, Review, Done.",
    color: "text-blue-500",
  },
  {
    id: 4,
    title: "AI agents",
    icon: Bot,
    description:
      "Agents live in Switch rooms with their own name and avatar. Review and approve their actions before they send anything.",
    color: "text-purple-500",
  },
  {
    id: 5,
    title: "Voice capture",
    icon: Mic,
    description:
      "Speak a task. It's transcribed in the browser, understood by AI, and routed automatically to the right person.",
    color: "text-emerald-500",
  },
];

export function TutorialOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([]);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setCompleted([]);
    }
  }, [isOpen]);

  const markComplete = () => {
    setCompleted((prev) => [...prev, true]);
    if (isLast) {
      setCompleted([]);
    } else {
      setCurrentStep((p) => p + 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl p-6 md:p-8 rounded-3xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              S
            </div>
            <span className="font-bold text-lg">SwitchBoard Tutorial</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            aria-label="Close tutorial"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-6">
          <div className="w-full bg-secondary/50 rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{completed.length}/{steps.length} completed</span>
          </div>
        </div>

        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-secondary text-muted-foreground relative">
            <step.icon size={24} className={step.color} />
            <div className="absolute -right-1 -top-1 w-6 h-6 rounded-full bg-success text-success-foreground text-[10px] flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              ✓
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2">{step.title}</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto leading-relaxed">
            {step.description}
          </p>

          <div className="flex justify-between">
            {!isLast ? (
              <Button
                onClick={markComplete}
                className="flex items-center gap-2 w-full"
              >
                Next
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={markComplete}
                className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              >
                Get started
                <ArrowRight size={16} />
              </Button>
            )}
            <button
              onClick={() => {
                setCompleted([]);
                onClose();
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Skip tutorial
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
