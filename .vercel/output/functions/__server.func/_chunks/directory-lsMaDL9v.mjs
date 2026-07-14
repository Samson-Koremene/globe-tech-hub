import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region dist/server/assets/directory-lsMaDL9v.js
var $$splitComponentImporter = () => import("./directory-GnbmcZsE.mjs");
var searchSchema = objectType({
	occupation: stringType().optional(),
	passion: stringType().optional(),
	hobby: stringType().optional(),
	tag: stringType().optional()
});
var Route = createFileRoute("/directory")({
	validateSearch: (s) => searchSchema.parse(s),
	head: () => ({ meta: [
		{ title: "Directory — Globe Tech Community" },
		{
			name: "description",
			content: "Browse every member of Globe Tech Community. Search by name, occupation, hobbies or interests."
		},
		{
			property: "og:title",
			content: "Directory — Globe Tech Community"
		},
		{
			property: "og:description",
			content: "Browse every member of Globe Tech Community."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
