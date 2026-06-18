import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore, r as useCurrentStudent } from "./_ssr/store-CXReg1r8.mjs";
import { t as Button } from "./_ssr/button-DAB5b4Wl.mjs";
import { t as Input } from "./_ssr/input-CDO3dKxI.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as PageHeader } from "./_ssr/PageHeader-_zSs9O0V.mjs";
import { t as RoleGuard } from "./_ssr/RoleGuard-DOVUZXOp.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./_ssr/card-6Vmo0KkZ.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { t as Route } from "./_app.maintenance-new-BJ3-IgDJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.maintenance-new-CL1Ug239.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewRequestPage() {
	const student = useCurrentStudent();
	const { addMaintenance } = useStore();
	const nav = useNavigate();
	const { title: initialTitle } = Route.useSearch();
	const [title, setTitle] = (0, import_react.useState)(initialTitle ?? "");
	const [description, setDescription] = (0, import_react.useState)("");
	const submit = (e) => {
		e.preventDefault();
		if (!student?.roomId) {
			toast.error("Bạn chưa có phòng");
			return;
		}
		addMaintenance({
			studentId: student.id,
			roomId: student.roomId,
			title,
			description
		});
		toast.success("Đã gửi yêu cầu bảo trì");
		nav({ to: "/maintenance" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleGuard, {
		allow: ["student"],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Gửi yêu cầu bảo trì",
			description: "Mô tả vấn đề để bộ phận kỹ thuật hỗ trợ."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tiêu đề" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "VD: Quạt trần hỏng",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mô tả chi tiết" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: description,
								onChange: (e) => setDescription(e.target.value),
								rows: 5,
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ảnh đính kèm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "maint-photo",
								className: "flex flex-col items-center justify-center text-center gap-1 h-[120px] rounded-lg border-2 border-dashed border-gray-300 bg-[#f9fafb] hover:border-[#C41230] hover:bg-[#fef2f2] transition-colors cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										"aria-hidden": true,
										children: "📷"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-gray-600",
										children: "Kéo thả ảnh vào đây hoặc nhấn để chọn"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "PNG, JPG (tối đa 5MB)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "maint-photo",
										type: "file",
										accept: "image/png,image/jpeg",
										className: "hidden"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Gửi yêu cầu"
						})
					]
				})
			})
		})]
	});
}
//#endregion
export { NewRequestPage as component };
