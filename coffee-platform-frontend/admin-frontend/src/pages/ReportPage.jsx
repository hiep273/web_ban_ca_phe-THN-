import { formatMoney, formatNumber } from "@coffee-platform/shared/utils/adminMetrics";

export default function ReportPage({ metrics }) {
  return (
    <section className="admin-stats report-grid">
      {metrics.map((metric) => (
        <article className="admin-stat" key={metric.label}>
          <div>
            <span className="admin-stat-icon">{metric.label.slice(0, 1)}</span>
            <small>{metric.trend}</small>
          </div>
          <p>{metric.label}</p>
          <strong>{metric.type === "currency" ? formatMoney(metric.value) : formatNumber(metric.value)}</strong>
        </article>
      ))}
    </section>
  );
}
