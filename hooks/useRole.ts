import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { UserRole } from "@/types";

export function useRole(requiredRole: UserRole, redirectTo: string = "/login") {
  const { user, loading, role, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
      } else if (role !== requiredRole) {
        // Redirect unauthorized users to their respective dashboards or home
        if (role === UserRole.ADMIN) router.push("/admin");
        else if (role === UserRole.TEACHER) router.push("/teacher");
        else if (role === UserRole.STUDENT) router.push("/student");
        else router.push("/");
      }
    }
  }, [loading, isAuthenticated, role, requiredRole, router, redirectTo]);

  return {
    isAuthorized: role === requiredRole,
    user,
    loading,
  };
}
