import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import im1 from "../../assets/landing/sec1.jpg";
import im2 from "../../assets/landing/sec2.jpg";
import im3 from "../../assets/landing/sec3.jpg";
import im4 from "../../assets/landing/sec4.jpg";

import styles from "./SectionTwoHomePage.module.scss";
function SectionTwoHomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>فیلم هفته بعدی را شما انتخاب کنید</h2>
      </div>
      <div className={styles.imageContainer}>
        <Swiper
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
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide style={{ width: "250px" }}>
            <img src={im1} style={{ width: "250px" }} />
          </SwiperSlide>
          <SwiperSlide style={{ width: "250px" }}>
            <img src={im2} style={{ width: "250px" }} />
          </SwiperSlide>
          <SwiperSlide style={{ width: "250px" }}>
            <img src={im3} style={{ width: "250px" }} />
          </SwiperSlide>
          <SwiperSlide style={{ width: "250px" }}>
            <img src={im4} style={{ width: "250px" }} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default SectionTwoHomePage;
