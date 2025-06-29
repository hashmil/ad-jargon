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
  title: "Ad Agency Jargon Translator | Transform Normal Speech into Buzzword Magic",
  description: "Transform normal business language into hilariously over-the-top advertising agency jargon. Perfect for satirising corporate speak with AI-powered buzzword generation.",
  keywords: ["ad agency", "jargon", "translator", "buzzwords", "corporate speak", "advertising", "satire"],
  authors: [{ name: "Ad Jargon Translator" }],
  openGraph: {
    title: "Ad Agency Jargon Translator",
    description: "Transform normal speech into mind-blowing agency buzzword brilliance!",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Agency Jargon Translator",
    description: "Transform normal speech into mind-blowing agency buzzword brilliance!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
