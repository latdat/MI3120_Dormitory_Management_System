import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-1 py-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 px-3 text-xs rounded-md text-gray-600"
        disabled={page <= 1}
        onClick={() => onChange(Math.max(1, page - 1))}
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Trang trước
      </Button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`h-8 min-w-8 px-2 rounded-md text-xs font-medium border transition-colors ${
            p === page
              ? "bg-[#C41230] text-white border-[#C41230]"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 px-3 text-xs rounded-md text-gray-600"
        disabled={page >= totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
      >
        Trang sau <ChevronRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export function usePaginated<T>(items: T[], pageSize = 10) {
  return { totalPages: Math.max(1, Math.ceil(items.length / pageSize)), pageSize };
}
