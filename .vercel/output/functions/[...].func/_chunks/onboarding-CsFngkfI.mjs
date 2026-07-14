import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { r as ProfilePageSkeleton, u as fetchMyProfile } from "./Skeletons-DrV2HNKr.mjs";
import { t as ProfileForm } from "./ProfileForm-BGBK5lnz.mjs";
//#region dist/server/assets/onboarding-CsFngkfI.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function OnboardingPage() {
	const navigate = useNavigate();
	const { data: profile, isLoading } = useQuery({
		queryKey: ["me"],
		queryFn: fetchMyProfile,
		staleTime: 1e3 * 60 * 5
	});
	(0, import_react.useEffect)(() => {
		if (profile?.onboarded) navigate({
			to: "/members/$id",
			params: { id: profile.id }
		});
	}, [profile, navigate]);
	if (isLoading || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePageSkeleton, {})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page max-w-2xl py-8 sm:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground",
							children: "✓"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground animate-pulse",
							children: "2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-hairline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-xs font-medium text-muted-foreground",
							children: "3"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mb-6",
					children: "Step 2 of 3 — Create your profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[11px] uppercase tracking-widest text-primary",
					children: "/ Create your profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-3xl sm:text-4xl",
					children: "Tell us about you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground sm:text-base",
					children: "Complete your profile to join the directory. This is what other members will see — you can update it any time."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 sm:mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
						profile,
						markOnboarded: true,
						submitLabel: "Create profile & publish"
					})
				})
			]
		})]
	});
}
//#endregion
export { OnboardingPage as component };
