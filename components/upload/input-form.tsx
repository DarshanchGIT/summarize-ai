"use client";

import { useState } from "react";
import { TypewriterEffect } from "./typewriter-effect";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { fileSchema } from "@/types/uploaded-file";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { generateSummary, storePdfSummary } from "@/actions/generate-summary";
import { formatFileNameToTitle } from "@/utils/format-filName";
import { useRouter } from "next/navigation";
import { RateLimit } from "@/lib/rateLimiter";
import { useAuth } from "@clerk/nextjs";

export const UploadDiv = () => {
  const { userId } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { startUpload } = useUploadThing("pdfUploader");

  // Handling file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handling form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.warning("Please upload a file first");
      return;
    }

    setLoading(true);

    // Validating file format
    const { success } = fileSchema.safeParse({ file });
    if (!success) {
      toast.error("Invalid file. Please upload a valid PDF.");
      setLoading(false);
      return;
    }

    // Rate Limiting - @upstash/redis

    if (!userId) {
      toast.error("User is not authenticated");
      setLoading(false);
      return;
    }
    const canUpload: boolean = await RateLimit(userId);
    if (!canUpload) {
      toast.error("Upload limit exceeded. Please try again later.");
      setLoading(false);
      return;
    }

    // Uploading file
    const pdfUploading = toast.loading("Uploading your PDF...🙃");
    try {
      const uploadResponse = await startUpload([file]);
      toast.dismiss(pdfUploading);

      if (!uploadResponse?.length) {
        toast.error("Upload failed. Please try again.");
        return;
      }
      const { key, serverData } = uploadResponse[0];
      if (!serverData || !key) {
        toast.error("Server response and key is unavailable");
        return;
      }

      // Generating summary
      const summaryGenerateToast = toast.loading("Generating summary...🙂");
      const res = await generateSummary(serverData);
      toast.dismiss(summaryGenerateToast);

      if (!res.success) {
        toast.error(res.message || "Failed to generate summary.");
        return;
      }

      // Storing summary
      const {
        file: { name, url },
      } = serverData;
      const title = formatFileNameToTitle(name);
      const storeResponse = await storePdfSummary({
        title: title,
        summaryText: res.summary || "",
        fileName: name,
        originalFileUrl: url,
        uploadThingKey: key,
      });

      if (
        storeResponse.response &&
        typeof storeResponse.response === "object"
      ) {
        const { id } = storeResponse.response;
        router.push(`/summaries/${id}`);
      } else {
        console.error("Invalid response format:", storeResponse.response);
      }

      toast.success("Summary generated successfully✨");
    } catch (error) {
      toast.dismiss(pdfUploading);
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[50vh] p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl p-16 space-y-6 shadow-[0px_4px_15px_rgba(220,38,38,0.4)]">
        <TypewriterEffect
          words={[
            { text: "Start" },
            { text: "Uploading" },
            { text: "your" },
            { text: "PDFs" },
          ]}
          className="text-center text-3xl font-bold"
        />
        <p className="text-center text-sm text-gray-600">
          Upload your PDF and let our AI do the magic ✨
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          onSubmit={handleSubmit}
        >
          <label className="w-full sm:max-w-md">
            <Input
              id="file"
              type="file"
              name="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-full text-center border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
              {file ? file.name : "Choose File"}
            </div>
          </label>
          <Button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-5 rounded-lg cursor-pointer min-w-[120px]"
            disabled={loading}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span>Upload</span>
                <Upload size={18} />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
