import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything is public except the form endpoint. AI crawlers are named so the permission is
// explicit rather than inherited from the wildcard (GEO: answer engines may cite the site).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
          "DuckAssistBot",
          "meta-externalagent",
          "YandexAdditional",
          "YandexBot",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
