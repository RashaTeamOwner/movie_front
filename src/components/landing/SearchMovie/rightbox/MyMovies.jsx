/* eslint-disable no-unused-vars */
import styles from "./Mymovies.module.scss";
import arrow from "../../../../assets/loginpage/arrow.svg";
function MyMovies() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.routeAllList}>
          <img src={arrow} alt="" />
          <button>لیست های محبوب</button>
        </div>
        <button>ثبت لیست و شرکت در مسابقه</button>
      </div>
    </div>
  );
}
export default MyMovies;
