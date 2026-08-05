import type { LucideIcon } from "lucide-react";

export type LaboratoryInstrument = {
  id: string;
  name: string;
  category: "Glassware" | "Tools" | "Meters" | "Equipment";
  description: string;
  icon: LucideIcon;
};

export type LaboratorySessionConfig = {
  title: string;
  subject: string;
  sessionLabel: string;
  instructions: string[];
  chemicals: string[];
  teacherNote: string;
  progress: number;
  observation: {
    columns: { key: string; label: string; placeholder?: string }[];
    rows: number;
  };
};
