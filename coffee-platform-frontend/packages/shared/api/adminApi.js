import api from "./axiosClient.js";

export function getAdminOverview() {
  return api.get("/admin/overview");
}
