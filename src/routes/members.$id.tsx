import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Globe, Twitter, Github, Linkedin, MapPin, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemberAvatar } from "@/components/MemberAvatar";
import { ProfilePageSkeleton } from "@/components/Skeletons";
import {
  fetchProfileById,
  fetchFollowerCount,
  fetchFollowingCount,
  fetchFollowing,
  follow,
  unfollow,
  fullName,
} from "@/lib/profile";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/members/$id")({
  component: MemberPage,
});

function MemberPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfileById(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: followerCount = 0 } = useQuery({
    queryKey: ["followers", id],
    queryFn: () => fetchFollowerCount(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: followingCount = 0 } = useQuery({
    queryKey: ["followingCount", id],
    queryFn: () => fetchFollowingCount(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: myFollowing = [] } = useQuery({
    queryKey: ["following", user?.id],
    queryFn: () => (user ? fetchFollowing(user.id) : Promise.resolve([])),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const isFollowing = myFollowing.includes(id);
  const isMe = user?.id === id;

  const followMutation = useMutation({
    mutationFn: async () => {
      if (isFollowing) await unfollow(id);
      else await follow(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["following", user?.id] });
      qc.invalidateQueries({ queryKey: ["following_profiles", user?.id] });
      qc.invalidateQueries({ queryKey: ["followers", id] });
      toast.success(isFollowing ? "Unfollowed" : "Now following");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SiteHeader />
        <div className="flex-1">
          <ProfilePageSkeleton />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container-page py-20 text-center">
          <div className="font-display text-3xl">Member not found.</div>
          <Link to="/directory" className="mt-4 inline-block text-primary hover:underline">Back to directory</Link>
        </div>
      </div>
    );
  }

  const socials = [
    { icon: Globe, href: profile.website, label: "Website" },
    { icon: Twitter, href: profile.twitter, label: "Twitter" },
    { icon: Github, href: profile.github, label: "GitHub" },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  ].filter((s) => !!s.href);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page max-w-4xl py-8 sm:py-12">
        <Link to="/directory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to directory
        </Link>

        <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-[auto_1fr] sm:gap-8">
          <MemberAvatar profile={profile} size="xl" />
          <div>
            <h1 className="font-display text-3xl sm:text-4xl">{fullName(profile)}</h1>
            {profile.occupation && (
              <div className="mt-1 text-base text-primary sm:text-lg">{profile.occupation}</div>
            )}
            {profile.location && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </div>
            )}
            {profile.tagline && (
              <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">{profile.tagline}</p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {isMe ? (
                <Link
                  to="/settings"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-hairline bg-surface px-4 text-sm hover:bg-surface-2 sm:h-auto sm:py-2"
                >
                  Edit my profile
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (!user) return navigate({ to: "/auth", search: { next: `/members/${id}` } });
                    followMutation.mutate();
                  }}
                  disabled={followMutation.isPending}
                  className={
                    isFollowing
                      ? "inline-flex h-11 items-center justify-center rounded-md border border-hairline bg-surface px-4 text-sm hover:bg-surface-2 sm:h-auto sm:py-2"
                      : "inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 sm:h-auto sm:py-2"
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  <span className="font-medium text-foreground">{followerCount}</span> follower{followerCount === 1 ? "" : "s"}
                </span>
                <span>
                  <span className="font-medium text-foreground">{followingCount}</span> following
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {profile.bio && (
              <Section title="About">
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/90">{profile.bio}</p>
              </Section>
            )}
            {profile.passions.length > 0 && (
              <Section title="Passions">
                <TagList tags={profile.passions} />
              </Section>
            )}
            {profile.hobbies.length > 0 && (
              <Section title="Hobbies">
                <TagList tags={profile.hobbies} />
              </Section>
            )}
          </div>
          <aside className="space-y-6">
            {socials.length > 0 && (
              <Section title="Elsewhere">
                <ul className="flex flex-col gap-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 items-center gap-2 rounded-md border border-hairline bg-surface px-3 text-sm hover:bg-surface-2 sm:h-auto sm:py-2"
                      >
                        <s.icon className="h-4 w-4 text-muted-foreground" />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </aside>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-primary">/ {title}</div>
      {children}
    </div>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="chip">{t}</span>
      ))}
    </div>
  );
}
