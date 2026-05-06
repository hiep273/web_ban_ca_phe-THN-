import AdminTable from "./AdminTable.jsx";

export default function SuppliersPage({ suppliers }) {
  const columns = [
    { key: "name", label: "Supplier" },
    { key: "region", label: "Region" },
    { key: "contact", label: "Contact" },
    { key: "activeLots", label: "Active lots" },
    { key: "nextShipment", label: "Next shipment" },
    { key: "rating", label: "Rating", render: (supplier) => <span className="admin-tag">{supplier.rating}</span> },
    { key: "status", label: "Status", render: (supplier) => <span className={supplier.status === "Delayed" ? "status low" : "status"}>{supplier.status}</span> },
  ];

  return (
    <section className="admin-panel inventory-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Supplier Directory</h2>
          <p>Manage farm partners, sourcing contacts, shipment timing, and supplier health.</p>
        </div>
      </div>
      <AdminTable columns={columns} rows={suppliers} getRowKey={(supplier) => supplier.id} />
    </section>
  );
}
