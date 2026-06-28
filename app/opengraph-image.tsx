import { ImageResponse } from "next/og";

import { site } from "@/lib/site";
import { siteTitle } from "@/lib/seo";

export const alt = siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAJAWAL_BOLD =
  "https://fonts.gstatic.com/s/tajawal/v12/Iurf6YBj_oCad4k1l4qkLrY.ttf";
const TAJAWAL_REGULAR =
  "https://fonts.gstatic.com/s/tajawal/v12/Iura6YBj_oCad4k1rzY.ttf";

export default async function OpenGraphImage() {
  const [tajawalBold, tajawalRegular] = await Promise.all([
    fetch(TAJAWAL_BOLD).then((res) => res.arrayBuffer()),
    fetch(TAJAWAL_REGULAR).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #073f25 0%, #0a5c36 50%, #073f25 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <div
              style={{
                display: "flex",
                fontSize: 58,
                fontWeight: 700,
                color: "#ffffff",
                fontFamily: "Tajawal",
                lineHeight: 1.15,
              }}
            >
              {site.nameAr}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 400,
                color: "rgba(255,255,255,0.72)",
                fontFamily: "Tajawal",
              }}
            >
              {site.org}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <svg viewBox="0 0 64 64" fill="none" width="112" height="112">
              <path
                d="M32 3.5 L56.7 17.75 V46.25 L32 60.5 L7.3 46.25 V17.75 Z"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M39 20 L25 44"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255,255,255,0.88)",
              fontFamily: "Tajawal",
              lineHeight: 1.4,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {`${site.orgEn} · ${site.domain}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Tajawal", data: tajawalBold, weight: 700, style: "normal" },
        { name: "Tajawal", data: tajawalRegular, weight: 400, style: "normal" },
      ],
    }
  );
}
