import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { fetchMyProfile } from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyProfile,
  });

  useEffect(() => {
    if (profile?.onboarded) navigate({ to: "/members/$id", params: { id: profile.id } });
  }, [profile, navigate]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container-page py-16 text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page max-w-2xl py-12">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Onboarding</div>
        <h1 className="mt-3 font-display text-4xl">Tell us about you.</h1>
        <p className="mt-2 text-muted-foreground">
          This is what people will see in the directory. You can change it any time.
        </p>
        <div className="mt-10">
          <ProfileForm profile={profile} markOnboarded submitLabel="Publish my profile" />
        </div>
      </section>
    </div>
  );
}
