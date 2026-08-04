import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export const AuthService = {
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  },
  // Other auth methods (login, register) will be added here
};
