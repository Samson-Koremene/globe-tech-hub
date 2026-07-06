import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { ProfilePageSkeleton } from "@/components/Skeletons";
import { fetchMyProfile } from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyProfile,
    staleTime: 1000 * 60 * 5,
  });

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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Settings</div>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl">My profile.</h1>
          </div>
          <Link
            to="/members/$id"
            params={{ id: profile.id }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View public page →
          </Link>
        </div>
        <div className="mt-8 sm:mt-10">
          <ProfileForm profile={profile} submitLabel="Save changes" />
        </div>
      </section>
    </div>
  );
}
