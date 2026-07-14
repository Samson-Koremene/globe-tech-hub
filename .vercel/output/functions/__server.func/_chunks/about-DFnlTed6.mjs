import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { t as SiteFooter } from "./SiteFooter-wXFmlI9p.mjs";
//#region dist/server/assets/about-DFnlTed6.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-page max-w-3xl py-12 sm:py-16 lg:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[11px] uppercase tracking-widest text-primary",
						children: "/ About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          @keyframes bounce-rotate-in {
            0% { opacity: 0; transform: perspective(800px) rotateX(-60deg) translateY(30px); filter: blur(8px); }
            100% { opacity: 1; transform: perspective(800px) rotateX(0deg) translateY(0); filter: blur(0); }
          }
          .animate-word {
            display: inline-block;
            opacity: 0;
            transform-origin: bottom center;
            animation: bounce-rotate-in 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        ` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl",
						children: [
							[
								"A",
								"directory",
								"for",
								"the"
							].map((word, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "animate-word",
								style: { animationDelay: `${i * 120}ms` },
								children: word
							}), " "] }, `w1-${i}`)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "animate-word",
								style: { animationDelay: `480ms` },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-primary",
									children: "people"
								})
							}),
							[
								"",
								"—",
								"not",
								"the",
								"personas."
							].map((word, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "animate-word",
								style: { animationDelay: `${600 + i * 120}ms` },
								children: word
							})] }, `w2-${i}`))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prose prose-invert mt-8 max-w-none space-y-6 text-base leading-relaxed text-muted-foreground sm:mt-10 sm:text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Globe Tech Community is a home for developers, designers, founders, students and makers to have a public profile that shows what they do, what they care about, and where to find them." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "It's a directory, not a feed. There are no algorithms, no likes, no metrics to grind. Just a real page for each person, and a way to find each other." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Follows are one-way and public. If you like what someone's building, follow them and reach out. That's it." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							search: { mode: "signup" },
							className: "inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:h-auto sm:py-3",
							children: "Create my profile"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/directory",
							className: "inline-flex h-12 items-center justify-center rounded-md border border-hairline bg-surface px-5 text-sm font-medium hover:bg-surface-2 sm:h-auto sm:py-3",
							children: "Explore members"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AboutPage as component };
