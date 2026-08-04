"use client";

// ============================================================
// CHEMVISION — Landing Page
// ============================================================

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical,
  BookOpen,
  Video,
  FileText,
  Upload,
  BarChart3,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  Microscope,
  Beaker,
  Atom,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { APP_NAME, APP_DESCRIPTION } from "@/utils/constants";

const features = [
  {
    icon: FlaskConical,
    title: "Digital Practicals",
    description:
      "Complete chemistry practicals digitally with structured experiments, observations, and calculations.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Video,
    title: "Experiment Videos",
    description:
      "Watch detailed experiment demonstrations with step-by-step visual guidance.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: FileText,
    title: "PDF Resources",
    description:
      "Access comprehensive study materials, lab manuals, and reference documents.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Upload,
    title: "Submit & Evaluate",
    description:
      "Submit practicals online and receive graded feedback from teachers instantly.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor your academic progress with detailed analytics and performance charts.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Secure platform with admin, teacher, and student access controls.",
    color: "from-red-500 to-red-600",
  },
];

const stats = [
  { label: "Active Students", value: "5,000+" },
  { label: "Practicals", value: "200+" },
  { label: "Departments", value: "7+" },
  { label: "Uptime", value: "99.9%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* ── Background Blobs ──────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob absolute -left-32 -top-32 h-96 w-96 bg-primary/30" />
        <div className="blob absolute -right-32 top-1/3 h-80 w-80 bg-secondary/25" />
        <div className="blob absolute bottom-0 left-1/3 h-72 w-72 bg-accent/20" />
      </div>

      {/* ── Navbar ────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 border-b border-border/40 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
              Sign In
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants(),
                "bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              )}
            >
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Next-Gen Chemistry Lab Platform
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl"
          >
            Transform Your{" "}
            <span className="gradient-text">Chemistry Lab</span>{" "}
            Experience
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            {APP_DESCRIPTION}. Digitize practicals, track progress, and
            elevate learning with an enterprise-grade platform built for modern
            colleges.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-8 text-base bg-gradient-to-r from-primary to-blue-700 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all duration-300"
              )}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Start Learning
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 px-8 text-base border-border/60 hover:bg-muted/50"
              )}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Platform
            </Link>
          </motion.div>

          {/* ── Floating Molecules Animation ─────────────── */}
          <motion.div
            variants={itemVariants}
            className="relative mt-20 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-16 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 shadow-lg"
              >
                <Atom className="h-7 w-7 text-blue-500" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -right-16 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 shadow-lg"
              >
                <Beaker className="h-7 w-7 text-teal-500" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 shadow-lg"
              >
                <Microscope className="h-7 w-7 text-orange-500" />
              </motion.div>

              {/* Center Glass Card */}
              <div className="glass rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-xl shadow-primary/20">
                    <FlaskConical
                      className="h-10 w-10 text-white"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{APP_NAME}</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete Lab Management
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600">
                        Production Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Section ─────────────────────────────────── */}
      <section className="relative z-10 border-y border-border/40 bg-muted/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-extrabold gradient-text lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need for{" "}
            <span className="gradient-text">Modern Chemistry Education</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A comprehensive suite of tools designed to streamline laboratory
            management, enhance learning outcomes, and simplify evaluation.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/20"
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <div className="absolute -bottom-1 -right-1 h-20 w-20 rounded-tl-3xl bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Roles Section ─────────────────────────────────── */}
      <section className="relative z-10 border-t border-border/40 bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for <span className="gradient-text">Every Role</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Tailored experiences for administrators, teachers, and students
              with dedicated dashboards and features.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                role: "Admin",
                icon: Shield,
                description:
                  "Full platform control with analytics, user management, and system configuration.",
                features: [
                  "Manage Teachers & Students",
                  "Platform Analytics",
                  "Subject & Practical Management",
                  "Announcements & Reports",
                ],
                gradient: "from-blue-600 to-blue-700",
              },
              {
                role: "Teacher",
                icon: GraduationCap,
                description:
                  "Create practicals, upload resources, evaluate submissions, and track student performance.",
                features: [
                  "Upload Practicals & Resources",
                  "Evaluate Submissions",
                  "Attendance Management",
                  "Progress Reports",
                ],
                gradient: "from-teal-500 to-teal-600",
              },
              {
                role: "Student",
                icon: Users,
                description:
                  "Access practicals, watch videos, submit work, and track your academic progress.",
                features: [
                  "View Practicals & Theory",
                  "Watch Experiment Videos",
                  "Submit Practicals Online",
                  "Track Progress & Grades",
                ],
                gradient: "from-orange-500 to-orange-600",
              },
            ].map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card"
              >
                <div
                  className={`bg-gradient-to-br ${item.gradient} p-6`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm text-white/80">Dashboard</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="space-y-2.5">
                    {item.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-primary p-12 text-center shadow-2xl shadow-primary/20 lg:p-16"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="blob absolute -left-20 -top-20 h-60 w-60 bg-white/10" />
            <div className="blob absolute -bottom-20 -right-20 h-60 w-60 bg-white/10" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Digitize Your Chemistry Lab?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join thousands of students and educators already using ChemVision
              to transform their laboratory experience.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 bg-white px-8 text-base text-primary hover:bg-white/90 shadow-xl"
                )}
              >
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border/40 bg-muted/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
