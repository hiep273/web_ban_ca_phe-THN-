import { Award, Coffee, Leaf } from "lucide-react";
import Metric from "../components/Metric.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/customerData.js";

export default function HomePage({ navigate, addToCart }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Nghệ thuật pha cà phê</p>
          <h1>Từ Đất Lành Đến Tách Cà Phê</h1>
          <p>
            Nền tảng cà phê kết nối trực tiếp với nông trại, giúp bạn khám phá
            vùng trồng, so sánh hương vị và chọn đúng gu cho mỗi buổi sáng.
          </p>
          <div className="button-row">
            <button
              className="primary-button"
              onClick={() => document.getElementById("shop")?.scrollIntoView()}
            >
              Khám phá vùng trồng
            </button>
            <button className="secondary-button" onClick={() => navigate("/quiz")}>
              Tìm gu cà phê
            </button>
          </div>
        </div>
      </section>

      <section className="section" id="shop">
        <div className="section-heading">
          <p className="eyebrow">Bộ sưu tập theo mùa</p>
          <h2>Chọn Gu Cà Phê Của Bạn</h2>
          <p>
            Mua theo vùng trồng, mức rang, phương pháp sơ chế và những nốt
            hương bạn yêu thích.
          </p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={() => navigate(`/product/${product.id}`)}
              onAdd={() => addToCart(product.id)}
            />
          ))}
        </div>
      </section>

      <section className="story-band">
        <div>
          <p className="eyebrow">Nguồn gốc minh bạch</p>
          <h2>Theo dấu hành trình từ nông trại đến tách cà phê.</h2>
        </div>
        <div className="journey-grid">
          <Metric icon={<Leaf />} label="Nguồn gốc" value="3 vùng trồng" />
          <Metric icon={<Award />} label="Chất lượng" value="Lô Q-grade" />
          <Metric icon={<Coffee />} label="Thủ công" value="Rang mỗi tuần" />
        </div>
      </section>
    </main>
  );
}
