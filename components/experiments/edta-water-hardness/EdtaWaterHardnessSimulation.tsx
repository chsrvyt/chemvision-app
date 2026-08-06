"use client";

import { motion } from "framer-motion";
import {
  Beaker,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Gauge,
  Pipette,
  RotateCcw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardChart } from "@/components/shared/DashboardChart";
import {
  InstrumentShelf,
  Workbench,
} from "@/components/laboratory/LaboratoryComponents";
import type { LaboratoryInstrument } from "@/components/laboratory/laboratory-types";

const steps = [
  "Read instructions",
  "Pipette sample",
  "Add buffer",
  "Add indicator",
  "Fill EDTA",
  "Start titration",
  "Endpoint",
];
const apparatus: LaboratoryInstrument[] = [
  {
    id: "burette",
    name: "Burette",
    category: "Tools",
    description: "Delivers standard EDTA solution in controlled drops.",
    icon: Gauge,
  },
  {
    id: "conical-flask",
    name: "Conical Flask",
    category: "Glassware",
    description: "Holds the buffered hard water sample.",
    icon: FlaskConical,
  },
  {
    id: "pipette",
    name: "Pipette",
    category: "Tools",
    description: "Transfers the measured water sample.",
    icon: Pipette,
  },
  {
    id: "measuring-cylinder",
    name: "Measuring Cylinder",
    category: "Glassware",
    description: "Measures buffer and sample volumes.",
    icon: Beaker,
  },
];

type TitrationStage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function EdtaWaterHardnessSimulation({
  onEndpoint,
}: {
  onEndpoint: (volume: number) => void;
}) {
  const [stage, setStage] = useState<TitrationStage>(1);
  const [dispensed, setDispensed] = useState(0);
  const [titrating, setTitrating] = useState(false);
  const [warning, setWarning] = useState("");
  const [selected, setSelected] = useState<LaboratoryInstrument[]>([]);
  const endpoint = 12.6;
  const nearEndpoint = dispensed >= 11.6;
  const atEndpoint = dispensed >= endpoint;
  const solutionColor = atEndpoint
    ? "#7dd3fc"
    : nearEndpoint
      ? "#c084fc"
      : stage >= 4
        ? "#991b1b"
        : "#e5e7eb";
  const liquidLevel = Math.max(10, 88 - dispensed * 5.5);
  const liveData = [
    { volume: 0, hardness: 0 },
    { volume: 4, hardness: 80 },
    { volume: 8, hardness: 160 },
    { volume: 10, hardness: 200 },
    { volume: 12.6, hardness: 252.23 },
  ].filter((point) => point.volume <= dispensed || point.volume === 0);
  if (dispensed > 0)
    liveData.push({
      volume: Number(dispensed.toFixed(1)),
      hardness: Number((dispensed * 20.02).toFixed(2)),
    });

  function attemptStep(target: TitrationStage) {
    setWarning("");
    if (target !== stage) {
      if (target === 3 && stage < 3)
        setWarning("Please add buffer solution first.");
      else if (target === 6 && stage < 5)
        setWarning("Please fill the burette with EDTA before titration.");
      else if (target === 7 && !atEndpoint)
        setWarning(
          "Continue titrating until the solution reaches the sky-blue endpoint.",
        );
      else
        setWarning(`Complete step ${stage} before moving to step ${target}.`);
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
    setStage((target + 1) as TitrationStage);
  }

  function releaseEdta() {
    if (!titrating || atEndpoint) return;
    const next = Math.min(endpoint, Number((dispensed + 0.2).toFixed(1)));
    setDispensed(next);
    if (next >= endpoint) {
      setStage(7);
      setTitrating(false);
      onEndpoint(endpoint);
    }
  }

  function reset() {
    setStage(1);
    setDispensed(0);
    setTitrating(false);
    setWarning("");
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Interactive EDTA Titration
            </CardTitle>
            <CardDescription>
              Prepare the hard water sample in order, then control the EDTA
              burette valve near the endpoint.
            </CardDescription>
          </div>
          <Badge variant={atEndpoint ? "default" : "outline"}>
            {atEndpoint ? "Sky-blue endpoint" : `Step ${stage} of 7`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
          {steps.map((label, index) => {
            const step = (index + 1) as TitrationStage;
            const complete = stage > step;
            const active = stage === step;
            return (
              <button
                key={label}
                type="button"
                onClick={() => attemptStep(step)}
                className={`rounded-lg border p-2 text-center text-[11px] transition-colors ${complete || active ? "border-primary/40 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`}
              >
                <span className="block font-semibold">
                  {complete ? "✓" : step}
                </span>
                {label}
              </button>
            );
          })}
        </div>
        {warning && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300"
          >
            <TriangleAlert className="h-4 w-4 shrink-0" />
            {warning}
          </motion.div>
        )}
        <div className="grid gap-4 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(20rem,1.15fr)]">
          <div className="space-y-4">
            <div className="relative flex min-h-64 items-center justify-center rounded-xl border bg-sky-500/5 p-6">
              <div className="relative h-52 w-20 rounded-b-2xl border-2 border-slate-400 bg-background/70">
                <motion.div
                  animate={{ height: `${liquidLevel}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute bottom-0 left-1 right-1 rounded-b-xl bg-blue-400/60"
                />
                <div className="absolute -left-2 -right-2 top-0 h-3 rounded-full border-2 border-slate-400 bg-background" />
                <div className="absolute -right-12 top-8 text-xs text-muted-foreground">
                  EDTA
                </div>
              </div>
              <div className="absolute bottom-4 text-xs text-muted-foreground">
                Burette: {(25 - dispensed).toFixed(1)} mL remaining
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Conical flask</p>
                  <p className="text-xs text-muted-foreground">
                    Hard water + buffer + EBT indicator
                  </p>
                </div>
                <motion.div
                  animate={{ backgroundColor: solutionColor }}
                  transition={{ duration: 0.5 }}
                  className="flex h-20 w-24 items-end justify-center rounded-b-[2.5rem] border-2 border-slate-400 p-2"
                >
                  <div className="h-8 w-14 rounded-b-full bg-white/30" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {atEndpoint ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Permanent sky-blue endpoint
                  </>
                ) : nearEndpoint ? (
                  <>
                    <TriangleAlert className="h-4 w-4 text-amber-500" />
                    Approach endpoint dropwise
                  </>
                ) : stage >= 4 ? (
                  <>
                    <Sparkles className="h-4 w-4 text-rose-500" />
                    Wine-red metal-indicator complex
                  </>
                ) : (
                  <>
                    <Beaker className="h-4 w-4 text-sky-500" />
                    Sample preparation in progress
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Titration controls</p>
                  <p className="text-xs text-muted-foreground">
                    {atEndpoint
                      ? "Endpoint captured. Record the titre."
                      : titrating
                        ? "Valve open: add EDTA dropwise while swirling."
                        : "Complete the highlighted step."}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={reset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
              {stage === 1 && (
                <Button className="w-full" onClick={() => attemptStep(1)}>
                  Read Instructions <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 2 && (
                <Button className="w-full" onClick={() => attemptStep(2)}>
                  Pipette Hard Water Sample <Pipette className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 3 && (
                <Button className="w-full" onClick={() => attemptStep(3)}>
                  Add Buffer Solution <Beaker className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 4 && (
                <Button className="w-full" onClick={() => attemptStep(4)}>
                  Add EBT Indicator <Droplets className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 5 && (
                <Button className="w-full" onClick={() => attemptStep(5)}>
                  Fill Burette with EDTA <Gauge className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 6 && (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => attemptStep(6)}
                    disabled={titrating}
                  >
                    Start Titration <Droplets className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={releaseEdta}
                    disabled={!titrating || atEndpoint}
                  >
                    Open Burette Valve +0.2 mL
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    EDTA delivered: {dispensed.toFixed(1)} mL | Endpoint:{" "}
                    {endpoint.toFixed(1)} mL
                  </p>
                </div>
              )}
              {stage === 7 && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="mx-auto mb-1 h-5 w-5" />
                  Success: wine red changed to sky blue at {endpoint.toFixed(
                    1,
                  )}{" "}
                  mL EDTA.
                </div>
              )}
            </div>
            <div className="rounded-xl border p-4">
              <p className="mb-2 text-sm font-medium">Current instruction</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {stage < 3
                  ? "Transfer exactly 50 mL of hard water into the flask."
                  : stage < 5
                    ? "Maintain pH 10 and observe the wine-red indicator complex."
                    : stage < 7
                      ? "Add EDTA gradually and swirl continuously near the endpoint."
                      : "Use the endpoint volume in the hardness calculation."}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DashboardChart title="Live EDTA Titration Curve" description="The hardness response updates with each EDTA valve release." data={liveData.length ? liveData : [{ volume: 0, hardness: 0 }]} dataKey="hardness" xKey="volume" variant="line" color="#06b6d4" />
          <p className="mb-3 text-sm font-semibold">Virtual Apparatus</p>
          <div className="grid gap-4 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(18rem,1.2fr)]">
            <InstrumentShelf
              instruments={apparatus}
              selectedId={selected[selected.length - 1]?.id ?? null}
              onSelect={(instrument) =>
                setSelected((current) => [...current, instrument])
              }
            />
            <Workbench selected={selected} onClear={() => setSelected([])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
