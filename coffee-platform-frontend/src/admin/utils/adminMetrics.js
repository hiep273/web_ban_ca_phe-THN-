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
    .filter((item) => item.type === "Green")
    .reduce((sum, item) => sum + item.stockQty, 0);
  const roastedStock = inventoryItems
    .filter((item) => item.type === "Roasted")
    .reduce((sum, item) => sum + item.stockQty, 0);
  const lowStock = inventoryItems.filter((item) => item.stockQty <= item.reorderPoint).length;
  const pendingOrders = orders.filter((order) => order.fulfillment !== "Shipped").length;

  return [
    { id: "green", label: "Total Green Bean Stock", value: `${formatNumber(greenStock)} kg`, meta: "+4.2%" },
    { id: "roasted", label: "Roasted Inventory", value: `${formatNumber(roastedStock)} bags`, meta: "Active" },
    { id: "alerts", label: "Low Stock Alerts", value: `${formatNumber(lowStock)} lots`, meta: "Critical", danger: true },
    { id: "shipments", label: "Upcoming Shipments", value: `${formatNumber(shipments.length)} expected`, meta: `${pendingOrders} orders open` },
  ];
}
