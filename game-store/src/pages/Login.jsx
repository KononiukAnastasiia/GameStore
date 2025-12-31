import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const { user, loading, error, login, register, logout } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [successMsg, setSuccessMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ При будь-якій зміні — прибираємо старий "успіх"
  useEffect(() => {
    if (successMsg) setSuccessMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, name, email, password]);

  async function onSubmit(e) {
    e.preventDefault();

    // прибираємо старий "успіх" перед новою спробою
    setSuccessMsg("");

    try {
      if (mode === "register") {
        await register(name, email, password);
        setSuccessMsg("✅ Ви успішно зареєстровані та увійшли в систему!");
      } else {
        await login(email, password);
        setSuccessMsg("✅ Ви успішно увійшли в систему!");
      }

      // очищаємо поля після успіху
      setName("");
      setEmail("");
      setPassword("");
    } catch {
      // error вже прийде з контексту
      setSuccessMsg("");
    }
  }

  // ✅ Якщо користувач вже в системі — показуємо профіль
  if (user) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h2 className={styles.title}>Ви в системі ✅</h2>

          <div className={styles.sessionBox}>
            <p>
              <strong>Імʼя:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          {/* success показуємо тільки якщо немає error */}
          {!error && successMsg && (
            <div className={styles.success}>{successMsg}</div>
          )}

          <button
            className={styles.button}
            onClick={logout}
            disabled={loading}
            type="button"
          >
            {loading ? "Зачекайте..." : "Вийти"}
          </button>
        </div>
      </div>
    );
  }

  // 🔐 Форма входу/реєстрації
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.switchRow}>
          <button
            type="button"
            className={`${styles.switchBtn} ${
              mode === "login" ? styles.switchActive : ""
            }`}
            onClick={() => setMode("login")}
            disabled={loading}
          >
            Вхід
          </button>

          <button
            type="button"
            className={`${styles.switchBtn} ${
              mode === "register" ? styles.switchActive : ""
            }`}
            onClick={() => setMode("register")}
            disabled={loading}
          >
            Реєстрація
          </button>
        </div>

        <h2 className={styles.title}>
          {mode === "login" ? "Вхід" : "Реєстрація"}
        </h2>

        <form onSubmit={onSubmit}>
          {mode === "register" && (
            <label className={styles.label}>
              Імʼя
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </label>
          )}

          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </label>

          <label className={styles.label}>
            Пароль
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </label>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading
              ? "Зачекайте..."
              : mode === "login"
              ? "Увійти"
              : "Зареєструватись"}
          </button>

          {/* error має пріоритет */}
          {error && <div className={styles.error}>{error}</div>}

          {/* success показуємо тільки якщо немає error */}
          {!error && successMsg && (
            <div className={styles.success}>{successMsg}</div>
          )}

          <p className={styles.note}>
            </p>
        </form>
      </div>
    </div>
  );
}
