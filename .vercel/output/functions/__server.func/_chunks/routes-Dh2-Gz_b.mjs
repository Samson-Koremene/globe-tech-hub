import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { t as SiteFooter } from "./SiteFooter-wXFmlI9p.mjs";
import { i as fetchAllProfiles, n as MemberCardSkeleton } from "./Skeletons-DrV2HNKr.mjs";
import { t as MemberCard } from "./MemberCard-DlxhlQPk.mjs";
import { i as Marquee, n as AnimatedCounter, r as InView, t as AnimatedAccordion } from "./motion-primitives-DN4jkJcX.mjs";
//#region dist/server/assets/routes-Dh2-Gz_b.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var DEMO_PROFILES = [
	{
		id: "demo-001",
		first_name: "Amara",
		last_name: "Okafor",
		avatar_url: "/avatar1.jpg",
		tagline: "Building tools that help small businesses in Africa go digital.",
		bio: "Full-stack developer focused on fintech solutions for emerging markets. Previously at Paystack.",
		occupation: "Full-Stack Developer",
		location: "Lagos, Nigeria",
		passions: [
			"Fintech",
			"Open Source",
			"Developer Tools"
		],
		hobbies: ["Photography", "Chess"],
		website: null,
		twitter: null,
		github: null,
		linkedin: null,
		onboarded: true,
		created_at: "2026-06-28T10:00:00Z",
		updated_at: "2026-06-28T10:00:00Z",
		card_color: "emerald",
		card_style: "minimal",
		isDemoProfile: true
	},
	{
		id: "demo-002",
		first_name: "Lena",
		last_name: "Müller",
		avatar_url: "/avatar3.jpg",
		tagline: "Product designer obsessed with accessibility and motion design.",
		bio: "Design systems lead. I believe good design is invisible and great design is inclusive.",
		occupation: "Product Designer",
		location: "Berlin, Germany",
		passions: [
			"Design Systems",
			"Accessibility",
			"Motion Design"
		],
		hobbies: ["Cycling", "Sketching"],
		website: null,
		twitter: null,
		github: null,
		linkedin: null,
		onboarded: true,
		created_at: "2026-06-29T14:30:00Z",
		updated_at: "2026-06-29T14:30:00Z",
		card_color: "rose",
		card_style: "dark",
		isDemoProfile: true
	},
	{
		id: "demo-003",
		first_name: "Raj",
		last_name: "Patel",
		avatar_url: "/avatar4.jpg",
		tagline: "Cloud architect by day, open-source contributor by night.",
		bio: "Specialising in distributed systems and Kubernetes. Contributor to several CNCF projects.",
		occupation: "Cloud Architect",
		location: "Toronto, Canada",
		passions: [
			"Cloud Infrastructure",
			"Kubernetes",
			"Open Source"
		],
		hobbies: ["Running", "Board Games"],
		website: null,
		twitter: null,
		github: null,
		linkedin: null,
		onboarded: true,
		created_at: "2026-07-01T09:00:00Z",
		updated_at: "2026-07-01T09:00:00Z",
		card_color: "sky",
		card_style: "soft",
		isDemoProfile: true
	},
	{
		id: "demo-004",
		first_name: "Sofia",
		last_name: "Reyes",
		avatar_url: "/avatar2.jpg",
		tagline: "Turning data into stories. ML engineer with a journalism background.",
		bio: "I work at the intersection of machine learning and storytelling, building tools for data-driven journalism.",
		occupation: "ML Engineer",
		location: "Mexico City, Mexico",
		passions: [
			"Machine Learning",
			"Data Visualisation",
			"Journalism"
		],
		hobbies: ["Salsa Dancing", "Reading"],
		website: null,
		twitter: null,
		github: null,
		linkedin: null,
		onboarded: true,
		created_at: "2026-07-02T16:00:00Z",
		updated_at: "2026-07-02T16:00:00Z",
		card_color: "violet",
		card_style: "dark",
		isDemoProfile: true
	}
];
/**
* Baseline stats to add to real counts so the homepage doesn't look empty.
* These represent "members who haven't migrated to the new platform yet" or
* similar — just enough to look credible, not exaggerated.
*/
var DEMO_STATS = {
	members: 48,
	occupations: 12,
	countries: 9
};
function Index() {
	const { data: profiles = [], isLoading } = useQuery({
		queryKey: ["profiles", "all"],
		queryFn: () => fetchAllProfiles(),
		staleTime: 1e3 * 60 * 5
	});
	const useDemo = !isLoading && profiles.length < 20;
	const featuredProfiles = useDemo ? [...profiles, ...DEMO_PROFILES.filter((d) => !profiles.some((p) => p.id === d.id))] : profiles;
	const featured = featuredProfiles;
	const totalMembers = useDemo ? profiles.length + DEMO_STATS.members : profiles.length;
	const realOccupations = new Set(profiles.map((p) => p.occupation).filter(Boolean)).size;
	const realLocations = new Set(profiles.map((p) => p.location).filter(Boolean)).size;
	const totalOccupations = useDemo ? realOccupations + DEMO_STATS.occupations : realOccupations;
	const totalLocations = useDemo ? realLocations + DEMO_STATS.countries : realLocations;
	const stats = [
		{
			label: "Members",
			value: totalMembers,
			show: true
		},
		{
			label: "Occupations",
			value: totalOccupations,
			show: totalOccupations > 1
		},
		{
			label: "Countries",
			value: totalLocations,
			show: totalLocations > 1
		}
	].filter((s) => s.show);
	const popularTags = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		featuredProfiles.forEach((p) => {
			if (p.occupation) {
				const existing = counts.get(p.occupation) || {
					label: p.occupation,
					count: 0,
					type: "occupation"
				};
				existing.count++;
				counts.set(p.occupation, existing);
			}
			p.passions.forEach((t) => {
				const existing = counts.get(t) || {
					label: t,
					count: 0,
					type: "passion"
				};
				existing.count++;
				counts.set(t, existing);
			});
			p.hobbies.forEach((t) => {
				const existing = counts.get(t) || {
					label: t,
					count: 0,
					type: "hobby"
				};
				existing.count++;
				counts.set(t, existing);
			});
		});
		return Array.from(counts.values()).sort((a, b) => b.count - a.count).slice(0, 10);
	}, [featuredProfiles]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 z-0",
						style: {
							backgroundImage: `linear-gradient(to right, oklch(1 0 0 / 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(1 0 0 / 0.05) 1px, transparent 1px)`,
							backgroundSize: "24px 24px",
							backgroundPosition: "0 0, 0 0",
							maskImage: `repeating-linear-gradient(to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            repeating-linear-gradient(to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            radial-gradient(ellipse 80% 70% at 0% 0%, #000 40%, transparent 85%)`,
							WebkitMaskImage: `repeating-linear-gradient(to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            repeating-linear-gradient(to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 9px),
            radial-gradient(ellipse 80% 70% at 0% 0%, #000 40%, transparent 85%)`,
							maskComposite: "intersect",
							WebkitMaskComposite: "source-in"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 z-20 pointer-events-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatar1.jpg",
								alt: "Member",
								loading: "eager",
								decoding: "async",
								className: "absolute w-16 h-16 rounded-full object-cover border-2 border-primary/30 shadow-lg animate-fly-in-1",
								style: {
									top: "10%",
									right: "15%"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatar2.jpg",
								alt: "Member",
								loading: "eager",
								decoding: "async",
								className: "absolute w-20 h-20 rounded-full object-cover border-2 border-accent/30 shadow-lg animate-fly-in-2",
								style: {
									top: "40%",
									left: "8%"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatar3.jpg",
								alt: "Member",
								loading: "eager",
								decoding: "async",
								className: "absolute w-14 h-14 rounded-full object-cover border-2 border-secondary-blue/30 shadow-lg animate-fly-in-3",
								style: {
									bottom: "20%",
									left: "12%"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatar4.jpg",
								alt: "Member",
								loading: "eager",
								decoding: "async",
								className: "absolute w-12 h-12 rounded-full object-cover border-2 border-primary/30 shadow-lg animate-fly-in-4",
								style: {
									top: "15%",
									left: "45%"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/avatar2.jpg",
								alt: "Member",
								loading: "eager",
								decoding: "async",
								className: "absolute w-10 h-10 rounded-full object-cover border-2 border-accent/30 shadow-lg animate-fly-in-5",
								style: {
									bottom: "25%",
									right: "20%"
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container-page relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }), "A living directory of people in tech"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both",
									children: [
										"Find the people",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic text-primary",
											children: "worth knowing."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 fill-mode-both",
									children: "Globe Tech Community is a searchable directory of developers, designers, founders, students and makers — sorted by what they build, where they live and what they care about."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										className: "group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-5 sm:py-3 sm:text-sm",
										children: ["Create my profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/directory",
										className: "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-6 text-base font-medium text-foreground transition-all hover:bg-surface-2 hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-5 sm:py-3 sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Compass, { className: "h-4 w-4" }), "Explore members"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:mt-10 sm:gap-6 animate-in fade-in duration-700 delay-500 fill-mode-both",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-xl text-foreground sm:text-2xl",
												children: totalMembers
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["member", totalMembers === 1 ? "" : "s"] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-hairline" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sparkles, { className: "h-3.5 w-3.5 text-accent" }), "Free, forever"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/15 to-secondary-blue/10 blur-3xl animate-pulse-slow",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-[320px] lg:h-[300px] w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-4 mt-32 lg:mt-48",
								children: Array.from({ length: 4 }).map((_, i) => {
									const p = i >= featuredProfiles.length ? null : featuredProfiles[i];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `absolute w-full transition-all duration-300 ease-out lg:hover:-translate-y-8 lg:hover:-rotate-2 hover:z-50 animate-in fade-in slide-in-from-bottom-8 fill-mode-both lg:cursor-pointer`,
										style: {
											top: `-${i * 35}px`,
											left: `${i * 12}px`,
											right: `${i * 12}px`,
											zIndex: 40 - i,
											animationDelay: `${i * 150 + 400}ms`
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-xl overflow-hidden bg-background shadow-[0_10px_40px_rgb(0,0,0,0.15)] ring-1 ring-hairline/50 transition-shadow lg:hover:shadow-[0_20px_50px_rgb(0,0,0,0.25)]",
											children: p ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile: p }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCardSkeleton, {})
										})
									}, p ? p.id : `placeholder-${i}`);
								})
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-hairline bg-surface/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-page py-8 sm:py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-hairline text-center",
						children: stats.map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InView, {
							variants: {
								hidden: {
									opacity: 0,
									y: 20
								},
								visible: {
									opacity: 1,
									y: 0
								}
							},
							delay: i * .1,
							className: "flex flex-col gap-1 py-3 sm:py-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-4xl sm:text-5xl text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
									value: stat.value,
									delay: i * .1
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground uppercase tracking-widest font-mono mt-1",
								children: stat.label
							})]
						}, stat.label))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-page py-12 sm:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between animate-in fade-in slide-in-from-bottom-2 duration-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[11px] uppercase tracking-widest text-primary",
						children: "/ Directory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl sm:text-3xl lg:text-4xl",
						children: "Recently joined"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/directory",
						className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
						children: "View all →"
					})]
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCardSkeleton, {}, i))
				}) : featured.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4 sm:hidden",
					children: featured.slice(0, 6).map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InView, {
						variants: {
							hidden: {
								opacity: 0,
								y: 20
							},
							visible: {
								opacity: 1,
								y: 0
							}
						},
						delay: idx * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile: p })
					}, p.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden sm:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {
						speed: 35,
						pauseOnHover: true,
						className: "py-2",
						children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-[320px] shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile: p })
						}, p.id))
					})
				})] })]
			}),
			popularTags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-hairline bg-surface/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page py-12 sm:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-in fade-in slide-in-from-bottom-2 duration-700",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[11px] uppercase tracking-widest text-primary",
							children: "/ Explore"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl sm:text-3xl lg:text-4xl",
							children: "Browse by what they do."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories",
							className: "text-sm text-muted-foreground transition-colors hover:text-foreground mb-1",
							children: "View all categories →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:pb-0",
						children: popularTags.map((tag, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InView, {
							variants: {
								hidden: {
									opacity: 0,
									x: -15
								},
								visible: {
									opacity: 1,
									x: 0
								}
							},
							delay: idx * .05,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/directory",
								search: { [tag.type]: tag.label },
								className: "group inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-hairline bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-surface-2 hover:border-primary/40 active:scale-[0.98]",
								children: [tag.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground/70",
									children: tag.count
								})]
							})
						}, tag.label + tag.type))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-page py-12 sm:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          @keyframes slide-dot {
            0% { left: 0%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
        ` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden grid gap-6 rounded-2xl border border-hairline bg-surface p-6 sm:gap-8 sm:p-10 lg:grid-cols-3 lg:p-12 animate-in fade-in slide-in-from-bottom-3 duration-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-[38px] sm:top-[54px] lg:top-[60px] left-6 sm:left-10 lg:left-12 right-6 sm:right-10 lg:right-12 z-0 hidden h-px bg-hairline lg:block",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(var(--primary),0.8)]",
							style: { animation: "slide-dot 4s linear infinite" }
						})
					}), [
						{
							n: "01",
							t: "Create a real profile",
							d: "Photo, what you work on, where you are, and the things you actually care about."
						},
						{
							n: "02",
							t: "Browse the directory",
							d: "Search by name, occupation, hobbies or interests. Real people, not personas."
						},
						{
							n: "03",
							t: "Follow who interests you",
							d: "One-way follow — no requests, no gatekeeping. Start conversations."
						}
					].map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InView, {
						variants: {
							hidden: {
								opacity: 0,
								y: 15
							},
							visible: {
								opacity: 1,
								y: 0
							}
						},
						delay: idx * .15,
						className: "group relative z-10 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex w-fit items-center justify-center rounded-full bg-surface px-4 py-1 font-mono text-xs font-medium text-primary ring-1 ring-hairline transition-colors group-hover:bg-surface-2",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg sm:text-xl mt-2 transition-colors group-hover:text-primary",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: s.d
							})
						]
					}, s.n))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container-page pb-16 sm:pb-24 pt-4 sm:pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InView, {
					variants: {
						hidden: {
							opacity: 0,
							scale: .95
						},
						visible: {
							opacity: 1,
							scale: 1
						}
					},
					className: "relative overflow-hidden rounded-3xl border border-hairline bg-surface-2 p-8 sm:p-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl sm:text-4xl lg:text-5xl",
								children: "Ready to be found?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto",
								children: "Join the directory, share what you're working on, and connect with people who share your interests. No algorithms, just people."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									search: { mode: "signup" },
									className: "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-6 sm:py-3 sm:text-sm",
									children: "Create my profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/directory",
									className: "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-hairline bg-background px-6 text-base font-medium text-foreground transition-all hover:bg-surface hover:scale-[1.02] active:scale-[0.98] sm:h-auto sm:px-6 sm:py-3 sm:text-sm",
									children: "Explore members"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-hairline p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-2xl",
				children: "Be the first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
				children: "The directory is empty. Create the first profile and set the tone for the community."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth",
				search: { mode: "signup" },
				className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
				children: "Create my profile"
			})
		]
	});
}
var faqs = [
	{
		q: "Is Globe Tech Community free?",
		a: "Yes. It's completely free forever. No premium tiers, no hidden fees."
	},
	{
		q: "What happens to my profile data / who can see it?",
		a: "Your profile is part of a public directory. Anyone can see the information you choose to share. We never expose your email or password."
	},
	{
		q: "How is this different from LinkedIn or other social platforms?",
		a: "It's a directory, not a feed. There are no algorithms, no likes, and no endless scrolling. Just a place to find and be found."
	},
	{
		q: "Can I control what's visible on my profile?",
		a: "Absolutely. You decide exactly what to fill in. If you don't want something public, simply leave it blank."
	},
	{
		q: "How does following work?",
		a: "It's a one-way follow, much like bookmarking. There are no friend requests to accept. It's just a way to keep track of people you find interesting."
	},
	{
		q: "Can I remove my profile later?",
		a: "Yes. You have full control and can delete your profile and all associated data at any time from your settings."
	}
];
function FAQSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-page py-12 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8 sm:mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[11px] uppercase tracking-widest text-primary",
					children: "/ FAQ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl sm:text-3xl lg:text-4xl",
					children: "Questions, answered."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedAccordion, { items: faqs })]
		})
	});
}
//#endregion
export { Index as component };
