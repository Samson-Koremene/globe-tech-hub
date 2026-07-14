import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { t as SiteFooter } from "./SiteFooter-wXFmlI9p.mjs";
import { i as fetchAllProfiles, t as CategorySkeleton } from "./Skeletons-DrV2HNKr.mjs";
//#region dist/server/assets/categories-BCf1Wrtq.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const { data: profiles = [], isLoading } = useQuery({
		queryKey: ["profiles", "all"],
		queryFn: () => fetchAllProfiles(),
		staleTime: 1e3 * 60 * 5
	});
	const groups = (0, import_react.useMemo)(() => {
		const occ = /* @__PURE__ */ new Map();
		const pas = /* @__PURE__ */ new Map();
		const hob = /* @__PURE__ */ new Map();
		profiles.forEach((p) => {
			if (p.occupation) occ.set(p.occupation, (occ.get(p.occupation) ?? 0) + 1);
			p.passions.forEach((t) => pas.set(t, (pas.get(t) ?? 0) + 1));
			p.hobbies.forEach((t) => hob.set(t, (hob.get(t) ?? 0) + 1));
		});
		const sort = (m) => Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
		return {
			occupations: sort(occ),
			passions: sort(pas),
			hobbies: sort(hob)
		};
	}, [profiles]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-page py-8 sm:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[11px] uppercase tracking-widest text-primary",
						children: "/ Categories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl sm:text-4xl lg:text-5xl",
						children: "By what they do & love."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base",
						children: "Categories emerge organically from what members put on their profiles."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-3",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySkeleton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySkeleton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySkeleton, {})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
								title: "Occupations",
								paramKey: "occupation",
								items: groups.occupations
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
								title: "Passions",
								paramKey: "passion",
								items: groups.passions
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
								title: "Hobbies",
								paramKey: "hobby",
								items: groups.hobbies
							})
						] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Group({ title, paramKey, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-baseline justify-between hairline-b pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs text-muted-foreground",
			children: items.length
		})]
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-sm text-muted-foreground",
		children: "None yet."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-1.5",
		children: items.map(([label, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/directory",
			search: { [paramKey]: label },
			className: "flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/90 hover:bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted-foreground",
				children: count
			})]
		}) }, label))
	})] });
}
//#endregion
export { CategoriesPage as component };
