import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden hairline-t mt-24 bg-surface/30">
      {/* Dashed Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(1 0 0 / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(1 0 0 / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="container-page relative z-10 py-12 sm:py-16">
        {/* Top section with logo and links */}
        <div className="grid gap-12 sm:grid-cols-[1fr_auto_auto] lg:gap-20">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
                </svg>
              </div>
              <span className="font-display text-xl font-medium tracking-tight text-foreground/90">
                Globe Tech
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A living directory of developers, designers, founders, and makers from around the world.
            </p>
          </div>

          {/* Main Pages */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-foreground">Main Pages</h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
              <Link to="/directory" className="text-muted-foreground transition-colors hover:text-foreground">
                Directory
              </Link>
              <Link to="/categories" className="text-muted-foreground transition-colors hover:text-foreground">
                Categories
              </Link>
              <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
            </div>
          </div>

          {/* Account */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-foreground">Account</h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/auth" className="text-muted-foreground transition-colors hover:text-foreground">
                Sign in
              </Link>
              <Link 
                to="/auth" 
                search={{ mode: "signup" }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Join now
              </Link>
              <Link to="/settings" className="text-muted-foreground transition-colors hover:text-foreground">
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and links */}
        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span>© {currentYear}</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-foreground/70">Globe Tech Community</span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link to="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Twitter
            </a>
            <button className="transition-colors hover:text-foreground">
              Privacy
            </button>
            <button className="transition-colors hover:text-foreground">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
