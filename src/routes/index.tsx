import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-bearland.jpg";
import skypvp from "@/assets/mode-skypvp.jpg";
import anarchy from "@/assets/mode-anarchy.jpg";
import bedrock from "@/assets/mode-bedrock.jpg";
import bearcoin from "@/assets/bearcoin.jpg";
import { Page, Container } from "@/components/Layout";
import { POSTS, SITE } from "@/lib/site-data";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BearLand Network — Premium Minecraft Java & Bedrock Server" },
      { name: "description", content: SITE.description },
      { property: "og:title", content: "BearLand Network" },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "BearLand Network",
        url: "/",
        description: SITE.description,
      }),
    }],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to]);
  return <span>{v.toLocaleString()}{suffix}</span>;
}

function Home() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(SITE.ip); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const modes = [
    { img: skypvp, title: "SkyPvP", to: "/gamemodes/skypvp", desc: "Floating arena combat with 12 unique kits" },
    { img: anarchy, title: "Anarchy", to: "/gamemodes/anarchy", desc: "No rules. 60k×60k map. Pure chaos." },
    { img: bedrock, title: "Bedrock", to: "/gamemodes/bedrock", desc: "Play from any device with full crossplay" },
    { img: bearcoin, title: "Economy", to: "/gamemodes/economy", desc: "Player-driven marketplace & auctions" },
  ];

  return (
    <Page>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>
        <Container className="py-24 md:py-36 text-center">
          <div className="text-xs uppercase tracking-[0.5em] text-gold mb-6 animate-fade-up">Premium Minecraft Network · Est. 2018</div>
          <h1 className="font-display text-6xl md:text-8xl uppercase text-gold-gradient drop-shadow-[0_4px_20px_oklch(0.82_0.16_85_/_0.3)] animate-fade-up">
            BearLand<br />Network
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            {SITE.tagline} — Premium Minecraft Java & Bedrock Experience
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            <button onClick={copy} className="group relative rounded-md gold-gradient px-6 py-3 font-bold uppercase tracking-wider text-primary-foreground glow-gold transition-transform hover:scale-105">
              <span className="font-mono">{copied ? "✓ Copied!" : SITE.ip}</span>
            </button>
            <a href={SITE.discord} className="rounded-md border-2 border-gold px-6 py-3 font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-primary-foreground transition-all">
              Join Discord
            </a>
            <Link to="/gamemodes" className="rounded-md border border-border px-6 py-3 font-bold uppercase tracking-wider text-foreground hover:border-gold hover:text-gold transition-all">
              Explore Modes
            </Link>
          </div>

          {/* status grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Players Online", value: 2843 },
              { label: "Discord Members", value: 41280 },
              { label: "Registered Users", value: 2104821, suffix: "" },
              { label: "Uptime", value: 99, suffix: "%" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-lg p-5 animate-pulse-gold">
                <div className="font-display text-3xl md:text-4xl text-gold-gradient"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MODES */}
      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-gold">Game Modes</div>
              <h2 className="font-display text-4xl uppercase mt-2">Choose Your Adventure</h2>
            </div>
            <Link to="/gamemodes" className="text-sm text-gold hover:underline">View all →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {modes.map((m) => (
              <Link key={m.title} to={m.to} className="group relative overflow-hidden rounded-xl border border-gold/20 bg-card hover:border-gold transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={m.img} alt={m.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl uppercase text-gold">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY */}
      <section className="py-20 bg-surface/40">
        <Container>
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.4em] text-gold">Why BearLand</div>
            <h2 className="font-display text-4xl uppercase mt-2">Built for Players, by Players</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "Zero Pay-to-Win", d: "Donations only unlock cosmetics, queue priority and convenience. Game balance is sacred." },
              { t: "BearGuard Anti-Cheat", d: "Custom server-side verification. 73% fewer false bans, 4x more cheaters caught." },
              { t: "Crossplay Ready", d: "Java and Bedrock unified. Same wallet, same friends, same world." },
              { t: "Always Online", d: "99.97% uptime over the last 12 months. Dedicated bare-metal hardware." },
              { t: "Active Moderation", d: "24/7 staff across multiple timezones. Average ticket response under 10 minutes." },
              { t: "Real Community", d: "Over 2 million players. Daily events. 5+ years of legacy content." },
            ].map((f) => (
              <div key={f.t} className="rounded-xl glass p-6 hover:border-gold transition-colors">
                <div className="h-10 w-10 rounded-md gold-gradient mb-4" />
                <h3 className="font-display text-xl uppercase text-gold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* NEWS */}
      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-gold">Latest News</div>
              <h2 className="font-display text-4xl uppercase mt-2">From the BearLand Blog</h2>
            </div>
            <Link to="/news" className="text-sm text-gold hover:underline">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {POSTS.slice(0, 6).map((p) => (
              <Link key={p.id} to="/post/$slug" params={{ slug: p.slug }} className="group rounded-xl border border-gold/15 bg-card overflow-hidden hover:border-gold transition-all hover:-translate-y-1">
                <div className="aspect-video bg-surface-elevated overflow-hidden">
                  <img src={p.cover === "anarchy" ? anarchy : p.cover === "skypvp" ? skypvp : p.cover === "bedrock" ? bedrock : bearcoin} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                    <span>{p.category}</span><span>·</span><span className="text-muted-foreground">{p.date}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg uppercase line-clamp-2 group-hover:text-gold transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 glass p-12 text-center">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-gold-gradient">Ready to Join the Pack?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Over 2,800 players online right now. Your adventure starts in one click.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={copy} className="rounded-md gold-gradient px-8 py-3 font-bold uppercase text-primary-foreground glow-gold">{copied ? "✓ Copied" : `Copy IP: ${SITE.ip}`}</button>
              <Link to="/store" className="rounded-md border-2 border-gold px-8 py-3 font-bold uppercase text-gold hover:bg-gold hover:text-primary-foreground transition-all">Visit Store</Link>
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
}
