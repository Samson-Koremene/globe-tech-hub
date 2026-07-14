import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as resolveAvatarUrl, m as initials } from "./Skeletons-DrV2HNKr.mjs";
//#region dist/server/assets/MemberAvatar-D9lX1-Ub.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var sizeMap = {
	sm: "h-9 w-9 text-xs",
	md: "h-12 w-12 text-sm",
	lg: "h-20 w-20 text-lg",
	xl: "h-32 w-32 text-2xl"
};
function MemberAvatar({ profile, size = "md", className = "" }) {
	const [url, setUrl] = (0, import_react.useState)(null);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		setLoaded(false);
		resolveAvatarUrl(profile.avatar_url).then((u) => {
			if (alive) setUrl(u);
		});
		return () => {
			alive = false;
		};
	}, [profile.avatar_url]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${sizeMap[size]} ${className} relative shrink-0 overflow-hidden rounded-full bg-surface-2 ring-1 ring-hairline`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `absolute inset-0 flex items-center justify-center font-medium tracking-wide text-muted-foreground transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"}`,
			children: initials(profile)
		}), url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: "",
			loading: "eager",
			decoding: "async",
			onLoad: () => setLoaded(true),
			className: `h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`
		})]
	});
}
//#endregion
export { MemberAvatar as t };
