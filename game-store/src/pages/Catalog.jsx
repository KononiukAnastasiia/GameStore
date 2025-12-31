import { useMemo, useState } from "react";
import GameCard from "../components/GameCard";
import { useAuth } from "../hooks/useAuth";
import { useGames } from "../hooks/useGames";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const { user } = useAuth();
  const { games, loading, error, addGame } = useGames();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [link, setLink] = useState("");

  const canAdd = useMemo(() => {
    return title.trim().length >= 2 && genre.trim().length >= 2 && price.trim().length >= 1;
  }, [title, genre, price]);

  async function onAdd(e) {
    e.preventDefault();
    if (!canAdd) return;

    await addGame({
      title,
      genre,
      price,
      img: img.trim() || "https://via.placeholder.com/616x353?text=Game",
      link: link.trim() || "https://store.steampowered.com/",
      cta: "Відкрити",
    });

    setTitle("");
    setGenre("");
    setPrice("");
    setImg("");
    setLink("");
  }

  return (
    <div>
      {user ? (
        <form className={styles.addForm} onSubmit={onAdd}>
          <h3 className={styles.formTitle}>Додати гру (POST)</h3>

          <input className={styles.input} placeholder="Назва" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className={styles.input} placeholder="Жанр" value={genre} onChange={(e) => setGenre(e.target.value)} />
          <input className={styles.input} placeholder="Ціна (199₴ або Безкоштовно)" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input className={styles.input} placeholder="URL картинки (необов’язково)" value={img} onChange={(e) => setImg(e.target.value)} />
          <input className={styles.input} placeholder="Посилання (необов’язково)" value={link} onChange={(e) => setLink(e.target.value)} />

          <button className={styles.button} type="submit" disabled={!canAdd || loading}>
            {loading ? "Додавання..." : "Додати"}
          </button>

          <p className={styles.hint}>
            * Додавати ігри може тільки авторизований користувач.
          </p>
        </form>
      ) : (
        <div className={styles.infoBox}>
          <p>Щоб додавати ігри, увійди на сторінці “Увійти”.</p>
        </div>
      )}

      {error && <div className={styles.errorBox}>{error}</div>}

      {loading && games.length === 0 && <p>Завантаження каталогу...</p>}

      <div className={styles.catalog}>
        {(games || []).map((g) => (
          <GameCard key={g.id || g.title} game={g} />
        ))}
      </div>
    </div>
  );
}
