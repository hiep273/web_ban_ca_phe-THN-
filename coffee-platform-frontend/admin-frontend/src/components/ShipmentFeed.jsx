import { Clock, Truck } from "lucide-react";

export default function ShipmentFeed({ shipments }) {
  return (
    <aside className="admin-panel shipment-feed">
      <div className="shipment-heading">
        <h2>Lịch nhập hàng</h2>
        <button type="button">Ghi nhận nhập hàng</button>
      </div>
      {shipments.map((shipment) => {
        const Icon = shipment.status === "Đang về kho" ? Truck : Clock;
        return (
          <div className="shipment-item" key={shipment.id}>
            <span>
              <Icon size={18} />
            </span>
            <div>
              <strong>
                {shipment.title} ({shipment.quantity})
              </strong>
              <p>
                {shipment.status} vào {shipment.eta} - {shipment.route}
              </p>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
