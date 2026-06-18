//#region node_modules/.nitro/vite/services/ssr/assets/format-Dw96GPDJ.js
var formatVND = (n) => new Intl.NumberFormat("vi-VN", {
	style: "currency",
	currency: "VND",
	maximumFractionDigits: 0
}).format(n);
var formatDate = (d) => {
	const date = typeof d === "string" ? new Date(d) : d;
	return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
};
//#endregion
export { formatVND as n, formatDate as t };
