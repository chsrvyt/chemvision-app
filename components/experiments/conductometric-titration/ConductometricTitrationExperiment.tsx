"use client";

import { Calculator, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { ExperimentEngine } from "../ExperimentEngine";
import { ConductometricTitrationSimulation, type ConductivityPoint } from "./ConductometricTitrationSimulation";
import { conductometricTitrationConfig } from "./conductometric-titration-config";

type Observation = { trial: string; volume: string; conductivity: string; endpoint: string; remarks: string };
const startingObservations: Observation[] = [
  { trial: "1", volume: "10.0", conductivity: "4.00", endpoint: "10.0", remarks: "Intersection" },
  { trial: "2", volume: "10.0", conductivity: "4.00", endpoint: "10.0", remarks: "Concordant" },
  { trial: "3", volume: "10.0", conductivity: "4.00", endpoint: "10.0", remarks: "Concordant" },
];
const acidVolume = 25;
const baseNormality = 0.1;

export default function ConductometricTitrationExperiment() {
  const [observations, setObservations] = useState(startingObservations);
  const [points, setPoints] = useState<ConductivityPoint[]>([{ volume: 0, conductivity: 12 }]);
  const [endpointVolume, setEndpointVolume] = useState<number | null>(null);
  const averageEndpoint = endpointVolume ?? Number((observations.map((item) => Number(item.endpoint)).filter((value) => value > 0).reduce((sum, value, _, all) => sum + value / all.length, 0) || 0).toFixed(2));
  const normality = averageEndpoint ? (baseNormality * averageEndpoint) / acidVolume : 0;
  const concentration = normality;
  const graphData = points.length ? points : [{ volume: 0, conductivity: 12 }];

  const recordPoint = useCallback((point: ConductivityPoint) => setPoints((current) => [...current.filter((item) => item.volume !== point.volume), point]), []);
  const recordEndpoint = useCallback((volume: number) => {
    setEndpointVolume(volume);
    setObservations((current) => current.map((item, index) => index === 0 ? { ...item, endpoint: volume.toFixed(1), volume: volume.toFixed(1), conductivity: "4.00", remarks: "Virtual intersection endpoint" } : item));
  }, []);

  function updateObservation(index: number, key: keyof Observation, value: string) {
    setObservations((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  const observationSection = <Card><CardHeader><CardTitle>Editable Observation Table</CardTitle><CardDescription>Record conductivity after each selected volume and enter the intersection endpoint.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead><tr className="border-b"><th className="px-3 py-3 font-medium text-muted-foreground">Trial</th><th className="px-3 py-3 font-medium text-muted-foreground">Volume Added (mL)</th><th className="px-3 py-3 font-medium text-muted-foreground">Conductivity</th><th className="px-3 py-3 font-medium text-muted-foreground">Endpoint (mL)</th><th className="px-3 py-3 font-medium text-muted-foreground">Remarks</th></tr></thead><tbody>{observations.map((item, index) => <tr key={item.trial} className="border-b last:border-0"><td className="px-3 py-2 font-medium">{item.trial}</td><td className="px-3 py-2"><Input type="number" step="0.5" value={item.volume} onChange={(event) => updateObservation(index, "volume", event.target.value)} aria-label={`Trial ${item.trial} volume added`} /></td><td className="px-3 py-2"><Input type="number" step="0.01" value={item.conductivity} onChange={(event) => updateObservation(index, "conductivity", event.target.value)} aria-label={`Trial ${item.trial} conductivity`} /></td><td className="px-3 py-2"><Input type="number" step="0.1" value={item.endpoint} onChange={(event) => updateObservation(index, "endpoint", event.target.value)} aria-label={`Trial ${item.trial} endpoint`} /></td><td className="px-3 py-2"><Input value={item.remarks} onChange={(event) => updateObservation(index, "remarks", event.target.value)} aria-label={`Trial ${item.trial} remarks`} /></td></tr>)}</tbody></table></div></CardContent></Card>;
  const calculationSection = <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Automatic Calculation</CardTitle><CardDescription>Normality from the conductivity intersection endpoint.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-7 sm:text-sm">Endpoint = {averageEndpoint ? `${averageEndpoint.toFixed(2)} mL` : "--.-- mL"}<br />N_acid x {acidVolume} = {baseNormality.toFixed(2)} x {averageEndpoint.toFixed(2)}<br />N_acid = ({baseNormality.toFixed(2)} x {averageEndpoint.toFixed(2)}) / {acidVolume}<br />N_acid = {normality.toFixed(4)} N</div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Endpoint</p><p className="mt-1 text-lg font-semibold">{averageEndpoint.toFixed(2)} mL</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Normality</p><p className="mt-1 text-lg font-semibold">{normality.toFixed(4)} N</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Concentration</p><p className="mt-1 text-lg font-semibold">{concentration.toFixed(4)}</p></div></div></CardContent></Card><DashboardChart title="Conductivity vs Volume" description="Live points reveal the intersection-based endpoint." data={graphData} dataKey="conductivity" xKey="volume" variant="line" color="#06b6d4" /></div>;
  const resultSection = <Card className={endpointVolume ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold">{endpointVolume ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Calculator className="h-5 w-5 text-primary" />}Result</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{endpointVolume ? `The conductometric endpoint is ${averageEndpoint.toFixed(2)} mL. The unknown acid has a normality of ${normality.toFixed(4)} N and a calculated concentration of ${concentration.toFixed(4)} equivalent units.` : "Complete the conductivity titration and identify the graph intersection to generate the result."}</p></CardContent></Card>;

  return <ExperimentEngine config={conductometricTitrationConfig} interactiveSection={<ConductometricTitrationSimulation onPoint={recordPoint} onEndpoint={recordEndpoint} />} observationSection={observationSection} calculationSection={calculationSection} resultSection={resultSection} />;
}
