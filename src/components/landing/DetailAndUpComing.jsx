/* eslint-disable react/no-unknown-property */
import styles from "./DetailAndUpComing.module.scss";
import img1 from "../../assets/loginpage/backdrop.jpg";
import { Parallax } from "react-scroll-parallax";
function DetailAndUpComing() {
  return (
    <div>
      <Parallax opacity={[0, 1]} scale={[0.5, 1]} speed={10} style={{ position: "fixed", top: "290px" }}>
        <div className={styles.mainConatainer}>
          <img src={img1} alt="" />
        </div>
      </Parallax>
      <Parallax opacity={[0, 1]} translateX={["-1200px", "100px"]} speed={5} style={{ position: "fixed", top: "340px" }}>
        <div className={styles.mainConatainer}>
          <img src={img1} alt="" />
        </div>
      </Parallax>
      <div style={{ height: "12000px" }}></div>
    </div>
  );
}

export default DetailAndUpComing;
