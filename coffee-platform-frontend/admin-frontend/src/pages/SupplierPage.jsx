import AdminTable from "../components/AdminTable.jsx";

export default function SupplierPage({ suppliers }) {
  const columns = [
    { key: "name", label: "Nhà cung cấp" },
    { key: "region", label: "Khu vực" },
    { key: "contact", label: "Liên hệ" },
    { key: "activeLots", label: "Lô đang hoạt động" },
    { key: "nextShipment", label: "Lần nhập gần nhất" },
    { key: "rating", label: "Xếp hạng", render: (supplier) => <span className="admin-tag">{supplier.rating}</span> },
    { key: "status", label: "Trạng thái", render: (supplier) => <span className={supplier.status === "Chậm" ? "status low" : "status"}>{supplier.status}</span> },
  ];

  return (
    <section className="admin-panel inventory-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Danh bạ nhà cung cấp</h2>
          <p>Quản lý đối tác, thông tin liên hệ, lịch nhập hàng và tình trạng nguồn cung.</p>
        </div>
      </div>
      <AdminTable columns={columns} rows={suppliers} getRowKey={(supplier) => supplier.id} />
    </section>
  );
}
