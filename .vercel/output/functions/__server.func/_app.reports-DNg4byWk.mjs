import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { n as formatVND } from "./_ssr/format-Dw96GPDJ.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./_ssr/card-6Vmo0KkZ.mjs";
import { a as XAxis, c as Bar, d as Cell, f as ResponsiveContainer, i as YAxis, l as Pie, m as Legend, n as BarChart, o as Line, p as Tooltip, r as LineChart, s as CartesianGrid, t as PieChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports-DNg4byWk.js
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const { rooms, invoices, violations } = useStore();
	const occByBuilding = [
		"A",
		"B",
		"C"
	].map((b) => {
		const buildingRooms = rooms.filter((r) => r.building === b);
		const cap = buildingRooms.reduce((s, r) => s + r.capacity, 0);
		const occ = buildingRooms.reduce((s, r) => s + r.occupied, 0);
		return {
			name: `Tòa ${b}`,
			"Đang ở": occ,
			"Còn trống": cap - occ
		};
	});
	const revenue = [
		"2026-01",
		"2026-02",
		"2026-03",
		"2026-04",
		"2026-05"
	].map((m, i) => ({
		month: m.slice(5),
		revenue: 8e6 + i * 6e5 + (m === "2026-05" ? invoices.filter((x) => x.month === "2026-05" && x.status === "Đã thanh toán").reduce((s, x) => s + x.total, 0) : 0)
	}));
	const violPie = Object.entries(violations.reduce((acc, v) => {
		acc[v.type] = (acc[v.type] ?? 0) + 1;
		return acc;
	}, {})).map(([name, value]) => ({
		name,
		value
	}));
	const COLORS = [
		"var(--color-chart-1)",
		"var(--color-chart-2)",
		"var(--color-chart-3)",
		"var(--color-chart-4)",
		"var(--color-chart-5)"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["admin"],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Báo cáo & thống kê",
			description: "Tổng quan vận hành ký túc xá."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Lấp đầy theo tòa"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: occByBuilding,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									className: "opacity-30"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, { dataKey: "name" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "Đang ở",
									stackId: "a",
									fill: "var(--color-chart-1)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "Còn trống",
									stackId: "a",
									fill: "var(--color-chart-2)"
								})
							]
						})
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Doanh thu 5 tháng gần nhất"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: revenue,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									className: "opacity-30"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, { dataKey: "month" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tickFormatter: (v) => `${(v / 1e6).toFixed(0)}M` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => formatVND(v) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "revenue",
									stroke: "var(--color-chart-1)",
									strokeWidth: 2,
									dot: { r: 4 }
								})
							]
						})
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Cơ cấu vi phạm"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "pb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-96",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
									margin: {
										top: 8,
										right: 8,
										bottom: 32,
										left: 8
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
											data: violPie,
											dataKey: "value",
											nameKey: "name",
											outerRadius: 110,
											label: ({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`,
											children: violPie.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v, n) => [`${v}`, n] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
											verticalAlign: "bottom",
											align: "center",
											layout: "horizontal",
											iconType: "circle",
											wrapperStyle: {
												paddingTop: 24,
												lineHeight: "20px"
											}
										})
									]
								})
							})
						}), violPie.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-3 mt-4",
							children: (() => {
								const total = violPie.reduce((s, x) => s + x.value, 0);
								return violPie.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border p-3 flex flex-col gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-2.5 w-2.5 rounded-full",
											style: { background: COLORS[i % COLORS.length] }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium truncate",
											children: x.name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg font-semibold",
											children: x.value
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [total ? Math.round(x.value / total * 100) : 0, "%"]
										})]
									})]
								}, x.name));
							})()
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ReportsPage as component };
