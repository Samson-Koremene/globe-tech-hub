import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CnHmCHwq.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { g as Link, l as useLocation, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, o as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region dist/server/assets/SiteHeader-DNzvs57J.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function AnimatedBackground({ children, defaultValue, onValueChange, className, transition, enableHover = false }) {
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const uniqueId = (0, import_react.useId)();
	const handleSetActiveId = (id) => {
		setActiveId(id);
		if (onValueChange) onValueChange(id);
	};
	(0, import_react.useEffect)(() => {
		if (defaultValue !== void 0) setActiveId(defaultValue);
	}, [defaultValue]);
	return import_react.Children.map(children, (child, index) => {
		const id = child.props["data-id"];
		const interactionProps = enableHover ? {
			onMouseEnter: () => handleSetActiveId(id),
			onMouseLeave: () => handleSetActiveId(defaultValue ?? null)
		} : { onClick: () => handleSetActiveId(id) };
		return (0, import_react.cloneElement)(child, {
			key: index,
			className: cn("relative inline-flex items-center justify-center", child.props.className),
			"aria-selected": activeId === id,
			"data-checked": activeId === id ? "true" : "false",
			...interactionProps
		}, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: activeId === id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				layoutId: `background-${uniqueId}`,
				className: cn("absolute inset-0 z-0", className),
				transition: transition ?? {
					type: "spring",
					bounce: .2,
					duration: .3
				},
				initial: { opacity: defaultValue ? 1 : 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10",
			children: child.props.children
		})] }));
	});
}
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		user,
		loading
	};
}
function SiteHeader() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const currentPath = useLocation().pathname;
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [mobileMenuOpen]);
	(0, import_react.useEffect)(() => {
		if (mobileMenuOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [mobileMenuOpen]);
	const signOut = async () => {
		await supabase.auth.signOut();
		setMobileMenuOpen(false);
		navigate({ to: "/" });
	};
	const navLinks = [
		{
			to: "/directory",
			label: "Directory"
		},
		{
			to: "/categories",
			label: "Categories"
		},
		{
			to: "/about",
			label: "About"
		}
	];
	const closeMobileMenu = () => setMobileMenuOpen(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 hairline-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex h-16 items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5",
						onClick: closeMobileMenu,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 24 24",
								className: "h-4 w-4",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "12",
									cy: "12",
									r: "9"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-[17px] font-medium tracking-tight",
							children: ["Globe Tech ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-muted-foreground sm:inline",
								children: "Community"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 md:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedBackground, {
							defaultValue: navLinks.find((l) => currentPath.startsWith(l.to))?.to || "",
							className: "rounded-md bg-surface",
							transition: {
								type: "spring",
								bounce: .2,
								duration: .3
							},
							enableHover: true,
							children: navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								"data-id": l.to,
								className: "px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
								activeProps: { className: "text-foreground" },
								children: l.label
							}, l.to))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center gap-2 md:flex",
						children: loading ? null : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
							children: "Dashboard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: signOut,
							className: "rounded-md border border-hairline px-3 py-2 text-sm text-foreground/90 transition-colors hover:bg-surface",
							children: "Sign out"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							search: { mode: "signup" },
							className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90",
							children: "Join now"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMobileMenuOpen(!mobileMenuOpen),
						className: "relative flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 md:hidden",
						"aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
						"aria-expanded": mobileMenuOpen,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-5 w-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-1/2 h-0.5 w-5 bg-current transition-all duration-300 ease-out ${mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-1/2 h-0.5 w-5 bg-current transition-all duration-200 ease-out ${mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-1/2 h-0.5 w-5 bg-current transition-all duration-300 ease-out ${mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}` })
							]
						})
					})
				]
			}),
			mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
				onClick: closeMobileMenu,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `fixed left-0 right-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-hairline bg-background shadow-xl transition-all duration-300 ease-out md:hidden ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "container-page flex flex-col py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 flex flex-col gap-1",
							children: navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								onClick: closeMobileMenu,
								className: "group flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground",
								activeProps: { className: "text-foreground bg-surface/60" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg",
									children: l.label
								})
							}, l.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 h-px bg-hairline" }),
						loading ? null : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard",
								onClick: closeMobileMenu,
								className: "flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.User, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dashboard" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: signOut,
								className: "flex items-center gap-3 rounded-lg px-4 py-3.5 text-left text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogOut, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign out" })]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								onClick: closeMobileMenu,
								className: "flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-muted-foreground transition-all active:scale-[0.98] hover:bg-surface hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign in" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: "signup" },
								onClick: closeMobileMenu,
								className: "mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition-all active:scale-[0.98] hover:opacity-90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Join now" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 border-t border-hairline pt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 px-4 text-xs text-muted-foreground/70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Home, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Globe Tech Community" })]
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { cn as n, useAuth as r, SiteHeader as t };
