import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ad-jargon-translator.pages.dev'),
  title: "Ad Agency Jargon Translator | Transform Normal Speech into Buzzword Magic",
  description: "Transform normal business language into hilariously over-the-top advertising agency jargon. Perfect for satirising corporate speak with AI-powered buzzword generation.",
  keywords: ["ad agency", "jargon", "translator", "buzzwords", "corporate speak", "advertising", "satire"],
  authors: [{ name: "Ad Jargon Translator" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "Ad Agency Jargon Translator",
    description: "Transform normal speech into mind-blowing agency buzzword brilliance!",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Ad Agency Jargon Translator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Agency Jargon Translator",
    description: "Transform normal speech into mind-blowing agency buzzword brilliance!",
    images: ["/web-app-manifest-512x512.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
