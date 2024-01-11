import HeaderHomePage from "./HeaderHomePage";
import HandleSearch from "./SearchMovie/HandleSearch";
import styles from "./HomePage.module.scss";
import SectionTwoHomePage from "./SectionTwoHomePage";
import { useEffect } from "react";
import DetailAndUpComing from "./DetailAndUpComing";

function HomePage() {
  useEffect(() => {
    document.title = "صفحه اصلی";
  }, []);
  return (
    <div className={styles.homeContainer}>
      {/* <NavBar /> */}
      <HeaderHomePage />
      <SectionTwoHomePage />
      <HandleSearch />
      {/* <DetailAndUpComing /> */}
    </div>
  );
}

export default HomePage;
