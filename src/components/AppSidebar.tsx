import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Receipt,
  Wrench,
  ShieldAlert,
  Bell,
  BarChart3,
  Gauge,
  Wallet,
  BedDouble,
  PlusCircle,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useStore, type Role } from "@/mock/store";
import { Button } from "@/components/ui/button";

type Item = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

const MENUS: Record<Role, Item[]> = {
  admin: [
    { title: "Tổng quan", url: "/dashboard", icon: LayoutDashboard },
    { title: "Phòng ở", url: "/rooms", icon: Building2 },
    { title: "Đơn đăng ký", url: "/applications", icon: FileText },
    { title: "Hóa đơn", url: "/invoices", icon: Receipt },
    { title: "Bảo trì", url: "/maintenance", icon: Wrench },
    { title: "Vi phạm", url: "/violations", icon: ShieldAlert },
    { title: "Thông báo", url: "/notifications", icon: Bell },
    { title: "Báo cáo", url: "/reports", icon: BarChart3 },
  ],
  student: [
    { title: "Tổng quan", url: "/dashboard", icon: LayoutDashboard },
    { title: "Phòng của tôi", url: "/my-room", icon: BedDouble },
    { title: "Hóa đơn", url: "/invoices", icon: Receipt },
    { title: "Gửi yêu cầu bảo trì", url: "/maintenance-new", icon: PlusCircle },
    { title: "Thông báo", url: "/notifications", icon: Bell },
  ],
  accountant: [
    { title: "Tổng quan", url: "/dashboard", icon: LayoutDashboard },
    { title: "Ghi chỉ số", url: "/meters", icon: Gauge },
    { title: "Hóa đơn", url: "/invoices", icon: Receipt },
    { title: "Tiền cọc", url: "/deposits", icon: Wallet },
  ],
  technical: [
    { title: "Tổng quan", url: "/dashboard", icon: LayoutDashboard },
    { title: "Bảng bảo trì", url: "/maintenance", icon: Wrench },
  ],
  security: [
    { title: "Tổng quan", url: "/dashboard", icon: LayoutDashboard },
    { title: "Ghi vi phạm", url: "/violations", icon: ShieldAlert },
  ],
};

export function AppSidebar() {
  const { role, logout } = useStore();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const items = MENUS[role];

  return (
    <Sidebar collapsible="icon" style={{ background: "#ffffff", borderRight: "1px solid #e6e6e6" }}>
      <SidebarHeader className="p-0" style={{ background: "#C41230" }}>
        <div className="flex flex-col items-center gap-1.5" style={{ padding: 16 }}>
          <img
            src="https://asean.org/wp-content/uploads/2024/12/HUST.png"
            alt="HUST"
            style={{
              width: "calc(100% - 16px)",
              maxWidth: "none",
              height: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          {!collapsed && (
            <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>
              Quản lý Ký túc xá
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent style={{ background: "#ffffff" }}>
        <SidebarGroup>
          <SidebarGroupLabel
            style={{
              color: "#615d59",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Điều hướng
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="transition-all duration-200"
                      style={
                        active
                          ? {
                              background: "#FEF2F2",
                              color: "#C41230",
                              borderLeft: "3px solid #C41230",
                              borderRadius: 0,
                              fontWeight: 500,
                            }
                          : {
                              color: "#1a1a1a",
                              borderLeft: "3px solid transparent",
                              borderRadius: 0,
                              fontWeight: 400,
                            }
                      }
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-2 hover:!bg-[#FEF2F2] hover:!text-[#C41230]"
                      >
                        <item.icon
                          className="h-4 w-4"
                          style={{ color: active ? "#C41230" : "#615d59" }}
                        />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className="p-2"
        style={{ background: "#ffffff", borderTop: "1px solid #e6e6e6" }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="justify-start hover:!bg-[#FEF2F2] hover:!text-[#C41230]"
          style={{ color: "#C41230" }}
        >
          <LogOut className="h-4 w-4" style={{ color: "#C41230" }} />
          {!collapsed && <span className="ml-2">Đăng xuất</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
