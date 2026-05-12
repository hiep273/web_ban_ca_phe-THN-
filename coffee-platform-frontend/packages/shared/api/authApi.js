import api from "./axiosClient.js";

export function login(credentials) {
  return api.post("/auth/login", credentials);
}

export function register(payload) {
  return api.post("/auth/register", payload);
}

export function getCurrentUser() {
  return api.get("/auth/me");
}
