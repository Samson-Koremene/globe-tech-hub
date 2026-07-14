import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CnHmCHwq.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { r as useAuth, t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as Route } from "./auth-dDRVvmzW.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region dist/server/assets/auth-DC9CiOsJ.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var signupSchema = objectType({
	firstName: stringType().min(1, "First name is required"),
	lastName: stringType().min(1, "Last name is required"),
	email: stringType().email("Invalid email format"),
	password: stringType().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain an uppercase letter").regex(/[a-z]/, "Password must contain a lowercase letter").regex(/[0-9]/, "Password must contain a number").regex(/[^A-Za-z0-9]/, "Password must contain a special character")
});
var signinSchema = objectType({
	email: stringType().email("Invalid email format"),
	password: stringType().min(1, "Password is required")
});
function PasswordStrength({ password }) {
	const pwd = password || "";
	const checks = [
		{
			label: "8+ characters",
			valid: pwd.length >= 8
		},
		{
			label: "Uppercase",
			valid: /[A-Z]/.test(pwd)
		},
		{
			label: "Lowercase",
			valid: /[a-z]/.test(pwd)
		},
		{
			label: "Number",
			valid: /[0-9]/.test(pwd)
		},
		{
			label: "Special character",
			valid: /[^A-Za-z0-9]/.test(pwd)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 text-xs space-y-1 bg-surface p-3 rounded-md border border-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-foreground mb-2",
			children: "Password requirements:"
		}), checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [c.valid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-3.5 w-3.5 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Circle, { className: "h-3.5 w-3.5 text-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: c.valid ? "text-foreground" : "text-muted-foreground",
				children: c.label
			})]
		}, c.label))]
	});
}
function Field({ error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 relative pb-5",
		children: [children, error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-0 left-0 text-xs text-red-500/90 font-medium",
			children: error
		})]
	});
}
function AuthPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [mode, setMode] = (0, import_react.useState)(search.mode ?? "signin");
	const [showPwd, setShowPwd] = (0, import_react.useState)(false);
	const [loadingGoogle, setLoadingGoogle] = (0, import_react.useState)(false);
	const [loginAttempts, setLoginAttempts] = (0, import_react.useState)(0);
	const [cooldownUntil, setCooldownUntil] = (0, import_react.useState)(null);
	const [cooldownRemaining, setCooldownRemaining] = (0, import_react.useState)(0);
	const { register: registerSignup, handleSubmit: handleSignupSubmit, watch: watchSignup, formState: { errors: signupErrors, isSubmitting: isSignupSubmitting }, reset: resetSignup } = useForm({
		resolver: u(signupSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: ""
		}
	});
	const { register: registerSignin, handleSubmit: handleSigninSubmit, formState: { errors: signinErrors, isSubmitting: isSigninSubmitting }, reset: resetSignin } = useForm({
		resolver: u(signinSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});
	const watchSignupPassword = watchSignup("password");
	(0, import_react.useEffect)(() => {
		if (user) {
			const next = search.next && search.next.startsWith("/") ? search.next : "/dashboard";
			navigate({ to: next });
		}
	}, [
		user,
		search.next,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!cooldownUntil) return;
		const interval = setInterval(() => {
			const remaining = Math.ceil((cooldownUntil - Date.now()) / 1e3);
			if (remaining <= 0) {
				setCooldownUntil(null);
				setLoginAttempts(0);
			} else setCooldownRemaining(remaining);
		}, 1e3);
		return () => clearInterval(interval);
	}, [cooldownUntil]);
	const onSignup = async (data) => {
		if (cooldownUntil) return toast.error(`Wait ${cooldownRemaining}s before trying.`);
		const emailLower = data.email.toLowerCase();
		if ([
			"@gmail.co",
			"@yahoo.co",
			"@hotmail.co",
			"@outlook.co",
			"@gmail.c"
		].some((typo) => emailLower.endsWith(typo))) return toast.error("Looks like a typo in your email domain. Did you mean .com?");
		try {
			const { error } = await supabase.auth.signUp({
				email: data.email,
				password: data.password,
				options: { data: {
					first_name: data.firstName,
					last_name: data.lastName
				} }
			});
			if (error) throw error;
			toast.success("Welcome! Let's set up your profile.");
		} catch (err) {
			toast.error(err.message || "Sign up failed");
		}
	};
	const onSignin = async (data) => {
		if (cooldownUntil) return toast.error(`Wait ${cooldownRemaining}s before trying.`);
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password
			});
			if (error) {
				const newAttempts = loginAttempts + 1;
				setLoginAttempts(newAttempts);
				if (newAttempts >= 5) {
					setCooldownUntil(Date.now() + 60 * 1e3);
					throw new Error("Too many failed attempts. Please try again in 60 seconds.");
				}
				throw new Error("Invalid email or password");
			}
			setLoginAttempts(0);
		} catch (err) {
			toast.error(err.message || "Sign in failed");
		}
	};
	const google = async () => {
		setLoadingGoogle(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: window.location.origin }
		});
		if (error) toast.error(error.message);
		setLoadingGoogle(false);
	};
	const isSubmitting = isSignupSubmitting || isSigninSubmitting;
	const isButtonDisabled = isSubmitting || loadingGoogle || !!cooldownUntil;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex-1 container-page grid lg:grid-cols-2 gap-12 lg:gap-24 items-center py-12 sm:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden lg:block relative w-full h-[600px] rounded-3xl overflow-hidden border border-hairline shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/hero-img.jpg",
						alt: "Globe Tech Community Members",
						loading: "eager",
						decoding: "async",
						className: "absolute inset-0 w-full h-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 via-40% to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 p-12 text-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-5xl text-white drop-shadow-lg",
								children: "Find your people."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-white max-w-md text-lg leading-relaxed drop-shadow-md",
								children: "Join a thriving directory of developers, designers, and creators building the future together."
							})]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md mx-auto lg:mx-0 justify-self-center lg:justify-self-start lg:pl-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-[11px] uppercase tracking-widest text-primary",
						children: ["/ ", mode === "signin" ? "Sign in" : "Create account"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-3xl leading-tight sm:text-4xl",
						children: mode === "signin" ? "Welcome back." : "Join the community."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: mode === "signin" ? "Sign in to your Globe Tech Community profile." : "A minute to sign up, five to fill out your profile."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: google,
						disabled: isButtonDisabled,
						className: "mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm font-medium hover:bg-surface-2 disabled:opacity-60 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), "Continue with Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-hairline" }),
							"or with email",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-hairline" })
						]
					}),
					mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSignupSubmit(onSignup),
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									error: signupErrors.firstName?.message,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										...registerSignup("firstName"),
										placeholder: "First name",
										className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									error: signupErrors.lastName?.message,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										...registerSignup("lastName"),
										placeholder: "Last name",
										className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								error: signupErrors.email?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									...registerSignup("email"),
									type: "email",
									placeholder: "you@domain.com",
									className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								error: signupErrors.password?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										...registerSignup("password"),
										type: showPwd ? "text" : "password",
										placeholder: "Password",
										className: "h-12 w-full rounded-md border border-hairline bg-surface pl-3.5 pr-10 text-sm outline-none transition-colors focus:border-primary/60"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPwd(!showPwd),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
										children: showPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.EyeOff, { className: "h-4.5 w-4.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Eye, { className: "h-4.5 w-4.5" })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pb-3 pt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { password: watchSignupPassword })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isButtonDisabled,
								className: "mt-2 h-12 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity",
								children: isSubmitting ? "Please wait…" : cooldownUntil ? `Wait ${cooldownRemaining}s` : "Sign up"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSigninSubmit(onSignin),
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								error: signinErrors.email?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									...registerSignin("email"),
									type: "email",
									placeholder: "you@domain.com",
									className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								error: signinErrors.password?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										...registerSignin("password"),
										type: showPwd ? "text" : "password",
										placeholder: "Password",
										className: "h-12 w-full rounded-md border border-hairline bg-surface pl-3.5 pr-10 text-sm outline-none transition-colors focus:border-primary/60"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPwd(!showPwd),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
										children: showPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.EyeOff, { className: "h-4.5 w-4.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Eye, { className: "h-4.5 w-4.5" })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right pb-4 -mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/reset-password",
									className: "text-xs font-medium text-primary hover:underline",
									children: "Forgot password?"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isButtonDisabled,
								className: "mt-2 h-12 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity",
								children: isSubmitting ? "Please wait…" : cooldownUntil ? `Wait ${cooldownRemaining}s` : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 text-center text-sm text-muted-foreground",
						children: mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"New here?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode("signup");
									setLoginAttempts(0);
									setCooldownUntil(null);
									resetSignup();
									resetSignin();
								},
								className: "font-medium text-primary hover:underline",
								children: "Create an account"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Already a member?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode("signin");
									resetSignup();
									resetSignin();
								},
								className: "font-medium text-primary hover:underline",
								children: "Sign in"
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-center text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "transition-colors hover:text-foreground",
							children: "← Back home"
						})
					})
				]
			})]
		})]
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "h-4 w-4",
		viewBox: "0 0 24 24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EA4335",
			d: "M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.7 2.5 2.5 6.7 2.5 12s4.2 9.5 9.5 9.5c5.5 0 9.1-3.8 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
		})
	});
}
//#endregion
export { AuthPage as component };
