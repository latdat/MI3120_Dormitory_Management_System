import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-C0WYWEQX.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { n as TableToolbar, t as Pagination } from "./_ssr/Pagination-CmNLTvGP.mjs";
import { n as formatVND, t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.deposits-D8F_nLav.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
function DepositsPage() {
	const { deposits, students, refundDeposit } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const filtered = (0, import_react.useMemo)(() => deposits.filter((d) => {
		if (status !== "all" && d.status !== status) return false;
		if (q) {
			const s = students.find((x) => x.id === d.studentId);
			if (!`${s?.fullName ?? ""} ${s?.mssv ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
		}
		return true;
	}), [
		deposits,
		students,
		q,
		status
	]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const current = Math.min(page, totalPages);
	const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["accountant"],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Quản lý tiền cọc",
				description: "Tiền cọc đặt phòng và hoàn trả khi sinh viên trả phòng."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableToolbar, {
				search: q,
				onSearch: (v) => {
					setQ(v);
					setPage(1);
				},
				status,
				onStatus: (v) => {
					setStatus(v);
					setPage(1);
				},
				statusOptions: [
					{
						value: "all",
						label: "Tất cả"
					},
					{
						value: "Đã thu",
						label: "Đã thu"
					},
					{
						value: "Đã hoàn",
						label: "Đã hoàn"
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sinh viên" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "MSSV" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Số tiền"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ngày thu" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Trạng thái" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Hành động"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [view.map((d) => {
					const s = students.find((x) => x.id === d.studentId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: s?.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s?.mssv }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: formatVND(d.amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(d.date) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: d.status === "Đã hoàn" ? "secondary" : "default",
							children: d.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: d.status === "Đã thu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									refundDeposit(d.id);
									toast.success("Đã hoàn cọc");
								},
								children: "Hoàn cọc"
							})
						})
					] }, d.id);
				}), view.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 6,
					className: "text-center text-sm text-muted-foreground py-6",
					children: "Không có khoản cọc phù hợp."
				}) })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page: current,
					totalPages,
					onChange: setPage
				})]
			})
		]
	});
}
//#endregion
export { DepositsPage as component };
