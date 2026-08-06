import type { ExperimentConfig } from "../experiment-types";

export const conductometricTitrationConfig: ExperimentConfig = {
  id: "conductometric-titration",
  title: "Conductometric Titration of an Acid Solution",
  subject: "Analytical Chemistry",
  experimentNumber: "07",
  aim: "Determine the concentration and normality of an acid solution by following conductivity changes during titration with standard alkali.",
  theory: {
    id: "theory",
    title: "Aim and Principle",
    content: "Conductometric titration measures the electrical conductance of a solution as titrant is added. The conductivity changes because ions are consumed, replaced, or introduced during the chemical reaction.",
  },
  principle: {
    id: "principle",
    title: "Conductometric Titration",
    content: "For a strong acid titrated with a strong base, highly mobile hydrogen ions are replaced by less mobile sodium ions before equivalence, so conductivity falls. After equivalence, excess hydroxide ions increase conductivity. The endpoint is the intersection of the two linear regions.",
  },
  apparatus: ["Conductivity Meter", "Conductivity Probe", "Beaker", "Burette", "Magnetic Stirrer", "Digital Conductivity Display"],
  chemicals: ["Sample Acid Solution", "Standard Sodium Hydroxide", "Distilled Water"],
  safetyPrecautions: [
    "Wear goggles and gloves while handling the acid sample and standard alkali.",
    "Rinse the conductivity probe with distilled water before and after measurement.",
    "Keep the conductivity meter and electrical connections away from spills.",
    "Keep the probe immersed without allowing it to touch the beaker or stir bar.",
  ],
  procedure: [
    "Read the instructions and prepare the beaker, probe, and burette.",
    "Switch on the conductivity meter and confirm that the display is ready.",
    "Calibrate the instrument using the configured conductivity reference.",
    "Insert the conductivity probe into the stirred sample solution.",
    "Fill the burette with standard sodium hydroxide solution.",
    "Start titration and add the standard solution in measured increments.",
    "Record conductivity after each addition and locate the endpoint from the graph intersection.",
  ],
  demonstration: {
    title: "Live Conductometric Titration",
    description: "Add titrant incrementally and observe the falling then rising conductivity curve.",
    steps: ["Read instructions", "Switch on", "Calibrate", "Insert probe", "Fill burette", "Titrate", "Detect endpoint"],
  },
  observation: {
    columns: [
      { key: "trial", label: "Trial", placeholder: "1" },
      { key: "volume", label: "Volume Added", placeholder: "mL" },
      { key: "conductivity", label: "Conductivity", placeholder: "mS/cm" },
      { key: "endpoint", label: "Endpoint", placeholder: "mL" },
      { key: "remarks", label: "Remarks", placeholder: "Add remarks" },
    ],
    rows: 3,
  },
  calculations: {
    title: "Conductometric Calculation",
    formula: "N_acid V_acid = N_base V_endpoint",
    description: "Use the graph intersection as the endpoint volume and the standard base normality to calculate the acid normality and concentration.",
  },
  result: "Complete the live titration and identify the conductivity intersection to generate the result.",
  vivaQuestions: [
    "Why does conductivity decrease before the equivalence point in a strong acid-strong base titration?",
    "Why does conductivity increase after the equivalence point?",
    "How is the endpoint obtained from a conductometric titration graph?",
  ],
  referencePdf: { label: "Conductometric titration practical manual" },
  referenceVideo: { label: "Conductivity meter handling video" },
  teacherNotes: "Check calibration, probe immersion, controlled titrant increments, and the student's intersection-based endpoint interpretation.",
  status: "In progress",
  completionPercentage: 12,
};
