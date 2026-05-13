import { login as loginRequest } from "../api/authApi.js";
import { useLocalStorage } from "./useLocalStorage.js";

const AUTH_STORAGE_KEY = "coffee-platform.auth";

export function useAuth() {
  const [session, setSession] = useLocalStorage(AUTH_STORAGE_KEY, null);

  async function login(credentials) {
    const nextSession = await loginRequest(credentials);
    setSession(nextSession);
    return nextSession;
  }

  function logout() {
    setSession(null);
  }

  return {
    isAuthenticated: Boolean(session?.token),
    login,
    logout,
    role: session?.user?.role,
    session,
    token: session?.token,
    user: session?.user,
  };
}
