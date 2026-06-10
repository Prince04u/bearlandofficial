import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FORUM_CATEGORIES } from "@/lib/site-data";
import { TOPICS_BY_CATEGORY, CATEGORY_STATS, paginate } from "@/lib/community";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";
import { Pagination } from "@/components/Pagination";
import type { Topic } from "@/lib/community";

const PER_PAGE = 25;

export const Route = createFileRoute("/forum/view/$slug")({
  validateSearch: (s: Record<string, unknown>) => ({ page: Math.max(1, Number(s.page) || 1) }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ params, deps }) => {
    const cat = FORUM_CATEGORIES.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    const all = TOPICS_BY_CATEGORY[params.slug] ?? [];
    const stats = CATEGORY_STATS[params.slug];
    const page = paginate(all, deps.page, PER_PAGE);
    return { cat, stats, ...page };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Forum — BearLand" }] };
    const c = loaderData.cat;
    return {
      meta: [
        { title: `${c.title} (стр. ${loaderData.page}) — BearLand Forum` },
        { name: "description", content: `${c.description}. ${loaderData.total} тем в разделе.` },
        { property: "og:title", content: c.title },
        { property: "og:url", content: `/forum/view/${params.slug}/` },
      ],
      links: [{ rel: "canonical", href: `/forum/view/${params.slug}/` }],
    };
  },
  notFoundComponent: () => (
    <Page><Container className="py-24 text-center"><h1 className="font-display text-4xl text-gold">Раздел не найден</h1><Link to="/forum" className="text-gold mt-4 inline-block">← К разделам</Link></Container></Page>
  ),
  errorComponent: ({ reset }) => <Page><Container className="py-24 text-center"><button onClick={reset}>Retry</button></Container></Page>,
  component: ViewCategory,
});

function ViewCategory() {
  const { cat, items, page, pages, total, stats } = Route.useLoaderData();
  return (
    <Page>
      <PageHeader eyebrow="Forum" title={cat.title} subtitle={cat.description} />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Forum", to: "/forum" }, { label: cat.title }]} />

        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="text-muted-foreground">Страница {page} из {pages} · {total.toLocaleString()} тем · {(stats?.posts ?? 0).toLocaleString()} сообщений</div>
          <button className="rounded-md gold-gradient px-4 py-2 text-xs uppercase font-bold text-primary-foreground">+ Новая тема</button>
        </div>

        <div className="rounded-xl glass overflow-hidden">
          <div className="grid grid-cols-[1fr_70px_80px_160px] gap-4 px-5 py-3 border-b border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground">
            <div>Тема</div><div className="text-center">Ответы</div><div className="text-center">Просмотры</div><div>Последний ответ</div>
          </div>
          {items.map((t: Topic) => (
            <div key={t.id} className="grid grid-cols-[1fr_70px_80px_160px] gap-4 px-5 py-4 border-b border-border/30 hover:bg-surface-elevated/50 transition-colors items-center">
              <div className="flex items-start gap-3 min-w-0">
                <Avatar name={t.author} hue={t.authorHue} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {t.pinned && <span className="text-[10px] uppercase tracking-wider text-gold border border-gold/40 px-1.5 py-0.5 rounded">Прикреплено</span>}
                    {t.hot && <span className="text-[10px] uppercase tracking-wider text-accent border border-accent/40 px-1.5 py-0.5 rounded">Hot</span>}
                    <Link to="/forum/topic/$slug" params={{ slug: t.slug }} className="font-medium truncate hover:text-gold">{t.title}</Link>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Link to="/members/$username" params={{ username: t.author }} className="hover:text-gold">{t.author}</Link> · {t.createdAt}
                  </div>
                </div>
              </div>
              <div className="text-center text-sm">{t.replyCount}</div>
              <div className="text-center text-sm">{t.views.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground min-w-0">
                <div className="truncate">{t.lastReplyAuthor}</div>
                <div className="truncate">{t.lastReplyAt}</div>
              </div>
            </div>
          ))}
        </div>

        <Pagination page={page} pages={pages} buildSearch={(p) => ({ page: p })} />
      </Container>
    </Page>
  );
}
