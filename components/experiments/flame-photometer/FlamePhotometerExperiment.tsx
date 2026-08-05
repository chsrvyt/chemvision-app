"use client";

import { Calculator, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { ExperimentEngine } from "../ExperimentEngine";
import { FlamePhotometerSimulation, type FlameElement } from "./FlamePhotometerSimulation";
import { flamePhotometerConfig } from "./flame-photometer-config";

const calibration = {
  "Sodium (Na)": { slope: 2, intercept: 0, points: [{ concentration: 10, intensity: 20 }, { concentration: 20, intensity: 40 }, { concentration: 30, intensity: 60 }, { concentration: 40, intensity: 80 }], unknownIntensity: 69 },
  "Potassium (K)": { slope: 3.6, intercept: 0, points: [{ concentration: 5, intensity: 18 }, { concentration: 10, intensity: 36 }, { concentration: 15, intensity: 54 }, { concentration: 20, intensity: 72 }], unknownIntensity: 48.6 },
} satisfies Record<FlameElement, { slope: number; intercept: number; points: { concentration: number; intensity: number }[]; unknownIntensity: number }>;

export default function FlamePhotometerExperiment() {
  const [sample, setSample] = useState("Unknown sample");
  const [element, setElement] = useState<FlameElement>("Sodium (Na)");
  const [intensity, setIntensity] = useState("");
  const [concentration, setConcentration] = useState("");
  const [remarks, setRemarks] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const data = calibration[element];
  const measuredIntensity = Number(intensity);
  const validIntensity = Number.isFinite(measuredIntensity) && intensity.trim() !== "" && measuredIntensity >= 0;
  const calculatedConcentration = validIntensity ? (measuredIntensity - data.intercept) / data.slope : 0;
  const displayConcentration = concentration === "" ? calculatedConcentration : Number(concentration);
  const graphData = [...data.points, ...(validIntensity ? [{ concentration: Number(displayConcentration.toFixed(2)), intensity: measuredIntensity }] : [])];
  const recordAnalysis = useCallback((selectedElement: FlameElement) => {
    const selectedData = calibration[selectedElement];
    setElement(selectedElement);
    setIntensity(selectedData.unknownIntensity.toFixed(1));
    setConcentration((selectedData.unknownIntensity / selectedData.slope).toFixed(2));
    setAnalyzed(true);
  }, []);

  const observationSection = <Card><CardHeader><CardTitle>Editable Observation Table</CardTitle><CardDescription>Record the sample, detected element, emission intensity, and calculated concentration.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[840px] text-left text-sm"><thead><tr className="border-b"><th className="px-3 py-3 font-medium text-muted-foreground">Sample</th><th className="px-3 py-3 font-medium text-muted-foreground">Element</th><th className="px-3 py-3 font-medium text-muted-foreground">Intensity</th><th className="px-3 py-3 font-medium text-muted-foreground">Concentration</th><th className="px-3 py-3 font-medium text-muted-foreground">Remarks</th></tr></thead><tbody><tr><td className="px-3 py-2"><Input value={sample} onChange={(event) => setSample(event.target.value)} aria-label="Sample" /></td><td className="px-3 py-2"><Input value={element} readOnly aria-label="Element" /></td><td className="px-3 py-2"><Input type="number" min="0" step="0.1" value={intensity} onChange={(event) => { setIntensity(event.target.value); setAnalyzed(false); }} placeholder="Intensity" aria-label="Intensity" /></td><td className="px-3 py-2"><Input type="number" min="0" step="0.01" value={concentration} onChange={(event) => setConcentration(event.target.value)} placeholder="mg/L" aria-label="Concentration" /></td><td className="px-3 py-2"><Input value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Add remarks" aria-label="Remarks" /></td></tr></tbody></table></div></CardContent></Card>;
  const calculationSection = <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Automatic Calculation</CardTitle><CardDescription>Concentration is calculated from the selected element calibration.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-7 sm:text-sm">I = mC + b<br />I = {validIntensity ? measuredIntensity.toFixed(1) : "--.-"}<br />m = {data.slope.toFixed(2)}, b = {data.intercept.toFixed(2)}<br />C = (I - b) / m = {validIntensity ? `${calculatedConcentration.toFixed(2)} concentration units` : "--.--"}</div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Unknown concentration</p><p className="mt-1 text-lg font-semibold">{validIntensity ? `${displayConcentration.toFixed(2)} concentration units` : "Awaiting analysis"}</p></div></CardContent></Card><DashboardChart title="Intensity vs Concentration" description={`Calibration curve for ${element}. The final point is the analyzed unknown.`} data={graphData} dataKey="intensity" xKey="concentration" variant="line" color="#f97316" /></div>;
  const resultSection = <Card className={analyzed && validIntensity ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold">{analyzed && validIntensity ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Calculator className="h-5 w-5 text-primary" />}Result</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{analyzed && validIntensity ? `Element detected: ${element}. Emission intensity: ${measuredIntensity.toFixed(1)}. Calculated concentration: ${displayConcentration.toFixed(2)} concentration units. Status: Analysis complete.` : "Complete the calibrated flame photometer workflow to generate the result."}</p></CardContent></Card>;

  return <ExperimentEngine config={flamePhotometerConfig} interactiveSection={<FlamePhotometerSimulation onAnalyze={recordAnalysis} />} observationSection={observationSection} calculationSection={calculationSection} resultSection={resultSection} />;
}
