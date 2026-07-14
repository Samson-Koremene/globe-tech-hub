import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { r as useAuth, t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { t as SiteFooter } from "./SiteFooter-wXFmlI9p.mjs";
import { l as fetchFollowingProfiles, o as fetchFollowerProfiles, r as ProfilePageSkeleton, u as fetchMyProfile } from "./Skeletons-DrV2HNKr.mjs";
import { t as MemberCard } from "./MemberCard-DlxhlQPk.mjs";
import { n as AnimatedCounter } from "./motion-primitives-DN4jkJcX.mjs";
//#region dist/server/assets/dashboard-CJjG3PEm.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function DashboardPage() {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("followers");
	const { data: profile, isLoading } = useQuery({
		queryKey: ["me"],
		queryFn: fetchMyProfile,
		staleTime: 1e3 * 60 * 5
	});
	const { data: followers = [], isLoading: isLoadingFollowers } = useQuery({
		queryKey: ["followers_profiles", user?.id],
		queryFn: () => user ? fetchFollowerProfiles(user.id) : Promise.resolve([]),
		enabled: !!user,
		staleTime: 1e3 * 60 * 5
	});
	const { data: following = [], isLoading: isLoadingFollowing } = useQuery({
		queryKey: ["following_profiles", user?.id],
		queryFn: () => user ? fetchFollowingProfiles(user.id) : Promise.resolve([]),
		enabled: !!user,
		staleTime: 1e3 * 60 * 5
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 container-page py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePageSkeleton, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 container-page py-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4",
				children: "Profile not found. Please complete onboarding."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/onboarding",
				className: "text-primary hover:underline",
				children: "Go to onboarding"
			})]
		})]
	});
	const isProfileComplete = profile.bio && profile.avatar_url && profile.occupation && (profile.passions.length > 0 || profile.hobbies.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 container-page py-8 sm:py-12 max-w-5xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[11px] uppercase tracking-widest text-primary mb-2",
						children: "/ Dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl sm:text-4xl mb-8",
						children: "Welcome back."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-1 space-y-6",
							children: [
								!isProfileComplete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl border border-accent/40 bg-accent/5 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.AlertCircle, { className: "h-5 w-5 text-accent shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-[15px] font-medium text-foreground",
												children: "Complete your profile"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground leading-relaxed",
												children: "Your profile is missing some details. A complete profile helps others find you and start conversations."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/settings",
												className: "mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Edit3, { className: "h-4 w-4" }), " Edit profile"]
											})
										] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-hairline bg-surface overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 border-b border-hairline flex items-center justify-between bg-surface-2/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium text-foreground",
												children: "Profile Snapshot"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/settings",
												className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Edit3, { className: "h-3 w-3" }), " Edit"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-5 pointer-events-none",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-5 pb-5 pt-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/members/$id",
												params: { id: profile.id },
												className: "w-full flex items-center justify-center gap-2 rounded-md border border-hairline bg-background py-2 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors",
												children: "View public profile"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-hairline bg-surface p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-medium text-foreground mb-4",
										children: "Quick Links"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/directory",
											className: "flex items-center justify-between p-3 rounded-lg hover:bg-surface-2 transition-colors group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Compass, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" }), "Explore Directory"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpRight, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/settings",
											className: "flex items-center justify-between p-3 rounded-lg hover:bg-surface-2 transition-colors group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Settings, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" }), "Account Settings"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpRight, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })]
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-2 space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveTab("followers"),
									className: `rounded-xl border p-5 text-left transition-all outline-none ${activeTab === "followers" ? "border-primary bg-primary/5 shadow-sm" : "border-hairline bg-surface hover:border-primary/40 hover:bg-surface-2"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground font-medium mb-1",
										children: "Followers"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-3xl text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: followers.length })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveTab("following"),
									className: `rounded-xl border p-5 text-left transition-all outline-none ${activeTab === "following" ? "border-primary bg-primary/5 shadow-sm" : "border-hairline bg-surface hover:border-primary/40 hover:bg-surface-2"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground font-medium mb-1",
										children: "Following"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-3xl text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: following.length })
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-hairline bg-surface p-6 min-h-[400px]",
								children: activeTab === "followers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-lg font-medium text-foreground mb-6 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Users, { className: "h-5 w-5 text-muted-foreground" }), "People who follow you"]
								}), isLoadingFollowers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: "Loading..."
								}) : followers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center py-12",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mx-auto w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mb-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Users, { className: "h-5 w-5 text-muted-foreground" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[15px] font-medium text-foreground",
											children: "No followers yet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground max-w-xs mx-auto",
											children: "When someone follows your profile, they'll show up here."
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: followers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "[&>a]:h-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile: p })
									}, p.id))
								})] }) : activeTab === "following" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-lg font-medium text-foreground mb-6 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Users, { className: "h-5 w-5 text-muted-foreground" }), "People you follow"]
								}), isLoadingFollowing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: "Loading..."
								}) : following.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center py-12",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mx-auto w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mb-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Users, { className: "h-5 w-5 text-muted-foreground" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[15px] font-medium text-foreground",
											children: "Not following anyone"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground max-w-xs mx-auto",
											children: "Explore the directory to find interesting people to follow."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/directory",
											className: "mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline",
											children: "Explore Directory"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: following.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "[&>a]:h-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile: p })
									}, p.id))
								})] }) : null
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { DashboardPage as component };
