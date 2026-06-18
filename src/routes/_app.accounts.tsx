import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { toast } from "sonner";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/_app/accounts")({
  component: AccountsPage,
});

const INITIAL_DATA = [
  { id: "1", name: "Nguyễn Quản Lý", email: "admin@hust.edu.vn", role: "Quản lý KTX", active: true, lastLogin: "18/06/2026" },
  { id: "2", name: "Trần Kế Toán", email: "ketoan@hust.edu.vn", role: "Kế toán", active: true, lastLogin: "17/06/2026" },
  { id: "3", name: "Lê Kỹ Thuật", email: "kythuat@hust.edu.vn", role: "Kỹ thuật", active: true, lastLogin: "16/06/2026" },
  { id: "4", name: "Phạm Bảo Vệ", email: "baove@hust.edu.vn", role: "Bảo vệ", active: false, lastLogin: "10/06/2026" },
  { id: "5", name: "Hoàng Bảo Vệ", email: "baove2@hust.edu.vn", role: "Bảo vệ", active: true, lastLogin: "15/06/2026" },
];

function AccountsPage() {
  const [accounts, setAccounts] = useState(INITIAL_DATA);
  
  // Dialogs state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAccount, setEditAccount] = useState<typeof INITIAL_DATA[0] | null>(null);
  const [lockTarget, setLockTarget] = useState<typeof INITIAL_DATA[0] | null>(null);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", role: "Kế toán" });

  const handleToggle = (account: typeof INITIAL_DATA[0]) => {
    if (account.active) {
      setLockTarget(account);
    } else {
      // Direct unlock
      setAccounts((prev) => prev.map((a) => (a.id === account.id ? { ...a, active: true } : a)));
      toast.success(`Đã mở khóa tài khoản ${account.name}`);
    }
  };

  const handleConfirmLock = () => {
    if (lockTarget) {
      setAccounts((prev) => prev.map((a) => (a.id === lockTarget.id ? { ...a, active: false } : a)));
      toast.success(`Đã khóa tài khoản ${lockTarget.name}`);
      setLockTarget(null);
    }
  };

  const handleCreate = () => {
    if (!formData.name || !formData.email) return;
    const newAcc = {
      id: Math.random().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      active: true,
      lastLogin: "Chưa đăng nhập",
    };
    setAccounts([newAcc, ...accounts]);
    setIsAddOpen(false);
    setFormData({ name: "", email: "", role: "Kế toán" });
    toast.success("Đã tạo tài khoản thành công");
  };

  const handleUpdate = () => {
    if (editAccount) {
      setAccounts((prev) => prev.map((a) => (a.id === editAccount.id ? editAccount : a)));
      setEditAccount(null);
      toast.success("Cập nhật tài khoản thành công");
    }
  };

  return (
    <RoleGuard allow={["admin"]}>
      <div className="flex flex-col gap-6 w-full max-w-full">
        <PageHeader
          title="Quản lý tài khoản"
          description="Quản lý tài khoản nhân viên và phân quyền hệ thống."
          actions={
            <Button
              className="bg-[#C41230] hover:bg-[#A00F27] text-white"
              onClick={() => setIsAddOpen(true)}
            >
              ＋ Thêm tài khoản
            </Button>
          }
        />

        <div className="rounded-md border bg-white overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Họ tên</TableHead>
                <TableHead className="font-semibold text-slate-700">Email</TableHead>
                <TableHead className="font-semibold text-slate-700">Vai trò</TableHead>
                <TableHead className="font-semibold text-slate-700">Trạng thái</TableHead>
                <TableHead className="font-semibold text-slate-700">Lần đăng nhập cuối</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((acc) => (
                <TableRow key={acc.id}>
                  <TableCell className="font-medium text-slate-900">{acc.name}</TableCell>
                  <TableCell className="text-slate-600">{acc.email}</TableCell>
                  <TableCell className="text-slate-600">{acc.role}</TableCell>
                  <TableCell>
                    <Switch
                      checked={acc.active}
                      onCheckedChange={() => handleToggle(acc)}
                      className={acc.active ? "data-[state=checked]:bg-green-500" : ""}
                    />
                  </TableCell>
                  <TableCell className="text-slate-600">{acc.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditAccount({ ...acc })}
                    >
                      Chỉnh sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Lock Confirmation */}
        <AlertDialog open={!!lockTarget} onOpenChange={(open) => !open && setLockTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Khóa tài khoản {lockTarget?.name}?</AlertDialogTitle>
              <AlertDialogDescription>
                Tài khoản này sẽ không thể đăng nhập vào hệ thống cho đến khi được mở khóa lại.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction className="bg-[#C41230] hover:bg-[#A00F27] text-white" onClick={handleConfirmLock}>
                Xác nhận
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Add Account Dialog */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm tài khoản mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Vai trò</Label>
                <Select
                  value={formData.role}
                  onValueChange={(val) => setFormData({ ...formData, role: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kế toán">Kế toán</SelectItem>
                    <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                    <SelectItem value="Bảo vệ">Bảo vệ</SelectItem>
                    <SelectItem value="Quản lý KTX">Quản lý KTX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Hủy
              </Button>
              <Button className="bg-[#C41230] hover:bg-[#A00F27] text-white" onClick={handleCreate}>
                Tạo tài khoản
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Account Dialog */}
        <Dialog open={!!editAccount} onOpenChange={(open) => !open && setEditAccount(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
            </DialogHeader>
            {editAccount && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Họ tên</Label>
                  <Input
                    id="edit-name"
                    value={editAccount.name}
                    onChange={(e) => setEditAccount({ ...editAccount, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editAccount.email}
                    disabled
                    className="bg-slate-50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Vai trò</Label>
                  <Select
                    value={editAccount.role}
                    onValueChange={(val) => setEditAccount({ ...editAccount, role: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kế toán">Kế toán</SelectItem>
                      <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                      <SelectItem value="Bảo vệ">Bảo vệ</SelectItem>
                      <SelectItem value="Quản lý KTX">Quản lý KTX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditAccount(null)}>
                Hủy
              </Button>
              <Button className="bg-[#C41230] hover:bg-[#A00F27] text-white" onClick={handleUpdate}>
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </RoleGuard>
  );
}
