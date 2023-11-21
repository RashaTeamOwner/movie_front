import HeaderHomePage from "./HeaderHomePage";
import styles from "./HomePage.module.scss";
function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <HeaderHomePage />
    </div>
  );
}

export default HomePage;
