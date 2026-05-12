import ShipmentFeed from "../components/ShipmentFeed.jsx";
import StatsCards from "../components/StatsCards.jsx";
import InventoryTable from "./InventoryPage.jsx";

export default function DashboardPage({ data, stats }) {
  const highlightedItem = data.inventoryItems[0];

  return (
    <>
      <StatsCards stats={stats} />
      <InventoryTable items={data.inventoryItems.slice(0, 4)} />

      <section className="admin-secondary-grid">
        <div className="roaster-note">
          {highlightedItem?.image && (
            <img
              src={highlightedItem.image}
              alt={highlightedItem.name}
            />
          )}
          <div>
            <span className="admin-eyebrow">Ghi chú tồn kho</span>
            <h2>
              {highlightedItem
                ? `${highlightedItem.name} còn ${highlightedItem.stockQty} ${highlightedItem.stockUnit} trong kho.`
                : "Chưa có dữ liệu tồn kho."}
            </h2>
            <p>{highlightedItem?.supplierName || "Dữ liệu backend"}</p>
          </div>
        </div>
        <ShipmentFeed shipments={data.shipments} />
      </section>
    </>
  );
}
