import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS, FORUM_CATEGORIES } from "@/lib/site-data";
import { TOPICS, MEMBERS, TOPICS_BY_CATEGORY } from "@/lib/community";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/news", "/forum/", "/rules/", "/privacy/", "/terms/",
          "/gamemodes/", "/bearcoin/", "/bearprime/", "/leaderboards/",
          "/store/", "/members/", "/staff/", "/search/",
        ];
        const modes = ["skypvp", "anarchy", "bedrock", "events", "survival", "economy", "prison", "kitpvp"];

        const urls: string[] = [...staticPaths, ...modes.map((m) => `/gamemodes/${m}/`)];

        // News posts
        POSTS.forEach((p) => urls.push(`/post/${p.slug}/`));

        // Forum categories with all pages
        FORUM_CATEGORIES.forEach((c) => {
          urls.push(`/forum/view/${c.slug}/`);
          const total = (TOPICS_BY_CATEGORY[c.slug] ?? []).length;
          const pages = Math.ceil(total / 25);
          for (let p = 2; p <= pages; p++) urls.push(`/forum/view/${c.slug}/?page=${p}`);
        });

        // Every topic
        TOPICS.forEach((t) => urls.push(`/forum/topic/${t.slug}/`));

        // Every member
        MEMBERS.forEach((m) => urls.push(`/members/${m.username}/`));

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls.map((u) => `  <url><loc>${BASE_URL}${u}</loc><changefreq>weekly</changefreq></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
