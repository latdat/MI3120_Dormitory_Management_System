import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { n as buttonVariants, t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { t as Input } from "./_ssr/input-CDO3dKxI.mjs";
import { h as LogOut } from "./_libs/lucide-react.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, t as Sheet } from "./_ssr/sheet-B9-Owt3j.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./_ssr/dialog-CwLzEEob.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { i as Trigger, n as List, r as Root2$1, t as Content } from "./_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.rooms-YYruJAH8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var STATUS_LABEL = {
	available: "Còn trống",
	occupied: "Đang ở",
	maintenance: "Bảo trì"
};
var STATUS_BADGE = {
	available: "bg-emerald-100 text-emerald-700 border-transparent",
	occupied: "bg-indigo-100 text-indigo-700 border-transparent",
	maintenance: "bg-amber-100 text-amber-800 border-transparent"
};
function getRoomCardStyle(r) {
	if (r.status === "maintenance") return "bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-800";
	if (r.occupied === 0) return "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-800";
	if (r.occupied >= r.capacity) return "bg-indigo-200 border-indigo-400 hover:bg-indigo-300 text-indigo-900";
	return "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800";
}
var A101 = [
	{
		fullName: "Nguyễn Phúc Vinh",
		mssv: "202419019",
		classCode: "CNTT-01",
		phone: "0912345678",
		paid: true
	},
	{
		fullName: "Trần Bảo Nhật",
		mssv: "202418958",
		classCode: "ĐTVT-01",
		phone: "0934567890",
		paid: true
	},
	{
		fullName: "Phan Mạnh Hùng",
		mssv: "202418908",
		classCode: "CNTT-03",
		phone: "0945678901",
		paid: true
	}
];
var POOL_NAMES = [
	"Nguyễn Hoàng Long",
	"Đặng Thị Mai",
	"Bùi Quang Huy",
	"Hoàng Tuấn Anh",
	"Đỗ Thị Phương",
	"Ngô Văn Sơn",
	"Trần Khánh Linh",
	"Phan Văn Đạt",
	"Lý Thị Hằng",
	"Vũ Đình Nam",
	"Lê Bảo Châu",
	"Mai Thị Hồng",
	"Tô Anh Quân",
	"Đinh Thị Yến",
	"Hồ Văn Thắng",
	"Nguyễn Diệu Linh",
	"Trịnh Quốc Bảo",
	"Trần Văn Hùng",
	"Phạm Thị Nga",
	"Lê Minh Tú"
];
var POOL_CLASS = [
	"CNTT-01",
	"CNTT-02",
	"CNTT-03",
	"ĐTVT-01",
	"ĐTVT-02",
	"CK-01",
	"CK-02",
	"KTĐL-01"
];
function hashStr(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
	return Math.abs(h);
}
function sampleForRoom(r) {
	if (r.number === "A101") return A101;
	const base = hashStr(r.id);
	const out = [];
	for (let i = 0; i < r.occupied; i++) {
		const k = base + i * 17 >>> 0;
		const name = POOL_NAMES[k % POOL_NAMES.length];
		const cls = POOL_CLASS[(k >> 3) % POOL_CLASS.length];
		const phone = "09" + String(1e7 + k * 7 % 9e7);
		const num = k % 900 + 100;
		out.push({
			fullName: name,
			mssv: `SV${String(num).padStart(3, "0")}`,
			classCode: cls,
			phone,
			paid: (k >> 5) % 3 !== 0
		});
	}
	return out;
}
function initials(name) {
	const parts = name.trim().split(/\s+/);
	const last = parts[parts.length - 1] ?? "";
	return ((parts[parts.length - 2] ?? "")[0] ?? "") + (last[0] ?? "");
}
function avatarColor(seed) {
	const colors = [
		"bg-rose-500",
		"bg-orange-500",
		"bg-amber-500",
		"bg-emerald-500",
		"bg-teal-500",
		"bg-sky-500",
		"bg-indigo-500",
		"bg-fuchsia-500"
	];
	return colors[hashStr(seed) % colors.length];
}
function RoomsPage() {
	const { rooms } = useStore();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [removeTarget, setRemoveTarget] = (0, import_react.useState)(null);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [mssvInput, setMssvInput] = (0, import_react.useState)("");
	const buildings = [
		"A",
		"B",
		"C"
	];
	const sample = selected ? sampleForRoom(selected) : [];
	const isFull = selected ? selected.occupied >= selected.capacity : false;
	const confirmRemove = () => {
		if (removeTarget) toast.success(`Đã chuyển ${removeTarget.fullName} ra khỏi phòng`);
		setRemoveTarget(null);
	};
	const confirmAdd = () => {
		toast.success(`Đã thêm sinh viên ${mssvInput} vào phòng ${selected?.number}`);
		setAddOpen(false);
		setMssvInput("");
	};
	const showAutofill = mssvInput.trim().length >= 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Quản lý phòng ở",
			description: "Bản đồ trạng thái phòng theo từng tòa nhà."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-4 text-xs text-muted-foreground mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded bg-emerald-300" }), " Còn trống"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded bg-indigo-300" }), " Đang ở"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded bg-amber-300" }), " Bảo trì"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "A",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, { children: buildings.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
				value: b,
				children: ["Tòa ", b]
			}, b)) }), buildings.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: b,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4",
					children: rooms.filter((r) => r.building === b).map((r) => {
						const pct = r.capacity ? Math.round(r.occupied / r.capacity * 100) : 0;
						const full = r.status !== "maintenance" && r.occupied >= r.capacity;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelected(r),
							className: `relative rounded-xl border-2 p-4 text-left transition shadow-sm hover:shadow-md ${getRoomCardStyle(r)}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2 left-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold shadow-sm",
									children: r.number
								}),
								full && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2 right-2 rounded-full bg-[#C41230] text-white px-2 py-0.5 text-[10px] font-semibold shadow-sm",
									children: "Hết chỗ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-lg font-semibold",
											children: [
												r.occupied,
												"/",
												r.capacity
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] opacity-80",
											children: "người ở"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 h-1.5 w-full rounded-full bg-gray-200/80 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-[#C41230] transition-all",
												style: { width: `${pct}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] mt-1 font-medium",
											children: STATUS_LABEL[r.status]
										})
									]
								})
							]
						}, r.id);
					})
				})
			}, b))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: !!selected,
			onOpenChange: (o) => !o && setSelected(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
				side: "right",
				className: "w-full sm:max-w-[420px] p-0 bg-white flex flex-col",
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
						className: "px-5 py-4 border-b",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
								className: "text-lg",
								children: ["Phòng ", selected.number]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: STATUS_BADGE[selected.status],
								children: STATUS_LABEL[selected.status]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: [
								"Tòa ",
								selected.building,
								" • ",
								selected.occupied,
								"/",
								selected.capacity,
								" người"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold mb-3",
							children: "Danh sách sinh viên trong phòng"
						}), sample.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Chưa có sinh viên trong phòng."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: sample.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 rounded-lg border p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-10 w-10 rounded-full ${avatarColor(s.mssv)} text-white flex items-center justify-center text-sm font-semibold shrink-0`,
										children: initials(s.fullName)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium truncate",
												children: s.fullName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted-foreground",
												children: [
													s.mssv,
													" • ",
													s.classCode
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted-foreground",
												children: ["📞 ", s.phone]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: s.paid ? "bg-emerald-100 text-emerald-700 border-transparent" : "bg-red-100 text-red-700 border-transparent",
										children: s.paid ? "Đã đóng" : "Chưa đóng"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setRemoveTarget(s),
										className: "ml-1 inline-flex items-center gap-1 text-[13px] text-[#b45309] hover:underline shrink-0",
										title: "Chuyển sinh viên ra khỏi phòng",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Chuyển ra"]
									})
								]
							}, s.mssv))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t px-5 py-4 bg-white",
						children: isFull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: true,
							className: "w-full h-11 rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-200",
							children: "Phòng đã đầy"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setAddOpen(true),
							className: "w-full h-11 rounded-lg bg-[#C41230] text-white hover:bg-[#A01025]",
							children: "+ Thêm sinh viên vào phòng"
						})
					})
				] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!removeTarget,
			onOpenChange: (o) => !o && setRemoveTarget(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Xác nhận chuyển ra" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
				"Xác nhận chuyển ",
				removeTarget?.fullName,
				" ra khỏi phòng?"
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Hủy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: confirmRemove,
				className: "bg-[#C41230] text-white hover:bg-[#A01025]",
				children: "Xác nhận"
			})] })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: addOpen,
			onOpenChange: (o) => {
				setAddOpen(o);
				if (!o) setMssvInput("");
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[400px] z-[60]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Thêm sinh viên vào phòng ", selected?.number] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mã số sinh viên (MSSV)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Nhập MSSV...",
								value: mssvInput,
								onChange: (e) => setMssvInput(e.target.value)
							})]
						}), showAutofill && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border bg-muted/30 p-3 space-y-1 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Họ tên:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Nguyễn Thị Mai"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Lớp:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "CNTT-04"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Ngày sinh:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "15/03/2004"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							setAddOpen(false);
							setMssvInput("");
						},
						children: "Hủy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: confirmAdd,
						disabled: !showAutofill,
						className: "bg-[#C41230] text-white hover:bg-[#A01025]",
						children: "Xác nhận thêm"
					})] })
				]
			})
		})
	] });
}
//#endregion
export { RoomsPage as component };
