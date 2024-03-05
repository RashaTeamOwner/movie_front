/* eslint-disable no-unused-vars */
import styles from "./Mymovies.module.scss";
import arrow from "../../../../assets/loginpage/arrow.svg";
import img1 from "../../../../assets/landing/upcoming/7s.webp";
import img2 from "../../../../assets/landing/upcoming/11s.webp";
import img3 from "../../../../assets/landing/upcoming/16s.webp";
import starimg from "../../../../assets/landing/starmain.svg";
import addstar from "../../../../assets/landing/staradd.svg";
import UseWindowSize from "../../../../hooks/UseWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import UseLogedin from "../../../../hooks/UseLogedin";
import { useRef, useState, useEffect } from "react";
function MyMovies() {
  const window = UseWindowSize();
  const logedinStatus = UseLogedin();
  const refStars = useRef(null);
  const [renderStars, setRenderStars] = useState(null);
  const [statusStars, setStatusStars] = useState({});
  const [statusRate, setStatusRate] = useState(false);
  const [stars, setStars] = useState(null);
  const [showStar, setShowStar] = useState(false);
  // handle stars
  useEffect(() => {
    if (refStars.current == null) return;
    const starelement = refStars.current.children;
    for (let j = 9; j >= stars + 1; j--) {
      let element = starelement[j];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
    for (let i = 0; i <= stars; i++) {
      starelement[i].style.filter = "none";
    }
  }, [stars]);
  const handleStars = (event) => {
    const list = event.target.parentElement.children;
    setRenderStars(Number(event.target.dataset.set) + 1);
    for (let j = 9; j >= Number(event.target.dataset.set); j--) {
      let element = list[j];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
    for (let i = 0; i <= Number(event.target.dataset.set); i++) {
      list[i].style.filter = "none";
    }
  };
  const handleResetStars = (event) => {
    const list = event.target.parentElement.children;
    setRenderStars(stars + 1);
    // reset stars to select item
    for (let j = 9; j >= stars + 1; j--) {
      let element = list[j];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
    for (let i = 0; i <= stars; i++) {
      list[i].style.filter = "none";
    }
  };
  const selectStar = (event) => {
    setStars(Number(event.target.dataset.set));
  };

  const showStarsToPage = () => {
    setShowStar(true);
  };

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
                  <div className={styles.addstarshow}>
                    <p>نمره شما :</p>
                    {showStar ? <></> : <img onClick={showStarsToPage} src={addstar} alt="" />}
                    {renderStars == null ? (
                      <p className={`${styles.textPointnone} ${showStar ? styles.textPointnoneverse : ""}`}>چیزی ثبت نکردی</p>
                    ) : (
                      <p className={`${styles.textPoint} ${showStar ? styles.textPointverse : ""}`}>{renderStars}</p>
                    )}
                    <div className={styles.yourRate}>
                      {(Object.keys(statusStars).length == 0 || !logedinStatus) && showStar ? (
                        <div className={styles.numberStar}>
                          <div ref={refStars}>
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={0}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={1}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={2}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={3}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={4}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={5}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={6}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={7}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={8}
                              src={starimg}
                              alt="star"
                            />
                            <img
                              onMouseEnter={handleStars}
                              onMouseLeave={handleResetStars}
                              onClick={selectStar}
                              data-set={9}
                              src={starimg}
                              alt="star"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className={styles.numberStar}></div>
                      )}
                    </div>
                  </div>
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
