"use client";

import { motion } from "framer-motion";
import { Beaker, CheckCircle2, Droplets, Gauge, Power, RotateCcw, Sparkles, TriangleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PhStage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const steps = ["Switch ON", "Wash electrode", "Calibrate", "Dry electrode", "Insert into sample", "Stabilize reading", "Record reading"];

export function PhMeterSimulation({ onRecord }: { onRecord: (reading: number) => void }) {
  const [stage, setStage] = useState<PhStage>(1);
  const [buffer, setBuffer] = useState("7.00");
  const [reading, setReading] = useState(7.1);
  const [stabilization, setStabilization] = useState(0);
  const [stabilized, setStabilized] = useState(false);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (stage !== 6) return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / 4200);
      const nextReading = 7.1 - 0.78 * progress;
      setReading(Number(nextReading.toFixed(2)));
      setStabilization(Math.round(progress * 100));
      if (progress >= 1) {
        window.clearInterval(timer);
        setReading(6.32);
        setStabilized(true);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [stage]);

  const statusLabel = useMemo(() => {
    if (stage === 7) return "Reading recorded";
    if (stage === 6 && stabilized) return "Stable reading available";
    return `Step ${stage} of 7`;
  }, [stage, stabilized]);

  function attemptStep(target: PhStage) {
    setWarning("");
    if (target !== stage) {
      if (target === 5 && stage < 3) setWarning("Please calibrate the pH meter before measuring.");
      else if (target === 7 && !stabilized) setWarning("Wait for the pH reading to stabilize before recording it.");
      else setWarning(`Complete step ${stage} before moving to step ${target}.`);
      return;
    }
    if (target === 7) {
      setStage(7);
      onRecord(6.32);
      return;
    }
    setStage((target + 1) as PhStage);
  }

  function reset() {
    setStage(1);
    setReading(7.1);
    setStabilization(0);
    setStabilized(false);
    setWarning("");
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Gauge className="h-5 w-5 text-primary" />Interactive pH Meter</CardTitle>
            <CardDescription>Perform every preparation step in sequence, then record the stabilized digital reading.</CardDescription>
          </div>
          <Badge variant={stage === 7 ? "default" : "outline"}>{statusLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
          {steps.map((label, index) => {
            const stepNumber = (index + 1) as PhStage;
            const complete = stage > stepNumber;
            const active = stage === stepNumber;
            return <button key={label} type="button" onClick={() => attemptStep(stepNumber)} className={`rounded-lg border p-2 text-center text-[11px] transition-colors ${complete || active ? "border-primary/40 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`}><span className="block font-semibold">{complete ? "✓" : stepNumber}</span>{label}</button>;
          })}
        </div>

        {warning && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300"><TriangleAlert className="h-4 w-4 shrink-0" />{warning}</motion.div>}

        <div className="grid gap-4 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(20rem,1.2fr)]">
          <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-xl border bg-sky-500/5 p-6">
            <div className="absolute left-4 top-4 flex items-center gap-2 text-xs text-muted-foreground"><Beaker className="h-4 w-4 text-primary" />Sample beaker</div>
            <div className="relative mt-8 h-40 w-44 rounded-b-[3rem] border-2 border-slate-400 bg-background/60">
              <motion.div animate={{ height: stage >= 5 ? "46%" : "12%" }} className="absolute bottom-0 left-2 right-2 rounded-b-[2.5rem] bg-cyan-400/35" />
              <motion.div animate={{ y: stage >= 5 ? 44 : -34 }} transition={{ duration: 0.7 }} className="absolute left-1/2 top-0 h-20 w-2 -translate-x-1/2 rounded-full bg-slate-300 shadow-sm" />
              <div className="absolute -bottom-5 left-1/2 h-2 w-48 -translate-x-1/2 rounded-full bg-slate-400/50" />
            </div>
            <div className="absolute bottom-4 text-xs text-muted-foreground">Electrode: {stage >= 5 ? "in sample" : stage >= 4 ? "dry" : "ready"}</div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between"><div><p className="text-sm font-medium">Digital pH Meter</p><p className="text-xs text-muted-foreground">{stage === 1 ? "Power is off" : stage >= 5 ? "Measuring sample" : "Ready for calibration"}</p></div><div className={`flex h-9 w-9 items-center justify-center rounded-full ${stage > 1 ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground"}`}><Power className="h-4 w-4" /></div></div>
              <motion.div animate={{ scale: stage === 6 ? [1, 1.015, 1] : 1 }} transition={{ repeat: stage === 6 ? Infinity : 0, duration: 1.2 }} className="rounded-lg border bg-slate-950 p-4 text-center text-4xl font-semibold tracking-widest text-emerald-400 shadow-inner">{stage >= 5 ? reading.toFixed(2) : "--.--"}</motion.div>
              {stage === 6 && <div className="mt-3"><div className="mb-1 flex justify-between text-xs text-muted-foreground"><span>Stabilizing</span><span>{stabilization}%</span></div><div className="h-2 rounded-full bg-muted"><motion.div animate={{ width: `${stabilization}%` }} className="h-2 rounded-full bg-primary" /></div></div>}
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-3 flex items-center justify-between"><p className="text-sm font-medium">Simulation controls</p><Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button></div>
              {stage === 1 && <Button className="w-full" onClick={() => attemptStep(1)}>Switch ON pH Meter <Power className="ml-2 h-4 w-4" /></Button>}
              {stage === 2 && <Button className="w-full" onClick={() => attemptStep(2)}>Wash Electrode <Droplets className="ml-2 h-4 w-4" /></Button>}
              {stage === 3 && <div className="space-y-3"><p className="text-xs text-muted-foreground">Choose the standard buffer used for calibration.</p><div className="grid grid-cols-3 gap-2">{["4.00", "7.00", "9.20"].map((value) => <Button key={value} type="button" variant={buffer === value ? "default" : "outline"} size="sm" onClick={() => setBuffer(value)}>{value}</Button>)}</div><Button className="w-full" onClick={() => attemptStep(3)}>Calibrate with Buffer {buffer} <Gauge className="ml-2 h-4 w-4" /></Button></div>}
              {stage === 4 && <Button className="w-full" onClick={() => attemptStep(4)}>Dry Electrode <Sparkles className="ml-2 h-4 w-4" /></Button>}
              {stage === 5 && <Button className="w-full" onClick={() => attemptStep(5)}>Insert Electrode into Sample <Beaker className="ml-2 h-4 w-4" /></Button>}
              {stage === 6 && <div className="space-y-3"><p className="text-sm text-muted-foreground">The reading is approaching a stable value. Keep the electrode immersed and wait.</p><Button className="w-full" disabled={!stabilized} onClick={() => attemptStep(7)}>Record Reading <CheckCircle2 className="ml-2 h-4 w-4" /></Button></div>}
              {stage === 7 && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="mx-auto mb-1 h-5 w-5" />Reading recorded: pH 6.32</div>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
