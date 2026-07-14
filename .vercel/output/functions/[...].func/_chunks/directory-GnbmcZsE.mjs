import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { t as SiteFooter } from "./SiteFooter-wXFmlI9p.mjs";
import { i as fetchAllProfiles, n as MemberCardSkeleton, p as fullName } from "./Skeletons-DrV2HNKr.mjs";
import { t as MemberCard } from "./MemberCard-DlxhlQPk.mjs";
import { a as StaggeredGrid } from "./motion-primitives-DN4jkJcX.mjs";
import { t as Route } from "./directory-lsMaDL9v.mjs";
//#region dist/server/assets/directory-GnbmcZsE.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function DirectoryPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { data: profiles = [], isLoading } = useQuery({
		queryKey: [
			"profiles",
			"filtered",
			search
		],
		queryFn: () => fetchAllProfiles(search),
		staleTime: 1e3 * 60 * 5
	});
	const [q, setQ] = (0, import_react.useState)("");
	const topTags = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		profiles.forEach((p) => {
			[...p.passions, ...p.hobbies].forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1));
		});
		return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t);
	}, [profiles]);
	const filtered = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		if (!term) return profiles;
		return profiles.filter((p) => {
			return [
				fullName(p),
				p.occupation,
				p.location,
				p.tagline,
				...p.passions,
				...p.hobbies
			].filter(Boolean).join(" ").toLowerCase().includes(term);
		});
	}, [profiles, q]);
	const activeFilterKey = Object.keys(search).find((k) => search[k]);
	const activeFilterValue = activeFilterKey ? search[activeFilterKey] : null;
	const clearFilter = () => navigate({ search: {} });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex-1 container-page py-8 sm:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[11px] uppercase tracking-widest text-primary",
								children: "/ Directory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl sm:text-4xl lg:text-5xl",
								children: "Every member of the community."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl text-sm text-muted-foreground sm:text-base",
								children: isLoading ? "Loading directory..." : `${profiles.length} ${profiles.length === 1 ? "person found" : "people found"}.`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-4 sm:mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search by name, role, hobby, interest…",
									className: "h-12 w-full rounded-lg border border-hairline bg-surface pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary/60 sm:h-11"
								})]
							}),
							activeFilterValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Showing:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: clearFilter,
									className: "flex items-center gap-1.5 rounded-full bg-primary/10 pl-3 pr-2 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors",
									children: [activeFilterValue, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "h-3.5 w-3.5" })]
								})]
							}),
							topTags.length > 0 && !activeFilterValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: clearFilter,
									className: `chip shrink-0 whitespace-nowrap ${!search.tag ? "!bg-primary/15 !text-primary !border-primary/40" : ""}`,
									children: "All"
								}), topTags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ search: { tag: search.tag === t ? void 0 : t } }),
									className: `chip shrink-0 whitespace-nowrap ${search.tag === t ? "!bg-primary/15 !text-primary !border-primary/40" : ""}`,
									children: t
								}, t))]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 sm:mt-8",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
							children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCardSkeleton, {}, i))
						}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed border-hairline p-10 text-center sm:p-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-xl sm:text-2xl",
								children: "No matches found."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [
									"Try a different search term or",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: clearFilter,
										className: "text-primary hover:underline",
										children: "clear the active filter"
									}),
									"."
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredGrid, {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
							children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile: p }, p.id))
						}, q + (activeFilterValue || "") + (search.tag || ""))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { DirectoryPage as component };
