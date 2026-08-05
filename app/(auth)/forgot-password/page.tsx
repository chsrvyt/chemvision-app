"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthError, AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService, getAuthErrorMessage } from "@/services/auth.service";
import { forgotPasswordSchema } from "@/utils/validators";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || "Please enter a valid email."); return; }
    setSubmitting(true);
    try { await AuthService.forgotPassword(parsed.data.email); setSent(true); }
    catch (authError) { setError(getAuthErrorMessage(authError)); }
    finally { setSubmitting(false); }
  }

  return <AuthShell title="Reset your password" description="We will send a secure password reset link to your email."><form onSubmit={handleSubmit} className="space-y-4">{error && <AuthError message={error} />}{sent ? <div role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-700 dark:text-emerald-400">If an account exists for this email, a password reset link has been sent.</div> : <><div className="space-y-2"><Label htmlFor="reset-email">Email address</Label><Input id="reset-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div><Button type="submit" disabled={submitting} className="w-full">{submitting ? "Sending link..." : "Send reset link"}</Button></>}<p className="text-center text-sm text-muted-foreground"><Link href="/login" className="font-medium text-primary hover:underline">Back to sign in</Link></p></form></AuthShell>;
}
