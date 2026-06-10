import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TOPICS_BY_SLUG, getReplies, paginate, TOPICS_BY_CATEGORY, type Topic, type Reply } from "@/lib/community";
import { FORUM_CATEGORIES } from "@/lib/site-data";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 15;

export const Route = createFileRoute("/forum/topic/$slug")({
  validateSearch: (s: Record<string, unknown>) => ({ page: Math.max(1, Number(s.page) || 1) }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ params, deps }) => {
    const topic = TOPICS_BY_SLUG[params.slug];
    if (!topic) throw notFound();
    const cat = FORUM_CATEGORIES.find((c) => c.slug === topic.categorySlug)!;
    const replies = getReplies(topic);
    const page = paginate(replies, deps.page, PER_PAGE);
    const related = (TOPICS_BY_CATEGORY[topic.categorySlug] ?? []).filter((t) => t.id !== topic.id).slice(0, 8);
    return { topic, cat, related, ...page };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Тема — BearLand" }] };
    const t = loaderData.topic;
    return {
      meta: [
        { title: `${t.title} — BearLand Forum` },
        { name: "description", content: `${t.title}. Обсуждение в разделе «${t.categoryTitle}», автор ${t.author}, ${t.replyCount} ответов.` },
        { property: "og:title", content: t.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/forum/topic/${params.slug}/` },
      ],
      links: [{ rel: "canonical", href: `/forum/topic/${params.slug}/` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DiscussionForumPosting",
            headline: t.title,
            datePublished: t.createdAt,
            author: { "@type": "Person", name: t.author },
            interactionStatistic: [
              { "@type": "InteractionCounter", interactionType: "https://schema.org/ViewAction", userInteractionCount: t.views },
              { "@type": "InteractionCounter", interactionType: "https://schema.org/ReplyAction", userInteractionCount: t.replyCount },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <Page><Container className="py-24 text-center"><h1 className="font-display text-4xl text-gold">Тема не найдена</h1><Link to="/forum" className="text-gold mt-4 inline-block">← К форуму</Link></Container></Page>
  ),
  errorComponent: ({ reset }) => <Page><Container className="py-24 text-center"><button onClick={reset}>Retry</button></Container></Page>,
  component: TopicView,
});

function TopicView() {
  const { topic, cat, related, items, page, pages } = Route.useLoaderData();
  return (
    <Page>
      <PageHeader eyebrow={topic.categoryTitle} title={topic.title} subtitle={`Автор: ${topic.author} · ${topic.createdAt} · ${topic.views.toLocaleString()} просмотров`} />
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Forum", to: "/forum" },
            { label: cat.title, to: `/forum/view/${cat.slug}` as any },
            { label: topic.title.slice(0, 40) + (topic.title.length > 40 ? "…" : "") },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          <div>
            <article className="rounded-xl glass p-6 mb-6">
              <header className="flex items-center gap-3 mb-4">
                <Avatar name={topic.author} hue={topic.authorHue} size={44} />
                <div>
                  <Link to="/members/$username" params={{ username: topic.author }} className="font-bold hover:text-gold">{topic.author}</Link>
                  <div className="text-xs text-muted-foreground">{topic.createdAt}</div>
                </div>
              </header>
              <div className="prose-content text-sm text-muted-foreground space-y-3">
                <p>Тема создана в разделе <Link to="/forum/view/$slug" params={{ slug: cat.slug }} className="text-gold hover:underline">{cat.title}</Link>. Просьба соблюдать <Link to="/rules" className="text-gold hover:underline">правила форума</Link> и приложить максимум информации.</p>
                <p>Все обсуждения по теме «{topic.title}» ведутся здесь. Дубли будут закрыты модерацией.</p>
              </div>
            </article>

            <h2 className="font-display text-lg uppercase text-gold mb-3">Ответы ({topic.replyCount})</h2>
            <div className="space-y-3">
              {items.map((r: Reply) => (
                <div key={r.id} className="rounded-xl glass p-4 flex gap-3">
                  <Avatar name={r.author} hue={r.authorHue} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <Link to="/members/$username" params={{ username: r.author }} className="font-bold hover:text-gold">{r.author}</Link>
                      <span className="text-muted-foreground">{r.createdAt}</span>
                    </div>
                    <p className="mt-1 text-sm">{r.body}</p>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="text-sm text-muted-foreground">Пока нет ответов. Будьте первым.</p>}
            </div>

            <Pagination page={page} pages={pages} buildSearch={(p) => ({ page: p })} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl glass p-5">
              <h3 className="font-display text-sm uppercase text-gold mb-3">Похожие темы</h3>
              <ul className="space-y-2 text-sm">
                {related.map((t: Topic) => (
                  <li key={t.id}>
                    <Link to="/forum/topic/$slug" params={{ slug: t.slug }} className="hover:text-gold line-clamp-2">{t.title}</Link>
                    <div className="text-[11px] text-muted-foreground">{t.replyCount} ответов · {t.lastReplyAt}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl glass p-5 text-sm">
              <h3 className="font-display text-sm uppercase text-gold mb-3">Информация</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Создано: <span className="text-foreground">{topic.createdAt}</span></li>
                <li>Последний ответ: <span className="text-foreground">{topic.lastReplyAt}</span></li>
                <li>Просмотров: <span className="text-foreground">{topic.views.toLocaleString()}</span></li>
                <li>Ответов: <span className="text-foreground">{topic.replyCount}</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </Page>
  );
}
