import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const IPS_GREEN = "#0a5c36";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg viewBox="0 0 64 64" fill="none" width="132" height="132">
          <path
            d="M32 3.5 L56.7 17.75 V46.25 L32 60.5 L7.3 46.25 V17.75 Z"
            stroke={IPS_GREEN}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M39 20 L25 44"
            stroke={IPS_GREEN}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
