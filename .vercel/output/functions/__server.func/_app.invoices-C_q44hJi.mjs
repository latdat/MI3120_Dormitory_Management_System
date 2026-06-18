import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore, r as useCurrentStudent } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./_ssr/tooltip-0uxD0LRD.mjs";
import { M as Bell, b as FilePlusCorner, c as QrCode, l as Printer, w as CircleCheckBig, x as Eye, y as FileText } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-C0WYWEQX.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-CYB-gyWu.mjs";
import { n as TableToolbar, t as Pagination } from "./_ssr/Pagination-CmNLTvGP.mjs";
import { n as formatVND, t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./_ssr/dialog-CwLzEEob.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.invoices-C_q44hJi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_CLS = {
	"Đã thanh toán": "rounded-full bg-[#dcfce7] text-[#16a34a] hover:bg-[#dcfce7] border-transparent",
	"Chưa thanh toán": "rounded-full bg-[#fef9c3] text-[#ca8a04] hover:bg-[#fef9c3] border-transparent",
	"Quá hạn": "rounded-full bg-[#fee2e2] text-[#dc2626] hover:bg-[#fee2e2] border-transparent"
};
var PAGE_SIZE = 10;
function InvoicesPage() {
	const { role, invoices, students, rooms, payInvoice, generateInvoicesFromMeters } = useStore();
	const current = useCurrentStudent();
	const baseList = role === "student" && current ? invoices.filter((i) => i.studentId === current.id) : invoices;
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [payTarget, setPayTarget] = (0, import_react.useState)(null);
	const [bulkOpen, setBulkOpen] = (0, import_react.useState)(false);
	const [bulkMonth, setBulkMonth] = (0, import_react.useState)("2026-05");
	const [bulkBuilding, setBulkBuilding] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const filtered = (0, import_react.useMemo)(() => baseList.filter((i) => {
		if (status !== "all" && i.status !== status) return false;
		if (q) {
			const s = students.find((x) => x.id === i.studentId);
			if (!`${s?.fullName ?? ""} ${s?.mssv ?? ""} ${i.id}`.toLowerCase().includes(q.toLowerCase())) return false;
		}
		return true;
	}), [
		baseList,
		students,
		q,
		status
	]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const pageNum = Math.min(page, totalPages);
	const view = filtered.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
	const detailStudent = detail ? students.find((s) => s.id === detail.studentId) : null;
	const detailRoom = detail ? rooms.find((r) => r.id === detail.roomId) : null;
	const elecRate = 3500;
	const waterRate = 5973;
	const elecOld = 120, elecNew = 238, elecUsed = elecNew - elecOld;
	const waterOld = 45, waterNew = 67, waterUsed = waterNew - waterOld;
	const payStudent = payTarget ? students.find((s) => s.id === payTarget.studentId) : null;
	const canBulk = role === "accountant" || role === "admin";
	const handleBulk = () => {
		generateInvoicesFromMeters();
		toast.success(`Đã tạo hóa đơn hàng loạt cho kỳ ${bulkMonth}${bulkBuilding === "all" ? "" : ` — Tòa ${bulkBuilding}`}`);
		setBulkOpen(false);
	};
	const confirmPaid = () => {
		if (payTarget) {
			payInvoice(payTarget.id);
			toast.success(`Đã ghi nhận thanh toán ${payTarget.id}`);
		}
		setPayTarget(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
		delayDuration: 150,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Hóa đơn",
				description: role === "student" ? "Các hóa đơn của bạn." : "Toàn bộ hóa đơn trong hệ thống.",
				actions: canBulk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setBulkOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "h-4 w-4" }), " Tạo hóa đơn hàng loạt"]
				}) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableToolbar, {
				search: q,
				onSearch: (v) => {
					setQ(v);
					setPage(1);
				},
				searchPlaceholder: "Tìm theo tên, MSSV hoặc mã HĐ...",
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
						value: "Đã thanh toán",
						label: "Đã thanh toán"
					},
					{
						value: "Chưa thanh toán",
						label: "Chưa thanh toán"
					},
					{
						value: "Quá hạn",
						label: "Quá hạn"
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Mã HĐ" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sinh viên" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phòng" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kỳ" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Điện"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Nước"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Phòng"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Tổng"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Hạn" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Trạng thái" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Hành động"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [view.map((i) => {
					const s = students.find((x) => x.id === i.studentId);
					const r = rooms.find((x) => x.id === i.roomId);
					const isUnpaid = i.status !== "Đã thanh toán";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: i.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s?.fullName }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r?.number }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: i.month }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: formatVND(i.electricity)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: formatVND(i.water)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: formatVND(i.roomFee)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right font-semibold",
							children: formatVND(i.total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(i.dueDate) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: STATUS_CLS[i.status],
							children: i.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setDetail(i),
											className: "text-gray-400 hover:text-blue-500 transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Xem chi tiết" })] }),
									role === "student" && isUnpaid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setPayTarget(i),
											className: "text-gray-400 hover:text-[#C41230] transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { size: 16 })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Thanh toán bằng QR" })] }),
									role !== "student" && isUnpaid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => toast(`Đã gửi nhắc nhở ${i.id}`),
											className: "text-gray-400 hover:text-orange-500 transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 16 })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Nhắc nợ" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												payInvoice(i.id);
												toast.success(`Đã xác nhận thanh toán ${i.id}`);
											},
											className: "text-gray-400 hover:text-green-500 transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 16 })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Xác nhận thanh toán" })] })] })
								]
							})
						})
					] }, i.id);
				}), view.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 11,
					className: "text-center text-sm text-muted-foreground py-6",
					children: "Không có hóa đơn phù hợp."
				}) })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page: pageNum,
					totalPages,
					onChange: setPage
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!detail,
				onOpenChange: (o) => !o && setDetail(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "sm:max-w-[520px] bg-white rounded-xl p-0 overflow-hidden",
					children: detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#C41230] text-white px-6 py-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm uppercase tracking-wide opacity-90",
								children: "Hóa đơn tháng"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold",
								children: detail.month
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-6 py-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-y-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Sinh viên:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-right font-medium",
											children: detailStudent?.fullName ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "MSSV:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-right font-medium",
											children: detailStudent?.mssv ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Phòng:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-right font-medium",
											children: detailRoom?.number ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Kỳ thanh toán:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-right font-medium",
											children: detail.month
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "text-muted-foreground border-b",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-left py-2 font-medium",
													children: "Hạng mục"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right py-2 font-medium",
													children: "CS cũ"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right py-2 font-medium",
													children: "CS mới"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right py-2 font-medium",
													children: "Tiêu thụ"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right py-2 font-medium",
													children: "Đơn giá"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right py-2 font-medium",
													children: "Thành tiền"
												})
											]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-b",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-2",
														children: "Điện"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: elecOld
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: elecNew
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "text-right",
														children: [elecUsed, " kWh"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "text-right",
														children: [formatVND(elecRate), "/kWh"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right font-medium",
														children: formatVND(elecUsed * elecRate)
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-b",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-2",
														children: "Nước"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: waterOld
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: waterNew
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "text-right",
														children: [waterUsed, " m³"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "text-right",
														children: [formatVND(waterRate), "/m³"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right font-medium",
														children: formatVND(Math.round(waterUsed * waterRate))
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-b",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-2",
														children: "Tiền phòng"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right",
														children: "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "text-right font-medium",
														children: formatVND(detail.roomFee)
													})
												]
											})
										] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "TỔNG CỘNG"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-[#C41230] text-lg",
										children: formatVND(detail.total)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-sm pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"Hạn thanh toán:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground font-medium",
												children: formatDate(detail.dueDate)
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: STATUS_CLS[detail.status],
										children: detail.status
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-6 py-4 border-t flex justify-end gap-2 bg-gray-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setDetail(null),
								children: "Đóng"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "border-[#C41230] text-[#C41230] hover:bg-[#C41230]/10 hover:text-[#C41230]",
								onClick: () => window.print(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-1.5" }), " In hóa đơn"]
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!payTarget,
				onOpenChange: (o) => !o && setPayTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[400px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Thanh toán hóa đơn" }) }),
						payTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-[200px] h-[200px] rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium",
										children: "QR Code"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center text-xs text-muted-foreground",
									children: "Quét mã QR bằng app ngân hàng để thanh toán"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-muted/40 p-3 text-sm space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Số tiền:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-[#C41230]",
											children: formatVND(payTarget.total)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Nội dung CK:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium text-right truncate",
											children: [
												payTarget.id,
												" - ",
												payStudent?.fullName
											]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setPayTarget(null),
							children: "Đóng"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: confirmPaid,
							className: "bg-green-600 text-white hover:bg-green-700",
							children: "Tôi đã thanh toán"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: bulkOpen,
				onOpenChange: setBulkOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[460px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Tạo hóa đơn hàng loạt" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Chọn kỳ thanh toán" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: bulkMonth,
										onValueChange: setBulkMonth,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "2026-05",
											children: "2026-05"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "2026-06",
											children: "2026-06"
										})] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Chọn tòa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: bulkBuilding,
										onValueChange: setBulkBuilding,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground bg-muted/40 p-3 rounded-md",
									children: "Hệ thống sẽ tự động tạo hóa đơn cho tất cả phòng đang có người ở trong kỳ được chọn."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setBulkOpen(false),
							children: "Hủy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleBulk,
							children: "Xác nhận tạo"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { InvoicesPage as component };
