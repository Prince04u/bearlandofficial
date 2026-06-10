import { createFileRoute } from "@tanstack/react-router";
import { Page, Container, PageHeader, Breadcrumbs } from "@/components/Layout";

export const Route = createFileRoute("/terms/")({
  head: () => ({
    meta: [{ title: "Terms of Service — BearLand Network" }, { name: "description", content: "Terms of Service of BearLand Network." }],
    links: [{ rel: "canonical", href: "/terms/" }],
  }),
  component: () => (
    <Page>
      <PageHeader eyebrow="Legal" title="Terms of Service" subtitle="Last updated November 2023" />
      <Container className="py-12 max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Terms" }]} />
        <article className="space-y-6 text-foreground/90">
          <p>By connecting to BearLand Network or creating an account on our website, you agree to the following terms.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Account</h2>
          <p>You are responsible for keeping your Minecraft account secure. We are not liable for actions taken from a compromised account.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Purchases</h2>
          <p>All BearCoin and BearPrime purchases are final. Refunds are issued only in case of accidental double-charges or technical errors within 14 days.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Conduct</h2>
          <p>Cheating, exploiting, harassment and any violation of our Rules result in immediate suspension. Appeals are handled via the forum.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Intellectual property</h2>
          <p>All custom plugins, art, builds and the BearLand brand are property of BearLand Network. Minecraft is a trademark of Mojang AB. We are not affiliated with Mojang or Microsoft.</p>
          <h2 className="font-display text-2xl text-gold uppercase">Liability</h2>
          <p>The service is provided "as is". BearLand Network is not liable for any indirect damages resulting from server downtime, data loss or third-party actions.</p>
        </article>
      </Container>
    </Page>
  ),
});
