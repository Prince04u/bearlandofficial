import { createFileRoute } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";

export const Route = createFileRoute("/privacy/")({
  head: () => ({
    meta: [{ title: "Privacy Policy — BearLand Network" }, { name: "description", content: "Privacy Policy of BearLand Network." }],
    links: [{ rel: "canonical", href: "/privacy/" }],
  }),
  component: () => (
    <Page>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="Last updated November 2023" />
      <Container className="py-12 max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy" }]} />
        <article className="space-y-6 text-foreground/90">
          <p>BearLand Network ("we", "us") respects your privacy. This document explains what data we collect, how we use it, and your rights as a player.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Data we collect</h2>
          <p>We collect your Minecraft username, UUID, IP address, gameplay statistics (kills, deaths, playtime), chat logs (for moderation), and payment metadata when you purchase BearCoin or BearPrime.</p>
          <h2 className="font-display text-2xl text-gold uppercase">How we use data</h2>
          <p>Data is used solely to operate the service: anti-cheat enforcement, moderation, leaderboards, payment processing and account recovery. We never sell personal data to third parties.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Cookies</h2>
          <p>Our website uses essential cookies for session management. Analytics cookies are opt-in via the cookie banner.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Your rights</h2>
          <p>You may request export or deletion of your data by emailing privacy@bear-land.net. Account deletion removes all stats and forum posts within 30 days.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Children</h2>
          <p>BearLand is suitable for players aged 13+. Parents may request account closure at any time.</p>
        </article>
      </Container>
    </Page>
  ),
});
