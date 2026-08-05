"use client";

import { motion } from "framer-motion";
import { CalendarDays, Check, Download, Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AttendanceStudent = { id: string; name: string; enrollment: string; subject: string; percentage: number; status: "present" | "absent" };

const initialStudents: AttendanceStudent[] = [
  { id: "cv-018", name: "Aarav Mehta", enrollment: "CV-24-018", subject: "Analytical Chemistry", percentage: 94, status: "present" },
  { id: "cv-027", name: "Maya Sharma", enrollment: "CV-24-027", subject: "Analytical Chemistry", percentage: 91, status: "present" },
  { id: "cv-034", name: "Kabir Rao", enrollment: "CV-24-034", subject: "Analytical Chemistry", percentage: 86, status: "absent" },
  { id: "cv-041", name: "Ishita Nair", enrollment: "CV-24-041", subject: "Analytical Chemistry", percentage: 97, status: "present" },
  { id: "cv-052", name: "Dev Patel", enrollment: "CV-24-052", subject: "Analytical Chemistry", percentage: 89, status: "present" },
  { id: "cv-066", name: "Sara Khan", enrollment: "CV-24-066", subject: "Analytical Chemistry", percentage: 78, status: "absent" },
];

export function AttendanceManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "present" | "absent">("all");
  const [selectedId, setSelectedId] = useState(initialStudents[0].id);
  const selected = students.find((student) => student.id === selectedId) ?? students[0];
  const visibleStudents = useMemo(() => students.filter((student) => `${student.name} ${student.enrollment}`.toLowerCase().includes(query.toLowerCase()) && (filter === "all" || student.status === filter)), [filter, query, students]);

  function mark(id: string, status: AttendanceStudent["status"]) {
    setStudents((current) => current.map((student) => student.id === id ? { ...student, status } : student));
  }

  function exportAttendance() {
    const rows = ["Student,Enrollment,Subject,Status,Attendance Percentage", ...students.map((student) => `${student.name},${student.enrollment},${student.subject},${student.status},${student.percentage}%`)].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
    link.download = "chemvision-attendance.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return <div className="space-y-6 p-4 sm:p-6 lg:p-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><Badge variant="outline" className="mb-3 bg-background">Teaching Workspace</Badge><h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Mark today&apos;s practical attendance and review each student&apos;s attendance history.</p></div><Button variant="outline" onClick={exportAttendance}><Download className="mr-2 h-4 w-4" />Export Attendance</Button></div><div className="grid gap-4 sm:grid-cols-3"><Card><CardContent className="flex items-center gap-3 p-5"><Users className="h-5 w-5 text-primary" /><div><p className="text-xs text-muted-foreground">Total Students</p><p className="text-2xl font-bold">{students.length}</p></div></CardContent></Card><Card><CardContent className="flex items-center gap-3 p-5"><Check className="h-5 w-5 text-emerald-500" /><div><p className="text-xs text-muted-foreground">Present Today</p><p className="text-2xl font-bold">{students.filter((student) => student.status === "present").length}</p></div></CardContent></Card><Card><CardContent className="flex items-center gap-3 p-5"><X className="h-5 w-5 text-rose-500" /><div><p className="text-xs text-muted-foreground">Absent Today</p><p className="text-2xl font-bold">{students.filter((student) => student.status === "absent").length}</p></div></CardContent></Card></div><div className="grid gap-4 lg:grid-cols-[minmax(20rem,1.3fr)_minmax(16rem,0.7fr)]"><Card><CardHeader><CardTitle>Student Roster</CardTitle><CardDescription>Analytical Chemistry · Today&apos;s practical session</CardDescription><div className="flex flex-col gap-3 pt-2 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students" className="pl-9" /></div><select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} aria-label="Filter attendance" className="h-8 rounded-lg border bg-background px-3 text-sm"><option value="all">All students</option><option value="present">Present</option><option value="absent">Absent</option></select></div></CardHeader><CardContent className="space-y-2">{visibleStudents.map((student, index) => <motion.div key={student.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className={`flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between ${selected.id === student.id ? "border-primary bg-primary/5" : "bg-background"}`}><button type="button" onClick={() => setSelectedId(student.id)} className="min-w-0 text-left"><p className="truncate text-sm font-medium">{student.name}</p><p className="mt-1 text-xs text-muted-foreground">{student.enrollment} · {student.percentage}% attendance</p></button><div className="flex items-center gap-2"><Button size="sm" variant={student.status === "present" ? "default" : "outline"} onClick={() => mark(student.id, "present")}><Check className="mr-1.5 h-3.5 w-3.5" />Present</Button><Button size="sm" variant={student.status === "absent" ? "destructive" : "outline"} onClick={() => mark(student.id, "absent")}><X className="mr-1.5 h-3.5 w-3.5" />Absent</Button></div></motion.div>)}{visibleStudents.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No students match the current filter.</p>}</CardContent></Card><Card className="h-fit"><CardHeader><CardTitle>View Attendance</CardTitle><CardDescription>Selected student overview.</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Users className="h-5 w-5" /></div><div><p className="font-medium">{selected.name}</p><p className="text-xs text-muted-foreground">{selected.enrollment}</p></div></div><div className="rounded-lg border bg-background p-4"><div className="mb-2 flex items-center justify-between text-sm"><span>Attendance Percentage</span><span className="font-semibold">{selected.percentage}%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${selected.percentage}%` }} /></div></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />Current session: <Badge variant="outline" className={selected.status === "present" ? "border-emerald-500/30 text-emerald-600" : "border-rose-500/30 text-rose-600"}>{selected.status}</Badge></div></CardContent></Card></div></div>;
}
