import { createFileRoute, Link } from "@tanstack/react-router";
import { RoleGuard } from "@/components/RoleGuard";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStore, useCurrentStudent } from "@/mock/store";
import { formatVND, formatDate } from "@/lib/format";
import {
  Building2,
  FileText,
  Wallet,
  Wrench,
  Bell,
  GraduationCap,
  Receipt,
  ArrowUp,
  ArrowDown,
  Megaphone,
  MoveHorizontal,
  AlertTriangle,
  AlertOctagon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

export const Route = createFileRoute("/_app/dashboard")({ component: DashboardPage });

function DashboardPage() {
  const { role } = useStore();
  return (
    <div>
      <PageHeader title="Tổng quan" description="Thông tin tóm tắt theo vai trò của bạn." />
      {role === "admin" && <AdminDashboard />}
      {role === "student" && <StudentDashboard />}
      {role === "accountant" && <AccountantDashboard />}
      {role === "technical" && <TechnicalDashboard />}
      {role === "security" && <SecurityDashboard />}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, hint, tone = "primary", trend, footer }: any) {
  const toneCls: Record<string, { icon: string; border: string }> = {
    primary: { icon: "bg-[#FEE2E2] text-[#C41230]", border: "border-l-[#C41230]" },
    success: { icon: "bg-emerald-100 text-emerald-700", border: "border-l-emerald-500" },
    warning: { icon: "bg-amber-100 text-amber-700", border: "border-l-amber-500" },
    danger: { icon: "bg-rose-100 text-rose-700", border: "border-l-rose-500" },
  };
  const t = toneCls[tone];
  const TrendIcon = trend?.dir === "down" ? ArrowDown : ArrowUp;
  return (
    <Card className={`border-l-4 ${t.border}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {label}
            </p>
            <p className="mt-2" style={{ fontSize: "32px", fontWeight: 700, lineHeight: 1.1 }}>
              {value}
            </p>
            {trend && (
              <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${trend.color}`}>
                <TrendIcon className="h-3 w-3" /> {trend.text}
              </p>
            )}
            {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
            {footer && <div className="mt-3">{footer}</div>}
          </div>
          <div className={`h-11 w-11 rounded-lg flex items-center justify-center ${t.icon}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  const { rooms, applications, invoices, maintenance, notifications, students, violations } =
    useStore();
  const totalCap = rooms.reduce((s, r) => s + r.capacity, 0);
  const occ = rooms.reduce((s, r) => s + r.occupied, 0);
  const occRate = Math.round((occ / totalCap) * 100);
  const pendingApps = applications.filter((a) => a.status === "Chờ duyệt").length;
  const revenue = invoices.filter((i) => i.month === "2026-05").reduce((s, i) => s + i.total, 0);
  const openMaint = maintenance.filter((m) => m.status !== "Hoàn thành").length;

  const chartData = (["A", "B", "C"] as const).map((b) => {
    const buildingRooms = rooms.filter((r) => r.building === b);
    const cap = buildingRooms.reduce((s, r) => s + r.capacity, 0);
    const occ = buildingRooms.reduce((s, r) => s + r.occupied, 0);
    const rate = Math.round((occ / cap) * 100);
    return { name: `Tòa ${b}`, "Tỷ lệ lấp đầy": rate, fill: rate >= 50 ? "#C41230" : "#FCA5A5" };
  });

  const activities = [
    ...applications
      .slice(0, 3)
      .map((a) => ({
        k: a.id,
        kind: "move" as const,
        t: `Đơn ${a.type} — ${students.find((s) => s.id === a.studentId)?.fullName}`,
        d: a.date,
        badge: a.status,
      })),
    ...violations
      .slice(0, 2)
      .map((v) => ({
        k: v.id,
        kind: "violation" as const,
        t: `Vi phạm: ${v.type} — ${students.find((s) => s.id === v.studentId)?.fullName}`,
        d: v.date,
        badge: `-${v.points} điểm`,
      })),
    ...notifications
      .slice(0, 2)
      .map((n) => ({
        k: n.id,
        kind: "notice" as const,
        t: `Thông báo: ${n.title}`,
        d: n.date,
        badge: n.audience,
      })),
  ]
    .sort((a, b) => b.d.localeCompare(a.d))
    .slice(0, 6);

  const ACTIVITY_ICON = {
    notice: { Icon: Megaphone, cls: "bg-blue-100 text-blue-600" },
    move: { Icon: MoveHorizontal, cls: "bg-indigo-100 text-indigo-600" },
    violation: { Icon: AlertTriangle, cls: "bg-rose-100 text-rose-600" },
  };

  return (
    <RoleGuard allow={["admin"]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          icon={Building2}
          label="Tỷ lệ lấp đầy"
          value={`${occRate}%`}
          hint={`${occ}/${totalCap} chỗ`}
          tone="primary"
          trend={{ text: "+3% so với tháng trước", dir: "up", color: "text-green-600" }}
        />
        <KpiCard
          icon={FileText}
          label="Đơn chờ duyệt"
          value={pendingApps}
          hint="Cần xử lý"
          tone="warning"
          trend={{ text: "-2 so với tháng trước", dir: "down", color: "text-green-600" }}
        />
        <KpiCard
          icon={Wallet}
          label="Doanh thu tháng 05"
          value={formatVND(revenue)}
          tone="success"
          trend={{ text: "+8% so với tháng trước", dir: "up", color: "text-green-600" }}
        />
        <KpiCard
          icon={Wrench}
          label="Yêu cầu bảo trì mở"
          value={openMaint}
          hint="Đang chờ/đang xử lý"
          tone="danger"
          trend={{ text: "+1 so với tháng trước", dir: "up", color: "text-orange-500" }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Tỷ lệ lấp đầy theo tòa</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 24, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <RTooltip formatter={(v: number) => `${v}%`} />
                <Bar dataKey="Tỷ lệ lấp đầy" radius={[6, 6, 0, 0]}>
                  {chartData.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                  <LabelList
                    dataKey="Tỷ lệ lấp đầy"
                    position="top"
                    formatter={(v: number) => `${v}%`}
                    className="fill-foreground text-xs font-semibold"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a) => {
              const { Icon: AIcon, cls } = ACTIVITY_ICON[a.kind];
              return (
                <div
                  key={a.k}
                  className="flex items-start gap-3 text-sm border-b last:border-0 pb-2 last:pb-0"
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${cls}`}
                  >
                    <AIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium leading-tight">{a.t}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(a.d)}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {a.badge}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}

function StudentDashboard() {
  const student = useCurrentStudent();
  const { invoices, rooms, notifications } = useStore();
  if (!student) return null;
  const room = rooms.find((r) => r.id === student.roomId);
  const unpaid = invoices.filter((i) => i.studentId === student.id && i.status !== "Đã thanh toán");

  const payNowBtn =
    unpaid.length > 0 ? (
      <Link
        to="/invoices"
        className="inline-flex items-center justify-center rounded-full border border-[#C41230] bg-white px-3 py-1 text-[13px] font-medium text-[#C41230] hover:bg-[#FEF2F2] transition-colors"
      >
        Thanh toán ngay
      </Link>
    ) : null;

  return (
    <RoleGuard allow={["student"]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          icon={Building2}
          label="Phòng hiện tại"
          value={room ? `${room.number}` : "Chưa có"}
          hint={room ? `Tòa ${room.building}` : ""}
        />
        <KpiCard
          icon={Receipt}
          label="Hóa đơn chưa thanh toán"
          value={unpaid.length}
          tone="warning"
          footer={payNowBtn}
        />
        <KpiCard
          icon={Wallet}
          label="Tổng nợ"
          value={formatVND(unpaid.reduce((s, i) => s + i.total, 0))}
          tone="danger"
        />
        <KpiCard
          icon={GraduationCap}
          label="Điểm rèn luyện"
          value={student.conductScore}
          tone="success"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Điểm rèn luyện</CardTitle>
            <CardDescription>Học kỳ hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-2">{student.conductScore}/100</div>
            <Progress value={student.conductScore} />
            <p className="text-xs text-muted-foreground mt-2">
              Duy trì điểm cao để giữ quyền lợi nội trú.
            </p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" /> Thông báo gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="border-b last:border-0 pb-2 last:pb-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(n.date)} • {n.audience}
                </p>
                <p className="text-sm mt-1">{n.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Receipt className="h-4 w-4" /> Lịch sử thanh toán gần đây
            </CardTitle>
            <CardDescription>3 giao dịch gần nhất của bạn</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-2 font-medium">Ngày</th>
                  <th className="px-4 py-2 font-medium">Mô tả</th>
                  <th className="px-4 py-2 font-medium text-right">Số tiền</th>
                  <th className="px-4 py-2 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    d: "2026-05-05",
                    desc: `Hóa đơn tháng 04 — Phòng ${room?.number ?? ""}`,
                    amount: 850000,
                    paid: true,
                  },
                  {
                    d: "2026-04-06",
                    desc: `Hóa đơn tháng 03 — Phòng ${room?.number ?? ""}`,
                    amount: 820000,
                    paid: true,
                  },
                  {
                    d: "2026-06-02",
                    desc: `Hóa đơn tháng 05 — Phòng ${room?.number ?? ""}`,
                    amount: 910000,
                    paid: false,
                  },
                ].map((t) => (
                  <tr key={t.d} className="border-t">
                    <td className="px-4 py-2">{formatDate(t.d)}</td>
                    <td className="px-4 py-2">{t.desc}</td>
                    <td className="px-4 py-2 text-right font-medium">{formatVND(t.amount)}</td>
                    <td className="px-4 py-2">
                      {t.paid ? (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent">
                          Đã thanh toán
                        </Badge>
                      ) : (
                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-transparent">
                          Chưa thanh toán
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}

function AccountantDashboard() {
  const { invoices, deposits, rooms, students } = useStore();
  const unpaid = invoices.filter((i) => i.status !== "Đã thanh toán");
  const overdue = invoices.filter((i) => i.status === "Quá hạn");
  const collected = invoices
    .filter((i) => i.status === "Đã thanh toán")
    .reduce((s, i) => s + i.total, 0);
  const totalAmount = invoices.reduce((s, i) => s + i.total, 0);
  const collectionRate = totalAmount === 0 ? 0 : Math.round((collected / totalAmount) * 100);

  const depositHeld = deposits.filter((d) => d.status === "Đã thu").reduce((s, d) => s + d.amount, 0);

  // Chart data: Revenue by building
  const chartData = (["A", "B", "C"] as const).map((b) => {
    const buildingRooms = rooms.filter((r) => r.building === b).map((r) => r.id);
    const bInvoices = invoices.filter((i) => buildingRooms.includes(i.roomId));
    
    const bCollected = bInvoices.filter((i) => i.status === "Đã thanh toán").reduce((s, i) => s + i.total, 0);
    const bUnpaid = bInvoices.filter((i) => i.status !== "Đã thanh toán").reduce((s, i) => s + i.total, 0);
    
    return { name: `Tòa ${b}`, "Đã thu": bCollected, "Chưa thu": bUnpaid };
  });

  return (
    <RoleGuard allow={["accountant"]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard 
          icon={Receipt} 
          label="Hóa đơn chưa thu" 
          value={unpaid.length} 
          hint={`${overdue.length} quá hạn`} 
          tone="warning" 
        />
        <KpiCard 
          icon={Wallet} 
          label="Doanh thu đã thu" 
          value={formatVND(collected)} 
          tone="success" 
        />
        <KpiCard
          icon={Wallet}
          label="Tiền cọc đang giữ"
          value={formatVND(depositHeld)}
          tone="primary"
        />
        <KpiCard 
          icon={AlertTriangle} 
          label="Tỷ lệ thu hồi" 
          value={`${collectionRate}%`} 
          tone={collectionRate >= 80 ? "success" : "danger"} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Tình trạng thu tiền theo tòa</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 24, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `${v / 1000000}tr`} />
                <RTooltip formatter={(v: number) => formatVND(v)} />
                <Bar dataKey="Đã thu" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Chưa thu" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-600" /> Cần nhắc nợ (Quá hạn)
            </CardTitle>
            <CardDescription>Danh sách hóa đơn trễ hạn</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-2 font-medium">Phòng</th>
                  <th className="px-4 py-2 font-medium">Sinh viên</th>
                  <th className="px-4 py-2 font-medium text-right">Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {overdue.slice(0, 6).map((o, idx) => {
                  const student = students.find((s) => s.id === o.studentId);
                  const room = rooms.find((r) => r.id === o.roomId);
                  return (
                    <tr key={o.id} className={`border-t ${idx % 2 === 1 ? "bg-muted/20" : ""}`}>
                      <td className="px-4 py-2 font-medium">{room?.number}</td>
                      <td className="px-4 py-2 truncate max-w-[100px]">{student?.fullName}</td>
                      <td className="px-4 py-2 text-right font-medium text-rose-600">{formatVND(o.total)}</td>
                    </tr>
                  );
                })}
                {overdue.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-muted-foreground">Không có hóa đơn quá hạn</td>
                  </tr>
                )}
              </tbody>
            </table>
            {overdue.length > 0 && (
              <div className="p-3 border-t bg-muted/20 text-center">
                <Link to="/invoices" className="text-sm font-medium text-[#C41230] hover:underline">
                  Xem tất cả hóa đơn →
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}

function TechnicalDashboard() {
  const { maintenance, rooms, setMaintStatus } = useStore();

  const urgent = [
    {
      id: "u1",
      roomId: "room-A-1",
      type: "Điện",
      desc: "Mất điện toàn phòng",
      date: "2026-06-06",
      status: "Chờ tiếp nhận" as const,
    },
    {
      id: "u2",
      roomId: "room-B-2",
      type: "Nước",
      desc: "Vỡ ống nước nhà tắm",
      date: "2026-06-06",
      status: "Đang xử lý" as const,
    },
    {
      id: "u3",
      roomId: "room-C-1",
      type: "An toàn",
      desc: "Báo cháy lỗi liên tục",
      date: "2026-06-05",
      status: "Chờ tiếp nhận" as const,
    },
    {
      id: "u4",
      roomId: "room-A-3",
      type: "Điện",
      desc: "Ổ cắm chập cháy",
      date: "2026-06-05",
      status: "Đang xử lý" as const,
    },
  ];

  return (
    <RoleGuard allow={["technical"]}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard
          icon={Wrench}
          label="Chờ tiếp nhận"
          value={maintenance.filter((m) => m.status === "Chờ tiếp nhận").length}
          tone="warning"
        />
        <KpiCard
          icon={Wrench}
          label="Đang xử lý"
          value={maintenance.filter((m) => m.status === "Đang xử lý").length}
        />
        <KpiCard
          icon={Wrench}
          label="Hoàn thành"
          value={maintenance.filter((m) => m.status === "Hoàn thành").length}
          tone="success"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" /> Nhiệm vụ khẩn cấp cần xử lý
          </CardTitle>
          <CardDescription>Các yêu cầu ưu tiên cao đang chờ kỹ thuật xử lý.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr className="text-left">
                <th className="px-4 py-2 font-medium">Phòng</th>
                <th className="px-4 py-2 font-medium">Loại sự cố</th>
                <th className="px-4 py-2 font-medium">Mô tả</th>
                <th className="px-4 py-2 font-medium">Ngày gửi</th>
                <th className="px-4 py-2 font-medium">Trạng thái</th>
                <th className="px-4 py-2 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {urgent.map((u, idx) => {
                const room = rooms.find((r) => r.id === u.roomId);
                const matching = maintenance.find(
                  (m) => m.roomId === u.roomId && m.status !== "Hoàn thành",
                );
                return (
                  <tr key={u.id} className={`border-t ${idx % 2 === 1 ? "bg-muted/20" : ""}`}>
                    <td className="px-4 py-2 font-medium">{room?.number ?? u.roomId}</td>
                    <td className="px-4 py-2">{u.type}</td>
                    <td className="px-4 py-2">{u.desc}</td>
                    <td className="px-4 py-2">{formatDate(u.date)}</td>
                    <td className="px-4 py-2">
                      <Badge
                        className={
                          u.status === "Đang xử lý"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-transparent"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-transparent"
                        }
                      >
                        {u.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => matching && setMaintStatus(matching.id, "Đang xử lý")}
                        className="text-[#C41230] font-medium hover:underline text-sm"
                      >
                        Xử lý ngay →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </RoleGuard>
  );
}

function SecurityDashboard() {
  const { violations, students, rooms } = useStore();
  const severe = violations.filter((v) => v.points >= 15).length;

  const recent = [
    { id: "r1", ago: "30 phút trước", studentId: "s7", type: "Hút thuốc trong KTX", points: 15 },
    { id: "r2", ago: "2 giờ trước", studentId: "s4", type: "Gây mất trật tự", points: 10 },
    { id: "r3", ago: "5 giờ trước", studentId: "s2", type: "Vi phạm giờ giới nghiêm", points: 5 },
    { id: "r4", ago: "8 giờ trước", studentId: "s7", type: "Mang đồ cấm vào KTX", points: 15 },
    { id: "r5", ago: "12 giờ trước", studentId: "s4", type: "Vi phạm giờ giới nghiêm", points: 5 },
  ];

  return (
    <RoleGuard allow={["security"]}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard icon={Bell} label="Tổng vi phạm" value={violations.length} tone="danger" />
        <KpiCard
          icon={Bell}
          label="Tuần này"
          value={violations.slice(0, 3).length}
          tone="warning"
        />
        <KpiCard
          icon={AlertOctagon}
          label="Vi phạm nghiêm trọng"
          value={severe}
          hint="Trong tháng này"
          tone="danger"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-600" /> Vi phạm ghi nhận trong 24h qua
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recent.map((r) => {
            const st = students.find((s) => s.id === r.studentId);
            const room = st ? rooms.find((rm) => rm.id === st.roomId) : null;
            return (
              <div
                key={r.id}
                className="border-l-4 border-[#C41230] bg-muted/20 rounded-r-md px-4 py-3 flex items-center gap-3 flex-wrap"
              >
                <Badge variant="secondary" className="shrink-0">
                  {r.ago}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    {st?.fullName ?? "—"}{" "}
                    <span className="text-muted-foreground font-normal">
                      • Phòng {room?.number ?? "—"}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.type}</p>
                </div>
                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-transparent shrink-0">
                  -{r.points} điểm
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </RoleGuard>
  );
}
