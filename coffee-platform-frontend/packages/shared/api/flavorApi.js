import api from "./axiosClient.js";

export function mapFlavorFromApi(flavor) {
  return {
    id: String(flavor.maHuongVi ?? flavor.MaHuongVi),
    name: flavor.tenHuongVi ?? flavor.TenHuongVi ?? "Hương vị",
  };
}

export async function getFlavors() {
  const response = await api.get("/huong-vi");
  const payload = response.data;
  const items = Array.isArray(payload) ? payload : payload?.value ?? [];

  return items.map(mapFlavorFromApi).filter((flavor) => flavor.name);
}
