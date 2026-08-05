"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, Edit3, FileImage, FileText, History, Save, Send, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExperimentConfig } from "@/components/experiments/experiment-types";

type SubmissionStatus = "Pending" | "Submitted" | "Evaluated";

type SubmissionHistoryItem = {
  id: string;
  label: string;
  status: SubmissionStatus;
  date: string;
};

function initialStatus(status: ExperimentConfig["status"]): SubmissionStatus {
  if (status === "Evaluated") return "Evaluated";
  if (status === "Submitted") return "Submitted";
  return "Pending";
}

function statusClass(status: SubmissionStatus) {
  if (status === "Evaluated") return "border-emerald-500/30 text-emerald-600";
  if (status === "Submitted") return "border-blue-500/30 text-blue-600";
  return "border-amber-500/30 text-amber-600";
}

export function StudentSubmission({ status }: { status: ExperimentConfig["status"] }) {
  const [currentStatus, setCurrentStatus] = useState<SubmissionStatus>(initialStatus(status));
  const [draftMode, setDraftMode] = useState(currentStatus === "Pending");
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [history, setHistory] = useState<SubmissionHistoryItem[]>([
    { id: "initial", label: "Workspace opened", status: initialStatus(status), date: "Today" },
  ]);

  const fileSummary = useMemo(() => [...pdfFiles, ...imageFiles], [imageFiles, pdfFiles]);

  function saveDraft() {
    setCurrentStatus("Pending");
    setDraftMode(true);
    setHistory((items) => [{ id: `draft-${Date.now()}`, label: "Draft saved locally", status: "Pending", date: "Just now" }, ...items]);
  }

  function submitExperiment() {
    setCurrentStatus("Submitted");
    setDraftMode(false);
    setHistory((items) => [{ id: `submission-${Date.now()}`, label: "Submission sent for evaluation", status: "Submitted", date: "Just now" }, ...items]);
  }

  return <Card className="border-primary/20 bg-primary/5"><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle>Student Submission</CardTitle><CardDescription>Save a draft, attach supporting files, or submit this configured workspace for evaluation.</CardDescription></div><Badge variant="outline" className={statusClass(currentStatus)}>{currentStatus}</Badge></div></CardHeader><CardContent className="space-y-5"><div className="grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-background p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"><Upload className="h-4 w-4 text-primary" /><span className="min-w-0 flex-1"><span className="block text-sm font-medium">Upload PDF</span><span className="block text-xs text-muted-foreground">Attach a practical record or manual.</span></span><input type="file" accept="application/pdf" multiple className="sr-only" onChange={(event) => setPdfFiles(Array.from(event.target.files ?? []))} /></label><label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-background p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"><FileImage className="h-4 w-4 text-primary" /><span className="min-w-0 flex-1"><span className="block text-sm font-medium">Upload Images</span><span className="block text-xs text-muted-foreground">Attach observation images.</span></span><input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => setImageFiles(Array.from(event.target.files ?? []))} /></label></div>{fileSummary.length > 0 && <div className="space-y-2 rounded-lg border bg-background p-3"><div className="flex items-center justify-between gap-3"><p className="text-sm font-medium">Selected attachments</p><button type="button" aria-label="Clear selected attachments" className="text-muted-foreground hover:text-foreground" onClick={() => { setPdfFiles([]); setImageFiles([]); }}><X className="h-4 w-4" /></button></div>{fileSummary.map((file) => <div key={`${file.name}-${file.size}`} className="flex items-center gap-2 text-xs text-muted-foreground"><FileText className="h-3.5 w-3.5" />{file.name}</div>)}</div>}<div className="flex flex-col gap-3 rounded-lg border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" />{draftMode ? "Draft editing is enabled" : "Submission is locked for review"}</div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => setDraftMode(true)} disabled={currentStatus === "Evaluated" || draftMode}><Edit3 className="mr-2 h-4 w-4" />Edit Draft</Button><Button variant="outline" onClick={saveDraft} disabled={!draftMode}><Save className="mr-2 h-4 w-4" />Save Draft</Button><Button onClick={submitExperiment} disabled={currentStatus === "Submitted" || currentStatus === "Evaluated"}><Send className="mr-2 h-4 w-4" />Submit Experiment</Button></div></div><div className="border-t pt-4"><div className="mb-3 flex items-center gap-2"><History className="h-4 w-4 text-primary" /><h3 className="text-sm font-semibold">Submission History</h3></div><div className="space-y-2">{history.map((item) => <div key={item.id} className="flex flex-col gap-2 rounded-lg border bg-background p-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{item.label}</span></div><div className="flex items-center gap-2 pl-6 sm:pl-0"><span className="text-xs text-muted-foreground">{item.date}</span><Badge variant="outline" className={statusClass(item.status)}>{item.status}</Badge></div></div>)}</div></div></CardContent></Card>;
}
