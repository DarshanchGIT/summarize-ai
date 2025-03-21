"use server";

import prisma from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { extractTextUsingLangchain } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";

export type ServerData = {
  userId: string;
  file: {
    name: string;
    url: string;
  };
};

type SummaryResponse = {
  success: boolean;
  message?: string;
  summary?: string;
};

type SummaryData = {
  originalFileUrl: string;
  summaryText: string;
  title?: string;
  fileName?: string;
};

export async function generateSummary(
  serverData: ServerData
): Promise<SummaryResponse> {
  const {
    userId,
    file: { name, url },
  } = serverData;

  try {
    const pdfText = await extractTextUsingLangchain(url);
    if (!pdfText) {
      return {
        success: false,
        message: "Error parsing PDF text using Langchain",
      };
    }

    const summary = await generateSummaryFromGemini(pdfText);
    if (!summary) {
      return {
        success: false,
        message: "Error generating summary using Gemini",
      };
    }

    return {
      success: true,
      message: "Successfully generated summary out of pdf",
      summary,
    };
  } catch (error) {
    console.error("Error generating summary:", error);
    return {
      success: false,
      message: "Internal server error. Please try again later.",
    };
  }
}

export async function storePdfSummary(summaryData: SummaryData) {
  //authorize user logged in or not
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }
  if (!summaryData) {
    return {
      success: false,
      message: "Insufficient information to populate DB",
    };
  }
  const { fileName, originalFileUrl, summaryText, title } = summaryData;

  try {
    //save pdf summary
    const response = await prisma.pdfSummary.create({
      data: {
        userId: userId,
        summaryText: summaryText,
        title: title,
        originalFileUrl: originalFileUrl,
        fileName: fileName,
      },
    });
    return {
      success: true,
      message: "DB populated successfully",
      response,
    };
  } catch (error: any) {
    console.error("Error saving pdf summary:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving pdf summary",
    };
  }
}
