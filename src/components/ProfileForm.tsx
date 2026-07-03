import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { MemberAvatar } from "./MemberAvatar";
import { updateMyProfile, uploadAvatar, type Profile } from "@/lib/profile";

export function ProfileForm({
  profile,
  markOnboarded = false,
  submitLabel = "Save",
}: {
  profile: Profile;
  markOnboarded?: boolean;
  submitLabel?: string;
}) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(profile.first_name ?? "");
  const [lastName, setLastName] = useState(profile.last_name ?? "");
  const [tagline, setTagline] = useState(profile.tagline ?? "");
  const [occupation, setOccupation] = useState(profile.occupation ?? "");
  const [location, setLocation] = useState(profile.location ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [passions, setPassions] = useState(profile.passions.join(", "));
  const [hobbies, setHobbies] = useState(profile.hobbies.join(", "));
  const [website, setWebsite] = useState(profile.website ?? "");
  const [twitter, setTwitter] = useState(profile.twitter ?? "");
  const [github, setGithub] = useState(profile.github ?? "");
  const [linkedin, setLinkedin] = useState(profile.linkedin ?? "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatar_url);
  const [uploading, setUploading] = useState(false);

  const parseTags = (s: string) => s.split(",").map((t) => t.trim()).filter(Boolean);

  const save = useMutation({
    mutationFn: async () => {
      return updateMyProfile({
        first_name: firstName.trim() || null,
        last_name: lastName.trim() || null,
        tagline: tagline.trim() || null,
        occupation: occupation.trim() || null,
        location: location.trim() || null,
        bio: bio.trim() || null,
        passions: parseTags(passions),
        hobbies: parseTags(hobbies),
        website: website.trim() || null,
        twitter: twitter.trim() || null,
        github: github.trim() || null,
        linkedin: linkedin.trim() || null,
        avatar_url: avatarUrl,
        ...(markOnboarded ? { onboarded: true } : {}),
      });
    },
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["profiles"] });
      qc.invalidateQueries({ queryKey: ["profile", updated.id] });
      toast.success("Profile saved");
      if (markOnboarded) navigate({ to: "/members/$id", params: { id: updated.id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const onFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB");
    setUploading(true);
    try {
      const path = await uploadAvatar(file);
      setAvatarUrl(path);
      toast.success("Photo uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save.mutate(); }}
      className="space-y-8"
    >
      {/* Photo */}
      <div className="flex items-center gap-5">
        <MemberAvatar profile={{ avatar_url: avatarUrl, first_name: firstName, last_name: lastName }} size="xl" />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-hairline bg-surface px-4 py-2 text-sm hover:bg-surface-2">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading…" : avatarUrl ? "Change photo" : "Upload photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
        </label>
      </div>

      <Section title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name"><Text v={firstName} on={setFirstName} required /></Field>
          <Field label="Last name"><Text v={lastName} on={setLastName} required /></Field>
        </div>
        <Field label="Tagline" hint="One sentence about you.">
          <Text v={tagline} on={setTagline} placeholder="Designing calm tools for restless teams." maxLength={140} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Occupation"><Text v={occupation} on={setOccupation} placeholder="Product designer" /></Field>
          <Field label="Location"><Text v={location} on={setLocation} placeholder="Lagos, Nigeria" /></Field>
        </div>
        <Field label="Bio" hint="A short paragraph. Markdown-free.">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            maxLength={800}
            className="w-full rounded-md border border-hairline bg-surface p-3 text-sm outline-none focus:border-primary/60"
          />
        </Field>
      </Section>

      <Section title="Passions & hobbies">
        <Field label="Passions" hint="Comma-separated. Things you deeply care about.">
          <Text v={passions} on={setPassions} placeholder="climate, open source, education" />
        </Field>
        <Field label="Hobbies" hint="Comma-separated. What you do off the clock.">
          <Text v={hobbies} on={setHobbies} placeholder="climbing, film photography, chess" />
        </Field>
      </Section>

      <Section title="Elsewhere">
        <Field label="Website"><Text v={website} on={setWebsite} placeholder="https://…" /></Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Twitter / X"><Text v={twitter} on={setTwitter} placeholder="https://x.com/…" /></Field>
          <Field label="GitHub"><Text v={github} on={setGithub} placeholder="https://github.com/…" /></Field>
          <Field label="LinkedIn"><Text v={linkedin} on={setLinkedin} placeholder="https://linkedin.com/in/…" /></Field>
        </div>
      </Section>

      <div className="hairline-t flex items-center justify-end gap-3 pt-6">
        <button
          type="submit"
          disabled={save.isPending}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {save.isPending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="font-mono text-[11px] uppercase tracking-widest text-primary">/ {title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Text({
  v, on, ...rest
}: {
  v: string;
  on: (s: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <input
      {...rest}
      value={v}
      onChange={(e) => on(e.target.value)}
      className="h-11 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
    />
  );
}
