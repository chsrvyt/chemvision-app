"use client";

import { motion } from "framer-motion";
import { Beaker, CheckCircle2, CircleGauge, Gauge, Pipette, RotateCcw, Sparkles, TriangleAlert, Waves } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { InstrumentShelf, Workbench } from "@/components/laboratory/LaboratoryComponents";
import type { LaboratoryInstrument } from "@/components/laboratory/laboratory-types";

export type ConductivityPoint = { volume: number; conductivity: number };
const steps = ["Read instructions", "Switch ON meter", "Calibrate", "Insert probe", "Fill burette", "Start titration", "Endpoint"];
const apparatus: LaboratoryInstrument[] = [
  { id: "conductivity-meter", name: "Conductivity Meter", category: "Meters", description: "Displays solution conductivity during titration.", icon: CircleGauge },
  { id: "conductivity-probe", name: "Conductivity Probe", category: "Meters", description: "Immersed cell that senses ionic conductance.", icon: Pipette },
  { id: "beaker", name: "Beaker", category: "Glassware", description: "Holds the stirred sample solution.", icon: Beaker },
  { id: "burette", name: "Burette", category: "Tools", description: "Delivers standard titrant in measured increments.", icon: Gauge },
];

type ConductometricStage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function ConductometricTitrationSimulation({ onPoint, onEndpoint }: { onPoint: (point: ConductivityPoint) => void; onEndpoint: (volume: number) => void }) {
  const [stage, setStage] = useState<ConductometricStage>(1);
  const [volume, setVolume] = useState(0);
  const [conductivity, setConductivity] = useState(12);
  const [titrating, setTitrating] = useState(false);
  const [warning, setWarning] = useState("");
  const [selected, setSelected] = useState<LaboratoryInstrument[]>([]);
  const endpoint = 10;
  const atEndpoint = volume >= endpoint;
  const curve = [{ volume: 0, conductivity: 12 }, { volume: 2, conductivity: 10.4 }, { volume: 4, conductivity: 8.8 }, { volume: 6, conductivity: 7.2 }, { volume: 8, conductivity: 5.6 }, { volume: 10, conductivity: 4 }, { volume: 12, conductivity: 5.3 }, { volume: 14, conductivity: 6.6 }];

  function conductivityAt(nextVolume: number) {
    return Number((nextVolume <= endpoint ? 12 - 0.8 * nextVolume : 4 + 0.65 * (nextVolume - endpoint)).toFixed(2));
  }

  function attemptStep(target: ConductometricStage) {
    setWarning("");
    if (target !== stage) {
      if (target === 3 && stage < 3) setWarning("Please switch on the conductivity meter before calibration.");
      else if (target === 4 && stage < 4) setWarning("Please calibrate the conductivity meter.");
      else if (target === 6 && stage < 6) setWarning("Insert the conductivity probe before measurement.");
      else if (target === 7 && !atEndpoint) setWarning("Continue titration until the conductivity intersection is reached.");
      else setWarning(`Complete step ${stage} before moving to step ${target}.`);
      return;
    }
    if (target === 3) {
      window.setTimeout(() => setStage(4), 1200);
      return;
    }
    if (target === 6) {
      setTitrating(true);
      return;
    }
    if (target === 7 && atEndpoint) {
      setStage(7);
      setTitrating(false);
      onEndpoint(endpoint);
      return;
    }
    setStage((target + 1) as ConductometricStage);
  }

  function addTitrant() {
    if (!titrating || atEndpoint) return;
    const nextVolume = Math.min(endpoint, Number((volume + 0.5).toFixed(1)));
    const nextConductivity = conductivityAt(nextVolume);
    setVolume(nextVolume);
    setConductivity(nextConductivity);
    onPoint({ volume: nextVolume, conductivity: nextConductivity });
    if (nextVolume >= endpoint) {
      setStage(7);
      setTitrating(false);
      onEndpoint(endpoint);
    }
  }

  function reset() {
    setStage(1);
    setVolume(0);
    setConductivity(12);
    setTitrating(false);
    setWarning("");
  }

  return <Card className="overflow-hidden border-primary/20"><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><Waves className="h-5 w-5 text-primary" />Interactive Conductometric Titration</CardTitle><CardDescription>Calibrate the meter, immerse the probe, and follow the live conductivity curve as titrant is added.</CardDescription></div><Badge variant={atEndpoint ? "default" : "outline"}>{atEndpoint ? "Endpoint detected" : `Step ${stage} of 7`}</Badge></div></CardHeader><CardContent className="space-y-5">
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">{steps.map((label, index) => { const step = (index + 1) as ConductometricStage; const complete = stage > step; const active = stage === step; return <button key={label} type="button" onClick={() => attemptStep(step)} className={`rounded-lg border p-2 text-center text-[11px] transition-colors ${complete || active ? "border-primary/40 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`}><span className="block font-semibold">{complete ? "✓" : step}</span>{label}</button>; })}</div>
    {warning && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300"><TriangleAlert className="h-4 w-4 shrink-0" />{warning}</motion.div>}
    <div className="grid gap-4 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(20rem,1.15fr)]"><div className="relative flex min-h-[23rem] items-center justify-center overflow-hidden rounded-xl border bg-cyan-500/5 p-6"><div className="relative w-64 rounded-2xl border-2 border-slate-400 bg-slate-200/70 p-4 shadow-lg dark:bg-slate-800/70"><div className="mb-3 flex items-center justify-between text-xs text-muted-foreground"><span>Conductivity meter</span><Gauge className={`h-4 w-4 ${stage > 1 ? "text-emerald-500" : "text-muted-foreground"}`} /></div><div className="rounded-lg border bg-slate-950 p-4 text-center font-mono text-3xl tracking-widest text-emerald-400">{conductivity.toFixed(2)}<span className="ml-1 text-xs tracking-normal text-emerald-400/70">mS/cm</span></div><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>{stage >= 4 ? "Probe immersed" : "Probe standby"}</span><span>{volume.toFixed(1)} mL</span></div></div><motion.div animate={{ y: stage >= 4 ? 44 : -24 }} transition={{ duration: 0.6 }} className="absolute bottom-7 h-20 w-3 rounded-full border-2 border-slate-400 bg-slate-300" /><motion.div animate={{ rotate: titrating ? [0, 2, -2, 0] : 0 }} transition={{ repeat: titrating ? Infinity : 0, duration: 1 }} className="absolute bottom-8 h-2 w-32 rounded-full bg-slate-500/60" /><div className="absolute bottom-4 text-xs text-muted-foreground">Magnetic stirrer: {titrating ? "mixing" : "ready"}</div></div><div className="space-y-4"><div className="rounded-xl border bg-muted/20 p-4"><div className="mb-3 flex items-center justify-between"><div><p className="text-sm font-medium">Measurement controls</p><p className="text-xs text-muted-foreground">{stage === 3 ? "Calibration reference is being stabilized..." : titrating ? "Add titrant and watch the conductivity display." : "Complete the highlighted step."}</p></div><Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button></div>{stage === 1 && <Button className="w-full" onClick={() => attemptStep(1)}>Read Instructions <Sparkles className="ml-2 h-4 w-4" /></Button>}{stage === 2 && <Button className="w-full" onClick={() => attemptStep(2)}>Switch ON Conductivity Meter <Gauge className="ml-2 h-4 w-4" /></Button>}{stage === 3 && <Button className="w-full" onClick={() => attemptStep(3)}>Calibrate Instrument <Sparkles className="ml-2 h-4 w-4" /></Button>}{stage === 4 && <Button className="w-full" onClick={() => attemptStep(4)}>Insert Conductivity Probe <Pipette className="ml-2 h-4 w-4" /></Button>}{stage === 5 && <Button className="w-full" onClick={() => attemptStep(5)}>Fill Burette <Gauge className="ml-2 h-4 w-4" /></Button>}{stage === 6 && <div className="space-y-3"><Button className="w-full" onClick={() => attemptStep(6)} disabled={titrating}>Start Titration <Waves className="ml-2 h-4 w-4" /></Button><Button variant="outline" className="w-full" onClick={addTitrant} disabled={!titrating || atEndpoint}>Open Valve +0.5 mL</Button><p className="text-center text-xs text-muted-foreground">Volume added: {volume.toFixed(1)} mL | Endpoint: {endpoint.toFixed(1)} mL</p></div>}{stage === 7 && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="mx-auto mb-1 h-5 w-5" />Endpoint found near {endpoint.toFixed(1)} mL by intersection of the two conductivity regions.</div>}</div><div className="rounded-xl border p-4"><p className="mb-2 text-sm font-medium">Current instruction</p><p className="text-sm leading-6 text-muted-foreground">{stage < 4 ? "Calibrate the meter before inserting the probe into the solution." : stage < 6 ? "Keep the probe immersed and the sample mixed without touching the beaker." : stage < 7 ? "Add titrant in measured increments; the falling and rising regions reveal the endpoint." : "Use the intersection volume in the normality calculation."}</p></div></div></div>
    <div><p className="mb-3 text-sm font-semibold">Virtual Apparatus</p><div className="grid gap-4 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(18rem,1.2fr)]"><InstrumentShelf instruments={apparatus} selectedId={selected[selected.length - 1]?.id ?? null} onSelect={(instrument) => setSelected((current) => [...current, instrument])} /><Workbench selected={selected} onClear={() => setSelected([])} /></div></div>
    <DashboardChart title="Live Conductivity vs Volume" description="The curve falls before equivalence and rises after excess titrant is introduced." data={volume === 0 ? curve.slice(0, 1) : [...curve.filter((point) => point.volume <= volume), { volume, conductivity }]} dataKey="conductivity" xKey="volume" variant="line" color="#06b6d4" />
  </CardContent></Card>;
}
