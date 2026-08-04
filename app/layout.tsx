import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { GlobalProvider } from "@/components/providers/GlobalProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ChemVision — Visual Chemistry Learning Platform",
    template: "%s | ChemVision",
  },
  description:
    "Enterprise-grade chemistry practical learning platform for colleges. Digitize laboratory practicals with visual learning, experiment videos, and practical management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
