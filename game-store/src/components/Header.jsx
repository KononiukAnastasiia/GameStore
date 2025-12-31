import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const { pathname } = useLocation();

  const title =
    pathname === "/"
      ? "GameStore"
      : pathname === "/catalog"
      ? "Каталог ігор"
      : pathname === "/about"
      ? "Про нас"
      : pathname === "/login"
      ? "Авторизація"
      : "GameStore";

  return (
    <header className={pathname === "/" ? styles.homeHeader : styles.pageHeader}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
