import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/_app/blacklist")({
  component: BlacklistPage,
});

const MOCK_DATA = [
  { id: "1", name: "Nguyễn Văn Toàn", mssv: "20200045", oldRoom: "A103", reason: "Vi phạm nghiêm trọng nhiều lần", date: "01/06/2026", status: "Đã hủy" },
  { id: "2", name: "Trần Minh Đức", mssv: "20190078", oldRoom: "B204", reason: "Gây mất an ninh trật tự", date: "15/05/2026", status: "Đã hủy" },
  { id: "3", name: "Lê Thị Hoa", mssv: "20210033", oldRoom: "C101", reason: "Vi phạm giờ giới nghiêm 5 lần", date: "20/04/2026", status: "Đã hủy" },
];

function BlacklistPage() {
  return (
    <RoleGuard allow={["security"]}>
      <div className="flex flex-col gap-6 w-full max-w-full">
        <PageHeader
          title="Danh sách đen"
          description="Sinh viên bị hủy tư cách nội trú — không được phép vào ký túc xá."
        />

        <div className="bg-[#fee2e2] text-[#dc2626] p-4 rounded-md flex items-start gap-3 border border-red-200">
          <p className="text-sm font-medium">
            ⛔ Các sinh viên dưới đây đã bị Admin thu hồi tư cách nội trú. Bảo vệ không cho phép các sinh viên này vào khu vực ký túc xá.
          </p>
        </div>

        <div className="rounded-md border bg-white overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Họ tên</TableHead>
                <TableHead className="font-semibold text-slate-700">MSSV</TableHead>
                <TableHead className="font-semibold text-slate-700">Phòng cũ</TableHead>
                <TableHead className="font-semibold text-slate-700">Lý do</TableHead>
                <TableHead className="font-semibold text-slate-700">Ngày hủy</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DATA.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                  <TableCell className="text-slate-600">{student.mssv}</TableCell>
                  <TableCell className="text-slate-600">{student.oldRoom}</TableCell>
                  <TableCell className="text-slate-600">{student.reason}</TableCell>
                  <TableCell className="text-slate-600">{student.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-gray-500 italic mt-[-8px]">
          Danh sách được cập nhật tự động khi Admin xử lý chế tài. Liên hệ Ban quản lý KTX nếu có thắc mắc.
        </p>
      </div>
    </RoleGuard>
  );
}
