import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore, useCurrentStudent } from "@/mock/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVND, formatDate } from "@/lib/format";
import { ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/my-room")({ component: MyRoomPage });

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(-2)
    .join("")
    .toUpperCase();
}

function MyRoomPage() {
  const student = useCurrentStudent();
  const { rooms, students } = useStore();
  const room = student ? rooms.find((r) => r.id === student.roomId) : null;
  const roommates = students.filter((s) => s.roomId === student?.roomId && s.id !== student?.id);

  const equipment = [
    { name: "Giường tầng", qty: 3, status: "Tốt" },
    { name: "Tủ cá nhân", qty: 6, status: "Tốt" },
    { name: "Bàn học", qty: 6, status: "Tốt" },
    { name: "Quạt trần", qty: 2, status: "Cần kiểm tra" },
    { name: "Đèn chiếu sáng", qty: 4, status: "Tốt" },
  ];

  return (
    <RoleGuard allow={["student"]}>
      <PageHeader title="Phòng của tôi" description="Thông tin chỗ ở hiện tại." />
      {!room ? (
        <p className="text-muted-foreground">Bạn chưa được phân phòng.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin phòng & hợp đồng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Phòng" value={room.number} />
              <Row label="Tòa" value={room.building} />
              <Row label="Sức chứa" value={`${room.capacity} người`} />
              <Row label="Đang ở" value={`${room.occupied} người`} />
              <Row label="Phí phòng" value={`${formatVND(room.monthlyFee)}/tháng`} />
              <Row label="Mã hợp đồng" value={`HD-${student?.mssv}-2025`} />
              <Row label="Ngày nhận phòng" value={formatDate("2025-09-01")} />
              <Row label="Hết hạn hợp đồng" value={formatDate("2026-08-31")} />
              <Row
                label="Trạng thái"
                value={<Badge>{room.status === "occupied" ? "Đang ở" : room.status}</Badge>}
              />
              <Button
                className="w-full mt-3"
                onClick={() => toast.success("Đã gửi yêu cầu chuyển phòng. Vui lòng chờ duyệt.")}
              >
                <ArrowRightLeft className="h-4 w-4" /> Đăng ký chuyển phòng
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bạn cùng phòng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {roommates.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 border-b last:border-0 pb-3 last:pb-0"
                >
                  <div className="h-9 w-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold shrink-0">
                    {initials(m.fullName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{m.fullName}</p>
                    <p className="text-xs text-muted-foreground">MSSV: {m.mssv}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thiết bị trong phòng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {equipment.map((e) => {
                const needsCheck = e.status === "Cần kiểm tra";
                return (
                  <div key={e.name} className="border-b last:border-0 pb-2 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span>
                        {e.name} <span className="text-muted-foreground">×{e.qty}</span>
                      </span>
                      {needsCheck ? (
                        <Link
                          to="/maintenance-new"
                          search={{ title: `${e.name} - Cần kiểm tra` }}
                          className="text-[#C41230] text-sm font-medium hover:underline"
                        >
                          {e.status} →
                        </Link>
                      ) : (
                        <Badge variant="secondary">{e.status}</Badge>
                      )}
                    </div>
                    {needsCheck && (
                      <p className="text-xs italic text-muted-foreground mt-1">
                        Yêu cầu bảo trì đã được gửi - đang chờ xử lý
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </RoleGuard>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b last:border-0 pb-2 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
