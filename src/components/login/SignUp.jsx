import { useRef, useState } from "react";
import styles from "./SignUp.module.scss";
import iconname from "../../assets/loginpage/user-outlined.svg";
import iconphone from "../../assets/loginpage/phone.svg";
import iconuid from "../../assets/loginpage/user-id-broken.svg";
function SignUp() {
  const [inName, setInName] = useState("");
  const [inPhone, setInPhone] = useState("");
  const [inPass, setInPass] = useState("");
  const regexNumber = /^09\d{9}$/;
  const regexPersian = /^[\u0600-\u06FF\s]+$/;
  const regexUid = /^(97[0-9]{8}|98[0-9]{8}|99[0-9]{8}|400[0-9]{8}|401[0-9]{8}|402[0-9]{8})$/;

  //// start span up even click input
  const refNameSpan = useRef(null);
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const handleFocus = (element) => {
    const sname = refNameSpan.current;
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
    } else if (target == "name") {
      sname.style.marginTop = "-27px";
      sname.style.color = "rgba(255,255,255)";
      sname.style.fontSize = "0.9rem";
    }
  };
  const handleClose = (element) => {
    const sname = refNameSpan.current;
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
    } else if (target == "name") {
      if (lenValue != 0) return;
      sname.style.marginTop = "0";
      sname.style.color = "rgba(255,255,255,0.523)";
      sname.fontSize = "0.8rem";
    }
  };
  //// end span up even click input
  return (
    <div className={styles.container}>
      <p className={styles.title_signup}>ثبت نام</p>
      <div className={styles.signupBox}>
        <div className={styles.name_signup}>
          <span ref={refNameSpan}>نام و نام خانوادگی</span>
          <input
            onBlur={handleClose}
            onFocus={handleFocus}
            required=""
            type="text"
            name="text"
            data-set="name"
            className={styles.input}
            autoComplete="off"
            onChange={(element) => {
              setInName(element.target.value);
            }}
          />
          {regexPersian.test(inName) && inName.length > 3 ? <></> : <p className={styles.errorInput}>نام خود را به فارسی بنویسید</p>}
          <img src={iconname} alt="" />
        </div>
        <div className={styles.phone_signup}>
          <span ref={refPhoneSpan}>شماره تلفن</span>
          <input
            onBlur={handleClose}
            onFocus={handleFocus}
            onChange={(element) => {
              setInPhone(element.target.value);
            }}
            required=""
            type="text"
            name="text"
            data-set="phone"
            className={styles.input}
            autoComplete="off"
          />
          {regexNumber.test(inPhone) ? <></> : <p className={styles.errorInput}>شماره خود را به درستی وارد کنید</p>}
          <img src={iconphone} alt="" />
        </div>
        <div className={styles.password_signup}>
          <span ref={refPassSpan}>شماره دانشجویی</span>
          <input
            onBlur={handleClose}
            onFocus={handleFocus}
            type="text"
            autoComplete="off"
            data-set="pass"
            onChange={(element) => {
              setInPass(element.target.value);
            }}
          />
          {regexUid.test(inPass) ? <></> : <p className={styles.errorInput}>شماره دانشجویی اشتباه است</p>}
          <img src={iconuid} alt="" />
        </div>
        <div className={styles.submitbox}>
          <input className={styles.submitLogin} type="submit" value="ثبت نام" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
