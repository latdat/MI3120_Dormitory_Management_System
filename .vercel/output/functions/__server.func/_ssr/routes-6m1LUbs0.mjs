import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useStore, t as ROLE_LABELS } from "./store-CXReg1r8.mjs";
import { t as Button } from "./button-DAB5b4Wl.mjs";
import { t as Input } from "./input-CDO3dKxI.mjs";
import { j as Building2 } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-6Vmo0KkZ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-6m1LUbs0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { user, login } = useStore();
	const nav = useNavigate();
	const [role, setRole] = (0, import_react.useState)("admin");
	const [username, setUsername] = (0, import_react.useState)("admin");
	const [password, setPassword] = (0, import_react.useState)("123456");
	const [firstTime, setFirstTime] = (0, import_react.useState)(false);
	const [forgot, setForgot] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user) nav({ to: "/dashboard" });
	}, [user, nav]);
	const handleLogin = (e) => {
		e.preventDefault();
		if (password === "123456") {
			setFirstTime(true);
			return;
		}
		login(role);
		toast.success("Đăng nhập thành công");
		nav({ to: "/dashboard" });
	};
	const completeFirstTime = () => {
		setFirstTime(false);
		login(role);
		toast.success("Đổi mật khẩu thành công");
		nav({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full",
		style: {
			backgroundImage: `url('/Thu_vien_TQB.png')`,
			backgroundSize: "cover",
			backgroundPosition: "center center",
			backgroundAttachment: "fixed"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "rgba(0,0,0,0.25)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 flex min-h-screen items-center justify-center px-4 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-md shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-7 w-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-2xl",
								children: "KTX Đại học"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Hệ thống quản lý ký túc xá" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogin,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "role",
									children: "Vai trò"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: role,
									onValueChange: (v) => setRole(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "role",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(ROLE_LABELS).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: r,
										children: ROLE_LABELS[r]
									}, r)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "username",
									children: "Tên đăng nhập"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "username",
									value: username,
									onChange: (e) => setUsername(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Mật khẩu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setForgot(true),
										className: "text-xs text-primary hover:underline",
										children: "Quên mật khẩu?"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								children: "Đăng nhập"
							})
						]
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: firstTime,
				onOpenChange: setFirstTime,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Đổi mật khẩu lần đầu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Vui lòng tạo mật khẩu mới để bảo mật tài khoản." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mật khẩu mới" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								defaultValue: ""
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Xác nhận mật khẩu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								defaultValue: ""
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: completeFirstTime,
						children: "Lưu và tiếp tục"
					}) })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: forgot,
				onOpenChange: setForgot,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Quên mật khẩu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Nhập email để nhận hướng dẫn đặt lại mật khẩu." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "email@university.edu.vn" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							setForgot(false);
							toast.success("Đã gửi email khôi phục (demo)");
						},
						children: "Gửi"
					}) })
				] })
			})
		]
	});
}
//#endregion
export { LoginPage as component };
