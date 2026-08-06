"use client";

import { motion } from "framer-motion";
import {
  Beaker,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Pipette,
  Ruler,
  TestTube,
  TimerReset,
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

const apparatus: LaboratoryInstrument[] = [
  {
    id: "burette",
    name: "Burette",
    category: "Tools",
    description: "Graduated delivery tube for standard NaOH.",
    icon: Ruler,
  },
  {
    id: "pipette",
    name: "Pipette",
    category: "Tools",
    description: "Transfers the measured HCl sample.",
    icon: Pipette,
  },
  {
    id: "conical-flask",
    name: "Conical Flask",
    category: "Glassware",
    description: "Reaction vessel for the acid sample.",
    icon: FlaskConical,
  },
  {
    id: "indicator-bottle",
    name: "Indicator Bottle",
    category: "Tools",
    description: "Contains phenolphthalein indicator.",
    icon: TestTube,
  },
  {
    id: "wash-bottle",
    name: "Wash Bottle",
    category: "Tools",
    description: "Rinses the flask and work area.",
    icon: Droplets,
  },
  {
    id: "white-tile",
    name: "White Tile",
    category: "Equipment",
    description: "Improves endpoint colour visibility.",
    icon: Beaker,
  },
];

type TitrationStage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function AcidBaseTitrationSimulation({
  onEndpoint,
}: {
  onEndpoint: (volume: number) => void;
}) {
  const [stage, setStage] = useState<TitrationStage>(1);
  const [selected, setSelected] = useState<LaboratoryInstrument[]>([]);
  const [dispensed, setDispensed] = useState(0);
  const [titrating, setTitrating] = useState(false);
  const endpointVolume = 24.6;
  const nearEndpoint = dispensed >= 23;
  const atEndpoint = dispensed >= endpointVolume;
  const solutionColour = atEndpoint
    ? "#f9a8d4"
    : nearEndpoint
      ? "#fbcfe8"
      : "#f8fafc";
  const liquidLevel = Math.max(8, 86 - dispensed * 3.1);
  const liveCurve = [
    { volume: 0, response: 2 },
    { volume: 6, response: 2.4 },
    { volume: 12, response: 3.1 },
    { volume: 18, response: 4.2 },
    { volume: 23, response: 6.8 },
    { volume: 24.6, response: 8.4 },
    { volume: 28, response: 11.2 },
  ];
  const liveData = [
    ...liveCurve.filter((point) => point.volume <= dispensed),
    ...(dispensed > 0
      ? [
          {
            volume: Number(dispensed.toFixed(1)),
            response: Number((2 + dispensed * 0.26).toFixed(2)),
          },
        ]
      : []),
  ];

  function advanceSetup(nextStage: TitrationStage) {
    setStage(nextStage);
    if (nextStage !== 5) setTitrating(false);
  }

  function releaseNaOH() {
    if (!titrating || atEndpoint) return;
    const nextVolume = Math.min(
      endpointVolume,
      Number((dispensed + 0.5).toFixed(1)),
    );
    setDispensed(nextVolume);
    if (nextVolume >= endpointVolume) {
      setStage(7);
      setTitrating(false);
      onEndpoint(nextVolume);
    } else if (nextVolume >= 23) {
      setStage(6);
    }
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-primary" />
              Interactive Acid-Base Titration
            </CardTitle>
            <CardDescription>
              Follow the preparation sequence, then control the burette valve to
              find the endpoint.
            </CardDescription>
          </div>
          <Badge variant={atEndpoint ? "default" : "outline"}>
            {atEndpoint ? "Endpoint reached" : `Step ${stage} of 7`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-2 md:grid-cols-7">
          {[
            "Read Instructions",
            "Fill Burette",
            "Pipette HCl",
            "Add Indicator",
            "Start Titration",
            "Near Endpoint",
            "End Point",
          ].map((label, index) => (
            <div
              key={label}
              className={`rounded-lg border p-2 text-center text-[11px] ${stage >= index + 1 ? "border-primary/40 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`}
            >
              <span className="block font-semibold">{index + 1}</span>
              {label}
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(20rem,1.2fr)]">
          <div className="space-y-4">
            <div className="relative flex min-h-64 items-center justify-center rounded-xl border bg-sky-500/5 p-6">
              <div className="relative h-52 w-20 rounded-b-2xl border-2 border-slate-400 bg-background/70">
                <motion.div
                  animate={{ height: `${liquidLevel}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute bottom-0 left-1 right-1 rounded-b-xl bg-blue-400/60"
                />
                <div className="absolute -left-2 -right-2 top-0 h-3 rounded-full border-2 border-slate-400 bg-background" />
                <div className="absolute -right-11 top-8 text-xs text-muted-foreground">
                  NaOH
                </div>
              </div>
              <div className="absolute bottom-4 text-xs text-muted-foreground">
                Burette level: {(50 - dispensed).toFixed(1)} mL
              </div>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Reaction flask</p>
                  <p className="text-xs text-muted-foreground">
                    HCl + phenolphthalein
                  </p>
                </div>
                <motion.div
                  animate={{ backgroundColor: solutionColour }}
                  transition={{ duration: 0.5 }}
                  className="flex h-16 w-20 items-end justify-center rounded-b-[2rem] border-2 border-slate-400 p-2"
                >
                  <div className="h-7 w-12 rounded-b-full bg-white/70" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {atEndpoint ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Permanent pale pink endpoint
                  </>
                ) : nearEndpoint ? (
                  <>
                    <TriangleAlert className="h-4 w-4 text-amber-500" />
                    Light pink: approach slowly
                  </>
                ) : (
                  <>
                    <Droplets className="h-4 w-4 text-sky-500" />
                    Colourless solution
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle className="text-base">Simulation Controls</CardTitle>
                <CardDescription>
                  {atEndpoint
                    ? "The endpoint has been captured."
                    : "Use the configured sequence to prepare the titration."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {stage === 1 && (
                  <Button className="w-full" onClick={() => advanceSetup(2)}>
                    Read Instructions <TimerReset className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {stage === 2 && (
                  <Button className="w-full" onClick={() => advanceSetup(3)}>
                    Fill Burette with NaOH <Ruler className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {stage === 3 && (
                  <Button className="w-full" onClick={() => advanceSetup(4)}>
                    Pipette HCl into Flask <Pipette className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {stage === 4 && (
                  <Button className="w-full" onClick={() => advanceSetup(5)}>
                    Add Phenolphthalein <TestTube className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {stage >= 5 && !atEndpoint && (
                  <>
                    <Button
                      className="w-full"
                      onClick={() => setTitrating(true)}
                      disabled={titrating}
                    >
                      {titrating
                        ? "Valve open: release NaOH"
                        : "Start Titration"}
                      <Droplets className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={releaseNaOH}
                      disabled={!titrating}
                    >
                      Open Burette Valve +0.5 mL
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Dispensed: {dispensed.toFixed(1)} mL · Target:{" "}
                      {endpointVolume.toFixed(1)} mL
                    </p>
                  </>
                )}
                {atEndpoint && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-700 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="mx-auto mb-1 h-5 w-5" />
                    Success: permanent pale pink endpoint recorded.
                  </motion.div>
                )}
              </CardContent>
            </Card>
            <div className="rounded-xl border p-4">
              <p className="mb-3 text-sm font-medium">Current action</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {stage === 1
                  ? "Read the configured theory and safety instructions before setting up."
                  : stage === 2
                    ? "The burette is ready to be filled with standard sodium hydroxide."
                    : stage === 3
                      ? "Transfer the measured hydrochloric acid sample into the flask."
                      : stage === 4
                        ? "Add two to three drops of phenolphthalein indicator."
                        : stage === 5
                          ? "Open the valve gradually while swirling the flask."
                          : stage === 6
                            ? "The solution is light pink. Release small volumes and approach carefully."
                            : "The pale pink colour persists. Record the titre and continue to observations."}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DashboardChart title="Live Titration Response" description="The response curve updates as titrant is released toward the endpoint." data={liveData.length ? liveData : [{ volume: 0, response: 2 }]} dataKey="response" xKey="volume" variant="line" color="#14b8a6" />
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
