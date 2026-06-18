import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useStore, ROLE_LABELS, useCurrentStudent } from "@/mock/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const { user, role } = useStore();
  const currentStudent = useCurrentStudent();
  const nav = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  useEffect(() => {
    // wait one tick for store hydration; if still no user after mount, redirect
    const t = setTimeout(() => {
      if (!user) nav({ to: "/" });
    }, 50);
    return () => clearTimeout(t);
  }, [user, nav]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header
            className="h-14 flex items-center justify-between px-4 sticky top-0 z-10"
            style={{ background: "#FFFFFF", borderBottom: "1px solid #e6e6e6", color: "#1a1a1a" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#1a1a1a" }}>
              <SidebarTrigger />
              <span className="text-sm hidden md:inline" style={{ color: "#1a1a1a" }}>
                Vai trò: <span className="font-medium">{ROLE_LABELS[role]}</span>
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setProfileOpen(true)} className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Hồ sơ cá nhân</span>
            </Button>
          </header>
          <main className="flex-1 p-6 max-w-[1400px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thông tin cá nhân</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <Input defaultValue={currentStudent?.fullName || "Nguyễn Văn Admin"} />
            </div>
            {role === "student" && currentStudent && (
              <div className="space-y-2">
                <Label>Mã số sinh viên (MSSV)</Label>
                <Input defaultValue={currentStudent.mssv} disabled />
              </div>
            )}
            <div className="space-y-2">
              <Label>Email liên hệ</Label>
              <Input defaultValue={role === "student" ? `${currentStudent?.mssv}@sis.hust.edu.vn` : "admin@hust.edu.vn"} />
            </div>
            <div className="space-y-2">
              <Label>Số điện thoại</Label>
              <Input defaultValue="0987654321" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileOpen(false)}>Hủy</Button>
            <Button onClick={() => {
              toast.success("Đã cập nhật thông tin cá nhân!");
              setProfileOpen(false);
            }} className="bg-[#C41230] text-white">Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
