import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup"]).optional(),
  next: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in — Globe Tech Community" },
      { name: "description", content: "Sign in or create your Globe Tech Community profile." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const next = search.next && search.next.startsWith("/") ? search.next : "/onboarding";
      navigate({ to: next });
    }
  }, [user, search.next, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { first_name: firstName, last_name: lastName },
          },
        });
        if (error) throw error;
        toast.success("Welcome! Let's set up your profile.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page grid min-h-[calc(100vh-4rem)] max-w-md place-items-center py-16">
        <div className="w-full">
          <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
            / {mode === "signin" ? "Sign in" : "Create account"}
          </div>
          <h1 className="mt-3 font-display text-4xl leading-tight">
            {mode === "signin" ? "Welcome back." : "Join the community."}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to your Globe Tech Community profile."
              : "A minute to sign up, five to fill out your profile."}
          </p>

          <button
            onClick={google}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-2 disabled:opacity-60"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-hairline" />
            or with email
            <div className="h-px flex-1 bg-hairline" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="First name" value={firstName} onChange={setFirstName} required />
                <Input placeholder="Last name" value={lastName} onChange={setLastName} required />
              </div>
            )}
            <Input type="email" placeholder="you@domain.com" value={email} onChange={setEmail} required />
            <Input type="password" placeholder="Password (min 6)" value={password} onChange={setPassword} required minLength={6} />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create profile"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>New here?{" "}
                <button onClick={() => setMode("signup")} className="text-primary hover:underline">Create an account</button>
              </>
            ) : (
              <>Already a member?{" "}
                <button onClick={() => setMode("signin")} className="text-primary hover:underline">Sign in</button>
              </>
            )}
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Back home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Input({
  value, onChange, ...rest
}: {
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
    />
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.7 2.5 2.5 6.7 2.5 12s4.2 9.5 9.5 9.5c5.5 0 9.1-3.8 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}
