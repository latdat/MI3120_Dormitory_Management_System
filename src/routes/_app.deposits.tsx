import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore } from "@/mock/store";
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
  const { deposits, students, refundDeposit } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      deposits.filter((d) => {
        if (status !== "all" && d.status !== status) return false;
        if (q) {
          const s = students.find((x) => x.id === d.studentId);
          const hay = `${s?.fullName ?? ""} ${s?.mssv ?? ""}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      }),
    [deposits, students, q, status],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <RoleGuard allow={["accountant"]}>
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
                    <Badge variant={d.status === "Đã hoàn" ? "secondary" : "default"}>
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {d.status === "Đã thu" && (
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
    </RoleGuard>
  );
}
