import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.maintenance-new-BJ3-IgDJ.js
var $$splitComponentImporter = () => import("./_app.maintenance-new-CL1Ug239.mjs");
var Route = createFileRoute("/_app/maintenance-new")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => ({ title: typeof search.title === "string" ? search.title : "" })
});
//#endregion
export { Route as t };
