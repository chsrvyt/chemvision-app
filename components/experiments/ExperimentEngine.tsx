"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, GraduationCap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { CalculationPanel, DetailListSection, GraphComponent, InteractiveDemonstration, MediaComponents, ObservationTable, PrincipleSection, ProcedureTimeline, SafetyPanel, SubmissionPanel, TheorySection, VivaQuestionCard } from "./ExperimentSections";
import type { ExperimentConfig } from "./experiment-types";
import { InstrumentShelf, Workbench } from "@/components/laboratory/LaboratoryComponents";
import { laboratoryInstruments } from "@/components/laboratory/default-session";
import type { LaboratoryInstrument } from "@/components/laboratory/laboratory-types";

export function ExperimentEngine({ config }: { config: ExperimentConfig }) {
  const [selectedInstruments, setSelectedInstruments] = useState<LaboratoryInstrument[]>([]);
  return <div className="space-y-6 p-4 sm:p-6 lg:p-8"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Link href="/student/subjects" className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="mr-2 h-4 w-4" />Back to subjects</Link><div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:flex-row lg:items-start lg:justify-between"><div><div className="mb-3 flex flex-wrap items-center gap-2"><Badge variant="outline">{config.subject}</Badge><Badge>{config.status}</Badge><span className="text-sm text-muted-foreground">Experiment {config.experimentNumber}</span></div><h1 className="text-3xl font-bold tracking-tight">{config.title}</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Aim: {config.aim}</p></div><div className="min-w-44 rounded-xl bg-muted/50 p-4"><div className="mb-2 flex items-center justify-between text-sm"><span className="text-muted-foreground">Completion</span><span className="font-semibold">{config.completionPercentage}%</span></div><div className="h-2 rounded-full bg-background"><div className="h-2 rounded-full bg-primary" style={{ width: `${config.completionPercentage}%` }} /></div><div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />Progress tracker</div></div></div></motion.div>

    <div className="grid gap-4 lg:grid-cols-2"><TheorySection section={config.theory} /><PrincipleSection section={config.principle} /></div>
    <div className="grid gap-4 lg:grid-cols-2"><DetailListSection title="Apparatus" items={config.apparatus} icon={BookOpen} /><DetailListSection title="Chemicals" items={config.chemicals} icon={GraduationCap} /></div>
    <SafetyPanel items={config.safetyPrecautions} />
    <ProcedureTimeline steps={config.procedure} />
    <InteractiveDemonstration demo={config.demonstration} />
    <div className="grid gap-4 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(20rem,1.2fr)]"><InstrumentShelf instruments={laboratoryInstruments} selectedId={selectedInstruments[selectedInstruments.length - 1]?.id ?? null} onSelect={(instrument) => setSelectedInstruments((current) => [...current, instrument])} /><Workbench selected={selectedInstruments} onClear={() => setSelectedInstruments([])} /></div>
    <ObservationTable observation={config.observation} />
    <div className="grid gap-4 lg:grid-cols-2"><CalculationPanel calculation={config.calculations} /><GraphComponent /></div>
    <Card><CardContent className="space-y-3 p-5"><h2 className="text-lg font-semibold">Result</h2><p className="text-sm leading-7 text-muted-foreground">{config.result}</p></CardContent></Card>
    <MediaComponents pdf={config.referencePdf} video={config.referenceVideo} />
    <VivaQuestionCard questions={config.vivaQuestions} />
    <Card><CardContent className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold"><CheckCircle2 className="h-5 w-5 text-primary" />Teacher Notes</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{config.teacherNotes ?? "Teacher notes will appear here after evaluation."}</p></CardContent></Card>
    <SubmissionPanel status={config.status} />
  </div>;
}

export function EngineProgressChart({ data }: { data: Array<{ label: string; value: number }> }) { return <DashboardChart title="Experiment Progress" description="Progress points supplied by the experiment configuration." data={data} dataKey="value" xKey="label" variant="line" color="#14b8a6" />; }
