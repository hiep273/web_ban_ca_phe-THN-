import api from "./axiosClient.js";

export function getInventory(params = {}) {
  return api.get("/ton-kho", { params });
}

export function updateInventoryItem(id, payload) {
  return api.put(`/ton-kho/${id}`, payload);
}
