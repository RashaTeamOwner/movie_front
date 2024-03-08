/* eslint-disable no-undef */
import styles from "./HeaderHomePage.module.scss";
import { Link } from "react-router-dom";
import chair from "../../assets/landing/chair.svg";
import UseLogedin from "../../hooks/UseLogedin";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import iheicon from "../../assets/landing/ihe.png";
import UseConfetti from "../../hooks/UseConfetti";

function HeaderHomePage() {
  const [selectedChair, setSelectedChair] = useState([]);
  const [resHead, setResHead] = useState([]);
  const [messageSeat, setMessageSeat] = useState(0);
  // true of false ke az samt server moshakhas mishe
  const [bookedSeat, setBookedSeat] = useState(false);
  // const [arrLeft, setArrLeft] = useState([]);
  const [arrLeft, setArrLeft] = useState([[0]]);
  const [arrRight, setArrRight] = useState([[0]]);
  const [loading, setLoading] = useState(false);
  const [conf, setConf] = useState(false);
  const isUserLoggedIn = UseLogedin();
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.VITE_API_URL}/api/v1/`,
      headers: {
        Authorization:
          localStorage.getItem("token") != null ? `Token ${localStorage.getItem("token")}` : `Tokene ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        localStorage.setItem("watch_list", JSON.stringify(res.data.watch_list));
        const chairs = res.data.seats;
        setArrLeft(chairs.left_seats);
        setArrRight(chairs.right_seats);
        setResHead(res.data);
        setLoading(true);
        setBookedSeat(res.data.has_booked);
      })
      .catch(() => {
        // console.log(err);
        setResHead(res.data);
        setLoading(true);
      });
  }, []);

  const howRowCol = (leftArr, rightArr) => {
    let arrMix = leftArr.concat(rightArr);
    let flat = [].concat.apply([], arrMix);
    let col = flat.indexOf(2);
    let row = -1;
    if (col != -1)
      // found, now need to extract the row
      while (arrMix[++row].length <= col)
        // not this row
        col -= arrMix[row].length; // so adjust and try again
    if (row + 1 > 7) {
      setMessageSeat(`سمت راست سالن , ردیف ${row + 1 - 7} , صندلی ${col + 1}`);
    } else if (row + 1 == 0) {
      setMessageSeat(0);
    } else {
      setMessageSeat(`سمت چپ سالن , ردیف ${row + 1} , صندلی ${col + 1}`);
    }
  };

  useEffect(() => {
    setSelectedChair([]);
    axios({
      method: "get",
      url: `${process.env.VITE_API_URL}/api/v1/`,
      headers: {
        Authorization:
          localStorage.getItem("token") != null ? `Token ${localStorage.getItem("token")}` : `Tokene ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const chairs = res.data.seats;
        setArrLeft(chairs.left_seats);
        setArrRight(chairs.right_seats);
        setResHead(res.data);
        howRowCol(chairs.left_seats, chairs.right_seats);
      })
      .catch(() => {
        // console.log(err);
      });
  }, [bookedSeat]);

  const refDivProgress = useRef(null);

  useEffect(() => {
    // animation progressbar
    const boxProgress = refDivProgress.current;
    const emptyChair = resHead.filled + resHead.empty - 88;
    const filledChair = resHead.filled;
    let widthProgress = (filledChair / emptyChair) * 100;
    if (!boxProgress) return;
    boxProgress.style.width = `${widthProgress}%`;
    boxProgress.style.transition = "1s";
    if (widthProgress == 100) {
      boxProgress.style.backgroundColor = "rgb(0, 174, 122)";
    } else if (widthProgress <= 50 && widthProgress >= 5) {
      boxProgress.style.backgroundColor = "rgb(255, 72, 72)";
    } else {
      boxProgress.style.backgroundColor = "#ffa500";
    }
  }, [resHead]);

  // swal alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    padding: "10px",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleCheckChair = () => {
    setConf(false);
    if (!selectedChair.length == 0) {
      let data = {
        side: selectedChair[0] == "L" ? "left" : "right",
        x: selectedChair[1],
        y: selectedChair[2],
      };
      axios({
        method: "post",
        url: `${process.env.VITE_API_URL}/api/v1/reserve/`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        data: data,
      })
        .then(() => {
          setBookedSeat(true);
          setConf(true);
          Toast.fire({
            icon: "success",
            title: "<p style='direction:rtl'>با موفقیت صندلی شما ثبت شد</p>",
            width: "340px",
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "warning",
            title: `<p style='direction:rtl'>${err.response.data.status}</p>`,
            width: "300px",
          });
        });
    } else {
      Toast.fire({
        icon: "warning",
        title: "<p style='direction:rtl'>یک صندلی انتخاب کنید</p>",
        width: "300px",
      });
    }
  };
  const checkChairStatus = (element) => {
    let getStatus = element.target.dataset.status;
    let getTabIndex = element.target.dataset.tab;
    if (!isUserLoggedIn) {
      Toast.fire({
        icon: "warning",
        title: "<p style='direction:rtl'>وارد حساب خود نشده اید</p>",
        width: "300px",
        iconColor: "red",
      });
      return;
    }
    if (getStatus == "0") {
      Toast.fire({
        icon: "warning",
        title: "<p style='direction:rtl'>این صندلی رزرو شده</p>",
        width: "300px",
        iconColor: "red",
      });
      setSelectedChair([]);
    } else if (getStatus == "2") {
      Swal.fire({
        title: `<p style="font-size:1.1rem ; font-family:sansx100">آیا میخواهید صندلی رزرو خود را حذف کنید؟</p>`,
        icon: "warning",
        iconHtml: "?",
        confirmButtonText: "<p style='font-size:1.1rem ; font-family:sansx100'>بله</p>",
        cancelButtonText: "<p style='font-size:1.1rem ; font-family:sansx100'>خیر</p>",
        cancelButtonColor: "rgb(255, 71, 71)",
        confirmButtonColor: "rgb(47, 112, 0)",
        showCancelButton: true,
        showCloseButton: true,
        width: "300px",
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            side: getTabIndex[0] == "L" ? "left" : "right",
            x: parseInt(getTabIndex.substring(1, 2)),
            y: parseInt(getTabIndex.substring(2)),
          };
          axios({
            method: "post",
            url: `${process.env.VITE_API_URL}/api/v1/reserve/`,
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            data: data,
          })
            .then(() => {
              setBookedSeat(false);
              Toast.fire({
                icon: "success",
                title: "<p style='direction:rtl'>با موفقیت رزرو شما حذف شد</p>",
                width: "320px",
              });
            })
            .catch((err) => {
              Toast.fire({
                icon: "warning",
                title: `<p style='direction:rtl'>${err.response.data.status}</p>`,
                width: "300px",
              });
            });
        }
      });
      return;
    } else if (bookedSeat) {
      Toast.fire({
        icon: "warning",
        title: "<p style='direction:rtl'>شما یک صندلی رزرو کرده اید</p>",
        width: "320px",
        iconColor: "red",
      });
    } else {
      let splitArr = [getTabIndex[0], parseInt(getTabIndex.substring(1, 2)), parseInt(getTabIndex.substring(2))];
      setSelectedChair(splitArr);
    }
  };
  if (loading) {
    return (
      <div className={styles.container} style={{ background: `url(${process.env.VITE_API_URL}${resHead.movie.banner})` }}>
        <img className={styles.iheicon} src={iheicon} alt="" />
        <div className={styles.intoContainer}>
          <div className={styles.landImg}>
            <img src={`${process.env.VITE_API_URL}${resHead.movie.image}`} alt="" />
          </div>
          <div className={styles.landboxDetail}>
            <div className={styles.landDetail}>
              <div className={styles.landDetailinto}>
                <p>
                  این هفته با فیلم <span>{resHead.movie.name}</span> همراه شماییم
                </p>
                <p>مدت : {resHead.movie.duration} دقیقه</p>
                <div className={styles.routeUpper}>
                  {resHead.filled + resHead.empty - 88 - resHead.filled == 0 ? (
                    <p>ظرفیت حداقلی تکمیل شده و فیلم برگزار میشود</p>
                  ) : (
                    <p>{resHead.empty - 88} نفر تا تکمیل ظرفیت حداقلی</p>
                  )}
                  <div className={styles.animeRoute}>
                    <div ref={refDivProgress}></div>
                  </div>
                  <p data-prog={resHead.empty - 88}>تعداد رزروها : {resHead.filled} نفر</p>
                </div>
              </div>
              <div className={styles.landDetailGenre}>
                <div>
                  <h4>
                    <span>محصول سال</span> : 2022
                  </h4>
                  <h4>
                    <span>ژانر</span> : درام , تاریخی
                  </h4>
                  <h4>
                    <span>محصول</span> : آمریکا
                  </h4>
                  <h4>
                    <span>خلاصه داستان : </span>
                    {resHead.movie.description}
                  </h4>
                </div>
                {/* <img src={landimg} alt="poster" /> */}
                <img src={`${process.env.VITE_API_URL}${resHead.movie.image}`} alt="" />
              </div>
            </div>
            <div className={styles.timeIncoming}>
              {isUserLoggedIn ? (
                <div className={styles.forcewelcome}>
                  <p>خوش اومدی {resHead.username} عزیز</p>
                  {bookedSeat ? (
                    <p>تاریخ اکران فیلم فراموشت نشه , منتظرت هستیم</p>
                  ) : (
                    <p>اگه دوست داری این فیلمو با هم ببینیم یه صندلی رزرو کن</p>
                  )}
                </div>
              ) : (
                <div className={styles.forcewelcome}>
                  <p>خوش اومدی مهمان عزیز</p>
                  <p>برای رزرو این فیلم لازمه ثبت نام کنی یا وارد حسابت بشی :)</p>
                </div>
              )}
              <div className={styles.showTimeCinema}>
                <h3>سه شنبه سوم دی ماه</h3>
                <p>ساعت 16</p>
              </div>
              <div className={styles.boxChairs}>
                <>
                  <div className={styles.boxChairsRight} style={{ gridTemplateColumns: `repeat(${arrRight[0].length},1fr)` }}>
                    {arrRight.map((index, i) => {
                      return index.map((item, j) => {
                        if (selectedChair[0] == "R" && selectedChair[1] == i + 1 && selectedChair[2] == j + 1) {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img
                                src={chair}
                                alt=""
                                data-status="2"
                                onClick={checkChairStatus}
                                data-tab={`R${i + 1}${j + 1}`}
                                className={styles.selectChair}
                                style={{
                                  filter: "invert(59%) sepia(42%) saturate(1115%) hue-rotate(0deg) brightness(102%) contrast(103%)",
                                }}
                              />
                            </div>
                          );
                        } else if (item == 0) {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img src={chair} alt="" data-tab={`R${i + 1}${j + 1}`} data-status="1" onClick={checkChairStatus} />
                            </div>
                          );
                        } else if (item == 2) {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img
                                src={chair}
                                alt=""
                                data-status="2"
                                onClick={checkChairStatus}
                                data-tab={`R${i + 1}${j + 1}`}
                                style={{
                                  filter: "invert(59%) sepia(42%) saturate(1115%) hue-rotate(0deg) brightness(102%) contrast(103%)",
                                }}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img
                                src={chair}
                                alt=""
                                data-status="0"
                                onClick={checkChairStatus}
                                data-tab={`R${i + 1}${j + 1}`}
                                style={{
                                  filter: "invert(34%) sepia(54%) saturate(4204%) hue-rotate(343deg) brightness(97%) contrast(101%)",
                                }}
                              />
                            </div>
                          );
                        }
                      });
                    })}
                  </div>
                  <div className={styles.boxChairsLeft} style={{ gridTemplateColumns: `repeat(${arrLeft[0].length},1fr)` }}>
                    {arrLeft.map((index, i) => {
                      return index.map((item, j) => {
                        if (selectedChair[0] == "L" && selectedChair[1] == i + 1 && selectedChair[2] == j + 1) {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img
                                src={chair}
                                alt=""
                                data-status="2"
                                onClick={checkChairStatus}
                                className={styles.selectChair}
                                data-tab={`L${i + 1}${j + 1}`}
                                style={{
                                  filter: "invert(59%) sepia(42%) saturate(1115%) hue-rotate(0deg) brightness(102%) contrast(103%)",
                                }}
                              />
                            </div>
                          );
                        } else if (item == 0) {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img src={chair} alt="" data-status="1" data-tab={`L${i + 1}${j + 1}`} onClick={checkChairStatus} />
                            </div>
                          );
                        } else if (item == 2) {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img
                                src={chair}
                                alt=""
                                data-status="2"
                                onClick={checkChairStatus}
                                data-tab={`L${i + 1}${j + 1}`}
                                style={{
                                  filter: "invert(59%) sepia(42%) saturate(1115%) hue-rotate(0deg) brightness(102%) contrast(103%)",
                                }}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div key={Math.random() * 987654321}>
                              <img
                                src={chair}
                                alt=""
                                data-status="0"
                                data-tab={`L${i + 1}${j + 1}`}
                                onClick={checkChairStatus}
                                style={{
                                  filter: "invert(34%) sepia(54%) saturate(4204%) hue-rotate(343deg) brightness(97%) contrast(101%)",
                                }}
                              />
                            </div>
                          );
                        }
                      });
                    })}
                  </div>
                </>
              </div>
              <div className={styles.someDetailChairs}>
                <p>رزرو شده ها</p>
                <p>صندلی خالی</p>
                <p>انتخاب شده</p>
              </div>
              <div className={styles.loginOrReserve}>
                {isUserLoggedIn ? (
                  bookedSeat ? (
                    <>
                      <p className={styles.bookedSeats}>بلیت شما برای این فیلم رزرو شد</p>
                      {messageSeat == 0 ? <></> : <p className={styles.bookedSeatsDetail}>{messageSeat}</p>}
                    </>
                  ) : (
                    <a onClick={handleCheckChair} className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
                      ثبت بلیت
                    </a>
                  )
                ) : (
                  <Link className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`} to="/signin">
                    ورود و رزرو بلیت
                  </Link>
                )}
                <UseConfetti onFire={conf} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.containerLoading}>
        <h1>
          <span> صبر </span>
          <span> کنید </span>
          <span> . </span>
          <span> . </span>
          <span> . </span>
        </h1>
      </div>
    );
  }
}

export default HeaderHomePage;
