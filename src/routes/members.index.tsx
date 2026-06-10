import { createFileRoute, Link } from "@tanstack/react-router";
import { MEMBERS, paginate, TOTAL_MEMBERS, type Member } from "@/lib/community";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 48;

export const Route = createFileRoute("/members/")({
  validateSearch: (s: Record<string, unknown>) => ({ page: Math.max(1, Number(s.page) || 1) }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ deps }) => paginate(MEMBERS, deps.page, PER_PAGE),
  head: ({ loaderData }) => ({
    meta: [
      { title: `Участники (стр. ${loaderData?.page ?? 1}) — BearLand Network` },
      { name: "description", content: `Список из ${TOTAL_MEMBERS} зарегистрированных участников сообщества BearLand Network.` },
      { property: "og:url", content: "/members/" },
    ],
    links: [{ rel: "canonical", href: "/members/" }],
  }),
  component: MembersIndex,
});

function MembersIndex() {
  const { items, page, pages, total } = Route.useLoaderData();
  return (
    <Page>
      <PageHeader eyebrow="Community" title="Участники" subtitle={`${total.toLocaleString()} зарегистрированных игроков на форуме BearLand Network.`} />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Members" }]} />
        <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
          <div>Страница {page} из {pages}</div>
          <Link to="/staff" className="text-gold hover:underline">→ Команда сервера</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((m: Member) => (
            <Link key={m.username} to="/members/$username" params={{ username: m.username }} className="rounded-xl glass p-4 flex items-center gap-3 hover:border-gold border border-transparent transition-colors">
              <Avatar name={m.username} hue={m.hue} size={44} />
              <div className="min-w-0">
                <div className="font-bold truncate">{m.username}</div>
                <div className="text-[11px] text-muted-foreground truncate">{m.rank} · {m.posts} постов</div>
              </div>
            </Link>
          ))}
        </div>
        <Pagination page={page} pages={pages} buildSearch={(p) => ({ page: p })} />
      </Container>
    </Page>
  );
}
