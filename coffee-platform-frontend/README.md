# Giao diện nền tảng cà phê

Từ Vườn Đến Ly là một ứng dụng Vite React duy nhất, thay cho bốn màn hình HTML
tĩnh riêng lẻ trước đây.

## Bao gồm

- Trang chủ kiêm cửa hàng với dữ liệu sản phẩm dùng chung
- Trang chi tiết sản phẩm
- Bài tìm gu cà phê có logic gợi ý sản phẩm
- Giỏ hàng với tăng giảm số lượng, xóa sản phẩm và giảm giá đăng ký định kỳ
- Header, footer, hệ thống giao diện và CSS responsive dùng chung

Các file HTML cũ trong `pages/` chỉ còn là tư liệu tham khảo. Ứng dụng đang chạy
bắt đầu từ `index.html` và `src/main.jsx`.

## Chạy cục bộ

Trên Windows PowerShell, dùng `npm.cmd` nếu chính sách script chặn lệnh `npm`.

```bash
npm.cmd install
npm.cmd run dev
```

Build bản production:

```bash
npm.cmd run build
```
