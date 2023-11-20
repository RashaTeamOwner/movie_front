import styles from "./HomePage.module.scss";
import landimg from "../../assets/landing/landimg.jpg";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.intoContainer}>
        <div className={styles.landImg}>
          <img src={landimg} alt="landingImg" />
        </div>
        <div className={styles.landboxDetail}>
          <div className={styles.landDetail}>
            <div className={styles.landDetailinto}>
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
            </div>
            <div className={styles.landDetailGenre}>
              <div>
                <h4>محصول سال : 2022</h4>
                <h4>ژانر : درام , تاریخی</h4>
                <h4>محصول : آمریکا</h4>
                <h4>خلاصه داستان : داستان مرلین مونرو بازیگر آمریکایی که زندگی عشقی و حرفه ای او را پوشش می دهد</h4>
              </div>
              <img src={landimg} alt="poster" />
            </div>
          </div>
          <div className={styles.timeIncoming}>
            <div>
              <h3>سه شنبه سوم دی ماه</h3>
              <p>ساعت 16</p>
            </div>
            <div className={styles.boxChairs}>
              <div className={styles.boxChairsRight}>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
              </div>
              <div className={styles.boxChairsLeft}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div style={{ backgroundColor: "rgb(255, 55, 55)" }}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className={styles.someDetailChairs}>
              <p>رزرو شده ها</p>
              <p>صندلی خالی</p>
              <p>انتخاب شده</p>
            </div>
            <div className={styles.loginOrReserve}>
              <Link to="/signin">ورود و رزرو بلیت</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
