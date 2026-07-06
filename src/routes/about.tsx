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
      <section className="container-page max-w-3xl py-12 sm:py-16 lg:py-20">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ About</div>
        <style>{`
          @keyframes bounce-rotate-in {
            0% { opacity: 0; transform: perspective(800px) rotateX(-60deg) translateY(30px); filter: blur(8px); }
            100% { opacity: 1; transform: perspective(800px) rotateX(0deg) translateY(0); filter: blur(0); }
          }
          .animate-word {
            display: inline-block;
            opacity: 0;
            transform-origin: bottom center;
            animation: bounce-rotate-in 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        `}</style>
        <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
          {["A", "directory", "for", "the"].map((word, i) => (
            <span key={`w1-${i}`}><span className="animate-word" style={{ animationDelay: `${i * 120}ms` }}>{word}</span> </span>
          ))}
          <span className="animate-word" style={{ animationDelay: `480ms` }}>
            <span className="italic text-primary">people</span>
          </span>
          {["", "—", "not", "the", "personas."].map((word, i) => (
            <span key={`w2-${i}`}> <span className="animate-word" style={{ animationDelay: `${600 + i * 120}ms` }}>{word}</span></span>
          ))}
        </h1>
        <div className="prose prose-invert mt-8 max-w-none space-y-6 text-base leading-relaxed text-muted-foreground sm:mt-10 sm:text-lg">
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
        <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row">
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:h-auto sm:py-3"
          >
            Create my profile
          </Link>
          <Link
            to="/directory"
            className="inline-flex h-12 items-center justify-center rounded-md border border-hairline bg-surface px-5 text-sm font-medium hover:bg-surface-2 sm:h-auto sm:py-3"
          >
            Explore members
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
