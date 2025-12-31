import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.content}>
      <div>
        <h1 className={styles.title}>Найкращі ігри чекають на тебе</h1>
        <p className={styles.text}>
          Відкрий світ ігор з чудовими знижками та спеціальними пропозиціями!
        </p>
        <Link to="/catalog" className={styles.button}>
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
}
