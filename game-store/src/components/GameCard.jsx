import styles from "./GameCard.module.css";

export default function GameCard({ game }) {
  const title = game?.title ?? "Без назви";
  const genre = game?.genre ?? "-";
  const price = game?.price ?? "-";
  const img = game?.img ?? "";
  const link = game?.link ?? "";
  const ctaText = game?.cta || "Купити в Steam";

  return (
    <div className={styles.card}>
      {img && <img className={styles.image} src={img} alt={title} />}
      <h2 className={styles.title}>{title}</h2>

      <p className={styles.text}>
        <strong>Жанр:</strong> {genre}
      </p>

      <p className={styles.text}>
        <strong>Ціна:</strong> {price}
      </p>

      {link ? (
        <a
          className={styles.button}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {ctaText}
        </a>
      ) : (
        <div className={styles.buttonDisabled}>Посилання відсутнє</div>
      )}
    </div>
  );
}
