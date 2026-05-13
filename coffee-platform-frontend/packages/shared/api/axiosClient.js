import { API_BASE_URL } from "../constants/index.js";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export default {
  get: (path) => request(path),
  post: (path, body) => request(path, { body: JSON.stringify(body), method: "POST" }),
  put: (path, body) => request(path, { body: JSON.stringify(body), method: "PUT" }),
  patch: (path, body) => request(path, { body: JSON.stringify(body), method: "PATCH" }),
};
