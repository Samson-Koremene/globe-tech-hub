import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Globe Tech Community" },
      { name: "description", content: "Reset your Globe Tech Community password." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!z.string().email().safeParse(email).success) {
        throw new Error("Invalid email format");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      
      if (error) throw error;
      
      setSuccess(true);
      toast.success("Password reset email sent!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <section className="flex-1 container-page flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-hairline shadow-sm">
          <div className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
            / Reset password
          </div>
          <h1 className="font-display text-2xl font-semibold mb-2">Forgot your password?</h1>
          
          {success ? (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-6">
                If an account exists for <span className="font-medium text-foreground">{email}</span>, you will receive a password reset email shortly. Please check your inbox.
              </p>
              <Link to="/auth" className="flex h-12 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                Return to sign in
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={submit} className="space-y-4">
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 w-full rounded-md border border-hairline bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity"
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </form>
              <div className="mt-6 text-center text-xs text-muted-foreground">
                <Link to="/auth" className="transition-colors hover:text-foreground">← Back to sign in</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
