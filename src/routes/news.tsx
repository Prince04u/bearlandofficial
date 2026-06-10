import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/lib/site-data";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import skypvp from "@/assets/mode-skypvp.jpg";
import anarchy from "@/assets/mode-anarchy.jpg";
import bedrock from "@/assets/mode-bedrock.jpg";
import bearcoin from "@/assets/bearcoin.jpg";

const COVERS: Record<string, string> = { skypvp, anarchy, bedrock, bearcoin };

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates — BearLand Network" },
      { name: "description", content: "Latest news, updates and announcements from BearLand Network." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

function News() {
  return (
    <Page>
      <PageHeader eyebrow="Blog" title="News & Updates" subtitle="Patch notes, events, and announcements from the BearLand team." />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "News" }]} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.id} to="/post/$slug" params={{ slug: p.slug }} className="group rounded-xl border border-gold/15 bg-card overflow-hidden hover:border-gold hover:-translate-y-1 transition-all">
              <div className="aspect-video overflow-hidden"><img src={COVERS[p.cover]} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" /></div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">{p.category} · <span className="text-muted-foreground">{p.date}</span></div>
                <h3 className="mt-2 font-display text-lg uppercase line-clamp-2 group-hover:text-gold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Page>
  );
}
