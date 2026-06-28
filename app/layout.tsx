import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  IBM_Plex_Mono,
  Tajawal,
} from "next/font/google";
import { AiAssistantGate } from "@/features/ai-assistant/ai-assistant";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { createRootMetadata } from "@/lib/seo";
import "./globals.css";

// Weights: 300 captions · 400 body · 500 sub-heads · 600 headlines. Never 700+.
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = createRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${plexSans.variable} ${plexArabic.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <SiteJsonLd />
        {children}
        <AiAssistantGate />
      </body>
    </html>
  );
}
