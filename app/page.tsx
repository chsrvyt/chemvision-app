"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Atom,
  BarChart3,
  Beaker,
  BookOpenCheck,
  Droplets,
  FlaskConical,
  Gauge,
  GraduationCap,
  Mail,
  Microscope,
  MoveDown,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  TestTube2,
  Users,
  Waves,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const navItems = ["Home", "Features", "Experiments", "About", "Contact"];

const features = [
  {
    title: "Virtual Lab",
    description:
      "Run guided chemistry practicals with visual apparatus, procedure checkpoints, and observation capture.",
    icon: FlaskConical,
  },
  {
    title: "Teacher Dashboard",
    description:
      "Coordinate batches, assign practicals, review submissions, and keep evaluations moving.",
    icon: GraduationCap,
  },
  {
    title: "Student Dashboard",
    description:
      "Give learners a focused workspace for demonstrations, readings, submissions, marks, and progress.",
    icon: Users,
  },
  {
    title: "Experiment Simulations",
    description:
      "Support critical lab workflows with repeatable digital demonstrations before hands-on sessions.",
    icon: PlayCircle,
  },
  {
    title: "Analytics",
    description:
      "Track lab adoption, completion trends, practical performance, and pending evaluation load.",
    icon: BarChart3,
  },
  {
    title: "Progress Reports",
    description:
      "Generate practical-ready summaries that help departments review learning outcomes with clarity.",
    icon: BookOpenCheck,
  },
];

const experiments = [
  {
    title: "Acid Base Titration",
    description: "Practice endpoint detection, burette readings, and molarity calculations.",
    icon: TestTube2,
  },
  {
    title: "UV Spectroscopy",
    description: "Explore absorbance, wavelength selection, and concentration analysis.",
    icon: Waves,
  },
  {
    title: "Colorimetry",
    description: "Compare standards, unknowns, and intensity shifts in guided analysis.",
    icon: Droplets,
  },
  {
    title: "pH Meter",
    description: "Calibrate instruments, test samples, and record reliable pH observations.",
    icon: Gauge,
  },
  {
    title: "Water Hardness",
    description: "Simulate EDTA titration and classify water samples from lab data.",
    icon: Beaker,
  },
];

const workflow = [
  "Choose Experiment",
  "Virtual Demonstration",
  "Perform Practical",
  "Observation",
  "Submit",
  "Teacher Evaluation",
  "Progress Report",
];

const testimonials = [
  {
    quote:
      "ChemVision helped us standardize practical workflows across sections without losing the discipline of real lab learning.",
    name: "Dr. Meera Shah",
    role: "Head of Chemistry",
  },
  {
    quote:
      "Students arrive prepared, teachers evaluate faster, and administrators finally see progress in one place.",
    name: "Arvind Kulkarni",
    role: "Academic Coordinator",
  },
  {
    quote:
      "The platform feels polished enough for institutions and simple enough for first-year learners.",
    name: "Nisha Rao",
    role: "Lab Instructor",
  },
];

const faqs = [
  {
    question: "Is ChemVision a replacement for physical laboratories?",
    answer:
      "No. It prepares, guides, and manages practical work so physical lab time becomes more effective.",
  },
  {
    question: "Can teachers evaluate student submissions?",
    answer:
      "Yes. The dashboard is designed around assignment, submission, evaluation, and reporting flows.",
  },
  {
    question: "Does it support multiple chemistry experiments?",
    answer:
      "Yes. The landing module showcases titration, spectroscopy, colorimetry, pH measurement, and water hardness workflows.",
  },
  {
    question: "Is the interface responsive and dark mode ready?",
    answer:
      "Yes. The UI uses the existing design system, Tailwind CSS, and dark-mode compatible tokens.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#home" aria-label="ChemVision home">
            <Logo size="sm" />
          </Link>
          <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
            {navItems.map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
              Login
            </Link>
            <Link href="/register" className={buttonVariants()}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section id="home" className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.16),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,transparent,rgba(249,115,22,0.06))]" />
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-5 h-7 rounded-full bg-background/60 px-3">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Virtual Chemistry Laboratory & Practical Management System
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Interactive Virtual Chemistry Laboratory
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              ChemVision helps institutions deliver chemistry practicals with guided simulations, role-based dashboards,
              structured submissions, analytics, and progress reports in one premium SaaS workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
                Get Started
              </Link>
              <Link href="/login" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-5")}>
                Login
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-2xl shadow-primary/10">
              <div className="rounded-2xl border border-border/70 bg-card/85 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Live Simulation</p>
                    <h2 className="text-xl font-semibold">Acid Base Titration</h2>
                  </div>
                  <Badge className="bg-emerald-500 text-white">Active</Badge>
                </div>
                <div className="relative grid min-h-80 place-items-center rounded-2xl border bg-muted/30">
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-10 top-8 rounded-2xl border bg-background/80 p-3 shadow-lg"
                  >
                    <Atom className="h-8 w-8 text-teal-500" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-8 right-10 rounded-2xl border bg-background/80 p-3 shadow-lg"
                  >
                    <Microscope className="h-8 w-8 text-orange-500" />
                  </motion.div>
                  <div className="relative flex h-64 w-44 items-end justify-center">
                    <div className="absolute top-0 h-40 w-4 rounded-full border border-foreground/20 bg-background shadow-inner" />
                    <motion.div
                      animate={{ height: ["28%", "62%", "28%"] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-24 w-2 rounded-full bg-teal-400"
                    />
                    <div className="absolute bottom-0 h-28 w-40 rounded-b-3xl rounded-t-lg border border-foreground/20 bg-background shadow-xl">
                      <motion.div
                        animate={{ opacity: [0.72, 1, 0.72] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute bottom-0 h-16 w-full rounded-b-3xl bg-gradient-to-t from-orange-400/80 to-orange-200/70"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="features" eyebrow="Features" title="Built for modern practical chemistry">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <MotionCard key={feature.title} index={index}>
              <CardHeader>
                <feature.icon className="mb-3 h-8 w-8 text-teal-500" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section id="experiments" eyebrow="Experiments" title="Experiment showcase">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {experiments.map((experiment, index) => (
            <MotionCard key={experiment.title} index={index} className="bg-card/80">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300">
                  <experiment.icon className="h-6 w-6" />
                </div>
                <CardTitle>{experiment.title}</CardTitle>
                <CardDescription>{experiment.description}</CardDescription>
              </CardHeader>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section id="about" eyebrow="How It Works" title="From experiment selection to progress reporting">
        <div className="grid gap-3 md:grid-cols-7">
          {workflow.map((step, index) => (
            <motion.div
              key={step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="flex min-h-28 w-full flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-sm">
                <span className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Step {index + 1}</span>
                <span className="text-sm font-semibold">{step}</span>
              </div>
              {index < workflow.length - 1 && <MoveDown className="h-5 w-5 text-muted-foreground md:rotate-[-90deg]" />}
            </motion.div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Testimonials" title="Trusted by practical-first chemistry teams">
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <MotionCard key={testimonial.name} index={index}>
              <CardContent className="pt-0">
                <div className="mb-5 flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="leading-7 text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                <div className="mt-6">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Answers for departments evaluating ChemVision">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <MotionCard key={faq.question} index={index}>
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
                <CardDescription>{faq.answer}</CardDescription>
              </CardHeader>
            </MotionCard>
          ))}
        </div>
      </Section>

      <section id="contact" className="border-t bg-muted/25">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Bring ChemVision to your laboratory program</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Start with the landing and admin dashboard modules, then extend the platform into authenticated workflows,
              real experiment content, and institution-specific reporting.
            </p>
          </div>
          <Card className="glass">
            <CardHeader>
              <Mail className="h-8 w-8 text-teal-500" />
              <CardTitle>chemvision@lab.example</CardTitle>
              <CardDescription>Institution onboarding, demos, and implementation planning.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Request Institutional Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">Copyright 2026 ChemVision. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="mb-10 max-w-3xl"
      >
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function MotionCard({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Card className={cn("h-full border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-lg", className)}>
        {children}
      </Card>
    </motion.div>
  );
}
