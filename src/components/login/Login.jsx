import styles from "./Login.module.scss";
import usericon from "../../assets/loginpage/user-outlined.svg";
import passicon from "../../assets/loginpage/lock-password.svg";
function Login() {
  const handleLabel = () => {
    console.log(1);
  };
  return (
    <div className={styles.container}>
      <p className={styles.title_login}>ورود به حساب</p>
      <div className={styles.loginBox}>
        <div className={styles.phone_login}>
          <span>شماره تلفن</span>
          <input onFocus={handleLabel} type="text" />
          <img src={usericon} alt="نام کاربری" />
        </div>
        <div className={styles.password_login}>
          <span>رمز عبور</span>
          <input type="text" />
          <img src={passicon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
