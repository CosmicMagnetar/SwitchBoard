"use client";

import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function VoiceCapture() {
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Voice Capture</h1>
          <p className="text-sm text-muted-foreground">
            Speak a task — it is transcribed, understood, and routed as a task.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-border bg-card/90 backdrop-blur-xl p-8 shadow-lg"
      >
        <CardHeader>
          <CardTitle>Record a voice memo</CardTitle>
          <CardDescription>
            Your voice becomes a task. Transcription is wired in the next phase.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center justify-center gap-5 py-10 border-2 border-dashed border-border rounded-2xl bg-secondary/30"
          >
            <div className="relative w-24 h-24 rounded-full border-4 border-border flex items-center justify-center">
              <Mic size={32} className="text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white animate-pulse">
                •
              </span>
            </div>
            <Button variant="outline" size="lg" disabled className="w-48">
              <MicOff size={20} className="mr-2 opacity-50" />
              Voice transcription coming soon
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Speak a task &rarr; transcript &rarr; AI understands intent &rarr; routed to the right person
            </p>
          </motion.div>
        </CardContent>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow"
      >
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <StepStep number="1" title="Speak" desc="Hold the mic and say what needs to be done." />
            <StepStep number="2" title="Transcribe" desc="AI converts your voice to text." />
            <StepStep number="3" title="Understand" desc="AI figures out the intent and who it is for." />
            <StepStep number="4" title="Route" desc="Task goes to the right person or agent automatically." />
          </div>
        </CardContent>
      </motion.div>
    </div>
  );
}

function StepStep({ number, title, desc }: { number: string | number; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ x: -2 }}
      className="flex items-start gap-3"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
        {number}
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </motion.div>
  );
}
