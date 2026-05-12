import api from "./axiosClient.js";

export function getFlavors() {
  return api.get("/huong-vi");
}
