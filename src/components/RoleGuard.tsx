import type { ReactNode } from "react";
import { useStore, type Role } from "@/mock/store";

export function RoleGuard({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const { role } = useStore();
  if (!allow.includes(role)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Không có quyền truy cập</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Vui lòng đổi vai trò ở góc trên bên phải để xem trang này.
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
