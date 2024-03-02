/* eslint-disable no-undef */
import ReCAPTCHA from "react-google-recaptcha";
import UseCaptcha from "../../hooks/UseCaptcha";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./ResetPassword.module.scss";
import phoneicon from "../../assets/loginpage/phone.svg";
import usericon from "../../assets/loginpage/user-outlined.svg";
import passicon from "../../assets/loginpage/lock-password.svg";
import { useRef, useState, useEffect, useMemo } from "react";
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
  const [msgErr, setMsgErr] = useState("");
  const [catchCode, setCatchCode] = useState("");
  const [tokenForReset, setTokenForReset] = useState("");
  const [readyToReset, setReadytoReset] = useState(false);
  const handleEye = () => {
    setEye(!eye);
  };

  const handleButtonLogin = () => {
    if (regexUuid.test(inUuid) && regexPhone.test(inPhone)) {
      let data = {
        code: inConfirm,
        phone_number: inPhone,
        student_id: inUuid,
      };
      setIsLoading(true);
      axios({
        method: "post",
        url: `${process.env.VITE_API_URL}/api/v1/auth/reset-password/`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      })
        .then((res) => {
          setIsLoading(false);
          setTokenForReset(res.data.token);
          setReadytoReset(true);
          Toast.fire({
            icon: "success",
            title: "<p style='direction:rtl'>رمز جدید خود را وارد نمایید</p>",
            width: "330px",
            padding: "1rem",
          });
        })
        .catch(() => {
          setIsLoading(false);
          Toast.fire({
            icon: "warning",
            title: "<p style='direction:rtl'>اطلاعات شما وجود ندارد یا اشتباه وارد کرده اید</p>",
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
  // // swal alert
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
  // ................. input pass
  const [inPass, setInPass] = useState("");
  const [inConfirmPass, setInConfirmPass] = useState("");
  const regexUuid = /^(97[0-9]{8}|98[0-9]{8}|99[0-9]{8}|400[0-9]{8}|401[0-9]{8}|402[0-9]{8}403[0-9]{8}404[0-9]{8})$/;
  const regexPhone = /^09\d{9}$/;
  const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const msgUuid = "شماره دانشجویی را کامل وارد کنید";
  const msgPhone = "شماره خود را درست وارد کنید";
  const msgConfirm = "کد ارسالی به شماره خود را وارد کنید";
  const msgPass = "رمز شامل حروف و عدد انگلیسی میباشد";
  const msgConfirmPass = "رمزی که وارد کرده اید یکسان نیست";
  const regexConfirm = /^[0-9]{6}$/;

  //// start : up and down span
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const refInputUuid = useRef(null);
  const refInputPhonenumber = useRef(null);
  const refInputConfirm = useRef(null);
  const refConfirmSpan = useRef(null);
  // span for reset inputs
  const refInputPass = useRef(null);
  const refInputConfirmPass = useRef(null);
  const refSpanPass1 = useRef(null);
  const refSpanPass2 = useRef(null);
  // handle close and open check user
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

  // handle close and open reset password
  const handleFocusPass = (element) => {
    const passSpan = refSpanPass1.current;
    const confirmSpan = refSpanPass2.current;
    const passInput = refInputPass.current;
    const confirmInput = refInputConfirmPass.current;

    const target = element.target.dataset.set;
    if (target == "pass1") {
      passSpan.style.marginTop = "-24px";
      passSpan.style.color = "black";
      passSpan.style.fontSize = "0.9rem";
      passSpan.style.backgroundColor = "rgb(255, 174, 0)";
      passInput.style.borderColor = "white";
    } else if (target == "pass2") {
      confirmSpan.style.marginTop = "-24px";
      confirmSpan.style.color = "black";
      confirmSpan.style.fontSize = "0.9rem";
      confirmSpan.style.backgroundColor = "rgb(255, 174, 0)";
      confirmInput.style.borderColor = "white";
    }
  };
  const handleClosePass = (element) => {
    const passSpan = refSpanPass1.current;
    const confirmSpan = refSpanPass2.current;
    const passInput = refInputPass.current;
    const confirmInput = refInputConfirmPass.current;
    const target = element.target.dataset.set;
    const lenValue = element.target.value.length;
    if (target == "pass1") {
      if (lenValue != 0) return;
      passSpan.style.marginTop = "0";
      passSpan.style.color = "rgba(255, 255, 255, 0.523)";
      passSpan.style.fontSize = "0.8rem";
      passSpan.style.backgroundColor = "transparent";
      passInput.style.borderColor = "transparent";
      passInput.style.borderBottomColor = "white";
    } else if (target == "pass2") {
      if (lenValue != 0) return;
      confirmSpan.style.marginTop = "0";
      confirmSpan.style.color = "rgba(255, 255, 255, 0.523)";
      confirmSpan.style.fontSize = "0.8rem";
      confirmSpan.style.backgroundColor = "transparent";
      confirmInput.style.borderColor = "transparent";
      confirmInput.style.borderBottomColor = "white";
    }
  };
  //

  //// end : up and down span

  const handlePostReset = () => {
    if (timeoutCode) return;
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
    setInputCaptcha(false);
    if (captchaValue) {
      let data = {
        mode: "reset",
        phone_number: inPhone,
        student_id: inUuid,
        recaptchaToken: captchaValue,
      };
      // send to backend for auth
      axios({
        method: "post",
        url: `${process.env.VITE_API_URL}/api/v1/send-code/`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      })
        .then(() => {
          // save time sec
          let timeReq = new Date().getTime();
          localStorage.setItem("lastRequestTime", timeReq.toString());
          setTimeoutCode(true);
          setCatchCode(true);
          setIsLoading(false);
          setInputCaptcha(false);
        })
        .catch((err) => {
          let howmsg = err.response.data.status || err.response.data.detail;
          setMsgErr(howmsg);
          setCatchCode(false);
          setIsLoading(false);
          setInputCaptcha(false);
          setTimeoutCode(false);
        });
    }
  }, [captchaValue]);

  useEffect(() => {
    if (catchCode == true) {
      ToastConfirm.fire({
        icon: "success",
        title: `<p style='direction:rtl'>پیامک به شماره ${inPhone} ارسال شد</p>`,
        width: "310px",
      }).then(() => {
        setCatchCode("");
      });
    } else if (catchCode == false && catchCode !== "") {
      ToastConfirm.fire({
        icon: "warning",
        title: `<p style='direction:rtl'>${msgErr}</p>`,
        width: "350px",
      }).then(() => {
        setMsgErr("");
        setCatchCode("");
      });
    }
  }, [catchCode]);

  // swal alert
  const ToastConfirm = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    padding: "10px",
  });

  useMemo(() => {
    if (!timeoutCode) {
      return;
    }
    // eslint-disable-next-line no-unused-vars
    else {
      const lastReq = localStorage.getItem("lastRequestTime");
      const currentTime = new Date().getTime();
      let timeleft = ((60000 - (currentTime - lastReq)) / 1000).toFixed();
      const intervalId = setInterval(() => {
        timeleft--;
        if (timeleft < 0) {
          setTimeLeft("دریافت کد");
          setTimeoutCode(false);
          clearInterval(intervalId);
        } else {
          setTimeLeft(`${timeleft} ثانیه`);
        }
      }, 1000);
    }
  }, [timeoutCode]);

  useEffect(() => {
    setInputCaptcha(false);
    if (captchaValue) {
      setTimeoutCode(true);
      // will comment
      setIsLoading(false);
    }
  }, [captchaValue]);

  const handleResetPassword = () => {
    if (inPass != inConfirmPass || inPass.length == 0) {
      Toast.fire({
        icon: "warning",
        title: "<p style='direction:rtl'>رمز وارد شده درست نیست</p>",
        width: "330px",
        padding: "1rem",
      });
    } else {
      setIsLoading(true);
      let data = {
        token: tokenForReset,
        password: inConfirmPass,
      };
      axios({
        method: "post",
        url: `${process.env.VITE_API_URL}/api/v1/auth/reset-password/complete/`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      })
        .then(() => {
          setIsLoading(false);
          Toast.fire({
            icon: "success",
            title: "<p style='direction:rtl'>رمز شما با موفقیت تغییر کرد</p>",
            width: "330px",
            padding: "1rem",
          });
          history.push("/signin");
        })
        .catch(() => {
          setIsLoading(false);
          Toast.fire({
            icon: "warning",
            title: "<p style='direction:rtl'>مشکلی رخ داد بعدا تلاش کنید</p>",
            width: "330px",
            padding: "1rem",
          });
        });
    }
  };

  if (!readyToReset) {
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
                type="number"
                name="text"
                data-set="phone"
                className={styles.input}
                autoComplete="off"
                value={inUuid}
                onChange={(element) => {
                  setInUuid(element.target.value);
                }}
              />
              {regexUuid.test(inUuid) || inUuid.length == 0 ? <></> : <p className={styles.errorInput}>{msgUuid}</p>}
              <img src={usericon} alt="شماره دانشجویی" />
            </div>
            <div className={styles.password_login}>
              <img onClick={handleEye} ref={refEyeIcon} className={styles.eyepassword} alt="" />
              <span ref={refPassSpan}>شماره تلفن</span>
              <input
                onBlur={handleClose}
                onFocus={handleFocus}
                ref={refInputPhonenumber}
                autoComplete="off"
                type="number"
                data-set="pass"
                value={inPhone}
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
                type="number"
                autoComplete="off"
                data-set="confirm"
                onChange={(element) => {
                  setInConfirm(element.target.value);
                }}
              />
              {regexConfirm.test(inConfirm) || inConfirm.length == 0 ? <></> : <p className={styles.errorInput}>{msgConfirm}</p>}
              <button style={{ backgroundColor: timeoutCode ? "rgb(255, 187, 174)" : "greenyellow" }} onClick={handlePostReset}>
                {timeLeft}
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
  } else {
    return (
      <>
        {isLoading ? (
          <div className={styles.loadingSign}>
            <h1>
              <span> صبر </span>
              <span> کنید </span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </h1>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.container}>
          <p className={styles.title_login}> رمز جدید را وارد نمایید</p>
          <div className={styles.loginBox}>
            <div className={styles.phone_login}>
              <span ref={refSpanPass1}>رمز جدید</span>
              <input
                onBlur={handleClosePass}
                onFocus={handleFocusPass}
                ref={refInputPass}
                required=""
                type="text"
                name="text"
                data-set="pass1"
                className={styles.input}
                autoComplete="off"
                value={inPass}
                onChange={(element) => {
                  setInPass(element.target.value);
                }}
              />
              {regexPass.test(inPass) || inPass.length == 0 ? <></> : <p className={styles.errorInput}>{msgPass}</p>}
              <img src={passicon} alt="" />
            </div>
            <div className={styles.password_login}>
              <span ref={refSpanPass2}>تکرار رمز جدید</span>
              <input
                onBlur={handleClosePass}
                onFocus={handleFocusPass}
                ref={refInputConfirmPass}
                autoComplete="off"
                data-set="pass2"
                value={inConfirmPass}
                onChange={(element) => {
                  setInConfirmPass(element.target.value);
                }}
              />
              {inPass == inConfirmPass || inConfirmPass.length == 0 ? <></> : <p className={styles.errorInput}>{msgConfirmPass}</p>}
              <img src={passicon} alt="" />
            </div>
            <div className={styles.submitbox}>
              <input onClick={handleResetPassword} className={styles.submitLogin} type="submit" value="تغییر رمز" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ResetPassword;
