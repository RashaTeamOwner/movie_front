/* eslint-disable no-undef */
import ReCAPTCHA from "react-google-recaptcha";
import UseCaptcha from "../../hooks/UseCaptcha";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./ResetPassword.module.scss";
import usericon from "../../assets/loginpage/user-outlined.svg";
import phoneicon from "../../assets/loginpage/phone.svg";
import { useRef, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
function ResetPassword() {
  const history = useHistory();
  const refEyeIcon = useRef(null);
  const [eye, setEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutCode, setTimeoutCode] = useState(false);
  const { captchaValue, handleRecaptchaChange } = UseCaptcha();
  const [inputCaptcha, setInputCaptcha] = useState(false);
  const [timeLeft, setTimeLeft] = useState("دریافت کد");

  const handleEye = () => {
    setEye(!eye);
  };

  const handleButtonLogin = () => {
    if (regexUuid.test(inPhone) && regexPhone.test(inUuid)) {
      let data = {
        username: inPhone,
        password: inUuid,
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
  const [inUuid, setInUuid] = useState("");
  const [inConfirm, setInConfirm] = useState("");
  const regexUuid = /^(97[0-9]{8}|98[0-9]{8}|99[0-9]{8}|400[0-9]{8}|401[0-9]{8}|402[0-9]{8}403[0-9]{8}404[0-9]{8})$/;
  const regexPhone = /^09\d{9}$/;
  const msgUuid = "شماره دانشجویی درست نیست";
  const msgPhone = "شماره خود را درست وارد کنید";
  const msgConfirm = "کد ارسالی به شماره خود را وارد کنید";
  const regexConfirm = /^[0-9]{6}$/;

  //// start : up and down span
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const refInputUuid = useRef(null);
  const refInputPhonenumber = useRef(null);
  const refInputConfirm = useRef(null);
  const refConfirmSpan = useRef(null);

  const handleFocus = (element) => {
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const confirm = refConfirmSpan.current;
    const inputPhone = refInputUuid.current;
    const inputPass = refInputPhonenumber.current;
    const inputConfirm = refInputConfirm.current;

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
    } else if (target == "confirm") {
      confirm.style.marginTop = "-24px";
      confirm.style.color = "black";
      confirm.style.fontSize = "0.9rem";
      confirm.style.backgroundColor = "rgb(255, 174, 0)";
      inputConfirm.style.borderColor = "white";
    }
  };
  const handleClose = (element) => {
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const inputPhone = refInputUuid.current;
    const inputPass = refInputPhonenumber.current;
    const confirm = refConfirmSpan.current;
    const inputConfirm = refInputConfirm.current;
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
    } else if (target == "confirm") {
      if (lenValue != 0) return;
      confirm.style.marginTop = "0";
      confirm.style.color = "rgba(255, 255, 255, 0.523)";
      confirm.style.fontSize = "0.8rem";
      confirm.style.backgroundColor = "transparent";
      inputConfirm.style.borderColor = "transparent";
      inputConfirm.style.borderBottomColor = "white";
    }
  };
  // ..................
  //// end : up and down span

  const handlePostReset = () => {
    if (regexUuid.test(inUuid) && regexPhone.test(inPhone)) {
      setIsLoading(true);
      setInputCaptcha(true);
      if (captchaValue) return;
    } else {
      if (!regexUuid.test(inUuid) || inUuid == "")
        Toast.fire({
          icon: "warning",
          title: "<p style='direction:rtl'>شماره دانشجویی اشتباه است</p>",
          width: "330px",
          iconColor: "red",
        });
      else if (!regexPhone.test(inPhone) || inPhone == "")
        Toast.fire({
          icon: "warning",
          title: "<p style='direction:rtl'>شماره تلفن درست نیست</p>",
          width: "310px",
          iconColor: "red",
        });
    }
  };

  useEffect(() => {
    console.log(captchaValue);
    setInputCaptcha(false);
    if (captchaValue) {
      setTimeoutCode(true);
      // will comment
      setIsLoading(false);
    }
  }, [captchaValue]);

  useEffect(() => {
    if (!timeoutCode) return;
    // eslint-disable-next-line no-unused-vars
    let timeleft = 60;
    setInterval(() => {
      timeleft--;
      if (timeleft < 0) {
        setTimeLeft("دریافت کد");
        setTimeoutCode(false);
      } else {
        setTimeLeft(`${timeleft} ثانیه`);
      }
    }, 1000);
  }, [timeoutCode]);

  return (
    <>
      {inputCaptcha || isLoading ? (
        <div className={styles.loadingSign}>
          {isLoading ? (
            <h1>
              {!inputCaptcha ? (
                <>
                  <span> صبر </span>
                  <span> کنید </span>
                </>
              ) : (
                <>
                  <span> در </span>
                  <span> انتظار </span>
                  <span> شما </span>
                </>
              )}
              <span> . </span>
              <span> . </span>
              <span> . </span>
            </h1>
          ) : (
            <></>
          )}
          {inputCaptcha ? <ReCAPTCHA sitekey={process.env.KEY_CAPTCHA} onChange={handleRecaptchaChange} /> : <></>}
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
              ref={refInputUuid}
              required=""
              type="text"
              name="text"
              data-set="phone"
              className={styles.input}
              autoComplete="off"
              onChange={(element) => {
                setInUuid(element.target.value);
              }}
            />
            {regexUuid.test(inUuid) || inUuid.length == 0 ? <></> : <p className={styles.errorInput}>{msgUuid}</p>}
            <img src={usericon} alt="نام کاربری" />
          </div>
          <div className={styles.password_login}>
            <img onClick={handleEye} ref={refEyeIcon} className={styles.eyepassword} alt="" />
            <span ref={refPassSpan}>شماره تلفن</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputPhonenumber}
              autoComplete="off"
              data-set="pass"
              onChange={(element) => {
                setInPhone(element.target.value);
              }}
            />
            {regexPhone.test(inPhone) || inPhone.length == 0 ? <></> : <p className={styles.errorInput}>{msgPhone}</p>}
            <img src={phoneicon} alt="" />
          </div>
          <div className={styles.confirm_signup}>
            <span ref={refConfirmSpan}>کد دریافتی</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputConfirm}
              type="text"
              autoComplete="off"
              data-set="confirm"
              onChange={(element) => {
                setInConfirm(element.target.value);
              }}
            />
            {regexConfirm.test(inConfirm) || inConfirm.length == 0 ? <></> : <p className={styles.errorInput}>{msgConfirm}</p>}
            <button
              style={{ backgroundColor: timeoutCode ? "rgb(255, 187, 174)" : "greenyellow" }}
              onClick={timeoutCode ? handlePostReset : handlePostReset}
            >
              {timeoutCode ? timeLeft : timeLeft}
            </button>
          </div>
          <div className={styles.submitbox}>
            <input onClick={handleButtonLogin} className={styles.submitLogin} type="submit" value="بازیابی" />
            <Link to="/signin">ورود به حساب</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
