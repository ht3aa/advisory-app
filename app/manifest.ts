import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { siteTitle } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: site.nameAr,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#073f25",
    theme_color: "#0a5c36",
    lang: "ar",
    dir: "rtl",
    categories: ["business", "productivity"],
  };
}
