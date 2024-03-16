import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "basic-antelope-968.convex.cloud" },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
