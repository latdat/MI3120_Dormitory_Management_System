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
import { useStore } from "@/mock/store";

export const Route = createFileRoute("/_app/discipline")({
  component: DisciplinePage,
});

function DisciplinePage() {
  const { students, rooms } = useStore();
  const [cancelTarget, setCancelTarget] = useState<{ id: string; name: string } | null>(null);

  // Chỉ hiển thị sinh viên có điểm < 70 (có dấu hiệu cần theo dõi)
  const atRiskStudents = students
    .filter((s) => s.conductScore < 70 && s.roomId)
    .sort((a, b) => a.conductScore - b.conductScore)
    .map((s) => {
      const room = rooms.find((r) => r.id === s.roomId);
      const score = s.conductScore;
      // Đúng ngưỡng: < 30 = Nguy cơ hủy, 30-49 = Cảnh báo, 50-69 = Theo dõi
      const level = score < 30 ? "Nguy cơ hủy" : score < 50 ? "Cảnh báo" : "Theo dõi";
      return { ...s, roomNumber: room?.number ?? "—", level };
    });

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
              {atRiskStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Không có sinh viên nào cần theo dõi kỷ luật.
                  </TableCell>
                </TableRow>
              )}
              {atRiskStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium text-slate-900">{student.fullName}</TableCell>
                  <TableCell className="text-slate-600">{student.mssv}</TableCell>
                  <TableCell className="text-slate-600">{student.roomNumber}</TableCell>
                  <TableCell className="text-slate-600">{student.conductScore} điểm</TableCell>
                  <TableCell>
                    {student.level === "Nguy cơ hủy" ? (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        🚨 Nguy cơ hủy nội trú
                      </Badge>
                    ) : student.level === "Cảnh báo" ? (
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
                      onClick={() => handleSendWarning(student.fullName)}
                    >
                      Gửi cảnh báo
                    </Button>
                    {student.level !== "Theo dõi" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => setCancelTarget({ id: student.id, name: student.fullName })}
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
