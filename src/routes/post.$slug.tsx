import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { POSTS } from "@/lib/site-data";
import { Page, Container, Breadcrumbs } from "@/components/Layout";
import skypvp from "@/assets/mode-skypvp.jpg";
import anarchy from "@/assets/mode-anarchy.jpg";
import bedrock from "@/assets/mode-bedrock.jpg";
import bearcoin from "@/assets/bearcoin.jpg";

const COVERS: Record<string, string> = { skypvp, anarchy, bedrock, bearcoin };

export const Route = createFileRoute("/post/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Post — BearLand" }] };
    return {
      meta: [
        { title: `${loaderData.title} — BearLand Network` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/post/${loaderData.slug}/` },
      ],
      links: [{ rel: "canonical", href: `/post/${loaderData.slug}/` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData.title,
          author: { "@type": "Person", name: loaderData.author },
          datePublished: loaderData.date,
          articleSection: loaderData.category,
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <Page><Container className="py-24 text-center"><h1 className="font-display text-4xl text-gold">Post not found</h1><Link to="/news" className="text-gold hover:underline mt-4 inline-block">← All news</Link></Container></Page>
  ),
  errorComponent: ({ reset }) => (
    <Page><Container className="py-24 text-center"><h1 className="font-display text-4xl text-gold">Something went wrong</h1><button onClick={reset} className="text-gold mt-4">Retry</button></Container></Page>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const related = POSTS.filter((p) => p.id !== post.id).slice(0, 3);
  const cover = COVERS[post.cover] ?? bearcoin;

  return (
    <Page>
      <article>
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <Container className="relative h-full flex flex-col justify-end pb-10">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "News", to: "/news" }, { label: post.category }]} />
            <div className="text-xs uppercase tracking-[0.4em] text-gold">{post.category}</div>
            <h1 className="font-display text-3xl md:text-5xl uppercase text-gold-gradient mt-3 max-w-4xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>By <span className="text-foreground">{post.author}</span></span>
              <span>·</span><span>{post.date}</span>
              <span>·</span><span>{post.body.length * 2} min read</span>
            </div>
          </Container>
        </div>

        <Container className="py-12 grid lg:grid-cols-[1fr_280px] gap-10">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground italic border-l-2 border-gold pl-4">{post.excerpt}</p>
            {post.body.map((para: string, i: number) => (
              <p key={i} className="mt-6 leading-relaxed text-foreground/90">{para}</p>
            ))}

            <div className="mt-10 rounded-xl glass p-6">
              <h3 className="font-display text-xl uppercase text-gold mb-3">Changelog</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {post.tags[0]}: новая основная фича</li>
                <li>• Балансные правки и фикс багов</li>
                <li>• Улучшения производительности и стабильности</li>
                <li>• Локализация интерфейса</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((t: string) => (
                <span key={t} className="rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-wider text-gold">#{t}</span>
              ))}
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <h3 className="font-display text-2xl uppercase text-gold mb-6">Comments ({Math.floor(Math.random() * 80) + 20})</h3>
              <div className="space-y-4">
                {["BearFan_22", "MineMaster", "PvPGod"].map((u, i) => (
                  <div key={u} className="rounded-lg glass p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full gold-gradient" />
                      <div className="font-bold text-sm">{u}</div>
                      <div className="text-xs text-muted-foreground">{i + 1} ч назад</div>
                    </div>
                    <p className="text-sm text-muted-foreground">Отличное обновление! Команда BearLand как всегда на высоте. Жду новых ивентов 🐻</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl glass p-5">
              <h4 className="text-xs uppercase tracking-wider text-gold mb-3">Related Posts</h4>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link to="/post/$slug" params={{ slug: r.slug }} className="text-sm hover:text-gold line-clamp-2">{r.title}</Link>
                    <div className="text-xs text-muted-foreground mt-1">{r.date}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl glass p-5">
              <h4 className="text-xs uppercase tracking-wider text-gold mb-3">Join the discussion</h4>
              <Link to="/forum" className="block rounded-md border border-gold/40 px-3 py-2 text-center text-sm text-gold hover:bg-gold hover:text-primary-foreground transition-all">Open forum</Link>
            </div>
          </aside>
        </Container>
      </article>
    </Page>
  );
}
