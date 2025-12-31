import { useCallback, useEffect, useState } from "react";
import { apiAddGame, apiGetGames } from "../api/workApi";

export function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await apiGetGames();

      // ✅ підтримка 2 форматів:
      // 1) res = []            (якщо бекенд повертає масив)
      // 2) res = { games: [] } (якщо повертає об'єкт)
      const list = Array.isArray(res) ? res : (res?.games ?? []);
      setGames(list);
    } catch (e) {
      setError(e?.message || "Fetch games error");
      setGames([]); // щоб не було падіння
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const addGame = useCallback(async (game) => {
    setLoading(true);
    setError("");

    try {
      const res = await apiAddGame(game);

      // ✅ підтримка 2 форматів:
      // 1) res = game
      // 2) res = { game }
      const created = res?.game ?? res;
      setGames((prev) => [created, ...prev]);

      return created;
    } catch (e) {
      setError(e?.message || "Add game error");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { games, loading, error, fetchGames, addGame };
}
