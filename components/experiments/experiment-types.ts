export type ExperimentSection = {
  id: string;
  title: string;
  content?: string;
  items?: string[];
};

export type ObservationColumn = {
  key: string;
  label: string;
  placeholder?: string;
};

export type ExperimentConfig = {
  id: string;
  title: string;
  subject: string;
  experimentNumber: string;
  aim: string;
  theory: ExperimentSection;
  principle: ExperimentSection;
  apparatus: string[];
  chemicals: string[];
  safetyPrecautions: string[];
  procedure: string[];
  demonstration?: { title: string; description: string; steps: string[] };
  observation: { columns: ObservationColumn[]; rows: number };
  calculations?: { title: string; formula: string; description: string };
  result: string;
  vivaQuestions: string[];
  referencePdf?: { label: string; url?: string };
  referenceVideo?: { label: string; url?: string };
  teacherNotes?: string;
  status: "Not started" | "In progress" | "Submitted" | "Evaluated";
  completionPercentage: number;
};
