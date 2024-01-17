/* eslint-disable no-unused-vars */
import styles from "./Mymovies.module.scss";
import arrow from "../../../../assets/loginpage/arrow.svg";
import img1 from "../../../../assets/landing/upcoming/7s.webp";
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
      <div className={styles.body}>
        <div className={styles.listMovie}>
          <img src={img1} alt="movie" />
          <div className={styles.detailMovie}>
            <h2>From</h2>
            <div className={styles.votes}>
              <p>
                نمره شما : <span>7</span>
              </p>
              <p>
                نمره فیلم : <span>8.6</span>
              </p>
              <p>
                ژانر فیلم : <span>درام , اجتماعی , ترسناک</span>
              </p>
              <button>اطلاعات فیلم</button>
            </div>
          </div>
          <button>حذف فیلم</button>
        </div>
      </div>
    </div>
  );
}
export default MyMovies;
