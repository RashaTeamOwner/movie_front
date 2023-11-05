import styles from "./HomePage.module.scss";
import landimg from "../../assets/landing/landimg.jpg";
function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.intoContainer}>
        <div className={styles.landImg}>
          <img src={landimg} alt="landingImg" />
        </div>
        <div className={styles.landDetail}>
          <p>
            این هفته با فیلم <span>Blonde</span> همراه شماییم
          </p>
          <p>مدت : 135 دقیقه</p>
          <div className={styles.routeUpper}>
            <p>2 نفر تا تکمیل ظرفیت حداقلی</p>
            <div className={styles.animeRoute}>
              <div></div>
            </div>
            <p>تعداد رزروها : 23 نفر</p>
          </div>
          <div className={styles.timeIncoming}>
            <h3>سه شنبه سوم دی ماه</h3>
            <p>ساعت 16</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
