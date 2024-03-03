/* eslint-disable no-undef */
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import useWindowSize from "../../hooks/UseWindowSize";
import axios from "axios";
import UseLogedin from "../../hooks/UseLogedin";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import closeicon from "../../assets/landing/close-bold.svg";
import styles from "./SectionTwoHomePage.module.scss";
import { useEffect } from "react";

function SectionTwoHomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPop, setIsLoadingPop] = useState(false);
  const isLoggedin = UseLogedin();
  const [isSelectedMovie, setIsSelectedMovie] = useState(-1);
  const [isVoted, setIsVoted] = useState(false);
  const [allVoteMovie, setAllVoteMovie] = useState(0);
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.VITE_API_URL}/api/v1/`,
      headers: {
        Authorization:
          localStorage.getItem("token") != null ? `Token ${localStorage.getItem("token")}` : `Tokene ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        let sorted = res.data.movies.sort((a, b) => {
          return b.votes_count - a.votes_count;
        });
        setMovies(sorted);
        setIsLoading(true);
        setAllVoteMovie(res.data.movies[isSelectedMovie].votes_count);
      })
      .catch(() => {
        // console.log(err);
      });
  }, [isVoted]);

  const handleSlideChange = () => {
    // const activeSlideIndex = swiper.activeIndex;
    // const targetSlide = swiper.slides[activeSlideIndex];
    // if (targetSlide.children[0].className == styles.contentSlide) {
    //   targetSlide.children[0].style.display = "flex";
    // }
  };

  // handle popup open in mobile sec
  const refTableData = useRef(null);
  const refPriceData = useRef(null);
  const refFatherContainer = useRef(null);
  const refFatherContainer2 = useRef(null);
  const refCloseIcon = useRef(null);
  // const refCloseIcon2 = useRef(null);

  const sizeWidth = useWindowSize();
  useEffect(() => {
    if (!isLoading) return;
    if (sizeWidth.width > 1200) {
      refFatherContainer.current.style.display = "none";
      refTableData.current.style.display = "flex";
      // refPriceData.current.style.display = "block";
      refCloseIcon.current.style.display = "none";
      // refCloseIcon2.current.style.display = "none";
    } else if (sizeWidth.width < 1200) {
      refFatherContainer.current.style.display = "none";
      refTableData.current.style.display = "none";
      // refPriceData.current.style.display = "none";
      refCloseIcon.current.style.display = "block";
      // refCloseIcon2.current.style.display = "block";
    }
  }, [sizeWidth]);

  // useEffect(() => {
  //   if (refFatherContainer2.current == null) return;
  // }, [isSelectedMovie]);

  const handleOpenResults = () => {
    refTableData.current.style.display = "flex";
    refPriceData.current.style.display = "none";
    refFatherContainer.current.style.display = "block";
  };
  // const handleOpenPoints = () => {
  //   refPriceData.current.style.display = "block";
  //   refTableData.current.style.display = "none";
  //   refFatherContainer.current.style.display = "block";
  // };

  const closePopupShodow = () => {
    refFatherContainer.current.style.display = "none";
    refTableData.current.style.display = "none";
    refPriceData.current.style.display = "none";
  };
  const closePopupShodow2 = () => {
    refFatherContainer2.current.style.display = "none";
    setIsSelectedMovie(-1);
    setAllVoteMovie(0);
  };

  const handelpopupShowMovie = (index) => {
    setIsSelectedMovie(index);
    refFatherContainer2.current.style.display = "block";
    setIsVoted(movies[index].user_voted);
    setAllVoteMovie(movies[index].votes_count);
  };

  const handlePostVote = () => {
    setIsLoadingPop(true);
    let data = {
      id: movies[isSelectedMovie].id,
    };
    axios({
      method: "post",
      url: `${process.env.VITE_API_URL}/api/v1/vote/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      data: data,
    })
      .then((res) => {
        setIsLoadingPop(false);
        if (res.data.status == "vote counted") setIsVoted(true);
        else setIsVoted(false);
        setIsSelectedMovie(-1);
        refFatherContainer2.current.style.display = "none";
      })
      .catch(() => {
        setIsLoadingPop(false);
      });
  };

  if (!isLoading) {
    return <div></div>;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2>فیلم هفته بعدی را شما انتخاب کنید</h2>
          <div className={styles.headPoints}>
            {/* <button onClick={handleOpenPoints} className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
              امتیازات
            </button> */}
            <button onClick={handleOpenResults} className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
              نتیجه رای گیری
            </button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Swiper
            onSlideChange={handleSlideChange}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination
            navigation
            // autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {movies.map((movie, index) => {
              // console.log(movie);
              return (
                <SwiperSlide key={movie.id} className={styles.imageSlide}>
                  {index == 0 ? (
                    <div className={styles.topSlide}>
                      <h2>منتخب هفته بعد</h2>
                      <p>{movie.votes_count} رای</p>
                    </div>
                  ) : (
                    <></>
                  )}
                  <img src={`${process.env.VITE_API_URL}${movie.image}`} />
                  <button onClick={() => handelpopupShowMovie(index)} className={styles.submitSlide}>
                    ثبت رای
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {isSelectedMovie == -1 ? (
            <></>
          ) : (
            <>
              <div
                style={{
                  background: `linear-gradient(to right, rgb(32, 32, 32), rgba(32, 32, 32, 0.84) 50%, rgba(32, 32, 32, 0.84) 100%),url(${process.env.VITE_API_URL}${movies[isSelectedMovie].banner})`,
                }}
                className={styles.openDetailMovies}
              >
                {isLoadingPop ? (
                  <div className={styles.loadingSign}>
                    <p>صبر کنید</p>
                    <div className={styles.dots}></div>
                  </div>
                ) : (
                  <></>
                )}
                <img onClick={closePopupShodow2} className={styles.closeicon} src={closeicon} alt="close" />
                <div className={styles.popimgMovie}>
                  <img className={styles.imageMovie} src={`${process.env.VITE_API_URL}${movies[isSelectedMovie].image}`} alt="image" />
                  <div>
                    <p>
                      <span>نام فیلم :</span> {movies[isSelectedMovie].name}
                    </p>
                    <div>
                      <p>{movies[isSelectedMovie].country}</p>
                      <span>|</span>
                      <p>
                        <span>محصول</span> {movies[isSelectedMovie].year}
                      </p>
                      <span>|</span>
                      <p>{movies[isSelectedMovie].genre}</p>
                    </div>
                    <p>
                      <span>خلاصه فیلم : </span>
                      {movies[isSelectedMovie].description}
                    </p>
                  </div>
                  <p className={styles.howManyVote}>
                    تعداد رای تا الان : <span>{allVoteMovie} رای</span>
                  </p>
                </div>
                {isLoggedin ? (
                  isVoted ? (
                    <div className={styles.cancelVote}>
                      {/* <p>رای شما ثبت شده</p> */}
                      <button
                        onClick={handlePostVote}
                        className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d} ${styles.btnPassVote}`}
                      >
                        پس گرفتن رای
                      </button>
                    </div>
                  ) : (
                    <button onClick={handlePostVote} className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
                      ثبت رای
                    </button>
                  )
                ) : (
                  <Link to="/signin" className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
                    ورود به حساب
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
        <div ref={refTableData} className={styles.tableContainer}>
          <div className={styles.titleTable}>
            <h3>فیلم ها</h3>
            <h3>تعداد رای</h3>
          </div>
          <div className={styles.dataTable}>
            {movies.map((movie) => {
              return (
                <div key={movie.id}>
                  <p>{movie.name}</p>
                  <p>{movie.votes_count} رای</p>
                </div>
              );
            })}
          </div>
          <div ref={refCloseIcon} className={styles.closeIconBox}>
            <img onClick={closePopupShodow} src={closeicon} alt="close icon" />
          </div>
        </div>
        {/* <div ref={refPriceData} className={styles.priceContainer}>
          <h3>توضیحات : </h3>
          <p>
            در هر رای گیری که شرکت کنید 10 امتیاز به حساب شما اضافه میشود . و در آخر جوایز نفیس به فردی که بیشترین امتیاز را بگیرد اهدا
            میشود{" "}
          </p>
          <div>
            <p>
              <span>10+ </span>امتیاز , شرکت در رای گیری
            </p>
            <p>
              <span>15+ </span>امتیاز , شرکت در سالن اکران و تماشای فیلم
            </p>
          </div>
          <button className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>جدول امتیازات دانشجویان</button>
          <div ref={refCloseIcon2} className={styles.closeIconBox}>
            <img onClick={closePopupShodow} src={closeicon} alt="close icon" />
          </div>
        </div> */}
        <div ref={refFatherContainer} onClick={closePopupShodow} className={styles.shodowforHide}></div>
        <div ref={refFatherContainer2} onClick={closePopupShodow2} className={styles.shodowforHide}></div>
      </div>
    );
  }
}

export default SectionTwoHomePage;
