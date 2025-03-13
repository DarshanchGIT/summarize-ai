'use client'
import { useState } from "react";
import { TypewriterEffect } from "./typewriter-effect";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

export const UploadDiv = () => {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (<div className="flex justify-center items-center h-[50vh] p-6">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
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
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                <label className="w-full sm:max-w-md">
                    <Input
                        id="picture"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="w-full text-center border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
                        {fileName || "Choose File"}
                    </div>
                </label>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer">
                    Upload
                    <Upload size={18} />
                </Button>
            </div>
        </div>
    </div>)
}