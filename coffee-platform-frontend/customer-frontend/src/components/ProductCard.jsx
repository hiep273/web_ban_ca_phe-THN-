import { formatMoney } from "@coffee-platform/shared/utils/formatMoney.js";
import { defaultNotes } from "../data/customerData.js";

export default function ProductCard({ product, onView, onAdd }) {
  const notes = product.notes?.length ? product.notes : defaultNotes;

  return (
    <article className="product-card">
      <img src={product.image} alt={`Cà phê ${product.name}`} />
      <div className="product-card-body">
        <div className="card-topline">
          <span>{product.badge}</span>
          <strong>{formatMoney(product.price)}</strong>
        </div>
        <h3>{product.name}</h3>
        <p>{product.origin}</p>
        <div className="chip-row">
          {notes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
        <div className="card-actions">
          <button className="secondary-button compact" onClick={onView}>
            Chi tiết
          </button>
          <button className="primary-button compact" onClick={onAdd}>
            Thêm
          </button>
        </div>
      </div>
    </article>
  );
}
