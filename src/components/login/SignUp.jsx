import { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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

  const regexPersian = /^[\u0600-\u06FF\s]+ [\u0600-\u06FF\s]+$/;
  const regexNumber = /^09\d{9}$/;
  const regexUid = /^(97[0-9]{8}|98[0-9]{8}|99[0-9]{8}|400[0-9]{8}|401[0-9]{8}|402[0-9]{8})$/;
  const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const regexConfirm = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const msgUid = "شماره دانشجویی اشتباه است";
  const msgName = "نام خود را کامل وارد کنید";
  const msgPhone = "شماره خودرا کامل کنید";
  const msgPassword = "حداقل 8 کاراکتر و شامل حرف انگلیسی و عدد";
  const msgConfirm = "کد ارسالی به شماره خود را وارد کنید";

  // handle post signup
  const handlePostSingup = () => {
    if (regexPersian.test(inName) && regexNumber.test(inPhone) && regexPass.test(inPass) && regexUid.test(uid)) {
      ToastConfirm.fire({
        icon: "success",
        title: `پیامک به شماره ${inPhone} ارسال شد`,
      });
      // let data = {
      //   full_name: inName,
      //   phone_number: inPhone,
      //   password: inPass,
      //   student_id: uid,
      // };
      // axios({
      //   method: "post",
      //   url: `http://192.168.175.168:8000/api/v1/auth/register/`,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: JSON.stringify(data),
      // })
      //   .then((res) => {
      //     alert(res.data);
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     alert(err);
      //     console.log(err);
      //   });
    } else {
      if (!regexPersian.test(inName) || inName == "")
        Toast.fire({
          icon: "warning",
          title: "نام خود را کامل وارد کنید",
        });
      else if (!regexUid.test(uid) || uid == "")
        Toast.fire({
          icon: "warning",
          title: "شماره دانشجویی اشتباه است",
        });
      else if (!regexNumber.test(inPhone) || inPhone == "")
        Toast.fire({
          icon: "warning",
          title: "شماره تلفن وارد شده اشتباه است",
        });
      else if (!regexPass.test(inPass) || inPass == "")
        Toast.fire({
          icon: "warning",
          iconColor: "red",
          title: "فرمت پسورد درست نیست",
        });
    }
  };

  // swal alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const ToastConfirm = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 30000,
    timerProgressBar: true,
  });

  //// start span up even click input
  const refNameSpan = useRef(null);
  const refPhoneSpan = useRef(null);
  const refPassSpan = useRef(null);
  const refUidSpan = useRef(null);
  const refConfirmSpan = useRef(null);

  const handleFocus = (element) => {
    const sname = refNameSpan.current;
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const uidspan = refUidSpan.current;
    const confspan = refConfirmSpan.current;

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
    } else if (target == "uid") {
      uidspan.style.marginTop = "-27px";
      uidspan.style.color = "rgba(255,255,255)";
      uidspan.style.fontSize = "0.9rem";
    } else if (target == "confirm") {
      confspan.style.marginTop = "-27px";
      confspan.style.color = "rgba(255,255,255)";
      confspan.style.fontSize = "0.9rem";
    }
  };
  const handleClose = (element) => {
    const sname = refNameSpan.current;
    const phone = refPhoneSpan.current;
    const pass = refPassSpan.current;
    const uidspan = refUidSpan.current;
    const confspan = refConfirmSpan.current;

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
    } else if (target == "uid") {
      if (lenValue != 0) return;
      uidspan.style.marginTop = "0";
      uidspan.style.color = "rgba(255,255,255,0.523)";
      uidspan.fontSize = "0.8rem";
    } else if (target == "confirm") {
      if (lenValue != 0) return;
      confspan.style.marginTop = "0";
      confspan.style.color = "rgba(255,255,255,0.523)";
      confspan.fontSize = "0.8rem";
    }
  };
  //// end span up even click input
  return (
    <div className={styles.container}>
      <p className={styles.title_signup}>ثبت نام جدید</p>
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
          {(regexPersian.test(inName) && inName.length > 6) || inName.length == 0 ? <></> : <p className={styles.errorInput}>{msgName}</p>}
          <img src={iconname} alt="" />
        </div>
        <div className={styles.uid_signup}>
          <span ref={refUidSpan}>شماره دانشجویی</span>
          <input
            onBlur={handleClose}
            onFocus={handleFocus}
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
          <input className={styles.submitLogin} type="submit" value="ثبت نام" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
