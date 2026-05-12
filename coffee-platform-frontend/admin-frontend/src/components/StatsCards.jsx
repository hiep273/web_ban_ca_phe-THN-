import { AlertTriangle, Flame, Leaf, Truck } from "lucide-react";

const icons = {
  green: Leaf,
  roasted: Flame,
  alerts: AlertTriangle,
  shipments: Truck,
};

export default function StatsCards({ stats }) {
  return (
    <section className="admin-stats">
      {stats.map((stat) => {
        const Icon = icons[stat.id] || Leaf;
        return (
          <article className={stat.danger ? "admin-stat danger" : "admin-stat"} key={stat.id}>
            <div>
              <span className="admin-stat-icon">
                <Icon size={21} />
              </span>
              <small>{stat.meta}</small>
            </div>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </article>
        );
      })}
    </section>
  );
}
