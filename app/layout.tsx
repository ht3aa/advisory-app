import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteName = "المكتب الاستشاري — نقابة المبرمجين العراقيين";
const siteDescription =
  "الجهة المهنية للبرمجيات في العراق. استشارات تطوير الأنظمة، التحول الرقمي والحكومة الإلكترونية، تدقيق الجودة والأمن السيبراني، الخبرة الفنية والتدريب وبناء القدرات.";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "نقابة المبرمجين العراقيين",
    "المكتب الاستشاري",
    "استشارات برمجية",
    "التحول الرقمي",
    "الحكومة الإلكترونية",
    "الأمن السيبراني",
    "تدقيق الأنظمة",
    "Iraqi Programmers Syndicate",
  ],
  authors: [{ name: "Advisory Office — Iraqi Programmers Syndicate" }],
  openGraph: {
    title: siteName,
    description: siteDescription,
    locale: "ar_IQ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexArabic.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
