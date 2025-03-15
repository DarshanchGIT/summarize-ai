"use server";

import { extractTextUsingLangchain } from "@/lib/langchain";

export async function generateSummary(serverData: {
  userId: string;
  file: {
    name: string;
    url: string;
  };
}) {
  const {
    userId,
    file: { name, url },
  } = serverData;
  try {
    const pdfText = await extractTextUsingLangchain(url);
    return pdfText;
  } catch (error: any) {
    console.log("Error parsing with Langchain", error);
  }
}
