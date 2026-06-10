import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/bearland-logo.png";
import { SITE } from "@/lib/site-data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/gamemodes", label: "Game Modes" },
  { to: "/bearcoin", label: "BearCoin" },
  { to: "/bearprime", label: "BearPrime" },
  { to: "/forum", label: "Forum" },
  { to: "/members", label: "Members" },
  { to: "/staff", label: "Staff" },
  { to: "/leaderboards", label: "Top" },
  { to: "/store", label: "Store" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="BearLand Network" width={44} height={44} className="drop-shadow-[0_0_12px_oklch(0.82_0.16_85_/_0.5)] group-hover:rotate-3 transition-transform" />
          <div className="leading-tight">
            <div className="font-display text-lg uppercase tracking-wider text-gold-gradient">BearLand</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Network</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm uppercase tracking-wide text-muted-foreground hover:text-gold transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm uppercase tracking-wide text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={SITE.discord} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center rounded-md border border-gold/40 px-3 py-2 text-xs uppercase tracking-wider text-gold hover:bg-gold hover:text-primary-foreground transition-all">
            Discord
          </a>
          <Link to="/store" className="inline-flex items-center rounded-md gold-gradient px-4 py-2 text-xs uppercase tracking-wider font-bold text-primary-foreground hover:opacity-90 transition-all glow-gold">
            Play Now
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/20 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={40} height={40} />
            <div className="font-display text-lg uppercase text-gold-gradient">BearLand</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Premium Minecraft Java & Bedrock network since 2018. Over 2 million unique players.
          </p>
          <div className="mt-4 rounded-md glass p-3 text-xs">
            <div className="text-muted-foreground">Java IP</div>
            <div className="font-mono text-gold">{SITE.ip}</div>
            <div className="text-muted-foreground mt-2">Bedrock</div>
            <div className="font-mono text-gold">{SITE.bedrockIp}:{SITE.bedrockPort}</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gold mb-3">Network</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/gamemodes" className="hover:text-gold">Game Modes</Link></li>
            <li><Link to="/bearcoin" className="hover:text-gold">BearCoin Economy</Link></li>
            <li><Link to="/bearprime" className="hover:text-gold">BearPrime</Link></li>
            <li><Link to="/leaderboards" className="hover:text-gold">Leaderboards</Link></li>
            <li><Link to="/store" className="hover:text-gold">Store</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gold mb-3">Community</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/forum" className="hover:text-gold">Forum</Link></li>
            <li><Link to="/members" className="hover:text-gold">Members</Link></li>
            <li><Link to="/staff" className="hover:text-gold">Staff</Link></li>
            <li><Link to="/search" className="hover:text-gold">Search</Link></li>
            <li><Link to="/news" className="hover:text-gold">News</Link></li>
            <li><a href={SITE.discord} className="hover:text-gold">Discord</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/terms" className="hover:text-gold">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/rules" className="hover:text-gold">Server Rules</Link></li>
          </ul>
          <p className="mt-6 text-xs text-muted-foreground/70">
            Not affiliated with Mojang or Microsoft. Minecraft is a trademark of Mojang AB.
          </p>
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © 2018–{new Date().getFullYear()} BearLand Network. All rights reserved.
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 ${className}`}>{children}</div>;
}

export function PageHeader({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-gold/20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gold/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {eyebrow && <div className="text-xs uppercase tracking-[0.4em] text-gold mb-3">{eyebrow}</div>}
        <h1 className="font-display text-4xl md:text-6xl uppercase text-gold-gradient">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="text-xs text-muted-foreground mb-6 flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {it.to ? <Link to={it.to} className="hover:text-gold">{it.label}</Link> : <span className="text-gold">{it.label}</span>}
          {i < items.length - 1 && <span>›</span>}
        </span>
      ))}
    </nav>
  );
}
