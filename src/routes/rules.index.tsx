import { createFileRoute } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";

export const Route = createFileRoute("/rules/")({
  head: () => ({
    meta: [
      { title: "Server Rules — BearLand Network" },
      { name: "description", content: "Official rules of the BearLand Network: chat, gameplay, PvP, exploits and account policies." },
      { property: "og:url", content: "/rules/" },
    ],
    links: [{ rel: "canonical", href: "/rules/" }],
  }),
  component: Rules,
});

const SECTIONS = [
  { title: "1. Общие правила", items: [
    "Запрещены оскорбления, угрозы и любые формы дискриминации игроков и персонала.",
    "Запрещён спам, флуд и капс в публичных чатах. Используйте /msg для приватных сообщений.",
    "Запрещена реклама сторонних серверов, проектов, Discord-серверов и социальных сетей.",
    "Никнеймы и скины должны соответствовать общим нормам приличия.",
  ]},
  { title: "2. Игровые правила", items: [
    "Запрещено использование любых читов, модов на нечестное преимущество (X-Ray, KillAura, FlyHack и т.д.).",
    "Запрещено использование багов и эксплойтов сервера. О найденных багах сообщайте на форуме.",
    "Запрещён дюп предметов любыми способами. За дюп — перманентный бан без обжалования.",
    "Запрещены боты для AFK-фарма опыта, ресурсов и валюты.",
  ]},
  { title: "3. PvP и Anarchy", items: [
    "На PvP и Anarchy режимах разрешены тимы, гриф, рейды и обман — это часть игрового процесса.",
    "Запрещено DDoS, IP-grabbing и любые атаки за пределами игры.",
    "Запрещён сговор с читерами и помощь им в нарушении правил.",
  ]},
  { title: "4. Экономика и BearCoin", items: [
    "Запрещена продажа BearCoin за реальные деньги между игроками. Только официальный магазин.",
    "Запрещён скам — обман игроков на торговле, аукционе или сделках.",
    "Запрещено накручивание PvP/опыта/статистики любыми способами.",
  ]},
  { title: "5. Наказания", items: [
    "Первичное нарушение — предупреждение или мут 1–24 ч.",
    "Повторное нарушение — бан от 1 дня до 30 дней.",
    "Использование читов, дюп, скам — бан 30 дней или перманентный.",
    "Все наказания фиксируются в системе и видны при подаче обжалования.",
  ]},
];

function Rules() {
  return (
    <Page>
      <PageHeader eyebrow="Policy" title="Server Rules" subtitle="Действующая редакция от 1 ноября 2023 года. Применяется ко всем серверам сети BearLand Network." />
      <Container className="py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Rules" }]} />
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl glass p-4">
              <div className="text-xs uppercase tracking-wider text-gold mb-3">On this page</div>
              <ul className="space-y-2 text-sm">{SECTIONS.map((s) => <li key={s.title} className="text-muted-foreground hover:text-gold">{s.title}</li>)}</ul>
            </div>
          </aside>
          <div className="space-y-8">
            {SECTIONS.map((s) => (
              <section key={s.title} className="rounded-xl glass p-6">
                <h2 className="font-display text-2xl uppercase text-gold mb-4">{s.title}</h2>
                <ul className="space-y-3 text-foreground/90">
                  {s.items.map((i, idx) => <li key={idx} className="flex gap-3"><span className="text-gold">▸</span><span>{i}</span></li>)}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Page>
  );
}
