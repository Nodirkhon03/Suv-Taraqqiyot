import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SUV-TARAQQIYOT",
    short_name: "SUV-TARAQQIYOT",
    description:
      "Water supply infrastructure contractor in Uzbekistan since 2001: pipelines, intake and distribution stations, water towers, civil works and wells.",
    start_url: "/uz",
    scope: "/",
    lang: "uz",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B2B43",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/images/logo-light.png", sizes: "420x350", type: "image/png" },
    ],
  };
}
