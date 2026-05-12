import { ArrowRight } from "lucide-react";

export default function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>Từ Vườn Đến Ly</strong>
        <p>
          Trải nghiệm khám phá cà phê đặc sản, câu chuyện sản phẩm, bài tìm gu
          và giỏ hàng trong một ứng dụng React.
        </p>
      </div>
      <button onClick={() => navigate("/")}>
        Về cửa hàng <ArrowRight size={16} />
      </button>
    </footer>
  );
}
