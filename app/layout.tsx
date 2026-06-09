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
  title: "Nice Cursor - Interactive Cursor Animation Library",
  description:
    "A collection of interactive cursor animations and effects built with React, Next.js, Framer Motion, and TypeScript. Smooth followers, trails, ripples, and more.",
  keywords: [
    "cursor animation",
    "react cursor",
    "framer motion cursor",
    "custom cursor",
    "cursor effects",
    "next.js cursor",
  ],
  authors: [{ name: "Ramex" }],
  openGraph: {
    title: "Nice Cursor - Interactive Cursor Animation Library",
    description:
      "A collection of interactive cursor animations and effects built with React, Next.js, and Framer Motion.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
