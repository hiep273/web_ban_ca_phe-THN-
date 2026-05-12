import api from "./axiosClient.js";

export function getInventory() {
  return api.get("/ton-kho");
}
