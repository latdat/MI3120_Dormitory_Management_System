import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface TableToolbarProps {
  search: string;
  onSearch: (v: string) => void;
  searchPlaceholder?: string;
  status: string;
  onStatus: (v: string) => void;
  statusOptions: Option[];
  statusLabel?: string;
}

export function TableToolbar({
  search,
  onSearch,
  searchPlaceholder = "Tìm theo tên hoặc MSSV...",
  status,
  onStatus,
  statusOptions,
  statusLabel = "Trạng thái",
}: TableToolbarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-3">
      <div className="relative flex-1 min-w-[220px] max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>
      <Select value={status} onValueChange={onStatus}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={statusLabel} />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
