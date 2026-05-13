import axiosClient from "@coffee-platform/shared/api/axiosClient.js";

// Lấy host của BE từ VITE_API_BASE_URL (http://localhost:5244)
const backendHost = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5244';

// Adapter function: map BE model to FE model
const adaptProductToFE = (beProduct) => {
  // Xử lý chuỗi hình ảnh: xóa khoảng trắng thừa và ghép với host BE
  const rawImage = beProduct.hinhAnh ? beProduct.hinhAnh.trim() : "";
  const imageUrl = rawImage.startsWith("http") ? rawImage : `${backendHost}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

  return {
    id: beProduct.maSanPham,
    name: beProduct.tenSanPham,
    origin: beProduct.xuatXu,
    price: beProduct.gia,
    roast: beProduct.mucRang,
    process: beProduct.quyTrinhCheBien,
    story: beProduct.moTa,
    image: imageUrl,
    badge: beProduct.nhanHieuPhu,
    stock: beProduct.soLuongTon,
    active: beProduct.trangThai,
    createdAt: beProduct.ngayTao,
    notes: beProduct.huongVis ? beProduct.huongVis.map((hv) => hv.tenHuongVi) : [],
    brew: beProduct.phuongPhapPhas ? beProduct.phuongPhapPhas.map((pp) => pp.tenPhuongPhap) : [],
  };
};

export const productService = {
  /**
   * Lấy danh sách toàn bộ sản phẩm đang active
   * @returns {Promise<Array>} Danh sách sản phẩm
   */
  async getAllProducts() {
    try {
      // Backend api /san-pham trả về { data: [...] }
      const response = await axiosClient.get("/san-pham?pageSize=100");
      
      // Chuyển đổi dữ liệu BE sang dạng chuẩn FE
      if (response && response.data) {
        return response.data.map(adaptProductToFE);
      }
      return [];
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      throw error;
    }
  },

  /**
   * Lấy chi tiết một sản phẩm theo id
   * @param {number|string} id - ID sản phẩm
   * @returns {Promise<Object>} Chi tiết sản phẩm
   */
  async getProductById(id) {
    try {
      const beProduct = await axiosClient.get(`/san-pham/${id}`);
      return adaptProductToFE(beProduct);
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết sản phẩm ${id}:`, error);
      throw error;
    }
  }
};
