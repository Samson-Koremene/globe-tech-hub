import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="hairline-t mt-24">
      <div className="container-page flex flex-col gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-display text-foreground">Globe Tech Community</span>
          <span className="mx-2 text-muted-foreground/40">/</span>
          <span>A directory of people building things.</span>
        </div>
        <div className="flex gap-5">
          <Link to="/directory" className="hover:text-foreground">Directory</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/auth" className="hover:text-foreground">Sign in</Link>
        </div>
      </div>
    </footer>
  );
}
