import styles from "./HandleLogin.module.scss";
import arrowicon from "../../assets/loginpage/arrow.svg";

function HandleLogin() {
  return (
    <div className={styles.container}>
      <div className={styles.boxSignup}>
        <div className={styles.filterEffect}></div>
        <div className={styles.tableDetail}>
          <p>ثبت نام</p>
          <img src={arrowicon} alt="arrow icon" />
        </div>
      </div>
      <div className={styles.boxLogin}>
        <div className={styles.filterEffect}></div>
        <div className={styles.tableDetail}>
          <p>ورود به حساب</p>
          <img src={arrowicon} alt="arrow icon" />
        </div>
      </div>
    </div>
  );
}

export default HandleLogin;
