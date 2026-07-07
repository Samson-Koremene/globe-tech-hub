import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { MemberAvatar } from "./MemberAvatar";
import { fullName, type Profile } from "@/lib/profile";

export function MemberCard({ profile }: { profile: Profile }) {
  const tags = [...profile.passions.slice(0, 3), ...profile.hobbies.slice(0, 2)];

  const COLOR_MAP: Record<string, string> = {
    violet: "0.65 0.19 285",
    emerald: "0.7 0.15 160",
    rose: "0.65 0.2 25",
    amber: "0.75 0.18 70",
    sky: "0.67 0.17 235",
  };

  const color = profile.card_color || "default";
  const style = profile.card_style || "soft";

  const colorStyle = color !== "default" && COLOR_MAP[color] 
    ? { "--primary": `oklch(${COLOR_MAP[color]})` } as React.CSSProperties
    : undefined;

  let styleClasses = "";
  if (style === "dark") {
    styleClasses = "border-zinc-800/80 bg-zinc-950 hover:border-primary/50 hover:bg-zinc-900";
  } else if (style === "minimal") {
    styleClasses = "border-hairline bg-background shadow-sm hover:border-primary/30";
  } else {
    // soft
    styleClasses = "border-hairline bg-gradient-to-br from-surface to-surface-2 hover:border-primary/40 hover:from-surface hover:to-surface";
  }
  return (
    <Link
      to="/members/$id"
      params={{ id: profile.id }}
      style={colorStyle}
      className={`group relative flex h-full flex-col gap-4 rounded-2xl border p-5 transition-all duration-300 ${styleClasses}`}
    >
      <div className="flex items-start gap-4">
        <MemberAvatar profile={profile} size="lg" />
        <div className="min-w-0 flex-1">
          <div className={`text-[15px] font-semibold leading-tight ${style === "dark" ? "text-zinc-100" : "text-foreground"}`}>
            {fullName(profile)}
          </div>
          {profile.occupation && (
            <div className="mt-0.5 text-sm text-primary/90">{profile.occupation}</div>
          )}
          {profile.location && (
            <div className={`mt-2 flex items-center gap-1.5 text-xs ${style === "dark" ? "text-zinc-400" : "text-muted-foreground"}`}>
              <MapPin className="h-3 w-3" />
              {profile.location}
            </div>
          )}
        </div>
      </div>
      {profile.tagline && (
        <p className={`line-clamp-3 text-sm leading-relaxed ${style === "dark" ? "text-zinc-300" : "text-muted-foreground"}`}>
          {profile.tagline}
        </p>
      )}
      {tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className={`chip ${style === "dark" ? "!border-zinc-800 !bg-zinc-800/50 !text-zinc-300" : ""}`}>
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
