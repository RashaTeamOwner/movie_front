import styles from "./HandleLogin.module.scss";
import arrowicon from "../../assets/loginpage/arrow.svg";
import Login from "./Login";
import { useEffect, useRef, useState } from "react";
import SignUp from "./SignUp";

function HandleLogin() {
  const refboxSignin = useRef(null);
  const refboxSignup = useRef(null);
  const [statusSign, setStatusSign] = useState(false);
  const changeSign = (element) => {
    const target = element.target.parentElement.dataset.set;
    // تارگت باید ریخته شه تو useState
    if (target === "in") {
      if (window.outerWidth < 660) {
        refboxSignin.current.style.width = "100%";
        refboxSignup.current.style.width = "0%";
      } else {
        refboxSignin.current.style.width = "60%";
        refboxSignup.current.style.width = "40%";
      }
    } else {
      if (window.outerWidth < 660) {
        refboxSignin.current.style.width = "0%";
        refboxSignup.current.style.width = "100%";
      } else {
        refboxSignup.current.style.width = "60%";
        refboxSignin.current.style.width = "40%";
      }
    }
    setStatusSign(!statusSign);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth < 660) {
        console.log("660px");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div data-set="up" ref={refboxSignup} className={styles.boxSignup}>
        <div className={styles.filterEffect}></div>
        {statusSign ? (
          <SignUp />
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
