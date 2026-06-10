import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import skypvp from "@/assets/mode-skypvp.jpg";
import anarchy from "@/assets/mode-anarchy.jpg";
import bedrock from "@/assets/mode-bedrock.jpg";
import bearcoin from "@/assets/bearcoin.jpg";

const MODES: Record<string, { title: string; img: string; tagline: string; body: string[]; features: string[]; }> = {
  skypvp: {
    title: "SkyPvP", img: skypvp, tagline: "Combat at 200 blocks above the void.",
    body: [
      "SkyPvP — наш флагманский PvP-режим. Игроки сражаются на парящих в небе аренах, где один неверный шаг отправляет вас в пустоту. Двенадцать тщательно сбалансированных китов, четыре уникальных карты и сезонная рейтинговая лестница делают каждый матч непохожим на предыдущий.",
      "Режим работает по системе мгновенного матчмейкинга: выбираете кит, нажимаете Play и через 5 секунд уже стоите на арене. Победа приносит SR-очки и BearCoin, поражение — только опыт. Никакого риска проиграть прогресс.",
      "Каждые две недели стартует новый ранкед-сезон. Топ-100 игроков получают эксклюзивный плащ Champion, 5 000 BearCoin призовых и тег [Champion] на профиле. Сезонная статистика сохраняется навсегда.",
    ],
    features: ["12 уникальных китов", "4 ротации арен", "Ранкед-сезоны 2 недели", "Кооп 2v2 (декабрь)", "Замена кита в /lobby", "Все косметика — навсегда"],
  },
  anarchy: {
    title: "Anarchy", img: anarchy, tagline: "No rules. No mercy. Just survival.",
    body: [
      "Anarchy — режим, где нет правил, кроме античита. 60 000 × 60 000 блоков бесшовной карты, генерируемой нашей форкнутой версией TerraFork. Гриф, рейды, обман — всё разрешено. Античит BearGuard ловит читеров, а не нечестные сделки.",
      "Альянсы до 50 игроков, общие склады, командные войны с публичным таблоидом Hall of Fame. Серверная нагрузка выдерживает 800+ онлайн без падения TPS.",
      "Карта живёт минимум 6 месяцев без вайпа. История ваших баз, побед и поражений сохраняется в реплеях, которые можно посмотреть на сайте.",
    ],
    features: ["60k × 60k seamless map", "Альянсы до 50 человек", "BearGuard anti-cheat", "Insurance chests", "18 уникальных биомов", "Сервер 800+ слотов"],
  },
  bedrock: {
    title: "Bedrock Edition", img: bedrock, tagline: "Play from anywhere. Sync everywhere.",
    body: [
      "BearLand Bedrock Edition запущен в ноябре 2023 и уже собрал более 100 000 уникальных игроков. Адрес сервера bedrock.bear-land.net, порт 19132. Поддерживаются все платформы: Android, iOS, Windows 10, Xbox, PlayStation, Nintendo Switch.",
      "Кошелёк BearCoin полностью синхронизирован с Java-сетью. Купили в одной редакции — тратите в другой. Привязка аккаунтов делается одним кликом через личный кабинет.",
      "На старте доступны Survival, SkyPvP и Lobby. В декабре добавим Anarchy и KitPvP. Голосовой чат через прокси Lunar работает на всех платформах.",
    ],
    features: ["Все Bedrock-платформы", "Полный crossplay", "Единый кошелёк BC", "Touch-friendly UI", "Voice chat", "Стабильные 20 TPS"],
  },
  events: {
    title: "Events", img: bearcoin, tagline: "Limited-time chaos with massive rewards.",
    body: [
      "Каждую неделю команда BearLand запускает события: турниры, лотереи, мини-игры, сезонные баттлы. Призовые фонды доходят до 250 000 BearCoin за крупные ивенты вроде Войны Альянсов.",
      "Календарь ивентов публикуется заранее на форуме и в Discord. Подписчики BearPrime получают доступ к закрытым Prime-Only ивентам.",
    ],
    features: ["Еженедельные ивенты", "Призовые до 250k BC", "Prime-Only события", "Сезонные баттлы", "Публичный календарь", "Реплеи и стримы"],
  },
  survival: {
    title: "Survival", img: bedrock, tagline: "Classic vanilla+, the way it should be.",
    body: [
      "Survival — наш режим для тех, кто любит классику. Vanilla-механики плюс необходимые улучшения: экономика, защита территорий, города, аукцион. Никаких ОП-плагинов, никакого пэйтувина.",
      "Квартальные вайпы карты ресурсов сохраняют баланс. Города и базы переносятся между сезонами.",
    ],
    features: ["Vanilla+ механики", "Города и регионы", "Глобальный шоп", "Quarterly resource resets", "Постоянные базы", "Quest-система"],
  },
  economy: {
    title: "Economy", img: bearcoin, tagline: "The richest market in Minecraft.",
    body: [
      "Экономика BearLand — крупнейший игровой рынок в русскоязычном Minecraft. Аукцион /ah, глобальный шоп, P2P-сделки, стоковая биржа BearStock — всё для торговцев.",
      "Платежи защищены escrow-системой. Скам полностью невозможен на официальных платформах сделок.",
    ],
    features: ["Аукцион /ah", "Глобальный шоп", "BearStock биржа", "Escrow-сделки", "Налоговая система", "Лидерборды богачей"],
  },
  prison: {
    title: "Prison", img: anarchy, tagline: "Mine. Rank up. Escape. Repeat.",
    body: [
      "Классический Prison: 32 ранга, престиж, динамические аукционы клеток, кастомные энчанты. Цель — пройти все ранги, заработать миллионы BearCoin и сбежать на свободу.",
      "Каждый ранг открывает новые шахты, инструменты и привилегии. Престиж сбрасывает прогресс, но добавляет постоянные бонусы.",
    ],
    features: ["32 ранга + престиж", "Динамические клетки", "Кастомные энчанты", "Boss-mobs", "Token-shop", "PvP-арена"],
  },
  kitpvp: {
    title: "KitPvP", img: skypvp, tagline: "Pure skill. No grind.",
    body: [
      "KitPvP — без прокачки, без экономики, без отвлечений. Выбираете кит, дропаетесь на карту и сражаетесь. Победа приносит косметику и BearCoin.",
      "Карты ротируются каждые 24 часа. Лидерборды обновляются в реальном времени.",
    ],
    features: ["20+ китов", "Ротация карт 24ч", "Реал-тайм лидерборды", "1v1 дуэли", "FFA-арена", "Турнирный режим"],
  },
};

export const Route = createFileRoute("/gamemodes/$mode")({
  loader: ({ params }) => {
    const m = MODES[params.mode];
    if (!m) throw notFound();
    return { mode: params.mode, ...m };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Game Mode" }] };
    return {
      meta: [
        { title: `${loaderData.title} — BearLand Network` },
        { name: "description", content: loaderData.tagline },
        { property: "og:url", content: `/gamemodes/${loaderData.mode}/` },
      ],
      links: [{ rel: "canonical", href: `/gamemodes/${loaderData.mode}/` }],
    };
  },
  notFoundComponent: () => <Page><Container className="py-24 text-center"><h1 className="font-display text-4xl text-gold">Mode not found</h1><Link to="/gamemodes" className="text-gold mt-4 inline-block">← All modes</Link></Container></Page>,
  errorComponent: ({ reset }) => <Page><Container className="py-24 text-center"><button onClick={reset}>Retry</button></Container></Page>,
  component: ModePage,
});

function ModePage() {
  const m = Route.useLoaderData();
  return (
    <Page>
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={m.img} alt={m.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <Container className="relative h-full flex flex-col justify-end pb-14">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Game Modes", to: "/gamemodes" }, { label: m.title }]} />
          <h1 className="font-display text-5xl md:text-7xl uppercase text-gold-gradient">{m.title}</h1>
          <p className="mt-3 text-xl text-muted-foreground">{m.tagline}</p>
        </Container>
      </div>
      <Container className="py-12 grid lg:grid-cols-[1fr_300px] gap-10">
        <div className="space-y-5 text-foreground/90 leading-relaxed">
          {m.body.map((p: string, i: number) => <p key={i}>{p}</p>)}
        </div>
        <aside className="rounded-xl glass p-6">
          <h3 className="font-display text-xl uppercase text-gold mb-4">Features</h3>
          <ul className="space-y-2 text-sm">
            {m.features.map((f: string) => <li key={f} className="flex gap-2"><span className="text-gold">▸</span><span>{f}</span></li>)}
          </ul>
        </aside>
      </Container>
    </Page>
  );
}
