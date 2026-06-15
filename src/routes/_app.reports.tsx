import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore } from "@/mock/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatVND } from "@/lib/format";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_app/reports")({ component: ReportsPage });

function ReportsPage() {
  const { rooms, invoices, violations } = useStore();

  const occByBuilding = (["A", "B", "C"] as const).map((b) => {
    const buildingRooms = rooms.filter((r) => r.building === b);
    const cap = buildingRooms.reduce((s, r) => s + r.capacity, 0);
    const occ = buildingRooms.reduce((s, r) => s + r.occupied, 0);
    return { name: `Tòa ${b}`, "Đang ở": occ, "Còn trống": cap - occ };
  });

  const revenue = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"].map((m, i) => ({
    month: m.slice(5),
    revenue:
      8000000 +
      i * 600000 +
      (m === "2026-05"
        ? invoices
            .filter((x) => x.month === "2026-05" && x.status === "Đã thanh toán")
            .reduce((s, x) => s + x.total, 0)
        : 0),
  }));

  const violPie = Object.entries(
    violations.reduce<Record<string, number>>((acc, v) => {
      acc[v.type] = (acc[v.type] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
  ];

  return (
    <RoleGuard allow={["admin"]}>
      <PageHeader title="Báo cáo & thống kê" description="Tổng quan vận hành ký túc xá." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lấp đầy theo tòa</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occByBuilding}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <RTooltip />
                <Legend />
                <Bar dataKey="Đang ở" stackId="a" fill="var(--color-chart-1)" />
                <Bar dataKey="Còn trống" stackId="a" fill="var(--color-chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Doanh thu 5 tháng gần nhất</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
                <RTooltip formatter={(v: number) => formatVND(v)} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Cơ cấu vi phạm</CardTitle>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 8, right: 8, bottom: 32, left: 8 }}>
                  <Pie
                    data={violPie}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {violPie.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <RTooltip formatter={(v: number, n: string) => [`${v}`, n]} />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    layout="horizontal"
                    iconType="circle"
                    wrapperStyle={{ paddingTop: 24, lineHeight: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {violPie.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {(() => {
                  const total = violPie.reduce((s, x) => s + x.value, 0);
                  return violPie.map((x, i) => (
                    <div key={x.name} className="rounded-lg border p-3 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: COLORS[i % COLORS.length] }}
                        />
                        <span className="text-xs font-medium truncate">{x.name}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-semibold">{x.value}</span>
                        <span className="text-xs text-muted-foreground">
                          {total ? Math.round((x.value / total) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
