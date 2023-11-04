import styles from "./HandleLogin.module.scss";
import arrowicon from "../../assets/loginpage/arrow.svg";
import Login from "./Login";
import { useRef, useState } from "react";
import SignUp from "./SignUp";
import ParticlesComponent from "./ParticlesComponent";

function HandleLogin() {
  const refboxSignin = useRef(null);
  const refboxSignup = useRef(null);
  const [statusSign, setStatusSign] = useState(false);
  const changeSign = (element) => {
    const target = element.target.parentElement.dataset.set;
    // تارگت باید ریخته شه تو useState
    if (target === "in") {
      refboxSignin.current.classList.add(styles.signinActive);
      refboxSignin.current.classList.remove(styles.signinDeactive);
      refboxSignup.current.classList.add(styles.signupDeactive);
      refboxSignup.current.classList.remove(styles.signupActive);
    } else {
      refboxSignin.current.classList.remove(styles.signinActive);
      refboxSignin.current.classList.add(styles.signinDeactive);
      refboxSignup.current.classList.remove(styles.signupDeactive);
      refboxSignup.current.classList.add(styles.signupActive);
    }
    setStatusSign(!statusSign);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const rightside = refboxSignin.current.style.width;
  //     console.log(rightside == "");
  //     if (window.outerWidth < 660) {
  //       if (rightside == "60%" || rightside == "") {
  //         refboxSignin.current.style.width = "100%";
  //         refboxSignup.current.style.width = "0%";
  //       } else {
  //         refboxSignin.current.style.width = "0%";
  //         refboxSignup.current.style.width = "100%";
  //       }
  //     } else {
  //       if (rightside == "100%") {
  //         refboxSignin.current.style.width = "60%";
  //         refboxSignup.current.style.width = "40%";
  //       } else {
  //         refboxSignin.current.style.width = "40%";
  //         refboxSignup.current.style.width = "60%";
  //       }
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className={styles.container}>
      <ParticlesComponent />
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
