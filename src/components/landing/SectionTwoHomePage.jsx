/* eslint-disable no-undef */
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import axios from "axios";
import UseLogedin from "../../hooks/UseLogedin";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import im1 from "../../assets/landing/sec1.jpg";
import im2 from "../../assets/landing/sec2.jpg";
import im3 from "../../assets/landing/sec3.jpg";
import im4 from "../../assets/landing/sec4.jpg";
import closeicon from "../../assets/landing/close-bold.svg";
import styles from "./SectionTwoHomePage.module.scss";
import closebtn from "../../assets/landing/close-bold.svg";
import { useEffect } from "react";

function SectionTwoHomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedin = UseLogedin();
  const [isSelectedMovie, setIsSelectedMovie] = useState(-1);
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
        setMovies(res.data.movies);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // let data = {
    //   id: 2,
    // };
    // axios({
    //   method: "post",
    //   url: `${process.env.VITE_API_URL}/api/v1/vote/`,
    //   headers: {
    //     Authorization: `Token ${localStorage.getItem("token")}`,
    //   },
    //   data: data,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex;
    const targetSlide = swiper.slides[activeSlideIndex];
    // if (targetSlide.children[0].className == styles.contentSlide) {
    //   targetSlide.children[0].style.display = "flex";
    // }
  };

  // handle popup open in mobile sec
  const refTableData = useRef(null);
  const refPriceData = useRef(null);
  const refFatherContainer = useRef(null);
  const refCloseIcon = useRef(null);
  const refCloseIcon2 = useRef(null);

  const sizeWidth = useWindowSize();
  useEffect(() => {
    if (!isLoading) return;
    if (sizeWidth.width > 1200) {
      refFatherContainer.current.style.display = "none";
      refTableData.current.style.display = "flex";
      refPriceData.current.style.display = "block";
      refCloseIcon.current.style.display = "none";
      refCloseIcon2.current.style.display = "none";
    } else if (sizeWidth.width < 1200) {
      refFatherContainer.current.style.display = "none";
      refTableData.current.style.display = "none";
      refPriceData.current.style.display = "none";
      refCloseIcon.current.style.display = "block";
      refCloseIcon2.current.style.display = "block";
    }
  }, [sizeWidth]);

  const handleOpenResults = () => {
    refTableData.current.style.display = "flex";
    refPriceData.current.style.display = "none";
    refFatherContainer.current.style.display = "block";
  };
  const handleOpenPoints = () => {
    refPriceData.current.style.display = "block";
    refTableData.current.style.display = "none";
    refFatherContainer.current.style.display = "block";
  };

  const closePopupShodow = () => {
    refFatherContainer.current.style.display = "none";
    refTableData.current.style.display = "none";
    refPriceData.current.style.display = "none";
    setIsSelectedMovie(-1);
  };

  const handelpopupShowMovie = (index) => {
    setIsSelectedMovie(index);
    refFatherContainer.current.style.display = "block";
  };

  if (!isLoading) {
    return <div></div>;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2>فیلم هفته بعدی را شما انتخاب کنید</h2>
          <div className={styles.headPoints}>
            <button onClick={handleOpenPoints} className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
              امتیازات
            </button>
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
                  <div className={styles.topSlide}>
                    <h2>منتخب هفته بعد</h2>
                    <p>14 رای</p>
                  </div>
                  <img src={im1} />
                  <button onClick={() => handelpopupShowMovie(index)} className={styles.submitSlide}>
                    ثبت رای
                  </button>
                </SwiperSlide>
              );
            })}
            {/* <SwiperSlide className={styles.imageSlide}>
            <div className={styles.topSlide}>
              <h2>منتخب هفته بعد</h2>
              <p>14 رای</p>
            </div>
            <img src={im1} />
            <button className={styles.submitSlide}>ثبت رای</button>
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={im2} />
            <button className={styles.submitSlide}>ثبت رای</button>
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={im3} />
            <button className={styles.submitSlide}>ثبت رای</button>
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={im4} />
            <button className={styles.submitSlide}>ثبت رای</button>
          </SwiperSlide> */}
          </Swiper>
          {isSelectedMovie == -1 ? (
            <div className={styles.closeDetailMovie}>
              <p>{movies[0].name}</p>
              <p>{movies[0].description}</p>
              <button>submit vote</button>
            </div>
          ) : (
            <div className={styles.openDetailMovies}>
              <img onClick={closePopupShodow} className={styles.closeicon} src={closeicon} alt="close" />
              <div className={styles.popimgMovie}>
                <img className={styles.imageMovie} src={im2} alt="image" />
                <div>
                  <p>
                    <span>نام فیلم :</span> {movies[isSelectedMovie].name}
                  </p>
                  <div>
                    <p>آمریکا</p>
                    <span>|</span>
                    <p>محصول 2022</p>
                    <span>|</span>
                    <p>اکشن - ماجراجویی</p>
                  </div>
                  <p>
                    <span>خلاصه فیلم :</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, libero optio. Asperiores
                    similique odio libero enim, nesciunt nisi cumque? Suscipit laborum aspernatur, ratione nam pariatur aliquid possimus ut
                    provident! Quaerat!
                  </p>
                </div>
              </div>
              <button>ثبت رای</button>
            </div>
          )}
        </div>
        <div ref={refTableData} className={styles.tableContainer}>
          <div className={styles.titleTable}>
            <h3>فیلم ها</h3>
            <h3>تعداد رای</h3>
          </div>
          <div className={styles.dataTable}>
            <div>
              <p>عصر کسشر</p>
              <p>14 رای</p>
            </div>
            <div>
              <p>ارام مرادیان</p>
              <p>10 رای</p>
            </div>
            <div>
              <p>کسشر بعدی</p>
              <p>7 رای</p>
            </div>
            <div>
              <p>3 کسشر</p>
              <p>3 رای</p>
            </div>
          </div>
          <div ref={refCloseIcon} className={styles.closeIconBox}>
            <img onClick={closePopupShodow} src={closebtn} alt="close icon" />
          </div>
        </div>
        <div ref={refPriceData} className={styles.priceContainer}>
          <h3>توضیحات : </h3>
          <p>در هر رای گیری که شرکت کنید 10 امتیاز به حساب شما اضافه میشود . </p>
          <div>
            <p>
              <span>10+ </span>امتیاز , شرکت در رای گیری
            </p>
            <p>
              <span>15+ </span>امتیاز , شرکت در سالن اکران و تماشای فیلم
            </p>
            <p>
              <span>10+ </span>امتیاز , شرکت در نقد فیلم
            </p>
          </div>
          <button className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>جدول امتیازات دانشجویان</button>
          <div ref={refCloseIcon2} className={styles.closeIconBox}>
            <img onClick={closePopupShodow} src={closebtn} alt="close icon" />
          </div>
        </div>
        <div ref={refFatherContainer} onClick={closePopupShodow} className={styles.shodowforHide}></div>
      </div>
    );
  }
}

export default SectionTwoHomePage;
