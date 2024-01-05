"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "groupImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  if (value) {
    return (
      <div className="relative w-fit">
        <Image
          src={value}
          className="w-[150px] h-[150px] rounded-full"
          alt="group-image"
          width={150}
          height={150}
        />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      appearance={{
        uploadIcon: { color: "teal" },
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
        toast.error("Something went wrong uploading your image");
      }}
    />
  );
};
