import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const StorageService = {
  // Method to upload a file and get progress (can be extended later)
  uploadFile: async (path: string, file: File): Promise<string> => {
    const storageRef = ref(storage, path);
    const uploadSnapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(uploadSnapshot.ref);
  },

  deleteFile: async (path: string): Promise<void> => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  },
};
