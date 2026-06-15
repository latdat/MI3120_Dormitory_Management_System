import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/mock/store";
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
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";
import { Paperclip } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({ component: NotifsPage });

function NotifsPage() {
  const { role, notifications, addNotification } = useStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<"Tất cả" | "Sinh viên" | "Nhân viên">("Tất cả");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({ title, body, audience });
    toast.success("Đã gửi thông báo");
    setTitle("");
    setBody("");
  };

  const canCompose = role === "admin";
  const list =
    role === "student" ? notifications.filter((n) => n.audience !== "Nhân viên") : notifications;

  return (
    <div>
      <PageHeader
        title="Thông báo"
        description={
          canCompose ? "Soạn và gửi thông báo cho cư dân." : "Các thông báo từ ban quản lý."
        }
      />
      <div className={`grid grid-cols-1 ${canCompose ? "lg:grid-cols-3" : ""} gap-4`}>
        {canCompose && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Soạn thông báo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-3">
                <div className="space-y-2">
                  <Label>Tiêu đề</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Nội dung</Label>
                  <Textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Đính kèm tệp</Label>
                  <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30 hover:bg-muted/50 hover:border-muted-foreground/50 transition-colors cursor-pointer px-4 py-6 text-center">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Kéo thả file hoặc nhấn để chọn (PDF, JPG, PNG)
                    </span>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                  </label>
                </div>
                <div className="space-y-2">
                  <Label>Đối tượng</Label>
                  <Select value={audience} onValueChange={(v) => setAudience(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả">Tất cả</SelectItem>
                      <SelectItem value="Sinh viên">Sinh viên</SelectItem>
                      <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Gửi thông báo
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        <Card className={canCompose ? "lg:col-span-2" : ""}>
          <CardHeader>
            <CardTitle className="text-base">{canCompose ? "Đã gửi" : "Hộp thư của bạn"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {list.map((n) => (
              <div key={n.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{n.title}</p>
                  <Badge variant="secondary">{n.audience}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(n.date)}</p>
                <p className="text-sm mt-2">{n.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
