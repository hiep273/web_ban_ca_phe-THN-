import {
  BarChart3,
  Coffee,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Truck,
} from "lucide-react";

const icons = {
  dashboard: LayoutDashboard,
  inventory: Package,
  orders: ShoppingCart,
  suppliers: Truck,
  reports: BarChart3,
  settings: Settings,
};

export default function AdminSidebar({ activePage, items, onChangePage }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span>
          <Coffee size={22} />
        </span>
        <div>
          <strong>Từ Vườn Đến Ly</strong>
          <small>Quản trị cà phê</small>
        </div>
      </div>

      <nav className="admin-nav" aria-label="Điều hướng quản trị">
        {items.map((item) => {
          const Icon = icons[item.id] || LayoutDashboard;
          return (
            <button
              className={activePage === item.id ? "active" : ""}
              key={item.id}
              onClick={() => onChangePage(item.id)}
              type="button"
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="admin-logout" type="button">
        <LogOut size={19} />
        Đăng xuất
      </button>
    </aside>
  );
}
