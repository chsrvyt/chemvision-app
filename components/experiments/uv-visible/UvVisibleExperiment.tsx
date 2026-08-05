"use client";

import { Calculator, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { ExperimentEngine } from "../ExperimentEngine";
import { UvVisibleSimulation, spectrumDataset } from "./UvVisibleSimulation";
import { uvVisibleConfig } from "./uv-visible-config";

const pathLength = 1;
const absorptivity = 0.045;

export default function UvVisibleExperiment() {
  const [trial, setTrial] = useState("1");
  const [wavelength, setWavelength] = useState("");
  const [observedAbsorbance, setObservedAbsorbance] = useState("");
  const [lambdaMax, setLambdaMax] = useState("");
  const [remarks, setRemarks] = useState("");
  const [scanned, setScanned] = useState(false);
  const maximum = spectrumDataset.reduce((peak, point) => point.absorbance > peak.absorbance ? point : peak, spectrumDataset[0]);
  const absorbance = Number(observedAbsorbance);
  const selectedWavelength = Number(wavelength);
  const validReading = Number.isFinite(absorbance) && observedAbsorbance.trim() !== "";
  const transmittance = validReading ? Math.pow(10, -absorbance) * 100 : 0;
  const concentration = validReading ? absorbance / (absorptivity * pathLength) : 0;
  const spectrum = scanned ? spectrumDataset : [];
  const recordScan = useCallback((selected: number) => {
    const point = spectrumDataset.find((item) => item.wavelength === selected) ?? spectrumDataset[0];
    setWavelength(String(selected));
    setObservedAbsorbance(point.absorbance.toFixed(3));
    setLambdaMax(String(maximum.wavelength));
    setScanned(true);
  }, [maximum.wavelength]);

  const observationSection = <Card><CardHeader><CardTitle>Editable Observation Table</CardTitle><CardDescription>Record the selected wavelength, measured absorbance, and lambda max identified from the spectrum.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[840px] text-left text-sm"><thead><tr className="border-b"><th className="px-3 py-3 font-medium text-muted-foreground">Trial</th><th className="px-3 py-3 font-medium text-muted-foreground">Selected Wavelength (nm)</th><th className="px-3 py-3 font-medium text-muted-foreground">Absorbance</th><th className="px-3 py-3 font-medium text-muted-foreground">Lambda Max (nm)</th><th className="px-3 py-3 font-medium text-muted-foreground">Remarks</th></tr></thead><tbody><tr><td className="px-3 py-2"><Input value={trial} onChange={(event) => setTrial(event.target.value)} aria-label="Trial" /></td><td className="px-3 py-2"><Input type="number" value={wavelength} onChange={(event) => setWavelength(event.target.value)} placeholder="nm" aria-label="Selected wavelength" /></td><td className="px-3 py-2"><Input type="number" min="0" step="0.001" value={observedAbsorbance} onChange={(event) => { setObservedAbsorbance(event.target.value); setScanned(false); }} placeholder="AU" aria-label="Absorbance" /></td><td className="px-3 py-2"><Input type="number" value={lambdaMax} onChange={(event) => setLambdaMax(event.target.value)} placeholder="nm" aria-label="Lambda max" /></td><td className="px-3 py-2"><Input value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Add remarks" aria-label="Remarks" /></td></tr></tbody></table></div></CardContent></Card>;
  const calculationSection = <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Automatic Calculations</CardTitle><CardDescription>Beer-Lambert law working from the selected wavelength.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-7 sm:text-sm">A = {validReading ? absorbance.toFixed(3) : "--.---"}<br />T = 10^(-A) x 100 = {validReading ? transmittance.toFixed(2) : "--.--"}%<br />A = epsilon l c<br />c = A / (epsilon l) = {validReading ? `${concentration.toFixed(2)} concentration units` : "--.--"}</div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Absorbance</p><p className="mt-1 text-lg font-semibold">{validReading ? absorbance.toFixed(3) : "--.---"} AU</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Transmittance</p><p className="mt-1 text-lg font-semibold">{validReading ? `${transmittance.toFixed(2)}%` : "--.--"}</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Concentration</p><p className="mt-1 text-lg font-semibold">{validReading ? concentration.toFixed(2) : "--.--"}</p></div></div></CardContent></Card><DashboardChart title="Absorbance Spectrum" description="Predefined spectrum dataset with the measured wavelength included in the scan." data={spectrum} dataKey="absorbance" xKey="wavelength" variant="line" color="#8b5cf6" /></div>;
  const resultSection = <Card className={scanned && validReading ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold">{scanned && validReading ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Calculator className="h-5 w-5 text-primary" />}Result</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{scanned && validReading ? `The unknown sample shows a maximum absorbance of ${maximum.absorbance.toFixed(3)} AU at lambda max ${maximum.wavelength} nm. At ${selectedWavelength} nm, the absorbance is ${absorbance.toFixed(3)} AU and the calculated concentration is ${concentration.toFixed(2)} concentration units.` : "Complete the blank calibration and scan to generate the UV-Visible result."}</p></CardContent></Card>;

  return <ExperimentEngine config={uvVisibleConfig} interactiveSection={<UvVisibleSimulation onScan={recordScan} />} observationSection={observationSection} calculationSection={calculationSection} resultSection={resultSection} />;
}
