import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/_app/discipline")({
  component: DisciplinePage,
});

const MOCK_DATA = [
  { id: "1", name: "Đinh Công Thành", mssv: "20210091", room: "B102", score: 57, level: "Cảnh báo" },
  { id: "2", name: "Đặng Quang Huy", mssv: "20210034", room: "B101", score: 62, level: "Cảnh báo" },
  { id: "3", name: "Phạm Thị Dung", mssv: "20210002", room: "A103", score: 70, level: "Theo dõi" },
  { id: "4", name: "Hoàng Thị Phương", mssv: "20220067", room: "C102", score: 70, level: "Theo dõi" },
];

function DisciplinePage() {
  const [cancelTarget, setCancelTarget] = useState<{ id: string; name: string } | null>(null);

  const handleSendWarning = (name: string) => {
    toast.success(`Đã gửi thông báo cảnh báo đến ${name}`);
  };

  const handleConfirmCancel = () => {
    if (cancelTarget) {
      toast.success(`Đã hủy tư cách nội trú của ${cancelTarget.name}`);
      setCancelTarget(null);
    }
  };

  return (
    <RoleGuard allow={["admin"]}>
      <div className="flex flex-col gap-6 w-full max-w-full">
        <PageHeader
          title="Quản lý kỷ luật & Chế tài"
          description="Danh sách sinh viên vi phạm nghiêm trọng và xử lý chế tài."
        />

        <div className="bg-[#fef9c3] text-[#92400e] p-4 rounded-md flex items-start gap-3 border border-amber-200">
          <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Sinh viên có điểm rèn luyện dưới 50 sẽ bị cảnh báo. Dưới 30 điểm có thể bị hủy tư cách nội trú.
          </p>
        </div>

        <div className="rounded-md border bg-white overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Sinh viên</TableHead>
                <TableHead className="font-semibold text-slate-700">MSSV</TableHead>
                <TableHead className="font-semibold text-slate-700">Phòng</TableHead>
                <TableHead className="font-semibold text-slate-700">Điểm rèn luyện</TableHead>
                <TableHead className="font-semibold text-slate-700">Mức độ</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DATA.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                  <TableCell className="text-slate-600">{student.mssv}</TableCell>
                  <TableCell className="text-slate-600">{student.room}</TableCell>
                  <TableCell className="text-slate-600">{student.score} điểm</TableCell>
                  <TableCell>
                    {student.level === "Cảnh báo" ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        ⚠️ Cảnh báo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                        📋 Theo dõi
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-400 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                      onClick={() => handleSendWarning(student.name)}
                    >
                      Gửi cảnh báo
                    </Button>
                    {student.level === "Cảnh báo" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => setCancelTarget({ id: student.id, name: student.name })}
                      >
                        Hủy nội trú
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={!!cancelTarget} onOpenChange={(open) => !open && setCancelTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận hủy tư cách nội trú</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                Hành động này sẽ chấm dứt hợp đồng nội trú của sinh viên <strong className="text-slate-900">{cancelTarget?.name}</strong>. Sinh viên sẽ được thêm vào Danh sách đen. Không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-slate-600 hover:bg-slate-100 hover:text-slate-900">Hủy bỏ</AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#C41230] hover:bg-[#A00F27] text-white"
                onClick={handleConfirmCancel}
              >
                Xác nhận hủy nội trú
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </RoleGuard>
  );
}
