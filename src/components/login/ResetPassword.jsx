/* eslint-disable no-undef */
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./ResetPassword.module.scss";
import usericon from "../../assets/loginpage/user-outlined.svg";
import phoneicon from "../../assets/loginpage/phone.svg";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function ResetPassword() {
  const history = useHistory();
  const refEyeIcon = useRef(null);
  const [eye, setEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEye = () => {
    setEye(!eye);
  };

  const handleButtonLogin = () => {
    if (regexNumber.test(inPhone) && regexPhone.test(inPass)) {
      let data = {
        username: inPhone,
        password: inPass,
      };
      setIsLoading(true);
      axios({
        method: "post",
        url: `${process.env.VITE_API_URL}/api/v1/token/`,
        data: data,
      })
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem("token", res.data.token);
          history.push("/");
        })
        .catch(() => {
          setIsLoading(false);
          Toast.fire({
            icon: "warning",
            title: "<p style='direction:rtl'>اطلاعات وارد شده وجود ندارد</p>",
            width: "330px",
            padding: "1rem",
          });
        });
    } else {
      Toast.fire({
        icon: "warning",
        iconColor: "red",
        title: "<p style='direction:rtl'>اطلاعات خواسته شده را به درستی پرکنید</p>",
        width: "310px",
        padding: "0 1rem",
      });
    }
  };
  // swal alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  // ................. input value
  const [inPhone, setInPhone] = useState("");
  const [inPass, setInPass] = useState("");
  const regexNumber = /^(97[0-9]{8}|98[0-9]{8}|99[0-9]{8}|400[0-9]{8}|401[0-9]{8}|402[0-9]{8}403[0-9]{8}404[0-9]{8})$/;
  const regexPhone = /^09\d{9}$/;
  const msgPhone = "شماره دانشجویی درست نیست";

  //// start : up and down span
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const refInputPhone = useRef(null);
  const refInputPass = useRef(null);

  const handleFocus = (element) => {
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const inputPhone = refInputPhone.current;
    const inputPass = refInputPass.current;

    const target = element.target.dataset.set;
    if (target == "phone") {
      phone.style.marginTop = "-24px";
      phone.style.color = "black";
      phone.style.fontSize = "0.9rem";
      phone.style.backgroundColor = "rgb(255, 174, 0)";
      inputPhone.style.borderColor = "white";
    } else if (target == "pass") {
      pass.style.marginTop = "-24px";
      pass.style.color = "black";
      pass.style.fontSize = "0.9rem";
      refEyeIcon.current.style.display = "block";
      pass.style.backgroundColor = "rgb(255, 174, 0)";
      inputPass.style.borderColor = "white";
    }
  };
  const handleClose = (element) => {
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const inputPhone = refInputPhone.current;
    const inputPass = refInputPass.current;
    const target = element.target.dataset.set;
    const lenValue = element.target.value.length;
    if (target == "phone") {
      if (lenValue != 0) return;
      phone.style.marginTop = "0";
      phone.style.color = "rgba(255, 255, 255, 0.523)";
      phone.style.fontSize = "0.8rem";
      phone.style.backgroundColor = "transparent";
      inputPhone.style.borderColor = "transparent";
      inputPhone.style.borderBottomColor = "white";
    } else if (target == "pass") {
      if (lenValue != 0) return;
      pass.style.marginTop = "0";
      pass.style.color = "rgba(255, 255, 255, 0.523)";
      pass.style.fontSize = "0.8rem";
      refEyeIcon.current.style.display = "none";
      pass.style.backgroundColor = "transparent";
      inputPass.style.borderColor = "transparent";
      inputPass.style.borderBottomColor = "white";
    }
  };
  // ..................
  //// end : up and down span
  return (
    <>
      {isLoading ? (
        <div className={styles.loadingSign}>
          <p>صبر کنید</p>
          <div className={styles.dots}></div>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.container}>
        <p className={styles.title_login}>بازیابی رمز عبور</p>
        <div className={styles.loginBox}>
          <div className={styles.phone_login}>
            <span ref={refPhoneSpan}>شماره دانشجویی</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputPhone}
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
            <img onClick={handleEye} ref={refEyeIcon} className={styles.eyepassword} alt="" />
            <span ref={refPassSpan}>شماره تلفن</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputPass}
              autoComplete="off"
              data-set="pass"
              onChange={(element) => {
                setInPass(element.target.value);
              }}
            />
            <img src={phoneicon} alt="" />
          </div>
          <div className={styles.submitbox}>
            <input onClick={handleButtonLogin} className={styles.submitLogin} type="submit" value="بازیابی" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
