import InventoryTable from "./InventoryTable.jsx";
import ShipmentFeed from "./ShipmentFeed.jsx";
import StatsCards from "./StatsCards.jsx";

export default function DashboardPage({ data, stats }) {
  return (
    <>
      <StatsCards stats={stats} />
      <InventoryTable items={data.inventoryItems.slice(0, 4)} />

      <section className="admin-secondary-grid">
        <div className="roaster-note">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80"
            alt="Roasted coffee beans"
          />
          <div>
            <span className="admin-eyebrow">Roaster note</span>
            <h2>Ethiopia Yirgacheffe has strong floral notes this season. Prioritize it for light roast subscriptions.</h2>
            <p>Marco, Head Roaster</p>
          </div>
        </div>
        <ShipmentFeed shipments={data.shipments} />
      </section>
    </>
  );
}
