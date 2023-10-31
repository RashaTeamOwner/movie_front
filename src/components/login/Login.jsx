import styles from "./Login.module.scss";
import usericon from "../../assets/loginpage/user-outlined.svg";
import passicon from "../../assets/loginpage/lock-password.svg";
import { useRef } from "react";
function Login() {
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const handleFocus = (element) => {
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const target = element.target.dataset.set;
    if (target == "phone") {
      phone.style.marginTop = "-27px";
      phone.style.color = "rgba(255, 255, 255)";
      phone.style.fontSize = "0.9rem";
    } else if (target == "pass") {
      pass.style.marginTop = "-27px";
      pass.style.color = "rgba(255, 255, 255)";
      pass.style.fontSize = "0.9rem";
    }
  };
  const handleClose = (element) => {
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const target = element.target.dataset.set;
    const lenValue = element.target.value.length;
    if (target == "phone") {
      if (lenValue != 0) return;
      phone.style.marginTop = "0";
      phone.style.color = "rgba(255, 255, 255, 0.523)";
      phone.style.fontSize = "0.8rem";
    } else if (target == "pass") {
      if (lenValue != 0) return;
      pass.style.marginTop = "0";
      pass.style.color = "rgba(255, 255, 255, 0.523)";
      pass.style.fontSize = "0.8rem";
    }
  };
  return (
    <div className={styles.container}>
      <p className={styles.title_login}>ورود به حساب</p>
      <div className={styles.loginBox}>
        <div className={styles.phone_login}>
          <span ref={refPhoneSpan}>شماره تلفن</span>
          <input
            onBlur={handleClose}
            onFocus={handleFocus}
            required=""
            type="text"
            name="text"
            data-set="phone"
            className={styles.input}
            autoComplete="off"
          />
          <img src={usericon} alt="نام کاربری" />
        </div>
        <div className={styles.password_login}>
          <span ref={refPassSpan}>رمز عبور</span>
          <input onBlur={handleClose} onFocus={handleFocus} type="password" autoComplete="off" data-set="pass" />
          <img src={passicon} alt="" />
        </div>
        <div className={styles.submitbox}>
          <input className={styles.submitLogin} type="submit" value="ورود" />
          <button>فراموشی رمز عبور</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
