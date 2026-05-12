import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatMoney } from "@coffee-platform/shared/utils/formatMoney.js";
import SummaryLine from "../components/SummaryLine.jsx";
import { defaultNotes } from "../data/customerData.js";

export default function CartPage({ cart, setCart, navigate, products }) {
  const items = cart
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item) => item.product);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const discount = items.some((item) => item.subscription) ? subtotal * 0.15 : 0;
  const shipping = items.length ? 30000 : 0;
  const total = subtotal - discount + shipping;

  const updateQty = (productId, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const remove = (productId) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  };

  const toggleSubscription = (productId) => {
    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, subscription: !item.subscription } : item
      )
    );
  };

  return (
    <main className="cart-page">
      <section className="cart-items">
        <div className="section-heading">
          <p className="eyebrow">Thanh toán</p>
          <h1>Giỏ Cà Phê Của Bạn</h1>
        </div>
        {items.length === 0 ? (
          <div className="empty-state">
            <ShoppingBag size={42} />
            <h2>Giỏ hàng đang trống</h2>
            <button className="primary-button" onClick={() => navigate("/")}>
              Xem cà phê
            </button>
          </div>
        ) : (
          items.map((item) => (
            <article className="cart-item" key={item.productId}>
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <div className="cart-title-row">
                  <h3>{item.product.name}</h3>
                  <strong>{formatMoney(item.product.price * item.qty)}</strong>
                </div>
                <p>{(item.product.notes?.length ? item.product.notes : defaultNotes).join(", ")}</p>
                <label className="subscription-toggle">
                  <input
                    type="checkbox"
                    checked={item.subscription}
                    onChange={() => toggleSubscription(item.productId)}
                  />
                  Đăng ký định kỳ và tiết kiệm 15%
                </label>
                <div className="quantity-row">
                  <button
                    onClick={() => updateQty(item.productId, -1)}
                    aria-label="Giảm số lượng"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.productId, 1)}
                    aria-label="Tăng số lượng"
                  >
                    <Plus size={16} />
                  </button>
                  <button className="remove-button" onClick={() => remove(item.productId)}>
                    <Trash2 size={16} /> Xóa
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <aside className="summary">
        <h2>Tóm tắt đơn hàng</h2>
        <SummaryLine label="Tạm tính" value={formatMoney(subtotal)} />
        <SummaryLine label="Tiết kiệm định kỳ" value={`-${formatMoney(discount)}`} />
        <SummaryLine label="Phí giao hàng" value={formatMoney(shipping)} />
        <div className="summary-total">
          <span>Tổng cộng</span>
          <strong>{formatMoney(total)}</strong>
        </div>
        <button className="primary-button wide" disabled={items.length === 0}>
          Tiếp tục thanh toán
        </button>
      </aside>
    </main>
  );
}
