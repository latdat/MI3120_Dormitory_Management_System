import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore, type ApplicationStatus } from "@/mock/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableToolbar } from "@/components/TableToolbar";
import { Pagination } from "@/components/Pagination";
import { formatDate } from "@/lib/format";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/applications")({ component: ApplicationsPage });

const STATUS_VARIANT: Record<ApplicationStatus, "default" | "secondary" | "destructive"> = {
  "Chờ duyệt": "secondary",
  "Đã duyệt": "default",
  "Từ chối": "destructive",
};

const PAGE_SIZE = 10;

function ApplicationsPage() {
  const { applications, students, rooms, approveApplication, rejectApplication } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (q) {
        const s = students.find((x) => x.id === a.studentId);
        const hay = `${s?.fullName ?? ""} ${s?.mssv ?? ""}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [applications, students, q, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <RoleGuard allow={["admin"]}>
      <PageHeader title="Đơn đăng ký" description="Duyệt các đơn đăng ký phòng của sinh viên." />
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
          { value: "Chờ duyệt", label: "Chờ duyệt" },
          { value: "Đã duyệt", label: "Đã duyệt" },
          { value: "Từ chối", label: "Từ chối" },
        ]}
      />
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sinh viên</TableHead>
              <TableHead>MSSV</TableHead>
              <TableHead>Phòng yêu cầu</TableHead>
              <TableHead>Loại đơn</TableHead>
              <TableHead>Ngày gửi</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {view.map((a) => {
              const s = students.find((x) => x.id === a.studentId);
              const r = rooms.find((x) => x.id === a.roomId);
              return (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{s?.fullName}</TableCell>
                  <TableCell>{s?.mssv}</TableCell>
                  <TableCell>{r?.number ?? "—"}</TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell>{formatDate(a.date)}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[a.status]}>{a.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {a.status === "Chờ duyệt" ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() => {
                            approveApplication(a.id);
                            toast.success("Đã duyệt đơn");
                          }}
                        >
                          <Check className="h-4 w-4" /> Duyệt
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#fef3c7] text-[#b45309] border border-[#fbbf24] hover:bg-[#fde68a] hover:text-[#92400e]"
                          onClick={() => {
                            rejectApplication(a.id);
                            toast("Đã từ chối đơn");
                          }}
                        >
                          <X className="h-4 w-4" /> Từ chối
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {view.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-6">
                  Không có đơn phù hợp.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination page={current} totalPages={totalPages} onChange={setPage} />
      </div>
    </RoleGuard>
  );
}
