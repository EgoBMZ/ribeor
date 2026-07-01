"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "../lib/firebase/storage";

interface ImageUploadButtonProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUploadButton({ onUploadSuccess, folder = "uploads", label = "Añadir Imagen" }: ImageUploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, folder);
      onUploadSuccess(url);
    } catch (error) {
      alert("Error al subir la imagen. Revisa la consola.");
      console.error(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  return (
    <div className="inline-block">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary hover:bg-border-color text-text-primary text-sm font-semibold transition-colors disabled:opacity-50"
        title="Subir imagen a Firebase Storage"
      >
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
        {uploading ? "Subiendo..." : label}
      </button>
    </div>
  );
}
