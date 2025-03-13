"use client"
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
    return <section className="relative py-10 sm:py-14 lg:pt-18 xl:pb-0 font-sans">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl pb-12">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center px-3 py-1.5 text-sm text-gray-900 border border-gray-200 rounded-full font-pj">
                    <span>Summarize PDFs with ease</span>
                    <div className="relative ml-2 group">
                        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                        <Sparkle className="relative" />
                    </div>
                </div>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight font-pj">Get concise summaries of your PDFs instantly</h1>
                <p className="max-w-md mx-auto mt-5 text-sm leading-6 text-gray-600 font-inter">Upload your PDFs and receive clear, accurate summaries to save time and boost productivity.</p>

                <div className="relative inline-flex mt-8 group">
                    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                    <Link href="/upload">
                        <Button className="relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer">
                            Upload your PDF
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
}
