import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { k as Check, t as X } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-C0WYWEQX.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { n as TableToolbar, t as Pagination } from "./_ssr/Pagination-CmNLTvGP.mjs";
import { t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.applications-D9qOEsvR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_VARIANT = {
	"Chờ duyệt": "secondary",
	"Đã duyệt": "default",
	"Từ chối": "destructive"
};
var PAGE_SIZE = 10;
function ApplicationsPage() {
	const { applications, students, rooms, approveApplication, rejectApplication } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const filtered = (0, import_react.useMemo)(() => {
		return applications.filter((a) => {
			if (status !== "all" && a.status !== status) return false;
			if (q) {
				const s = students.find((x) => x.id === a.studentId);
				if (!`${s?.fullName ?? ""} ${s?.mssv ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
			}
			return true;
		});
	}, [
		applications,
		students,
		q,
		status
	]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const current = Math.min(page, totalPages);
	const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["admin"],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Đơn đăng ký",
				description: "Duyệt các đơn đăng ký phòng của sinh viên."
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
						value: "Chờ duyệt",
						label: "Chờ duyệt"
					},
					{
						value: "Đã duyệt",
						label: "Đã duyệt"
					},
					{
						value: "Từ chối",
						label: "Từ chối"
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sinh viên" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "MSSV" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phòng yêu cầu" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Loại đơn" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ngày gửi" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Trạng thái" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Hành động"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [view.map((a) => {
					const s = students.find((x) => x.id === a.studentId);
					const r = rooms.find((x) => x.id === a.roomId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: s?.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s?.mssv }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r?.number ?? "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: a.type }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(a.date) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: STATUS_VARIANT[a.status],
							children: a.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right space-x-1",
							children: a.status === "Chờ duyệt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "bg-green-600 text-white hover:bg-green-700",
								onClick: () => {
									approveApplication(a.id);
									toast.success("Đã duyệt đơn");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Duyệt"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "bg-[#fef3c7] text-[#b45309] border border-[#fbbf24] hover:bg-[#fde68a] hover:text-[#92400e]",
								onClick: () => {
									rejectApplication(a.id);
									toast("Đã từ chối đơn");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), " Từ chối"]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "—"
							})
						})
					] }, a.id);
				}), view.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 7,
					className: "text-center text-sm text-muted-foreground py-6",
					children: "Không có đơn phù hợp."
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
export { ApplicationsPage as component };
