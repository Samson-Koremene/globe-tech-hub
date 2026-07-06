import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemberCard } from "@/components/MemberCard";
import { MemberCardSkeleton } from "@/components/Skeletons";
import { fetchAllProfiles, fullName } from "@/lib/profile";
import { StaggeredGrid } from "@/components/core/motion-primitives";

const searchSchema = z.object({
  occupation: z.string().optional(),
  passion: z.string().optional(),
  hobby: z.string().optional(),
  tag: z.string().optional(),
});

export const Route = createFileRoute("/directory")({
  validateSearch: (s) => searchSchema.parse(s),
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
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["profiles", "filtered", search],
    queryFn: () => fetchAllProfiles(search),
    staleTime: 1000 * 60 * 5,
  });

  const [q, setQ] = useState("");

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    profiles.forEach((p) => {
      [...p.passions, ...p.hobbies].forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1));
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t);
  }, [profiles]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return profiles;
    return profiles.filter((p) => {
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
  }, [profiles, q]);

  // Determine active filter for UI
  const activeFilterKey = Object.keys(search).find((k) => search[k as keyof typeof search]);
  const activeFilterValue = activeFilterKey ? search[activeFilterKey as keyof typeof search] : null;

  const clearFilter = () => navigate({ search: {} });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <section className="flex-1 container-page py-8 sm:py-12">
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Directory</div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl">Every member of the community.</h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            {isLoading 
              ? "Loading directory..." 
              : `${profiles.length} ${profiles.length === 1 ? "person found" : "people found"}.`}
          </p>
        </div>

        {/* Search + filter */}
        <div className="mt-6 flex flex-col gap-4 sm:mt-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, role, hobby, interest…"
              className="h-12 w-full rounded-lg border border-hairline bg-surface pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary/60 sm:h-11"
            />
          </div>

          {activeFilterValue && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Showing:</span>
              <button
                onClick={clearFilter}
                className="flex items-center gap-1.5 rounded-full bg-primary/10 pl-3 pr-2 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                {activeFilterValue}
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {topTags.length > 0 && !activeFilterValue && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={clearFilter}
                className={`chip ${!search.tag ? "!bg-primary/15 !text-primary !border-primary/40" : ""}`}
              >
                All
              </button>
              {topTags.map((t) => (
                <button
                  key={t}
                  onClick={() => navigate({ search: { tag: search.tag === t ? undefined : t } })}
                  className={`chip ${search.tag === t ? "!bg-primary/15 !text-primary !border-primary/40" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <MemberCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-hairline p-10 text-center sm:p-16">
              <div className="font-display text-xl sm:text-2xl">No matches found.</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different search term or{" "}
                <button onClick={clearFilter} className="text-primary hover:underline">
                  clear the active filter
                </button>.
              </p>
            </div>
          ) : (
            <StaggeredGrid 
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              key={q + (activeFilterValue || "") + (search.tag || "")}
            >
              {filtered.map((p) => (
                <MemberCard key={p.id} profile={p} />
              ))}
            </StaggeredGrid>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
