/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./SignUp.module.scss";
import iconname from "../../assets/loginpage/user-outlined.svg";
import iconphone from "../../assets/loginpage/phone.svg";
import iconuid from "../../assets/loginpage/user-id-broken.svg";
import iconpass from "../../assets/loginpage/lock-password.svg";
function SignUp() {
  const [inName, setInName] = useState("");
  const [inPhone, setInPhone] = useState("");
  const [inPass, setInPass] = useState("");
  const [uid, setUid] = useState("");
  const [inConfirm, setInConfirm] = useState("");
  const [catchCode, setCatchCode] = useState("");
  const [msgErr, setMsgErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [inputCaptcha, setInputCaptcha] = useState(false);
  const history = useHistory();
  const regexPersian = /^[\u0600-\u06FF\s]+ [\u0600-\u06FF\s]+$/;
  const regexNumber = /^09\d{9}$/;
  const regexUid = /^(97[0-9]{8}|98[0-9]{8}|99[0-9]{8}|400[0-9]{8}|401[0-9]{8}|402[0-9]{8}403[0-9]{8}404[0-9]{8})$/;
  const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const regexConfirm = /^[0-9]{6}$/;

  const msgUid = "شماره دانشجویی اشتباه است";
  const msgName = "نام خود را کامل وارد کنید";
  const msgPhone = "شماره خود را کامل کنید";
  const msgPassword = "حداقل 8 کاراکتر و شامل حرف انگلیسی و عدد";
  const msgConfirm = "کد ارسالی به شماره خود را وارد کنید";

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
  // handle post signup
  const handlePostSingup = () => {
    if (regexPersian.test(inName) && regexNumber.test(inPhone) && regexPass.test(inPass) && regexUid.test(uid)) {
      setIsLoading(true);
      setInputCaptcha(true);
      if (captchaValue) return;
    } else {
      if (!regexPersian.test(inName) || inName == "")
        Toast.fire({
          icon: "warning",
          title: "<p style='direction:rtl'>نام خود را کامل وارد کنید</p>",
          width: "300px",
          iconColor: "red",
        });
      else if (!regexUid.test(uid) || uid == "")
        Toast.fire({
          icon: "warning",
          title: "<p style='direction:rtl'>شماره دانشجویی اشتباه است</p>",
          width: "330px",
          iconColor: "red",
        });
      else if (!regexNumber.test(inPhone) || inPhone == "")
        Toast.fire({
          icon: "warning",
          title: "<p style='direction:rtl'>شماره تلفن درست نیست</p>",
          width: "310px",
          iconColor: "red",
        });
      else if (!regexPass.test(inPass) || inPass == "")
        Toast.fire({
          icon: "warning",
          iconColor: "red",
          title: "<p style='direction:rtl'>فرمت پسورد درست نیست</p>",
          width: "310px",
        });
    }
  };

  // swal alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    padding: "10px",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const ToastConfirm = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    padding: "10px",
  });

  //// start span up even click input
  const refNameSpan = useRef(null);
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const refUidSpan = useRef(null);
  const refConfirmSpan = useRef(null);
  const refInputName = useRef(null);
  const refInputPhone = useRef(null);
  const refInputPass = useRef(null);
  const refInputUid = useRef(null);
  const refInputConfirm = useRef(null);

  const handleFocus = (element) => {
    const sname = refNameSpan.current;
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const uidspan = refUidSpan.current;
    const confspan = refConfirmSpan.current;
    const inputName = refInputName.current;
    const inputPhone = refInputPhone.current;
    const inputPass = refInputPass.current;
    const inputConfirm = refInputConfirm.current;
    const inputUid = refInputUid.current;

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
      pass.style.backgroundColor = "rgb(255, 174, 0)";
      inputPass.style.borderColor = "white";
    } else if (target == "name") {
      sname.style.marginTop = "-24px";
      sname.style.color = "black";
      sname.style.fontSize = "0.9rem";
      sname.style.backgroundColor = "rgb(255, 174, 0)";
      inputName.style.borderColor = "white";
    } else if (target == "uid") {
      uidspan.style.marginTop = "-24px";
      uidspan.style.color = "black";
      uidspan.style.fontSize = "0.9rem";
      uidspan.style.backgroundColor = "rgb(255, 174, 0)";
      inputUid.style.borderColor = "white";
    } else if (target == "confirm") {
      confspan.style.marginTop = "-24px";
      confspan.style.color = "black";
      confspan.style.fontSize = "0.9rem";
      confspan.style.backgroundColor = "rgb(255, 174, 0)";
      inputConfirm.style.borderColor = "white";
    }
  };
  const handleClose = (element) => {
    const sname = refNameSpan.current;
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const uidspan = refUidSpan.current;
    const confspan = refConfirmSpan.current;
    const inputName = refInputName.current;
    const inputPhone = refInputPhone.current;
    const inputPass = refInputPass.current;
    const inputConfirm = refInputConfirm.current;
    const inputUid = refInputUid.current;

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
      pass.style.backgroundColor = "transparent";
      inputPass.style.borderColor = "transparent";
      inputPass.style.borderBottomColor = "white";
    } else if (target == "name") {
      if (lenValue != 0) return;
      sname.style.marginTop = "0";
      sname.style.color = "rgba(255,255,255,0.523)";
      sname.fontSize = "0.8rem";
      sname.style.backgroundColor = "transparent";
      inputName.style.borderColor = "transparent";
      inputName.style.borderBottomColor = "white";
    } else if (target == "uid") {
      if (lenValue != 0) return;
      uidspan.style.marginTop = "0";
      uidspan.style.color = "rgba(255,255,255,0.523)";
      uidspan.fontSize = "0.8rem";
      uidspan.style.backgroundColor = "transparent";
      inputUid.style.borderColor = "transparent";
      inputUid.style.borderBottomColor = "white";
    } else if (target == "confirm") {
      if (lenValue != 0) return;
      confspan.style.marginTop = "0";
      confspan.style.color = "rgba(255,255,255,0.523)";
      confspan.fontSize = "0.8rem";
      confspan.style.backgroundColor = "transparent";
      inputConfirm.style.borderColor = "transparent";
      inputConfirm.style.borderBottomColor = "white";
    }
  };
  //// end span up even click input
  const completeSignup = () => {
    if (!regexPersian.test(inName) && !regexNumber.test(inPhone) && !regexPass.test(inPass) && !regexUid.test(uid)) {
      ToastConfirm.fire({
        icon: "warning",
        title: `<p style='direction:rtl'>اطلاعات مورد نیاز پر نشده</p>`,
        width: "310px",
      });
      return;
    }
    setIsLoading(true);
    let data = {
      full_name: inName,
      phone_number: inPhone,
      password: inPass,
      student_id: uid,
      code: inConfirm,
    };
    axios({
      method: "post",
      url: `${process.env.VITE_API_URL}/api/v1/auth/register/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    })
      .then((res) => {
        // send user to home page
        // redirect user and save token to local storage
        const token = res.data.token;
        setIsLoading(false);
        localStorage.setItem("token", token);
        history.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        let myerror = err.response.data;
        let howmsg = myerror.phone_number || myerror.detail || myerror.student_id;
        setMsgErr(howmsg);
        setCatchCode(false);
      });
  };

  // captcha
  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  useEffect(() => {
    setInputCaptcha(false);
    if (captchaValue) {
      // let data = {
      //   phone_number: inPhone,
      //   recaptchaToken: captchaValue,
      // };
      // send to backend for auth
      // axios({
      //   method: "post",
      //   url: `${process.env.VITE_API_URL}/api/v1/send-code/`,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: JSON.stringify(data),
      // })
      //   .then(() => {
      //     setCatchCode(true);
      //     setIsLoading(false);
      //     setInputCaptcha(false);
      //   })
      //   .catch((err) => {
      //     let howmsg = err.response.data.status || err.response.data.detail;
      //     setMsgErr(howmsg);
      //     setCatchCode(false);
      //     setIsLoading(false);
      //     setInputCaptcha(false);
      //   });
    }
  }, [captchaValue]);

  return (
    <>
      {inputCaptcha || isLoading ? (
        <div className={styles.loadingSign}>
          {isLoading ? (
            <div>
              <p>{inputCaptcha ? "در انتظار شما" : "صبر کنید"}</p>
              <div className={styles.dots}></div>
            </div>
          ) : (
            <></>
          )}
          {inputCaptcha ? <ReCAPTCHA sitekey={process.env.KEY_CAPTCHA} onChange={handleRecaptchaChange} /> : <></>}
        </div>
      ) : (
        <></>
      )}
      <div className={styles.container}>
        <p className={styles.title_signup}>ثبت نام جدید</p>
        <div className={styles.signupBox}>
          <div className={styles.name_signup}>
            <span ref={refNameSpan}>نام و نام خانوادگی</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputName}
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
            {(regexPersian.test(inName) && inName.length > 6) || inName.length == 0 ? (
              <></>
            ) : (
              <p className={styles.errorInput}>{msgName}</p>
            )}
            <img src={iconname} alt="" />
          </div>
          <div className={styles.uid_signup}>
            <span ref={refUidSpan}>شماره دانشجویی</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputUid}
              type="text"
              autoComplete="off"
              data-set="uid"
              onChange={(element) => {
                setUid(element.target.value);
              }}
            />
            {regexUid.test(uid) || uid.length == 0 ? <></> : <p className={styles.errorInput}>{msgUid}</p>}
            <img src={iconuid} alt="" />
          </div>
          <div className={styles.phone_signup}>
            <span ref={refPhoneSpan}>شماره تلفن</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputPhone}
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
            {regexNumber.test(inPhone) || inPhone.length == 0 ? <></> : <p className={styles.errorInput}>{msgPhone}</p>}
            <img src={iconphone} alt="" />
          </div>
          <div className={styles.password_signup}>
            <span ref={refPassSpan}>رمز عبور</span>
            <input
              onBlur={handleClose}
              onFocus={handleFocus}
              ref={refInputPass}
              type="text"
              autoComplete="off"
              data-set="pass"
              onChange={(element) => {
                setInPass(element.target.value);
              }}
            />
            {regexPass.test(inPass) || inPass.length == 0 ? <></> : <p className={styles.errorInput}>{msgPassword}</p>}
            <img src={iconpass} alt="" />
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
            <button onClick={handlePostSingup}>دریافت کد</button>
          </div>
          <div className={styles.submitbox}>
            <input onClick={completeSignup} className={styles.submitLogin} type="submit" value="ثبت نام" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
