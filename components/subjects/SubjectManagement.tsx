"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Eye, FlaskConical, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export type SubjectWorkspaceRole = "admin" | "teacher" | "student";

type Subject = {
  name: string;
  code: string;
  semester: number;
  branch: string;
  teacher: string;
  experiments: number;
  progress: number;
  enrolled: number;
};

const subjects: Subject[] = [
  { name: "Analytical Chemistry", code: "CHEM-401", semester: 4, branch: "B.Sc. Chemistry", teacher: "Dr. Kavita Iyer", experiments: 8, progress: 76, enrolled: 52 },
  { name: "Physical Chemistry", code: "CHEM-302", semester: 3, branch: "B.Sc. Chemistry", teacher: "Dr. Arjun Mehta", experiments: 6, progress: 64, enrolled: 48 },
  { name: "Organic Chemistry", code: "CHEM-501", semester: 5, branch: "B.Sc. Chemistry", teacher: "Dr. Neha Rao", experiments: 10, progress: 58, enrolled: 44 },
  { name: "Inorganic Chemistry", code: "CHEM-204", semester: 2, branch: "B.Sc. Chemistry", teacher: "Dr. Vivek Shah", experiments: 7, progress: 82, enrolled: 61 },
  { name: "Biochemistry", code: "CHEM-603", semester: 6, branch: "B.Sc. Chemistry", teacher: "Dr. Sana Khan", experiments: 5, progress: 48, enrolled: 39 },
  { name: "Environmental Chemistry", code: "CHEM-405", semester: 4, branch: "B.Sc. Chemistry", teacher: "Dr. Rohan Das", experiments: 4, progress: 70, enrolled: 46 },
];

const roleCopy: Record<SubjectWorkspaceRole, { eyebrow: string; title: string; description: string }> = {
  admin: { eyebrow: "Academic Configuration", title: "Subject Management", description: "Organize subjects, teaching ownership, branches, semesters, and practical coverage from one focused workspace." },
  teacher: { eyebrow: "Teaching Workspace", title: "Assigned Subjects", description: "Review the subjects assigned to you and jump into their experiment library." },
  student: { eyebrow: "Learning Workspace", title: "Enrolled Subjects", description: "Track your subject progress and discover the experiments attached to each course." },
};

export function SubjectManagement({ role }: { role: SubjectWorkspaceRole }) {
  const [query, setQuery] = useState("");
  const [semester, setSemester] = useState("all");
  const copy = roleCopy[role];
  const visibleSubjects = useMemo(() => subjects.filter((subject) => {
    const matchesQuery = `${subject.name} ${subject.code} ${subject.teacher}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (semester === "all" || String(subject.semester) === semester);
  }), [query, semester]);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div><Badge variant="outline" className="mb-3 bg-background">{copy.eyebrow}</Badge><h1 className="text-3xl font-bold tracking-tight">{copy.title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{copy.description}</p></div>
        {role === "admin" && <Button><Plus className="mr-2 h-4 w-4" />Create Subject</Button>}
      </div>

      <Card className="glass">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by subject, code, or teacher" className="pl-9" /></div>
          <select value={semester} onChange={(event) => setSemester(event.target.value)} aria-label="Filter by semester" className="h-9 rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring md:w-48"><option value="all">All semesters</option>{[1, 2, 3, 4, 5, 6].map((value) => <option key={value} value={value}>Semester {value}</option>)}</select>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleSubjects.map((subject, index) => <SubjectCard key={subject.code} subject={subject} role={role} index={index} />)}
      </div>
      {visibleSubjects.length === 0 && <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No subjects match the current filters.</CardContent></Card>}
    </div>
  );
}

function SubjectCard({ subject, role, index }: { subject: Subject; role: SubjectWorkspaceRole; index: number }) {
  return <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} whileHover={{ y: -3 }}><Card className="h-full transition-shadow hover:shadow-lg hover:shadow-primary/5"><CardHeader><div className="flex items-start justify-between gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><BookOpen className="h-5 w-5" /></div><Badge variant="outline">{subject.code}</Badge></div><CardTitle className="pt-2">{subject.name}</CardTitle><p className="text-sm text-muted-foreground">{subject.branch}</p></CardHeader><CardContent className="space-y-4"><div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Semester</p><p className="mt-1 font-medium">{subject.semester}</p></div><div className="rounded-lg border bg-background p-3"><p className="text-xs text-muted-foreground">Experiments</p><p className="mt-1 flex items-center gap-1.5 font-medium"><FlaskConical className="h-3.5 w-3.5 text-primary" />{subject.experiments}</p></div></div><div><div className="mb-2 flex justify-between text-sm"><span>Progress</span><span className="text-muted-foreground">{subject.progress}%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${subject.progress}%` }} /></div></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" />{role === "student" ? `${subject.enrolled} enrolled learners` : subject.teacher}</div><div className="flex flex-wrap gap-2 pt-1">{role === "admin" ? <><Button variant="outline" size="sm"><Pencil className="mr-1.5 h-3.5 w-3.5" />Edit</Button><Button variant="outline" size="sm"><Users className="mr-1.5 h-3.5 w-3.5" />Assign Teacher</Button><Button variant="outline" size="sm">Assign Semester</Button><Button variant="outline" size="sm">Assign Branch</Button><Button variant="ghost" size="icon" aria-label={`Delete ${subject.name}`}><Trash2 className="h-4 w-4 text-destructive" /></Button></> : role === "teacher" ? <><Button variant="outline" size="sm"><Eye className="mr-1.5 h-3.5 w-3.5" />View Details</Button><Link href="/teacher/experiments" className="inline-flex h-8 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-muted"><FlaskConical className="mr-1.5 h-3.5 w-3.5" />View Experiments</Link></> : <Link href="/student/practicals" className="inline-flex h-8 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-muted"><FlaskConical className="mr-1.5 h-3.5 w-3.5" />View Experiments</Link>}</div></CardContent></Card></motion.div>;
}
