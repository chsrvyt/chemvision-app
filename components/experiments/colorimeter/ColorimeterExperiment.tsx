"use client";

import { Calculator, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { ExperimentEngine } from "../ExperimentEngine";
import { ColorimeterSimulation } from "./ColorimeterSimulation";
import { colorimeterConfig } from "./colorimeter-config";

const calibrationPoints = [{ concentration: 10, absorbance: 0.12 }, { concentration: 20, absorbance: 0.24 }, { concentration: 30, absorbance: 0.36 }, { concentration: 40, absorbance: 0.48 }];
const slope = 0.012;
const intercept = 0;

export default function ColorimeterExperiment() {
  const [sample, setSample] = useState("Unknown colored solution");
  const [observedAbsorbance, setObservedAbsorbance] = useState("");
  const [concentration, setConcentration] = useState("");
  const [remarks, setRemarks] = useState("");
  const [measured, setMeasured] = useState(false);
  const absorbance = Number(observedAbsorbance);
  const validAbsorbance = Number.isFinite(absorbance) && observedAbsorbance.trim() !== "" && absorbance >= 0;
  const calculatedConcentration = validAbsorbance ? (absorbance - intercept) / slope : 0;
  const displayConcentration = concentration === "" ? calculatedConcentration : Number(concentration);
  const graphData = [...calibrationPoints, ...(validAbsorbance ? [{ concentration: Number(displayConcentration.toFixed(2)), absorbance }] : [])];
  const recordMeasurement = useCallback((value: number) => { setObservedAbsorbance(value.toFixed(3)); setConcentration((value / slope).toFixed(2)); setMeasured(true); }, []);

  const observationSection = <Card><CardHeader><CardTitle>Editable Observation Table</CardTitle><CardDescription>Record the unknown sample reading and calculated concentration from the calibration curve.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead><tr className="border-b"><th className="px-3 py-3 font-medium text-muted-foreground">Sample Name</th><th className="px-3 py-3 font-medium text-muted-foreground">Absorbance</th><th className="px-3 py-3 font-medium text-muted-foreground">Concentration (mg/L)</th><th className="px-3 py-3 font-medium text-muted-foreground">Remarks</th></tr></thead><tbody><tr><td className="px-3 py-2"><Input value={sample} onChange={(event) => setSample(event.target.value)} aria-label="Sample name" /></td><td className="px-3 py-2"><Input type="number" min="0" step="0.001" value={observedAbsorbance} onChange={(event) => { setObservedAbsorbance(event.target.value); setMeasured(false); }} placeholder="e.g. 0.421" aria-label="Absorbance" /></td><td className="px-3 py-2"><Input type="number" min="0" step="0.01" value={concentration} onChange={(event) => setConcentration(event.target.value)} placeholder="Calculated" aria-label="Concentration" /></td><td className="px-3 py-2"><Input value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Add remarks" aria-label="Remarks" /></td></tr></tbody></table></div></CardContent></Card>;
  const calculationSection = <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Beer-Lambert Calculation</CardTitle><CardDescription>Full working from the calibration curve.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-7 sm:text-sm">A = mC + b<br />A = {validAbsorbance ? absorbance.toFixed(3) : "--.---"}<br />m = {slope.toFixed(3)} AU per mg/L, b = {intercept.toFixed(3)}<br />C = (A - b) / m = {validAbsorbance ? calculatedConcentration.toFixed(2) : "--.--"} mg/L</div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Unknown concentration</p><p className="mt-1 text-lg font-semibold">{validAbsorbance ? `${displayConcentration.toFixed(2)} mg/L` : "Awaiting measurement"}</p></div></CardContent></Card><DashboardChart title="Calibration Curve" description="Absorbance versus concentration. The final point represents the measured unknown." data={graphData} dataKey="absorbance" xKey="concentration" variant="line" color="#0ea5e9" /></div>;
  const resultSection = <Card className={measured && validAbsorbance ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold">{measured && validAbsorbance ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Calculator className="h-5 w-5 text-primary" />}Result</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{measured && validAbsorbance ? `${sample || "The unknown solution"} has an absorbance of ${absorbance.toFixed(3)} AU and an estimated concentration of ${displayConcentration.toFixed(2)} mg/L.` : "Complete the calibration and unknown measurement to generate the result automatically."}</p></CardContent></Card>;

  return <ExperimentEngine config={colorimeterConfig} interactiveSection={<ColorimeterSimulation onMeasure={recordMeasurement} />} observationSection={observationSection} calculationSection={calculationSection} resultSection={resultSection} />;
}
