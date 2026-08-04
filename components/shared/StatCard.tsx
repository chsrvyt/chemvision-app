"use client";

// ============================================================
// CHEMVISION — Stat Card Component
// ============================================================

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Bell,
  TrendingUp,
  TrendingDown,
  FileBarChart,
  Award,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  index?: number;
}

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Bell,
  TrendingUp,
  FileBarChart,
  Award,
};

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    gradient: "from-primary/20 to-primary/5",
  },
  secondary: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    gradient: "from-accent/20 to-accent/5",
  },
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  warning: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    gradient: "from-amber-500/20 to-amber-500/5",
  },
  danger: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    gradient: "from-red-500/20 to-red-500/5",
  },
};

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = "primary",
  index = 0,
}: StatCardProps) {
  const IconComponent = iconMap[icon] ?? LayoutDashboard;
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6",
        "hover:shadow-lg hover:shadow-primary/5 transition-all duration-300",
        "hover:border-primary/20"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          colors.gradient
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={cn(
                  "font-medium",
                  change >= 0 ? "text-emerald-500" : "text-red-500"
                )}
              >
                {change >= 0 ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            colors.bg
          )}
        >
          <IconComponent className={cn("h-6 w-6", colors.text)} />
        </div>
      </div>
    </motion.div>
  );
}
