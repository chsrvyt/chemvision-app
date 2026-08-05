import type { ExperimentConfig } from "../experiment-types";

export const phMeterConfig: ExperimentConfig = {
  id: "ph-meter",
  title: "pH Meter Measurement of a Sample Solution",
  subject: "Analytical Chemistry",
  experimentNumber: "02",
  aim: "Determine the pH of an unknown sample solution using a calibrated digital pH meter.",
  theory: {
    id: "theory",
    title: "Aim and Theory",
    content: "A pH meter measures the hydrogen ion activity of a solution through the potential difference developed across a glass electrode. The meter must be calibrated with standard buffer solutions before an unknown sample is measured.",
  },
  principle: {
    id: "principle",
    title: "Principle",
    content: "The glass electrode responds selectively to hydrogen ions. After calibration, the meter converts the electrode potential into a pH value on the 0 to 14 scale. Values below 7 are acidic, 7 are neutral, and values above 7 are basic.",
  },
  apparatus: ["Digital pH Meter", "Glass Electrode", "Beaker", "Distilled Water Bottle"],
  chemicals: ["Buffer Solution pH 4", "Buffer Solution pH 7", "Buffer Solution pH 9.2", "Sample Solution"],
  safetyPrecautions: [
    "Wear goggles and gloves while handling calibration buffers and unknown samples.",
    "Rinse the electrode with distilled water between solutions and blot it gently.",
    "Never wipe or scrape the sensitive glass bulb of the electrode.",
    "Keep the meter and its electrical connector dry.",
  ],
  procedure: [
    "Switch on the digital pH meter and confirm that the display is ready.",
    "Wash the electrode with distilled water and allow the rinse to drain.",
    "Calibrate the meter using a selected standard buffer solution.",
    "Dry the electrode gently by blotting without rubbing the glass bulb.",
    "Insert the electrode into the sample solution without touching the beaker.",
    "Wait for the digital reading to stabilize before recording it.",
    "Record the observed pH and classify the sample as acidic, neutral, or basic.",
  ],
  demonstration: {
    title: "pH Meter Demonstration",
    description: "Complete each laboratory action in order. The digital reading stabilizes only after the electrode is placed in the sample.",
    steps: ["Switch on", "Wash electrode", "Calibrate", "Dry electrode", "Insert in sample", "Stabilize reading", "Record reading"],
  },
  observation: {
    columns: [
      { key: "sample", label: "Sample Name", placeholder: "Enter sample" },
      { key: "ph", label: "Observed pH", placeholder: "e.g. 6.32" },
      { key: "remarks", label: "Remarks", placeholder: "Add remarks" },
    ],
    rows: 1,
  },
  calculations: {
    title: "pH Classification",
    formula: "pH < 7: acidic | pH = 7: neutral | pH > 7: basic",
    description: "The sample classification is generated automatically from the recorded pH reading.",
  },
  result: "Record a stabilized pH reading to generate the final classification.",
  vivaQuestions: [
    "Why must the pH meter be calibrated before measuring an unknown solution?",
    "Why is the electrode rinsed with distilled water between solutions?",
    "What is the difference between an acidic and a basic pH reading?",
  ],
  referencePdf: { label: "pH meter practical manual" },
  referenceVideo: { label: "pH meter handling video" },
  teacherNotes: "Check that the student calibrates before inserting the electrode into the sample and records a stable value.",
  status: "In progress",
  completionPercentage: 18,
};
