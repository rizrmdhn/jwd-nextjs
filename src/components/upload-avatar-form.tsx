"use client";

import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "./ui/file-upload";
import React from "react";
import { globalErrorToast, globalSuccessToast } from "@/lib/toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function UploadAvatarForm() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [me] = api.auth.me.useSuspenseQuery();

  const router = useRouter();

  const { mutate } = api.user.updateFotoProfile.useMutation({
    onSuccess: () => {
      globalSuccessToast("Berhasil mengupload foto");

      router.refresh();
      // clear the files
      setTimeout(() => {
        setFiles([]);
      }, 1000);
    },
    onError: (error) => {
      globalErrorToast(error.message, "Gagal mengupload foto");
    },
  });

  const onUpload = React.useCallback(
    async (
      files: File[],
      {
        onSuccess,
        onError,
      }: {
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            // create a new FormData object
            const formData = new FormData();
            formData.append("foto", file);
            formData.append("userId", me?.id || "");

            // Send to server using mutate
            mutate(formData);

            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    [me?.id, mutate],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    globalErrorToast(message, "File Rejected");
  }, []);

  return (
    <FileUpload
      accept="image/*"
      value={files}
      onValueChange={setFiles}
      onUpload={onUpload}
      onFileReject={onFileReject}
      maxFiles={1}
      className="w-full max-w-md"
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="text-muted-foreground size-6" />
          </div>
          <p className="text-sm font-medium">
            Tarik & letakkan file di sini untuk mengupload foto profil
          </p>
          <p className="text-muted-foreground text-xs">
            Atau klik untuk memilih file (maks 1 file)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
    </FileUpload>
  );
}
