import { ShoppingBag, User } from "lucide-react";

export default function Header({ route, navigate, cartCount }) {
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
        <button
          className="icon-button"
          onClick={() => navigate("/cart")}
          aria-label="Mở giỏ hàng"
        >
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
