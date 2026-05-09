import api from "./axios";
import { resolveImageUrl } from "./products";

const valueLabels = {
  Green: "Nhân xanh",
  Roasted: "Đã rang",
  "In Stock": "Còn hàng",
  "Low Stock": "Sắp hết",
  "Out of Stock": "Hết hàng",
  Active: "Đang hoạt động",
  Pending: "Đang chờ",
  Scheduled: "Đã lên lịch",
  Arriving: "Đang về kho",
  Delayed: "Chậm",
  Website: "Website",
  Subscription: "Đăng ký định kỳ",
  Shipped: "Đã giao",
  Packing: "Đang đóng gói",
  Paid: "Đã thanh toán",
  "Revenue this week": "Doanh thu tuần này",
  Orders: "Đơn hàng",
  "Low stock lots": "Mặt hàng sắp hết",
  "Supplier delays": "Nhà cung cấp chậm",
  "Needs action": "Cần xử lý",
  DB: "Từ CSDL",
};

function translateValue(value) {
  return valueLabels[value] ?? value;
}

function mapInventoryItem(item) {
  return {
    ...item,
    type: translateValue(item.type),
    stockUnit: item.stockUnit === "bags" ? "gói" : item.stockUnit,
    status: translateValue(item.status),
    image: resolveImageUrl(item.image),
  };
}

function mapOrder(order) {
  return {
    ...order,
    channel: translateValue(order.channel),
    payment: translateValue(order.payment),
    fulfillment: translateValue(order.fulfillment),
  };
}

function mapSupplier(supplier) {
  return {
    ...supplier,
    status: translateValue(supplier.status),
  };
}

function mapShipment(shipment) {
  return {
    ...shipment,
    status: translateValue(shipment.status),
  };
}

function mapMetric(metric) {
  return {
    ...metric,
    label: translateValue(metric.label),
    trend: translateValue(metric.trend),
  };
}

export async function getAdminOverview() {
  const response = await api.get("/admin/overview");
  const data = response.data;

  return {
    inventoryItems: (data.inventoryItems ?? []).map(mapInventoryItem),
    orders: (data.orders ?? []).map(mapOrder),
    suppliers: (data.suppliers ?? []).map(mapSupplier),
    shipments: (data.shipments ?? []).map(mapShipment),
    reportMetrics: (data.reportMetrics ?? []).map(mapMetric),
  };
}
