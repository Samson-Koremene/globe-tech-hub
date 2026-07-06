import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Circle, Eye, EyeOff } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/update-password")({
  head: () => ({
    meta: [
      { title: "Update Password — Globe Tech Community" },
      { name: "description", content: "Update your Globe Tech Community password." },
    ],
  }),
  component: UpdatePasswordPage,
});

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = [
    { label: "8+ characters", valid: password.length >= 8 },
    { label: "Uppercase", valid: /[A-Z]/.test(password) },
    { label: "Lowercase", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /[0-9]/.test(password) },
    { label: "Special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 text-xs space-y-1 bg-surface p-3 rounded-md border border-hairline">
      <p className="font-medium text-foreground mb-2">Password requirements:</p>
      {checks.map((c) => (
        <div key={c.label} className="flex items-center gap-2">
          {c.valid ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
          )}
          <span className={c.valid ? "text-foreground" : "text-muted-foreground"}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PasswordInput({
  value, onChange, placeholder = "Password", ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type">) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...rest}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-md border border-hairline bg-surface pl-3.5 pr-10 text-sm outline-none transition-colors focus:border-primary/60"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
      </button>
    </div>
  );
}

function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is actually in a recovery session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("You must be logged in via a reset link to update your password.");
        navigate({ to: "/auth" });
      }
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      passwordSchema.parse(password);

      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      toast.success("Password updated successfully!");
      navigate({ to: "/auth" }); // Send them back to login to verify
      await supabase.auth.signOut(); // Best practice to require fresh login
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error(err instanceof Error ? err.message : "Something went wrong");
      }
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
            / Secure Account
          </div>
          <h1 className="font-display text-2xl font-semibold mb-2">Set new password</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Please enter your new strong password below.
          </p>
          
          <form onSubmit={submit} className="space-y-4">
            <PasswordInput
              placeholder="New password"
              value={password}
              onChange={setPassword}
              required
            />
            
            <PasswordStrength password={password} />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-12 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
