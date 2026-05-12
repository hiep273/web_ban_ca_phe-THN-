import api from "./axiosClient.js";

export function getProducts() {
  return api.get("/san-pham");
}
