import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import skypvp from "@/assets/mode-skypvp.jpg";
import anarchy from "@/assets/mode-anarchy.jpg";
import bedrock from "@/assets/mode-bedrock.jpg";
import bearcoin from "@/assets/bearcoin.jpg";

const MODES = [
  { slug: "skypvp", img: skypvp, title: "SkyPvP", players: 412, desc: "Floating arena combat featuring 12 unique kits, ranked ladder, and seasonal cosmetics." },
  { slug: "anarchy", img: anarchy, title: "Anarchy", players: 820, desc: "No rules. 60k×60k seamless world. Griefing, raids, alliances. Survival of the strongest." },
  { slug: "bedrock", img: bedrock, title: "Bedrock Edition", players: 612, desc: "Play from phone, console, or Windows 10 with full crossplay to the Java network." },
  { slug: "events", img: bearcoin, title: "Events", players: 240, desc: "Weekly tournaments, seasonal wars and limited-time gamemodes with massive prize pools." },
  { slug: "survival", img: bedrock, title: "Survival", players: 380, desc: "Classic vanilla+ survival with player economy, towns, claims and quarterly resets." },
  { slug: "economy", img: bearcoin, title: "Economy", players: 215, desc: "Player-driven marketplace, auction house, BearCoin trading and global stock exchange." },
  { slug: "prison", img: anarchy, title: "Prison", players: 168, desc: "Mine, rank up, escape. 32 ranks, prestige system, dynamic cell auctions." },
  { slug: "kitpvp", img: skypvp, title: "KitPvP", players: 196, desc: "Pick your kit, drop in, fight. No grinding. Pure skill-based combat." },
];

export const Route = createFileRoute("/gamemodes/")({
  head: () => ({
    meta: [
      { title: "Game Modes — BearLand Network" },
      { name: "description", content: "Explore all 8 BearLand game modes: SkyPvP, Anarchy, Bedrock, Survival, Economy, Prison, KitPvP and Events." },
    ],
    links: [{ rel: "canonical", href: "/gamemodes/" }],
  }),
  component: () => (
    <Page>
      <PageHeader eyebrow="What to play" title="Game Modes" subtitle="Eight unique experiences. One unified network. All your progress shared across modes." />
      <Container className="py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Game Modes" }]} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m) => (
            <Link key={m.slug} to="/gamemodes/$mode" params={{ mode: m.slug }} className="group rounded-xl overflow-hidden border border-gold/15 hover:border-gold hover:-translate-y-1 transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img src={m.img} alt={m.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-3 right-3 rounded-full bg-background/80 px-3 py-1 text-xs"><span className="text-neon">●</span> {m.players} online</div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl uppercase text-gold">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
                <div className="mt-4 text-xs text-gold uppercase tracking-wider">Play now →</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Page>
  ),
});
