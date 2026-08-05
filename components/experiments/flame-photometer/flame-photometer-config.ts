import type { ExperimentConfig } from "../experiment-types";

export const flamePhotometerConfig: ExperimentConfig = {
  id: "flame-photometer",
  title: "Determination of Sodium and Potassium by Flame Photometry",
  subject: "Instrumental Analysis",
  experimentNumber: "05",
  aim: "Measure the emission intensity of an unknown sample and determine its sodium or potassium concentration using a flame photometer.",
  theory: {
    id: "theory",
    title: "Aim and Principle",
    content: "Flame photometry is an emission spectroscopy technique. When a sample is aspirated into a flame, atoms are excited and emit light at element-specific wavelengths. The emitted intensity is compared with standards to determine concentration.",
  },
  principle: {
    id: "principle",
    title: "Working Principle",
    content: "The nebulizer converts the solution into a fine aerosol, the flame excites the atoms, and the detector measures characteristic emission. Within the working range, emission intensity is proportional to concentration for sodium and potassium.",
  },
  apparatus: ["Flame Photometer", "Burner", "Air Compressor", "Nebulizer", "Sample Holder", "Fuel Control", "Flame Indicator", "Detector", "Digital Display"],
  chemicals: ["Blank Solution", "Sodium Standard", "Potassium Standard", "Unknown Sample"],
  safetyPrecautions: [
    "Wear goggles and keep loose clothing away from the burner flame.",
    "Check the fuel line and air supply before ignition.",
    "Never leave the flame unattended or touch the burner after operation.",
    "Flush the nebulizer with the configured blank solution after analysis.",
  ],
  procedure: [
    "Switch on the flame photometer and confirm that the controls are ready.",
    "Start the air compressor and establish a steady air supply.",
    "Ignite the burner and confirm a stable blue flame.",
    "Insert the blank solution into the sample holder.",
    "Calibrate the instrument against the blank reference.",
    "Remove the blank and insert the unknown sample.",
    "Select sodium or potassium for the element-specific analysis.",
    "Press Analyze and wait for aspiration, flame response, and detector stabilization.",
  ],
  demonstration: {
    title: "Flame Photometer Demonstration",
    description: "Establish air and flame conditions, calibrate with the blank, then analyze one selected element.",
    steps: ["Switch on", "Start compressor", "Ignite burner", "Insert blank", "Calibrate", "Remove blank", "Insert unknown", "Analyze"],
  },
  observation: {
    columns: [
      { key: "sample", label: "Sample", placeholder: "Unknown sample" },
      { key: "element", label: "Element", placeholder: "Na or K" },
      { key: "intensity", label: "Intensity", placeholder: "Emission intensity" },
      { key: "concentration", label: "Concentration", placeholder: "mg/L" },
      { key: "remarks", label: "Remarks", placeholder: "Add remarks" },
    ],
    rows: 1,
  },
  calculations: {
    title: "Emission Calibration Calculation",
    formula: "I = mC + b, therefore C = (I - b) / m",
    description: "Use the element-specific calibration slope to convert the measured emission intensity into concentration.",
  },
  result: "Complete the flame photometer analysis to generate the detected element and concentration.",
  vivaQuestions: [
    "Why do sodium and potassium produce different emission wavelengths?",
    "Why must the flame be stable before measuring an unknown sample?",
    "What is the function of the nebulizer in a flame photometer?",
  ],
  referencePdf: { label: "Flame photometry practical manual" },
  referenceVideo: { label: "Flame photometer handling video" },
  teacherNotes: "Check air supply, stable blue flame, blank calibration, element selection, and the student's calibration calculation.",
  status: "In progress",
  completionPercentage: 12,
};
