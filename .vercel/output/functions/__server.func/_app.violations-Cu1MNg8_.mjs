import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as violationTypes, i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { t as Input } from "./_ssr/input-CDO3dKxI.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-CYB-gyWu.mjs";
import { n as TableToolbar, t as Pagination } from "./_ssr/Pagination-CmNLTvGP.mjs";
import { t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./_ssr/card-6Vmo0KkZ.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.violations-Cu1MNg8_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
function ViolationsPage() {
	const { violations, students, addViolation } = useStore();
	const [mssv, setMssv] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)(Object.keys(violationTypes)[0]);
	const [desc, setDesc] = (0, import_react.useState)("");
	const [q, setQ] = (0, import_react.useState)("");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const submit = (e) => {
		e.preventDefault();
		const s = students.find((x) => x.mssv.toLowerCase() === mssv.trim().toLowerCase());
		if (!s) {
			toast.error("Không tìm thấy MSSV");
			return;
		}
		addViolation({
			studentId: s.id,
			type,
			description: desc
		});
		toast.success(`Đã ghi vi phạm cho ${s.fullName}`);
		setMssv("");
		setDesc("");
	};
	const filtered = (0, import_react.useMemo)(() => violations.filter((v) => {
		if (typeFilter !== "all" && v.type !== typeFilter) return false;
		if (q) {
			const s = students.find((x) => x.id === v.studentId);
			if (!`${s?.fullName ?? ""} ${s?.mssv ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
		}
		return true;
	}), [
		violations,
		students,
		q,
		typeFilter
	]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const current = Math.min(page, totalPages);
	const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["admin", "security"],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Quản lý vi phạm",
			description: "Ghi nhận vi phạm và tự động trừ điểm rèn luyện."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Ghi vi phạm mới"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "MSSV" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: mssv,
								onChange: (e) => setMssv(e.target.value),
								placeholder: "VD: SV001",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Loại vi phạm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: type,
								onValueChange: setType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.entries(violationTypes).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: k,
									children: [
										k,
										" (−",
										v,
										" điểm)"
									]
								}, k)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mô tả" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: desc,
								onChange: (e) => setDesc(e.target.value),
								rows: 3,
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive",
							children: [
								"Điểm trừ tự động:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [
										"−",
										violationTypes[type],
										" điểm"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							children: "Ghi vi phạm"
						})
					]
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Lịch sử vi phạm"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableToolbar, {
							search: q,
							onSearch: (v) => {
								setQ(v);
								setPage(1);
							},
							status: typeFilter,
							onStatus: (v) => {
								setTypeFilter(v);
								setPage(1);
							},
							statusLabel: "Loại vi phạm",
							statusOptions: [{
								value: "all",
								label: "Tất cả"
							}, ...Object.keys(violationTypes).map((k) => ({
								value: k,
								label: k
							}))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sinh viên" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Loại vi phạm" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Mô tả" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Điểm trừ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ngày" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [view.map((v) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-medium",
									children: students.find((x) => x.id === v.studentId)?.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.type }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-muted-foreground",
									children: v.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "text-right text-destructive font-semibold",
									children: ["−", v.points]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(v.date) })
							] }, v.id);
						}), view.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 5,
							className: "text-center text-sm text-muted-foreground py-6",
							children: "Không có vi phạm phù hợp."
						}) })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
							page: current,
							totalPages,
							onChange: setPage
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { ViolationsPage as component };
