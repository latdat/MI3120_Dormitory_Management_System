import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore, useCurrentStudent, type Deposit } from "@/mock/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableToolbar } from "@/components/TableToolbar";
import { Pagination } from "@/components/Pagination";
import { formatVND, formatDate } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/deposits")({ component: DepositsPage });

const PAGE_SIZE = 10;

function DepositsPage() {
  const { role, deposits, students, refundDeposit, payDeposit } = useStore();
  const currentStudent = useCurrentStudent();
  const [payTarget, setPayTarget] = useState<Deposit | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => {
      let baseList = deposits;
      if (role === "student" && currentStudent) {
        baseList = deposits.filter(d => d.studentId === currentStudent.id);
      }
      return baseList.filter((d) => {
        if (status !== "all" && d.status !== status) return false;
        if (q) {
          const s = students.find((x) => x.id === d.studentId);
          const hay = `${s?.fullName ?? ""} ${s?.mssv ?? ""}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      });
    },
    [deposits, students, q, status, role, currentStudent],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <RoleGuard allow={["accountant", "student"]}>
      <PageHeader
        title="Quản lý tiền cọc"
        description="Tiền cọc đặt phòng và hoàn trả khi sinh viên trả phòng."
      />
      <TableToolbar
        search={q}
        onSearch={(v) => {
          setQ(v);
          setPage(1);
        }}
        status={status}
        onStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
        statusOptions={[
          { value: "all", label: "Tất cả" },
          { value: "Đã thu", label: "Đã thu" },
          { value: "Đã hoàn", label: "Đã hoàn" },
          { value: "Chưa đóng", label: "Chưa đóng" },
        ]}
      />
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sinh viên</TableHead>
              <TableHead>MSSV</TableHead>
              <TableHead className="text-right">Số tiền</TableHead>
              <TableHead>Ngày thu</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {view.map((d) => {
              const s = students.find((x) => x.id === d.studentId);
              return (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{s?.fullName}</TableCell>
                  <TableCell>{s?.mssv}</TableCell>
                  <TableCell className="text-right">{formatVND(d.amount)}</TableCell>
                  <TableCell>{formatDate(d.date)}</TableCell>
                  <TableCell>
                    <Badge variant={d.status === "Đã hoàn" ? "secondary" : d.status === "Chưa đóng" ? "destructive" : "default"}>
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {role === "accountant" && d.status === "Đã thu" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          refundDeposit(d.id);
                          toast.success("Đã hoàn cọc");
                        }}
                      >
                        Hoàn cọc
                      </Button>
                    )}
                    {role === "student" && d.status === "Chưa đóng" && (
                      <Button
                        size="sm"
                        onClick={() => setPayTarget(d)}
                        className="bg-[#C41230] text-white hover:bg-[#a00f27]"
                      >
                        <QrCode className="mr-2 h-4 w-4" /> Thanh toán
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {view.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-6">
                  Không có khoản cọc phù hợp.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination page={current} totalPages={totalPages} onChange={setPage} />
      </div>

      <Dialog open={!!payTarget} onOpenChange={(o) => !o && setPayTarget(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Thanh toán tiền cọc</DialogTitle>
          </DialogHeader>
          {payTarget && (
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-[200px] h-[200px] rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium">
                  QR Code
                </div>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Quét mã QR bằng app ngân hàng để nộp cọc
              </div>
              <div className="rounded-md bg-muted/40 p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số tiền:</span>
                  <span className="font-semibold text-[#C41230]">{formatVND(payTarget.amount)}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Nội dung CK:</span>
                  <span className="font-medium text-right truncate">
                    COC - {students.find(s => s.id === payTarget.studentId)?.mssv}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayTarget(null)}>
              Đóng
            </Button>
            <Button onClick={() => {
              if (payTarget) {
                payDeposit(payTarget.id);
                toast.success("Đã nộp cọc thành công!");
              }
              setPayTarget(null);
            }} className="bg-green-600 text-white hover:bg-green-700">
              Tôi đã thanh toán
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RoleGuard>
  );
}
