"use client";

import { motion } from "framer-motion";
import {
  Beaker,
  CheckCircle2,
  CircleGauge,
  Filter,
  FlaskConical,
  Power,
  RotateCcw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

type ColorimeterStage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const steps = [
  "Switch ON",
  "Select filter",
  "Insert blank",
  "Press Zero",
  "Remove blank",
  "Insert unknown",
  "Press Measure",
];
const apparatus: LaboratoryInstrument[] = [
  {
    id: "digital-colorimeter",
    name: "Digital Colorimeter",
    category: "Meters",
    description: "Measures transmitted light and absorbance.",
    icon: CircleGauge,
  },
  {
    id: "cuvette",
    name: "Cuvette",
    category: "Glassware",
    description: "Optical cell for blank and sample solutions.",
    icon: FlaskConical,
  },
  {
    id: "blank-solution",
    name: "Blank Solution",
    category: "Tools",
    description: "Reference solution used to zero the instrument.",
    icon: Beaker,
  },
  {
    id: "standard-solution",
    name: "Standard Solution",
    category: "Tools",
    description: "Known concentration for calibration reference.",
    icon: Beaker,
  },
  {
    id: "unknown-solution",
    name: "Unknown Solution",
    category: "Tools",
    description: "Colored sample whose concentration is measured.",
    icon: Beaker,
  },
];

export function ColorimeterSimulation({
  onMeasure,
}: {
  onMeasure: (absorbance: number) => void;
}) {
  const [stage, setStage] = useState<ColorimeterStage>(1);
  const [filter, setFilter] = useState("540 nm");
  const [absorbance, setAbsorbance] = useState(0);
  const [progress, setProgress] = useState(0);
  const [calibrating, setCalibrating] = useState(false);
  const [measuring, setMeasuring] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [warning, setWarning] = useState("");
  const [selected, setSelected] = useState<LaboratoryInstrument[]>([]);

  useEffect(() => {
    if (!measuring) return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const nextProgress = Math.min(1, (Date.now() - started) / 3000);
      setProgress(Math.round(nextProgress * 100));
      setAbsorbance(Number((0.421 * nextProgress).toFixed(3)));
      if (nextProgress >= 1) {
        window.clearInterval(timer);
        setAbsorbance(0.421);
        setMeasured(true);
        setMeasuring(false);
        onMeasure(0.421);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [measuring, onMeasure]);

  const statusLabel = useMemo(
    () => (measured ? "Measurement complete" : `Step ${stage} of 7`),
    [measured, stage],
  );
  const liveData = [
    { progress: 0, absorbance: 0 },
    { progress: 25, absorbance: 0.18 },
    { progress: 50, absorbance: 0.31 },
    { progress: 75, absorbance: 0.39 },
    { progress: 100, absorbance: 0.421 },
  ].filter((point) =>
    measuring
      ? point.progress <= progress
      : measured
        ? true
        : point.progress === 0,
  );
  if (measuring && progress > 0) liveData.push({ progress, absorbance });

  function attemptStep(target: ColorimeterStage) {
    setWarning("");
    if (target !== stage) {
      if (target === 2 && stage < 2)
        setWarning("Switch on the colorimeter before selecting a filter.");
      else if (target === 4 && stage < 4)
        setWarning("Please insert the blank solution before pressing Zero.");
      else if (target === 7 && stage < 7)
        setWarning("Please calibrate using blank solution first.");
      else
        setWarning(`Complete step ${stage} before moving to step ${target}.`);
      return;
    }
    if (target === 2 && filter !== "540 nm") {
      setWarning("Please select the correct wavelength filter.");
      return;
    }
    if (target === 4) {
      setCalibrating(true);
      window.setTimeout(() => {
        setCalibrating(false);
        setStage(5);
      }, 1500);
      return;
    }
    if (target === 7) {
      if (filter !== "540 nm") {
        setWarning("Please select the correct wavelength filter.");
        return;
      }
      if (!measured) setMeasuring(true);
      return;
    }
    setStage((target + 1) as ColorimeterStage);
  }

  function reset() {
    setStage(1);
    setFilter("540 nm");
    setAbsorbance(0);
    setProgress(0);
    setCalibrating(false);
    setMeasuring(false);
    setMeasured(false);
    setWarning("");
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CircleGauge className="h-5 w-5 text-primary" />
              Interactive Colorimeter
            </CardTitle>
            <CardDescription>
              Calibrate with the blank solution, then measure the unknown
              without changing the optical filter.
            </CardDescription>
          </div>
          <Badge variant={measured ? "default" : "outline"}>
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
          {steps.map((label, index) => {
            const stepNumber = (index + 1) as ColorimeterStage;
            const complete =
              stage > stepNumber || (stepNumber === 7 && measured);
            const active = stage === stepNumber && !measured;
            return (
              <button
                key={label}
                type="button"
                onClick={() => attemptStep(stepNumber)}
                className={`rounded-lg border p-2 text-center text-[11px] transition-colors ${complete || active ? "border-primary/40 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`}
              >
                <span className="block font-semibold">
                  {complete ? "✓" : stepNumber}
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
        <div className="grid gap-4 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(20rem,1.2fr)]">
          <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-xl border bg-violet-500/5 p-6">
            <div className="absolute left-4 top-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-4 w-4 text-primary" />
              Optical path: {filter}
            </div>
            <div className="relative w-56 rounded-xl border-2 border-slate-400 bg-slate-200/60 p-4 shadow-lg dark:bg-slate-800/60">
              <div className="mb-3 h-3 rounded bg-slate-400/70" />
              <div className="rounded-lg border bg-slate-950 p-4 text-center text-3xl font-semibold tracking-widest text-emerald-400">
                {stage >= 6 ? absorbance.toFixed(3) : "-.---"}
                <span className="ml-1 text-xs tracking-normal text-emerald-400/70">
                  AU
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{stage >= 6 ? "Unknown cuvette" : "Blank / sample"}</span>
                <Power
                  className={`h-4 w-4 ${stage > 1 ? "text-emerald-500" : "text-muted-foreground"}`}
                />
              </div>
            </div>
            <motion.div
              animate={{
                opacity: stage >= 3 ? 1 : 0.35,
                scale: stage === 3 || stage === 6 ? [1, 1.03, 1] : 1,
              }}
              transition={{
                repeat: stage === 3 || stage === 6 ? Infinity : 0,
                duration: 1.2,
              }}
              className="absolute bottom-7 h-14 w-10 rounded-b-lg border-2 border-slate-400 bg-cyan-400/30"
            />
            <div className="absolute bottom-4 text-xs text-muted-foreground">
              Cuvette position:{" "}
              {stage === 3 || stage === 4
                ? "blank"
                : stage >= 6
                  ? "unknown"
                  : "removed"}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Simulation controls</p>
                  <p className="text-xs text-muted-foreground">
                    {calibrating
                      ? "Zeroing against the blank solution..."
                      : measuring
                        ? "Absorbance is stabilizing..."
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
                  Switch ON Colorimeter <Power className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 2 && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Select the filter that matches the colored solution&apos;s
                    absorption region.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {["420 nm", "540 nm", "620 nm"].map((value) => (
                      <Button
                        key={value}
                        variant={filter === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(value)}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full" onClick={() => attemptStep(2)}>
                    Confirm Filter <Filter className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
              {stage === 3 && (
                <Button className="w-full" onClick={() => attemptStep(3)}>
                  Insert Blank Solution <Beaker className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 4 && (
                <Button
                  className="w-full"
                  disabled={calibrating}
                  onClick={() => attemptStep(4)}
                >
                  {calibrating ? "Zeroing..." : "Press Zero"}
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 5 && (
                <Button className="w-full" onClick={() => attemptStep(5)}>
                  Remove Blank <RotateCcw className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 6 && (
                <Button className="w-full" onClick={() => attemptStep(6)}>
                  Insert Unknown Solution <Beaker className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 7 && (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    disabled={measuring || measured}
                    onClick={() => attemptStep(7)}
                  >
                    Press Measure <CircleGauge className="ml-2 h-4 w-4" />
                  </Button>
                  {measuring && (
                    <div>
                      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                        <span>Reading absorbance</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <motion.div
                          animate={{ width: `${progress}%` }}
                          className="h-2 rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  )}
                  {measured && (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="mx-auto mb-1 h-5 w-5" />
                      Success: absorbance recorded at 0.421 AU.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="rounded-xl border p-4">
              <p className="mb-2 text-sm font-medium">Instrument note</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {stage < 4
                  ? "Prepare the optical system and keep the cuvette faces clean."
                  : stage < 6
                    ? "The blank defines the zero absorbance reference."
                    : "Measure the unknown at the same selected wavelength used for calibration."}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DashboardChart title="Live Absorbance Stabilization" description="The absorbance trace updates while the colorimeter measures the unknown." data={liveData.length ? liveData : [{ progress: 0, absorbance: 0 }]} dataKey="absorbance" xKey="progress" variant="line" color="#8b5cf6" />
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
