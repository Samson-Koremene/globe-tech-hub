import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { p as fullName } from "./Skeletons-DrV2HNKr.mjs";
import { t as MemberAvatar } from "./MemberAvatar-D9lX1-Ub.mjs";
//#region dist/server/assets/MemberCard-DlxhlQPk.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function MemberCard({ profile }) {
	const tags = [...profile.passions.slice(0, 3), ...profile.hobbies.slice(0, 2)];
	const COLOR_MAP = {
		violet: "0.65 0.19 285",
		emerald: "0.7 0.15 160",
		rose: "0.65 0.2 25",
		amber: "0.75 0.18 70",
		sky: "0.67 0.17 235"
	};
	const color = profile.card_color || "default";
	const style = profile.card_style || "soft";
	const colorStyle = color !== "default" && COLOR_MAP[color] ? { "--primary": `oklch(${COLOR_MAP[color]})` } : void 0;
	let styleClasses = "";
	if (style === "dark") styleClasses = "border-zinc-800/80 bg-zinc-950 hover:border-primary/50 hover:bg-zinc-900";
	else if (style === "minimal") styleClasses = "border-hairline bg-background shadow-sm hover:border-primary/30";
	else styleClasses = "border-hairline bg-gradient-to-br from-surface to-surface-2 hover:border-primary/40 hover:from-surface hover:to-surface";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/members/$id",
		params: { id: profile.id },
		style: colorStyle,
		className: `group relative flex h-full flex-col gap-4 rounded-2xl border p-5 transition-all duration-300 ${styleClasses}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberAvatar, {
					profile,
					size: "lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-[15px] font-semibold leading-tight ${style === "dark" ? "text-zinc-100" : "text-foreground"}`,
							children: fullName(profile)
						}),
						profile.occupation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-sm text-primary/90",
							children: profile.occupation
						}),
						profile.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `mt-2 flex items-center gap-1.5 text-xs ${style === "dark" ? "text-zinc-400" : "text-muted-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MapPin, { className: "h-3 w-3" }), profile.location]
						})
					]
				})]
			}),
			profile.tagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `line-clamp-3 text-sm leading-relaxed ${style === "dark" ? "text-zinc-300" : "text-muted-foreground"}`,
				children: profile.tagline
			}),
			tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto flex flex-wrap gap-1.5",
				children: tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `chip ${style === "dark" ? "!border-zinc-800 !bg-zinc-800/50 !text-zinc-300" : ""}`,
					children: t
				}, t))
			})
		]
	});
}
//#endregion
export { MemberCard as t };
