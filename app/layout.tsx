import type { Metadata } from "next";
import { Mona_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "HireFlow",
  description: "HireFlow connects candidates with real recruiter interviews while providing AI-powered mock interviews, personalized feedback, and a seamless hiring experience—all in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "font-sans")}
    >
      <body className={`${monaSans.className} antialiased relative min-h-screen` }>
        <div className="absolute inset-0 pattern opacity-60 "></div>
        <div className="relative z-10">
          {children}
        </div>
        </body>
    </html>
  );
}
