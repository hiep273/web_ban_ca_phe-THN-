import { MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import AdminTable from "./AdminTable.jsx";

function getStatusClass(item) {
  if (item.status === "Low Stock") return "status low";
  if (item.status === "Out of Stock") return "status muted";
  return "status";
}

export default function InventoryTable({ items }) {
  const origins = [...new Set(items.map((item) => item.origin.split(",").pop().trim()))];
  const processes = [...new Set(items.map((item) => item.process))];
  const roastLevels = [...new Set(items.map((item) => item.roastLevel))];
  const columns = [
    {
      key: "name",
      label: "Bean name / origin",
      render: (item) => (
        <div className="bean-cell">
          <img src={item.image} alt={item.name} />
          <div>
            <strong>{item.name}</strong>
            <span>{item.origin}</span>
          </div>
        </div>
      ),
    },
    { key: "type", label: "Type", render: (item) => <span className="admin-tag">{item.type}</span> },
    { key: "stock", label: "Current stock", render: (item) => `${item.stockQty} ${item.stockUnit}` },
    { key: "reorderPoint", label: "Reorder point", render: (item) => `${item.reorderPoint} ${item.stockUnit}` },
    { key: "freshness", label: "Freshness window", render: (item) => <span className={item.status === "Low Stock" ? "danger-text" : ""}>{item.freshness}</span> },
    { key: "process", label: "Process" },
    { key: "roastLevel", label: "Roast" },
    { key: "supplierName", label: "Supplier" },
    { key: "status", label: "Status", render: (item) => <span className={getStatusClass(item)}>{item.status}</span> },
    {
      key: "action",
      label: "Action",
      render: (item) => (
        <button className="icon-only" aria-label={`Open actions for ${item.name}`} type="button">
          <MoreHorizontal size={20} />
        </button>
      ),
    },
  ];

  return (
    <section className="admin-panel inventory-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Inventory Master List</h2>
          <div className="inventory-filters">
            <label className="admin-search compact">
              <Search size={16} />
              <input placeholder="Search within list..." type="search" />
            </label>
            <select defaultValue="all-origin">
              <option value="all-origin">Origin: All</option>
              {origins.map((origin) => (
                <option key={origin}>{origin}</option>
              ))}
            </select>
            <select defaultValue="all-process">
              <option value="all-process">Processing: All</option>
              {processes.map((process) => (
                <option key={process}>{process}</option>
              ))}
            </select>
            <select defaultValue="all-roast">
              <option value="all-roast">Roast: All</option>
              {roastLevels.map((roast) => (
                <option key={roast}>{roast}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="admin-button ghost" type="button">
          <SlidersHorizontal size={16} />
          Advanced sort
        </button>
      </div>

      <AdminTable columns={columns} rows={items} getRowKey={(item) => item.id} />

      <footer className="inventory-footer">
        <span>Showing 1-{items.length} of {items.length} coffee variants</span>
        <div>
          <button type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
        </div>
      </footer>
    </section>
  );
}
