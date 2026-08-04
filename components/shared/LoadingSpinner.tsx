"use client";

// ============================================================
// CHEMVISION — Loading Spinner Component
// ============================================================

import { cn } from "@/lib/utils";
import { FlaskConical, Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "brand";
  text?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingSpinner({
  className,
  size = "md",
  variant = "spinner",
  text,
}: LoadingSpinnerProps) {
  if (variant === "brand") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          className
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
            <FlaskConical className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>
        </div>
        {text && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        className
      )}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <span className="text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
}

/**
 * Full-page loading state
 */
export function PageLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <LoadingSpinner variant="brand" text="Loading ChemVision..." />
    </div>
  );
}
