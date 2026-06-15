import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ROLE_LABELS, useStore, type Role } from "@/mock/store";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Đăng nhập — KTX Đại học" },
      { name: "description", content: "Đăng nhập hệ thống quản lý ký túc xá" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login } = useStore();
  const nav = useNavigate();
  const [role, setRole] = useState<Role>("admin");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [firstTime, setFirstTime] = useState(false);
  const [forgot, setForgot] = useState(false);

  useEffect(() => {
    if (user) nav({ to: "/dashboard" });
  }, [user, nav]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validCredentials: Record<Role, string> = {
      admin: "admin",
      student: "sinhvien",
      accountant: "ketoan",
      technical: "kythuat",
      security: "baove",
    };

    if (username !== validCredentials[role] || password !== "123456") {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      return;
    }

    if (password === "123456" && role !== "admin") {
      setFirstTime(true);
      return;
    }
    
    login(role);
    toast.success("Đăng nhập thành công");
    nav({ to: "/dashboard" });
  };

  const completeFirstTime = () => {
    setFirstTime(false);
    login(role);
    toast.success("Đổi mật khẩu thành công");
    nav({ to: "/dashboard" });
  };

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: `url('/Thu_vien_TQB.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Building2 className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl">KTX Đại học</CardTitle>
            <CardDescription>Hệ thống quản lý ký túc xá</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(ROLE_LABELS) as Role[]).map((r) => {
                      const demoUsernames: Record<Role, string> = {
                        admin: "admin",
                        student: "sinhvien",
                        accountant: "ketoan",
                        technical: "kythuat",
                        security: "baove",
                      };
                      return (
                        <SelectItem key={r} value={r}>
                          {ROLE_LABELS[r]} ({demoUsernames[r]})
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setForgot(true)}
                  className="text-xs text-primary hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
              <div className="text-[13px] text-muted-foreground bg-muted/50 p-3 rounded-md mt-4 leading-relaxed">
                💡 Gợi ý Demo: Tên đăng nhập là chữ trong ngoặc ở ô Vai trò. Ví dụ: Quản lý KTX -&gt; nhập 'admin', Sinh viên -&gt; nhập 'sinhvien', Kế toán -&gt; nhập 'ketoan', Kỹ thuật -&gt; nhập 'kythuat', Bảo vệ -&gt; nhập 'baove'. Mật khẩu mặc định cho tất cả là: 123456
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={firstTime} onOpenChange={setFirstTime}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu lần đầu</DialogTitle>
            <DialogDescription>Vui lòng tạo mật khẩu mới để bảo mật tài khoản.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Mật khẩu mới</Label>
              <Input type="password" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label>Xác nhận mật khẩu</Label>
              <Input type="password" defaultValue="" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={completeFirstTime}>Lưu và tiếp tục</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={forgot} onOpenChange={setForgot}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quên mật khẩu</DialogTitle>
            <DialogDescription>Nhập email để nhận hướng dẫn đặt lại mật khẩu.</DialogDescription>
          </DialogHeader>
          <Input placeholder="email@university.edu.vn" />
          <DialogFooter>
            <Button
              onClick={() => {
                setForgot(false);
                toast.success("Đã gửi email khôi phục (demo)");
              }}
            >
              Gửi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
