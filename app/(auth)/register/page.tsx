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
import { registerSchema } from "@/utils/validators";
import { UserRole } from "@/types";

function rolePath(role: UserRole) { return role === UserRole.ADMIN ? "/admin" : role === UserRole.TEACHER ? "/teacher" : "/student"; }

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (!loading && user?.role) router.replace(rolePath(user.role)); }, [loading, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const parsed = registerSchema.safeParse({ name, email, password, confirmPassword, role });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || "Please check the form."); return; }
    setSubmitting(true);
    try { const profile = await AuthService.register({ name: parsed.data.name, email: parsed.data.email, password: parsed.data.password, role: parsed.data.role }); router.replace(rolePath(profile.role)); }
    catch (authError) { setError(getAuthErrorMessage(authError)); }
    finally { setSubmitting(false); }
  }

  return <AuthShell title="Create your account" description="Join ChemVision and make every practical more visual."><form onSubmit={handleSubmit} className="space-y-4">{error && <AuthError message={error} />}<div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></div><div className="space-y-2"><Label htmlFor="register-email">Email address</Label><Input id="register-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="register-password">Password</Label><Input id="register-password" type="password" autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div><div className="space-y-2"><Label htmlFor="confirm-password">Confirm password</Label><Input id="confirm-password" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div></div><div className="space-y-2"><Label htmlFor="role">Account role</Label><select id="role" value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus:ring-3 focus:ring-ring/50"><option value={UserRole.STUDENT}>Student</option><option value={UserRole.TEACHER}>Teacher</option><option value={UserRole.ADMIN}>Administrator</option></select><p className="text-xs text-muted-foreground">Choose the role assigned to this account.</p></div><Button type="submit" disabled={submitting} className="w-full">{submitting ? "Creating account..." : "Create account"}</Button><p className="text-center text-sm text-muted-foreground">Already registered? <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link></p></form></AuthShell>;
}
