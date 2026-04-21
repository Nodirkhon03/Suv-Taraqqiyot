import { MetadataRoute } from "next";

// Allow all search engines including Yandex (primary search engine in Uzbekistan
// for Russian and Uzbek Cyrillic queries) and Google (primary for Latin script).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "YandexBot",
          "Yandex",
          "DuckDuckBot",
          "Applebot",
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
        ],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://suv-taraqqiyot.com/sitemap.xml",
    host: "https://suv-taraqqiyot.com",
  };
}
