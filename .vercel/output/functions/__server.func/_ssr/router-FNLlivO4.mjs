import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as StoreProvider } from "./store-CXReg1r8.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$14 } from "../_app.maintenance-new-BJ3-IgDJ.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-FNLlivO4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D0JNsaC1.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Trang bạn tìm không tồn tại."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground",
						children: "Về trang chủ"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error(error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Đã xảy ra lỗi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Vui lòng thử lại."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground",
					children: "Thử lại"
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Hệ thống Quản lý Ký túc xá" },
			{
				name: "description",
				content: "Hệ thống quản lý ký túc xá đại học"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "vi",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StoreProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$12 = () => import("../_app-C2ZK8T_l.mjs");
var Route$12 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./routes-6m1LUbs0.mjs");
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Đăng nhập — KTX Đại học" }, {
		name: "description",
		content: "Đăng nhập hệ thống quản lý ký túc xá"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_app.violations-Cu1MNg8_.mjs");
var Route$10 = createFileRoute("/_app/violations")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("../_app.rooms-YYruJAH8.mjs");
var Route$9 = createFileRoute("/_app/rooms")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("../_app.reports-DNg4byWk.mjs");
var Route$8 = createFileRoute("/_app/reports")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("../_app.notifications-BthSNMfs.mjs");
var Route$7 = createFileRoute("/_app/notifications")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("../_app.my-room-8nG3lPqB.mjs");
var Route$6 = createFileRoute("/_app/my-room")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("../_app.meters-BFxgq3U2.mjs");
var Route$5 = createFileRoute("/_app/meters")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_app.maintenance-BAeIlb9-.mjs");
var Route$4 = createFileRoute("/_app/maintenance")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_app.invoices-C_q44hJi.mjs");
var Route$3 = createFileRoute("/_app/invoices")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_app.deposits-D8F_nLav.mjs");
var Route$2 = createFileRoute("/_app/deposits")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_app.dashboard-B3ZUf4DI.mjs");
var Route$1 = createFileRoute("/_app/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_app.applications-D9qOEsvR.mjs");
var Route = createFileRoute("/_app/applications")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AppRoute = Route$12.update({
	id: "/_app",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AppViolationsRoute = Route$10.update({
	id: "/violations",
	path: "/violations",
	getParentRoute: () => AppRoute
});
var AppRoomsRoute = Route$9.update({
	id: "/rooms",
	path: "/rooms",
	getParentRoute: () => AppRoute
});
var AppReportsRoute = Route$8.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AppRoute
});
var AppNotificationsRoute = Route$7.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AppRoute
});
var AppMyRoomRoute = Route$6.update({
	id: "/my-room",
	path: "/my-room",
	getParentRoute: () => AppRoute
});
var AppMetersRoute = Route$5.update({
	id: "/meters",
	path: "/meters",
	getParentRoute: () => AppRoute
});
var AppMaintenanceNewRoute = Route$14.update({
	id: "/maintenance-new",
	path: "/maintenance-new",
	getParentRoute: () => AppRoute
});
var AppMaintenanceRoute = Route$4.update({
	id: "/maintenance",
	path: "/maintenance",
	getParentRoute: () => AppRoute
});
var AppInvoicesRoute = Route$3.update({
	id: "/invoices",
	path: "/invoices",
	getParentRoute: () => AppRoute
});
var AppDepositsRoute = Route$2.update({
	id: "/deposits",
	path: "/deposits",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$1.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppApplicationsRoute: Route.update({
		id: "/applications",
		path: "/applications",
		getParentRoute: () => AppRoute
	}),
	AppDashboardRoute,
	AppDepositsRoute,
	AppInvoicesRoute,
	AppMaintenanceRoute,
	AppMaintenanceNewRoute,
	AppMetersRoute,
	AppMyRoomRoute,
	AppNotificationsRoute,
	AppReportsRoute,
	AppRoomsRoute,
	AppViolationsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren)
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
