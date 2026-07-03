import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { fetchMyProfile } from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyProfile,
  });

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
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary">/ Settings</div>
            <h1 className="mt-3 font-display text-4xl">My profile.</h1>
          </div>
          <Link
            to="/members/$id"
            params={{ id: profile.id }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View public page →
          </Link>
        </div>
        <div className="mt-10">
          <ProfileForm profile={profile} submitLabel="Save changes" />
        </div>
      </section>
    </div>
  );
}
