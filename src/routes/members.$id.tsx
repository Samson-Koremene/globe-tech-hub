import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Globe, Twitter, Github, Linkedin, MapPin, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemberAvatar } from "@/components/MemberAvatar";
import {
  fetchProfileById,
  fetchFollowerCount,
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
  });

  const { data: followerCount = 0 } = useQuery({
    queryKey: ["followers", id],
    queryFn: () => fetchFollowerCount(id),
  });

  const { data: myFollowing = [] } = useQuery({
    queryKey: ["following", user?.id],
    queryFn: () => (user ? fetchFollowing(user.id) : Promise.resolve([])),
    enabled: !!user,
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
      qc.invalidateQueries({ queryKey: ["followers", id] });
      toast.success(isFollowing ? "Unfollowed" : "Now following");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container-page py-20 text-muted-foreground">Loading…</div>
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
      <section className="container-page max-w-4xl py-12">
        <Link to="/directory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to directory
        </Link>

        <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr]">
          <MemberAvatar profile={profile} size="xl" />
          <div>
            <h1 className="font-display text-4xl">{fullName(profile)}</h1>
            {profile.occupation && (
              <div className="mt-1 text-primary">{profile.occupation}</div>
            )}
            {profile.location && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </div>
            )}
            {profile.tagline && (
              <p className="mt-4 max-w-xl text-lg leading-relaxed">{profile.tagline}</p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {isMe ? (
                <Link
                  to="/settings"
                  className="rounded-md border border-hairline bg-surface px-4 py-2 text-sm hover:bg-surface-2"
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
                      ? "rounded-md border border-hairline bg-surface px-4 py-2 text-sm hover:bg-surface-2"
                      : "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{followerCount}</span> follower{followerCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-8">
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
                        className="flex items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2 text-sm hover:bg-surface-2"
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
