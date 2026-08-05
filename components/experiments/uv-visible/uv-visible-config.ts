import type { ExperimentConfig } from "../experiment-types";

export const uvVisibleConfig: ExperimentConfig = {
  id: "uv-visible-spectroscopy",
  title: "UV-Visible Spectroscopy of an Unknown Sample",
  subject: "Instrumental Analysis",
  experimentNumber: "04",
  aim: "Record the absorption spectrum of an unknown solution, identify its lambda max, and estimate its concentration using the Beer-Lambert law.",
  theory: {
    id: "theory",
    title: "Aim and Theory",
    content: "UV-Visible spectroscopy measures how much ultraviolet or visible light a sample absorbs at selected wavelengths. The resulting spectrum provides a characteristic fingerprint that can be used for identification and quantitative analysis.",
  },
  principle: {
    id: "principle",
    title: "Principle and Beer-Lambert Law",
    content: "Molecules absorb light when photon energy matches an electronic transition. Beer-Lambert law relates absorbance to concentration: A = epsilon l c, where epsilon is molar absorptivity, l is path length, and c is concentration.",
  },
  apparatus: ["UV-Visible Spectrophotometer", "Sample Holder", "Quartz Cuvette", "Wavelength Selector", "Detector", "Digital Display"],
  chemicals: ["Blank Solution", "Unknown Solution", "Distilled Water"],
  safetyPrecautions: [
    "Use quartz cuvettes for UV measurements and hold them by the frosted sides.",
    "Keep the sample compartment closed while the instrument is scanning.",
    "Do not look directly into the UV light source or bypass the instrument cover.",
    "Wipe the optical faces of every cuvette before inserting it into the holder.",
  ],
  procedure: [
    "Switch on the UV-Visible spectrophotometer and allow the system to initialize.",
    "Insert the blank sample with the clear optical faces aligned to the beam.",
    "Press Calibrate and wait for the zero calibration to finish.",
    "Remove the blank and insert the unknown sample in the same orientation.",
    "Select a wavelength from 200 nm to 700 nm for the quantitative reading.",
    "Press Start Scan and observe the detector response and spectrum generation.",
  ],
  demonstration: {
    title: "UV-Visible Scan Demonstration",
    description: "Calibrate against the blank, choose a wavelength, and run the deterministic spectrum scan.",
    steps: ["Switch on", "Insert blank", "Calibrate", "Remove blank", "Insert unknown", "Select wavelength", "Start scan"],
  },
  observation: {
    columns: [
      { key: "trial", label: "Trial", placeholder: "1" },
      { key: "wavelength", label: "Selected Wavelength", placeholder: "nm" },
      { key: "absorbance", label: "Absorbance", placeholder: "AU" },
      { key: "lambdaMax", label: "Lambda Max", placeholder: "nm" },
      { key: "remarks", label: "Remarks", placeholder: "Add remarks" },
    ],
    rows: 1,
  },
  calculations: {
    title: "Spectroscopic Calculation",
    formula: "A = epsilon l c; T = 10^(-A) x 100",
    description: "The selected-wavelength absorbance is converted to transmittance and concentration using a one-centimetre path length.",
  },
  result: "Run the scan and identify lambda max to generate the result.",
  vivaQuestions: [
    "What is lambda max and why is it useful for quantitative analysis?",
    "Why is a blank used before scanning the unknown sample?",
    "What happens to absorbance when the wavelength moves away from lambda max?",
  ],
  referencePdf: { label: "UV-Visible spectroscopy practical manual" },
  referenceVideo: { label: "Spectrophotometer handling video" },
  teacherNotes: "Check blank calibration, quartz cuvette orientation, the selected wavelength, and the student's lambda max interpretation.",
  status: "In progress",
  completionPercentage: 14,
};
