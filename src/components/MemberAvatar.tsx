import { useEffect, useState } from "react";
import { initials, resolveAvatarUrl, type Profile } from "@/lib/profile";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, string> = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-lg",
  xl: "h-32 w-32 text-2xl",
};

export function MemberAvatar({
  profile,
  size = "md",
  className = "",
}: {
  profile: Pick<Profile, "avatar_url" | "first_name" | "last_name">;
  size?: Size;
  className?: string;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoaded(false);
    resolveAvatarUrl(profile.avatar_url).then((u) => {
      if (alive) setUrl(u);
    });
    return () => {
      alive = false;
    };
  }, [profile.avatar_url]);

  return (
    <div
      className={`${sizeMap[size]} ${className} relative shrink-0 overflow-hidden rounded-full bg-surface-2 ring-1 ring-hairline`}
    >
      {/* Initials fallback — always rendered, fades out when image loads */}
      <div
        className={`absolute inset-0 flex items-center justify-center font-medium tracking-wide text-muted-foreground transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"}`}
      >
        {initials(profile)}
      </div>

      {/* Avatar image — fades in on load */}
      {url && (
        <img
          src={url}
          alt=""
          loading="eager"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
