import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, k as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DAB5b4Wl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-[#C41230] text-white hover:bg-[#A01025]",
			destructive: "bg-[#dc2626] text-white hover:bg-[#b91c1c]",
			outline: "border border-[#e6e6e6] bg-white text-[#1a1a1a] hover:bg-[#FEF2F2] hover:text-[#C41230] hover:border-[#C41230]",
			secondary: "bg-[#F6F5F4] text-[#1a1a1a] hover:bg-[#e6e6e6]",
			ghost: "hover:bg-[#FEF2F2] hover:text-[#C41230]",
			link: "text-[#C41230] underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-5 py-2.5",
			sm: "h-8 px-4 text-sm",
			lg: "h-11 px-7",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { buttonVariants as n, Button as t };
