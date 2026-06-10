import { createFileRoute } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";
import { LEADERBOARDS } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/leaderboards/")({
  head: () => ({
    meta: [{ title: "Leaderboards — BearLand Network" }, { name: "description", content: "Top PvP players, richest economy traders and longest playtime on BearLand Network." }],
    links: [{ rel: "canonical", href: "/leaderboards/" }],
  }),
  component: Lb,
});

function Lb() {
  const [tab, setTab] = useState<"pvp" | "economy" | "playtime">("pvp");
  const data = LEADERBOARDS[tab];

  return (
    <Page>
      <PageHeader eyebrow="Hall of Fame" title="Leaderboards" subtitle="Best of the best across all BearLand game modes. Updated in real time." />
      <Container className="py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Leaderboards" }]} />

        <div className="flex gap-2 mb-6 flex-wrap">
          {(["pvp", "economy", "playtime"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-md px-5 py-2 text-sm uppercase tracking-wider font-bold ${tab === t ? "gold-gradient text-primary-foreground" : "border border-border hover:border-gold text-muted-foreground"}`}>
              {t === "pvp" ? "Top PvP" : t === "economy" ? "Richest" : "Playtime"}
            </button>
          ))}
        </div>

        <div className="rounded-xl glass overflow-hidden">
          {data.map((row: any, i) => (
            <div key={row.name} className={`grid ${tab === "pvp" ? "grid-cols-[60px_1fr_120px_100px_120px]" : "grid-cols-[60px_1fr_1fr]"} gap-4 px-5 py-4 border-b border-border/30 items-center hover:bg-surface-elevated/50`}>
              <div className={`font-display text-2xl ${i < 3 ? "text-gold-gradient" : "text-muted-foreground"}`}>#{row.rank}</div>
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full gold-gradient shrink-0" />
                <div className="font-bold truncate">{row.name}</div>
              </div>
              {tab === "pvp" && <><div className="text-center text-sm">{row.kills.toLocaleString()} kills</div><div className="text-center text-sm text-gold">{row.kd} K/D</div><div className="text-right text-xs uppercase tracking-wider text-accent">{row.prestige}</div></>}
              {tab === "economy" && <div className="text-right font-mono text-gold">{row.balance}</div>}
              {tab === "playtime" && <div className="text-right font-mono text-gold">{row.time}</div>}
            </div>
          ))}
        </div>
      </Container>
    </Page>
  );
}
