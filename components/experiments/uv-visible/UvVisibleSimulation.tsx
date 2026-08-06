"use client";

import { motion } from "framer-motion";
import {
  Beaker,
  CheckCircle2,
  CircleGauge,
  FlaskConical,
  Lightbulb,
  Power,
  RotateCcw,
  ScanLine,
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

export const spectrumDataset = [
  { wavelength: 200, absorbance: 0.18 },
  { wavelength: 250, absorbance: 0.28 },
  { wavelength: 300, absorbance: 0.42 },
  { wavelength: 350, absorbance: 0.57 },
  { wavelength: 400, absorbance: 0.74 },
  { wavelength: 450, absorbance: 0.91 },
  { wavelength: 500, absorbance: 0.68 },
  { wavelength: 550, absorbance: 0.47 },
  { wavelength: 600, absorbance: 0.3 },
  { wavelength: 650, absorbance: 0.2 },
  { wavelength: 700, absorbance: 0.14 },
];

const wavelengths = spectrumDataset.map((point) => point.wavelength);
const apparatus: LaboratoryInstrument[] = [
  {
    id: "uv-visible-spectrophotometer",
    name: "UV-Visible Spectrophotometer",
    category: "Equipment",
    description: "Scans sample absorbance across selected wavelengths.",
    icon: CircleGauge,
  },
  {
    id: "sample-holder",
    name: "Sample Holder",
    category: "Equipment",
    description: "Positions the cuvette in the optical path.",
    icon: Beaker,
  },
  {
    id: "quartz-cuvette",
    name: "Quartz Cuvette",
    category: "Glassware",
    description: "UV-compatible optical sample cell.",
    icon: FlaskConical,
  },
  {
    id: "detector",
    name: "Detector",
    category: "Meters",
    description: "Measures transmitted light intensity.",
    icon: ScanLine,
  },
];

type ScanStage = 1 | 2 | 3 | 4 | 5 | 6;

export function UvVisibleSimulation({
  onScan,
}: {
  onScan: (wavelength: number) => void;
}) {
  const [stage, setStage] = useState<ScanStage>(1);
  const [selectedWavelength, setSelectedWavelength] = useState(450);
  const [calibrating, setCalibrating] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [warning, setWarning] = useState("");
  const [selected, setSelected] = useState<LaboratoryInstrument[]>([]);

  useEffect(() => {
    if (!scanning) return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / 4200);
      setScanProgress(Math.round(progress * 100));
      if (progress >= 1) {
        window.clearInterval(timer);
        setScanning(false);
        setScanned(true);
        onScan(selectedWavelength);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [onScan, scanning, selectedWavelength]);

  const status = useMemo(
    () => (scanned ? "Spectrum generated" : `Step ${stage} of 6`),
    [scanned, stage],
  );
  const detectorActive = scanning || scanned;
  const visibleSpectrum =
    scanning || scanned
      ? spectrumDataset.slice(
          0,
          Math.max(
            1,
            Math.ceil(((scanProgress || 100) / 100) * spectrumDataset.length),
          ),
        )
      : [{ wavelength: 200, absorbance: 0 }];

  function attemptStep(target: ScanStage) {
    setWarning("");
    if (target !== stage) {
      if (target === 3 && stage < 3)
        setWarning("Please insert the blank sample before calibrating.");
      else if (target === 6 && stage < 5)
        setWarning(
          "Please insert the unknown sample and select a wavelength before scanning.",
        );
      else
        setWarning(`Complete step ${stage} before moving to step ${target}.`);
      return;
    }
    if (target === 3) {
      setCalibrating(true);
      window.setTimeout(() => {
        setCalibrating(false);
        setStage(4);
      }, 1600);
      return;
    }
    if (target === 6) {
      if (!selectedWavelength) {
        setWarning("Please select a wavelength before starting the scan.");
        return;
      }
      if (!scanned) setScanning(true);
      return;
    }
    setStage((target + 1) as ScanStage);
  }

  function reset() {
    setStage(1);
    setSelectedWavelength(450);
    setCalibrating(false);
    setScanning(false);
    setScanProgress(0);
    setScanned(false);
    setWarning("");
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ScanLine className="h-5 w-5 text-primary" />
              Interactive UV-Visible Scan
            </CardTitle>
            <CardDescription>
              Calibrate with the blank, prepare the unknown, choose a
              wavelength, and run the scan.
            </CardDescription>
          </div>
          <Badge variant={scanned ? "default" : "outline"}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {[
            "Switch ON",
            "Insert blank",
            "Calibrate",
            "Remove blank",
            "Insert unknown",
            "Select wavelength / Scan",
          ].map((label, index) => {
            const step = (index + 1) as ScanStage;
            const complete = stage > step || (step === 6 && scanned);
            const active = stage === step && !scanned;
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
          <div className="relative flex min-h-[23rem] items-center justify-center overflow-hidden rounded-xl border bg-indigo-500/5 p-6">
            <div className="absolute left-4 top-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Detector: {detectorActive ? "active" : "standby"}
            </div>
            <div className="relative w-64 rounded-2xl border-2 border-slate-400 bg-slate-200/70 p-4 shadow-lg dark:bg-slate-800/70">
              <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>UV-Vis instrument</span>
                <Power
                  className={`h-4 w-4 ${stage > 1 ? "text-emerald-500" : "text-muted-foreground"}`}
                />
              </div>
              <div className="relative h-24 overflow-hidden rounded-lg border bg-slate-950">
                <motion.div
                  animate={{
                    x: scanning ? [0, 190, 0] : 0,
                    opacity: detectorActive ? 1 : 0.35,
                  }}
                  transition={{
                    repeat: scanning ? Infinity : 0,
                    duration: 1.1,
                    ease: "linear",
                  }}
                  className="absolute left-3 top-1/2 h-1 w-20 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(103,232,249,0.55)]"
                />
                <motion.div
                  animate={{ opacity: detectorActive ? [0.35, 1, 0.35] : 0.25 }}
                  transition={{
                    repeat: detectorActive ? Infinity : 0,
                    duration: 1.4,
                  }}
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_16px_5px_rgba(52,211,153,0.5)]"
                />
              </div>
              <div className="mt-3 rounded-lg border bg-slate-950 p-3 text-center font-mono text-2xl tracking-widest text-emerald-400">
                {scanned
                  ? `A ${spectrumDataset.find((point) => point.wavelength === selectedWavelength)?.absorbance.toFixed(3)}`
                  : "A --.---"}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {stage >= 5
                    ? "Unknown sample"
                    : stage >= 2
                      ? "Blank sample"
                      : "No sample"}
                </span>
                <span>{selectedWavelength} nm</span>
              </div>
            </div>
            <motion.div
              animate={{ y: stage >= 5 ? 50 : -28 }}
              transition={{ duration: 0.7 }}
              className="absolute bottom-8 h-16 w-10 rounded-b-lg border-2 border-slate-400 bg-violet-300/25"
            />
            <div className="absolute bottom-4 text-xs text-muted-foreground">
              Sample chamber:{" "}
              {stage >= 5
                ? "unknown inserted"
                : stage >= 2
                  ? "blank inserted"
                  : "empty"}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Scan controls</p>
                  <p className="text-xs text-muted-foreground">
                    {calibrating
                      ? "Calibrating against blank..."
                      : scanning
                        ? "Monochromator scanning spectrum..."
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
                  Switch ON Instrument <Power className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 2 && (
                <Button className="w-full" onClick={() => attemptStep(2)}>
                  Insert Blank Sample <Beaker className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 3 && (
                <Button
                  className="w-full"
                  disabled={calibrating}
                  onClick={() => attemptStep(3)}
                >
                  {calibrating ? "Calibrating..." : "Press Calibrate"}
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 4 && (
                <Button className="w-full" onClick={() => attemptStep(4)}>
                  Remove Blank <RotateCcw className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 5 && (
                <Button className="w-full" onClick={() => attemptStep(5)}>
                  Insert Unknown Sample <Beaker className="ml-2 h-4 w-4" />
                </Button>
              )}
              {stage === 6 && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Select a wavelength for the quantitative reading.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {wavelengths.map((wavelength) => (
                      <Button
                        key={wavelength}
                        variant={
                          selectedWavelength === wavelength
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedWavelength(wavelength)}
                      >
                        {wavelength} nm
                      </Button>
                    ))}
                  </div>
                  <Button
                    className="w-full"
                    disabled={scanning || scanned}
                    onClick={() => attemptStep(6)}
                  >
                    Start Scan <ScanLine className="ml-2 h-4 w-4" />
                  </Button>
                  {scanning && (
                    <div>
                      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                        <span>Scanning spectrum</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <motion.div
                          animate={{ width: `${scanProgress}%` }}
                          className="h-2 rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  )}
                  {scanned && (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="mx-auto mb-1 h-5 w-5" />
                      Scan complete. Spectrum data is ready for analysis.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="rounded-xl border p-4">
              <p className="mb-2 text-sm font-medium">Instrument note</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {stage < 3
                  ? "The blank establishes the reference intensity before the unknown is introduced."
                  : stage < 6
                    ? "Maintain the same cuvette orientation and keep the optical path clean."
                    : "The scan uses a predefined absorbance spectrum. Compare the selected reading with lambda max."}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DashboardChart title="Live Spectrum Generation" description="The predefined absorbance spectrum is revealed as the scan progresses." data={visibleSpectrum} dataKey="absorbance" xKey="wavelength" variant="line" color="#8b5cf6" />
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
