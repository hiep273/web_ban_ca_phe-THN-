import AdminTable from "./AdminTable.jsx";
import { formatMoney } from "../utils/adminMetrics.js";

export default function OrdersPage({ orders }) {
  const columns = [
    { key: "id", label: "Đơn hàng" },
    { key: "customer", label: "Khách hàng" },
    { key: "channel", label: "Kênh bán" },
    { key: "items", label: "Số lượng" },
    { key: "total", label: "Tổng tiền", render: (order) => formatMoney(order.total) },
    { key: "payment", label: "Thanh toán", render: (order) => <span className="admin-tag">{order.payment}</span> },
    { key: "fulfillment", label: "Xử lý", render: (order) => <span className="status">{order.fulfillment}</span> },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  return (
    <section className="admin-panel inventory-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Hàng chờ đơn hàng</h2>
          <p>Theo dõi khách hàng, kênh bán, thanh toán và trạng thái xử lý đơn.</p>
        </div>
      </div>
      <AdminTable columns={columns} rows={orders} getRowKey={(order) => order.id} />
    </section>
  );
}
