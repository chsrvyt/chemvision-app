"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function AuthShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <main className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-10"><div className="w-full max-w-md"><Link href="/" className="mb-8 flex justify-center"><Logo size="lg" /></Link><div className="rounded-2xl border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8"><div className="mb-6 text-center"><h1 className="text-2xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></div>{children}</div><p className="mt-6 text-center text-xs text-muted-foreground">ChemVision Virtual Chemistry Laboratory</p></div></main>;
}

export function AuthError({ message }: { message: string }) {
  return <div role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{message}</div>;
}
