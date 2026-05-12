import { useMemo } from "react";
import { login as loginRequest } from "../api/authApi.js";
import { useLocalStorage } from "./useLocalStorage.js";

const AUTH_STORAGE_KEY = "coffee-platform.auth";

export function useAuth() {
  const [session, setSession] = useLocalStorage(AUTH_STORAGE_KEY, null);

  const auth = useMemo(
    () => ({
      isAuthenticated: Boolean(session?.token),
      role: session?.user?.role,
      token: session?.token,
      user: session?.user,
    }),
    [session]
  );

  async function login(credentials) {
    const response = await loginRequest(credentials);
    const nextSession = response.data;
    setSession(nextSession);
    return nextSession;
  }

  function logout() {
    setSession(null);
  }

  return { ...auth, login, logout, session };
}
