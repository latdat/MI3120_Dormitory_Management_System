import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useStore, useCurrentStudent, type InvoiceStatus, type Invoice } from "@/mock/store";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { TableToolbar } from "@/components/TableToolbar";
import { Pagination } from "@/components/Pagination";
import { formatVND, formatDate } from "@/lib/format";
import { toast } from "sonner";
import { Eye, Bell, CheckCircle, Printer, FileText, FilePlus2, QrCode } from "lucide-react";

export const Route = createFileRoute("/_app/invoices")({ component: InvoicesPage });

const STATUS_CLS: Record<InvoiceStatus, string> = {
  "Đã thanh toán": "rounded-full bg-[#dcfce7] text-[#16a34a] hover:bg-[#dcfce7] border-transparent",
  "Chưa thanh toán":
    "rounded-full bg-[#fef9c3] text-[#ca8a04] hover:bg-[#fef9c3] border-transparent",
  "Quá hạn": "rounded-full bg-[#fee2e2] text-[#dc2626] hover:bg-[#fee2e2] border-transparent",
};

const PAGE_SIZE = 10;

function InvoicesPage() {
  const { role, invoices, students, rooms, payInvoice, generateInvoicesFromMeters } = useStore();
  const current = useCurrentStudent();
  const baseList =
    role === "student" && current ? invoices.filter((i) => i.studentId === current.id) : invoices;

  const [detail, setDetail] = useState<Invoice | null>(null);
  const [payTarget, setPayTarget] = useState<Invoice | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkMonth, setBulkMonth] = useState("2026-05");
  const [bulkBuilding, setBulkBuilding] = useState("all");

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      baseList
        .filter((i) => {
          if (status !== "all" && i.status !== status) return false;
          if (q) {
            const s = students.find((x) => x.id === i.studentId);
            const hay = `${s?.fullName ?? ""} ${s?.mssv ?? ""} ${i.id}`.toLowerCase();
            if (!hay.includes(q.toLowerCase())) return false;
          }
          return true;
        })
        .sort((a, b) => {
          const unpaidA = a.status !== "Đã thanh toán" ? 0 : 1;
          const unpaidB = b.status !== "Đã thanh toán" ? 0 : 1;
          if (unpaidA !== unpaidB) return unpaidA - unpaidB;
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }),
    [baseList, students, q, status],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageNum = Math.min(page, totalPages);
  const view = filtered.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);

  const detailStudent = detail ? students.find((s) => s.id === detail.studentId) : null;
  const detailRoom = detail ? rooms.find((r) => r.id === detail.roomId) : null;
  const elecRate = 3500;
  const waterRate = 5973;
  const elecOld = 120,
    elecNew = 238,
    elecUsed = elecNew - elecOld;
  const waterOld = 45,
    waterNew = 67,
    waterUsed = waterNew - waterOld;

  const payStudent = payTarget ? students.find((s) => s.id === payTarget.studentId) : null;

  const canBulk = role === "accountant" || role === "admin";

  const handleBulk = () => {
    generateInvoicesFromMeters();
    toast.success(
      `Đã tạo hóa đơn hàng loạt cho kỳ ${bulkMonth}${bulkBuilding === "all" ? "" : ` — Tòa ${bulkBuilding}`}`,
    );
    setBulkOpen(false);
  };

  const confirmPaid = () => {
    if (payTarget) {
      payInvoice(payTarget.id);
      toast.success(`Đã ghi nhận thanh toán ${payTarget.id}`);
    }
    setPayTarget(null);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <PageHeader
        title="Hóa đơn"
        description={
          role === "student" ? "Các hóa đơn của bạn." : "Toàn bộ hóa đơn trong hệ thống."
        }
        actions={
          canBulk ? (
            <Button onClick={() => setBulkOpen(true)}>
              <FilePlus2 className="h-4 w-4" /> Tạo hóa đơn hàng loạt
            </Button>
          ) : undefined
        }
      />
      {role !== "student" && (
        <TableToolbar
          search={q}
          onSearch={(v) => {
            setQ(v);
            setPage(1);
          }}
          searchPlaceholder="Tìm theo tên, MSSV hoặc mã HĐ..."
          status={status}
          onStatus={(v) => {
            setStatus(v);
            setPage(1);
          }}
          statusOptions={[
            { value: "all", label: "Tất cả" },
            { value: "Đã thanh toán", label: "Đã thanh toán" },
            { value: "Chưa thanh toán", label: "Chưa thanh toán" },
            { value: "Quá hạn", label: "Quá hạn" },
          ]}
        />
      )}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã HĐ</TableHead>
              <TableHead>Sinh viên</TableHead>
              <TableHead>Phòng</TableHead>
              <TableHead>Kỳ</TableHead>
              <TableHead className="text-right">Điện</TableHead>
              <TableHead className="text-right">Nước</TableHead>
              <TableHead className="text-right">Phòng</TableHead>
              <TableHead className="text-right">Tổng</TableHead>
              <TableHead>Hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {view.map((i) => {
              const s = students.find((x) => x.id === i.studentId);
              const r = rooms.find((x) => x.id === i.roomId);
              const isUnpaid = i.status !== "Đã thanh toán";
              return (
                <TableRow key={i.id}>
                  <TableCell className="font-mono text-xs">{i.id}</TableCell>
                  <TableCell>{s?.fullName}</TableCell>
                  <TableCell>{r?.number}</TableCell>
                  <TableCell>{i.month}</TableCell>
                  <TableCell className="text-right">{formatVND(i.electricity)}</TableCell>
                  <TableCell className="text-right">{formatVND(i.water)}</TableCell>
                  <TableCell className="text-right">{formatVND(i.roomFee)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatVND(i.total)}</TableCell>
                  <TableCell>{formatDate(i.dueDate)}</TableCell>
                  <TableCell>
                    <Badge className={STATUS_CLS[i.status]}>{i.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setDetail(i)}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Xem chi tiết</TooltipContent>
                      </Tooltip>
                      {role === "student" && isUnpaid && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => setPayTarget(i)}
                              className="text-gray-400 hover:text-[#C41230] transition-colors"
                            >
                              <QrCode size={16} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Thanh toán bằng QR</TooltipContent>
                        </Tooltip>
                      )}
                      {role !== "student" && isUnpaid && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => toast(`Đã gửi nhắc nhở ${i.id}`)}
                                className="text-gray-400 hover:text-orange-500 transition-colors"
                              >
                                <Bell size={16} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Nhắc nợ</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => {
                                  payInvoice(i.id);
                                  toast.success(`Đã xác nhận thanh toán ${i.id}`);
                                }}
                                className="text-gray-400 hover:text-green-500 transition-colors"
                              >
                                <CheckCircle size={16} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Xác nhận thanh toán</TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {view.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-sm text-muted-foreground py-6">
                  Không có hóa đơn phù hợp.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination page={pageNum} totalPages={totalPages} onChange={setPage} />
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="sm:max-w-[520px] bg-white rounded-xl p-0 overflow-hidden">
          {detail && (
            <>
              <div className="bg-[#C41230] text-white px-6 py-4 flex items-center gap-3">
                <FileText className="h-6 w-6" />
                <div>
                  <p className="text-sm uppercase tracking-wide opacity-90">Hóa đơn tháng</p>
                  <p className="text-lg font-semibold">{detail.month}</p>
                </div>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Sinh viên:</span>
                  <span className="text-right font-medium">{detailStudent?.fullName ?? "—"}</span>
                  <span className="text-muted-foreground">MSSV:</span>
                  <span className="text-right font-medium">{detailStudent?.mssv ?? "—"}</span>
                  <span className="text-muted-foreground">Phòng:</span>
                  <span className="text-right font-medium">{detailRoom?.number ?? "—"}</span>
                  <span className="text-muted-foreground">Kỳ thanh toán:</span>
                  <span className="text-right font-medium">{detail.month}</span>
                </div>
                <hr />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground border-b">
                        <th className="text-left py-2 font-medium">Hạng mục</th>
                        <th className="text-right py-2 font-medium">CS cũ</th>
                        <th className="text-right py-2 font-medium">CS mới</th>
                        <th className="text-right py-2 font-medium">Tiêu thụ</th>
                        <th className="text-right py-2 font-medium">Đơn giá</th>
                        <th className="text-right py-2 font-medium">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Điện</td>
                        <td className="text-right">{elecOld}</td>
                        <td className="text-right">{elecNew}</td>
                        <td className="text-right">{elecUsed} kWh</td>
                        <td className="text-right">{formatVND(elecRate)}/kWh</td>
                        <td className="text-right font-medium">{formatVND(elecUsed * elecRate)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Nước</td>
                        <td className="text-right">{waterOld}</td>
                        <td className="text-right">{waterNew}</td>
                        <td className="text-right">{waterUsed} m³</td>
                        <td className="text-right">{formatVND(waterRate)}/m³</td>
                        <td className="text-right font-medium">
                          {formatVND(Math.round(waterUsed * waterRate))}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Tiền phòng</td>
                        <td className="text-right">—</td>
                        <td className="text-right">—</td>
                        <td className="text-right">—</td>
                        <td className="text-right">—</td>
                        <td className="text-right font-medium">{formatVND(detail.roomFee)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="font-bold">TỔNG CỘNG</span>
                  <span className="font-bold text-[#C41230] text-lg">
                    {formatVND(detail.total)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-muted-foreground">
                    Hạn thanh toán:{" "}
                    <span className="text-foreground font-medium">
                      {formatDate(detail.dueDate)}
                    </span>
                  </span>
                  <Badge className={STATUS_CLS[detail.status]}>{detail.status}</Badge>
                </div>
              </div>
              <div className="px-6 py-4 border-t flex justify-end gap-2 bg-gray-50">
                <Button variant="outline" onClick={() => setDetail(null)}>
                  Đóng
                </Button>
                <Button
                  variant="outline"
                  className="border-[#C41230] text-[#C41230] hover:bg-[#C41230]/10 hover:text-[#C41230]"
                  onClick={() => window.print()}
                >
                  <Printer className="h-4 w-4 mr-1.5" /> In hóa đơn
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!payTarget} onOpenChange={(o) => !o && setPayTarget(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Thanh toán hóa đơn</DialogTitle>
          </DialogHeader>
          {payTarget && (
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-[200px] h-[200px] rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium">
                  QR Code
                </div>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Quét mã QR bằng app ngân hàng để thanh toán
              </div>
              <div className="rounded-md bg-muted/40 p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số tiền:</span>
                  <span className="font-semibold text-[#C41230]">{formatVND(payTarget.total)}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Nội dung CK:</span>
                  <span className="font-medium text-right truncate">
                    {payTarget.id} - {payStudent?.fullName}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayTarget(null)}>
              Đóng
            </Button>
            <Button onClick={confirmPaid} className="bg-green-600 text-white hover:bg-green-700">
              Tôi đã thanh toán
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Tạo hóa đơn hàng loạt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Chọn kỳ thanh toán</Label>
              <Select value={bulkMonth} onValueChange={setBulkMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-05">2026-05</SelectItem>
                  <SelectItem value="2026-06">2026-06</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Chọn tòa</Label>
              <Select value={bulkBuilding} onValueChange={setBulkBuilding}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="A">Tòa A</SelectItem>
                  <SelectItem value="B">Tòa B</SelectItem>
                  <SelectItem value="C">Tòa C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground bg-muted/40 p-3 rounded-md">
              Hệ thống sẽ tự động tạo hóa đơn cho tất cả phòng đang có người ở trong kỳ được chọn.
            </p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setBulkOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleBulk}>Xác nhận tạo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
