import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  webpack(config) {
    config.module.rules.unshift({
      test: /[\\/]app[\\/]globals\.css$/,
      enforce: "pre",
      use: "@tailwindcss/turbopack",
    });
    return config;
  },
};

export default nextConfig;
