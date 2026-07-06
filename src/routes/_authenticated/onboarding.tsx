import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { ProfilePageSkeleton } from "@/components/Skeletons";
import { fetchMyProfile } from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Create Your Profile — Globe Tech Community" },
      { name: "description", content: "Complete your Globe Tech Community profile to appear in the directory." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyProfile,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (profile?.onboarded) navigate({ to: "/members/$id", params: { id: profile.id } });
  }, [profile, navigate]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SiteHeader />
        <div className="flex-1">
          <ProfilePageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page max-w-2xl py-8 sm:py-12">
        {/* Progress indicator */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            ✓
          </div>
          <div className="h-px flex-1 bg-primary" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground animate-pulse">
            2
          </div>
          <div className="h-px flex-1 bg-hairline" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-xs font-medium text-muted-foreground">
            3
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-6">Step 2 of 3 — Create your profile</p>

        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Create your profile</div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Tell us about you.</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Complete your profile to join the directory. This is what other members will see — you can update it any time.
        </p>
        <div className="mt-8 sm:mt-10">
          <ProfileForm profile={profile} markOnboarded submitLabel="Create profile & publish" />
        </div>
      </section>
    </div>
  );
}
