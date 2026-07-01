import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

/**
 * Uploads an image file to Firebase Storage and returns its download URL.
 */
export async function uploadImage(file: File, folder: string = "uploads"): Promise<string> {
  if (!file) throw new Error("No file provided");

  // Clean filename to avoid issues with special characters
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const fileName = `${Date.now()}_${cleanFileName}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking can be added here if needed in the UI
      },
      (error) => {
        console.error("Error uploading image:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}
