"use client";

import { useState } from "react";
import { CalculationPanel, ObservationTable } from "@/components/experiments/ExperimentSections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChemicalCard, EquipmentCard, InstructionCard, InstrumentShelf, LaboratoryHeader, ProgressTracker, SafetyCard, Workbench } from "./LaboratoryComponents";
import type { LaboratoryInstrument, LaboratorySessionConfig } from "./laboratory-types";

export function LaboratoryFramework({ config, instruments }: { config: LaboratorySessionConfig; instruments: LaboratoryInstrument[] }) {
  const [selected, setSelected] = useState<LaboratoryInstrument[]>([]);
  const activeInstrument = selected[selected.length - 1] ?? null;

  function selectInstrument(instrument: LaboratoryInstrument) {
    setSelected((current) => [...current, instrument]);
  }

  return <div className="space-y-6 p-4 sm:p-6 lg:p-8"><LaboratoryHeader title={config.title} subject={config.subject} sessionLabel={config.sessionLabel} /><div className="grid gap-4 xl:grid-cols-[minmax(15rem,0.8fr)_minmax(24rem,1.5fr)_minmax(18rem,0.95fr)]"><div className="space-y-4"><InstrumentShelf instruments={instruments} selectedId={activeInstrument?.id ?? null} onSelect={selectInstrument} /><EquipmentCard instrument={activeInstrument} /><ChemicalCard chemicals={config.chemicals} /></div><div className="space-y-4"><Workbench selected={selected} onClear={() => setSelected([])} /><ObservationTable observation={config.observation} /><CalculationPanel /></div><div className="space-y-4"><InstructionCard instructions={config.instructions} /><ProgressTracker progress={config.progress} /><SafetyCard /><Card><CardHeader><CardTitle>Instruction Note</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-muted-foreground">{config.teacherNote}</p></CardContent></Card></div></div></div>;
}
