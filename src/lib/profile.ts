import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  tagline: string | null;
  bio: string | null;
  occupation: string | null;
  location: string | null;
  passions: string[];
  hobbies: string[];
  website: string | null;
  twitter: string | null;
  github: string | null;
  linkedin: string | null;
  onboarded: boolean;
  created_at: string;
  updated_at: string;
};

export function fullName(p: Pick<Profile, "first_name" | "last_name">): string {
  const parts = [p.first_name, p.last_name].filter(Boolean);
  return parts.join(" ").trim() || "Unnamed member";
}

export function initials(p: Pick<Profile, "first_name" | "last_name">): string {
  const a = p.first_name?.[0] ?? "";
  const b = p.last_name?.[0] ?? "";
  return (a + b).toUpperCase() || "?";
}

const signedUrlCache = new Map<string, { url: string; expires: number }>();

/** Resolve an avatar url. External URLs pass through; storage paths become signed URLs. */
export async function resolveAvatarUrl(value: string | null): Promise<string | null> {
  if (!value) return null;
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  
  const cached = signedUrlCache.get(value);
  if (cached && cached.expires > Date.now()) return cached.url;
  
  const { data } = await supabase.storage.from("avatars").createSignedUrl(value, 60 * 60);
  if (!data?.signedUrl) return null;
  
  signedUrlCache.set(value, { url: data.signedUrl, expires: Date.now() + 55 * 60 * 1000 });
  return data.signedUrl;
}

export async function fetchAllProfiles(filters?: { occupation?: string; passion?: string; hobby?: string; tag?: string }): Promise<Profile[]> {
  let query = supabase
    .from("profiles" as never)
    .select("*")
    .eq("onboarded", true);

  if (filters?.occupation) {
    query = query.eq("occupation", filters.occupation);
  }
  if (filters?.passion) {
    query = query.contains("passions", [filters.passion]);
  }
  if (filters?.hobby) {
    query = query.contains("hobbies", [filters.hobby]);
  }
  if (filters?.tag) {
    // For generic tag from directory page
    query = query.or(`occupation.eq."${filters.tag}",passions.cs.{"${filters.tag}"},hobbies.cs.{"${filters.tag}"}`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as Profile[];
}

export async function fetchProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles" as never)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as Profile) ?? null;
}

export async function fetchMyProfile(): Promise<Profile | null> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return null;
  return fetchProfileById(uid);
}

export async function updateMyProfile(patch: Partial<Profile>): Promise<Profile> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) throw new Error("Not signed in");
  const { data, error } = await supabase
    .from("profiles" as never)
    .update(patch as never)
    .eq("id", uid)
    .select("*")
    .single();
  if (error) throw error;
  return data as unknown as Profile;
}

export async function uploadAvatar(file: File): Promise<string> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) throw new Error("Not signed in");
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${uid}/avatar-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("avatars").upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  return path;
}

export async function fetchFollowing(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("follows" as never)
    .select("following_id")
    .eq("follower_id", userId);
  if (error) throw error;
  return (data as unknown as { following_id: string }[]).map((r) => r.following_id);
}

export async function follow(targetId: string): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) throw new Error("Not signed in");
  const { error } = await supabase
    .from("follows" as never)
    .insert({ follower_id: uid, following_id: targetId } as never);
  if (error && !String(error.message).includes("duplicate")) throw error;
}

export async function unfollow(targetId: string): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) throw new Error("Not signed in");
  const { error } = await supabase
    .from("follows" as never)
    .delete()
    .eq("follower_id", uid)
    .eq("following_id", targetId);
  if (error) throw error;
}

export async function fetchFollowerCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("follows" as never)
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);
  if (error) throw error;
  return count ?? 0;
}

export async function fetchFollowingCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("follows" as never)
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);
  if (error) throw error;
  return count ?? 0;
}

export async function fetchFollowerProfiles(userId: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("follows" as never)
    .select("follower_id")
    .eq("following_id", userId);
  if (error) throw error;
  const followerIds = (data as unknown as { follower_id: string }[]).map((r) => r.follower_id);
  if (followerIds.length === 0) return [];

  const { data: profiles, error: profileError } = await supabase
    .from("profiles" as never)
    .select("*")
    .in("id", followerIds);
  if (profileError) throw profileError;
  return (profiles ?? []) as unknown as Profile[];
}

export async function fetchFollowingProfiles(userId: string): Promise<Profile[]> {
  const followingIds = await fetchFollowing(userId);
  if (followingIds.length === 0) return [];

  const { data: profiles, error: profileError } = await supabase
    .from("profiles" as never)
    .select("*")
    .in("id", followingIds);
  if (profileError) throw profileError;
  return (profiles ?? []) as unknown as Profile[];
}
