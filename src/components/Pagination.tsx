import { Link, useRouterState } from "@tanstack/react-router";

export function Pagination({
  page,
  pages,
  buildSearch,
}: {
  page: number;
  pages: number;
  buildSearch: (p: number) => Record<string, any>;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pages <= 1) return null;
  const range: (number | "…")[] = [];
  const push = (n: number | "…") => {
    if (range[range.length - 1] !== n) range.push(n);
  };
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 2) push(i);
    else push("…");
  }
  return (
    <nav className="mt-8 flex justify-center gap-2 flex-wrap">
      {page > 1 && (
        <Link to={pathname} search={buildSearch(page - 1)} className="rounded-md px-3 py-1.5 text-sm border border-border hover:border-gold">‹ Назад</Link>
      )}
      {range.map((n, i) =>
        n === "…" ? (
          <span key={i} className="px-3 py-1.5 text-sm text-muted-foreground">…</span>
        ) : (
          <Link
            key={i}
            to={pathname}
            search={buildSearch(n)}
            className={`rounded-md px-3 py-1.5 text-sm ${n === page ? "gold-gradient text-primary-foreground font-bold" : "border border-border hover:border-gold"}`}
          >
            {n}
          </Link>
        ),
      )}
      {page < pages && (
        <Link to={pathname} search={buildSearch(page + 1)} className="rounded-md px-3 py-1.5 text-sm border border-border hover:border-gold">Вперёд ›</Link>
      )}
    </nav>
  );
}
