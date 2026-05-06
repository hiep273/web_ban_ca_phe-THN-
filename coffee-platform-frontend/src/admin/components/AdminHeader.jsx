import { Bell, CircleHelp, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <label className="admin-search">
        <Search size={18} />
        <input placeholder="Search inventory, batches, or origins..." type="search" />
      </label>
      <div className="admin-header-actions">
        <button aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button aria-label="Help">
          <CircleHelp size={20} />
        </button>
        <span className="admin-user-label">Inventory Management</span>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
          alt="Inventory manager"
        />
      </div>
    </header>
  );
}
