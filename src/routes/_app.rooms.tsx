import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useStore, type Room } from "@/mock/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/rooms")({ component: RoomsPage });

const STATUS_LABEL: Record<string, string> = {
  available: "Còn trống",
  occupied: "Đang ở",
  maintenance: "Bảo trì",
};

const STATUS_BADGE: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700 border-transparent",
  occupied: "bg-indigo-100 text-indigo-700 border-transparent",
  maintenance: "bg-amber-100 text-amber-800 border-transparent",
};

function getRoomCardStyle(r: Room): string {
  if (r.status === "maintenance")
    return "bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-800";
  if (r.occupied === 0)
    return "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-800";
  if (r.occupied >= r.capacity)
    return "bg-indigo-200 border-indigo-400 hover:bg-indigo-300 text-indigo-900";
  return "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800";
}

type SampleStudent = {
  fullName: string;
  mssv: string;
  classCode: string;
  phone: string;
  paid: boolean;
};

const A101: SampleStudent[] = [
  {
    fullName: "Nguyễn Phúc Vinh",
    mssv: "202419019",
    classCode: "CNTT-01",
    phone: "0912345678",
    paid: true,
  },
  {
    fullName: "Trần Bảo Nhật",
    mssv: "202418958",
    classCode: "ĐTVT-01",
    phone: "0934567890",
    paid: true,
  },
  {
    fullName: "Phan Mạnh Hùng",
    mssv: "202418908",
    classCode: "CNTT-03",
    phone: "0945678901",
    paid: true,
  },
];

const POOL_NAMES = [
  "Nguyễn Hoàng Long",
  "Đặng Thị Mai",
  "Bùi Quang Huy",
  "Hoàng Tuấn Anh",
  "Đỗ Thị Phương",
  "Ngô Văn Sơn",
  "Trần Khánh Linh",
  "Phan Văn Đạt",
  "Lý Thị Hằng",
  "Vũ Đình Nam",
  "Lê Bảo Châu",
  "Mai Thị Hồng",
  "Tô Anh Quân",
  "Đinh Thị Yến",
  "Hồ Văn Thắng",
  "Nguyễn Diệu Linh",
  "Trịnh Quốc Bảo",
  "Trần Văn Hùng",
  "Phạm Thị Nga",
  "Lê Minh Tú",
];
const POOL_CLASS = [
  "CNTT-01",
  "CNTT-02",
  "CNTT-03",
  "ĐTVT-01",
  "ĐTVT-02",
  "CK-01",
  "CK-02",
  "KTĐL-01",
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function sampleForRoom(r: Room): SampleStudent[] {
  if (r.number === "A101") return A101;
  const base = hashStr(r.id);
  const out: SampleStudent[] = [];
  for (let i = 0; i < r.occupied; i++) {
    const k = (base + i * 17) >>> 0;
    const name = POOL_NAMES[k % POOL_NAMES.length];
    const cls = POOL_CLASS[(k >> 3) % POOL_CLASS.length];
    const phone = "09" + String(10000000 + ((k * 7) % 90000000));
    const num = (k % 900) + 100;
    out.push({
      fullName: name,
      mssv: `SV${String(num).padStart(3, "0")}`,
      classCode: cls,
      phone,
      paid: (k >> 5) % 3 !== 0,
    });
  }
  return out;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] ?? "";
  const first = parts[parts.length - 2] ?? "";
  return (first[0] ?? "") + (last[0] ?? "");
}

function avatarColor(seed: string): string {
  const colors = [
    "bg-rose-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-fuchsia-500",
  ];
  return colors[hashStr(seed) % colors.length];
}

function RoomsPage() {
  const { rooms } = useStore();
  const [selected, setSelected] = useState<Room | null>(null);
  const [removeTarget, setRemoveTarget] = useState<SampleStudent | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [mssvInput, setMssvInput] = useState("");
  const buildings: Array<"A" | "B" | "C"> = ["A", "B", "C"];
  const sample = selected ? sampleForRoom(selected) : [];
  const isFull = selected ? selected.occupied >= selected.capacity : false;

  const confirmRemove = () => {
    if (removeTarget) toast.success(`Đã chuyển ${removeTarget.fullName} ra khỏi phòng`);
    setRemoveTarget(null);
  };

  const confirmAdd = () => {
    toast.success(`Đã thêm sinh viên ${mssvInput} vào phòng ${selected?.number}`);
    setAddOpen(false);
    setMssvInput("");
  };

  const showAutofill = mssvInput.trim().length >= 4;

  return (
    <div>
      <PageHeader
        title="Quản lý phòng ở"
        description="Bản đồ trạng thái phòng theo từng tòa nhà."
      />
      <div className="flex gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-emerald-300" /> Còn trống
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-indigo-300" /> Đang ở
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-amber-300" /> Bảo trì
        </span>
      </div>
      <Tabs defaultValue="A">
        <TabsList>
          {buildings.map((b) => (
            <TabsTrigger key={b} value={b}>
              Tòa {b}
            </TabsTrigger>
          ))}
        </TabsList>
        {buildings.map((b) => (
          <TabsContent key={b} value={b}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {rooms
                .filter((r) => r.building === b)
                .map((r) => {
                  const pct = r.capacity ? Math.round((r.occupied / r.capacity) * 100) : 0;
                  const full = r.status !== "maintenance" && r.occupied >= r.capacity;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelected(r)}
                      className={`relative rounded-xl border-2 p-4 text-left transition shadow-sm hover:shadow-md ${getRoomCardStyle(r)}`}
                    >
                      <span className="absolute top-2 left-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold shadow-sm">
                        {r.number}
                      </span>
                      {full && (
                        <span className="absolute top-2 right-2 rounded-full bg-[#C41230] text-white px-2 py-0.5 text-[10px] font-semibold shadow-sm">
                          Hết chỗ
                        </span>
                      )}
                      <div className="pt-5">
                        <div className="text-lg font-semibold">
                          {r.occupied}/{r.capacity}
                        </div>
                        <div className="text-[11px] opacity-80">người ở</div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200/80 overflow-hidden">
                          <div
                            className="h-full bg-[#C41230] transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-[11px] mt-1 font-medium">{STATUS_LABEL[r.status]}</div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-[420px] p-0 bg-white flex flex-col">
          {selected && (
            <>
              <SheetHeader className="px-5 py-4 border-b">
                <div className="flex items-center gap-2">
                  <SheetTitle className="text-lg">Phòng {selected.number}</SheetTitle>
                  <Badge className={STATUS_BADGE[selected.status]}>
                    {STATUS_LABEL[selected.status]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tòa {selected.building} • {selected.occupied}/{selected.capacity} người
                </p>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <h3 className="text-sm font-semibold mb-3">Danh sách sinh viên trong phòng</h3>
                {sample.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Chưa có sinh viên trong phòng.</p>
                ) : (
                  <ul className="space-y-2">
                    {sample.map((s) => (
                      <li key={s.mssv} className="flex items-center gap-3 rounded-lg border p-3">
                        <div
                          className={`h-10 w-10 rounded-full ${avatarColor(s.mssv)} text-white flex items-center justify-center text-sm font-semibold shrink-0`}
                        >
                          {initials(s.fullName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{s.fullName}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {s.mssv} • {s.classCode}
                          </p>
                          <p className="text-[11px] text-muted-foreground">📞 {s.phone}</p>
                        </div>
                        <Badge
                          className={
                            s.paid
                              ? "bg-emerald-100 text-emerald-700 border-transparent"
                              : "bg-red-100 text-red-700 border-transparent"
                          }
                        >
                          {s.paid ? "Đã đóng" : "Chưa đóng"}
                        </Badge>
                        <button
                          type="button"
                          onClick={() => setRemoveTarget(s)}
                          className="ml-1 inline-flex items-center gap-1 text-[13px] text-[#b45309] hover:underline shrink-0"
                          title="Chuyển sinh viên ra khỏi phòng"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Chuyển ra
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="border-t px-5 py-4 bg-white">
                {isFull ? (
                  <Button
                    disabled
                    className="w-full h-11 rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-200"
                  >
                    Phòng đã đầy
                  </Button>
                ) : (
                  <Button
                    onClick={() => setAddOpen(true)}
                    className="w-full h-11 rounded-lg bg-[#C41230] text-white hover:bg-[#A01025]"
                  >
                    + Thêm sinh viên vào phòng
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!removeTarget} onOpenChange={(o) => !o && setRemoveTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận chuyển ra</AlertDialogTitle>
            <AlertDialogDescription>
              Xác nhận chuyển {removeTarget?.fullName} ra khỏi phòng?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-[#C41230] text-white hover:bg-[#A01025]"
            >
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={addOpen}
        onOpenChange={(o) => {
          setAddOpen(o);
          if (!o) setMssvInput("");
        }}
      >
        <DialogContent className="sm:max-w-[400px] z-[60]">
          <DialogHeader>
            <DialogTitle>Thêm sinh viên vào phòng {selected?.number}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Mã số sinh viên (MSSV)</Label>
              <Input
                placeholder="Nhập MSSV..."
                value={mssvInput}
                onChange={(e) => setMssvInput(e.target.value)}
              />
            </div>
            {showAutofill && (
              <div className="rounded-md border bg-muted/30 p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Họ tên:</span>
                  <span className="font-medium">Nguyễn Thị Mai</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lớp:</span>
                  <span className="font-medium">CNTT-04</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ngày sinh:</span>
                  <span className="font-medium">15/03/2004</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAddOpen(false);
                setMssvInput("");
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={confirmAdd}
              disabled={!showAutofill}
              className="bg-[#C41230] text-white hover:bg-[#A01025]"
            >
              Xác nhận thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
