"use client";

import { useState } from "react";
import { Calculator, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExperimentEngine } from "../ExperimentEngine";
import { acidBaseTitrationConfig } from "./acid-base-config";
import { AcidBaseTitrationSimulation } from "./AcidBaseTitrationSimulation";

type Trial = { trial: number; initial: string; final: string; volume: string };

const startingTrials: Trial[] = [
  { trial: 1, initial: "0.0", final: "", volume: "" },
  { trial: 2, initial: "0.0", final: "", volume: "" },
  { trial: 3, initial: "0.0", final: "", volume: "" },
];

export default function AcidBaseTitrationExperiment() {
  const [trials, setTrials] = useState(startingTrials);
  const [endpointVolume, setEndpointVolume] = useState<number | null>(null);
  const acidVolume = 10;
  const baseNormality = 0.1;
  const hclEquivalentWeight = 36.46;
  const completedVolumes = trials.map((trial) => Number(trial.volume)).filter((volume) => Number.isFinite(volume) && volume > 0);
  const averageVolume = completedVolumes.length ? completedVolumes.reduce((sum, volume) => sum + volume, 0) / completedVolumes.length : 0;
  const normality = averageVolume ? (baseNormality * averageVolume) / acidVolume : 0;
  const strength = normality * hclEquivalentWeight;

  function updateTrial(index: number, key: keyof Trial, value: string) {
    setTrials((current) => current.map((trial, trialIndex) => trialIndex === index ? { ...trial, [key]: value, ...(key === "initial" || key === "final" ? { volume: key === "final" && trial.initial ? (Number(value) - Number(trial.initial)).toFixed(1) : trial.volume } : {}) } : trial));
  }

  function captureEndpoint(volume: number) {
    setEndpointVolume(volume);
    setTrials((current) => current.map((trial, index) => index === 0 ? { ...trial, final: volume.toFixed(1), volume: volume.toFixed(1) } : trial));
  }

  const observationSection = <Card><CardHeader><CardTitle>Editable Observation Table</CardTitle><CardDescription>Enter burette readings for each trial. Volume used is calculated from final minus initial reading.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="border-b">{["Trial", "Initial Reading (mL)", "Final Reading (mL)", "Volume Used (mL)"].map((heading) => <th key={heading} className="px-3 py-3 font-medium text-muted-foreground">{heading}</th>)}</tr></thead><tbody>{trials.map((trial, index) => <tr key={trial.trial} className="border-b last:border-0"><td className="px-3 py-2 font-medium">{trial.trial}</td><td className="px-3 py-2"><Input type="number" step="0.1" value={trial.initial} onChange={(event) => updateTrial(index, "initial", event.target.value)} aria-label={`Trial ${trial.trial} initial reading`} /></td><td className="px-3 py-2"><Input type="number" step="0.1" value={trial.final} onChange={(event) => updateTrial(index, "final", event.target.value)} aria-label={`Trial ${trial.trial} final reading`} /></td><td className="px-3 py-2"><Input type="number" step="0.1" value={trial.volume} onChange={(event) => updateTrial(index, "volume", event.target.value)} aria-label={`Trial ${trial.trial} volume used`} /></td></tr>)}</tbody></table></div></CardContent></Card>;
  const calculationSection = <Card><CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Automatic Calculations</CardTitle><CardDescription>Calculated from the entered concordant titre values.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-7 sm:text-sm">N₁V₁ = N₂V₂<br />Normality of HCl = ({baseNormality.toFixed(2)} × {averageVolume.toFixed(2)}) ÷ {acidVolume.toFixed(2)}<br />Strength = Normality × Equivalent weight<br />Strength = {normality.toFixed(4)} × {hclEquivalentWeight.toFixed(2)}</div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Average Volume</p><p className="mt-1 text-lg font-semibold">{averageVolume.toFixed(2)} mL</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Normality</p><p className="mt-1 text-lg font-semibold">{normality.toFixed(4)} N</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Strength</p><p className="mt-1 text-lg font-semibold">{strength.toFixed(3)} g/L</p></div></div></CardContent></Card>;
  const resultSection = <Card className={endpointVolume ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold">{endpointVolume ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Calculator className="h-5 w-5 text-primary" />}Result</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{averageVolume ? `The calculated strength of the hydrochloric acid sample is ${strength.toFixed(3)} g/L, based on an average titre of ${averageVolume.toFixed(2)} mL.` : "Complete at least one observation row to generate the result."}</p></CardContent></Card>;

  return <ExperimentEngine config={acidBaseTitrationConfig} interactiveSection={<AcidBaseTitrationSimulation onEndpoint={captureEndpoint} />} observationSection={observationSection} calculationSection={calculationSection} resultSection={resultSection} />;
}
