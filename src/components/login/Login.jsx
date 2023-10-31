import styles from "./Login.module.scss";
import usericon from "../../assets/loginpage/user-outlined.svg";
import passicon from "../../assets/loginpage/lock-password.svg";
import { useRef, useState } from "react";
function Login() {
  const [inPhone, setInPhone] = useState("");
  // const [inPass, setInPass] = useState("");
  const regexNumber = /^09\d{9}$/;
  // const regexUid = /^(97[0-9]{8}|98[0-9]{8}|99[0-9]{8}|400[0-9]{8}|401[0-9]{8}|402[0-9]{8})$/;
  // const msgUid = "رمز شما شماره دانشجویی شماست";
  const msgPhone = "شماره خود را به درستی وارد کنید";
  //// start : up and down span
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
  //// end : up and down span
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
            onChange={(element) => {
              setInPhone(element.target.value);
            }}
          />
          {regexNumber.test(inPhone) || inPhone.length == 0 ? <></> : <p className={styles.errorInput}>{msgPhone}</p>}
          <img src={usericon} alt="نام کاربری" />
        </div>
        <div className={styles.password_login}>
          <span ref={refPassSpan}>رمز عبور</span>
          <input
            onBlur={handleClose}
            onFocus={handleFocus}
            type="password"
            autoComplete="off"
            data-set="pass"
            onChange={(element) => {
              setInPass(element.target.value);
            }}
          />
          {/* {regexUid.test(inPass) || inPass.length == 0 ? <></> : <p className={styles.errorInput}>{msgUid}</p>} */}
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
