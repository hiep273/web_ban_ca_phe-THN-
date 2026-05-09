import {
  ArrowLeft,
  ArrowRight,
  Award,
  Coffee,
  Heart,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const products = [
  {
    id: "dalat-red-bourbon",
    name: "Dalat Red Bourbon",
    origin: "Lâm Đồng, Việt Nam",
    price: 280000,
    roast: "Rang vừa",
    process: "Sơ chế ướt",
    notes: ["Ca cao", "Vỏ cam", "Đường nâu"],
    brew: ["Pour over", "Phin", "French press"],
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    story:
      "Lô cà phê vùng cao có vị sạch, hậu ngọt tròn và dư vị sô cô la êm.",
    badge: "Từ nông trại",
  },
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    origin: "Gedeo, Ethiopia",
    price: 320000,
    roast: "Rang nhẹ",
    process: "Sơ chế ướt",
    notes: ["Hoa nhài", "Vỏ chanh", "Mật ong"],
    brew: ["Pour over", "Aeropress"],
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    story:
      "Cà phê single origin tươi sáng, hương hoa rõ nét và hậu vị trong trẻo.",
    badge: "Phiên bản giới hạn",
  },
  {
    id: "sumatra-mandheling",
    name: "Sumatra Mandheling",
    origin: "Aceh, Indonesia",
    price: 300000,
    roast: "Rang đậm",
    process: "Giling basah",
    notes: ["Gỗ tuyết tùng", "Gia vị", "Mật mía"],
    brew: ["Espresso", "French press", "Moka pot"],
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    story:
      "Cà phê dày vị, ít chua, hợp với người thích body đậm, cay nhẹ và hậu kéo dài.",
    badge: "Nhà rang chọn",
  },
];

const quizQuestions = [
  {
    title: "Bạn thường pha cà phê bằng cách nào?",
    options: ["Pour over", "Phin", "Espresso", "French press"],
  },
  {
    title: "Bạn thích gu hương vị nào?",
    options: ["Sáng vị và hương hoa", "Vị sô cô la", "Đậm và mộc", "Ngọt cân bằng"],
  },
  {
    title: "Bạn muốn ly cà phê mạnh đến mức nào?",
    options: ["Nhẹ nhàng", "Vừa phải", "Đậm mạnh"],
  },
];

function money(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function useRouter() {
  const getRoute = () => window.location.hash.replace("#", "") || "/";
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (nextRoute) => {
    window.location.hash = nextRoute;
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { route, navigate };
}

export default function App() {
  const { route, navigate } = useRouter();
  const [cart, setCart] = useState([
    { productId: "dalat-red-bourbon", qty: 1, subscription: true },
  ]);

  const activeProduct =
    products.find((product) => route === `/product/${product.id}`) || products[0];

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (productId) => {
    setCart((items) => {
      const existing = items.find((item) => item.productId === productId);
      if (existing) {
        return items.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...items, { productId, qty: 1, subscription: false }];
    });
    navigate("/cart");
  };

  return (
    <div className="app-shell">
      <Header route={route} navigate={navigate} cartCount={cartCount} />
      {route === "/" && <Home navigate={navigate} addToCart={addToCart} />}
      {route.startsWith("/product/") && (
        <ProductDetail product={activeProduct} addToCart={addToCart} navigate={navigate} />
      )}
      {route === "/quiz" && <FlavorQuiz navigate={navigate} addToCart={addToCart} />}
      {route === "/cart" && <Cart cart={cart} setCart={setCart} navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ route, navigate, cartCount }) {
  const links = [
    { label: "Cửa hàng", route: "/" },
    { label: "Tìm gu", route: "/quiz" },
    { label: "Cà phê nổi bật", route: "/product/dalat-red-bourbon" },
    { label: "Giỏ hàng", route: "/cart" },
  ];

  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate("/")}>
        Từ Vườn Đến Ly
      </button>
      <nav className="nav-links" aria-label="Điều hướng chính">
        {links.map((link) => (
          <button
            key={link.route}
            className={route === link.route ? "active" : ""}
            onClick={() => navigate(link.route)}
          >
            {link.label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => navigate("/cart")} aria-label="Mở giỏ hàng">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </button>
        <button className="icon-button" aria-label="Tài khoản">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}

function Home({ navigate, addToCart }) {
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
            <button className="primary-button" onClick={() => document.getElementById("shop")?.scrollIntoView()}>
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
          <p>Mua theo vùng trồng, mức rang, phương pháp sơ chế và những nốt hương bạn yêu thích.</p>
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

function ProductCard({ product, onView, onAdd }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={`Cà phê ${product.name}`} />
      <div className="product-card-body">
        <div className="card-topline">
          <span>{product.badge}</span>
          <strong>{money(product.price)}</strong>
        </div>
        <h3>{product.name}</h3>
        <p>{product.origin}</p>
        <div className="chip-row">
          {product.notes.map((note) => (
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

function ProductDetail({ product, addToCart, navigate }) {
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
            <Metric icon={<Coffee />} label="Giá" value={money(product.price)} />
          </div>
          <div className="detail-panel">
            <h3>Hồ sơ hương vị</h3>
            <div className="chip-row">
              {product.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>
          <div className="detail-panel">
            <h3>Hợp để pha</h3>
            <div className="chip-row">
              {product.brew.map((method) => (
                <span key={method}>{method}</span>
              ))}
            </div>
          </div>
          <button className="primary-button wide" onClick={() => addToCart(product.id)}>
            Thêm vào giỏ - {money(product.price)}
          </button>
        </div>
      </section>
    </main>
  );
}

function FlavorQuiz({ navigate, addToCart }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const recommendation = useMemo(() => {
    if (answers.includes("Sáng vị và hương hoa") || answers.includes("Nhẹ nhàng")) {
      return products[1];
    }
    if (answers.includes("Đậm và mộc") || answers.includes("Đậm mạnh")) {
      return products[2];
    }
    return products[0];
  }, [answers]);

  const choose = (answer) => {
    const nextAnswers = [...answers.slice(0, step), answer];
    setAnswers(nextAnswers);
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    }
  };

  const isDone = answers.length === quizQuestions.length;
  const current = quizQuestions[step];

  return (
    <main className="quiz-page">
      <section className="section-heading centered">
        <p className="eyebrow">Gợi ý theo gu</p>
        <h1>Tìm Gu Cà Phê</h1>
        <p>Trả lời ba câu hỏi để nhận gợi ý cà phê phù hợp với cách bạn uống.</p>
      </section>

      {!isDone ? (
        <section className="quiz-card">
          <div className="progress-row">
            <span>Bước {step + 1} / {quizQuestions.length}</span>
            <span>{Math.round(((step + 1) / quizQuestions.length) * 100)}%</span>
          </div>
          <div className="progress-track">
            <div style={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }} />
          </div>
          <h2>{current.title}</h2>
          <div className="quiz-options">
            {current.options.map((option) => (
              <button key={option} onClick={() => choose(option)}>
                <Coffee size={22} />
                {option}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="result-card">
          <div>
            <p className="eyebrow">Gợi ý phù hợp</p>
            <h2>{recommendation.name}</h2>
            <p>{recommendation.story}</p>
            <div className="chip-row">
              {recommendation.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
            <div className="button-row">
              <button className="primary-button" onClick={() => addToCart(recommendation.id)}>
                Thêm gợi ý
              </button>
              <button className="secondary-button" onClick={() => navigate(`/product/${recommendation.id}`)}>
                Xem chi tiết
              </button>
            </div>
          </div>
          <img src={recommendation.image} alt={recommendation.name} />
        </section>
      )}
    </main>
  );
}

function Cart({ cart, setCart, navigate }) {
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
                  <strong>{money(item.product.price * item.qty)}</strong>
                </div>
                <p>{item.product.notes.join(", ")}</p>
                <label className="subscription-toggle">
                  <input
                    type="checkbox"
                    checked={item.subscription}
                    onChange={() => toggleSubscription(item.productId)}
                  />
                  Đăng ký định kỳ và tiết kiệm 15%
                </label>
                <div className="quantity-row">
                  <button onClick={() => updateQty(item.productId, -1)} aria-label="Giảm số lượng">
                    <Minus size={16} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.productId, 1)} aria-label="Tăng số lượng">
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
        <SummaryLine label="Tạm tính" value={money(subtotal)} />
        <SummaryLine label="Tiết kiệm định kỳ" value={`-${money(discount)}`} />
        <SummaryLine label="Phí giao hàng" value={money(shipping)} />
        <div className="summary-total">
          <span>Tổng cộng</span>
          <strong>{money(total)}</strong>
        </div>
        <button className="primary-button wide" disabled={items.length === 0}>
          Tiếp tục thanh toán
        </button>
      </aside>
    </main>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="metric">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div className="summary-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>Từ Vườn Đến Ly</strong>
        <p>Trải nghiệm khám phá cà phê đặc sản, câu chuyện sản phẩm, bài tìm gu và giỏ hàng trong một ứng dụng React.</p>
      </div>
      <button onClick={() => navigate("/")}>
        Về cửa hàng <ArrowRight size={16} />
      </button>
    </footer>
  );
}
