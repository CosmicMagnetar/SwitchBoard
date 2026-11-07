"use client";

import { Mic, MicOff, Play, StopCircle, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VoiceCapture() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [status, setStatus] = useState("Ready to record");
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setStatus("Speech recognition not supported in this browser");
      return;
    }
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setStatus("Listening... speak now");
    };

    recognitionRef.current.onresult = (event: any) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      setTranscript(interim);
      if (final) {
        setFinalTranscript((prev) => prev + " " + final);
        setStatus("Transcribed — routed as task");
      }
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
      setStatus("Recognition error — try again");
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      if (!transcript && !finalTranscript) {
        setStatus("Ready to record");
      }
    };
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      setFinalTranscript("");
      recognitionRef.current.start();
    }
  };

  if (!isSupported) {
    return (
      <Card className="rounded-2xl border border-border bg-background p-6 shadow">
        <CardHeader>
          <CardTitle>Voice Capture</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-border rounded-2xl bg-secondary/30">
            <MicOff size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-sm font-medium">Speech recognition not supported</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Use Chrome, Edge, or Safari for voice capture.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            Your voice becomes a task. Transcription runs in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center justify-center gap-5 py-10 border-2 border-dashed border-border rounded-2xl bg-secondary/30"
          >
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center">
              {isListening ? (
                <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse" />
              ) : null}
              <div className="relative z-10 flex items-center justify-center">
                <Mic
                  size={32}
                  className={`
                    text-muted-foreground transition-colors duration-300
                    ${isListening ? "text-destructive animate-pulse" : ""}
                  `}
                />
                {isListening && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white animate-pulse">
                    •
                  </span>
                )}
              </div>
            </div>
            <Button
              variant={isListening ? "destructive" : "outline"}
              size="lg"
              onClick={toggleRecording}
              className="w-48"
            >
              {isListening ? (
                <>
                  <StopCircle size={20} className="mr-2" />
                  Stop recording
                </>
              ) : (
                <>
                  <Mic size={20} className="mr-2" />
                  Start recording
                </>
              )}
            </Button>
            <div className="flex flex-col items-center gap-2">
              <span className={`
                text-xs font-medium transition-colors
                ${isListening
                  ? "text-destructive"
                  : transcript || finalTranscript
                  ? "text-success"
                  : "text-muted-foreground"}
              `}>
                {isListening
                  ? "Listening..."
                  : transcript || finalTranscript
                  ? "Transcribed"
                  : "Ready to record"}
              </span>
              <p className="text-sm text-muted-foreground text-center">
                Speak a task &rarr; transcript &rarr; AI understands intent &rarr; routed to the right person
              </p>
            </div>
          </motion.div>

          {(transcript || finalTranscript) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl border border-border bg-secondary/50"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-info/10 flex items-center justify-center text-info dark:text-info-foreground text-xs font-bold mt-0.5">
                  T
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Transcript
                  </div>
                  <div className="text-sm">{finalTranscript}</div>
                  {transcript && (
                    <div className="text-xs text-muted-foreground mt-1 italic">
                      {transcript}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTranscript("");
                  setFinalTranscript("");
                  setStatus("Ready to record");
                }}
              >
                Clear transcript
              </Button>
            </motion.div>
          )}
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
            <StepStep number="2" title="Transcribe" desc="Speech recognition converts your voice to text in the browser." />
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
