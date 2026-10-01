import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [390, 640, 828, 1080, 1440, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["leaflet"],
  },
};

export default withNextIntl(nextConfig);
