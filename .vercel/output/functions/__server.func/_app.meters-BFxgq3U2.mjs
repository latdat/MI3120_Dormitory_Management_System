import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { t as Input } from "./_ssr/input-CDO3dKxI.mjs";
import { S as Download, l as Printer, o as Search } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-CYB-gyWu.mjs";
import { n as formatVND } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.meters-BFxgq3U2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ELEC = 3500, WATER = 5973;
function MetersPage() {
	const { meters, rooms, updateMeter, generateInvoicesFromMeters } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [building, setBuilding] = (0, import_react.useState)("all");
	const filtered = meters.filter((m) => {
		const room = rooms.find((r) => r.id === m.roomId);
		if (!room) return false;
		if (building !== "all" && room.building !== building) return false;
		if (q && !room.number.toLowerCase().includes(q.toLowerCase())) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["accountant"],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Ghi chỉ số điện & nước",
				description: `Đơn giá: ${formatVND(ELEC)}/kWh điện, ${formatVND(WATER)}/m³ nước (tự động tính tiêu thụ & thành tiền)`,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700",
							onClick: () => toast("Đang xuất file..."),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Xuất Excel"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => toast("Đang xuất file..."),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " In danh sách"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								generateInvoicesFromMeters();
								toast.success("Đã tạo hóa đơn từ chỉ số");
							},
							children: "Tạo hóa đơn"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 flex-wrap mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-[200px] max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Tìm theo số phòng...",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: building,
					onValueChange: setBuilding,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[180px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Lọc theo tòa" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Tất cả"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "A",
							children: "Tòa A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "B",
							children: "Tòa B"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "C",
							children: "Tòa C"
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border bg-card overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phòng" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kỳ" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Điện cũ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Điện mới"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Tiêu thụ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Nước cũ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Nước mới"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Tiêu thụ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Thành tiền"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((m) => {
					const room = rooms.find((r) => r.id === m.roomId);
					const eUse = Math.max(0, m.newElec - m.prevElec);
					const wUse = Math.max(0, m.newWater - m.prevWater);
					const total = eUse * ELEC + wUse * WATER;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: room?.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: m.month }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: m.prevElec
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right w-28",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: m.newElec,
								onChange: (e) => updateMeter(m.id, { newElec: Number(e.target.value) }),
								className: "h-8 text-right bg-[#fffbeb] border-[#fbbf24] focus-visible:border-[#f59e0b] focus-visible:ring-[#f59e0b] rounded-md"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "text-right",
							children: [eUse, " kWh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: m.prevWater
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right w-28",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: m.newWater,
								onChange: (e) => updateMeter(m.id, { newWater: Number(e.target.value) }),
								className: "h-8 text-right bg-[#fffbeb] border-[#fbbf24] focus-visible:border-[#f59e0b] focus-visible:ring-[#f59e0b] rounded-md"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "text-right",
							children: [wUse, " m³"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right font-semibold",
							children: formatVND(total)
						})
					] }, m.id);
				}) })] })
			})
		]
	});
}
//#endregion
export { MetersPage as component };
