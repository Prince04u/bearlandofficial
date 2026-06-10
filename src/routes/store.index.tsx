import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";

const ITEMS = [
  { cat: "Ranks", name: "Golden Bear", price: "19.99 €", desc: "Постоянный ранг + кейсы" },
  { cat: "Ranks", name: "Diamond Bear", price: "39.99 €", desc: "Все Golden + закрытые ивенты" },
  { cat: "Ranks", name: "Mythic Bear", price: "79.99 €", desc: "Анимированный ник + pet" },
  { cat: "Crates", name: "Bronze Crate ×5", price: "4.99 €", desc: "Случайная косметика" },
  { cat: "Crates", name: "Mythic Crate ×3", price: "14.99 €", desc: "Гарантированно эпик+" },
  { cat: "Coins", name: "1 500 BearCoin", price: "4.99 €", desc: "+10% бонус" },
  { cat: "Coins", name: "8 000 BearCoin", price: "19.99 €", desc: "+25% бонус", popular: true },
  { cat: "Bundles", name: "Starter Bundle", price: "9.99 €", desc: "Ранг + 1000 BC + кейс" },
  { cat: "Bundles", name: "Champion Bundle", price: "49.99 €", desc: "Diamond + 5000 BC + 10 кейсов" },
  { cat: "Subscription", name: "BearPrime 1 мес.", price: "5.99 €", desc: "Премиум-подписка" },
  { cat: "Subscription", name: "BearPrime 6 мес.", price: "29.99 €", desc: "Скидка 17%" },
  { cat: "Subscription", name: "BearPrime 12 мес.", price: "54.99 €", desc: "Скидка 24%" },
];

export const Route = createFileRoute("/store/")({
  head: () => ({
    meta: [{ title: "Store — BearLand Network" }, { name: "description", content: "Официальный магазин BearLand Network: ранги, кейсы, BearCoin, бандлы и подписки." }],
    links: [{ rel: "canonical", href: "/store/" }],
  }),
  component: () => (
    <Page>
      <PageHeader eyebrow="Premium" title="Store" subtitle="Поддержите сервер и получите доступ к косметике, премиум-рангам и эксклюзивным предметам." />
      <Container className="py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Store" }]} />

        <div className="mb-6 rounded-xl glass p-4 text-sm text-muted-foreground">
          <span className="text-gold font-bold">⚡ Acceptance:</span> Visa, Mastercard, PayPal, Steam Wallet, Crypto (BTC/ETH/USDT), QIWI, ЮMoney, СБП.
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <div key={it.name} className={`relative rounded-xl glass p-6 ${it.popular ? "border-gold glow-gold" : ""}`}>
              {it.popular && <div className="absolute -top-3 left-6 gold-gradient text-primary-foreground px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold">Bestseller</div>}
              <div className="text-xs uppercase tracking-wider text-gold">{it.cat}</div>
              <h3 className="font-display text-xl uppercase mt-2">{it.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{it.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="font-display text-2xl text-gold-gradient">{it.price}</div>
                <button className="rounded-md gold-gradient px-4 py-2 text-xs uppercase font-bold text-primary-foreground">Buy</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl glass p-6 text-sm text-muted-foreground">
          <h3 className="font-display text-lg text-gold uppercase mb-2">Refund policy</h3>
          <p>Все покупки финальны. Возврат возможен только в случае двойного списания или технической ошибки в течение 14 дней. Подробнее в <Link to="/terms" className="text-gold hover:underline">условиях обслуживания</Link>.</p>
        </div>
      </Container>
    </Page>
  ),
});
