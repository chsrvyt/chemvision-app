"use client";

import { Calculator, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExperimentEngine } from "../ExperimentEngine";
import { PhMeterSimulation } from "./PhMeterSimulation";
import { phMeterConfig } from "./ph-meter-config";

export default function PhMeterExperiment() {
  const [sample, setSample] = useState("Unknown sample");
  const [observedPh, setObservedPh] = useState("");
  const [remarks, setRemarks] = useState("");
  const [recorded, setRecorded] = useState(false);
  const phValue = Number(observedPh);
  const validPh = Number.isFinite(phValue) && observedPh.trim() !== "" && phValue >= 0 && phValue <= 14;
  const classification = !validPh ? "Awaiting reading" : phValue < 7 ? "Acidic" : phValue > 7 ? "Basic" : "Neutral";
  const explanation = classification === "Acidic" ? "The observed pH is below 7, indicating a higher hydrogen ion concentration." : classification === "Basic" ? "The observed pH is above 7, indicating a lower hydrogen ion concentration relative to neutral water." : classification === "Neutral" ? "The observed pH is 7, which corresponds to a neutral solution at the reference condition." : "Record a valid pH value after the digital display stabilizes.";

  function recordReading(reading: number) {
    setObservedPh(reading.toFixed(2));
    setRecorded(true);
  }

  const observationSection = <Card><CardHeader><CardTitle>Editable Observation Table</CardTitle><CardDescription>Record the sample identity, stabilized pH, and any visual remarks.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="border-b"><th className="px-3 py-3 font-medium text-muted-foreground">Sample Name</th><th className="px-3 py-3 font-medium text-muted-foreground">Observed pH</th><th className="px-3 py-3 font-medium text-muted-foreground">Remarks</th></tr></thead><tbody><tr><td className="px-3 py-2"><Input value={sample} onChange={(event) => setSample(event.target.value)} aria-label="Sample name" /></td><td className="px-3 py-2"><Input type="number" min="0" max="14" step="0.01" value={observedPh} onChange={(event) => { setObservedPh(event.target.value); setRecorded(false); }} placeholder="e.g. 6.32" aria-label="Observed pH" /></td><td className="px-3 py-2"><Input value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Add remarks" aria-label="Remarks" /></td></tr></tbody></table></div></CardContent></Card>;
  const calculationSection = <Card><CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Automatic Classification</CardTitle><CardDescription>Classification is derived from the recorded pH value.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-7 sm:text-sm">pH = {validPh ? phValue.toFixed(2) : "--.--"}<br />Classification = {classification}</div><div className="grid gap-3 sm:grid-cols-3">{["Acidic", "Neutral", "Basic"].map((label) => <div key={label} className={`rounded-lg border p-3 text-center text-sm ${classification === label ? "border-primary bg-primary/10 font-semibold text-primary" : "text-muted-foreground"}`}>{label}</div>)}</div><p className="text-sm leading-6 text-muted-foreground">{explanation}</p></CardContent></Card>;
  const resultSection = <Card className={recorded && validPh ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold">{recorded && validPh ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Calculator className="h-5 w-5 text-primary" />}Result</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{recorded && validPh ? `${sample || "The sample"} has an observed pH of ${phValue.toFixed(2)} and is classified as ${classification.toLowerCase()}.` : "Complete the sequence, record the stable reading, and the result will be generated automatically."}</p></CardContent></Card>;

  return <ExperimentEngine config={phMeterConfig} interactiveSection={<PhMeterSimulation onRecord={recordReading} />} observationSection={observationSection} calculationSection={calculationSection} resultSection={resultSection} />;
}
