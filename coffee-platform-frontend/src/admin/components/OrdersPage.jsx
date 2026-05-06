import AdminTable from "./AdminTable.jsx";
import { formatMoney } from "../utils/adminMetrics.js";

export default function OrdersPage({ orders }) {
  const columns = [
    { key: "id", label: "Order" },
    { key: "customer", label: "Customer" },
    { key: "channel", label: "Channel" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total", render: (order) => formatMoney(order.total) },
    { key: "payment", label: "Payment", render: (order) => <span className="admin-tag">{order.payment}</span> },
    { key: "fulfillment", label: "Fulfillment", render: (order) => <span className="status">{order.fulfillment}</span> },
    { key: "createdAt", label: "Created" },
  ];

  return (
    <section className="admin-panel inventory-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Order Queue</h2>
          <p>Track customer, wholesale, and subscription orders from payment to fulfillment.</p>
        </div>
      </div>
      <AdminTable columns={columns} rows={orders} getRowKey={(order) => order.id} />
    </section>
  );
}
