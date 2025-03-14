import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Summarize",
  description: "Summarize is an app for summarizing PDF Documents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fontSans.variable} font-sans antialiased`}
          style={{ fontFamily: "var(--font-sans), sans-serif" }}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
