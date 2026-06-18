import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { t as Input } from "./_ssr/input-CDO3dKxI.mjs";
import { F as ArrowRight, L as ArrowLeft } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-CYB-gyWu.mjs";
import { t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Card } from "./_ssr/card-6Vmo0KkZ.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./_ssr/dialog-CwLzEEob.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.maintenance-BAeIlb9-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function categorize(m) {
	const t = `${m.title} ${m.description}`.toLowerCase();
	if (/(điện|đèn|quạt|ổ cắm|công tắc)/.test(t)) return "Điện";
	if (/(nước|vòi|ống|rò rỉ|bồn)/.test(t)) return "Nước";
	return "Cơ sở vật chất";
}
function priorityFor(cat, m) {
	if (cat === "Điện" || cat === "Nước") return "Cao";
	return /(hỏng|kẹt|vỡ)/i.test(`${m.title} ${m.description}`) ? "Trung bình" : "Thấp";
}
var CAT_BADGE = {
	Điện: {
		cls: "bg-yellow-50 text-yellow-700 border-yellow-200",
		label: "⚡ Điện"
	},
	Nước: {
		cls: "bg-blue-50 text-blue-700 border-blue-200",
		label: "💧 Nước"
	},
	"Cơ sở vật chất": {
		cls: "bg-amber-50 text-amber-800 border-amber-200",
		label: "🪑 Cơ sở vật chất"
	}
};
var PRIO_BADGE = {
	Cao: "bg-red-50 text-red-700 border-red-200",
	"Trung bình": "bg-orange-50 text-orange-700 border-orange-200",
	Thấp: "bg-gray-100 text-gray-600 border-gray-200"
};
var COLS = [
	"Chờ tiếp nhận",
	"Đang xử lý",
	"Hoàn thành"
];
var COL_TONE = {
	"Chờ tiếp nhận": "border-amber-200 bg-amber-50",
	"Đang xử lý": "border-indigo-200 bg-indigo-50",
	"Hoàn thành": "border-emerald-200 bg-emerald-50"
};
function MaintenancePage() {
	const { maintenance, rooms, students, setMaintStatus } = useStore();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("Chờ tiếp nhận");
	const [tech, setTech] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const openCard = (m) => {
		setSelected(m);
		setStatus(m.status);
		setTech("");
		setNote("");
	};
	const move = (id, dir) => {
		const m = maintenance.find((x) => x.id === id);
		if (!m) return;
		const next = COLS[COLS.indexOf(m.status) + dir];
		if (next) setMaintStatus(id, next);
	};
	const save = () => {
		if (!selected) return;
		setMaintStatus(selected.id, status);
		toast.success("Đã cập nhật yêu cầu bảo trì");
		setSelected(null);
	};
	const sel = selected;
	const selRoom = sel ? rooms.find((x) => x.id === sel.roomId) : null;
	const selStudent = sel ? students.find((x) => x.id === sel.studentId) : null;
	const selCat = sel ? categorize(sel) : null;
	const selPrio = sel && selCat ? priorityFor(selCat, sel) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: [
			"admin",
			"technical",
			"student"
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Bảng yêu cầu bảo trì",
				description: "Theo dõi và cập nhật trạng thái các yêu cầu sửa chữa."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-4",
				children: COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-lg border-2 ${COL_TONE[col]} p-3 min-h-[200px]`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: col
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: maintenance.filter((m) => m.status === col).length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: maintenance.filter((m) => m.status === col).map((m) => {
							const r = rooms.find((x) => x.id === m.roomId);
							const s = students.find((x) => x.id === m.studentId);
							const cat = categorize(m);
							const prio = priorityFor(cat, m);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-3 cursor-pointer hover:shadow-md transition",
								onClick: () => openCard(m),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-between gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: m.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"Phòng ",
												r?.number,
												" • ",
												s?.fullName
											]
										})] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-1.5 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: CAT_BADGE[cat].cls,
											children: CAT_BADGE[cat].label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: PRIO_BADGE[prio],
											children: prio
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs mt-2",
										children: m.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mt-3",
										onClick: (e) => e.stopPropagation(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: formatDate(m.createdAt)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												className: "h-7 w-7",
												onClick: () => move(m.id, -1),
												disabled: COLS.indexOf(m.status) === 0,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												className: "h-7 w-7",
												onClick: () => move(m.id, 1),
												disabled: COLS.indexOf(m.status) === COLS.length - 1,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })
											})]
										})]
									})
								]
							}, m.id);
						})
					})]
				}, col))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!sel,
				onOpenChange: (o) => !o && setSelected(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "sm:max-w-[560px] bg-white rounded-xl",
					children: sel && selCat && selPrio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-base",
							children: sel.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: PRIO_BADGE[selPrio],
								children: selPrio
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: CAT_BADGE[selCat].cls,
								children: CAT_BADGE[selCat].label
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Phòng"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-sm",
									children: selRoom?.number ?? "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Ngày gửi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-sm",
									children: formatDate(sel.createdAt)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Sinh viên gửi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-sm",
									children: selStudent?.fullName ?? "—"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-[#f3f4f6] flex items-center justify-center text-sm text-gray-500",
							style: { height: 180 },
							children: "📷 Ảnh sinh viên đính kèm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-semibold",
									children: "Cập nhật xử lý"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Trạng thái"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: status,
										onValueChange: (v) => setStatus(v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: c,
											children: c
										}, c)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Kỹ thuật viên phụ trách"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: tech,
										onChange: (e) => setTech(e.target.value),
										placeholder: "Nhập tên kỹ thuật viên..."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Ghi chú xử lý"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: note,
										onChange: (e) => setNote(e.target.value),
										placeholder: "Mô tả tình trạng và hướng xử lý...",
										rows: 3
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setSelected(null),
								children: "Hủy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "bg-[#C41230] hover:bg-[#a30f28] text-white",
								onClick: save,
								children: "Lưu cập nhật"
							})]
						})
					] })
				})
			})
		]
	});
}
//#endregion
export { MaintenancePage as component };
