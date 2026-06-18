import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./store-CXReg1r8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RoleGuard-DOVUZXOp.js
var import_jsx_runtime = require_jsx_runtime();
function RoleGuard({ allow, children }) {
	const { role } = useStore();
	if (!allow.includes(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Không có quyền truy cập"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Vui lòng đổi vai trò ở góc trên bên phải để xem trang này."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { RoleGuard as t };
