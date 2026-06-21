import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables React's <ViewTransition> + transitions during route navigation.
    viewTransition: true,
  },
};

export default nextConfig;
