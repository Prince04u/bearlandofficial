import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { searchAll, type Topic, type Member } from "@/lib/community";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";
import { useState } from "react";

export const Route = createFileRoute("/search/")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: ({ deps }) => ({ q: deps.q, ...searchAll(deps.q) }),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.q ? `Поиск «${loaderData.q}» — BearLand` : "Поиск — BearLand Network" },
      { name: "description", content: "Поиск по форуму, темам и участникам BearLand Network." },
      { property: "og:url", content: "/search/" },
    ],
    links: [{ rel: "canonical", href: "/search/" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, topics, members } = Route.useLoaderData();
  const navigate = useNavigate({ from: "/search" });
  const [val, setVal] = useState(q);

  return (
    <Page>
      <PageHeader eyebrow="Search" title="Поиск по BearLand" subtitle="Темы, участники и обсуждения — всё в одном месте." />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { q: val } });
          }}
          className="flex gap-2 mb-8"
        >
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Поиск тем, игроков, обсуждений…"
            className="flex-1 rounded-md bg-surface-elevated border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold"
          />
          <button className="rounded-md gold-gradient px-6 py-3 text-xs uppercase font-bold text-primary-foreground">Искать</button>
        </form>

        {q && (
          <p className="text-sm text-muted-foreground mb-6">
            Найдено: {topics.length} тем, {members.length} участников по запросу «{q}».
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <section>
            <h2 className="font-display text-lg uppercase text-gold mb-3">Темы</h2>
            {topics.length === 0 && <p className="text-sm text-muted-foreground">Ничего не найдено.</p>}
            <div className="space-y-2">
              {topics.map((t: Topic) => (
                <Link key={t.id} to="/forum/topic/$slug" params={{ slug: t.slug }} className="block rounded-lg glass p-3 hover:border-gold border border-transparent">
                  <div className="text-sm font-medium truncate">{t.title}</div>
                  <div className="text-[11px] text-muted-foreground">{t.categoryTitle} · {t.author} · {t.lastReplyAt}</div>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-display text-lg uppercase text-gold mb-3">Игроки</h2>
            {members.length === 0 && <p className="text-sm text-muted-foreground">Ничего не найдено.</p>}
            <div className="grid grid-cols-2 gap-2">
              {members.map((m: Member) => (
                <Link key={m.username} to="/members/$username" params={{ username: m.username }} className="rounded-lg glass p-3 flex items-center gap-2 hover:border-gold border border-transparent">
                  <Avatar name={m.username} hue={m.hue} size={32} />
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate">{m.username}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{m.rank}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </Page>
  );
}
