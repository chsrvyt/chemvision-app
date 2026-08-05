"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Bell, BookOpen, CheckCircle2, Clock3, Download, FlaskConical, GraduationCap, Play, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardChart } from "@/components/shared/DashboardChart";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { title: "Completed Experiments", value: "18", change: 12, changeLabel: "this semester", icon: "FlaskConical", color: "success" as const },
  { title: "Pending Experiments", value: "04", changeLabel: "next due Friday", icon: "Clock3", color: "warning" as const },
  { title: "Average Marks", value: "86%", change: 6, changeLabel: "from last term", icon: "Award", color: "accent" as const },
  { title: "Attendance", value: "94%", change: 3, changeLabel: "this semester", icon: "ClipboardCheck", color: "primary" as const },
];

const experiments = [
  { title: "Acid Base Titration", difficulty: "Intermediate", status: "Completed", teacher: "Dr. Iyer", time: "35 min", color: "from-teal-500/20 to-teal-500/5", icon: FlaskConical },
  { title: "pH Meter", difficulty: "Beginner", status: "In progress", teacher: "Dr. Mehta", time: "20 min", color: "from-blue-500/20 to-blue-500/5", icon: TrendingUp },
  { title: "Colorimetry", difficulty: "Intermediate", status: "Pending", teacher: "Dr. Iyer", time: "30 min", color: "from-orange-500/20 to-orange-500/5", icon: Sparkles },
  { title: "UV Spectroscopy", difficulty: "Advanced", status: "Pending", teacher: "Dr. Rao", time: "45 min", color: "from-violet-500/20 to-violet-500/5", icon: Play },
  { title: "Water Hardness", difficulty: "Beginner", status: "Completed", teacher: "Dr. Mehta", time: "25 min", color: "from-cyan-500/20 to-cyan-500/5", icon: CheckCircle2 },
];

const quickActions = [
  { label: "Continue Last Experiment", icon: Play },
  { label: "Open Virtual Lab", icon: FlaskConical },
  { label: "Download Practical Manual", icon: Download },
  { label: "View Marks", icon: Award },
];

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div><Badge variant="outline" className="mb-3 bg-background">Student Workspace</Badge><h1 className="text-3xl font-bold tracking-tight">Welcome back, Ananya</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Your next practical is waiting. Continue building confidence through guided experiments and focused practice.</p></div>
        <Button><FlaskConical className="mr-2 h-4 w-4" />Open Virtual Lab</Button>
      </motion.div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat, index) => <StatCard key={stat.title} {...stat} index={index} />)}</section>

      <section className="grid gap-4 xl:grid-cols-3">
        <DashboardChart title="Learning Progress" description="Your experiment completion over time." data={[{ week: "W1", progress: 42 }, { week: "W2", progress: 49 }, { week: "W3", progress: 57 }, { week: "W4", progress: 66 }, { week: "W5", progress: 78 }, { week: "W6", progress: 86 }]} dataKey="progress" xKey="week" variant="area" color="#14b8a6" />
        <DashboardChart title="Subject-wise Performance" description="Average marks by current subject." data={[{ subject: "Organic", marks: 88 }, { subject: "Analytical", marks: 91 }, { subject: "Physical", marks: 82 }, { subject: "Inorganic", marks: 84 }]} dataKey="marks" xKey="subject" variant="bar" color="#f97316" />
        <DashboardChart title="Practical Completion" description="Completed versus assigned practicals." data={[{ status: "Completed", value: 18 }, { status: "In progress", value: 3 }, { status: "Pending", value: 4 }]} dataKey="value" xKey="status" variant="line" color="#3b82f6" />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4"><div><h2 className="text-xl font-semibold">Your Experiments</h2><p className="mt-1 text-sm text-muted-foreground">Pick up where you left off or explore your next practical.</p></div><Button variant="ghost" className="hidden sm:inline-flex">View all <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{experiments.map((experiment, index) => <motion.div key={experiment.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} whileHover={{ y: -4 }}><Card className="h-full transition-shadow hover:shadow-lg hover:shadow-primary/5"><div className={`flex h-28 items-center justify-center bg-gradient-to-br ${experiment.color}`}><experiment.icon className="h-10 w-10 text-foreground/70" /></div><CardHeader className="gap-3"><div className="flex items-center justify-between gap-2"><Badge variant="outline" className={experiment.status === "Completed" ? "border-emerald-500/30 text-emerald-600" : experiment.status === "In progress" ? "border-blue-500/30 text-blue-600" : "border-amber-500/30 text-amber-600"}>{experiment.status}</Badge><span className="text-xs text-muted-foreground">{experiment.difficulty}</span></div><CardTitle className="text-base">{experiment.title}</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex items-center gap-2 text-xs text-muted-foreground"><GraduationCap className="h-3.5 w-3.5" />{experiment.teacher}</div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />Estimated time: {experiment.time}</div><Button variant={experiment.status === "Pending" ? "default" : "outline"} className="mt-1 w-full">{experiment.status === "Completed" ? "Review experiment" : experiment.status === "In progress" ? "Continue" : "Start experiment"}<ArrowRight className="ml-2 h-3.5 w-3.5" /></Button></CardContent></Card></motion.div>)}</div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card><CardHeader><CardTitle>Current Semester</CardTitle><CardDescription>Semester 4 · B.Sc. Chemistry</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex items-center justify-between rounded-lg border bg-background p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><BookOpen className="h-5 w-5" /></div><div><p className="font-medium">6 active subjects</p><p className="text-sm text-muted-foreground">24 practicals assigned</p></div></div><Badge>On track</Badge></div><div><div className="mb-2 flex justify-between text-sm"><span>Semester progress</span><span className="text-muted-foreground">76%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 w-[76%] rounded-full bg-primary" /></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Recent Notifications</CardTitle><CardDescription>Stay current with your lab work.</CardDescription></CardHeader><CardContent className="space-y-3"><div className="flex gap-3 rounded-lg border bg-background p-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500"><Bell className="h-4 w-4" /></div><div><p className="text-sm font-medium">New practical assigned</p><p className="mt-1 text-xs text-muted-foreground">Colorimetry is due Friday, 11:59 PM.</p></div></div><div className="flex gap-3 rounded-lg border bg-background p-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500"><Award className="h-4 w-4" /></div><div><p className="text-sm font-medium">Marks published</p><p className="mt-1 text-xs text-muted-foreground">Your Water Hardness result is available.</p></div></div></CardContent></Card>
      </section>

      <Card><CardHeader><CardTitle>Quick Actions</CardTitle><CardDescription>Jump straight into your most common learning workflows.</CardDescription></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{quickActions.map((action) => <Button key={action.label} variant="outline" className="h-20 justify-start gap-3 px-4 text-left"><action.icon className="h-5 w-5 shrink-0 text-primary" /><span className="whitespace-normal">{action.label}</span></Button>)}</div></CardContent></Card>
    </div>
  );
}
