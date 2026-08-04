import { useAuthContext } from "@/components/providers/AuthProvider";
import { UserRole } from "@/types";

export function useAuth() {
  const { user, firebaseUser, loading, role } = useAuthContext();
  
  return {
    user,
    firebaseUser,
    loading,
    role,
    isAuthenticated: !!user && !!firebaseUser,
    isAdmin: role === UserRole.ADMIN,
    isTeacher: role === UserRole.TEACHER,
    isStudent: role === UserRole.STUDENT,
  };
}
