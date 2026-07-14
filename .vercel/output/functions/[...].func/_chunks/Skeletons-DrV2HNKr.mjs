import { t as supabase } from "./client-CnHmCHwq.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
//#region dist/server/assets/Skeletons-DrV2HNKr.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function fullName(p) {
	return [p.first_name, p.last_name].filter(Boolean).join(" ").trim() || "Unnamed member";
}
function initials(p) {
	return ((p.first_name?.[0] ?? "") + (p.last_name?.[0] ?? "")).toUpperCase() || "?";
}
var signedUrlCache = /* @__PURE__ */ new Map();
/** Resolve an avatar url. External URLs pass through; storage paths become signed URLs. */
async function resolveAvatarUrl(value) {
	if (!value) return null;
	if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
	const cached = signedUrlCache.get(value);
	if (cached && cached.expires > Date.now()) return cached.url;
	const { data } = await supabase.storage.from("avatars").createSignedUrl(value, 3600);
	if (!data?.signedUrl) return null;
	signedUrlCache.set(value, {
		url: data.signedUrl,
		expires: Date.now() + 3300 * 1e3
	});
	return data.signedUrl;
}
async function fetchAllProfiles(filters) {
	let query = supabase.from("profiles").select("*");
	if (filters?.occupation) query = query.eq("occupation", filters.occupation);
	if (filters?.passion) query = query.contains("passions", [filters.passion]);
	if (filters?.hobby) query = query.contains("hobbies", [filters.hobby]);
	if (filters?.tag) query = query.or(`occupation.eq."${filters.tag}",passions.cs.{"${filters.tag}"},hobbies.cs.{"${filters.tag}"}`);
	const { data, error } = await query.order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function fetchProfileById(id) {
	const { data, error } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
	if (error) throw error;
	return data ?? null;
}
async function fetchMyProfile() {
	const { data: userData } = await supabase.auth.getUser();
	const uid = userData.user?.id;
	if (!uid) return null;
	return fetchProfileById(uid);
}
async function updateMyProfile(patch) {
	const { data: userData } = await supabase.auth.getUser();
	const uid = userData.user?.id;
	if (!uid) throw new Error("Not signed in");
	const { data, error } = await supabase.from("profiles").update(patch).eq("id", uid).select("*").single();
	if (error) throw error;
	return data;
}
async function uploadAvatar(file) {
	const { data: userData } = await supabase.auth.getUser();
	const uid = userData.user?.id;
	if (!uid) throw new Error("Not signed in");
	const ext = file.name.split(".").pop() || "jpg";
	const path = `${uid}/avatar-${Date.now()}.${ext}`;
	const { error } = await supabase.storage.from("avatars").upload(path, file, {
		upsert: true,
		contentType: file.type
	});
	if (error) throw error;
	return path;
}
async function fetchFollowing(userId) {
	const { data, error } = await supabase.from("follows").select("following_id").eq("follower_id", userId);
	if (error) throw error;
	return data.map((r) => r.following_id);
}
async function follow(targetId) {
	const { data: userData } = await supabase.auth.getUser();
	const uid = userData.user?.id;
	if (!uid) throw new Error("Not signed in");
	const { error } = await supabase.from("follows").insert({
		follower_id: uid,
		following_id: targetId
	});
	if (error && !String(error.message).includes("duplicate")) throw error;
}
async function unfollow(targetId) {
	const { data: userData } = await supabase.auth.getUser();
	const uid = userData.user?.id;
	if (!uid) throw new Error("Not signed in");
	const { error } = await supabase.from("follows").delete().eq("follower_id", uid).eq("following_id", targetId);
	if (error) throw error;
}
async function fetchFollowerCount(userId) {
	const { count, error } = await supabase.from("follows").select("*", {
		count: "exact",
		head: true
	}).eq("following_id", userId);
	if (error) throw error;
	return count ?? 0;
}
async function fetchFollowingCount(userId) {
	const { count, error } = await supabase.from("follows").select("*", {
		count: "exact",
		head: true
	}).eq("follower_id", userId);
	if (error) throw error;
	return count ?? 0;
}
async function fetchFollowerProfiles(userId) {
	const { data, error } = await supabase.from("follows").select("follower_id").eq("following_id", userId);
	if (error) throw error;
	const followerIds = data.map((r) => r.follower_id);
	if (followerIds.length === 0) return [];
	const { data: profiles, error: profileError } = await supabase.from("profiles").select("*").in("id", followerIds);
	if (profileError) throw profileError;
	return profiles ?? [];
}
async function fetchFollowingProfiles(userId) {
	const followingIds = await fetchFollowing(userId);
	if (followingIds.length === 0) return [];
	const { data: profiles, error: profileError } = await supabase.from("profiles").select("*").in("id", followingIds);
	if (profileError) throw profileError;
	return profiles ?? [];
}
function MemberCardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 p-5 sm:p-6 opacity-40 grayscale transition-all select-none bg-surface border border-hairline rounded-xl w-full h-full min-h-[220px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-14 w-14 shrink-0 rounded-full bg-surface-2/50 animate-pulse flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.User, { className: "h-6 w-6 text-muted-foreground/30" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-col gap-2.5 mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-3/4 bg-surface-2/50 rounded animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 bg-surface-2/50 rounded animate-pulse" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full bg-surface-2/50 rounded animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-5/6 bg-surface-2/50 rounded animate-pulse" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto pt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-16 bg-surface-2/50 rounded-full animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-20 bg-surface-2/50 rounded-full animate-pulse" })]
			})
		]
	});
}
function ProfilePageSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page max-w-4xl py-8 sm:py-12 animate-pulse",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-32 bg-surface-2/50 rounded" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 sm:mt-8 sm:grid-cols-[auto_1fr] sm:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 w-32 rounded-full bg-surface-2/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-64 bg-surface-2/50 rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-40 bg-surface-2/50 rounded mt-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-32 bg-surface-2/50 rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full max-w-xl bg-surface-2/50 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-5/6 max-w-xl bg-surface-2/50 rounded" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-32 bg-surface-2/50 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-24 bg-surface-2/50 rounded-md" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-16 bg-surface-2/50 rounded mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full bg-surface-2/50 rounded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full bg-surface-2/50 rounded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4/5 bg-surface-2/50 rounded" })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-16 bg-surface-2/50 rounded mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-20 bg-surface-2/50 rounded-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-16 bg-surface-2/50 rounded-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-24 bg-surface-2/50 rounded-full" })
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-16 bg-surface-2/50 rounded mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full bg-surface-2/50 rounded-md" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full bg-surface-2/50 rounded-md" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full bg-surface-2/50 rounded-md" })
						]
					})] })
				})]
			})
		]
	});
}
function CategorySkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-baseline justify-between hairline-b pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-32 bg-surface-2/50 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-8 bg-surface-2/50 rounded" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-md px-3 py-2 bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-3/4 bg-surface-2/50 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-6 bg-surface-2/50 rounded" })]
			}, i))
		})]
	});
}
//#endregion
export { updateMyProfile as _, fetchFollowerCount as a, fetchFollowingCount as c, fetchProfileById as d, follow as f, unfollow as g, resolveAvatarUrl as h, fetchAllProfiles as i, fetchFollowingProfiles as l, initials as m, MemberCardSkeleton as n, fetchFollowerProfiles as o, fullName as p, ProfilePageSkeleton as r, fetchFollowing as s, CategorySkeleton as t, fetchMyProfile as u, uploadAvatar as v };
