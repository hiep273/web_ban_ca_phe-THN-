import { useEffect, useMemo, useState } from "react";
import { getAdminOverview } from "@coffee-platform/shared/api/adminApi.js";
import AdminHeader from "./components/AdminHeader.jsx";
import AdminSidebar from "./components/AdminSidebar.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import InventoryTable from "./pages/InventoryPage.jsx";
import OrdersPage from "./pages/OrderManagePage.jsx";
import ReportsPage from "./pages/ReportPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import StatsCards from "./components/StatsCards.jsx";
import SuppliersPage from "./pages/SupplierPage.jsx";
import {
  adminNavItems,
  settings,
} from "./data/adminData.js";
import { buildStats } from "@coffee-platform/shared/utils/adminMetrics.js";

const pageMeta = {
  dashboard: {
    eyebrow: "Tổng quan vận hành",
    title: "Bảng điều khiển quản trị",
    description: "Theo dõi tồn kho, nhập hàng, đơn hàng và hoạt động nhà cung cấp trong một màn hình.",
  },
  inventory: {
    eyebrow: "Tổng quan kho",
    title: "Quản lý tồn kho",
    description: "Theo dõi sản phẩm cà phê, hạn dùng, điểm nhập lại, mức rang và nhà cung cấp.",
  },
  orders: {
    eyebrow: "Xử lý đơn",
    title: "Đơn hàng",
    description: "Kiểm tra thanh toán, kênh bán, khách hàng và trạng thái giao hàng.",
  },
  suppliers: {
    eyebrow: "Nguồn cung",
    title: "Nhà cung cấp",
    description: "Theo dõi đối tác, lô hàng đang hoạt động, xếp hạng và lịch nhập hàng.",
  },
  reports: {
    eyebrow: "Tình hình kinh doanh",
    title: "Báo cáo",
    description: "Xem các chỉ số chính về doanh thu, rủi ro tồn kho và chuỗi cung ứng.",
  },
  settings: {
    eyebrow: "Cấu hình",
    title: "Cài đặt",
    description: "Quản lý các thiết lập mặc định cho khu vực quản trị.",
  },
};

const emptyAdminData = {
  inventoryItems: [],
  orders: [],
  reportMetrics: [],
  settings,
  shipments: [],
  suppliers: [],
};

export default function AdminApp() {
  const [activePage, setActivePage] = useState("dashboard");
  const [adminData, setAdminData] = useState(emptyAdminData);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAdminData() {
      try {
        setIsLoading(true);
        const data = await getAdminOverview();

        if (isMounted) {
          setAdminData({ ...emptyAdminData, ...data, settings });
          setLoadError("");
        }
      } catch (error) {
        if (isMounted) {
          setAdminData(emptyAdminData);
          setLoadError("Chưa tải được dữ liệu quản trị từ backend.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAdminData();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(
    () => buildStats({
      inventoryItems: adminData.inventoryItems,
      shipments: adminData.shipments,
      orders: adminData.orders,
    }),
    [adminData]
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
              <button className="admin-button ghost">Xuất dữ liệu</button>
              <button className="admin-button primary">Tạo mới</button>
            </div>
          </section>

          {isLoading && <p className="inline-notice">Đang tải dữ liệu quản trị từ backend...</p>}
          {loadError && <p className="inline-notice">{loadError}</p>}
          {activePage === "dashboard" && <DashboardPage data={adminData} stats={stats} />}
          {activePage === "inventory" && (
            <>
              <StatsCards stats={stats} />
              <InventoryTable items={adminData.inventoryItems} />
            </>
          )}
          {activePage === "orders" && <OrdersPage orders={adminData.orders} />}
          {activePage === "suppliers" && <SuppliersPage suppliers={adminData.suppliers} />}
          {activePage === "reports" && <ReportsPage metrics={adminData.reportMetrics} />}
          {activePage === "settings" && <SettingsPage settings={settings} />}
        </main>
      </div>
    </div>
  );
}
