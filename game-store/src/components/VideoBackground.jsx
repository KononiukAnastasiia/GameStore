import styles from "./VideoBackground.module.css";

export default function VideoBackground() {
  return (
    <video autoPlay muted loop className={styles.video}>
      <source src="/background-video.mp4" type="video/mp4" />
      Ваш браузер не підтримує відтворення відео.
    </video>
  );
}
