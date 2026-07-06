import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Compass, Sparkles, User, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemberCard } from "@/components/MemberCard";
import { MemberCardSkeleton } from "@/components/Skeletons";
import { fetchAllProfiles } from "@/lib/profile";
import { AnimatedCounter, AnimatedAccordion, InView } from "@/components/core/motion-primitives";
import { DEMO_PROFILES, DEMO_STATS, DEMO_THRESHOLD } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles", "all"],
    queryFn: () => fetchAllProfiles(),
    staleTime: 1000 * 60 * 5,
  });

  // ── DEMO DATA — merge demo profiles when real count is below threshold ──
  // TODO: Remove demo data integration once real member count exceeds DEMO_THRESHOLD
  const useDemo = profiles.length < DEMO_THRESHOLD;
  const featuredProfiles = useDemo
    ? [...profiles, ...DEMO_PROFILES.filter((d) => !profiles.some((p) => p.id === d.id))]
    : profiles;
  const featured = featuredProfiles.slice(0, 6);

  // ── STATS — add demo baseline numbers when community is small ──
  // TODO: Remove demo stats once real member count exceeds DEMO_THRESHOLD
  const totalMembers = useDemo ? profiles.length + DEMO_STATS.members : profiles.length;
  const realOccupations = new Set(profiles.map((p) => p.occupation).filter(Boolean)).size;
  const realLocations = new Set(profiles.map((p) => p.location).filter(Boolean)).size;
  const totalOccupations = useDemo ? realOccupations + DEMO_STATS.occupations : realOccupations;
  const totalLocations = useDemo ? realLocations + DEMO_STATS.countries : realLocations;

  const stats = [
    { label: "Members", value: totalMembers, show: true },
    { label: "Occupations", value: totalOccupations, show: totalOccupations > 1 },
    { label: "Countries", value: totalLocations, show: totalLocations > 1 },
  ].filter((s) => s.show);

  const popularTags = useMemo(() => {
    const counts = new Map<string, { label: string; count: number; type: "occupation" | "passion" | "hobby" }>();

    featuredProfiles.forEach((p) => {
      if (p.occupation) {
        const existing = counts.get(p.occupation) || { label: p.occupation, count: 0, type: "occupation" };
        existing.count++;
        counts.set(p.occupation, existing);
      }
      p.passions.forEach((t) => {
        const existing = counts.get(t) || { label: t, count: 0, type: "passion" };
        existing.count++;
        counts.set(t, existing);
      });
      p.hobbies.forEach((t) => {
        const existing = counts.get(t) || { label: t, count: 0, type: "hobby" };
        existing.count++;
        counts.set(t, existing);
      });
    });

    return Array.from(counts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [featuredProfiles]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Dashed Top Left Fade Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, oklch(1 0 0 / 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(1 0 0 / 0.05) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `repeating-linear-gradient(to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            repeating-linear-gradient(to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            radial-gradient(ellipse 80% 70% at 0% 0%, #000 40%, transparent 85%)`,
            WebkitMaskImage: `repeating-linear-gradient(to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            repeating-linear-gradient(to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            radial-gradient(ellipse 80% 70% at 0% 0%, #000 40%, transparent 85%)`,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        
        {/* Floating Avatars */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img src="/avatar1.jpg" alt="Member" loading="eager" decoding="async" className="absolute w-16 h-16 rounded-full object-cover border-2 border-primary/30 shadow-lg animate-fly-in-1" style={{ top: '10%', right: '15%' }} />
          <img src="/avatar2.jpg" alt="Member" loading="eager" decoding="async" className="absolute w-20 h-20 rounded-full object-cover border-2 border-accent/30 shadow-lg animate-fly-in-2" style={{ top: '40%', left: '8%' }} />
          <img src="/avatar3.jpg" alt="Member" loading="eager" decoding="async" className="absolute w-14 h-14 rounded-full object-cover border-2 border-secondary-blue/30 shadow-lg animate-fly-in-3" style={{ bottom: '20%', left: '12%' }} />
          <img src="/avatar4.jpg" alt="Member" loading="eager" decoding="async" className="absolute w-12 h-12 rounded-full object-cover border-2 border-primary/30 shadow-lg animate-fly-in-4" style={{ top: '15%', left: '45%' }} />
          <img src="/avatar2.jpg" alt="Member" loading="eager" decoding="async" className="absolute w-10 h-10 rounded-full object-cover border-2 border-accent/30 shadow-lg animate-fly-in-5" style={{ bottom: '25%', right: '20%' }} />
        </div>
        
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />

        <div className="container-page relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              A living directory of people in tech
            </div>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
              Find the people
              <br />
              <span className="italic text-primary">worth knowing.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 fill-mode-both">
              Globe Tech Community is a searchable directory of developers, designers,
              founders, students and makers &mdash; sorted by what they build,
              where they live and what they care about.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both">
              <Link to="/auth" search={{ mode: "signup" }} className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-5 sm:py-3 sm:text-sm">
                Create my profile
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link to="/directory" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-6 text-base font-medium text-foreground transition-all hover:bg-surface-2 hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-5 sm:py-3 sm:text-sm">
                <Compass className="h-4 w-4" />
                Explore members
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:mt-10 sm:gap-6 animate-in fade-in duration-700 delay-500 fill-mode-both">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl text-foreground sm:text-2xl">{totalMembers}</span>
                <span>member{totalMembers === 1 ? "" : "s"}</span>
              </div>
              <div className="h-6 w-px bg-hairline" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Free, forever
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/15 to-secondary-blue/10 blur-3xl animate-pulse-slow" aria-hidden />
            <div className="relative h-[280px] lg:h-[300px] w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-4 mt-12 lg:mt-48">
              {Array.from({ length: 4 }).map((_, i) => {
                const isPlaceholder = i >= featuredProfiles.length;
                const p = isPlaceholder ? null : featuredProfiles[i];
                return (
                  <div
                    key={p ? p.id : `placeholder-${i}`}
                    className={`absolute w-full transition-all duration-300 ease-out lg:hover:-translate-y-8 lg:hover:-rotate-2 hover:z-50 animate-in fade-in slide-in-from-bottom-8 fill-mode-both lg:cursor-pointer ${i > 0 ? 'hidden lg:block' : ''}`}
                    style={{ top: `-${i * 35}px`, left: `${i * 12}px`, right: `${i * 12}px`, zIndex: 40 - i, animationDelay: `${i * 150 + 400}ms` }}
                  >
                    <div className="rounded-xl overflow-hidden bg-background shadow-[0_10px_40px_rgb(0,0,0,0.15)] ring-1 ring-hairline/50 transition-shadow lg:hover:shadow-[0_20px_50px_rgb(0,0,0,0.25)]">
                      {p ? <MemberCard profile={p} /> : <MemberCardSkeleton />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-hairline bg-surface/50">
        <div className="container-page py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-hairline text-center">
            {stats.map((stat, i) => (
              <InView
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                delay={i * 0.1}
                className="flex flex-col gap-1 py-3 sm:py-0"
              >
                <div className="font-display text-4xl sm:text-5xl text-foreground">
                  <AnimatedCounter value={stat.value} delay={i * 0.1} />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest font-mono mt-1">{stat.label}</div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page py-12 sm:py-16">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Directory</div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl">Recently joined</h2>
          </div>
          <Link to="/directory" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            View all &rarr;
          </Link>
        </div>

        {featured.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, idx) => (
              <InView
                key={p.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
                  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
                }}
                delay={idx * 0.1}
              >
                <MemberCard profile={p} />
              </InView>
            ))}
          </div>
        )}
      </section>

      {/* CATEGORIES TEASER */}
      {popularTags.length > 0 && (
        <section className="border-t border-hairline bg-surface/30">
          <div className="container-page py-12 sm:py-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-in fade-in slide-in-from-bottom-2 duration-700">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Explore</div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl">Browse by what they do.</h2>
              </div>
              <Link to="/categories" className="text-sm text-muted-foreground transition-colors hover:text-foreground mb-1">
                View all categories &rarr;
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3">
              {popularTags.map((tag, idx) => (
                <InView
                  key={tag.label + tag.type}
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  delay={idx * 0.05}
                >
                  <Link
                    to="/directory"
                    search={{ [tag.type]: tag.label } as any}
                    className="group inline-flex items-center rounded-full border border-hairline bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-surface-2 hover:border-primary/40 active:scale-[0.98]"
                  >
                    {tag.label}
                    <span className="ml-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground/70">{tag.count}</span>
                  </Link>
                </InView>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW */}
      <section className="container-page py-12 sm:py-16">
        <style>{`
          @keyframes slide-dot {
            0% { left: 0%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
        `}</style>
        <div className="relative overflow-hidden grid gap-6 rounded-2xl border border-hairline bg-surface p-6 sm:gap-8 sm:p-10 lg:grid-cols-3 lg:p-12 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <div className="absolute top-[38px] sm:top-[54px] lg:top-[60px] left-6 sm:left-10 lg:left-12 right-6 sm:right-10 lg:right-12 z-0 hidden h-px bg-hairline lg:block" aria-hidden="true">
            <div className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(var(--primary),0.8)]" style={{ animation: 'slide-dot 4s linear infinite' }} />
          </div>

          {[
            { n: "01", t: "Create a real profile", d: "Photo, what you work on, where you are, and the things you actually care about." },
            { n: "02", t: "Browse the directory", d: "Search by name, occupation, hobbies or interests. Real people, not personas." },
            { n: "03", t: "Follow who interests you", d: "One-way follow — no requests, no gatekeeping. Start conversations." },
          ].map((s, idx) => (
            <InView
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              delay={idx * 0.15}
              className="group relative z-10 flex flex-col gap-3"
            >
              <div className="inline-flex w-fit items-center justify-center rounded-full bg-surface px-4 py-1 font-mono text-xs font-medium text-primary ring-1 ring-hairline transition-colors group-hover:bg-surface-2">{s.n}</div>
              <div className="font-display text-lg sm:text-xl mt-2 transition-colors group-hover:text-primary">{s.t}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </InView>
          ))}
        </div>
      </section>

      <FAQSection />

      {/* CTA SECTION */}
      <section className="container-page pb-16 sm:pb-24 pt-4 sm:pt-8">
        <InView
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="relative overflow-hidden rounded-3xl border border-hairline bg-surface-2 p-8 sm:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">Ready to be found?</h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
              Join the directory, share what you're working on, and connect with people who share your interests. No algorithms, just people.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link to="/auth" search={{ mode: "signup" }} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-6 sm:py-3 sm:text-sm">
                Create my profile
              </Link>
              <Link to="/directory" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-hairline bg-background px-6 text-base font-medium text-foreground transition-all hover:bg-surface hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-6 sm:py-3 sm:text-sm">
                Explore members
              </Link>
            </div>
          </div>
        </InView>
      </section>

      <SiteFooter />
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
      <Link to="/auth" search={{ mode: "signup" }} className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
        Create my profile
      </Link>
    </div>
  );
}

const faqs = [
  { q: "Is Globe Tech Community free?", a: "Yes. It's completely free forever. No premium tiers, no hidden fees." },
  { q: "What happens to my profile data / who can see it?", a: "Your profile is part of a public directory. Anyone can see the information you choose to share. We never expose your email or password." },
  { q: "How is this different from LinkedIn or other social platforms?", a: "It's a directory, not a feed. There are no algorithms, no likes, and no endless scrolling. Just a place to find and be found." },
  { q: "Can I control what's visible on my profile?", a: "Absolutely. You decide exactly what to fill in. If you don't want something public, simply leave it blank." },
  { q: "How does following work?", a: "It's a one-way follow, much like bookmarking. There are no friend requests to accept. It's just a way to keep track of people you find interesting." },
  { q: "Can I remove my profile later?", a: "Yes. You have full control and can delete your profile and all associated data at any time from your settings." }
];

function FAQSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8 sm:mb-12">
          <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ FAQ</div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl">Questions, answered.</h2>
        </div>
        <AnimatedAccordion items={faqs} />
      </div>
    </section>
  );
}
