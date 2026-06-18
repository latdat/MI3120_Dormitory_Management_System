import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore, r as useCurrentStudent } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { I as ArrowRightLeft } from "./_libs/lucide-react.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { n as formatVND, t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./_ssr/card-6Vmo0KkZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.my-room-8nG3lPqB.js
var import_jsx_runtime = require_jsx_runtime();
function initials(name) {
	return name.split(" ").map((p) => p[0]).slice(-2).join("").toUpperCase();
}
function MyRoomPage() {
	const student = useCurrentStudent();
	const { rooms, students } = useStore();
	const room = student ? rooms.find((r) => r.id === student.roomId) : null;
	const roommates = students.filter((s) => s.roomId === student?.roomId && s.id !== student?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["student"],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Phòng của tôi",
			description: "Thông tin chỗ ở hiện tại."
		}), !room ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Bạn chưa được phân phòng."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Thông tin phòng & hợp đồng"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Phòng",
							value: room.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Tòa",
							value: room.building
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Sức chứa",
							value: `${room.capacity} người`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Đang ở",
							value: `${room.occupied} người`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Phí phòng",
							value: `${formatVND(room.monthlyFee)}/tháng`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Mã hợp đồng",
							value: `HD-${student?.mssv}-2025`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Ngày nhận phòng",
							value: formatDate("2025-09-01")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Hết hạn hợp đồng",
							value: formatDate("2026-08-31")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Trạng thái",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: room.status === "occupied" ? "Đang ở" : room.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full mt-3",
							onClick: () => toast.success("Đã gửi yêu cầu chuyển phòng. Vui lòng chờ duyệt."),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-4 w-4" }), " Đăng ký chuyển phòng"]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Bạn cùng phòng"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: roommates.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b last:border-0 pb-3 last:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-9 w-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold shrink-0",
							children: initials(m.fullName)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium leading-tight",
								children: m.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["MSSV: ", m.mssv]
							})]
						})]
					}, m.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Thiết bị trong phòng"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-2 text-sm",
					children: [
						{
							name: "Giường tầng",
							qty: 3,
							status: "Tốt"
						},
						{
							name: "Tủ cá nhân",
							qty: 6,
							status: "Tốt"
						},
						{
							name: "Bàn học",
							qty: 6,
							status: "Tốt"
						},
						{
							name: "Quạt trần",
							qty: 2,
							status: "Cần kiểm tra"
						},
						{
							name: "Đèn chiếu sáng",
							qty: 4,
							status: "Tốt"
						}
					].map((e) => {
						const needsCheck = e.status === "Cần kiểm tra";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b last:border-0 pb-2 last:pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									e.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: ["×", e.qty]
									})
								] }), needsCheck ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/maintenance-new",
									search: { title: `${e.name} - Cần kiểm tra` },
									className: "text-[#C41230] text-sm font-medium hover:underline",
									children: [e.status, " →"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: e.status
								})]
							}), needsCheck && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs italic text-muted-foreground mt-1",
								children: "Yêu cầu bảo trì đã được gửi - đang chờ xử lý"
							})]
						}, e.name);
					})
				})] })
			]
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between border-b last:border-0 pb-2 last:pb-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
export { MyRoomPage as component };
