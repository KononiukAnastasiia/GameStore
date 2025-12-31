import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import VideoBackground from "./VideoBackground";
import styles from "./Layout.module.css";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? styles.homeLayout : styles.pageLayout}>
      {isHome && <VideoBackground />}

      <Header />
      <Navbar />

      <main className={isHome ? styles.homeMain : styles.pageMain}>
        <Outlet />
      </main>
    </div>
  );
}
