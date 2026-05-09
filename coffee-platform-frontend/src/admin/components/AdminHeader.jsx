import { Bell, CircleHelp, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <label className="admin-search">
        <Search size={18} />
        <input placeholder="Tìm sản phẩm, lô hàng hoặc xuất xứ..." type="search" />
      </label>
      <div className="admin-header-actions">
        <button aria-label="Thông báo">
          <Bell size={20} />
        </button>
        <button aria-label="Trợ giúp">
          <CircleHelp size={20} />
        </button>
        <span className="admin-user-label">Quản lý tồn kho</span>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
          alt="Quản lý tồn kho"
        />
      </div>
    </header>
  );
}
