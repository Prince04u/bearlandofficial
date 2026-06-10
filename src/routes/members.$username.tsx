import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MEMBERS_BY_NAME, TOPICS, type Topic } from "@/lib/community";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/members/$username")({
  loader: ({ params }) => {
    const m = MEMBERS_BY_NAME[params.username.toLowerCase()];
    if (!m) throw notFound();
    const topics = TOPICS.filter((t) => t.author === m.username).slice(0, 30);
    return { m, topics };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Профиль — BearLand" }] };
    const m = loaderData.m;
    return {
      meta: [
        { title: `${m.username} — Профиль игрока BearLand` },
        { name: "description", content: `${m.username}, ${m.rank}. Зарегистрирован ${m.joined}, ${m.posts} сообщений, репутация ${m.reputation}.` },
        { property: "og:url", content: `/members/${params.username}/` },
        { property: "og:type", content: "profile" },
      ],
      links: [{ rel: "canonical", href: `/members/${params.username}/` }],
    };
  },
  notFoundComponent: () => (
    <Page><Container className="py-24 text-center"><h1 className="font-display text-4xl text-gold">Игрок не найден</h1><Link to="/members" className="text-gold mt-4 inline-block">← К списку участников</Link></Container></Page>
  ),
  errorComponent: ({ reset }) => <Page><Container className="py-24 text-center"><button onClick={reset}>Retry</button></Container></Page>,
  component: MemberView,
});

function MemberView() {
  const { m, topics } = Route.useLoaderData();
  return (
    <Page>
      <PageHeader eyebrow={m.isStaff ? "Staff" : "Игрок"} title={m.username} subtitle={m.bio ?? `${m.rank} · участник BearLand с ${m.joined}`} />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Members", to: "/members" }, { label: m.username }]} />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="rounded-xl glass p-6 text-center">
            <div className="flex justify-center mb-3"><Avatar name={m.username} hue={m.hue} size={96} /></div>
            <div className="font-display text-xl text-gold-gradient">{m.username}</div>
            {m.role && <div className="text-xs uppercase tracking-wider text-accent mt-1">{m.role}</div>}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <Stat label="Ранг" value={m.rank} />
              <Stat label="Репутация" value={String(m.reputation)} />
              <Stat label="Сообщений" value={String(m.posts)} />
              <Stat label="Тем" value={String(topics.length)} />
            </div>
            <div className="mt-4 text-[11px] text-muted-foreground">Зарегистрирован: {m.joined}</div>
          </aside>

          <div>
            <h2 className="font-display text-lg uppercase text-gold mb-3">Последние темы автора</h2>
            {topics.length === 0 && <p className="text-sm text-muted-foreground">Игрок ещё не создавал тем.</p>}
            <div className="space-y-2">
              {topics.map((t: Topic) => (
                <Link key={t.id} to="/forum/topic/$slug" params={{ slug: t.slug }} className="block rounded-lg glass p-3 hover:border-gold border border-transparent">
                  <div className="text-sm font-medium truncate">{t.title}</div>
                  <div className="text-[11px] text-muted-foreground">{t.categoryTitle} · {t.createdAt} · {t.replyCount} ответов</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface-elevated/60 p-2">
      <div className="text-gold font-bold truncate">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
