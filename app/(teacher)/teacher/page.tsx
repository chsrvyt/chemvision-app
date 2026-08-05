"use client";

import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FileUp,
  FlaskConical,
  Megaphone,
  PlayCircle,
  Plus,
  Send,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { title: "Total Students", value: "284", change: 8, changeLabel: "this term", icon: "Users", color: "primary" as const },
  { title: "Assigned Subjects", value: "06", change: 2, changeLabel: "active courses", icon: "BookOpen", color: "secondary" as const },
  { title: "Pending Evaluations", value: "32", change: -12, changeLabel: "from last week", icon: "ClipboardCheck", color: "warning" as const },
  { title: "Completed Evaluations", value: "148", change: 18, changeLabel: "this month", icon: "CheckCircle2", color: "success" as const },
  { title: "Today's Practical Sessions", value: "04", changeLabel: "next at 10:30 AM", icon: "Clock3", color: "accent" as const },
];

const submissions = [
  { student: "Aarav Mehta", practical: "Acid Base Titration", time: "12 min ago", status: "Needs review", tone: "warning" },
  { student: "Maya Sharma", practical: "UV Spectroscopy", time: "42 min ago", status: "Submitted", tone: "info" },
  { student: "Kabir Rao", practical: "Water Hardness", time: "1 hr ago", status: "Submitted", tone: "info" },
  { student: "Ishita Nair", practical: "Colorimetry", time: "2 hrs ago", status: "Evaluated", tone: "success" },
];

const sessions = [
  { time: "10:30 AM", title: "Analytical Chemistry Lab", batch: "Semester 4 · Lab A", color: "bg-teal-500" },
  { time: "01:00 PM", title: "Physical Chemistry Practical", batch: "Semester 2 · Lab B", color: "bg-orange-500" },
  { time: "03:30 PM", title: "Organic Chemistry Demonstration", batch: "Semester 6 · Studio 1", color: "bg-blue-500" },
];

const quickActions = [
  { label: "Assign Practical", icon: ClipboardList },
  { label: "Upload Practical", icon: Upload },
  { label: "Upload PDF", icon: FileUp },
  { label: "Upload Video", icon: PlayCircle },
  { label: "Publish Marks", icon: Send },
  { label: "Take Attendance", icon: ClipboardCheck },
];

const submissionStatus = [
  { label: "Submitted", value: 72 },
  { label: "Evaluated", value: 54 },
  { label: "Pending", value: 28 },
];

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 bg-background">Faculty Workspace</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, Dr. Iyer</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Keep your practicals moving with a clear view of submissions, progress, and today&apos;s lab schedule.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Create Practical</Button>
      </motion.div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat, index) => <StatCard key={stat.title} {...stat} index={index} />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <DashboardChart title="Submission Status" description="Current practical submission mix." data={submissionStatus} dataKey="value" xKey="label" variant="bar" color="#14b8a6" />
        <DashboardChart title="Average Marks" description="Average marks by assigned subject." data={[{ subject: "Organic", marks: 82 }, { subject: "Analytical", marks: 88 }, { subject: "Physical", marks: 79 }, { subject: "Inorganic", marks: 84 }, { subject: "Biochem", marks: 91 }]} dataKey="marks" xKey="subject" variant="line" color="#f97316" />
        <DashboardChart title="Weekly Activity" description="Submissions received across the week." data={[{ day: "Mon", activity: 34 }, { day: "Tue", activity: 46 }, { day: "Wed", activity: 38 }, { day: "Thu", activity: 61 }, { day: "Fri", activity: 52 }, { day: "Sat", activity: 24 }]} dataKey="activity" xKey="day" variant="area" color="#3b82f6" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader><CardTitle>Recent Submissions</CardTitle><CardDescription>Latest work from your assigned students.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {submissions.map((submission, index) => (
              <motion.div key={`${submission.student}-${submission.practical}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} className="flex flex-col gap-3 rounded-lg border bg-background p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><FlaskConical className="h-4 w-4" /></div><div><p className="text-sm font-medium">{submission.student}</p><p className="text-xs text-muted-foreground">{submission.practical} · {submission.time}</p></div></div>
                <Badge variant="outline" className={submission.tone === "warning" ? "border-amber-500/30 text-amber-600" : submission.tone === "success" ? "border-emerald-500/30 text-emerald-600" : "border-blue-500/30 text-blue-600"}>{submission.status}</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Upcoming Practical Schedule</CardTitle><CardDescription>Today&apos;s sessions at a glance.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {sessions.map((session) => <div key={session.time} className="flex gap-3"><div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${session.color}`} /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium">{session.title}</p><span className="text-xs text-muted-foreground">{session.time}</span></div><p className="mt-1 text-xs text-muted-foreground">{session.batch}</p></div></div>)}
            <Button variant="outline" className="w-full"><CalendarDays className="mr-2 h-4 w-4" />View full schedule</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader><CardTitle>Student Progress</CardTitle><CardDescription>Progress snapshot across your active cohorts.</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            {[{ label: "Semester 4 · Analytical Chemistry", value: 84, count: "42 of 50 students" }, { label: "Semester 2 · Physical Chemistry", value: 71, count: "36 of 51 students" }, { label: "Semester 6 · Organic Chemistry", value: 63, count: "29 of 46 students" }].map((item) => <div key={item.label}><div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="font-medium">{item.label}</span><span className="text-muted-foreground">{item.value}%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${item.value}%` }} /></div><p className="mt-2 text-xs text-muted-foreground">{item.count} completed required practicals</p></div>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Announcements</CardTitle><CardDescription>Updates for your teaching workspace.</CardDescription></CardHeader>
          <CardContent className="space-y-3"><div className="rounded-lg border bg-background p-4"><div className="mb-2 flex items-center gap-2"><Megaphone className="h-4 w-4 text-orange-500" /><p className="font-medium">Lab safety review</p></div><p className="text-sm leading-6 text-muted-foreground">Please review the updated handling checklist before Friday&apos;s sessions.</p></div><div className="rounded-lg border bg-background p-4"><div className="mb-2 flex items-center gap-2"><Bell className="h-4 w-4 text-blue-500" /><p className="font-medium">Evaluation window</p></div><p className="text-sm leading-6 text-muted-foreground">32 submissions are ready for feedback in your evaluation queue.</p></div></CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle><CardDescription>Common teaching workflows are ready when you are.</CardDescription></CardHeader>
        <CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{quickActions.map((action) => <Button key={action.label} variant="outline" className="h-20 flex-col gap-2"><action.icon className="h-5 w-5" /><span>{action.label}</span></Button>)}</div></CardContent>
      </Card>
    </div>
  );
}
