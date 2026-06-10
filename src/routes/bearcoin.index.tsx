import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import bearcoinImg from "@/assets/bearcoin.jpg";

const PACKS = [
  { name: "Starter", coins: 500, price: "1.99 €", bonus: "" },
  { name: "Bronze", coins: 1_500, price: "4.99 €", bonus: "+10%" },
  { name: "Silver", coins: 3_500, price: "9.99 €", bonus: "+15%", popular: true },
  { name: "Gold", coins: 8_000, price: "19.99 €", bonus: "+25%" },
  { name: "Diamond", coins: 18_000, price: "39.99 €", bonus: "+35%" },
  { name: "Mythic", coins: 50_000, price: "99.99 €", bonus: "+50%" },
];

const RANKS = [
  { name: "Bronze Bear", req: "500 BC", perks: ["Цветной ник", "+2 /sethome", "Bronze префикс"] },
  { name: "Silver Bear", req: "2 000 BC", perks: ["Доступ к /fly в лобби", "+5 /sethome", "Silver кейс ежемесячно"] },
  { name: "Golden Bear", req: "5 000 BC", perks: ["Все Silver + золотой префикс", "Премиум-чат", "+15% XP буст"] },
  { name: "Diamond Bear", req: "12 000 BC", perks: ["Все Golden + 3 кейса", "Доступ к закрытым ивентам", "Diamond cloak"] },
  { name: "Mythic Bear", req: "30 000 BC", perks: ["Все Diamond + анимированный ник", "Mythic pet", "+25% BearCoin"] },
  { name: "Eternal Bear", req: "75 000 BC", perks: ["Все Mythic + персональный модератор", "Eternal wings", "Имя в Hall of Fame"] },
];

export const Route = createFileRoute("/bearcoin/")({
  head: () => ({
    meta: [
      { title: "BearCoin — Premium Currency of BearLand" },
      { name: "description", content: "BearCoin: премиум-валюта BearLand Network. Покупайте косметику, кейсы, ранги. Прогрессивная система наград." },
    ],
    links: [{ rel: "canonical", href: "/bearcoin/" }],
  }),
  component: () => (
    <Page>
      <PageHeader eyebrow="Economy" title="BearCoin" subtitle="Премиум-валюта BearLand Network. Покупайте косметику, открывайте кейсы, поддерживайте сервер." />
      <Container className="py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "BearCoin" }]} />

        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-center">
          <img src={bearcoinImg} alt="BearCoin" className="rounded-xl border border-gold/30" />
          <div>
            <h2 className="font-display text-3xl uppercase text-gold mb-4">Не Pay-to-Win. Pay-to-Cosmetic.</h2>
            <p className="text-muted-foreground leading-relaxed">BearCoin — это валюта, которая ускоряет получение косметики и удобства, но никогда не даёт боевого преимущества. Это наш принцип с 2018 года. Все механические бонусы (XP буст, например) доступны и обычным игрокам через гринд.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">Каждая покупка не только пополняет ваш баланс, но и приближает к постоянному рангу из 6 уровней. Ранги дают эксклюзивные префиксы, плащи и доступ к закрытым ивентам.</p>
          </div>
        </div>

        <h2 className="font-display text-3xl uppercase text-center mb-8">Пакеты BearCoin</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mb-16">
          {PACKS.map((p) => (
            <div key={p.name} className={`relative rounded-xl glass p-5 text-center ${p.popular ? "border-gold glow-gold" : ""}`}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient text-primary-foreground px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold">Popular</div>}
              <div className="text-sm uppercase tracking-wider text-muted-foreground">{p.name}</div>
              <div className="font-display text-3xl text-gold-gradient mt-2">{p.coins.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">BearCoin</div>
              {p.bonus && <div className="text-xs text-neon mt-1">{p.bonus} bonus</div>}
              <div className="mt-4 font-display text-xl">{p.price}</div>
              <Link to="/store" className="mt-3 inline-block w-full rounded-md gold-gradient px-3 py-2 text-xs uppercase font-bold text-primary-foreground">Buy</Link>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl uppercase text-center mb-8">Постоянные ранги</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RANKS.map((r, i) => (
            <div key={r.name} className="rounded-xl glass p-6">
              <div className="text-xs uppercase tracking-wider text-gold mb-2">Tier {i + 1}</div>
              <h3 className="font-display text-2xl uppercase text-gold-gradient">{r.name}</h3>
              <div className="text-sm text-muted-foreground mt-1">от {r.req} накопительно</div>
              <ul className="mt-4 space-y-2 text-sm">
                {r.perks.map((p) => <li key={p} className="flex gap-2"><span className="text-gold">✓</span>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Page>
  ),
});
