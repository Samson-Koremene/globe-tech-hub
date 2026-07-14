import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, n as useSpring, o as AnimatePresence, r as useMotionValue, t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as cn } from "./SiteHeader-DNzvs57J.mjs";
//#region dist/server/assets/motion-primitives-DN4jkJcX.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function AnimatedCounter({ value, direction = "up", className, delay = 0 }) {
	const ref = import_react.useRef(null);
	const motionValue = useMotionValue(direction === "down" ? value : 0);
	const springValue = useSpring(motionValue, {
		damping: 50,
		stiffness: 100,
		mass: 1
	});
	const isInView = useInView(ref, {
		once: true,
		margin: "-50px"
	});
	import_react.useEffect(() => {
		if (isInView) {
			const timeoutId = setTimeout(() => {
				motionValue.set(value);
			}, delay * 1e3);
			return () => clearTimeout(timeoutId);
		}
	}, [
		motionValue,
		isInView,
		value,
		delay
	]);
	import_react.useEffect(() => {
		return springValue.on("change", (latest) => {
			if (ref.current) ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
		});
	}, [springValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		ref
	});
}
function AnimatedAccordion({ items }) {
	const [openIndex, setOpenIndex] = import_react.useState(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-3",
		children: items.map((item, idx) => {
			const isOpen = openIndex === idx;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InView, {
				variants: {
					hidden: {
						opacity: 0,
						filter: "blur(4px)"
					},
					visible: {
						opacity: 1,
						filter: "blur(0px)"
					}
				},
				delay: idx * .1,
				className: cn("rounded-xl border transition-colors", isOpen ? "border-primary/40 bg-surface-2" : "border-hairline bg-surface hover:bg-surface-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpenIndex(isOpen ? null : idx),
					className: "flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5 outline-none",
					"aria-expanded": isOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground pr-4 text-[15px] sm:text-base",
						children: item.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen ? "rotate-180 text-primary" : "") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					initial: false,
					children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							height: 0,
							opacity: 0
						},
						animate: {
							height: "auto",
							opacity: 1
						},
						exit: {
							height: 0,
							opacity: 0
						},
						transition: {
							duration: .25,
							ease: "easeOut"
						},
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 pb-5 pt-0 sm:px-6 sm:pb-6 text-sm sm:text-[15px] leading-relaxed text-muted-foreground",
							children: item.a
						})
					})
				})]
			}, idx);
		})
	});
}
function StaggeredGrid({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: "hidden",
		animate: "visible",
		variants: { visible: { transition: { staggerChildren: .05 } } },
		className,
		children: import_react.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: {
				hidden: {
					opacity: 0,
					y: 15
				},
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: .4,
						ease: "easeOut"
					}
				}
			},
			className: "h-full",
			children: child
		}))
	});
}
function InView({ children, variants = {
	hidden: {
		opacity: 0,
		y: 15
	},
	visible: {
		opacity: 1,
		y: 0
	}
}, transition = {
	duration: .35,
	ease: "easeOut"
}, viewOptions = {
	margin: "0px 0px -100px 0px",
	once: true
}, className, delay = 0 }) {
	const ref = import_react.useRef(null);
	const isInView = useInView(ref, viewOptions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		initial: "hidden",
		animate: isInView ? "visible" : "hidden",
		variants,
		transition: {
			...transition,
			delay
		},
		className,
		children
	});
}
function Marquee({ children, speed = 40, pauseOnHover = true, className }) {
	const [contentWidth, setContentWidth] = import_react.useState(0);
	const contentRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (contentRef.current) setContentWidth(contentRef.current.scrollWidth);
	}, [children]);
	const duration = contentWidth > 0 ? contentWidth / speed : 20;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group relative overflow-hidden", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex w-max", pauseOnHover && "group-hover:[animation-play-state:paused]"),
				style: { animation: `marquee-scroll ${duration}s linear infinite` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: contentRef,
					className: "flex shrink-0 gap-4",
					children
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 gap-4",
					"aria-hidden": true,
					children
				})]
			})
		]
	});
}
//#endregion
export { StaggeredGrid as a, Marquee as i, AnimatedCounter as n, InView as r, AnimatedAccordion as t };
