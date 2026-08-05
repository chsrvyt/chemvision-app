"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardCheck,
  FileBarChart,
  FlaskConical,
  GraduationCap,
  Megaphone,
  Plus,
  Settings,
  UserPlus,
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
import { StatCard } from "@/components/shared/StatCard";
import { DashboardChart } from "@/components/shared/DashboardChart";

const overviewStats = [
  { title: "Total Students", value: "1,284", change: 12, changeLabel: "this term", icon: "Users", color: "primary" as const },
  { title: "Total Teachers", value: "48", change: 4, changeLabel: "active faculty", icon: "GraduationCap", color: "secondary" as const },
  { title: "Total Subjects", value: "32", change: 7, changeLabel: "configured", icon: "BookOpen", color: "accent" as const },
  { title: "Total Practicals", value: "156", change: 15, changeLabel: "published", icon: "FlaskConical", color: "success" as const },
  { title: "Pending Evaluations", value: "87", change: -8, changeLabel: "from last week", icon: "FileBarChart", color: "warning" as const },
];

const studentGrowth = [
  { month: "Jan", students: 940 },
  { month: "Feb", students: 990 },
  { month: "Mar", students: 1045 },
  { month: "Apr", students: 1120 },
  { month: "May", students: 1188 },
  { month: "Jun", students: 1284 },
];

const averageMarks = [
  { subject: "Organic", marks: 78 },
  { subject: "Inorganic", marks: 74 },
  { subject: "Physical", marks: 81 },
  { subject: "Analytical", marks: 86 },
  { subject: "Pharma", marks: 76 },
];

const completion = [
  { week: "W1", completion: 58 },
  { week: "W2", completion: 66 },
  { week: "W3", completion: 71 },
  { week: "W4", completion: 79 },
  { week: "W5", completion: 84 },
  { week: "W6", completion: 91 },
];

const recentActivity = [
  "Dr. Iyer published UV Spectroscopy for Semester 4",
  "32 student submissions are ready for titration evaluation",
  "Water Hardness practical completion crossed 90%",
  "Semester 2 progress reports were generated",
];

const announcements = [
  { title: "Lab Safety Review", detail: "Reminder scheduled for all practical batches this Friday." },
  { title: "New Practical Added", detail: "Colorimetry simulation is now available for Analytical Chemistry." },
  { title: "Evaluation Window", detail: "Pending teacher evaluations should be completed before Monday." },
];

const quickActions = [
  { label: "Add Student", icon: UserPlus },
  { label: "Add Teacher", icon: GraduationCap },
  { label: "Create Subject", icon: BookOpen },
  { label: "Create Practical", icon: FlaskConical },
  { label: "Generate Report", icon: FileBarChart },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 bg-background">Admin Dashboard</Badge>
          <h1 className="text-3xl font-bold tracking-tight">ChemVision Control Center</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor students, teachers, subjects, practicals, evaluations, announcements, and reporting readiness.
          </p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Dashboard Settings
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {overviewStats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <DashboardChart
          title="Student Growth"
          description="Total enrolled students across recent months."
          data={studentGrowth}
          dataKey="students"
          xKey="month"
          variant="area"
          color="#14b8a6"
        />
        <DashboardChart
          title="Average Marks"
          description="Subject-wise average practical marks."
          data={averageMarks}
          dataKey="marks"
          xKey="subject"
          variant="bar"
          color="#f97316"
        />
        <DashboardChart
          title="Practical Completion"
          description="Completion percentage by academic week."
          data={completion}
          dataKey="completion"
          xKey="week"
          variant="line"
          color="#3b82f6"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest academic and evaluation signals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="flex gap-3 rounded-lg border bg-background p-3"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                <p className="text-sm leading-6">{activity}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Static notices prepared for the admin overview.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.title} className="rounded-lg border bg-background p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-orange-500" />
                  <p className="font-medium">{announcement.title}</p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{announcement.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>UI-only action entry points. CRUD and backend logic are intentionally not wired yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {quickActions.map((action) => (
              <Button key={action.label} variant="outline" className="h-24 flex-col gap-2">
                <action.icon className="h-5 w-5" />
                <span>{action.label}</span>
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
