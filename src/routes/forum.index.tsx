import { createFileRoute, Link } from "@tanstack/react-router";
import { FORUM_CATEGORIES } from "@/lib/site-data";
import { CATEGORY_STATS, RECENT_TOPICS, TOTAL_MEMBERS, TOTAL_POSTS, TOTAL_TOPICS, MEMBERS } from "@/lib/community";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/forum/")({
  head: () => ({
    meta: [
      { title: "Форум — BearLand Network Community" },
      { name: "description", content: `Официальный форум BearLand Network: ${TOTAL_TOPICS.toLocaleString()} тем, ${TOTAL_POSTS.toLocaleString()} сообщений, ${TOTAL_MEMBERS} участников.` },
      { property: "og:title", content: "BearLand Forum" },
      { property: "og:url", content: "/forum/" },
    ],
    links: [{ rel: "canonical", href: "/forum/" }],
  }),
  component: ForumIndex,
});

function ForumIndex() {
  const newestMember = MEMBERS[MEMBERS.length - 1];
  return (
    <Page>
      <PageHeader eyebrow="Community" title="BearLand Forum" subtitle="Официальная дискуссионная площадка: новости, поддержка, обжалования и баг-репорты. Активна с 2018 года." />
      <Container className="py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Forum" }]} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Stat label="Всего тем" value={TOTAL_TOPICS.toLocaleString()} />
          <Stat label="Всего сообщений" value={TOTAL_POSTS.toLocaleString()} />
          <Stat label="Участников" value={(2_104_000 + TOTAL_MEMBERS).toLocaleString()} />
          <Stat label="Новый участник" value={newestMember.username} />
        </div>

        <div className="rounded-xl glass overflow-hidden">
          <div className="grid grid-cols-[1fr_90px_90px_200px] gap-4 px-5 py-3 border-b border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground">
            <div>Раздел</div><div className="text-center">Темы</div><div className="text-center">Посты</div><div>Последняя активность</div>
          </div>
          {FORUM_CATEGORIES.map((c) => {
            const s = CATEGORY_STATS[c.slug];
            const last = s?.lastTopic;
            return (
              <Link key={c.id} to="/forum/view/$slug" params={{ slug: c.slug }} className="grid grid-cols-[1fr_90px_90px_200px] gap-4 px-5 py-4 border-b border-border/30 hover:bg-surface-elevated/50 transition-colors items-center">
                <div>
                  <div className="font-display text-lg uppercase text-gold">{c.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.description}</div>
                </div>
                <div className="text-center text-sm">{(s?.topics ?? 0).toLocaleString()}</div>
                <div className="text-center text-sm">{(s?.posts ?? 0).toLocaleString()}</div>
                <div className="text-xs min-w-0">
                  {last && (
                    <>
                      <div className="truncate text-foreground">{last.title}</div>
                      <div className="text-muted-foreground mt-1 truncate">{last.lastReplyAuthor} · {last.lastReplyAt}</div>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl glass p-6">
            <h3 className="font-display text-xl uppercase text-gold mb-4">Последние темы</h3>
            <ul className="space-y-3">
              {RECENT_TOPICS.slice(0, 12).map((t) => (
                <li key={t.id} className="flex items-center gap-3 text-sm">
                  <Avatar name={t.author} hue={t.authorHue} size={28} />
                  <div className="min-w-0 flex-1">
                    <Link to="/forum/topic/$slug" params={{ slug: t.slug }} className="block truncate hover:text-gold">{t.title}</Link>
                    <div className="text-[11px] text-muted-foreground truncate">{t.categoryTitle} · {t.lastReplyAt}</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{t.replyCount}💬</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl glass p-6">
            <h3 className="font-display text-xl uppercase text-gold mb-4">Сообщество</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/members" className="hover:text-gold">→ Список участников ({TOTAL_MEMBERS})</Link></li>
              <li><Link to="/staff" className="hover:text-gold">→ Команда сервера</Link></li>
              <li><Link to="/search" className="hover:text-gold">→ Поиск по форуму</Link></li>
              <li><Link to="/leaderboards" className="hover:text-gold">→ Таблица лидеров</Link></li>
              <li><Link to="/news" className="hover:text-gold">→ Новости и обновления</Link></li>
              <li><Link to="/rules" className="hover:text-gold">→ Правила форума</Link></li>
            </ul>
          </div>
        </div>
      </Container>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg glass p-4">
      <div className="font-display text-2xl text-gold-gradient truncate">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
