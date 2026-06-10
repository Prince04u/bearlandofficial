import { createFileRoute, Link } from "@tanstack/react-router";
import { STAFF_MEMBERS } from "@/lib/community";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/staff/")({
  head: () => ({
    meta: [
      { title: "Команда сервера — BearLand Network" },
      { name: "description", content: "Администрация, разработчики, модераторы и команда поддержки BearLand Network." },
      { property: "og:url", content: "/staff/" },
    ],
    links: [{ rel: "canonical", href: "/staff/" }],
  }),
  component: Staff,
});

function Staff() {
  return (
    <Page>
      <PageHeader eyebrow="Network" title="Команда BearLand" subtitle="Люди, которые поддерживают сеть, разрабатывают плагины и помогают игрокам ежедневно." />
      <Container className="py-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Staff" }]} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAFF_MEMBERS.map((m) => (
            <Link key={m.username} to="/members/$username" params={{ username: m.username }} className="rounded-xl glass p-5 hover:border-gold border border-transparent transition-colors">
              <div className="flex items-center gap-3">
                <Avatar name={m.username} hue={m.hue} size={56} />
                <div>
                  <div className="font-display text-lg text-gold-gradient">{m.username}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent">{m.role}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl glass p-6 text-sm text-muted-foreground">
          Хотите присоединиться к команде? Подайте заявку на форуме в разделе{" "}
          <Link to="/forum/view/$slug" params={{ slug: "6-novosti-servera" }} className="text-gold hover:underline">«Новости сервера»</Link>{" "}
          — открытые вакансии публикуются ежемесячно.
        </div>
      </Container>
    </Page>
  );
}
