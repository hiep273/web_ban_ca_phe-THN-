import { MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import AdminTable from "../components/AdminTable.jsx";

function getStatusClass(item) {
  if (item.status === "Sắp hết") return "status low";
  if (item.status === "Hết hàng") return "status muted";
  return "status";
}

export default function InventoryPage({ items }) {
  const origins = [...new Set(items.map((item) => item.origin.split(",").pop().trim()))];
  const processes = [...new Set(items.map((item) => item.process))];
  const roastLevels = [...new Set(items.map((item) => item.roastLevel))];
  const columns = [
    {
      key: "name",
      label: "Tên sản phẩm / xuất xứ",
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
    { key: "type", label: "Loại", render: (item) => <span className="admin-tag">{item.type}</span> },
    { key: "stock", label: "Tồn hiện tại", render: (item) => `${item.stockQty} ${item.stockUnit}` },
    { key: "reorderPoint", label: "Điểm nhập lại", render: (item) => `${item.reorderPoint} ${item.stockUnit}` },
    { key: "freshness", label: "Hạn dùng", render: (item) => <span className={item.status === "Sắp hết" ? "danger-text" : ""}>{item.freshness}</span> },
    { key: "process", label: "Sơ chế" },
    { key: "roastLevel", label: "Mức rang" },
    { key: "supplierName", label: "Nhà cung cấp" },
    { key: "status", label: "Trạng thái", render: (item) => <span className={getStatusClass(item)}>{item.status}</span> },
    {
      key: "action",
      label: "Thao tác",
      render: (item) => (
        <button className="icon-only" aria-label={`Mở thao tác cho ${item.name}`} type="button">
          <MoreHorizontal size={20} />
        </button>
      ),
    },
  ];

  return (
    <section className="admin-panel inventory-panel">
      <div className="inventory-toolbar">
        <div>
          <h2>Danh sách tồn kho</h2>
          <div className="inventory-filters">
            <label className="admin-search compact">
              <Search size={16} />
              <input placeholder="Tìm trong danh sách..." type="search" />
            </label>
            <select defaultValue="all-origin">
              <option value="all-origin">Xuất xứ: Tất cả</option>
              {origins.map((origin) => (
                <option key={origin}>{origin}</option>
              ))}
            </select>
            <select defaultValue="all-process">
              <option value="all-process">Sơ chế: Tất cả</option>
              {processes.map((process) => (
                <option key={process}>{process}</option>
              ))}
            </select>
            <select defaultValue="all-roast">
              <option value="all-roast">Mức rang: Tất cả</option>
              {roastLevels.map((roast) => (
                <option key={roast}>{roast}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="admin-button ghost" type="button">
          <SlidersHorizontal size={16} />
          Sắp xếp nâng cao
        </button>
      </div>

      <AdminTable columns={columns} rows={items} getRowKey={(item) => item.id} />

      <footer className="inventory-footer">
        <span>Hiển thị 1-{items.length} trên {items.length} sản phẩm cà phê</span>
        <div>
          <button type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
        </div>
      </footer>
    </section>
  );
}
