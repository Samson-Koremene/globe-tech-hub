import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MemberAvatar } from "./MemberAvatar";
import { updateMyProfile, uploadAvatar, type Profile } from "@/lib/profile";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  tagline: z.string().max(140, "Tagline must be 140 characters or less").optional(),
  occupation: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  bio: z.string().max(800, "Bio must be 800 characters or less").optional(),
  passions: z.string().optional(),
  hobbies: z.string().optional(),
  website: z.union([z.literal(""), z.string().url("Must be a valid URL")]).optional(),
  twitter: z.union([z.literal(""), z.string().url("Must be a valid URL")]).optional(),
  github: z.union([z.literal(""), z.string().url("Must be a valid URL")]).optional(),
  linkedin: z.union([z.literal(""), z.string().url("Must be a valid URL")]).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

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

  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatar_url);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      tagline: profile.tagline ?? "",
      occupation: profile.occupation ?? "",
      location: profile.location ?? "",
      bio: profile.bio ?? "",
      passions: profile.passions.join(", "),
      hobbies: profile.hobbies.join(", "),
      website: profile.website ?? "",
      twitter: profile.twitter ?? "",
      github: profile.github ?? "",
      linkedin: profile.linkedin ?? "",
    },
  });

  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

  const parseTags = (s: string | undefined) =>
    (s || "").split(",").map((t) => t.trim()).filter(Boolean);

  const save = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      return updateMyProfile({
        first_name: data.firstName.trim() || null,
        last_name: data.lastName.trim() || null,
        tagline: data.tagline?.trim() || null,
        occupation: data.occupation?.trim() || null,
        location: data.location?.trim() || null,
        bio: data.bio?.trim() || null,
        passions: parseTags(data.passions),
        hobbies: parseTags(data.hobbies),
        website: data.website?.trim() || null,
        twitter: data.twitter?.trim() || null,
        github: data.github?.trim() || null,
        linkedin: data.linkedin?.trim() || null,
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

  const onSubmit = (data: ProfileFormValues) => save.mutate(data);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Photo */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
        <MemberAvatar profile={{ avatar_url: avatarUrl, first_name: watchFirstName, last_name: watchLastName }} size="xl" />
        <label className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm hover:bg-surface-2 sm:h-auto sm:w-auto sm:py-2">
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
          <Field label="First name" error={errors.firstName?.message}>
            <input
              {...register("firstName")}
              className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </Field>
          <Field label="Last name" error={errors.lastName?.message}>
            <input
              {...register("lastName")}
              className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </Field>
        </div>
        <Field label="Tagline" hint="One sentence about you." error={errors.tagline?.message}>
          <input
            {...register("tagline")}
            placeholder="Designing calm tools for restless teams."
            className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Occupation" error={errors.occupation?.message}>
            <input
              {...register("occupation")}
              placeholder="Product designer"
              className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </Field>
          <Field label="Location" error={errors.location?.message}>
            <input
              {...register("location")}
              placeholder="Lagos, Nigeria"
              className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </Field>
        </div>
        <Field label="Bio" hint="A short paragraph. Markdown-free." error={errors.bio?.message}>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full rounded-md border border-hairline bg-surface p-3 text-sm outline-none focus:border-primary/60"
          />
        </Field>
      </Section>

      <Section title="Passions & hobbies">
        <Field label="Passions" hint="Comma-separated. Things you deeply care about." error={errors.passions?.message}>
          <input
            {...register("passions")}
            placeholder="climate, open source, education"
            className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
          />
        </Field>
        <Field label="Hobbies" hint="Comma-separated. What you do off the clock." error={errors.hobbies?.message}>
          <input
            {...register("hobbies")}
            placeholder="climbing, film photography, chess"
            className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
          />
        </Field>
      </Section>

      <Section title="Elsewhere">
        <Field label="Website" error={errors.website?.message}>
          <input
            {...register("website")}
            placeholder="https://…"
            className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Twitter / X" error={errors.twitter?.message}>
            <input
              {...register("twitter")}
              placeholder="https://x.com/…"
              className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </Field>
          <Field label="GitHub" error={errors.github?.message}>
            <input
              {...register("github")}
              placeholder="https://github.com/…"
              className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </Field>
          <Field label="LinkedIn" error={errors.linkedin?.message}>
            <input
              {...register("linkedin")}
              placeholder="https://linkedin.com/in/…"
              className="h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
          </Field>
        </div>
      </Section>

      <div className="hairline-t flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="submit"
          disabled={isSubmitting || save.isPending}
          className="h-12 w-full rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 sm:h-auto sm:w-auto sm:py-2.5"
        >
          {isSubmitting || save.isPending ? "Saving…" : submitLabel}
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

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block relative pb-5">
      <div className="mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-sm font-medium">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <span className="absolute bottom-0 left-0 text-xs text-red-500/90 font-medium">{error}</span>}
    </label>
  );
}
