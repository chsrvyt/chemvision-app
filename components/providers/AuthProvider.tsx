"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { User, UserRole } from "@/types";
import { getUserProfile } from "@/services/auth.service";

async function loadProfileWithRetry(uid: string, attempts = 3): Promise<User | null> {
  const profile = await getUserProfile(uid);
  if (profile || attempts <= 1) return profile;

  await new Promise((resolve) => setTimeout(resolve, 100));
  return loadProfileWithRetry(uid, attempts - 1);
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  role: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (cancelled) return;

      setFirebaseUser(currUser);
      setLoading(true);

      if (!currUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      void loadProfileWithRetry(currUser.uid)
        .then((profile) => {
          if (!cancelled) setUser(profile);
        })
        .catch((error) => {
          if (!cancelled) {
            console.error("Error fetching user profile:", error);
            setUser(null);
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    firebaseUser,
    loading,
    role: user?.role || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
