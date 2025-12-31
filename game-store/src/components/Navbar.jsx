import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const navClass = isHome ? styles.homeNav : styles.pageNav;

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <nav className={navClass}>
      <NavLink to="/" className={linkClass}>
        Головна
      </NavLink>
      <NavLink to="/catalog" className={linkClass}>
        Каталог ігор
      </NavLink>
      <NavLink to="/about" className={linkClass}>
        Про нас
      </NavLink>
      <NavLink to="/login" className={linkClass}>
        Увійти
      </NavLink>
    </nav>
  );
}
