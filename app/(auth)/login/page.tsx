"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthError, AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AuthService, getAuthErrorMessage } from "@/services/auth.service";
import { UserRole } from "@/types";

function rolePath(role: UserRole) {
  return role === UserRole.ADMIN ? "/admin" : role === UserRole.TEACHER ? "/teacher" : "/student";
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user?.role) router.replace(rolePath(user.role));
  }, [loading, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const profile = await AuthService.login(email.trim(), password);
      router.replace(rolePath(profile.role));
    } catch (authError) {
      setError(authError instanceof Error && authError.message.startsWith("Your account") ? authError.message : getAuthErrorMessage(authError));
    } finally {
      setSubmitting(false);
    }
  }

  return <AuthShell title="Welcome back" description="Sign in to continue your chemistry learning journey."><form onSubmit={handleSubmit} className="space-y-4">{error && <AuthError message={error} />}<div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div><div className="space-y-2"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label><Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link></div><Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div><Button type="submit" disabled={submitting} className="w-full">{submitting ? "Signing in..." : "Sign in"}</Button><p className="text-center text-sm text-muted-foreground">New to ChemVision? <Link href="/register" className="font-medium text-primary hover:underline">Create an account</Link></p></form></AuthShell>;
}
