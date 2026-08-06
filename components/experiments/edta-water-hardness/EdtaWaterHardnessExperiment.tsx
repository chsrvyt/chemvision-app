"use client";

import { Calculator, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { ExperimentEngine } from "../ExperimentEngine";
import { EdtaWaterHardnessSimulation } from "./EdtaWaterHardnessSimulation";
import { edtaWaterHardnessConfig } from "./edta-water-hardness-config";

type Trial = { trial: string; initial: string; final: string; volume: string; hardness: string; remarks: string };
const initialTrials: Trial[] = [
  { trial: "1", initial: "0.0", final: "12.6", volume: "12.6", hardness: "252.23", remarks: "Concordant titre" },
  { trial: "2", initial: "0.0", final: "12.5", volume: "12.5", hardness: "250.23", remarks: "Concordant titre" },
  { trial: "3", initial: "0.0", final: "12.6", volume: "12.6", hardness: "252.23", remarks: "Concordant titre" },
];
const sampleVolume = 50;
const edtaMolarity = 0.01;
const calciumCarbonateEquivalent = 100.09;

export default function EdtaWaterHardnessExperiment() {
  const [trials, setTrials] = useState(initialTrials);
  const [endpointVolume, setEndpointVolume] = useState<number | null>(null);
  const completedVolumes = trials.map((trial) => Number(trial.volume)).filter((volume) => Number.isFinite(volume) && volume > 0);
  const averageVolume = completedVolumes.length ? completedVolumes.reduce((sum, volume) => sum + volume, 0) / completedVolumes.length : 0;
  const totalHardness = (averageVolume * edtaMolarity * calciumCarbonateEquivalent * 1000) / sampleVolume;
  const graphData = [{ volume: 8, hardness: 160.14 }, { volume: 10, hardness: 200.18 }, { volume: 12, hardness: 240.22 }, ...(averageVolume ? [{ volume: Number(averageVolume.toFixed(2)), hardness: Number(totalHardness.toFixed(2)) }] : [])];

  const updateTrial = (index: number, key: keyof Trial, value: string) => {
    setTrials((current) => current.map((trial, trialIndex) => {
      if (trialIndex !== index) return trial;
      const next = { ...trial, [key]: value };
      if (key === "initial" || key === "final") {
        const initial = key === "initial" ? Number(value) : Number(trial.initial);
        const final = key === "final" ? Number(value) : Number(trial.final);
        next.volume = Number.isFinite(initial) && Number.isFinite(final) ? Math.max(0, final - initial).toFixed(1) : "";
        next.hardness = next.volume ? (((Number(next.volume) * edtaMolarity * calciumCarbonateEquivalent * 1000) / sampleVolume)).toFixed(2) : "";
      }
      if (key === "volume") next.hardness = value ? (((Number(value) * edtaMolarity * calciumCarbonateEquivalent * 1000) / sampleVolume)).toFixed(2) : "";
      return next;
    }));
  };

  const captureEndpoint = useCallback((volume: number) => {
    setEndpointVolume(volume);
    setTrials((current) => current.map((trial, index) => index === 0 ? { ...trial, final: volume.toFixed(1), volume: volume.toFixed(1), hardness: ((volume * edtaMolarity * calciumCarbonateEquivalent * 1000) / sampleVolume).toFixed(2), remarks: "Virtual endpoint recorded" } : trial));
  }, []);

  const observationSection = <Card><CardHeader><CardTitle>Editable Observation Table</CardTitle><CardDescription>Enter initial and final burette readings. EDTA volume and hardness are calculated automatically.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead><tr className="border-b">{["Trial", "Initial Reading (mL)", "Final Reading (mL)", "Volume of EDTA (mL)", "Hardness (ppm)", "Remarks"].map((heading) => <th key={heading} className="px-3 py-3 font-medium text-muted-foreground">{heading}</th>)}</tr></thead><tbody>{trials.map((trial, index) => <tr key={trial.trial} className="border-b last:border-0"><td className="px-3 py-2 font-medium">{trial.trial}</td><td className="px-3 py-2"><Input type="number" step="0.1" value={trial.initial} onChange={(event) => updateTrial(index, "initial", event.target.value)} aria-label={`Trial ${trial.trial} initial reading`} /></td><td className="px-3 py-2"><Input type="number" step="0.1" value={trial.final} onChange={(event) => updateTrial(index, "final", event.target.value)} aria-label={`Trial ${trial.trial} final reading`} /></td><td className="px-3 py-2"><Input type="number" step="0.1" value={trial.volume} onChange={(event) => updateTrial(index, "volume", event.target.value)} aria-label={`Trial ${trial.trial} volume of EDTA`} /></td><td className="px-3 py-2"><Input value={trial.hardness} readOnly aria-label={`Trial ${trial.trial} hardness`} /></td><td className="px-3 py-2"><Input value={trial.remarks} onChange={(event) => updateTrial(index, "remarks", event.target.value)} aria-label={`Trial ${trial.trial} remarks`} /></td></tr>)}</tbody></table></div></CardContent></Card>;
  const calculationSection = <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Automatic Hardness Calculation</CardTitle><CardDescription>Calcium carbonate equivalent from the average EDTA titre.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-7 sm:text-sm">Average V_EDTA = {averageVolume.toFixed(2)} mL<br />Hardness = (V x M x 100.09 x 1000) / V_sample<br />= ({averageVolume.toFixed(2)} x {edtaMolarity.toFixed(2)} x {calciumCarbonateEquivalent.toFixed(2)} x 1000) / {sampleVolume}<br />= {totalHardness.toFixed(2)} ppm as CaCO3</div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Average EDTA Volume</p><p className="mt-1 text-lg font-semibold">{averageVolume.toFixed(2)} mL</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Total Hardness</p><p className="mt-1 text-lg font-semibold">{totalHardness.toFixed(2)} ppm</p></div></div></CardContent></Card><DashboardChart title="Hardness Calibration" description="Hardness response versus EDTA volume, including the observed average titre." data={graphData} dataKey="hardness" xKey="volume" variant="line" color="#0ea5e9" /></div>;
  const resultSection = <Card className={endpointVolume ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold">{endpointVolume ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Calculator className="h-5 w-5 text-primary" />}Result</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{endpointVolume ? `The total hardness of the hard water sample is ${totalHardness.toFixed(2)} ppm as CaCO3, based on an average EDTA volume of ${averageVolume.toFixed(2)} mL.` : "Complete the EDTA titration and enter the observation readings to generate the total hardness result."}</p></CardContent></Card>;

  return <ExperimentEngine config={edtaWaterHardnessConfig} interactiveSection={<EdtaWaterHardnessSimulation onEndpoint={captureEndpoint} />} observationSection={observationSection} calculationSection={calculationSection} resultSection={resultSection} />;
}
