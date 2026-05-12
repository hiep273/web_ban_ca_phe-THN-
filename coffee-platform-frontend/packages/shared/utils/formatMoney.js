export function formatMoney(value, currency = "VND") {
  return new Intl.NumberFormat("vi-VN", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(Number(value) || 0);
}
