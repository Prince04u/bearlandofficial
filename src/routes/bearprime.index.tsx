import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";

const COMPARISON = [
  { feature: "Приоритетная очередь", free: false, prime: true },
  { feature: "Ежемесячно 1 500 BearCoin", free: false, prime: true },
  { feature: "Эксклюзивные плащи (новые каждый месяц)", free: false, prime: true },
  { feature: "+1 слот /sethome", free: false, prime: true },
  { feature: "До 12 лотов в /ah аукционе", free: false, prime: true },
  { feature: "Доступ к Prime-Only ивентам", free: false, prime: true },
  { feature: "Цветная Discord-роль Prime", free: false, prime: true },
  { feature: "Приоритет в техподдержке (<10 мин)", free: false, prime: true },
  { feature: "Доступ к публичным серверам", free: true, prime: true },
  { feature: "Сохранение прогресса", free: true, prime: true },
];

export const Route = createFileRoute("/bearprime/")({
  head: () => ({
    meta: [
      { title: "BearPrime — Premium Subscription | BearLand Network" },
      { name: "description", content: "BearPrime: премиум-подписка за 5.99 €/мес. Приоритетная очередь, ежемесячные BearCoin, эксклюзивная косметика, закрытые ивенты." },
    ],
    links: [{ rel: "canonical", href: "/bearprime/" }],
  }),
  component: () => (
    <Page>
      <PageHeader eyebrow="Premium" title="BearPrime" subtitle="Премиум-подписка нового поколения. Ежемесячная ценность вместо разовых покупок." />
      <Container className="py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "BearPrime" }]} />

        <div className="relative rounded-2xl glass border-gold/40 p-10 text-center mb-12 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/10 to-accent/5" />
          <div className="text-xs uppercase tracking-[0.4em] text-gold">Membership</div>
          <h2 className="font-display text-5xl md:text-6xl uppercase text-gold-gradient mt-3">5.99 € / месяц</h2>
          <p className="mt-3 text-muted-foreground">Без авто-продления. Вы платите вручную каждый месяц.</p>
          <Link to="/store" className="mt-6 inline-block rounded-md gold-gradient px-8 py-3 font-bold uppercase text-primary-foreground glow-gold">Subscribe</Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            { t: "Priority Queue", d: "Заходите на сервер мгновенно даже когда лобби заполнено. Особенно ценно в ивент-дни." },
            { t: "Monthly BearCoin", d: "1 500 BC сразу в первый день подписки. Тратьте на что угодно — косметика, кейсы, аукцион." },
            { t: "Exclusive Cosmetics", d: "Новые эксклюзивные плащи и эффекты каждый месяц. Остаются с вами навсегда." },
            { t: "Private Events", d: "Закрытые турниры и кооп-приключения только для Prime-подписчиков." },
            { t: "Premium Tag", d: "Цветной [PRIME] тег в игре и Discord. Уважение и узнаваемость в сообществе." },
            { t: "Fast Support", d: "Среднее время ответа модератора в Prime-канале — менее 10 минут." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl glass p-6">
              <div className="h-10 w-10 rounded-md gold-gradient mb-3" />
              <h3 className="font-display text-xl uppercase text-gold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl uppercase text-center mb-8">Free vs Prime</h2>
        <div className="rounded-xl glass overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_120px] px-5 py-3 border-b border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground">
            <div>Feature</div><div className="text-center">Free</div><div className="text-center text-gold">Prime</div>
          </div>
          {COMPARISON.map((c) => (
            <div key={c.feature} className="grid grid-cols-[1fr_120px_120px] px-5 py-3 border-b border-border/30 items-center">
              <div className="text-sm">{c.feature}</div>
              <div className="text-center">{c.free ? <span className="text-neon">✓</span> : <span className="text-muted-foreground">—</span>}</div>
              <div className="text-center">{c.prime ? <span className="text-gold">✓</span> : <span className="text-muted-foreground">—</span>}</div>
            </div>
          ))}
        </div>
      </Container>
    </Page>
  ),
});
