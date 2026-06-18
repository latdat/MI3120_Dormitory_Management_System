import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RoleGuard } from "@/components/RoleGuard";
import { useStore, useCurrentStudent, type ApplicationType } from "@/mock/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { formatDate } from "@/lib/format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/_app/registration")({
  component: RegistrationPage,
});

const STATUS_CLS = {
  "Chờ duyệt": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-transparent",
  "Đã duyệt": "bg-green-100 text-green-700 hover:bg-green-100 border-transparent",
  "Từ chối": "bg-red-100 text-red-700 hover:bg-red-100 border-transparent",
};

function RegistrationPage() {
  const { invoices, rooms, applications, addApplication } = useStore();
  const student = useCurrentStudent();

  const [building, setBuilding] = useState<string>("");
  const [targetRoom, setTargetRoom] = useState<string>("");
  const [reason, setReason] = useState("");
  const [extendTerm, setExtendTerm] = useState("hk1");
  const [checkoutDate, setCheckoutDate] = useState("");

  if (!student) return null;

  // 1. Kiểm tra công nợ (Use Case: Kiểm tra công nợ)
  const unpaidInvoices = invoices.filter(i => i.studentId === student.id && i.status !== "Đã thanh toán");
  const hasDebt = unpaidInvoices.length > 0;

  // Lấy lịch sử đơn
  const myApps = applications.filter(a => a.studentId === student.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const pendingApp = myApps.find(a => a.status === "Chờ duyệt");

  const availableRooms = rooms.filter(r => r.status !== "maintenance" && r.occupied < r.capacity && (building ? r.building === building : true));

  const handleSubmit = (type: ApplicationType) => {
    if (hasDebt) {
      toast.error("Vui lòng thanh toán công nợ trước khi nộp đơn!");
      return;
    }
    if (pendingApp) {
      toast.error("Bạn đang có một đơn chờ duyệt. Vui lòng chờ kết quả trước khi nộp đơn mới.");
      return;
    }

    if (type === "Đăng ký" || type === "Chuyển phòng") {
      if (!targetRoom) {
        toast.error("Vui lòng chọn phòng đích.");
        return;
      }
      addApplication({ studentId: student.id, roomId: targetRoom, type });
      toast.success(`Đã nộp đơn ${type.toLowerCase()} thành công!`);
    } else if (type === "Gia hạn") {
      if (!extendTerm) {
        toast.error("Vui lòng chọn kỳ gia hạn.");
        return;
      }
      addApplication({ studentId: student.id, roomId: student.roomId!, type });
      toast.success("Đã nộp đơn xin gia hạn nội trú!");
    } else if (type === "Trả phòng") {
      if (!checkoutDate) {
        toast.error("Vui lòng chọn ngày trả phòng.");
        return;
      }
      addApplication({ studentId: student.id, roomId: student.roomId!, type });
      toast.success("Đã nộp đơn xin trả phòng. Ban quản lý sẽ liên hệ kiểm kê.");
    }
    
    // Reset form
    setTargetRoom("");
    setBuilding("");
    setReason("");
    setExtendTerm("");
    setCheckoutDate("");
  };

  return (
    <RoleGuard allow={["student"]}>
      <PageHeader 
        title="Đăng ký & Quản lý hợp đồng" 
        description="Đăng ký ở nội trú, chuyển phòng, gia hạn hoặc trả phòng."
      />
      
      {hasDebt && (
        <div className="bg-[#fee2e2] text-[#dc2626] p-4 rounded-md flex items-start gap-3 mb-6">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Cảnh báo công nợ</p>
            <p className="text-sm mt-1">Bạn đang có {unpaidInvoices.length} hóa đơn chưa thanh toán. Theo quy định, bạn phải hoàn tất nghĩa vụ tài chính trước khi thực hiện các thủ tục nội trú mới. Vui lòng kiểm tra mục "Hóa đơn" và thanh toán.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {!student.roomId ? (
            <Card>
              <CardHeader>
                <CardTitle>Đăng ký phòng mới</CardTitle>
                <CardDescription>Chọn tòa nhà và phòng trống để nộp đơn xin ở nội trú.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Chọn tòa nhà</Label>
                    <Select value={building} onValueChange={setBuilding} disabled={hasDebt || !!pendingApp}>
                      <SelectTrigger><SelectValue placeholder="Chọn tòa" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Tòa A</SelectItem>
                        <SelectItem value="B">Tòa B</SelectItem>
                        <SelectItem value="C">Tòa C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Chọn phòng trống</Label>
                    <Select value={targetRoom} onValueChange={setTargetRoom} disabled={!building || hasDebt || !!pendingApp}>
                      <SelectTrigger><SelectValue placeholder="Chọn phòng" /></SelectTrigger>
                      <SelectContent>
                        {availableRooms.map(r => (
                          <SelectItem key={r.id} value={r.id}>
                            Phòng {r.number} (Còn {r.capacity - r.occupied} chỗ)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ghi chú / Nguyện vọng (Không bắt buộc)</Label>
                  <Input placeholder="Ví dụ: Cần phòng tầng thấp do chấn thương chân..." value={reason} onChange={e => setReason(e.target.value)} disabled={hasDebt || !!pendingApp} />
                </div>
                <Button 
                  className="w-full bg-[#C41230] hover:bg-[#a00f27] text-white" 
                  disabled={!targetRoom || hasDebt || !!pendingApp}
                  onClick={() => handleSubmit("Đăng ký")}
                >
                  Nộp đơn đăng ký
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="extend" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="extend">Gia hạn</TabsTrigger>
                <TabsTrigger value="transfer">Chuyển phòng</TabsTrigger>
                <TabsTrigger value="checkout">Trả phòng</TabsTrigger>
              </TabsList>
              
              <TabsContent value="extend">
                <Card>
                  <CardHeader>
                    <CardTitle>Gia hạn nội trú</CardTitle>
                    <CardDescription>Tiếp tục lưu trú tại phòng {rooms.find(r => r.id === student.roomId)?.number} cho học kỳ tiếp theo.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Chọn kỳ gia hạn</Label>
                      <Select value={extendTerm} onValueChange={setExtendTerm} disabled={hasDebt || !!pendingApp}>
                        <SelectTrigger><SelectValue placeholder="Chọn kỳ" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hk1">Học kỳ 1 (2026-2027)</SelectItem>
                          <SelectItem value="hk2">Học kỳ 2 (2026-2027)</SelectItem>
                          <SelectItem value="year">Cả năm học (2026-2027)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-[#C41230] hover:bg-[#a00f27] text-white" disabled={!extendTerm || hasDebt || !!pendingApp} onClick={() => handleSubmit("Gia hạn")}>
                      Nộp đơn gia hạn
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transfer">
                <Card>
                  <CardHeader>
                    <CardTitle>Chuyển phòng</CardTitle>
                    <CardDescription>Xin chuyển sang một phòng trống khác trong KTX.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Chọn tòa nhà đích</Label>
                        <Select value={building} onValueChange={setBuilding} disabled={hasDebt || !!pendingApp}>
                          <SelectTrigger><SelectValue placeholder="Chọn tòa" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">Tòa A</SelectItem>
                            <SelectItem value="B">Tòa B</SelectItem>
                            <SelectItem value="C">Tòa C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Chọn phòng đích</Label>
                        <Select value={targetRoom} onValueChange={setTargetRoom} disabled={!building || hasDebt || !!pendingApp}>
                          <SelectTrigger><SelectValue placeholder="Chọn phòng" /></SelectTrigger>
                          <SelectContent>
                            {availableRooms.map(r => (
                              <SelectItem key={r.id} value={r.id}>
                                Phòng {r.number} (Còn {r.capacity - r.occupied} chỗ)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Lý do chuyển phòng</Label>
                      <Input placeholder="Lý do chi tiết..." value={reason} onChange={e => setReason(e.target.value)} disabled={hasDebt || !!pendingApp} />
                    </div>
                    <Button className="w-full bg-[#C41230] hover:bg-[#a00f27] text-white" disabled={!targetRoom || !reason || hasDebt || !!pendingApp} onClick={() => handleSubmit("Chuyển phòng")}>
                      Nộp đơn xin chuyển
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="checkout">
                <Card>
                  <CardHeader>
                    <CardTitle>Đăng ký trả phòng</CardTitle>
                    <CardDescription>Chấm dứt hợp đồng, bàn giao tài sản và nhận lại tiền cọc.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Ngày dự kiến trả phòng</Label>
                      <Input type="date" value={checkoutDate} onChange={e => setCheckoutDate(e.target.value)} disabled={hasDebt || !!pendingApp} />
                    </div>
                    <div className="space-y-2">
                      <Label>Lý do trả phòng</Label>
                      <Input placeholder="Tốt nghiệp, chuyển trọ..." value={reason} onChange={e => setReason(e.target.value)} disabled={hasDebt || !!pendingApp} />
                    </div>
                    <Button className="w-full bg-[#C41230] hover:bg-[#a00f27] text-white" disabled={!checkoutDate || hasDebt || !!pendingApp} onClick={() => handleSubmit("Trả phòng")}>
                      Nộp đơn trả phòng
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Lịch sử đơn của tôi</CardTitle>
            </CardHeader>
            <CardContent>
              {myApps.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-6">Bạn chưa có đơn nào trong hệ thống.</div>
              ) : (
                <div className="space-y-4">
                  {myApps.map(a => (
                    <div key={a.id} className="border-b last:border-0 pb-3 last:pb-0 text-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-gray-800">{a.type}</span>
                        <Badge className={STATUS_CLS[a.status]} variant="secondary">{a.status}</Badge>
                      </div>
                      <div className="text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {formatDate(a.date)}</div>
                        <div>Phòng đăng ký: {rooms.find(r => r.id === a.roomId)?.number}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  );
}
