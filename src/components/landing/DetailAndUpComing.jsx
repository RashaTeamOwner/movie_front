/* eslint-disable react/no-unknown-property */
import styles from "./DetailAndUpComing.module.scss";
function DetailAndUpComing() {
  const handleScroll = (ele) => {
    console.log(ele);
  };
  return <div className={styles.mainConatainer} onScrollCapture={handleScroll}></div>;
}

export default DetailAndUpComing;
