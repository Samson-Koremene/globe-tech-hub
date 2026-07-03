import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { MemberAvatar } from "./MemberAvatar";
import { fullName, type Profile } from "@/lib/profile";

export function MemberCard({ profile }: { profile: Profile }) {
  const tags = [...profile.passions.slice(0, 3), ...profile.hobbies.slice(0, 2)];
  return (
    <Link
      to="/members/$id"
      params={{ id: profile.id }}
      className="group relative flex flex-col gap-4 rounded-xl border border-hairline bg-surface p-5 transition-all hover:border-primary/40 hover:bg-surface-2"
    >
      <div className="flex items-start gap-4">
        <MemberAvatar profile={profile} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-medium leading-tight text-foreground">
            {fullName(profile)}
          </div>
          {profile.occupation && (
            <div className="mt-0.5 text-sm text-primary/90">{profile.occupation}</div>
          )}
          {profile.location && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </div>
          )}
        </div>
      </div>
      {profile.tagline && (
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {profile.tagline}
        </p>
      )}
      {tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
