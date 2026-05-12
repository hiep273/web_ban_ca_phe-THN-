import api from "./axiosClient.js";

export function getOrders(params = {}) {
  return api.get("/don-hang", { params });
}

export function getOrderById(id) {
  return api.get(`/don-hang/${id}`);
}

export function createOrder(payload) {
  return api.post("/don-hang", payload);
}

export function updateOrderStatus(id, payload) {
  return api.patch(`/don-hang/${id}/trang-thai`, payload);
}
