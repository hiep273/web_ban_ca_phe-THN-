import { useMemo, useState } from "react";
import AdminHeader from "./components/AdminHeader.jsx";
import AdminSidebar from "./components/AdminSidebar.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import InventoryTable from "./components/InventoryTable.jsx";
import OrdersPage from "./components/OrdersPage.jsx";
import ReportsPage from "./components/ReportsPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import StatsCards from "./components/StatsCards.jsx";
import SuppliersPage from "./components/SuppliersPage.jsx";
import {
  adminNavItems,
  inventoryItems,
  orders,
  reportMetrics,
  settings,
  shipments,
  suppliers,
} from "./data/adminData.js";
import { buildStats } from "./utils/adminMetrics.js";

const pageMeta = {
  dashboard: {
    eyebrow: "Operations Overview",
    title: "Admin Dashboard",
    description: "A single view for stock, shipments, orders, and sourcing activity.",
  },
  inventory: {
    eyebrow: "Stock Overview",
    title: "Global Inventory",
    description: "Track coffee lots, freshness, reorder points, roast state, and suppliers.",
  },
  orders: {
    eyebrow: "Fulfillment",
    title: "Orders",
    description: "Review payment, channel, customer, and shipping status before dispatch.",
  },
  suppliers: {
    eyebrow: "Sourcing",
    title: "Suppliers",
    description: "Monitor farm partners, active lots, ratings, and upcoming shipments.",
  },
  reports: {
    eyebrow: "Business Health",
    title: "Reports",
    description: "Read the main weekly metrics for sales, stock risk, and supply chain issues.",
  },
  settings: {
    eyebrow: "Configuration",
    title: "Settings",
    description: "Manage admin defaults and operational settings.",
  },
};

const adminData = {
  inventoryItems,
  orders,
  reportMetrics,
  settings,
  shipments,
  suppliers,
};

export default function AdminApp() {
  const [activePage, setActivePage] = useState("dashboard");
  const stats = useMemo(
    () => buildStats({ inventoryItems, shipments, orders }),
    []
  );
  const meta = pageMeta[activePage] || pageMeta.dashboard;

  return (
    <div className="admin-shell">
      <AdminSidebar
        activePage={activePage}
        items={adminNavItems}
        onChangePage={setActivePage}
      />
      <div className="admin-workspace">
        <AdminHeader />
        <main className="admin-main">
          <section className="admin-page-heading">
            <div>
              <span className="admin-eyebrow">{meta.eyebrow}</span>
              <h1>{meta.title}</h1>
              <p>{meta.description}</p>
            </div>
            <div className="admin-actions">
              <button className="admin-button ghost">Export</button>
              <button className="admin-button primary">Create new</button>
            </div>
          </section>

          {activePage === "dashboard" && <DashboardPage data={adminData} stats={stats} />}
          {activePage === "inventory" && (
            <>
              <StatsCards stats={stats} />
              <InventoryTable items={inventoryItems} />
            </>
          )}
          {activePage === "orders" && <OrdersPage orders={orders} />}
          {activePage === "suppliers" && <SuppliersPage suppliers={suppliers} />}
          {activePage === "reports" && <ReportsPage metrics={reportMetrics} />}
          {activePage === "settings" && <SettingsPage settings={settings} />}
        </main>
      </div>
    </div>
  );
}
