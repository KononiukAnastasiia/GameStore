const API = "http://localhost:4000/api";

// ===== AUTH =====

export async function apiRegister(data) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await safeMessage(res);
    throw new Error(msg || "Register error");
  }
  return res.json();
}

export async function apiLogin(data) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await safeMessage(res);
    throw new Error(msg || "Login error");
  }
  return res.json();
}

// "Хто я" — у нас без JWT, тому беремо з localStorage (навчально)
export async function apiMe() {
  const raw = localStorage.getItem("gamestore_session");
  const user = raw ? JSON.parse(raw) : null;
  return { user };
}

// Logout — теж на фронті: чистимо session
export async function apiLogout() {
  localStorage.removeItem("gamestore_session");
  return { ok: true };
}

// ===== GAMES =====

export async function apiGetGames() {
  const res = await fetch(`${API}/games`);
  if (!res.ok) {
    const msg = await safeMessage(res);
    throw new Error(msg || "Get games error");
  }
  return res.json(); // очікуємо масив
}

export async function apiAddGame(game) {
  const res = await fetch(`${API}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });

  if (!res.ok) {
    const msg = await safeMessage(res);
    throw new Error(msg || "Add game error");
  }
  return res.json();
}

// ===== helper =====
async function safeMessage(res) {
  try {
    const data = await res.json();
    return data?.message;
  } catch {
    return "";
  }
}
