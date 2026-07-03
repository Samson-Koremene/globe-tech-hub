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

  useEffect(() => {
    let alive = true;
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
      {url ? (
        <img src={url} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-medium tracking-wide text-muted-foreground">
          {initials(profile)}
        </div>
      )}
    </div>
  );
}
