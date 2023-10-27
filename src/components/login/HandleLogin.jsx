import styles from "./HandleLogin.module.scss";
import arrowicon from "../../assets/loginpage/arrow.svg";
import Login from "./Login";
import { useRef, useState } from "react";

function HandleLogin() {
  const refboxSignin = useRef(null);
  const refboxSignup = useRef(null);

  const [statusSign, setStatusSign] = useState(false);
  const changeSign = (element) => {
    const target = element.target.parentElement.dataset.set;
    console.log(target);
    if (target === "in") {
      refboxSignin.current.style.width = "60%";
      refboxSignup.current.style.width = "40%";
    } else {
      refboxSignup.current.style.width = "60%";
      refboxSignin.current.style.width = "40%";
    }
    setStatusSign(!statusSign);
  };
  return (
    <div className={styles.container}>
      <div data-set="up" ref={refboxSignup} className={styles.boxSignup}>
        <div className={styles.filterEffect}></div>
        {statusSign ? (
          <Login />
        ) : (
          <div onClick={changeSign} className={styles.tableDetail}>
            <p>ثبت نام</p>
            <img src={arrowicon} alt="arrow icon" />
          </div>
        )}
      </div>
      <div data-set="in" ref={refboxSignin} className={styles.boxLogin}>
        <div className={styles.filterEffect}></div>
        {!statusSign ? (
          <Login />
        ) : (
          <div onClick={changeSign} className={styles.tableDetail}>
            <p>ورود به حساب</p>
            <img src={arrowicon} alt="arrow icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default HandleLogin;
