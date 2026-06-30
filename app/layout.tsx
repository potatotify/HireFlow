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
  description: "HireFlow is a platform that streamlines the hiring process, making it easier for companies to find and hire the best talent efficiently.",
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
