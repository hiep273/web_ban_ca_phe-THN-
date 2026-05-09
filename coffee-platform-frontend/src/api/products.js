import api from "./axios";

const fallbackImage =
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5244/api";
const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "");

function listNames(value, key) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => item?.[key]).filter(Boolean);
}

export function resolveImageUrl(value) {
  const imagePath = value?.trim();

  if (!imagePath) {
    return fallbackImage;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const publicPath = imagePath
    .replace(/\\/g, "/")
    .replace(/^wwwroot\/?/i, "")
    .replace(/^\/+/, "");

  return `${apiOrigin}/${publicPath}`;
}

export function mapProductFromApi(product) {
  const notes = listNames(product.huongVis ?? product.HuongVis, "tenHuongVi");
  const notesPascal = listNames(product.huongVis ?? product.HuongVis, "TenHuongVi");
  const brew = listNames(product.phuongPhapPhas ?? product.PhuongPhapPhas, "tenPhuongPhap");
  const brewPascal = listNames(product.phuongPhapPhas ?? product.PhuongPhapPhas, "TenPhuongPhap");

  return {
    id: String(product.maSanPham ?? product.MaSanPham),
    name: product.tenSanPham ?? product.TenSanPham ?? "San pham ca phe",
    origin: product.xuatXu ?? product.XuatXu ?? "Dang cap nhat xuat xu",
    price: Number(product.gia ?? product.Gia ?? 0),
    roast: product.mucRang ?? product.MucRang ?? "Dang cap nhat",
    process: product.quyTrinhCheBien ?? product.QuyTrinhCheBien ?? "Dang cap nhat",
    notes: [...notes, ...notesPascal].length ? [...notes, ...notesPascal] : ["Ca phe dac san"],
    brew: [...brew, ...brewPascal].length ? [...brew, ...brewPascal] : ["Phin", "Pour over"],
    image: resolveImageUrl(product.hinhAnh ?? product.HinhAnh),
    story: product.moTa ?? product.MoTa ?? "San pham ca phe dang duoc cap nhat mo ta.",
    badge: product.nhanHieuPhu ?? product.NhanHieuPhu ?? "Tu backend",
    stock: product.soLuongTon ?? product.SoLuongTon ?? 0,
  };
}

export async function getProducts(params = {}) {
  const response = await api.get("/san-pham", {
    params: {
      page: 1,
      pageSize: 50,
      ...params,
    },
  });

  const payload = response.data;
  const items = Array.isArray(payload) ? payload : payload?.data ?? [];

  return items.map(mapProductFromApi);
}
