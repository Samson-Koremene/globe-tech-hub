import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Compass, Settings, AlertCircle, Users, Edit3, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemberCard } from "@/components/MemberCard";
import { ProfilePageSkeleton } from "@/components/Skeletons";
import {
  fetchMyProfile,
  fetchFollowerProfiles,
  fetchFollowingProfiles,
} from "@/lib/profile";
import { useAuth } from "@/hooks/use-auth";
import { AnimatedCounter } from "@/components/core/motion-primitives";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Globe Tech Community" },
      { name: "description", content: "Your community dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMyProfile,
    staleTime: 1000 * 60 * 5,
  });

  const { data: followers = [], isLoading: isLoadingFollowers } = useQuery({
    queryKey: ["followers_profiles", user?.id],
    queryFn: () => user ? fetchFollowerProfiles(user.id) : Promise.resolve([]),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const { data: following = [], isLoading: isLoadingFollowing } = useQuery({
    queryKey: ["following_profiles", user?.id],
    queryFn: () => user ? fetchFollowingProfiles(user.id) : Promise.resolve([]),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SiteHeader />
        <div className="flex-1 container-page py-12">
          <ProfilePageSkeleton />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SiteHeader />
        <div className="flex-1 container-page py-12 text-center">
          <p className="mb-4">Profile not found. Please complete onboarding.</p>
          <Link to="/onboarding" className="text-primary hover:underline">Go to onboarding</Link>
        </div>
      </div>
    );
  }

  const isProfileComplete = profile.bio && profile.avatar_url && profile.occupation && (profile.passions.length > 0 || profile.hobbies.length > 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <div className="flex-1 container-page py-8 sm:py-12 max-w-5xl">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">/ Dashboard</div>
        <h1 className="font-display text-3xl sm:text-4xl mb-8">Welcome back.</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Snapshot & Completeness Nudge */}
          <div className="lg:col-span-1 space-y-6">
            {!isProfileComplete && (
              <div className="rounded-xl border border-accent/40 bg-accent/5 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[15px] font-medium text-foreground">Complete your profile</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      Your profile is missing some details. A complete profile helps others find you and start conversations.
                    </p>
                    <Link to="/settings" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                      <Edit3 className="h-4 w-4" /> Edit profile
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-hairline bg-surface overflow-hidden">
              <div className="p-4 border-b border-hairline flex items-center justify-between bg-surface-2/50">
                <span className="text-sm font-medium text-foreground">Profile Snapshot</span>
                <Link to="/settings" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  <Edit3 className="h-3 w-3" /> Edit
                </Link>
              </div>
              <div className="p-5 pointer-events-none">
                <MemberCard profile={profile} />
              </div>
              <div className="px-5 pb-5 pt-0">
                <Link to="/members/$id" params={{ id: profile.id }} className="w-full flex items-center justify-center gap-2 rounded-md border border-hairline bg-background py-2 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors">
                  View public profile
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-hairline bg-surface p-5">
              <h3 className="text-sm font-medium text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/directory" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-2 transition-colors group">
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Compass className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    Explore Directory
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link to="/settings" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-2 transition-colors group">
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    Account Settings
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Follow Stats & Lists */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab("followers")}
                className={`rounded-xl border p-5 text-left transition-all outline-none ${activeTab === "followers" ? "border-primary bg-primary/5 shadow-sm" : "border-hairline bg-surface hover:border-primary/40 hover:bg-surface-2"}`}
              >
                <div className="text-sm text-muted-foreground font-medium mb-1">Followers</div>
                <div className="font-display text-3xl text-foreground">
                  <AnimatedCounter value={followers.length} />
                </div>
              </button>
              <button 
                onClick={() => setActiveTab("following")}
                className={`rounded-xl border p-5 text-left transition-all outline-none ${activeTab === "following" ? "border-primary bg-primary/5 shadow-sm" : "border-hairline bg-surface hover:border-primary/40 hover:bg-surface-2"}`}
              >
                <div className="text-sm text-muted-foreground font-medium mb-1">Following</div>
                <div className="font-display text-3xl text-foreground">
                  <AnimatedCounter value={following.length} />
                </div>
              </button>
            </div>

            <div className="rounded-xl border border-hairline bg-surface p-6 min-h-[400px]">
              {activeTab === "followers" ? (
                <div>
                  <h2 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    People who follow you
                  </h2>
                  {isLoadingFollowers ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : followers.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-[15px] font-medium text-foreground">No followers yet</h3>
                      <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
                        When someone follows your profile, they'll show up here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {followers.map(p => (
                        <div key={p.id} className="[&>a]:h-full">
                          <MemberCard profile={p} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : activeTab === "following" ? (
                <div>
                  <h2 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    People you follow
                  </h2>
                  {isLoadingFollowing ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : following.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-[15px] font-medium text-foreground">Not following anyone</h3>
                      <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
                        Explore the directory to find interesting people to follow.
                      </p>
                      <Link to="/directory" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                        Explore Directory
                      </Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {following.map(p => (
                        <div key={p.id} className="[&>a]:h-full">
                          <MemberCard profile={p} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
