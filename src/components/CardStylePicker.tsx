import { Check } from "lucide-react";
import { MemberCard } from "./MemberCard";
import type { Profile } from "@/lib/profile";

export const CARD_COLORS = [
  { id: "default", bg: "bg-primary" },
  { id: "violet", bg: "bg-violet-500" },
  { id: "emerald", bg: "bg-emerald-500" },
  { id: "rose", bg: "bg-rose-500" },
  { id: "amber", bg: "bg-amber-500" },
  { id: "sky", bg: "bg-sky-500" },
];

export const CARD_STYLES = [
  { id: "soft", label: "Soft" },
  { id: "dark", label: "Dark" },
  { id: "minimal", label: "Minimal" },
];

export function CardStylePicker({
  color,
  onChangeColor,
  style,
  onChangeStyle,
  profile,
}: {
  color: string;
  onChangeColor: (c: string) => void;
  style: string;
  onChangeStyle: (s: string) => void;
  profile: Profile;
}) {
  const previewProfile = { ...profile, card_color: color, card_style: style };
  
  return (
    <div className="space-y-8">
      {/* Live Preview */}
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface/30 p-6 sm:p-10 flex justify-center">
        <div className="pointer-events-none w-full max-w-[340px]">
          <MemberCard profile={previewProfile} />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Color Palette</label>
        <div className="flex flex-wrap gap-3">
          {CARD_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onChangeColor(c.id)}
              className={`relative flex h-16 w-20 items-center justify-center rounded-[14px] border transition-all ${
                color === c.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
                  : "border-hairline bg-surface hover:bg-surface-2"
              }`}
            >
              <div className={`h-8 w-8 rounded-full shadow-sm ${c.bg} ${c.id === "default" ? "" : "opacity-90"}`} />
              {color === c.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-sm">
                    <Check className="h-3 w-3 text-foreground" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Card Style</label>
        <div className="grid grid-cols-3 gap-4">
          {CARD_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onChangeStyle(s.id)}
              className={`group relative flex h-[110px] flex-col items-center justify-end overflow-hidden rounded-2xl border transition-all pb-4 ${
                style === s.id
                  ? "border-primary ring-1 ring-primary/20"
                  : "border-hairline hover:border-primary/40"
              } ${
                s.id === "soft" ? "bg-gradient-to-br from-surface to-surface-2" :
                s.id === "dark" ? "bg-zinc-900 border-zinc-800" :
                "bg-background"
              }`}
            >
              <div className={`text-sm font-medium ${s.id === "dark" ? "text-white" : "text-foreground"}`}>
                {s.label}
              </div>
              
              {style === s.id && (
                <div className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm ${s.id === "dark" ? "bg-white text-zinc-900" : "bg-primary text-primary-foreground"}`}>
                  <Check className="h-[10px] w-[10px]" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
