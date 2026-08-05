"use client";

import { LaboratoryFramework } from "@/components/laboratory/LaboratoryFramework";
import { defaultLaboratorySession, laboratoryInstruments } from "@/components/laboratory/default-session";

export default function StudentLaboratoryPage() {
  return <LaboratoryFramework config={defaultLaboratorySession} instruments={laboratoryInstruments} />;
}
