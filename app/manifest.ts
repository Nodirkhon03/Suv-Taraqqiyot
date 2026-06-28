import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SUV-TARAQQIYOT LLC",
    short_name: "SUV-TARAQQIYOT",
    description:
      "Hydrogeological well drilling and water supply construction in Uzbekistan since 2001.",
    start_url: "/uz",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B2B43",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/images/logo-light.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
