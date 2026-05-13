import api from "./axiosClient.js";

export function getOrders() {
  return api.get("/don-hang");
}

export function createOrder(payload) {
  return api.post("/don-hang", payload);
}
