import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHeader-_zSs9O0V.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			style: {
				fontSize: "28px",
				fontWeight: 700,
				letterSpacing: "-0.5px",
				lineHeight: 1.2,
				color: "#1a1a1a"
			},
			children: title
		}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm mt-1",
			style: { color: "#615d59" },
			children: description
		})] }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: actions
		})]
	});
}
//#endregion
export { PageHeader as t };
