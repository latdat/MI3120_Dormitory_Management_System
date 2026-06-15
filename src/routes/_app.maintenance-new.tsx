import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useStore, useCurrentStudent } from "@/mock/store";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/maintenance-new")({
  component: NewRequestPage,
  validateSearch: (search: Record<string, unknown>) => ({
    title: typeof search.title === "string" ? search.title : "",
  }),
});

function NewRequestPage() {
  const student = useCurrentStudent();
  const { addMaintenance } = useStore();
  const nav = useNavigate();
  const { title: initialTitle } = Route.useSearch();
  const [title, setTitle] = useState(initialTitle ?? "");
  const [description, setDescription] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student?.roomId) {
      toast.error("Bạn chưa có phòng");
      return;
    }
    addMaintenance({ studentId: student.id, roomId: student.roomId, title, description });
    toast.success("Đã gửi yêu cầu bảo trì");
    nav({ to: "/maintenance" });
  };

  return (
    <RoleGuard allow={["student"]}>
      <PageHeader
        title="Gửi yêu cầu bảo trì"
        description="Mô tả vấn đề để bộ phận kỹ thuật hỗ trợ."
      />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tiêu đề</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Quạt trần hỏng"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Mô tả chi tiết</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Ảnh đính kèm</Label>
              <label
                htmlFor="maint-photo"
                className="flex flex-col items-center justify-center text-center gap-1 h-[120px] rounded-lg border-2 border-dashed border-gray-300 bg-[#f9fafb] hover:border-[#C41230] hover:bg-[#fef2f2] transition-colors cursor-pointer"
              >
                <span className="text-2xl" aria-hidden>
                  📷
                </span>
                <span className="text-sm text-gray-600">Kéo thả ảnh vào đây hoặc nhấn để chọn</span>
                <span className="text-xs text-muted-foreground">PNG, JPG (tối đa 5MB)</span>
                <input
                  id="maint-photo"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                />
              </label>
            </div>
            <Button type="submit">Gửi yêu cầu</Button>
          </form>
        </CardContent>
      </Card>
    </RoleGuard>
  );
}
