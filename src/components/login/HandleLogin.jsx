/* eslint-disable react/prop-types */
import styles from "./HandleLogin.module.scss";
import arrowicon from "../../assets/loginpage/arrow.svg";
import homeicon from "../../assets/landing/home.svg";
import Login from "./Login";
import { useEffect, useRef, useState } from "react";
import SignUp from "./SignUp";
// import ParticlesComponent from "./ParticlesComponent";
import { Link } from "react-router-dom";

function HandleLogin(props) {
  const refboxSignin = useRef(null);
  const refboxSignup = useRef(null);
  const [statusSign, setStatusSign] = useState(false);
  const changeSign = (element) => {
    // const target = element.target.parentElement.dataset.set;
    // تارگت باید ریخته شه تو useState
    if (element === "in") {
      document.title = "ورود به حساب";
      refboxSignin.current.classList.add(styles.signinActive);
      refboxSignin.current.classList.remove(styles.signinDeactive);
      refboxSignup.current.classList.add(styles.signupDeactive);
      refboxSignup.current.classList.remove(styles.signupActive);
    } else {
      document.title = "ساخت حساب جدید";
      refboxSignin.current.classList.remove(styles.signinActive);
      refboxSignin.current.classList.add(styles.signinDeactive);
      refboxSignup.current.classList.remove(styles.signupDeactive);
      refboxSignup.current.classList.add(styles.signupActive);
    }
    setStatusSign(!statusSign);
  };

  useEffect(() => {
    const targetPath = window.location.pathname;
    changeSign(props.targetEle);
    if (targetPath == "/signin") {
      setStatusSign(false);
    } else if (targetPath == "/signup") {
      setStatusSign(true);
    }
  }, []);

  return (
    <div className={styles.mainBody}>
      <div className={styles.container}>
        {/* <ParticlesComponent /> */}
        <div className={styles.homeIcon}>
          <Link to={"/"}>صفحه اصلی</Link>
          <img src={homeicon} alt="خانه" />
        </div>
        <div data-set="up" ref={refboxSignup} className={styles.boxSignup}>
          {/* <div className={styles.filterEffect}></div> */}
          {statusSign ? (
            <SignUp />
          ) : (
            <Link to="/signup" onClick={() => changeSign("up")} className={styles.tableDetail}>
              <p>ثبت نام</p>
              <img src={arrowicon} alt="arrow icon" />
            </Link>
          )}
        </div>
        <div data-set="in" ref={refboxSignin} className={styles.boxLogin}>
          {/* <div className={styles.filterEffect}></div> */}
          {!statusSign ? (
            <Login />
          ) : (
            <Link to="/signin" onClick={() => changeSign("in")} className={styles.tableDetail}>
              <p>ورود به حساب</p>
              <img src={arrowicon} alt="arrow icon" />
            </Link>
          )}
        </div>
      </div>
      <div className={styles.owner}>
        <p className={styles.madewithlove}>made with love 💛</p>
        <a href="http://92.63.169.226:8080/" className={styles.madeowner}>
          RashaTeam
        </a>
      </div>
    </div>
  );
}

export default HandleLogin;
