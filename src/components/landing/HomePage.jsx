import HeaderHomePage from "./HeaderHomePage";
import HandleSearch from "./SearchMovie/HandleSearch";
import styles from "./HomePage.module.scss";
import SectionTwoHomePage from "./SectionTwoHomePage";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    document.title = "صفحه اصلی";
  }, []);
  return (
    <div className={styles.homeContainer}>
      <HeaderHomePage />
      <SectionTwoHomePage />
      <HandleSearch />
    </div>
  );
}

export default HomePage;
