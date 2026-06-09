import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cursor Lab - Reusable Cursor Animations for React & Next.js",
  description:
    "A production-ready collection of 12+ interactive cursor animations and effects built with React, Next.js, Framer Motion, and TypeScript. Smooth followers, trails, ripples, canvas effects, and more. Copy-paste ready components with live preview.",
  keywords: [
    "cursor animation",
    "react cursor",
    "framer motion cursor",
    "custom cursor",
    "cursor effects",
    "next.js cursor",
    "tailwind cursor",
    "reusable cursor components",
  ],
  authors: [{ name: "Ramex" }],
  openGraph: {
    title: "Cursor Lab - Reusable Cursor Animations",
    description:
      "A production-ready collection of 12+ interactive cursor animations built with React, Next.js, and Framer Motion. Copy-paste ready.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
