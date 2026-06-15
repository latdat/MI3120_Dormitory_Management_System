import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore, violationTypes } from "@/mock/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableToolbar } from "@/components/TableToolbar";
import { Pagination } from "@/components/Pagination";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/violations")({ component: ViolationsPage });

const PAGE_SIZE = 10;

function ViolationsPage() {
  const { violations, students, addViolation } = useStore();
  const [mssv, setMssv] = useState("");
  const [type, setType] = useState(Object.keys(violationTypes)[0]);
  const [desc, setDesc] = useState("");

  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = students.find((x) => x.mssv.toLowerCase() === mssv.trim().toLowerCase());
    if (!s) {
      toast.error("Không tìm thấy MSSV");
      return;
    }
    addViolation({ studentId: s.id, type, description: desc });
    toast.success(`Đã ghi vi phạm cho ${s.fullName}`);
    setMssv("");
    setDesc("");
  };

  const filtered = useMemo(
    () =>
      violations.filter((v) => {
        if (typeFilter !== "all" && v.type !== typeFilter) return false;
        if (q) {
          const s = students.find((x) => x.id === v.studentId);
          const hay = `${s?.fullName ?? ""} ${s?.mssv ?? ""}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      }),
    [violations, students, q, typeFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const view = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <RoleGuard allow={["admin", "security"]}>
      <PageHeader
        title="Quản lý vi phạm"
        description="Ghi nhận vi phạm và tự động trừ điểm rèn luyện."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Ghi vi phạm mới</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <div className="space-y-2">
                <Label>MSSV</Label>
                <Input
                  value={mssv}
                  onChange={(e) => setMssv(e.target.value)}
                  placeholder="VD: SV001"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Loại vi phạm</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(violationTypes).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {k} (−{v} điểm)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mô tả</Label>
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                Điểm trừ tự động:{" "}
                <span className="font-semibold">−{violationTypes[type]} điểm</span>
              </div>
              <Button type="submit" className="w-full">
                Ghi vi phạm
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Lịch sử vi phạm</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <TableToolbar
              search={q}
              onSearch={(v) => {
                setQ(v);
                setPage(1);
              }}
              status={typeFilter}
              onStatus={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
              statusLabel="Loại vi phạm"
              statusOptions={[
                { value: "all", label: "Tất cả" },
                ...Object.keys(violationTypes).map((k) => ({ value: k, label: k })),
              ]}
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sinh viên</TableHead>
                  <TableHead>Loại vi phạm</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-right">Điểm trừ</TableHead>
                  <TableHead>Ngày</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {view.map((v) => {
                  const s = students.find((x) => x.id === v.studentId);
                  return (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium">{s?.fullName}</TableCell>
                      <TableCell>{v.type}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {v.description}
                      </TableCell>
                      <TableCell className="text-right text-destructive font-semibold">
                        −{v.points}
                      </TableCell>
                      <TableCell>{formatDate(v.date)}</TableCell>
                    </TableRow>
                  );
                })}
                {view.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-sm text-muted-foreground py-6"
                    >
                      Không có vi phạm phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Pagination page={current} totalPages={totalPages} onChange={setPage} />
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
