import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User, UserRole } from "@/types";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

async function keepSession() {
  await setPersistence(auth, browserLocalPersistence);
}

function profileFromCredential(credential: UserCredential): User {
  return {
    id: credential.user.uid,
    uid: credential.user.uid,
    name: credential.user.displayName || "",
    email: credential.user.email || "",
    role: UserRole.STUDENT,
    createdAt: Timestamp.now(),
    isActive: true,
  };
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const snapshot = await getDoc(doc(db, "users", uid));
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return {
    ...data,
    id: data.id || snapshot.id,
    uid: data.uid || snapshot.id,
  } as User;
}

export function getAuthErrorMessage(error: unknown): string {
  const code = typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : "";

  const messages: Record<string, string> = {
    "auth/email-already-in-use": "An account already exists for this email.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "The email or password is incorrect.",
    "auth/wrong-password": "The email or password is incorrect.",
    "auth/weak-password": "Choose a stronger password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
    "auth/configuration-not-found": "Email and password sign-in is not enabled for this Firebase project.",
    "auth/operation-not-allowed": "Email and password sign-in is not enabled for this Firebase project.",
  };

  return messages[code] || "Something went wrong. Please try again.";
}

export const AuthService = {
  register: async ({ name, email, password, role }: RegisterInput) => {
    await keepSession();
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });

    try {
      await setDoc(doc(db, "users", credential.user.uid), {
        id: credential.user.uid,
        uid: credential.user.uid,
        name,
        email: credential.user.email || email,
        role,
        createdAt: serverTimestamp(),
        isActive: true,
      });
    } catch (error) {
      await deleteUser(credential.user);
      throw error;
    }

    return { ...profileFromCredential(credential), name, email, role };
  },

  login: async (email: string, password: string) => {
    await keepSession();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await getUserProfile(credential.user.uid);

    if (!profile || !profile.role) {
      await signOut(auth);
      throw new Error("Your account profile is missing. Contact an administrator.");
    }

    return profile;
  },

  forgotPassword: async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  },

  logout: async () => {
    await signOut(auth);
  },
};
