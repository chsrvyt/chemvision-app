"use client";

import { motion } from "framer-motion";
import { AirVent, Beaker, CheckCircle2, Flame, Gauge, Power, RotateCcw, Sparkles, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InstrumentShelf, Workbench } from "@/components/laboratory/LaboratoryComponents";
import type { LaboratoryInstrument } from "@/components/laboratory/laboratory-types";

export type FlameElement = "Sodium (Na)" | "Potassium (K)";
type FlameStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const steps = ["Switch ON", "Start compressor", "Ignite burner", "Insert blank", "Calibrate", "Remove blank", "Insert unknown", "Select element / Analyze"];
const apparatus: LaboratoryInstrument[] = [
  { id: "flame-photometer", name: "Flame Photometer", category: "Equipment", description: "Measures characteristic atomic emission intensity.", icon: Gauge },
  { id: "burner", name: "Burner", category: "Equipment", description: "Provides the stable blue excitation flame.", icon: Flame },
  { id: "compressor", name: "Air Compressor", category: "Equipment", description: "Supplies air to sustain the flame.", icon: AirVent },
  { id: "nebulizer", name: "Nebulizer", category: "Tools", description: "Aspirates and converts sample into aerosol.", icon: Beaker },
  { id: "sample-holder", name: "Sample Holder", category: "Equipment", description: "Positions blank and unknown solutions.", icon: Beaker },
];

export function FlamePhotometerSimulation({ onAnalyze }: { onAnalyze: (element: FlameElement) => void }) {
  const [stage, setStage] = useState<FlameStage>(1);
  const [element, setElement] = useState<FlameElement>("Sodium (Na)");
  const [calibrating, setCalibrating] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [warning, setWarning] = useState("");
  const [selected, setSelected] = useState<LaboratoryInstrument[]>([]);

  useEffect(() => {
    if (!analyzing) return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / 3300);
      setAnalysisProgress(Math.round(progress * 100));
      if (progress >= 1) {
        window.clearInterval(timer);
        setAnalyzing(false);
        setAnalyzed(true);
        onAnalyze(element);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [analyzing, element, onAnalyze]);

  function attemptStep(target: FlameStage) {
    setWarning("");
    if (target !== stage) {
      if (target === 3 && stage < 3) setWarning("Start the air compressor before igniting the burner.");
      else if (target === 5 && stage < 5) setWarning("Please insert the blank solution before calibrating.");
      else if (target === 8 && stage < 5) setWarning("Instrument must be calibrated before analysis.");
      else setWarning(`Complete step ${stage} before moving to step ${target}.`);
      return;
    }
    if (target === 5) {
      setCalibrating(true);
      window.setTimeout(() => {
        setCalibrating(false);
        setStage(6);
      }, 1500);
      return;
    }
    if (target === 8) {
      if (!analyzed) setAnalyzing(true);
      return;
    }
    setStage((target + 1) as FlameStage);
  }

  function reset() {
    setStage(1);
    setCalibrating(false);
    setAnalyzing(false);
    setAnalysisProgress(0);
    setAnalyzed(false);
    setWarning("");
  }

  const flameActive = stage >= 3;
  return <Card className="overflow-hidden border-primary/20"><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Interactive Flame Photometer</CardTitle><CardDescription>Establish the flame, calibrate with the blank, then analyze sodium or potassium in the unknown sample.</CardDescription></div><Badge variant={analyzed ? "default" : "outline"}>{analyzed ? "Analysis complete" : `Step ${stage} of 8`}</Badge></div></CardHeader><CardContent className="space-y-5">
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">{steps.map((label, index) => { const step = (index + 1) as FlameStage; const complete = stage > step || (step === 8 && analyzed); const active = stage === step && !analyzed; return <button key={label} type="button" onClick={() => attemptStep(step)} className={`rounded-lg border p-2 text-center text-[11px] transition-colors ${complete || active ? "border-primary/40 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`}><span className="block font-semibold">{complete ? "✓" : step}</span>{label}</button>; })}</div>
    {warning && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300"><TriangleAlert className="h-4 w-4 shrink-0" />{warning}</motion.div>}
    <div className="grid gap-4 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(20rem,1.15fr)]"><div className="relative flex min-h-[23rem] items-center justify-center overflow-hidden rounded-xl border bg-orange-500/5 p-6"><div className="absolute left-4 top-4 flex items-center gap-2 text-xs text-muted-foreground"><Gauge className="h-4 w-4 text-primary" />Detector: {analyzing || analyzed ? "active" : "standby"}</div><div className="relative w-64 rounded-2xl border-2 border-slate-400 bg-slate-200/70 p-4 shadow-lg dark:bg-slate-800/70"><div className="mb-3 flex items-center justify-between text-xs text-muted-foreground"><span>Flame photometer</span><Power className={`h-4 w-4 ${stage > 1 ? "text-emerald-500" : "text-muted-foreground"}`} /></div><div className="relative h-24 rounded-lg border bg-slate-950"><motion.div animate={{ scale: flameActive ? [0.92, 1.08, 0.95] : 0.5, opacity: flameActive ? [0.65, 1, 0.7] : 0.25 }} transition={{ repeat: flameActive ? Infinity : 0, duration: 0.9 }} className="absolute bottom-3 left-1/2 h-14 w-10 -translate-x-1/2 rounded-[50%_50%_45%_45%] bg-blue-400 shadow-[0_0_24px_9px_rgba(96,165,250,0.55)]" /><motion.div animate={{ x: analyzing ? [12, 160, 12] : 12, opacity: analyzing || analyzed ? 1 : 0.35 }} transition={{ repeat: analyzing ? Infinity : 0, duration: 1.2, ease: "linear" }} className="absolute left-3 top-1/2 h-1 w-16 -translate-y-1/2 rounded-full bg-yellow-200 shadow-[0_0_16px_5px_rgba(254,240,138,0.55)]" /></div><div className="mt-3 rounded-lg border bg-slate-950 p-3 text-center font-mono text-2xl tracking-widest text-emerald-400">{analyzed ? "READY" : "--.---"}<span className="ml-1 text-xs tracking-normal text-emerald-400/70">INT</span></div><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>{stage >= 7 ? "Unknown sample" : stage >= 4 ? "Blank solution" : "No sample"}</span><span>{element === "Sodium (Na)" ? "589 nm" : "766 nm"}</span></div></div><div className="absolute bottom-7 h-16 w-10 rounded-b-lg border-2 border-slate-400 bg-cyan-400/25" /><div className="absolute bottom-4 text-xs text-muted-foreground">Flame: {flameActive ? "stable blue" : "off"}</div></div><div className="space-y-4"><div className="rounded-xl border bg-muted/20 p-4"><div className="mb-3 flex items-center justify-between"><div><p className="text-sm font-medium">Analysis controls</p><p className="text-xs text-muted-foreground">{calibrating ? "Calibrating against the blank..." : analyzing ? "Aspirating sample and activating detector..." : "Complete the highlighted step."}</p></div><Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button></div>{stage === 1 && <Button className="w-full" onClick={() => attemptStep(1)}>Switch ON Instrument <Power className="ml-2 h-4 w-4" /></Button>}{stage === 2 && <Button className="w-full" onClick={() => attemptStep(2)}>Start Air Compressor <AirVent className="ml-2 h-4 w-4" /></Button>}{stage === 3 && <Button className="w-full" onClick={() => attemptStep(3)}>Ignite Burner <Flame className="ml-2 h-4 w-4" /></Button>}{stage === 4 && <Button className="w-full" onClick={() => attemptStep(4)}>Insert Blank Solution <Beaker className="ml-2 h-4 w-4" /></Button>}{stage === 5 && <Button className="w-full" disabled={calibrating} onClick={() => attemptStep(5)}>{calibrating ? "Calibrating..." : "Calibrate Instrument"}<Sparkles className="ml-2 h-4 w-4" /></Button>}{stage === 6 && <Button className="w-full" onClick={() => attemptStep(6)}>Remove Blank <RotateCcw className="ml-2 h-4 w-4" /></Button>}{stage === 7 && <Button className="w-full" onClick={() => attemptStep(7)}>Insert Unknown Sample <Beaker className="ml-2 h-4 w-4" /></Button>}{stage === 8 && <div className="space-y-3"><p className="text-xs text-muted-foreground">Select the element to analyze.</p><div className="grid grid-cols-2 gap-2"><Button variant={element === "Sodium (Na)" ? "default" : "outline"} onClick={() => setElement("Sodium (Na)")}>Sodium (Na)</Button><Button variant={element === "Potassium (K)" ? "default" : "outline"} onClick={() => setElement("Potassium (K)")}>Potassium (K)</Button></div><Button className="w-full" disabled={analyzing || analyzed} onClick={() => attemptStep(8)}>Press Analyze <Gauge className="ml-2 h-4 w-4" /></Button>{analyzing && <div><div className="mb-1 flex justify-between text-xs text-muted-foreground"><span>Aspiration and detector response</span><span>{analysisProgress}%</span></div><div className="h-2 rounded-full bg-muted"><motion.div animate={{ width: `${analysisProgress}%` }} className="h-2 rounded-full bg-primary" /></div></div>}{analyzed && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="mx-auto mb-1 h-5 w-5" />Analysis complete for {element}.</div>}</div>}</div><div className="rounded-xl border p-4"><p className="mb-2 text-sm font-medium">Instrument note</p><p className="text-sm leading-6 text-muted-foreground">{stage < 3 ? "A steady air supply is required before ignition." : stage < 5 ? "The blue flame provides the excitation energy for the element." : stage < 8 ? "Use the blank to establish the zero reference before aspirating the unknown." : "Select one element and compare its intensity with the calibration data."}</p></div></div></div>
    <div><p className="mb-3 text-sm font-semibold">Virtual Apparatus</p><div className="grid gap-4 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(18rem,1.2fr)]"><InstrumentShelf instruments={apparatus} selectedId={selected[selected.length - 1]?.id ?? null} onSelect={(instrument) => setSelected((current) => [...current, instrument])} /><Workbench selected={selected} onClear={() => setSelected([])} /></div></div>
  </CardContent></Card>;
}
