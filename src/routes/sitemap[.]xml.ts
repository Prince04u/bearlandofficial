import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/lib/site-data";

const BASE_URL = "https://bear-land.net";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          "/",
          "/news",
          "/forum",
          "/rules",
          "/privacy",
          "/terms",
          "/gamemodes",
          "/bearcoin",
          "/bearprime",
          "/leaderboards",
          "/store",
          "/staff",
          "/gamemodes/skypvp",
          "/gamemodes/anarchy",
          "/gamemodes/bedrock",
          "/gamemodes/events",
          "/gamemodes/survival",
          "/gamemodes/economy",
          "/gamemodes/prison",
          "/gamemodes/kitpvp",
        ];

        POSTS.forEach((post) => {
          urls.push(`/post/${post.slug}`);
        });

        const today = new Date().toISOString().split("T")[0];

        const xmlUrls = urls
          .map((url) => {
            return `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
          })
          .join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

