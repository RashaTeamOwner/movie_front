/* eslint-disable no-undef */
import styles from "./HeaderHomePage.module.scss";
import landimg from "../../assets/landing/landimg.jpg";
import { Link } from "react-router-dom";
import chair from "../../assets/landing/chair.svg";
import UseLogedin from "../../hooks/UseLogedin";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";

function HeaderHomePage() {
  const isUserLoggedIn = UseLogedin();
  const [selectedChair, setSelectedChair] = useState([]);
  const [resHead, setResHead] = useState([]);

  // true of false ke az samt server moshakhas mishe
  const [bookedSeat, setBookedSeat] = useState(false);
  // const [arrLeft, setArrLeft] = useState([]);
  const [arrLeft, setArrLeft] = useState([[0]]);
  const [arrRight, setArrRight] = useState([[0]]);
  const [loading, setLoading] = useState(false);
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
        const chairs = res.data.seats;
        setArrLeft(chairs.left_seats);
        setArrRight(chairs.right_seats);
        setResHead(res.data);
        setLoading(true);
        setBookedSeat(res.data.has_booked);
      })
      .catch((err) => {
        console.log(err);
        setResHead(res.data);
        setLoading(true);
      });
  }, []);

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
        // setBookedSeat(res.data.has_booked);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bookedSeat]);

  useEffect(() => {
    // animation progressbar
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
        .then((res) => {
          console.log(res.data);
          setBookedSeat(true);
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
            // x: 5,
            // y: 1,
          };
          console.log(data);
          axios({
            method: "post",
            url: `${process.env.VITE_API_URL}/api/v1/reserve/`,
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            data: data,
          })
            .then((res) => {
              console.log(res.data);
              setBookedSeat(false);
              Toast.fire({
                icon: "success",
                title: "<p style='direction:rtl'>با موفقیت رزرو شما حذف شد</p>",
                width: "320px",
              });
            })
            .catch((err) => {
              console.log(err);
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
    // if (!selectedChair == "") {
    //   setArrLeft([
    //     [1, 0, 0, 1, 1, 1, 1, 0],
    //     [0, 0, 0, 1, 1, 1, 1, 1],
    //     [0, 1, 0, 0, 1, 1, 0, 1],
    //     [0, 0, 0, 1, 1, 1, 1, 1],
    //     [1, 1, 0, 0, 1, 1, 0, 1],
    //     [1, 0, 0, 1, 1, 0, 0, 0],
    //   ]);
    //   setArrRight([
    //     [0, 0, 0, 1, 0, 0, 0, 1],
    //     [0, 1, 0, 1, 0, 1, 1, 1],
    //     [1, 0, 0, 1, 1, 0, 1, 0],
    //     [0, 0, 0, 1, 0, 1, 1, 1],
    //     [0, 0, 0, 0, 1, 1, 0, 1],
    //     [1, 0, 0, 1, 1, 0, 1, 1],
    //   ]);
    // }
  };
  if (loading) {
    return (
      <div className={styles.container} style={{ background: `url(${process.env.VITE_API_URL}${resHead.movie.banner})` }}>
        <div className={styles.intoContainer}>
          <div className={styles.landImg}>
            {/* <img src={landimg} alt="landingImg" /> */}
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
                  <p>{resHead.empty - 88} نفر تا تکمیل ظرفیت حداقلی</p>
                  <div className={styles.animeRoute}>
                    <div></div>
                  </div>
                  <p>تعداد رزروها : {resHead.filled} نفر</p>
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
              <div>
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
                    <p className={styles.bookedSeats}>بلیت شما برای این فیلم رزرو شد</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.containerLoading}>
        <p>... صبر کنید</p>
      </div>
    );
  }
}

export default HeaderHomePage;
