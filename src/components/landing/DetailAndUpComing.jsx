/* eslint-disable react/no-unknown-property */
import styles from "./DetailAndUpComing.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import img1 from "../../assets/landing/upcoming/1s.webp";
import img2 from "../../assets/landing/upcoming/2s.webp";
import img3 from "../../assets/landing/upcoming/3s.webp";
import img4 from "../../assets/landing/upcoming/4s.webp";
import img5 from "../../assets/landing/upcoming/5s.webp";
import img6 from "../../assets/landing/upcoming/6s.webp";
import img7 from "../../assets/landing/upcoming/7s.webp";
import img8 from "../../assets/landing/upcoming/8s.webp";
import img9 from "../../assets/landing/upcoming/9s.webp";
import img10 from "../../assets/landing/upcoming/10s.webp";
import img11 from "../../assets/landing/upcoming/11s.webp";
import img12 from "../../assets/landing/upcoming/12s.webp";
import img13 from "../../assets/landing/upcoming/13s.webp";
import img14 from "../../assets/landing/upcoming/14s.webp";
import img15 from "../../assets/landing/upcoming/15s.webp";
import img16 from "../../assets/landing/upcoming/16s.webp";
import UseWindowSize from "../../hooks/useWindowSize";
// Import Swiper styles

function DetailAndUpComing() {
  const window = UseWindowSize();
  return (
    <div className={styles.mainConatainer}>
      <div className={styles.showUpcoming}>به زودی ...</div>
      <div className={styles.up1}>
        <Swiper
          className="sample-slider"
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
          }}
          slidesPerView={window.width > 1200 ? 4 : window.width < 500 ? (window.width < 350 ? 1 : 2) : 3} // added
          speed={5500}
        >
          <SwiperSlide className={styles.imageSlide}>
            <img src={img1} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img2} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img3} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img4} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img5} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img6} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img7} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img8} />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.up2}>
        <Swiper
          className="sample-slider"
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
            reverseDirection: true,
          }}
          slidesPerView={window.width > 1200 ? 4 : window.width < 500 ? (window.width < 350 ? 1 : 2) : 3} // added
          speed={5500}
        >
          <SwiperSlide className={styles.imageSlide}>
            <img src={img9} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img10} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img11} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img12} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img13} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img14} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img15} />
          </SwiperSlide>
          <SwiperSlide className={styles.imageSlide}>
            <img src={img16} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default DetailAndUpComing;
