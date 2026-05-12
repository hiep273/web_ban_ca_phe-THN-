import api from "./axiosClient.js";

export function getSuppliers(params = {}) {
  return api.get("/nha-cung-cap", { params });
}

export function getSupplierById(id) {
  return api.get(`/nha-cung-cap/${id}`);
}

export function createSupplier(payload) {
  return api.post("/nha-cung-cap", payload);
}

export function updateSupplier(id, payload) {
  return api.put(`/nha-cung-cap/${id}`, payload);
}
