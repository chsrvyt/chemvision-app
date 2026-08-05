import { Beaker, Droplets, FlaskConical, Pipette, Ruler, TestTube } from "lucide-react";
import type { LaboratoryInstrument, LaboratorySessionConfig } from "./laboratory-types";

export const laboratoryInstruments: LaboratoryInstrument[] = [
  { id: "beaker", name: "Beaker", category: "Glassware", description: "General-purpose vessel for holding and mixing materials.", icon: Beaker },
  { id: "conical-flask", name: "Conical Flask", category: "Glassware", description: "Stable vessel for controlled mixing and observation.", icon: FlaskConical },
  { id: "volumetric-flask", name: "Volumetric Flask", category: "Glassware", description: "Precision vessel for configured volume workflows.", icon: FlaskConical },
  { id: "test-tube", name: "Test Tube", category: "Glassware", description: "Small vessel for sample handling and viewing.", icon: TestTube },
  { id: "pipette", name: "Pipette", category: "Tools", description: "Transfer tool for measured liquid handling.", icon: Pipette },
  { id: "burette", name: "Burette", category: "Tools", description: "Graduated delivery instrument for controlled dispensing.", icon: Ruler },
  { id: "measuring-cylinder", name: "Measuring Cylinder", category: "Glassware", description: "Graduated vessel for approximate volume measurement.", icon: Ruler },
  { id: "funnel", name: "Funnel", category: "Tools", description: "Guides materials into a receiving vessel.", icon: FlaskConical },
  { id: "dropper", name: "Dropper", category: "Tools", description: "Transfers small quantities in drops.", icon: Droplets },
  { id: "stirrer", name: "Stirrer", category: "Tools", description: "Mixing tool placeholder for the workbench.", icon: Ruler },
  { id: "burner", name: "Burner", category: "Equipment", description: "Configured heat source placeholder.", icon: FlaskConical },
  { id: "tripod-stand", name: "Tripod Stand", category: "Equipment", description: "Support stand for configured glassware.", icon: Ruler },
  { id: "thermometer", name: "Thermometer", category: "Meters", description: "Temperature measurement instrument placeholder.", icon: Ruler },
  { id: "ph-meter", name: "pH Meter", category: "Meters", description: "Digital measurement instrument placeholder.", icon: Ruler },
  { id: "conductivity-meter", name: "Conductivity Meter", category: "Meters", description: "Conductivity measurement instrument placeholder.", icon: Ruler },
  { id: "colorimeter", name: "Colorimeter", category: "Meters", description: "Optical measurement instrument placeholder.", icon: Ruler },
  { id: "spectrophotometer", name: "Spectrophotometer", category: "Meters", description: "Spectral measurement instrument placeholder.", icon: Ruler },
  { id: "stopwatch", name: "Stopwatch", category: "Equipment", description: "Timing tool placeholder for the workbench.", icon: Ruler },
];

export const defaultLaboratorySession: LaboratorySessionConfig = {
  title: "Virtual Chemistry Laboratory",
  subject: "Laboratory Workspace",
  sessionLabel: "Framework Preview",
  instructions: ["Review the configured instruction sequence before arranging equipment.", "Select reusable instruments from the shelf and place them on the workbench.", "Record observations in the shared table when the session is ready.", "Review the configured calculation and result areas before completion."],
  chemicals: ["Configured sample", "Reference solution", "Optional indicator"],
  teacherNote: "This workspace is intentionally experiment-agnostic. Experiment configuration, simulation adapters, and calculation rules can be connected in a later sprint.",
  progress: 32,
  observation: { columns: [{ key: "item", label: "Item", placeholder: "Observation" }, { key: "value", label: "Value", placeholder: "Enter value" }, { key: "note", label: "Note", placeholder: "Add note" }], rows: 3 },
};
