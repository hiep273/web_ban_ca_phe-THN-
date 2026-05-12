import { ArrowLeft, Coffee, ShoppingBag, Sparkles, Star } from "lucide-react";
import { formatMoney } from "@coffee-platform/shared/utils/formatMoney.js";
import Metric from "../components/Metric.jsx";
import { defaultBrewMethods, defaultNotes } from "../data/customerData.js";

export default function ProductDetailPage({ product, addToCart, navigate }) {
  if (!product) {
    return (
      <main className="detail-page">
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowLeft size={18} /> Về cửa hàng
        </button>
        <div className="empty-state">
          <ShoppingBag size={42} />
          <h2>Không tìm thấy sản phẩm</h2>
        </div>
      </main>
    );
  }

  const notes = product.notes?.length ? product.notes : defaultNotes;
  const brew = product.brew?.length ? product.brew : defaultBrewMethods;

  return (
    <main className="detail-page">
      <button className="back-button" onClick={() => navigate("/")}>
        <ArrowLeft size={18} /> Về cửa hàng
      </button>
      <section className="product-detail">
        <div className="gallery">
          <img src={product.image} alt={`Gói cà phê ${product.name}`} />
        </div>
        <div className="detail-copy">
          <div className="badge-line">
            <span>{product.badge}</span>
            <span>{product.process}</span>
          </div>
          <h1>{product.name}</h1>
          <p className="origin">{product.origin}</p>
          <p>{product.story}</p>
          <div className="detail-stats">
            <Metric icon={<Star />} label="Mức rang" value={product.roast} />
            <Metric icon={<Sparkles />} label="Sơ chế" value={product.process} />
            <Metric icon={<Coffee />} label="Giá" value={formatMoney(product.price)} />
          </div>
          <div className="detail-panel">
            <h3>Hồ sơ hương vị</h3>
            <div className="chip-row">
              {notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>
          <div className="detail-panel">
            <h3>Hợp để pha</h3>
            <div className="chip-row">
              {brew.map((method) => (
                <span key={method}>{method}</span>
              ))}
            </div>
          </div>
          <button className="primary-button wide" onClick={() => addToCart(product.id)}>
            Thêm vào giỏ - {formatMoney(product.price)}
          </button>
        </div>
      </section>
    </main>
  );
}
