import type { ExperimentConfig } from "../experiment-types";

export const edtaWaterHardnessConfig: ExperimentConfig = {
  id: "edta-water-hardness",
  title: "Determination of Total Hardness of Water by EDTA Titration",
  subject: "Analytical Chemistry",
  experimentNumber: "06",
  aim: "Determine the total hardness of a hard water sample by complexometric titration with standard EDTA solution.",
  theory: {
    id: "theory",
    title: "Aim and Principle",
    content: "Water hardness is caused mainly by calcium and magnesium ions. In this experiment, these ions are measured together by titrating the water sample with EDTA at a controlled alkaline pH.",
  },
  principle: {
    id: "principle",
    title: "EDTA Complexometric Titration",
    content: "EDTA forms stable 1:1 complexes with calcium and magnesium ions. At pH 10, Eriochrome Black T forms a wine-red metal-indicator complex. When all metal ions are bound by EDTA, the free indicator changes to sky blue at the endpoint.",
  },
  apparatus: ["Burette", "Conical Flask", "Pipette", "Measuring Cylinder", "Burette Valve", "White Tile"],
  chemicals: ["Standard EDTA Solution", "Hard Water Sample", "pH 10 Buffer Solution", "Eriochrome Black T Indicator"],
  safetyPrecautions: [
    "Wear goggles and gloves while handling the sample, buffer, and indicator.",
    "Keep the burette vertical and ensure the valve is closed before filling it.",
    "Rinse glassware with the appropriate solution before taking a measurement.",
    "Clean spills promptly and dispose of titration mixtures according to laboratory guidance.",
  ],
  procedure: [
    "Read the instructions and prepare the virtual titration workbench.",
    "Pipette the measured hard water sample into the conical flask.",
    "Add the pH 10 buffer solution to maintain the titration condition.",
    "Add Eriochrome Black T indicator; the solution becomes wine red.",
    "Fill the burette with standard EDTA solution and remove air bubbles.",
    "Open the burette valve gradually while swirling the conical flask.",
    "Stop at the permanent sky-blue endpoint and record the EDTA volume.",
  ],
  demonstration: {
    title: "EDTA Hardness Titration",
    description: "Prepare the sample in sequence, then control EDTA delivery until the wine-red solution reaches a sky-blue endpoint.",
    steps: ["Read instructions", "Pipette sample", "Add buffer", "Add indicator", "Fill EDTA", "Titrate", "Endpoint"],
  },
  observation: {
    columns: [
      { key: "trial", label: "Trial", placeholder: "1" },
      { key: "initial", label: "Initial Reading", placeholder: "0.0 mL" },
      { key: "final", label: "Final Reading", placeholder: "12.6 mL" },
      { key: "volume", label: "Volume of EDTA", placeholder: "mL" },
      { key: "hardness", label: "Hardness", placeholder: "ppm" },
      { key: "remarks", label: "Remarks", placeholder: "Add remarks" },
    ],
    rows: 3,
  },
  calculations: {
    title: "Total Hardness Calculation",
    formula: "Hardness (ppm) = (V_EDTA x M_EDTA x 100.09 x 1000) / V_sample",
    description: "The average EDTA volume is converted to calcium carbonate equivalent hardness using a 50 mL water sample and 0.01 M EDTA.",
  },
  result: "Complete the titration and enter concordant EDTA volumes to generate total hardness.",
  vivaQuestions: [
    "Why is a pH 10 buffer used in EDTA hardness titration?",
    "What is the role of Eriochrome Black T indicator?",
    "Why is the endpoint color change from wine red to sky blue?",
  ],
  referencePdf: { label: "EDTA water hardness practical manual" },
  referenceVideo: { label: "Complexometric titration handling video" },
  teacherNotes: "Check the order of sample preparation, controlled EDTA addition near the endpoint, and concordant titre calculation.",
  status: "In progress",
  completionPercentage: 14,
};
