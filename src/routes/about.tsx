import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Globe Tech Community" },
      { name: "description", content: "Globe Tech Community is a directory of the people building things in tech — designers, developers, founders, students, makers." },
      { property: "og:title", content: "About — Globe Tech Community" },
      { property: "og:description", content: "A directory of the people building things in tech." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page max-w-3xl py-20">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ About</div>
        <h1 className="mt-3 font-display text-5xl leading-tight">
          A directory for the <span className="italic text-primary">people</span> — not the personas.
        </h1>
        <div className="prose prose-invert mt-10 max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Globe Tech Community is a home for developers, designers, founders,
            students and makers to have a public profile that shows what they do,
            what they care about, and where to find them.
          </p>
          <p>
            It's a directory, not a feed. There are no algorithms, no likes,
            no metrics to grind. Just a real page for each person, and a way to
            find each other.
          </p>
          <p>
            Follows are one-way and public. If you like what someone's building,
            follow them and reach out. That's it.
          </p>
        </div>
        <div className="mt-12 flex gap-3">
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Create my profile
          </Link>
          <Link
            to="/directory"
            className="rounded-md border border-hairline bg-surface px-5 py-3 text-sm font-medium hover:bg-surface-2"
          >
            Explore members
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
