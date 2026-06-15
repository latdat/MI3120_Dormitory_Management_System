import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useStore, ROLE_LABELS } from "@/mock/store";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const { user, role } = useStore();
  const nav = useNavigate();
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
          </header>
          <main className="flex-1 p-6 max-w-[1400px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
