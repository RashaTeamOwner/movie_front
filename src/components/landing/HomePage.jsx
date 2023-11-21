import HeaderHomePage from "./HeaderHomePage";
import styles from "./HomePage.module.scss";
import SectionTwoHomePage from "./SectionTwoHomePage";
function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <HeaderHomePage />
      <SectionTwoHomePage />
    </div>
  );
}

export default HomePage;
