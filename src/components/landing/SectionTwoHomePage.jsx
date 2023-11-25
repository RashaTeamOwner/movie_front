import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import im1 from "../../assets/landing/sec1.jpg";
import im2 from "../../assets/landing/sec2.jpg";
import im3 from "../../assets/landing/sec3.jpg";
import im4 from "../../assets/landing/sec4.jpg";

import styles from "./SectionTwoHomePage.module.scss";
function SectionTwoHomePage() {
  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex;
    const targetSlide = swiper.slides[activeSlideIndex];
    // if (targetSlide.children[0].className == styles.contentSlide) {
    //   targetSlide.children[0].style.display = "flex";
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>فیلم هفته بعدی را شما انتخاب کنید</h2>
        <div className={styles.headPoints}>
          <h6></h6>
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
          // autoplay={{ delay: 3000, pauseOnMouseEnter: true, stopOnLastSlide: true }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className={styles.imageSlide}>
            <div className={styles.topSlide}>
              <h2>منتخب هفته بعد</h2>
              <p>11 رای</p>
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
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default SectionTwoHomePage;
