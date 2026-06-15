import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore, type MaintStatus, type MaintenanceRequest } from "@/mock/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/format";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type Category = "Điện" | "Nước" | "Cơ sở vật chất";
type Priority = "Cao" | "Trung bình" | "Thấp";

function categorize(m: MaintenanceRequest): Category {
  const t = `${m.title} ${m.description}`.toLowerCase();
  if (/(điện|đèn|quạt|ổ cắm|công tắc)/.test(t)) return "Điện";
  if (/(nước|vòi|ống|rò rỉ|bồn)/.test(t)) return "Nước";
  return "Cơ sở vật chất";
}
function priorityFor(cat: Category, m: MaintenanceRequest): Priority {
  if (cat === "Điện" || cat === "Nước") return "Cao";
  return /(hỏng|kẹt|vỡ)/i.test(`${m.title} ${m.description}`) ? "Trung bình" : "Thấp";
}
const CAT_BADGE: Record<Category, { cls: string; label: string }> = {
  Điện: { cls: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "⚡ Điện" },
  Nước: { cls: "bg-blue-50 text-blue-700 border-blue-200", label: "💧 Nước" },
  "Cơ sở vật chất": {
    cls: "bg-amber-50 text-amber-800 border-amber-200",
    label: "🪑 Cơ sở vật chất",
  },
};
const PRIO_BADGE: Record<Priority, string> = {
  Cao: "bg-red-50 text-red-700 border-red-200",
  "Trung bình": "bg-orange-50 text-orange-700 border-orange-200",
  Thấp: "bg-gray-100 text-gray-600 border-gray-200",
};

export const Route = createFileRoute("/_app/maintenance")({ component: MaintenancePage });

const COLS: MaintStatus[] = ["Chờ tiếp nhận", "Đang xử lý", "Hoàn thành"];
const COL_TONE: Record<MaintStatus, string> = {
  "Chờ tiếp nhận": "border-amber-200 bg-amber-50",
  "Đang xử lý": "border-indigo-200 bg-indigo-50",
  "Hoàn thành": "border-emerald-200 bg-emerald-50",
};

function MaintenancePage() {
  const { maintenance, rooms, students, setMaintStatus } = useStore();
  const [selected, setSelected] = useState<MaintenanceRequest | null>(null);
  const [status, setStatus] = useState<MaintStatus>("Chờ tiếp nhận");
  const [tech, setTech] = useState("");
  const [note, setNote] = useState("");

  const openCard = (m: MaintenanceRequest) => {
    setSelected(m);
    setStatus(m.status);
    setTech("");
    setNote("");
  };

  const move = (id: string, dir: 1 | -1) => {
    const m = maintenance.find((x) => x.id === id);
    if (!m) return;
    const idx = COLS.indexOf(m.status);
    const next = COLS[idx + dir];
    if (next) setMaintStatus(id, next);
  };

  const save = () => {
    if (!selected) return;
    setMaintStatus(selected.id, status);
    toast.success("Đã cập nhật yêu cầu bảo trì");
    setSelected(null);
  };

  const sel = selected;
  const selRoom = sel ? rooms.find((x) => x.id === sel.roomId) : null;
  const selStudent = sel ? students.find((x) => x.id === sel.studentId) : null;
  const selCat = sel ? categorize(sel) : null;
  const selPrio = sel && selCat ? priorityFor(selCat, sel) : null;

  return (
    <RoleGuard allow={["admin", "technical", "student"]}>
      <PageHeader
        title="Bảng yêu cầu bảo trì"
        description="Theo dõi và cập nhật trạng thái các yêu cầu sửa chữa."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLS.map((col) => (
          <div key={col} className={`rounded-lg border-2 ${COL_TONE[col]} p-3 min-h-[200px]`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">{col}</h3>
              <span className="text-xs text-muted-foreground">
                {maintenance.filter((m) => m.status === col).length}
              </span>
            </div>
            <div className="space-y-2">
              {maintenance
                .filter((m) => m.status === col)
                .map((m) => {
                  const r = rooms.find((x) => x.id === m.roomId);
                  const s = students.find((x) => x.id === m.studentId);
                  const cat = categorize(m);
                  const prio = priorityFor(cat, m);
                  return (
                    <Card
                      key={m.id}
                      className="p-3 cursor-pointer hover:shadow-md transition"
                      onClick={() => openCard(m)}
                    >
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{m.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Phòng {r?.number} • {s?.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="outline" className={CAT_BADGE[cat].cls}>
                          {CAT_BADGE[cat].label}
                        </Badge>
                        <Badge variant="outline" className={PRIO_BADGE[prio]}>
                          {prio}
                        </Badge>
                      </div>
                      <p className="text-xs mt-2">{m.description}</p>
                      <div
                        className="flex items-center justify-between mt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-[11px] text-muted-foreground">
                          {formatDate(m.createdAt)}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => move(m.id, -1)}
                            disabled={COLS.indexOf(m.status) === 0}
                          >
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => move(m.id, 1)}
                            disabled={COLS.indexOf(m.status) === COLS.length - 1}
                          >
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!sel} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-[560px] bg-white rounded-xl">
          {sel && selCat && selPrio && (
            <>
              <DialogHeader>
                <DialogTitle className="text-base">{sel.title}</DialogTitle>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="outline" className={PRIO_BADGE[selPrio]}>
                    {selPrio}
                  </Badge>
                  <Badge variant="outline" className={CAT_BADGE[selCat].cls}>
                    {CAT_BADGE[selCat].label}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Phòng</p>
                  <p className="font-medium text-sm">{selRoom?.number ?? "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ngày gửi</p>
                  <p className="font-medium text-sm">{formatDate(sel.createdAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sinh viên gửi</p>
                  <p className="font-medium text-sm">{selStudent?.fullName ?? "—"}</p>
                </div>
              </div>
              {sel.imageUrl ? (
                <div
                  className="rounded-lg overflow-hidden flex items-center justify-center bg-[#f3f4f6]"
                  style={{ height: 180 }}
                >
                  <img
                    src={sel.imageUrl}
                    alt="Ảnh đính kèm"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="rounded-lg bg-[#f3f4f6] flex items-center justify-center text-sm text-gray-500"
                  style={{ height: 180 }}
                >
                  📷 Ảnh sinh viên đính kèm
                </div>
              )}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Cập nhật xử lý</h4>
                <div className="grid gap-2">
                  <Label className="text-xs">Trạng thái</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as MaintStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Kỹ thuật viên phụ trách</Label>
                  <Input
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    placeholder="Nhập tên kỹ thuật viên..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Ghi chú xử lý</Label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Mô tả tình trạng và hướng xử lý..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Hủy
                </Button>
                <Button className="bg-[#C41230] hover:bg-[#a30f28] text-white" onClick={save}>
                  Lưu cập nhật
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </RoleGuard>
  );
}
