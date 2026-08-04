"use client";

// ============================================================
// CHEMVISION — Logo Component
// ============================================================

import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 24, text: "text-xl" },
  lg: { icon: 32, text: "text-2xl" },
};

export function Logo({ collapsed = false, className, size = "md" }: LogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary p-2 shadow-lg shadow-primary/20">
        <FlaskConical size={icon} className="text-white" strokeWidth={2.5} />
        <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-tight gradient-text leading-tight",
              text
            )}
          >
            ChemVision
          </span>
          <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
            Lab Platform
          </span>
        </div>
      )}
    </div>
  );
}
