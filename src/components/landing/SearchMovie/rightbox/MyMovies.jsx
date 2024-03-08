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
import { useRef, useState, useEffect, useReducer } from "react";

const redStar = (state, action) => {
  state.map((item) => {
    console.log(item.id, action);
  });
};
let temp = JSON.parse(localStorage.getItem("watch_list"));
let tempArr = [];
if (temp) {
  temp.map((item) => {
    if (item.user_rating == null) {
      tempArr.push({ id: item.imdb_id, rate: -1 });
    } else {
      tempArr.push({ id: item.imdb_id, rate: item.user_rating });
    }
  });
}
const initialStars = tempArr;

function MyMovies() {
  const window = UseWindowSize();
  const logedinStatus = UseLogedin();
  const refStars = useRef(null);
  const [renderStars, setRenderStars] = useState(null);
  const [statusStars, setStatusStars] = useState({});
  const [statusRate, setStatusRate] = useState([]);
  const [getWatch, setGetWatch] = useState([]);
  const [stars, setStars] = useState(null);
  const [showStar, setShowStar] = useState(false);
  const [handleStar, dispatchStar] = useReducer(redStar, initialStars);
  const handleAllStars = (rate, imdbid) => {
    dispatchStar({ rate: rate, id: imdbid });
  };
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
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("watch_list"));
    let tempArr = [];
    if (temp) {
      setGetWatch(temp);
      // temp.map((item) => {
      //   if (item.user_rating == null) {
      //     tempArr.push({ id: item.imdb_id, rate: -1 });
      //   } else {
      //     tempArr.push({ id: item.imdb_id, rate: item.user_rating });
      //   }
      // });
      // setStatusRate(tempArr);
    }
  }, []);
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
    let imdbId = event.target.parentElement.dataset.imdb;
    // after post to reducer for new rate
    // setStars(Number(event.target.dataset.set));
  };

  const showStarsToPage = (event) => {
    let fatherelement = event.target.parentElement.children[3].children;
    let targetmovie = event.target.parentElement.children[3].dataset;
    let uesrRate = -1;
    getWatch.map((item) => {
      if (item.imdb_id == targetmovie) {
        if (item.user_rating != null) {
          uesrRate = item.user_rating;
        }
      }
    });
    // setRenderStars(stars + 1);
    // reset stars to select item
    // const starelement = refStars.current.children;
    for (let j = 9; j >= uesrRate + 1; j--) {
      let element = fatherelement[j];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
    for (let i = 0; i < uesrRate; i++) {
      fatherelement[i].style.filter = "none";
    }
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
          {getWatch.map((index) => {
            const [orgName, persName] = index.name.split("-");
            return (
              <>
                <SwiperSlide key={index.imdb_id} className={styles.swiperActors}>
                  <div
                    style={{
                      background:
                        window.width < 435
                          ? index.banner_path != null
                            ? `linear-gradient(45deg,rgba(0,0,0,0.63),rgba(0,0,0,0.87)),url("https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${index.banner_path
                                .split("/")
                                .join("")}&w=2048&q=75`
                            : `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.87)), url(${img1})`
                          : "none",
                    }}
                    className={styles.listMovie}
                  >
                    <img
                      src={
                        index.image_path == null
                          ? img1
                          : `https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${index.image_path
                              .split("/")
                              .join("")}&w=2048&q=75`
                      }
                      alt="movie"
                    />
                    <div className={styles.detailMovie}>
                      <h2>{persName}</h2>
                      <div className={styles.votes}>
                        <div className={styles.addstarshow}>
                          <p>نمره شما :</p>
                          <p></p>
                          {/* {renderStars == null ? (
                            <p className={`${styles.textPointnone} ${showStar ? styles.textPointnoneverse : ""}`}>چیزی ثبت نکردی</p>
                          ) : (
                            <p className={`${styles.textPoint} ${showStar ? styles.textPointverse : ""}`}>{renderStars}</p>
                          )} */}
                          {showStar ? (
                            <img onClick={showStarsToPage} src={addstar} alt="" />
                          ) : (
                            <img onClick={showStarsToPage} src={addstar} alt="" />
                          )}
                          <div className={`${styles.yourRate} ${styles.numberStar}`} data-imdb={index.imdb_id} ref={refStars}>
                            <>
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
                            </>
                          </div>
                          <p onClick={() => handleAllStars(8, index.imdb_id)}>ثبت</p>
                        </div>
                        <p>
                          نمره فیلم : <span>{index.imdb_rate}</span>
                        </p>
                        <p>
                          ژانر فیلم : <span>{index.genre}</span>
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
              </>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
export default MyMovies;
