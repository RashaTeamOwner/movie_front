import styles from "./Login.module.scss";
import usericon from "../../assets/loginpage/user-outlined.svg";
import passicon from "../../assets/loginpage/lock-password.svg";
import { useRef } from "react";
function Login() {
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const handleFocus = () => {
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
  };
  return (
    <div className={styles.container}>
      <p className={styles.title_login}>ورود به حساب</p>
      <div className={styles.loginBox}>
        <div className={styles.phone_login}>
          <span ref={refPhoneSpan}>شماره تلفن</span>
          <input onFocus={handleFocus} required="" type="text" name="text" autoComplete="off" className={styles.input} />
          <img src={usericon} alt="نام کاربری" />
        </div>
        <div className={styles.password_login}>
          <span ref={refPassSpan}>رمز عبور</span>
          <input type="password" autoComplete="off" />
          <img src={passicon} alt="" />
        </div>
        <input className={styles.submitLogin} type="submit" value="ورود" />
      </div>
    </div>
  );
}

export default Login;
