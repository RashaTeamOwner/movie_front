import styles from "./HeaderHomePage.module.scss";
import landimg from "../../assets/landing/landimg.jpg";
import { Link } from "react-router-dom";
import chair from "../../assets/landing/chair.svg";
import useLogedin from "../../hooks/useLogedin";
import Swal from "sweetalert2";
import { useState } from "react";

function HeaderHomePage() {
  const isUserLoggedIn = useLogedin();
  const [selectedChair, setSelectedChair] = useState([]);
  const [arrLeft, setArrLeft] = useState([
    [1, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0],
  ]);
  const [arrRight, setArrRight] = useState([
    [0, 0, 0, 1, 1, 0, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 1, 1],
  ]);

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
      Toast.fire({
        icon: "success",
        title: "<p style='direction:rtl'>با موفقیت ثبت شد</p>",
        width: "300px",
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
    if (getStatus == "0") {
      Toast.fire({
        icon: "warning",
        title: "<p style='direction:rtl'>این صندلی رزرو شده</p>",
        width: "300px",
        iconColor: "red",
      });
      setSelectedChair([]);
    } else if (getStatus == "2") {
      return;
    } else {
      let splitArr = getTabIndex.split("");
      setSelectedChair(splitArr);
    }
    console.log(selectedChair);
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
  return (
    <div className={styles.container}>
      <div className={styles.intoContainer}>
        <div className={styles.landImg}>
          <img src={landimg} alt="landingImg" />
        </div>
        <div className={styles.landboxDetail}>
          <div className={styles.landDetail}>
            <div className={styles.landDetailinto}>
              <p>
                این هفته با فیلم <span>Blonde</span> همراه شماییم
              </p>
              <p>مدت : 135 دقیقه</p>
              <div className={styles.routeUpper}>
                <p>2 نفر تا تکمیل ظرفیت حداقلی</p>
                <div className={styles.animeRoute}>
                  <div></div>
                </div>
                <p>تعداد رزروها : 23 نفر</p>
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
                  <span>خلاصه داستان</span> : داستان مرلین مونرو بازیگر آمریکایی که زندگی عشقی و حرفه ای او را پوشش می دهد
                </h4>
              </div>
              <img src={landimg} alt="poster" />
            </div>
          </div>
          <div className={styles.timeIncoming}>
            <div>
              <h3>سه شنبه سوم دی ماه</h3>
              <p>ساعت 16</p>
            </div>
            <div className={styles.boxChairs}>
              <div className={styles.boxChairsRight}>
                {arrRight.map((index, i) => {
                  return index.map((item, j) => {
                    if (selectedChair[0] == "R" && selectedChair[1] == i + 1 && selectedChair[2] == index.length - j) {
                      return (
                        <div key={Math.random() * 987654321}>
                          <img
                            src={chair}
                            alt=""
                            data-status="2"
                            onClick={checkChairStatus}
                            data-tab={`R${i + 1}${index.length - j}`}
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
                          <img src={chair} alt="" data-tab={`R${i + 1}${index.length - j}`} data-status="1" onClick={checkChairStatus} />
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
                            data-tab={`R${i + 1}${index.length - j}`}
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
              <div className={styles.boxChairsLeft}>
                {arrLeft.map((index, i) => {
                  return index.map((item, j) => {
                    if (selectedChair[0] == "L" && selectedChair[1] == i + 1 && selectedChair[2] == index.length - j) {
                      return (
                        <div key={Math.random() * 987654321}>
                          <img
                            src={chair}
                            alt=""
                            data-status="2"
                            onClick={checkChairStatus}
                            className={styles.selectChair}
                            data-tab={`R${i + 1}${index.length - j}`}
                            style={{
                              filter: "invert(59%) sepia(42%) saturate(1115%) hue-rotate(0deg) brightness(102%) contrast(103%)",
                            }}
                          />
                        </div>
                      );
                    } else if (item == 0) {
                      return (
                        <div key={Math.random() * 987654321}>
                          <img src={chair} alt="" data-status="1" data-tab={`L${i + 1}${index.length - j}`} onClick={checkChairStatus} />
                        </div>
                      );
                    } else {
                      return (
                        <div key={Math.random() * 987654321}>
                          <img
                            src={chair}
                            alt=""
                            data-status="0"
                            data-tab={`L${i + 1}${index.length - j}`}
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
            </div>
            <div className={styles.someDetailChairs}>
              <p>رزرو شده ها</p>
              <p>صندلی خالی</p>
              <p>انتخاب شده</p>
            </div>
            <div className={styles.loginOrReserve}>
              {isUserLoggedIn ? (
                <a onClick={handleCheckChair} className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
                  ثبت بلیت
                </a>
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
}

export default HeaderHomePage;
