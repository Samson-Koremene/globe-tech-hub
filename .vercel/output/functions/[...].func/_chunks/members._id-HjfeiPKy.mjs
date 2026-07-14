import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { r as useAuth, t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { t as SiteFooter } from "./SiteFooter-wXFmlI9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as fetchFollowerCount, c as fetchFollowingCount, d as fetchProfileById, f as follow, g as unfollow, p as fullName, r as ProfilePageSkeleton, s as fetchFollowing } from "./Skeletons-DrV2HNKr.mjs";
import { t as MemberAvatar } from "./MemberAvatar-D9lX1-Ub.mjs";
import { t as Route } from "./members._id-at639MbC.mjs";
//#region dist/server/assets/members._id-HjfeiPKy.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function MemberPage() {
	const { id } = Route.useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data: profile, isLoading } = useQuery({
		queryKey: ["profile", id],
		queryFn: () => fetchProfileById(id),
		staleTime: 1e3 * 60 * 5
	});
	const { data: followerCount = 0 } = useQuery({
		queryKey: ["followers", id],
		queryFn: () => fetchFollowerCount(id),
		staleTime: 1e3 * 60 * 5
	});
	const { data: followingCount = 0 } = useQuery({
		queryKey: ["followingCount", id],
		queryFn: () => fetchFollowingCount(id),
		staleTime: 1e3 * 60 * 5
	});
	const { data: myFollowing = [] } = useQuery({
		queryKey: ["following", user?.id],
		queryFn: () => user ? fetchFollowing(user.id) : Promise.resolve([]),
		enabled: !!user,
		staleTime: 1e3 * 60 * 5
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
			qc.invalidateQueries({ queryKey: ["following_profiles", user?.id] });
			qc.invalidateQueries({ queryKey: ["followers", id] });
			toast.success(isFollowing ? "Unfollowed" : "Now following");
		},
		onError: (e) => toast.error(e.message)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePageSkeleton, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-3xl",
				children: "Member not found."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/directory",
				className: "mt-4 inline-block text-primary hover:underline",
				children: "Back to directory"
			})]
		})]
	});
	const socials = [
		{
			icon: import_lucide_react.Globe,
			href: profile.website,
			label: "Website"
		},
		{
			icon: import_lucide_react.Twitter,
			href: profile.twitter,
			label: "Twitter"
		},
		{
			icon: import_lucide_react.Github,
			href: profile.github,
			label: "GitHub"
		},
		{
			icon: import_lucide_react.Linkedin,
			href: profile.linkedin,
			label: "LinkedIn"
		}
	].filter((s) => !!s.href);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-page max-w-4xl py-8 sm:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/directory",
						className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to directory"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-6 sm:mt-8 sm:grid-cols-[auto_1fr] sm:gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberAvatar, {
							profile,
							size: "xl"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl sm:text-4xl",
								children: fullName(profile)
							}),
							profile.occupation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-base text-primary sm:text-lg",
								children: profile.occupation
							}),
							profile.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-1.5 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MapPin, { className: "h-3.5 w-3.5" }), profile.location]
							}),
							profile.tagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-base leading-relaxed sm:text-lg",
								children: profile.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
								children: [isMe ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/settings",
									className: "inline-flex h-11 items-center justify-center rounded-md border border-hairline bg-surface px-4 text-sm hover:bg-surface-2 sm:h-auto sm:py-2",
									children: "Edit my profile"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										if (!user) return navigate({
											to: "/auth",
											search: { next: `/members/${id}` }
										});
										followMutation.mutate();
									},
									disabled: followMutation.isPending,
									className: isFollowing ? "inline-flex h-11 items-center justify-center rounded-md border border-hairline bg-surface px-4 text-sm hover:bg-surface-2 sm:h-auto sm:py-2" : "inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 sm:h-auto sm:py-2",
									children: isFollowing ? "Following" : "Follow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: followerCount
										}),
										" follower",
										followerCount === 1 ? "" : "s"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: followingCount
									}), " following"] })]
								})]
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8 lg:col-span-2",
							children: [
								profile.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "About",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whitespace-pre-line text-[15px] leading-relaxed text-foreground/90",
										children: profile.bio
									})
								}),
								profile.passions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "Passions",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagList, { tags: profile.passions })
								}),
								profile.hobbies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "Hobbies",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagList, { tags: profile.hobbies })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "space-y-6",
							children: socials.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								title: "Elsewhere",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex flex-col gap-2",
									children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: s.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "flex h-11 items-center gap-2 rounded-md border border-hairline bg-surface px-3 text-sm hover:bg-surface-2 sm:h-auto sm:py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-muted-foreground" }), s.label]
									}) }, s.label))
								})
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 font-mono text-[11px] uppercase tracking-widest text-primary",
		children: ["/ ", title]
	}), children] });
}
function TagList({ tags }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "chip",
			children: t
		}, t))
	});
}
//#endregion
export { MemberPage as component };
