import api from "./axiosClient.js";

export function getSuppliers() {
  return api.get("/nha-cung-cap");
}
