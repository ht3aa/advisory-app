import type { Metadata } from "next";

import { site } from "@/lib/site";

/** Canonical origin — set `NEXT_PUBLIC_SITE_URL` in production. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return `https://${site.domain}`;
}

export const siteTitle = `${site.nameAr} — ${site.org}`;

export const siteKeywords = [
  "نقابة المبرمجين العراقيين",
  "المكتب الاستشاري",
  "استشارات برمجية",
  "استشارات تقنية",
  "التحول الرقمي",
  "الحكومة الإلكترونية",
  "الأمن السيبراني",
  "تدقيق الأنظمة",
  "تدريب المبرمجين",
  "العراق",
  "Iraqi Programmers Syndicate",
  "Advisory Office Iraq",
  "software consulting Iraq",
] as const;

export function createRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s · ${siteTitle}`,
    },
    description: site.description,
    applicationName: site.nameAr,
    keywords: [...siteKeywords],
    authors: [{ name: `${site.nameEn} — ${site.orgEn}` }],
    creator: site.orgEn,
    publisher: site.orgEn,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      languages: {
        "ar-IQ": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: "ar_IQ",
      url: siteUrl,
      siteName: siteTitle,
      title: siteTitle,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "technology",
  };
}

export function createPageMetadata({
  title,
  description = site.description,
  path,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: `/${string}`;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = `${title} · ${siteTitle}`;

  return {
    title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: pageTitle,
      description,
      ...(path ? { url: path } : {}),
      siteName: siteTitle,
      locale: "ar_IQ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false, nocache: true } }
      : {}),
  };
}

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: siteTitle,
    alternateName: [site.nameEn, site.orgEn],
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/opengraph-image`,
    description: site.description,
    email: site.email,
    areaServed: {
      "@type": "Country",
      name: "Iraq",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baghdad",
      addressCountry: "IQ",
    },
    knowsLanguage: ["ar", "en"],
    sameAs: [site.findDeveloper.url],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.email,
      availableLanguage: ["Arabic", "English"],
    },
    serviceType: [
      "Software consulting",
      "Digital transformation",
      "Cybersecurity advisory",
      "Technical audit",
    ],
  };
}

export function webSiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteTitle,
    description: site.description,
    inLanguage: "ar-IQ",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}
