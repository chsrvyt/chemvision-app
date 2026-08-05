import { ExperimentEngine } from "@/components/experiments/ExperimentEngine";
import { sampleExperimentConfig } from "@/components/experiments/sample-config";

export default function StudentExperimentPage() {
  return <ExperimentEngine config={sampleExperimentConfig} />;
}
