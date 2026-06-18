import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore, r as useCurrentStudent } from "./_ssr/store-CXReg1r8.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { M as Bell, P as ArrowUp, R as ArrowDown, _ as GraduationCap, f as OctagonAlert, i as TriangleAlert, j as Building2, m as Megaphone, n as Wrench, p as MoveHorizontal, r as Wallet, s as Receipt, y as FileText } from "./_libs/lucide-react.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { n as formatVND, t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./_ssr/card-6Vmo0KkZ.mjs";
import { n as Root, t as Indicator } from "./_libs/radix-ui__react-progress.mjs";
import { a as XAxis, c as Bar, d as Cell, f as ResponsiveContainer, i as YAxis, n as BarChart, p as Tooltip, s as CartesianGrid, u as LabelList } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-B3ZUf4DI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function DashboardPage() {
	const { role } = useStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Tổng quan",
			description: "Thông tin tóm tắt theo vai trò của bạn."
		}),
		role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {}),
		role === "student" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentDashboard, {}),
		role === "accountant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountantDashboard, {}),
		role === "technical" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechnicalDashboard, {}),
		role === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityDashboard, {})
	] });
}
function KpiCard({ icon: Icon, label, value, hint, tone = "primary", trend, footer }) {
	const t = {
		primary: {
			icon: "bg-[#FEE2E2] text-[#C41230]",
			border: "border-l-[#C41230]"
		},
		success: {
			icon: "bg-emerald-100 text-emerald-700",
			border: "border-l-emerald-500"
		},
		warning: {
			icon: "bg-amber-100 text-amber-700",
			border: "border-l-amber-500"
		},
		danger: {
			icon: "bg-rose-100 text-rose-700",
			border: "border-l-rose-500"
		}
	}[tone];
	const TrendIcon = trend?.dir === "down" ? ArrowDown : ArrowUp;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: `border-l-4 ${t.border}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground font-medium uppercase tracking-wide",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						style: {
							fontSize: "32px",
							fontWeight: 700,
							lineHeight: 1.1
						},
						children: value
					}),
					trend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `text-xs mt-1 flex items-center gap-1 font-medium ${trend.color}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendIcon, { className: "h-3 w-3" }),
							" ",
							trend.text
						]
					}),
					hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: hint
					}),
					footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: footer
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `h-11 w-11 rounded-lg flex items-center justify-center ${t.icon}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				})]
			})
		})
	});
}
function AdminDashboard() {
	const { rooms, applications, invoices, maintenance, notifications, students, violations } = useStore();
	const totalCap = rooms.reduce((s, r) => s + r.capacity, 0);
	const occ = rooms.reduce((s, r) => s + r.occupied, 0);
	const occRate = Math.round(occ / totalCap * 100);
	const pendingApps = applications.filter((a) => a.status === "Chờ duyệt").length;
	const revenue = invoices.filter((i) => i.month === "2026-05").reduce((s, i) => s + i.total, 0);
	const openMaint = maintenance.filter((m) => m.status !== "Hoàn thành").length;
	const chartData = [
		"A",
		"B",
		"C"
	].map((b) => {
		const buildingRooms = rooms.filter((r) => r.building === b);
		const cap = buildingRooms.reduce((s, r) => s + r.capacity, 0);
		const occ = buildingRooms.reduce((s, r) => s + r.occupied, 0);
		const rate = Math.round(occ / cap * 100);
		return {
			name: `Tòa ${b}`,
			"Tỷ lệ lấp đầy": rate,
			fill: rate >= 50 ? "#C41230" : "#FCA5A5"
		};
	});
	const activities = [
		...applications.slice(0, 3).map((a) => ({
			k: a.id,
			kind: "move",
			t: `Đơn ${a.type} — ${students.find((s) => s.id === a.studentId)?.fullName}`,
			d: a.date,
			badge: a.status
		})),
		...violations.slice(0, 2).map((v) => ({
			k: v.id,
			kind: "violation",
			t: `Vi phạm: ${v.type} — ${students.find((s) => s.id === v.studentId)?.fullName}`,
			d: v.date,
			badge: `-${v.points} điểm`
		})),
		...notifications.slice(0, 2).map((n) => ({
			k: n.id,
			kind: "notice",
			t: `Thông báo: ${n.title}`,
			d: n.date,
			badge: n.audience
		}))
	].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 6);
	const ACTIVITY_ICON = {
		notice: {
			Icon: Megaphone,
			cls: "bg-blue-100 text-blue-600"
		},
		move: {
			Icon: MoveHorizontal,
			cls: "bg-indigo-100 text-indigo-600"
		},
		violation: {
			Icon: TriangleAlert,
			cls: "bg-rose-100 text-rose-600"
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["admin"],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Building2,
					label: "Tỷ lệ lấp đầy",
					value: `${occRate}%`,
					hint: `${occ}/${totalCap} chỗ`,
					tone: "primary",
					trend: {
						text: "+3% so với tháng trước",
						dir: "up",
						color: "text-green-600"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: FileText,
					label: "Đơn chờ duyệt",
					value: pendingApps,
					hint: "Cần xử lý",
					tone: "warning",
					trend: {
						text: "-2 so với tháng trước",
						dir: "down",
						color: "text-green-600"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Wallet,
					label: "Doanh thu tháng 05",
					value: formatVND(revenue),
					tone: "success",
					trend: {
						text: "+8% so với tháng trước",
						dir: "up",
						color: "text-green-600"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Wrench,
					label: "Yêu cầu bảo trì mở",
					value: openMaint,
					hint: "Đang chờ/đang xử lý",
					tone: "danger",
					trend: {
						text: "+1 so với tháng trước",
						dir: "up",
						color: "text-orange-500"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Tỷ lệ lấp đầy theo tòa"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chartData,
							margin: {
								top: 24,
								right: 12,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									className: "opacity-30"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, { dataKey: "name" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									domain: [0, 100],
									tickFormatter: (v) => `${v}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => `${v}%` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, {
									dataKey: "Tỷ lệ lấp đầy",
									radius: [
										6,
										6,
										0,
										0
									],
									children: [chartData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
										dataKey: "Tỷ lệ lấp đầy",
										position: "top",
										formatter: (v) => `${v}%`,
										className: "fill-foreground text-xs font-semibold"
									})]
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Hoạt động gần đây"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: activities.map((a) => {
					const { Icon: AIcon, cls } = ACTIVITY_ICON[a.kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 text-sm border-b last:border-0 pb-2 last:pb-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${cls}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIcon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium leading-tight",
									children: a.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: formatDate(a.d)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "shrink-0",
								children: a.badge
							})
						]
					}, a.k);
				})
			})] })]
		})]
	});
}
function StudentDashboard() {
	const student = useCurrentStudent();
	const { invoices, rooms, notifications } = useStore();
	if (!student) return null;
	const room = rooms.find((r) => r.id === student.roomId);
	const unpaid = invoices.filter((i) => i.studentId === student.id && i.status !== "Đã thanh toán");
	const payNowBtn = unpaid.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/invoices",
		className: "inline-flex items-center justify-center rounded-full border border-[#C41230] bg-white px-3 py-1 text-[13px] font-medium text-[#C41230] hover:bg-[#FEF2F2] transition-colors",
		children: "Thanh toán ngay"
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["student"],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: Building2,
						label: "Phòng hiện tại",
						value: room ? `${room.number}` : "Chưa có",
						hint: room ? `Tòa ${room.building}` : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: Receipt,
						label: "Hóa đơn chưa thanh toán",
						value: unpaid.length,
						tone: "warning",
						footer: payNowBtn
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: Wallet,
						label: "Tổng nợ",
						value: formatVND(unpaid.reduce((s, i) => s + i.total, 0)),
						tone: "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: GraduationCap,
						label: "Điểm rèn luyện",
						value: student.conductScore,
						tone: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Điểm rèn luyện"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Học kỳ hiện tại" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-3xl font-semibold mb-2",
						children: [student.conductScore, "/100"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: student.conductScore }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-2",
						children: "Duy trì điểm cao để giữ quyền lợi nội trú."
					})
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "text-base flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), " Thông báo gần đây"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "space-y-3",
						children: notifications.slice(0, 4).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b last:border-0 pb-2 last:pb-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: n.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										formatDate(n.date),
										" • ",
										n.audience
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm mt-1",
									children: n.body
								})
							]
						}, n.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }), " Lịch sử thanh toán gần đây"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "3 giao dịch gần nhất của bạn" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/40 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 font-medium",
										children: "Ngày"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 font-medium",
										children: "Mô tả"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 font-medium text-right",
										children: "Số tiền"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 font-medium",
										children: "Trạng thái"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
							{
								d: "2026-05-05",
								desc: `Hóa đơn tháng 04 — Phòng ${room?.number ?? ""}`,
								amount: 85e4,
								paid: true
							},
							{
								d: "2026-04-06",
								desc: `Hóa đơn tháng 03 — Phòng ${room?.number ?? ""}`,
								amount: 82e4,
								paid: true
							},
							{
								d: "2026-06-02",
								desc: `Hóa đơn tháng 05 — Phòng ${room?.number ?? ""}`,
								amount: 91e4,
								paid: false
							}
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2",
									children: formatDate(t.d)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2",
									children: t.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 text-right font-medium",
									children: formatVND(t.amount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2",
									children: t.paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent",
										children: "Đã thanh toán"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-rose-100 text-rose-700 hover:bg-rose-100 border-transparent",
										children: "Chưa thanh toán"
									})
								})
							]
						}, t.d)) })]
					})
				})] })
			})
		]
	});
}
function AccountantDashboard() {
	const { invoices, deposits } = useStore();
	const unpaid = invoices.filter((i) => i.status !== "Đã thanh toán");
	const collected = invoices.filter((i) => i.status === "Đã thanh toán").reduce((s, i) => s + i.total, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGuard, {
		allow: ["accountant"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Receipt,
					label: "Hóa đơn chưa thu",
					value: unpaid.length,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Wallet,
					label: "Đã thu",
					value: formatVND(collected),
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Wallet,
					label: "Tiền cọc đang giữ",
					value: formatVND(deposits.filter((d) => d.status === "Đã thu").reduce((s, d) => s + d.amount, 0))
				})
			]
		})
	});
}
function TechnicalDashboard() {
	const { maintenance, rooms, setMaintStatus } = useStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["technical"],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Wrench,
					label: "Chờ tiếp nhận",
					value: maintenance.filter((m) => m.status === "Chờ tiếp nhận").length,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Wrench,
					label: "Đang xử lý",
					value: maintenance.filter((m) => m.status === "Đang xử lý").length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Wrench,
					label: "Hoàn thành",
					value: maintenance.filter((m) => m.status === "Hoàn thành").length,
					tone: "success"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
			className: "text-base flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-amber-600" }), " Nhiệm vụ khẩn cấp cần xử lý"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Các yêu cầu ưu tiên cao đang chờ kỹ thuật xử lý." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/40 text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium",
								children: "Phòng"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium",
								children: "Loại sự cố"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium",
								children: "Mô tả"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium",
								children: "Ngày gửi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium",
								children: "Trạng thái"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium text-right",
								children: "Hành động"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
					{
						id: "u1",
						roomId: "room-A-1",
						type: "Điện",
						desc: "Mất điện toàn phòng",
						date: "2026-06-06",
						status: "Chờ tiếp nhận"
					},
					{
						id: "u2",
						roomId: "room-B-2",
						type: "Nước",
						desc: "Vỡ ống nước nhà tắm",
						date: "2026-06-06",
						status: "Đang xử lý"
					},
					{
						id: "u3",
						roomId: "room-C-1",
						type: "An toàn",
						desc: "Báo cháy lỗi liên tục",
						date: "2026-06-05",
						status: "Chờ tiếp nhận"
					},
					{
						id: "u4",
						roomId: "room-A-3",
						type: "Điện",
						desc: "Ổ cắm chập cháy",
						date: "2026-06-05",
						status: "Đang xử lý"
					}
				].map((u, idx) => {
					const room = rooms.find((r) => r.id === u.roomId);
					const matching = maintenance.find((m) => m.roomId === u.roomId && m.status !== "Hoàn thành");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: `border-t ${idx % 2 === 1 ? "bg-muted/20" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2 font-medium",
								children: room?.number ?? u.roomId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: u.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: u.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: formatDate(u.date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: u.status === "Đang xử lý" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-transparent" : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-transparent",
									children: u.status
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => matching && setMaintStatus(matching.id, "Đang xử lý"),
									className: "text-[#C41230] font-medium hover:underline text-sm",
									children: "Xử lý ngay →"
								})
							})
						]
					}, u.id);
				}) })]
			})
		})] })]
	});
}
function SecurityDashboard() {
	const { violations, students, rooms } = useStore();
	const severe = violations.filter((v) => v.points >= 15).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["security"],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Bell,
					label: "Tổng vi phạm",
					value: violations.length,
					tone: "danger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Bell,
					label: "Tuần này",
					value: violations.slice(0, 3).length,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: OctagonAlert,
					label: "Vi phạm nghiêm trọng",
					value: severe,
					hint: "Trong tháng này",
					tone: "danger"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
			className: "text-base flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-rose-600" }), " Vi phạm ghi nhận trong 24h qua"]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "space-y-2",
			children: [
				{
					id: "r1",
					ago: "30 phút trước",
					studentId: "s7",
					type: "Hút thuốc trong KTX",
					points: 15
				},
				{
					id: "r2",
					ago: "2 giờ trước",
					studentId: "s4",
					type: "Gây mất trật tự",
					points: 10
				},
				{
					id: "r3",
					ago: "5 giờ trước",
					studentId: "s2",
					type: "Vi phạm giờ giới nghiêm",
					points: 5
				},
				{
					id: "r4",
					ago: "8 giờ trước",
					studentId: "s7",
					type: "Mang đồ cấm vào KTX",
					points: 15
				},
				{
					id: "r5",
					ago: "12 giờ trước",
					studentId: "s4",
					type: "Vi phạm giờ giới nghiêm",
					points: 5
				}
			].map((r) => {
				const st = students.find((s) => s.id === r.studentId);
				const room = st ? rooms.find((rm) => rm.id === st.roomId) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-l-4 border-[#C41230] bg-muted/20 rounded-r-md px-4 py-3 flex items-center gap-3 flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "shrink-0",
							children: r.ago
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium leading-tight",
								children: [
									st?.fullName ?? "—",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground font-normal",
										children: ["• Phòng ", room?.number ?? "—"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: r.type
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "bg-rose-100 text-rose-700 hover:bg-rose-100 border-transparent shrink-0",
							children: [
								"-",
								r.points,
								" điểm"
							]
						})
					]
				}, r.id);
			})
		})] })]
	});
}
//#endregion
export { DashboardPage as component };
