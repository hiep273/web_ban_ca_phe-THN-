export const APP_MODES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

export const APP_MODE = import.meta.env.VITE_APP_MODE || APP_MODES.CUSTOMER;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5244/api";

export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};
