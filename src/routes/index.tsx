import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemberCard } from "@/components/MemberCard";
import { fetchAllProfiles } from "@/lib/profile";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles", "featured"],
    queryFn: fetchAllProfiles,
  });

  const featured = profiles.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-40" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

        <div className="container-page relative grid gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              A living directory of people in tech
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Find the people
              <br />
              <span className="italic text-primary">worth knowing.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Globe Tech Community is a searchable directory of developers, designers,
              founders, students and makers &mdash; sorted by what they build,
              where they live and what they care about.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Create my profile
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-5 py-3 text-sm font-medium text-foreground hover:bg-surface-2"
              >
                <Compass className="h-4 w-4" />
                Explore members
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl text-foreground">{profiles.length}</span>
                <span>member{profiles.length === 1 ? "" : "s"}</span>
              </div>
              <div className="h-6 w-px bg-hairline" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Free, forever
              </div>
            </div>
          </div>

          {/* Right: stacked real profile cards, not a lifestyle photo */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl" aria-hidden />
            <div className="relative grid grid-cols-2 gap-3">
              {(featured.length ? featured : placeholderMembers).slice(0, 4).map((p, i) => (
                <MockProfileTile key={p.id || i} profile={p} tilt={i % 2 === 0 ? "-1deg" : "1.5deg"} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Directory</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Recently joined</h2>
          </div>
          <Link
            to="/directory"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all &rarr;
          </Link>
        </div>

        {featured.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <MemberCard key={p.id} profile={p} />
            ))}
          </div>
        )}
      </section>

      {/* HOW */}
      <section className="container-page py-16">
        <div className="grid gap-8 rounded-2xl border border-hairline bg-surface p-8 sm:p-12 lg:grid-cols-3">
          {[
            { n: "01", t: "Create a real profile", d: "Photo, what you work on, where you are, and the things you actually care about." },
            { n: "02", t: "Browse the directory", d: "Search by name, occupation, hobbies or interests. Real people, not personas." },
            { n: "03", t: "Follow who interests you", d: "One-way follow — no requests, no gatekeeping. Start conversations." },
          ].map((s) => (
            <div key={s.n} className="flex flex-col gap-3">
              <div className="font-mono text-xs text-primary">{s.n}</div>
              <div className="font-display text-xl">{s.t}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function MockProfileTile({
  profile,
  tilt,
}: {
  profile: { first_name?: string | null; last_name?: string | null; occupation?: string | null; location?: string | null; tagline?: string | null };
  tilt: string;
}) {
  const name = [profile.first_name, profile.last_name].filter(Boolean).join(" ");
  return (
    <div
      className="rounded-xl border border-hairline bg-surface-2 p-5 shadow-[0_8px_40px_-12px_rgba(37,99,235,0.25)]"
      style={{ transform: `rotate(${tilt})` }}
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary/70 to-accent/70 ring-1 ring-hairline" />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{name || "New member"}</div>
          <div className="truncate text-xs text-primary/90">{profile.occupation || "—"}</div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {profile.tagline || "Building things and meeting the people building next to me."}
      </p>
      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{profile.location || "Everywhere"}</span>
        <span className="font-mono">/{Math.floor(Math.random() * 900 + 100)}</span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-hairline p-10 text-center">
      <div className="font-display text-2xl">Be the first.</div>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        The directory is empty. Create the first profile and set the tone for the community.
      </p>
      <Link
        to="/auth"
        search={{ mode: "signup" }}
        className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Create my profile
      </Link>
    </div>
  );
}

const placeholderMembers = [
  { id: "p1", first_name: "Amara", last_name: "Okafor", occupation: "Product designer", location: "Lagos", tagline: "Designing calm tools for restless teams." },
  { id: "p2", first_name: "Diego", last_name: "Ruiz", occupation: "Backend engineer", location: "Mexico City", tagline: "Databases, distributed systems, and long walks." },
  { id: "p3", first_name: "Priya", last_name: "Shah", occupation: "Founder", location: "Bengaluru", tagline: "Building an accounting tool for freelancers." },
  { id: "p4", first_name: "Lena", last_name: "Novak", occupation: "ML student", location: "Berlin", tagline: "Learning in public. Currently: diffusion models." },
];
