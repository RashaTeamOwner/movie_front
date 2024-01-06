import styles from "./DetailAndUpComing.module.scss";
import img1 from "../../assets/loginpage/backdrop.jpg";
import "animate.css";
import ScrollAnimate from "react-animate-on-scroll";
function DetailAndUpComing() {
  return (
    <div className={styles.mainConatainer}>
      <p>ok</p>
      <ScrollAnimate animateIn="animate__zoomInDown" duration={3}>
        <img src={img1} />
      </ScrollAnimate>
    </div>
  );
}

export default DetailAndUpComing;
