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
import { generateSummary } from "@/actions/generate-summary";

export const UploadDiv = () => {
    const [fileName, setFileName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    const { startUpload } = useUploadThing("pdfUploader", {
        onBeforeUploadBegin: (files) => files,
        onUploadBegin: (name) => console.log("Beginning upload of", name),
        onClientUploadComplete: (res) => console.log("Upload Completed.", res.length, "files uploaded"),
        onUploadProgress: (p) => console.log("onUploadProgress", p),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Extract the file from form data
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;

        // Validate the file against fileSchema
        const { success } = fileSchema.safeParse({ file });
        if (!success) {
            toast.error("Invalid file. Please upload a valid PDF.");
            setLoading(false);
            return;
        }

        // Show loading toast before upload starts
        const loadingToast = toast.loading("Hang tight, processing your PDF...");

        // Upload the file
        try {
            const res = await startUpload([file]);
            toast.dismiss(loadingToast);
            if (!res) {
                toast.error("Something went wrong. Please try again.");
                return;
            }
            // toast.success("File uploaded successfully 🎉");
            setFileName("");

            //parse the pdf and feed it to LLM
            const serverData = res[0].serverData
            console.log("ServerData:", serverData);
            const text = await generateSummary(serverData);
            console.log({ text })
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[50vh] p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
                <TypewriterEffect
                    words={[{ text: "Start" }, { text: "Uploading" }, { text: "your" }, { text: "PDFs" }]}
                    className="text-center text-3xl font-bold"
                />
                <p className="text-center text-sm text-gray-600">
                    Upload your PDF and let our AI do the magic ✨
                </p>
                <form className="flex flex-col sm:flex-row gap-4 items-center w-full" onSubmit={handleSubmit}>
                    <label className="w-full sm:max-w-md">
                        <Input id="file" type="file" name="file" className="hidden" onChange={handleFileChange} />
                        <div className="w-full text-center border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
                            {fileName || "Choose File"}
                        </div>
                    </label>
                    <Button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer min-w-[120px]"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : <><span>Upload</span><Upload size={18} /></>}
                    </Button>
                </form>
            </div>
        </div>
    );
};
