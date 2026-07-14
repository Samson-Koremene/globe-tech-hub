import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region dist/server/assets/auth-dDRVvmzW.js
var $$splitComponentImporter = () => import("./auth-DC9CiOsJ.mjs");
var searchSchema = objectType({
	mode: enumType(["signin", "signup"]).optional(),
	next: stringType().optional()
});
var Route = createFileRoute("/auth")({
	validateSearch: (s) => searchSchema.parse(s),
	head: () => ({ meta: [{ title: "Authentication — Globe Tech Community" }, {
		name: "description",
		content: "Sign in or create your Globe Tech Community profile."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
objectType({
	firstName: stringType().min(1, "First name is required"),
	lastName: stringType().min(1, "Last name is required"),
	email: stringType().email("Invalid email format"),
	password: stringType().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain an uppercase letter").regex(/[a-z]/, "Password must contain a lowercase letter").regex(/[0-9]/, "Password must contain a number").regex(/[^A-Za-z0-9]/, "Password must contain a special character")
});
objectType({
	email: stringType().email("Invalid email format"),
	password: stringType().min(1, "Password is required")
});
//#endregion
export { Route as t };
