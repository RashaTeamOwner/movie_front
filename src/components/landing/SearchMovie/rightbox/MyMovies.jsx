/* eslint-disable no-unused-vars */
import styles from "./Mymovies.module.scss";
import arrow from "../../../../assets/loginpage/arrow.svg";
import img1 from "../../../../assets/landing/upcoming/7s.webp";
import img2 from "../../../../assets/landing/upcoming/11s.webp";
import img3 from "../../../../assets/landing/upcoming/16s.webp";
import UseWindowSize from "../../../../hooks/UseWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
function MyMovies() {
  const window = UseWindowSize();
  return (
    <div className={styles.mainContainer}>
      {/* <div className={styles.header}>
        <div className={styles.routeAllList}>
          <img src={arrow} alt="" />
          <button>لیست های محبوب</button>
        </div>
        <button>ثبت لیست و شرکت در مسابقه</button>
      </div> */}
      <div className={styles.body}>
        <Swiper
          effect={"freemode"}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={"auto"}
          freeMode
          modules={[FreeMode]}
          direction={"vertical"}
          className={styles.mySwiper}
        >
          <SwiperSlide className={styles.swiperActors}>
            <div
              style={{
                background: window.width < 435 ? `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.67)), url(${img1})` : "none",
              }}
              className={styles.listMovie}
            >
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
                </div>
                <button>اطلاعات فیلم</button>
              </div>
              <div className={styles.optionSetup}>
                <button>حذف فیلم</button>
                <p>پخش آنلاین به زودی ...</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperActors}>
            <div
              style={{
                background: window.width < 435 ? `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.67)), url(${img1})` : "none",
              }}
              className={styles.listMovie}
            >
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
                </div>
                <button>اطلاعات فیلم</button>
              </div>
              <div className={styles.optionSetup}>
                <button>حذف فیلم</button>
                <p>پخش آنلاین به زودی ...</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperActors}>
            <div
              style={{
                background: window.width < 435 ? `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.67)), url(${img1})` : "none",
              }}
              className={styles.listMovie}
            >
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
                </div>
                <button>اطلاعات فیلم</button>
              </div>
              <div className={styles.optionSetup}>
                <button>حذف فیلم</button>
                <p>پخش آنلاین به زودی ...</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperActors}>
            <div
              style={{
                background: window.width < 435 ? `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.67)), url(${img2})` : "none",
              }}
              className={styles.listMovie}
            >
              <img src={img2} alt="movie" />
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
                </div>
                <button>اطلاعات فیلم</button>
              </div>
              <div className={styles.optionSetup}>
                <button>حذف فیلم</button>
                <p>پخش آنلاین به زودی ...</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperActors}>
            <div
              style={{
                background: window.width < 435 ? `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.67)), url(${img3})` : "none",
              }}
              className={styles.listMovie}
            >
              <img src={img3} alt="movie" />
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
                </div>
                <button>اطلاعات فیلم</button>
              </div>
              <div className={styles.optionSetup}>
                <button>حذف فیلم</button>
                <p>پخش آنلاین به زودی ...</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default MyMovies;
