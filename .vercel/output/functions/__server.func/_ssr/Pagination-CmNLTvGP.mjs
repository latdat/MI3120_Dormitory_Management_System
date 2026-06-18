import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-DAB5b4Wl.mjs";
import { t as Input } from "./input-CDO3dKxI.mjs";
import { D as ChevronLeft, E as ChevronRight, o as Search } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Pagination-CmNLTvGP.js
var import_jsx_runtime = require_jsx_runtime();
function TableToolbar({ search, onSearch, searchPlaceholder = "Tìm theo tên hoặc MSSV...", status, onStatus, statusOptions, statusLabel = "Trạng thái" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 flex-wrap mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex-1 min-w-[220px] max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: search,
				onChange: (e) => onSearch(e.target.value),
				placeholder: searchPlaceholder,
				className: "pl-9"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: status,
			onValueChange: onStatus,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "w-[200px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: statusLabel })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: statusOptions.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: o.value,
				children: o.label
			}, o.value)) })]
		})]
	});
}
function Pagination({ page, totalPages, onChange }) {
	const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center gap-1 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				className: "h-8 px-3 text-xs rounded-md text-gray-600",
				disabled: page <= 1,
				onClick: () => onChange(Math.max(1, page - 1)),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), " Trang trước"]
			}),
			pages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(p),
				className: `h-8 min-w-8 px-2 rounded-md text-xs font-medium border transition-colors ${p === page ? "bg-[#C41230] text-white border-[#C41230]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`,
				children: p
			}, p)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				className: "h-8 px-3 text-xs rounded-md text-gray-600",
				disabled: page >= totalPages,
				onClick: () => onChange(Math.min(totalPages, page + 1)),
				children: ["Trang sau ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
			})
		]
	});
}
//#endregion
export { TableToolbar as n, Pagination as t };
