import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { Menu, X, Home, User, LogOut } from "lucide-react";
import { AnimatedBackground } from "@/components/core/animated-background";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    navigate({ to: "/" });
  };

  const navLinks = [
    { to: "/directory", label: "Directory" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 hairline-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
            </svg>
          </div>
          <span className="font-display text-[17px] font-medium tracking-tight">
            Globe Tech <span className="hidden text-muted-foreground sm:inline">Community</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <AnimatedBackground
            defaultValue={navLinks.find((l) => currentPath.startsWith(l.to))?.to || ""}
            className="rounded-md bg-surface"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
            }}
            enableHover
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-id={l.to}
                className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </AnimatedBackground>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          {loading ? null : user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="rounded-md border border-hairline px-3 py-2 text-sm text-foreground/90 transition-colors hover:bg-surface"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                Join now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="relative h-5 w-5">
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
                mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 bg-current transition-all duration-200 ease-out ${
                mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
                mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 right-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-hairline bg-background shadow-xl transition-all duration-300 ease-out md:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container-page flex flex-col py-6">
          {/* Navigation Links */}
          <div className="mb-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={closeMobileMenu}
                className="group flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground"
                activeProps={{ className: "text-foreground bg-surface/60" }}
              >
                <span className="text-lg">{l.label}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-2 h-px bg-hairline" />

          {/* Auth Section */}
          {loading ? null : user ? (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground"
              >
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-left text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/auth"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground"
              >
                <span>Sign in</span>
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={closeMobileMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition-all active:scale-[0.98] hover:opacity-90"
              >
                <span>Join now</span>
              </Link>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-8 border-t border-hairline pt-6">
            <div className="flex items-center gap-2 px-4 text-xs text-muted-foreground/70">
              <Home className="h-3.5 w-3.5" />
              <span>Globe Tech Community</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
