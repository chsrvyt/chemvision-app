"use client";

// ============================================================
// CHEMVISION — Page Wrapper (Content Container)
// ============================================================

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function PageWrapper({
  children,
  className,
  title,
  description,
}: PageWrapperProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex-1 p-6 lg:p-8", className)}
    >
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-1.5 text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </motion.main>
  );
}
