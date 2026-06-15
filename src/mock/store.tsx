import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "student" | "accountant" | "technical" | "security";

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Quản lý KTX",
  student: "Sinh viên",
  accountant: "Kế toán",
  technical: "Kỹ thuật",
  security: "Bảo vệ",
};

export type RoomStatus = "available" | "occupied" | "maintenance";
export interface Room {
  id: string;
  building: "A" | "B" | "C";
  number: string;
  capacity: number;
  occupied: number;
  status: RoomStatus;
  monthlyFee: number;
}

export interface Student {
  id: string;
  mssv: string;
  fullName: string;
  gender: "Nam" | "Nữ";
  roomId: string | null;
  conductScore: number;
}

export type ApplicationType = "Đăng ký" | "Chuyển phòng" | "Gia hạn" | "Trả phòng";
export type ApplicationStatus = "Chờ duyệt" | "Đã duyệt" | "Từ chối";
export interface Application {
  id: string;
  studentId: string;
  roomId: string;
  type: ApplicationType;
  date: string;
  status: ApplicationStatus;
}

export type InvoiceStatus = "Chưa thanh toán" | "Đã thanh toán" | "Quá hạn";
export interface Invoice {
  id: string;
  studentId: string;
  roomId: string;
  month: string; // YYYY-MM
  electricity: number;
  water: number;
  roomFee: number;
  total: number;
  dueDate: string;
  status: InvoiceStatus;
}

export type MaintStatus = "Chờ tiếp nhận" | "Đang xử lý" | "Hoàn thành";
export interface MaintenanceRequest {
  id: string;
  roomId: string;
  studentId: string;
  title: string;
  description: string;
  status: MaintStatus;
  createdAt: string;
  imageUrl?: string;
}

export interface Violation {
  id: string;
  studentId: string;
  type: string;
  description: string;
  points: number;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  audience: "Tất cả" | "Sinh viên" | "Nhân viên";
  date: string;
}

export interface MeterReading {
  id: string;
  roomId: string;
  month: string;
  prevElec: number;
  newElec: number;
  prevWater: number;
  newWater: number;
}

export interface Deposit {
  id: string;
  studentId: string;
  amount: number;
  status: "Đã thu" | "Đã hoàn";
  date: string;
}

const VIOLATION_TYPES: Record<string, number> = {
  "Vi phạm giờ giới nghiêm": 5,
  "Gây mất trật tự": 10,
  "Hút thuốc trong KTX": 15,
  "Mang đồ cấm vào KTX": 20,
  "Đánh nhau": 30,
};

// ---------- Seed ----------
const seedRooms = (): Room[] => {
  const out: Room[] = [];
  const config: Record<"A" | "B" | "C", Array<{ occupied: number; status: RoomStatus }>> = {
    A: [
      { occupied: 3, status: "occupied" },
      { occupied: 5, status: "occupied" },
      { occupied: 6, status: "occupied" },
      { occupied: 4, status: "occupied" },
      { occupied: 0, status: "available" },
      { occupied: 0, status: "maintenance" },
    ],
    B: [
      { occupied: 6, status: "occupied" },
      { occupied: 5, status: "occupied" },
      { occupied: 4, status: "occupied" },
      { occupied: 3, status: "occupied" },
      { occupied: 0, status: "available" },
      { occupied: 0, status: "maintenance" },
    ],
    C: [
      { occupied: 4, status: "occupied" },
      { occupied: 3, status: "occupied" },
      { occupied: 2, status: "occupied" },
      { occupied: 0, status: "available" },
      { occupied: 0, status: "available" },
      { occupied: 0, status: "maintenance" },
    ],
  };
  const fees: Record<"A" | "B" | "C", number> = { A: 550000, B: 450000, C: 380000 };
  (["A", "B", "C"] as const).forEach((b) => {
    config[b].forEach((cfg, i) => {
      const idx = i + 1;
      out.push({
        id: `room-${b}-${idx}`,
        building: b,
        number: `${b}10${idx}`,
        capacity: 6,
        occupied: cfg.occupied,
        status: cfg.status,
        monthlyFee: fees[b],
      });
    });
  });
  return out;
};

const seedStudents: Student[] = [
  // Tòa A – Phòng A101 (Nam)
  {
    id: "s1",
    mssv: "202419019",
    fullName: "Nguyễn Phúc Vinh",
    gender: "Nam",
    roomId: "room-A-1",
    conductScore: 92,
  },
  {
    id: "s2",
    mssv: "202418958",
    fullName: "Trần Bảo Nhật",
    gender: "Nam",
    roomId: "room-A-1",
    conductScore: 88,
  },
  {
    id: "s3",
    mssv: "202418908",
    fullName: "Phan Mạnh Hùng",
    gender: "Nam",
    roomId: "room-A-1",
    conductScore: 96,
  },
  // Tòa A – Phòng A102 (Nam)
  {
    id: "s4",
    mssv: "20210078",
    fullName: "Phạm Quốc Hùng",
    gender: "Nam",
    roomId: "room-A-2",
    conductScore: 76,
  },
  {
    id: "s5",
    mssv: "20230023",
    fullName: "Hoàng Đức Anh",
    gender: "Nam",
    roomId: "room-A-2",
    conductScore: 90,
  },
  {
    id: "s6",
    mssv: "20220056",
    fullName: "Vũ Thanh Tùng",
    gender: "Nam",
    roomId: "room-A-2",
    conductScore: 84,
  },
  // Tòa B – Phòng B101 (Nam)
  {
    id: "s7",
    mssv: "20210034",
    fullName: "Đặng Quang Huy",
    gender: "Nam",
    roomId: "room-B-1",
    conductScore: 62,
  },
  {
    id: "s8",
    mssv: "20230067",
    fullName: "Bùi Văn Kiên",
    gender: "Nam",
    roomId: "room-B-1",
    conductScore: 93,
  },
  // Tòa B – Phòng B102 (Nam)
  {
    id: "s9",
    mssv: "20220089",
    fullName: "Ngô Trọng Nghĩa",
    gender: "Nam",
    roomId: "room-B-2",
    conductScore: 85,
  },
  {
    id: "s10",
    mssv: "20210091",
    fullName: "Đinh Công Thành",
    gender: "Nam",
    roomId: "room-B-2",
    conductScore: 57,
  },
  // Tòa B – Phòng B103 (Nam)
  {
    id: "s11",
    mssv: "20230045",
    fullName: "Đỗ Văn Long",
    gender: "Nam",
    roomId: "room-B-3",
    conductScore: 79,
  },
  {
    id: "s12",
    mssv: "20220034",
    fullName: "Cao Xuân Bách",
    gender: "Nam",
    roomId: "room-B-3",
    conductScore: 87,
  },
  // Tòa A – Phòng A103 (Nữ)
  {
    id: "s13",
    mssv: "20210002",
    fullName: "Trần Thị Bình",
    gender: "Nữ",
    roomId: "room-A-3",
    conductScore: 91,
  },
  {
    id: "s14",
    mssv: "20220013",
    fullName: "Phạm Thị Dung",
    gender: "Nữ",
    roomId: "room-A-3",
    conductScore: 70,
  },
  // Tòa A – Phòng A104 (Nữ)
  {
    id: "s15",
    mssv: "20230011",
    fullName: "Vũ Thị Hà",
    gender: "Nữ",
    roomId: "room-A-4",
    conductScore: 86,
  },
  // Tòa B – Phòng B104 (Nữ)
  {
    id: "s16",
    mssv: "20210067",
    fullName: "Bùi Thu Hương",
    gender: "Nữ",
    roomId: "room-B-4",
    conductScore: 97,
  },
  {
    id: "s17",
    mssv: "20220078",
    fullName: "Đỗ Thị Lan",
    gender: "Nữ",
    roomId: "room-B-4",
    conductScore: 80,
  },
  // Tòa C – Phòng C101 (Nữ)
  {
    id: "s18",
    mssv: "20230056",
    fullName: "Nguyễn Thị Mai",
    gender: "Nữ",
    roomId: "room-C-1",
    conductScore: 88,
  },
  {
    id: "s19",
    mssv: "20210023",
    fullName: "Lê Thị Ngọc",
    gender: "Nữ",
    roomId: "room-C-1",
    conductScore: 95,
  },
  // Tòa C – Phòng C102 (Nữ)
  {
    id: "s20",
    mssv: "20220067",
    fullName: "Hoàng Thị Phương",
    gender: "Nữ",
    roomId: "room-C-2",
    conductScore: 70,
  },
  {
    id: "s21",
    mssv: "20230089",
    fullName: "Trịnh Thu Trang",
    gender: "Nữ",
    roomId: "room-C-2",
    conductScore: 81,
  },
  // Tòa C – Phòng C103 (Nữ)
  {
    id: "s22",
    mssv: "20210099",
    fullName: "Đặng Thị Yến",
    gender: "Nữ",
    roomId: "room-C-3",
    conductScore: 77,
  },
  // Chưa có phòng – chờ phân phòng
  {
    id: "s23",
    mssv: "20240015",
    fullName: "Phan Văn Đạt",
    gender: "Nam",
    roomId: null,
    conductScore: 100,
  },
  {
    id: "s24",
    mssv: "20240023",
    fullName: "Dương Thị Hoa",
    gender: "Nữ",
    roomId: null,
    conductScore: 100,
  },
];

const seedApplications: Application[] = [
  // Chờ duyệt
  {
    id: "ap1",
    studentId: "s23",
    roomId: "room-A-5",
    type: "Đăng ký",
    date: "2026-06-10",
    status: "Chờ duyệt",
  },
  {
    id: "ap2",
    studentId: "s24",
    roomId: "room-B-5",
    type: "Đăng ký",
    date: "2026-06-12",
    status: "Chờ duyệt",
  },
  {
    id: "ap3",
    studentId: "s10",
    roomId: "room-B-1",
    type: "Chuyển phòng",
    date: "2026-06-08",
    status: "Chờ duyệt",
  },
  {
    id: "ap4",
    studentId: "s17",
    roomId: "room-B-4",
    type: "Trả phòng",
    date: "2026-06-11",
    status: "Chờ duyệt",
  },
  {
    id: "ap5",
    studentId: "s22",
    roomId: "room-C-3",
    type: "Gia hạn",
    date: "2026-06-13",
    status: "Chờ duyệt",
  },
  // Đã duyệt
  {
    id: "ap6",
    studentId: "s13",
    roomId: "room-A-3",
    type: "Gia hạn",
    date: "2026-05-28",
    status: "Đã duyệt",
  },
  {
    id: "ap7",
    studentId: "s9",
    roomId: "room-B-2",
    type: "Gia hạn",
    date: "2026-05-25",
    status: "Đã duyệt",
  },
  {
    id: "ap8",
    studentId: "s5",
    roomId: "room-A-2",
    type: "Gia hạn",
    date: "2026-05-20",
    status: "Đã duyệt",
  },
  {
    id: "ap9",
    studentId: "s16",
    roomId: "room-B-4",
    type: "Gia hạn",
    date: "2026-05-15",
    status: "Đã duyệt",
  },
  // Từ chối
  {
    id: "ap10",
    studentId: "s11",
    roomId: "room-A-5",
    type: "Chuyển phòng",
    date: "2026-06-01",
    status: "Từ chối",
  },
  {
    id: "ap11",
    studentId: "s7",
    roomId: "room-B-5",
    type: "Chuyển phòng",
    date: "2026-05-30",
    status: "Từ chối",
  },
];

const seedInvoices: Invoice[] = [
  // ==================== Tháng 5/2026 ====================
  {
    id: "INV-2026-0501",
    studentId: "s1",
    roomId: "room-A-1",
    month: "2026-05",
    electricity: 182000,
    water: 63000,
    roomFee: 550000,
    total: 795000,
    dueDate: "2026-06-15",
    status: "Chưa thanh toán",
  },
  {
    id: "INV-2026-0502",
    studentId: "s4",
    roomId: "room-A-2",
    month: "2026-05",
    electricity: 197000,
    water: 71000,
    roomFee: 550000,
    total: 818000,
    dueDate: "2026-06-15",
    status: "Chưa thanh toán",
  },
  {
    id: "INV-2026-0503",
    studentId: "s7",
    roomId: "room-B-1",
    month: "2026-05",
    electricity: 163000,
    water: 54000,
    roomFee: 450000,
    total: 667000,
    dueDate: "2026-06-15",
    status: "Chưa thanh toán",
  },
  {
    id: "INV-2026-0504",
    studentId: "s9",
    roomId: "room-B-2",
    month: "2026-05",
    electricity: 178000,
    water: 59000,
    roomFee: 450000,
    total: 687000,
    dueDate: "2026-06-15",
    status: "Chưa thanh toán",
  },
  {
    id: "INV-2026-0505",
    studentId: "s13",
    roomId: "room-A-3",
    month: "2026-05",
    electricity: 156000,
    water: 48000,
    roomFee: 550000,
    total: 754000,
    dueDate: "2026-06-15",
    status: "Chưa thanh toán",
  },
  {
    id: "INV-2026-0506",
    studentId: "s16",
    roomId: "room-B-4",
    month: "2026-05",
    electricity: 144000,
    water: 51000,
    roomFee: 450000,
    total: 645000,
    dueDate: "2026-06-15",
    status: "Chưa thanh toán",
  },
  {
    id: "INV-2026-0507",
    studentId: "s18",
    roomId: "room-C-1",
    month: "2026-05",
    electricity: 128000,
    water: 43000,
    roomFee: 380000,
    total: 551000,
    dueDate: "2026-05-31",
    status: "Quá hạn",
  },
  {
    id: "INV-2026-0508",
    studentId: "s20",
    roomId: "room-C-2",
    month: "2026-05",
    electricity: 135000,
    water: 46000,
    roomFee: 380000,
    total: 561000,
    dueDate: "2026-05-31",
    status: "Quá hạn",
  },
  {
    id: "INV-2026-0509",
    studentId: "s10",
    roomId: "room-B-2",
    month: "2026-05",
    electricity: 168000,
    water: 57000,
    roomFee: 450000,
    total: 675000,
    dueDate: "2026-05-31",
    status: "Quá hạn",
  },
  // ==================== Tháng 4/2026 ====================
  {
    id: "INV-2026-0401",
    studentId: "s1",
    roomId: "room-A-1",
    month: "2026-04",
    electricity: 174000,
    water: 61000,
    roomFee: 550000,
    total: 785000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0402",
    studentId: "s4",
    roomId: "room-A-2",
    month: "2026-04",
    electricity: 189000,
    water: 68000,
    roomFee: 550000,
    total: 807000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0403",
    studentId: "s7",
    roomId: "room-B-1",
    month: "2026-04",
    electricity: 158000,
    water: 52000,
    roomFee: 450000,
    total: 660000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0404",
    studentId: "s9",
    roomId: "room-B-2",
    month: "2026-04",
    electricity: 172000,
    water: 55000,
    roomFee: 450000,
    total: 677000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0405",
    studentId: "s13",
    roomId: "room-A-3",
    month: "2026-04",
    electricity: 149000,
    water: 45000,
    roomFee: 550000,
    total: 744000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0406",
    studentId: "s18",
    roomId: "room-C-1",
    month: "2026-04",
    electricity: 122000,
    water: 41000,
    roomFee: 380000,
    total: 543000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0407",
    studentId: "s10",
    roomId: "room-B-2",
    month: "2026-04",
    electricity: 161000,
    water: 53000,
    roomFee: 450000,
    total: 664000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0408",
    studentId: "s16",
    roomId: "room-B-4",
    month: "2026-04",
    electricity: 139000,
    water: 49000,
    roomFee: 450000,
    total: 638000,
    dueDate: "2026-05-15",
    status: "Đã thanh toán",
  },
  // ==================== Tháng 3/2026 ====================
  {
    id: "INV-2026-0301",
    studentId: "s1",
    roomId: "room-A-1",
    month: "2026-03",
    electricity: 168000,
    water: 58000,
    roomFee: 550000,
    total: 776000,
    dueDate: "2026-04-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0302",
    studentId: "s9",
    roomId: "room-B-2",
    month: "2026-03",
    electricity: 165000,
    water: 52000,
    roomFee: 450000,
    total: 667000,
    dueDate: "2026-04-15",
    status: "Đã thanh toán",
  },
  {
    id: "INV-2026-0303",
    studentId: "s13",
    roomId: "room-A-3",
    month: "2026-03",
    electricity: 143000,
    water: 44000,
    roomFee: 550000,
    total: 737000,
    dueDate: "2026-04-15",
    status: "Đã thanh toán",
  },
];

const seedMaintenance: MaintenanceRequest[] = [
  {
    id: "m1",
    roomId: "room-A-1",
    studentId: "s1",
    title: "Quạt trần không hoạt động",
    description:
      "Quạt trần phòng A101 không quay, có mùi khét khi bật công tắc. Đề nghị kiểm tra và thay thế.",
    status: "Chờ tiếp nhận",
    createdAt: "2026-06-13",
    imageUrl: "/Quat_tran_hong.jpg",
  },
  {
    id: "m2",
    roomId: "room-B-2",
    studentId: "s9",
    title: "Vòi nước rò rỉ tại nhà vệ sinh",
    description:
      "Vòi sen phòng B102 rò nước liên tục gây ẩm sàn và lãng phí nước. Đã thử siết lại nhưng không khắc phục được.",
    status: "Đang xử lý",
    createdAt: "2026-06-10",
  },
  {
    id: "m3",
    roomId: "room-C-1",
    studentId: "s18",
    title: "Bóng đèn bàn học bị cháy",
    description: "Bóng đèn LED 20W góc học tập phòng C101 đã cháy, ảnh hưởng đến việc học ban đêm.",
    status: "Hoàn thành",
    createdAt: "2026-06-05",
  },
  {
    id: "m4",
    roomId: "room-B-3",
    studentId: "s11",
    title: "Cửa sổ kẹt không đóng được",
    description:
      "Bản lề cửa sổ phòng B103 bị gỉ sét, không đóng kín khiến mưa hắt vào trong phòng.",
    status: "Chờ tiếp nhận",
    createdAt: "2026-06-14",
  },
  {
    id: "m5",
    roomId: "room-A-2",
    studentId: "s4",
    title: "Ổ cắm điện gần cửa bị lỏng",
    description:
      "Ổ cắm 3 chân cạnh cửa ra vào phòng A102 bị lỏng tiếp điểm, tiềm ẩn nguy cơ chập điện.",
    status: "Đang xử lý",
    createdAt: "2026-06-11",
  },
  {
    id: "m6",
    roomId: "room-B-1",
    studentId: "s7",
    title: "Đường ống thoát nước bồn rửa tắc",
    description: "Bồn rửa mặt phòng B101 thoát nước rất chậm, ứ đọng sau mỗi lần sử dụng.",
    status: "Đang xử lý",
    createdAt: "2026-06-09",
  },
  {
    id: "m7",
    roomId: "room-A-3",
    studentId: "s13",
    title: "Điều hòa không làm lạnh",
    description: "Điều hòa 1.5HP phòng A103 bật không lạnh dù đặt 18°C, quạt chạy bình thường.",
    status: "Chờ tiếp nhận",
    createdAt: "2026-06-12",
  },
  {
    id: "m8",
    roomId: "room-C-2",
    studentId: "s20",
    title: "Khóa cửa phòng khó mở",
    description:
      "Khóa cơ cửa phòng C102 bị kẹt, cần nhiều lực mới mở được, có nguy cơ gãy chìa khóa.",
    status: "Hoàn thành",
    createdAt: "2026-05-30",
  },
  {
    id: "m9",
    roomId: "room-B-4",
    studentId: "s16",
    title: "Bình nước nóng lạnh không ổn định",
    description:
      "Bình nóng lạnh phòng B104 không điều chỉnh được nhiệt độ, khi tắm chỉ ra nước lạnh.",
    status: "Hoàn thành",
    createdAt: "2026-05-25",
  },
  {
    id: "m10",
    roomId: "room-A-1",
    studentId: "s2",
    title: "Bản lề tủ đầu giường bị gãy",
    description: "Bản lề tủ đầu giường số 2 phòng A101 bị gãy, cửa tủ không đóng lại được.",
    status: "Chờ tiếp nhận",
    createdAt: "2026-06-13",
  },
];

const seedViolations: Violation[] = [
  {
    id: "v1",
    studentId: "s10",
    type: "Vi phạm giờ giới nghiêm",
    description: "Về KTX lúc 00:30, trễ hơn quy định 1,5 tiếng, không có đơn xin phép trước",
    points: 5,
    date: "2026-06-12",
  },
  {
    id: "v2",
    studentId: "s7",
    type: "Gây mất trật tự",
    description: "Mở loa Bluetooth nghe nhạc to sau 22h, ảnh hưởng các phòng lân cận",
    points: 10,
    date: "2026-06-08",
  },
  {
    id: "v3",
    studentId: "s10",
    type: "Gây mất trật tự",
    description: "Tụ tập 8 người trong phòng sau 23h, gây ồn ào làm phiền sinh viên tầng trên",
    points: 10,
    date: "2026-06-10",
  },
  {
    id: "v4",
    studentId: "s7",
    type: "Hút thuốc trong KTX",
    description: "Bị phát hiện hút thuốc lá tại hành lang tầng 2 tòa B lúc 21h30",
    points: 15,
    date: "2026-06-11",
  },
  {
    id: "v5",
    studentId: "s14",
    type: "Vi phạm giờ giới nghiêm",
    description: "Ra ngoài KTX sau 22h30 không có đơn xin phép, về lúc 23:20",
    points: 5,
    date: "2026-06-05",
  },
  {
    id: "v6",
    studentId: "s4",
    type: "Gây mất trật tự",
    description: "Cãi vã to tiếng trong phòng giờ học, ảnh hưởng trật tự chung khu A",
    points: 10,
    date: "2026-05-28",
  },
  {
    id: "v7",
    studentId: "s22",
    type: "Vi phạm giờ giới nghiêm",
    description: "Về KTX lúc 23:45 không đăng ký qua đêm theo quy định",
    points: 5,
    date: "2026-06-03",
  },
  {
    id: "v8",
    studentId: "s20",
    type: "Gây mất trật tự",
    description: "Tổ chức tiệc nhỏ trong phòng, mang đồ ăn nhiều gây mùi và ồn ào đến 23h",
    points: 10,
    date: "2026-06-07",
  },
];

const seedNotifications: Notification[] = [
  {
    id: "n1",
    title: "Cắt điện bảo trì hệ thống ngày 18/06",
    body: "KTX tạm ngưng cấp điện từ 7h30 đến 11h00 ngày 18/06/2026 tại tòa A và B để bảo trì hệ thống điện định kỳ. Sinh viên chú ý sắp xếp việc học và sạc pin thiết bị trước giờ cắt điện.",
    audience: "Tất cả",
    date: "2026-06-14",
  },
  {
    id: "n2",
    title: "Nhắc nộp tiền phòng tháng 5/2026",
    body: "Hạn chót thanh toán tiền phòng tháng 5 là ngày 15/06/2026. Sinh viên vui lòng hoàn thành thanh toán qua hệ thống hoặc nộp trực tiếp tại văn phòng kế toán (P.101) để tránh phát sinh phí chậm nộp.",
    audience: "Sinh viên",
    date: "2026-06-12",
  },
  {
    id: "n3",
    title: "Họp giao ban nhân viên tuần 25",
    body: "Họp giao ban tuần 25 diễn ra lúc 8h00 thứ Hai ngày 17/06/2026 tại phòng họp tầng 1. Nội dung: tổng kết tuần 24, triển khai kế hoạch bảo trì phòng mùa hè và phân công lịch trực.",
    audience: "Nhân viên",
    date: "2026-06-13",
  },
  {
    id: "n4",
    title: "Kiểm tra PCCC định kỳ tháng 6",
    body: "Đội kiểm tra PCCC tiến hành kiểm tra thiết bị và hướng dẫn thoát hiểm tại các phòng từ 14h00 ngày 20/06/2026. Sinh viên vui lòng có mặt tại phòng để phối hợp, không khóa cửa trong khung giờ này.",
    audience: "Tất cả",
    date: "2026-06-10",
  },
  {
    id: "n5",
    title: "Mở đăng ký ở KTX học kỳ I năm 2026-2027",
    body: "KTX HUST mở đăng ký ở KTX học kỳ I năm học 2026-2027 từ 20/06 đến 30/06/2026. Ưu tiên sinh viên năm nhất và sinh viên ở tỉnh ngoài. Đăng ký qua cổng thông tin sinh viên tại my.hust.edu.vn.",
    audience: "Sinh viên",
    date: "2026-06-08",
  },
  {
    id: "n6",
    title: "Tổng kết điểm hạnh kiểm học kỳ II/2025-2026",
    body: "Ban quản lý KTX tổng kết điểm hạnh kiểm học kỳ II năm học 2025-2026 vào ngày 30/06/2026. Sinh viên có điểm dưới 80 sẽ nhận thông báo cá nhân và không được ưu tiên đăng ký phòng học kỳ mới.",
    audience: "Sinh viên",
    date: "2026-06-06",
  },
];

const seedMeters: MeterReading[] = seedRooms()
  .filter((r) => r.status === "occupied")
  .map((r, i) => ({
    id: `mr-${r.id}`,
    roomId: r.id,
    month: "2026-05",
    prevElec: 1200 + i * 30,
    newElec: 1320 + i * 35,
    prevWater: 80 + i * 5,
    newWater: 95 + i * 6,
  }));

const seedDeposits: Deposit[] = seedStudents
  .filter((s) => s.roomId)
  .map((s) => ({
    id: `dp-${s.id}`,
    studentId: s.id,
    amount: 1000000,
    status: "Đã thu" as const,
    date: "2026-01-15",
  }));

// ---------- Store ----------
interface Store {
  user: { studentId: string; role: Role } | null;
  role: Role;
  rooms: Room[];
  students: Student[];
  applications: Application[];
  invoices: Invoice[];
  maintenance: MaintenanceRequest[];
  violations: Violation[];
  notifications: Notification[];
  meters: MeterReading[];
  deposits: Deposit[];
}

interface StoreContextValue extends Store {
  setRole: (role: Role) => void;
  login: (role: Role) => void;
  logout: () => void;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string) => void;
  payInvoice: (id: string) => void;
  setMaintStatus: (id: string, status: MaintStatus) => void;
  addMaintenance: (req: Omit<MaintenanceRequest, "id" | "createdAt" | "status">) => void;
  addViolation: (v: Omit<Violation, "id" | "date" | "points"> & { points?: number }) => void;
  addNotification: (n: Omit<Notification, "id" | "date">) => void;
  updateMeter: (id: string, patch: Partial<MeterReading>) => void;
  generateInvoicesFromMeters: () => void;
  refundDeposit: (id: string) => void;
}

const Ctx = createContext<StoreContextValue | null>(null);

export const violationTypes = VIOLATION_TYPES;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Store>(() => ({
    user: null,
    role: "admin",
    rooms: seedRooms(),
    students: seedStudents,
    applications: seedApplications,
    invoices: seedInvoices,
    maintenance: seedMaintenance,
    violations: seedViolations,
    notifications: seedNotifications,
    meters: seedMeters,
    deposits: seedDeposits,
  }));

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("ktx-auth") : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setState((s) => ({ ...s, user: parsed, role: parsed.role }));
      } catch {}
    }
  }, []);

  const persist = (user: Store["user"]) => {
    if (typeof window !== "undefined") {
      if (user) localStorage.setItem("ktx-auth", JSON.stringify(user));
      else localStorage.removeItem("ktx-auth");
    }
  };

  const value: StoreContextValue = {
    ...state,
    setRole: (role) =>
      setState((s) => {
        const user = s.user
          ? { ...s.user, role }
          : { studentId: role === "student" ? "s1" : "", role };
        persist(user);
        return { ...s, role, user };
      }),
    login: (role) =>
      setState((s) => {
        const user = { studentId: role === "student" ? "s1" : "", role };
        persist(user);
        return { ...s, role, user };
      }),
    logout: () =>
      setState((s) => {
        persist(null);
        return { ...s, user: null };
      }),
    approveApplication: (id) =>
      setState((s) => ({
        ...s,
        applications: s.applications.map((a) => (a.id === id ? { ...a, status: "Đã duyệt" } : a)),
      })),
    rejectApplication: (id) =>
      setState((s) => ({
        ...s,
        applications: s.applications.map((a) => (a.id === id ? { ...a, status: "Từ chối" } : a)),
      })),
    payInvoice: (id) =>
      setState((s) => ({
        ...s,
        invoices: s.invoices.map((i) => (i.id === id ? { ...i, status: "Đã thanh toán" } : i)),
      })),
    setMaintStatus: (id, status) =>
      setState((s) => ({
        ...s,
        maintenance: s.maintenance.map((m) => (m.id === id ? { ...m, status } : m)),
      })),
    addMaintenance: (req) =>
      setState((s) => ({
        ...s,
        maintenance: [
          {
            ...req,
            id: `m${Date.now()}`,
            status: "Chờ tiếp nhận",
            createdAt: new Date().toISOString().slice(0, 10),
          },
          ...s.maintenance,
        ],
      })),
    addViolation: (v) =>
      setState((s) => {
        const points = v.points ?? VIOLATION_TYPES[v.type] ?? 5;
        return {
          ...s,
          violations: [
            { ...v, points, id: `v${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
            ...s.violations,
          ],
          students: s.students.map((st) =>
            st.id === v.studentId
              ? { ...st, conductScore: Math.max(0, st.conductScore - points) }
              : st,
          ),
        };
      }),
    addNotification: (n) =>
      setState((s) => ({
        ...s,
        notifications: [
          { ...n, id: `n${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
          ...s.notifications,
        ],
      })),
    updateMeter: (id, patch) =>
      setState((s) => ({
        ...s,
        meters: s.meters.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      })),
    generateInvoicesFromMeters: () =>
      setState((s) => {
        const ELEC = 3000,
          WATER = 15000;
        const newInvoices: Invoice[] = [];
        s.meters.forEach((m, idx) => {
          const room = s.rooms.find((r) => r.id === m.roomId);
          const student = s.students.find((st) => st.roomId === m.roomId);
          if (!room || !student) return;
          const elec = Math.max(0, m.newElec - m.prevElec) * ELEC;
          const water = Math.max(0, m.newWater - m.prevWater) * WATER;
          newInvoices.push({
            id: `INV-${Date.now().toString().slice(-4)}${idx}`,
            studentId: student.id,
            roomId: room.id,
            month: m.month,
            electricity: elec,
            water,
            roomFee: room.monthlyFee,
            total: elec + water + room.monthlyFee,
            dueDate: "2026-07-15",
            status: "Chưa thanh toán",
          });
        });
        return { ...s, invoices: [...newInvoices, ...s.invoices] };
      }),
    refundDeposit: (id) =>
      setState((s) => ({
        ...s,
        deposits: s.deposits.map((d) => (d.id === id ? { ...d, status: "Đã hoàn" } : d)),
      })),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}

export function useCurrentStudent() {
  const { user, students } = useStore();
  if (!user || user.role !== "student") return null;
  return students.find((s) => s.id === user.studentId) ?? students[0];
}
