import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { t as Input } from "./_ssr/input-CDO3dKxI.mjs";
import { u as Paperclip } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as Badge } from "./_ssr/badge-85_lvIDb.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-CYB-gyWu.mjs";
import { t as formatDate } from "./_ssr/format-Dw96GPDJ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./_ssr/card-6Vmo0KkZ.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.notifications-BthSNMfs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotifsPage() {
	const { role, notifications, addNotification } = useStore();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [audience, setAudience] = (0, import_react.useState)("Tất cả");
	const submit = (e) => {
		e.preventDefault();
		addNotification({
			title,
			body,
			audience
		});
		toast.success("Đã gửi thông báo");
		setTitle("");
		setBody("");
	};
	const canCompose = role === "admin";
	const list = role === "student" ? notifications.filter((n) => n.audience !== "Nhân viên") : notifications;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Thông báo",
		description: canCompose ? "Soạn và gửi thông báo cho cư dân." : "Các thông báo từ ban quản lý."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `grid grid-cols-1 ${canCompose ? "lg:grid-cols-3" : ""} gap-4`,
		children: [canCompose && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "lg:col-span-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Soạn thông báo"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tiêu đề" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nội dung" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: body,
							onChange: (e) => setBody(e.target.value),
							rows: 5,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Đính kèm tệp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30 hover:bg-muted/50 hover:border-muted-foreground/50 transition-colors cursor-pointer px-4 py-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-5 w-5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Kéo thả file hoặc nhấn để chọn (PDF, JPG, PNG)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: ".pdf,.jpg,.jpeg,.png",
									className: "hidden"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Đối tượng" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: audience,
							onValueChange: (v) => setAudience(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Tất cả",
									children: "Tất cả"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Sinh viên",
									children: "Sinh viên"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Nhân viên",
									children: "Nhân viên"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: "Gửi thông báo"
					})
				]
			}) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: canCompose ? "lg:col-span-2" : "",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: canCompose ? "Đã gửi" : "Hộp thư của bạn"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: list.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border rounded-lg p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: n.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: n.audience
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: formatDate(n.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm mt-2",
							children: n.body
						})
					]
				}, n.id))
			})]
		})]
	})] });
}
//#endregion
export { NotifsPage as component };
