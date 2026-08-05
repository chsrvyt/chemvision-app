import type { ExperimentConfig } from "../experiment-types";

export const colorimeterConfig: ExperimentConfig = {
  id: "colorimeter",
  title: "Determination of Concentration Using a Colorimeter",
  subject: "Analytical Chemistry",
  experimentNumber: "03",
  aim: "Determine the concentration of an unknown colored solution by measuring its absorbance with a colorimeter.",
  theory: {
    id: "theory",
    title: "Aim and Theory",
    content: "A colorimeter compares the intensity of light passing through a blank, standard solutions, and an unknown colored solution. The measured absorbance is used to estimate the unknown concentration from a calibration curve.",
  },
  principle: {
    id: "principle",
    title: "Principle and Beer-Lambert Law",
    content: "The Beer-Lambert law states that A = epsilon l c, where A is absorbance, epsilon is molar absorptivity, l is the path length, and c is concentration. Within the working range, absorbance is directly proportional to concentration.",
  },
  apparatus: ["Digital Colorimeter", "Cuvette", "Filter Selector", "Display Screen", "Blank Solution Holder"],
  chemicals: ["Blank Solution", "Standard Solution", "Unknown Colored Solution", "Distilled Water"],
  safetyPrecautions: [
    "Handle cuvettes by their frosted sides and keep the optical faces clean.",
    "Wipe liquid spills immediately and keep the colorimeter dry.",
    "Do not look directly into the light source or force the cuvette into the holder.",
    "Dispose of colored solutions according to the teacher's instructions.",
  ],
  procedure: [
    "Switch on the digital colorimeter and allow the display to initialize.",
    "Select the filter that matches the absorption region of the colored solution.",
    "Insert the clean blank solution cuvette in the correct orientation.",
    "Press Zero and wait for the calibration animation to complete.",
    "Remove the blank cuvette without changing the selected filter.",
    "Insert the unknown solution cuvette and close the sample holder.",
    "Press Measure, wait for absorbance to stabilize, and record the value.",
  ],
  demonstration: {
    title: "Colorimeter Demonstration",
    description: "Calibrate the instrument with the blank before measuring the unknown solution.",
    steps: ["Switch on", "Select filter", "Insert blank", "Press zero", "Remove blank", "Insert unknown", "Measure"],
  },
  observation: {
    columns: [
      { key: "sample", label: "Sample Name", placeholder: "Enter sample" },
      { key: "absorbance", label: "Absorbance", placeholder: "e.g. 0.421" },
      { key: "concentration", label: "Concentration", placeholder: "mg/L" },
      { key: "remarks", label: "Remarks", placeholder: "Add remarks" },
    ],
    rows: 1,
  },
  calculations: {
    title: "Beer-Lambert Calculation",
    formula: "A = mC + b, therefore C = (A - b) / m",
    description: "Use the calibration curve slope and intercept to calculate the concentration of the unknown solution.",
  },
  result: "Record the stabilized absorbance to generate the unknown concentration.",
  vivaQuestions: [
    "Why is a blank solution used before measuring the standards and unknown?",
    "Why must the same filter be used for the calibration and unknown readings?",
    "What does the slope of a calibration curve represent?",
  ],
  referencePdf: { label: "Colorimetry practical manual" },
  referenceVideo: { label: "Colorimeter handling video" },
  teacherNotes: "Check the selected filter, cuvette orientation, blank calibration, and the student's interpretation of the calibration curve.",
  status: "In progress",
  completionPercentage: 16,
};
