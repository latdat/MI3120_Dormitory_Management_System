import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
            color: "#1a1a1a",
          }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-sm mt-1" style={{ color: "#615d59" }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
