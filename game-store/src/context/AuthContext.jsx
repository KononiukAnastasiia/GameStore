import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin, apiRegister } from "../api/workApi";

const AuthContext = createContext(null);

const LS_SESSION = "gamestore_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // стартова перевірка
  const [error, setError] = useState("");

  // відновлення сесії при старті
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_SESSION);
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    setError("");
    setLoading(true);
    try {
      const u = await apiLogin({ email, password }); // очікуємо {id,name,email}
      setUser(u);
      localStorage.setItem(LS_SESSION, JSON.stringify(u));
      return u;
    } catch (e) {
      setUser(null);
      setError(e?.message || "Login error");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function register(name, email, password) {
    setError("");
    setLoading(true);
    try {
      const u = await apiRegister({ name, email, password }); // {id,name,email}
      // ✅ ВАЖЛИВО: після реєстрації автоматично "входимо"
      setUser(u);
      localStorage.setItem(LS_SESSION, JSON.stringify(u));
      return u;
    } catch (e) {
      setUser(null);
      setError(e?.message || "Register error");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setError("");
    setUser(null);
    localStorage.removeItem(LS_SESSION);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
  return ctx;
}
