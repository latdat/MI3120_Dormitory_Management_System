import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatVND } from "@/lib/format";
import { toast } from "sonner";
import { Download, Printer, Search } from "lucide-react";

const ELEC = 3500,
  WATER = 5973;

export const Route = createFileRoute("/_app/meters")({ component: MetersPage });

function MetersPage() {
  const { meters, rooms, updateMeter, generateInvoicesFromMeters } = useStore();
  const [q, setQ] = useState("");
  const [building, setBuilding] = useState<string>("all");

  const filtered = meters.filter((m) => {
    const room = rooms.find((r) => r.id === m.roomId);
    if (!room) return false;
    if (building !== "all" && room.building !== building) return false;
    if (q && !room.number.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <RoleGuard allow={["accountant"]}>
      <PageHeader
        title="Ghi chỉ số điện & nước"
        description={`Đơn giá: ${formatVND(ELEC)}/kWh điện, ${formatVND(WATER)}/m³ nước (tự động tính tiêu thụ & thành tiền)`}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => toast("Đang xuất file...")}
            >
              <Download className="h-4 w-4" /> Xuất Excel
            </Button>
            <Button variant="outline" onClick={() => toast("Đang xuất file...")}>
              <Printer className="h-4 w-4" /> In danh sách
            </Button>
            <Button
              onClick={() => {
                generateInvoicesFromMeters();
                toast.success("Đã tạo hóa đơn từ chỉ số");
              }}
            >
              Tạo hóa đơn
            </Button>
          </div>
        }
      />
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo số phòng..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={building} onValueChange={setBuilding}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo tòa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="A">Tòa A</SelectItem>
            <SelectItem value="B">Tòa B</SelectItem>
            <SelectItem value="C">Tòa C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phòng</TableHead>
              <TableHead>Kỳ</TableHead>
              <TableHead className="text-right">Điện cũ</TableHead>
              <TableHead className="text-right">Điện mới</TableHead>
              <TableHead className="text-right">Tiêu thụ</TableHead>
              <TableHead className="text-right">Nước cũ</TableHead>
              <TableHead className="text-right">Nước mới</TableHead>
              <TableHead className="text-right">Tiêu thụ</TableHead>
              <TableHead className="text-right">Thành tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => {
              const room = rooms.find((r) => r.id === m.roomId);
              const eUse = Math.max(0, m.newElec - m.prevElec);
              const wUse = Math.max(0, m.newWater - m.prevWater);
              const total = eUse * ELEC + wUse * WATER;
              return (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{room?.number}</TableCell>
                  <TableCell>{m.month}</TableCell>
                  <TableCell className="text-right w-28">
                    <Input
                      type="number"
                      value={m.prevElec}
                      onChange={(e) => updateMeter(m.id, { prevElec: Number(e.target.value) })}
                      className="h-8 text-right bg-transparent border-gray-200 focus-visible:border-gray-400 focus-visible:ring-gray-400 rounded-md"
                    />
                  </TableCell>
                  <TableCell className="text-right w-28">
                    <Input
                      type="number"
                      value={m.newElec}
                      onChange={(e) => updateMeter(m.id, { newElec: Number(e.target.value) })}
                      className="h-8 text-right bg-[#fffbeb] border-[#fbbf24] focus-visible:border-[#f59e0b] focus-visible:ring-[#f59e0b] rounded-md"
                    />
                  </TableCell>
                  <TableCell className="text-right">{eUse} kWh</TableCell>
                  <TableCell className="text-right w-28">
                    <Input
                      type="number"
                      value={m.prevWater}
                      onChange={(e) => updateMeter(m.id, { prevWater: Number(e.target.value) })}
                      className="h-8 text-right bg-transparent border-gray-200 focus-visible:border-gray-400 focus-visible:ring-gray-400 rounded-md"
                    />
                  </TableCell>
                  <TableCell className="text-right w-28">
                    <Input
                      type="number"
                      value={m.newWater}
                      onChange={(e) => updateMeter(m.id, { newWater: Number(e.target.value) })}
                      className="h-8 text-right bg-[#fffbeb] border-[#fbbf24] focus-visible:border-[#f59e0b] focus-visible:ring-[#f59e0b] rounded-md"
                    />
                  </TableCell>
                  <TableCell className="text-right">{wUse} m³</TableCell>
                  <TableCell className="text-right font-semibold">{formatVND(total)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </RoleGuard>
  );
}
