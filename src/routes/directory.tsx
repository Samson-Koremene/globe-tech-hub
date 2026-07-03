import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemberCard } from "@/components/MemberCard";
import { fetchAllProfiles, fullName } from "@/lib/profile";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Directory — Globe Tech Community" },
      { name: "description", content: "Browse every member of Globe Tech Community. Search by name, occupation, hobbies or interests." },
      { property: "og:title", content: "Directory — Globe Tech Community" },
      { property: "og:description", content: "Browse every member of Globe Tech Community." },
    ],
  }),
  component: DirectoryPage,
});

function DirectoryPage() {
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["profiles", "all"],
    queryFn: fetchAllProfiles,
  });

  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    profiles.forEach((p) => {
      [...p.passions, ...p.hobbies].forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1));
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t);
  }, [profiles]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return profiles.filter((p) => {
      if (activeTag && !p.passions.includes(activeTag) && !p.hobbies.includes(activeTag)) return false;
      if (!term) return true;
      const hay = [
        fullName(p),
        p.occupation,
        p.location,
        p.tagline,
        ...p.passions,
        ...p.hobbies,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [profiles, q, activeTag]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container-page py-12">
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Directory</div>
          <h1 className="font-display text-4xl sm:text-5xl">Every member of the community.</h1>
          <p className="max-w-2xl text-muted-foreground">
            {profiles.length} {profiles.length === 1 ? "person" : "people"} building, designing, teaching and learning.
          </p>
        </div>

        {/* Search + filter */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, role, hobby, interest…"
              className="h-12 w-full rounded-lg border border-hairline bg-surface pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </div>
          {topTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`chip ${activeTag === null ? "!bg-primary/15 !text-primary !border-primary/40" : ""}`}
              >
                All
              </button>
              {topTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(activeTag === t ? null : t)}
                  className={`chip ${activeTag === t ? "!bg-primary/15 !text-primary !border-primary/40" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-52 animate-pulse rounded-xl border border-hairline bg-surface" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-hairline p-16 text-center">
              <div className="font-display text-2xl">No matches.</div>
              <p className="mt-2 text-sm text-muted-foreground">Try a different search term or clear the filter.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <MemberCard key={p.id} profile={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
