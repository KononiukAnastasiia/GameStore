import { useCallback, useEffect, useState } from "react";
import { apiLogin, apiLogout, apiMe, apiRegister } from "../api/workApi";

const LS_SESSION = "gamestore_session";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Підтягнути поточного користувача (імітація /me)
  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // apiMe() може читати localStorage і повертати { user }
      const res = await apiMe();
      setUser(res?.user ?? null);
    } catch (e) {
      setUser(null);
      setError(e?.message || "Auth error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // на старті пробуємо відновити сесію
    refresh();
  }, [refresh]);

  // Вхід (POST /auth/login)
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await apiLogin({ email, password });
      // res = { id, name, email }
      setUser(res);

      // зберігаємо сесію
      localStorage.setItem(LS_SESSION, JSON.stringify(res));

      return res;
    } catch (e) {
      setUser(null);
      setError(e?.message || "Login error");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  // Реєстрація (POST /auth/register)
  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await apiRegister({ name, email, password });
      // res = { id, name, email }
      setUser(res);

      // зберігаємо сесію
      localStorage.setItem(LS_SESSION, JSON.stringify(res));

      return res;
    } catch (e) {
      setUser(null);
      setError(e?.message || "Register error");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  // Вихід
  const logout = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // якщо apiLogout() просто чистить localStorage — ок
      await apiLogout();

      // дублюємо на всякий випадок
      localStorage.removeItem(LS_SESSION);
      setUser(null);

      return true;
    } catch (e) {
      setError(e?.message || "Logout error");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    refresh,
    isAuthenticated: !!user,
  };
}
