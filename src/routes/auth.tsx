import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Check, Circle, Eye, EyeOff } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup"]).optional(),
  next: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Authentication — Globe Tech Community" },
      { name: "description", content: "Sign in or create your Globe Tech Community profile." },
    ],
  }),
  component: AuthPage,
});

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type SignupValues = z.infer<typeof signupSchema>;
type SigninValues = z.infer<typeof signinSchema>;

function PasswordStrength({ password }: { password?: string }) {
  const pwd = password || "";
  const checks = [
    { label: "8+ characters", valid: pwd.length >= 8 },
    { label: "Uppercase", valid: /[A-Z]/.test(pwd) },
    { label: "Lowercase", valid: /[a-z]/.test(pwd) },
    { label: "Number", valid: /[0-9]/.test(pwd) },
    { label: "Special character", valid: /[^A-Za-z0-9]/.test(pwd) },
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

function Field({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1 relative pb-5">
      {children}
      {error && <div className="absolute bottom-0 left-0 text-xs text-red-500/90 font-medium">{error}</div>}
    </div>
  );
}

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signin");
  
  const [showPwd, setShowPwd] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // Brute-force protection state
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    watch: watchSignup,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
    reset: resetSignup,
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const {
    register: registerSignin,
    handleSubmit: handleSigninSubmit,
    formState: { errors: signinErrors, isSubmitting: isSigninSubmitting },
    reset: resetSignin,
  } = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const watchSignupPassword = watchSignup("password");

  useEffect(() => {
    if (user) {
      const next = search.next && search.next.startsWith("/") ? search.next : "/dashboard";
      navigate({ to: next });
    }
  }, [user, search.next, navigate]);

  // Handle Cooldown Timer
  useEffect(() => {
    if (!cooldownUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((cooldownUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownUntil(null);
        setLoginAttempts(0);
      } else {
        setCooldownRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  const onSignup = async (data: SignupValues) => {
    if (cooldownUntil) return toast.error(`Wait ${cooldownRemaining}s before trying.`);
    
    const emailLower = data.email.toLowerCase();
    const commonTypos = ["@gmail.co", "@yahoo.co", "@hotmail.co", "@outlook.co", "@gmail.c"];
    if (commonTypos.some(typo => emailLower.endsWith(typo))) {
      return toast.error("Looks like a typo in your email domain. Did you mean .com?");
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { first_name: data.firstName, last_name: data.lastName },
        },
      });
      if (error) throw error;
      toast.success("Welcome! Let's set up your profile.");
    } catch (err: any) {
      toast.error(err.message || "Sign up failed");
    }
  };

  const onSignin = async (data: SigninValues) => {
    if (cooldownUntil) return toast.error(`Wait ${cooldownRemaining}s before trying.`);

    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email: data.email, 
        password: data.password 
      });
      
      if (error) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        if (newAttempts >= 5) {
          setCooldownUntil(Date.now() + 60 * 1000); // 60 seconds cooldown
          throw new Error("Too many failed attempts. Please try again in 60 seconds.");
        }
        throw new Error("Invalid email or password");
      }
      setLoginAttempts(0);
    } catch (err: any) {
      toast.error(err.message || "Sign in failed");
    }
  };

  const google = async () => {
    setLoadingGoogle(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) toast.error(error.message);
    setLoadingGoogle(false);
  };

  const isSubmitting = isSignupSubmitting || isSigninSubmitting;
  const isButtonDisabled = isSubmitting || loadingGoogle || !!cooldownUntil;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <section className="flex-1 container-page grid lg:grid-cols-2 gap-12 lg:gap-24 items-center py-12 sm:py-16">
        {/* Left Side: Hero Image (Hidden on mobile) */}
        <div className="hidden lg:block relative w-full h-[600px] rounded-3xl overflow-hidden border border-hairline shadow-2xl">
          <img 
            src="/hero-img.jpg" 
            alt="Globe Tech Community Members" 
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 via-40% to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-12 text-left">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
              <h2 className="font-display text-5xl text-white drop-shadow-lg">Find your people.</h2>
              <p className="mt-4 text-white max-w-md text-lg leading-relaxed drop-shadow-md">
                Join a thriving directory of developers, designers, and creators building the future together.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 justify-self-center lg:justify-self-start lg:pl-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
            / {mode === "signin" ? "Sign in" : "Create account"}
          </div>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            {mode === "signin" ? "Welcome back." : "Join the community."}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to your Globe Tech Community profile."
              : "A minute to sign up, five to fill out your profile."}
          </p>
          {/* <button
            type="button"
            onClick={google}
            disabled={isButtonDisabled}
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm font-medium hover:bg-surface-2 disabled:opacity-60 transition-colors"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-hairline" />
            or with email
            <div className="h-px flex-1 bg-hairline" />
          </div> */}

          {mode === "signup" ? (
            <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-1">
              <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <Field error={signupErrors.firstName?.message}>
                  <input {...registerSignup("firstName")} placeholder="First name" className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60" />
                </Field>
                <Field error={signupErrors.lastName?.message}>
                  <input {...registerSignup("lastName")} placeholder="Last name" className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60" />
                </Field>
              </div>
              
              <Field error={signupErrors.email?.message}>
                <input {...registerSignup("email")} type="email" placeholder="you@domain.com" className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60" />
              </Field>

              <Field error={signupErrors.password?.message}>
                <div className="relative">
                  <input
                    {...registerSignup("password")}
                    type={showPwd ? "text" : "password"}
                    placeholder="Password"
                    className="h-12 w-full rounded-md border border-hairline bg-surface pl-3.5 pr-10 text-sm outline-none transition-colors focus:border-primary/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPwd ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </Field>

              <div className="pb-3 pt-1">
                <PasswordStrength password={watchSignupPassword} />
              </div>

              <button
                type="submit"
                disabled={isButtonDisabled}
                className="mt-2 h-12 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {isSubmitting ? "Please wait…" : cooldownUntil ? `Wait ${cooldownRemaining}s` : "Sign up"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSigninSubmit(onSignin)} className="space-y-1">
              <Field error={signinErrors.email?.message}>
                <input {...registerSignin("email")} type="email" placeholder="you@domain.com" className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60" />
              </Field>
              
              <Field error={signinErrors.password?.message}>
                <div className="relative">
                  <input
                    {...registerSignin("password")}
                    type={showPwd ? "text" : "password"}
                    placeholder="Password"
                    className="h-12 w-full rounded-md border border-hairline bg-surface pl-3.5 pr-10 text-sm outline-none transition-colors focus:border-primary/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPwd ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </Field>
              
              <div className="text-right pb-4 -mt-2">
                <Link to="/reset-password" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isButtonDisabled}
                className="mt-2 h-12 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {isSubmitting ? "Please wait…" : cooldownUntil ? `Wait ${cooldownRemaining}s` : "Sign in"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>New here?{" "}
                <button type="button" onClick={() => { setMode("signup"); setLoginAttempts(0); setCooldownUntil(null); resetSignup(); resetSignin(); }} className="font-medium text-primary hover:underline">Create an account</button>
              </>
            ) : (
              <>Already a member?{" "}
                <button type="button" onClick={() => { setMode("signin"); resetSignup(); resetSignin(); }} className="font-medium text-primary hover:underline">Sign in</button>
              </>
            )}
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">← Back home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.7 2.5 2.5 6.7 2.5 12s4.2 9.5 9.5 9.5c5.5 0 9.1-3.8 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}
