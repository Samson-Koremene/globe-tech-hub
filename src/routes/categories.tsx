import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchAllProfiles } from "@/lib/profile";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Globe Tech Community" },
      { name: "description", content: "Browse Globe Tech Community members by occupation, passion and hobby." },
      { property: "og:title", content: "Categories — Globe Tech Community" },
      { property: "og:description", content: "Browse members by occupation, passion and hobby." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles", "all"],
    queryFn: fetchAllProfiles,
  });

  const groups = useMemo(() => {
    const occ = new Map<string, number>();
    const pas = new Map<string, number>();
    const hob = new Map<string, number>();
    profiles.forEach((p) => {
      if (p.occupation) occ.set(p.occupation, (occ.get(p.occupation) ?? 0) + 1);
      p.passions.forEach((t) => pas.set(t, (pas.get(t) ?? 0) + 1));
      p.hobbies.forEach((t) => hob.set(t, (hob.get(t) ?? 0) + 1));
    });
    const sort = (m: Map<string, number>) => Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
    return { occupations: sort(occ), passions: sort(pas), hobbies: sort(hob) };
  }, [profiles]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-12">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Categories</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">By what they do & love.</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Categories emerge organically from what members put on their profiles.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <Group title="Occupations" items={groups.occupations} />
          <Group title="Passions" items={groups.passions} />
          <Group title="Hobbies" items={groups.hobbies} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Group({ title, items }: { title: string; items: [string, number][] }) {
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between hairline-b pb-2">
        <h2 className="font-display text-xl">{title}</h2>
        <span className="font-mono text-xs text-muted-foreground">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground">None yet.</div>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {items.map(([label, count]) => (
            <li key={label}>
              <Link
                to="/directory"
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/90 hover:bg-surface"
              >
                <span>{label}</span>
                <span className="font-mono text-xs text-muted-foreground">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
