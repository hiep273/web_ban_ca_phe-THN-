export function formatMoney(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function buildStats({ inventoryItems, shipments, orders }) {
  const greenStock = inventoryItems
    .filter((item) => item.type === "Nhân xanh")
    .reduce((sum, item) => sum + item.stockQty, 0);
  const roastedStock = inventoryItems
    .filter((item) => item.type === "Đã rang")
    .reduce((sum, item) => sum + item.stockQty, 0);
  const lowStock = inventoryItems.filter((item) => item.stockQty <= item.reorderPoint).length;
  const pendingOrders = orders.filter((order) => order.fulfillment !== "Đã giao").length;

  return [
    { id: "green", label: "Tồn kho nhân xanh", value: `${formatNumber(greenStock)} kg`, meta: "Theo CSDL" },
    { id: "roasted", label: "Tồn kho đã rang", value: `${formatNumber(roastedStock)} gói`, meta: "Đang hoạt động" },
    { id: "alerts", label: "Cảnh báo sắp hết", value: `${formatNumber(lowStock)} mặt hàng`, meta: "Cần xử lý", danger: true },
    { id: "shipments", label: "Lịch nhập hàng", value: `${formatNumber(shipments.length)} phiếu`, meta: `${pendingOrders} đơn đang mở` },
  ];
}
