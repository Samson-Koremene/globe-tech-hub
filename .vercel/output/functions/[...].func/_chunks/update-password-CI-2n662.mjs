import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CnHmCHwq.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-DNzvs57J.mjs";
import { i as stringType, o as ZodError } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region dist/server/assets/update-password-CI-2n662.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var passwordSchema = stringType().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain an uppercase letter").regex(/[a-z]/, "Password must contain a lowercase letter").regex(/[0-9]/, "Password must contain a number").regex(/[^A-Za-z0-9]/, "Password must contain a special character");
function PasswordStrength({ password }) {
	if (!password) return null;
	const checks = [
		{
			label: "8+ characters",
			valid: password.length >= 8
		},
		{
			label: "Uppercase",
			valid: /[A-Z]/.test(password)
		},
		{
			label: "Lowercase",
			valid: /[a-z]/.test(password)
		},
		{
			label: "Number",
			valid: /[0-9]/.test(password)
		},
		{
			label: "Special character",
			valid: /[^A-Za-z0-9]/.test(password)
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
function PasswordInput({ value, onChange, placeholder = "Password", ...rest }) {
	const [show, setShow] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			...rest,
			type: show ? "text" : "password",
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "h-12 w-full rounded-md border border-hairline bg-surface pl-3.5 pr-10 text-sm outline-none transition-colors focus:border-primary/60"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setShow(!show),
			className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
			children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.EyeOff, { className: "h-4.5 w-4.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Eye, { className: "h-4.5 w-4.5" })
		})]
	});
}
function UpdatePasswordPage() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) {
				toast.error("You must be logged in via a reset link to update your password.");
				navigate({ to: "/auth" });
			}
		});
	}, [navigate]);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			passwordSchema.parse(password);
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			toast.success("Password updated successfully!");
			navigate({ to: "/auth" });
			await supabase.auth.signOut();
		} catch (err) {
			if (err instanceof ZodError) toast.error(err.errors[0].message);
			else toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex-1 container-page flex items-center justify-center py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md bg-surface p-8 rounded-2xl border border-hairline shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[11px] uppercase tracking-widest text-primary mb-2",
						children: "/ Secure Account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold mb-2",
						children: "Set new password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-6",
						children: "Please enter your new strong password below."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
								placeholder: "New password",
								value: password,
								onChange: setPassword,
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { password }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: loading,
								className: "mt-4 h-12 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-opacity",
								children: loading ? "Updating..." : "Update password"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { UpdatePasswordPage as component };
