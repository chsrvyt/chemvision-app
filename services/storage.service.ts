import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const StorageService = {
  // Method to upload a file and get progress (can be extended later)
  uploadFile: async (path: string, file: File): Promise<string> => {
    const storageRef = ref(storage, path);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    return getDownloadURL(uploadTask.ref);
  },

  deleteFile: async (path: string): Promise<void> => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  },
};
