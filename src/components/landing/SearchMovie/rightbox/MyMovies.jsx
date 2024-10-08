/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import styles from "./Mymovies.module.scss";
import Swal from "sweetalert2";
// import arrow from "../../../../assets/loginpage/arrow.svg";
import img1 from "../../../../assets/landing/upcoming/default.webp";
import starimg from "../../../../assets/landing/starmain.svg";
import addstar from "../../../../assets/landing/staradd.svg";
import UseWindowSize from "../../../../hooks/UseWindowSize";
import evaclose from "../../../../assets/landing/evaclose.svg"
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect, useReducer } from "react";
import axios from "axios";
import MoreDetailMyMovies from "./MoreDetailMyMovies";

const redStar = (state, action) => {
  if (action.type == 'initial-state') {
    return action.payload;
  }
  else {
    let change = state.map((item) => {
      if (item.id == action.id) {
        item.rate = action.rate;
      }
      return item;
    });
    return change;
  }
};

function MyMovies() {
  const window = UseWindowSize();
  const refStars = useRef(null);
  // const [renderStars, setRenderStars] = useState(null);
  // const [statusStars, setStatusStars] = useState({});
  // const [statusRate, setStatusRate] = useState([]);
  const [getWatch, setGetWatch] = useState([]);
  const [open, setOpen] = useState([]);
  // const [stars, setStars] = useState(null);
  const [showStar, setShowStar] = useState(false);
  const [reRender, setRerender] = useState("");
  const [handleStar, dispatchStar] = useReducer(redStar, []);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [movietoShow, setMovietoShow] = useState({});
  const [deepBackground, setDeepBackground] = useState(false);
  const [linkEmbed, setLinkEmbed] = useState("");
  const [statusEmbed, setStatusEmbed] = useState(false);

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


  // set initial reducer with request
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.VITE_API_URL}/api/v1/watchlist/`,
      headers: {
        Authorization:
          localStorage.getItem("token") != null ? `Token ${localStorage.getItem("token")}` : `Tokene ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        localStorage.setItem("watch_list", JSON.stringify(res.data.watch_list));
      }).then(() => {
        let temp = JSON.parse(localStorage.getItem("watch_list"));
        let tempArr = [];
        if (temp) {
          temp.map((item) => {
            if (item.user_rating == null) {
              tempArr.push({ id: item.imdb_id, rate: -1 });
            } else {
              tempArr.push({ id: item.imdb_id, rate: item.user_rating });
            }
          });
        }
        dispatchStar({ type: 'initial-state', payload: tempArr });
      })
  }, [])
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("watch_list"));
    let tempArr = [];
    if (temp) {
      setGetWatch(temp);
      temp.map((item) => {
        if (item.user_rating == null) {
          tempArr.push({ id: item.imdb_id, rate: 0, status: false });
        } else {
          tempArr.push({ id: item.imdb_id, rate: item.user_rating, status: false });
        }
      });
      setOpen(tempArr);
    }
  }, [reRender, handleStar]);
  const handleStars = (event) => {
    const list = event.target.parentElement.children;
    for (let j = 9; j >= Number(event.target.dataset.set); j--) {
      let element = list[j];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
    for (let i = 0; i <= Number(event.target.dataset.set); i++) {
      list[i].style.filter = "none";
    }
  };
  const handleResetStars = (event) => {
    const list = event.target.parentElement.children;
    let idTarget = event.target.parentElement.dataset.imdb;
    let tempstar = -1;
    getWatch.map((item) => {
      if (item.imdb_id == idTarget) {
        tempstar = item.user_rating;
      }
    });
    for (let j = 9; j >= tempstar; j--) {
      let element = list[j];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
    for (let i = 0; i < tempstar; i++) {
      list[i].style.filter = "none";
    }
  };
  const selectStar = (event) => {
    let imdbId = event.target.parentElement.dataset.imdb;
    let userrateInhere = Number(event.target.dataset.set) + 1;
    let change = getWatch.map((item) => {
      if (item.imdb_id == imdbId) {
        item.user_rating = userrateInhere;
      }
      return item;
    });
    let temprate = 0;
    getWatch.map((item) => {
      if (imdbId == item.imdb_id) {
        temprate = item.user_rating;
      }
    });
    // axios
    let data = {
      rating: temprate,
      imdb_id: imdbId,
    };
    axios({
      method: "post",
      url: `${process.env.VITE_API_URL}/api/v1/rate/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      data: data,
    }).then(() => {
      let changeOpen = open.map((item) => {
        if (item.id == imdbId) {
          item.status = false;
        }
        return item;
      });
      setOpen(changeOpen);
      // show alert for set new rate
      getWatch.map((item) => {
        if (item.imdb_id === imdbId) {
          Toast.fire({
            icon: "success",
            title: `<p style='direction:rtl'>شما نمره <span style="color:red">${temprate}</span> را برای فیلم ${item.name.split(" - ")[0]} ثبت کردید</p>`,
            width: "330px",
            padding: "1rem",
          });
        }
      })
      axios({
        method: "get",
        url: `${process.env.VITE_API_URL}/api/v1/watchlist/`,
        headers: {
          Authorization:
            localStorage.getItem("token") != null ? `Token ${localStorage.getItem("token")}` : `Tokene ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        localStorage.setItem("watch_list", JSON.stringify(res.data.watch_list));
        dispatchStar({ rate: temprate, id: imdbId });
      });
    });
    setGetWatch(change);
  };

  const showStarsToPage = (event) => {
    let fatherelement = event.target.parentElement.children[3].children;
    let targetmovie = event.target.parentElement.children[3].dataset;
    let uesrRate = 0;
    let changeOpen = open.map((item) => {
      if (item.id == targetmovie.imdb) {
        item.status = true;
      }
      return item;
    });
    setOpen(changeOpen);
    getWatch.map((item) => {
      if (item.imdb_id == targetmovie.imdb) {
        if (item.user_rating != null) {
          uesrRate = item.user_rating;
        }
      }
    });
    // setRenderStars(stars + 1);
    // reset stars to select item
    // const starelement = refStars.current.children;
    for (let j = 9; j >= uesrRate; j--) {
      if (fatherelement[j] == undefined) return;
      fatherelement[j].style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
    for (let i = 0; i < uesrRate; i++) {
      fatherelement[i].style.filter = "none";
    }
    setShowStar(true);
  };

  const reomveFromWatchList = (imdbid) => {
    setLoading(true)
    // axios
    let data = {
      imdb_id: imdbid,
    };
    axios({
      method: "post",
      url: `${process.env.VITE_API_URL}/api/v1/remove-from-watchlist/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      data: data,
    }).then(() => {
      let changeOpen = open.map((item) => {
        if (item.id == imdbid) {
          item.status = false;
        }
        return item;
      });
      setOpen(changeOpen);
      axios({
        method: "get",
        url: `${process.env.VITE_API_URL}/api/v1/watchlist/`,
        headers: {
          Authorization:
            localStorage.getItem("token") != null ? `Token ${localStorage.getItem("token")}` : `Tokene ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        localStorage.setItem("watch_list", JSON.stringify(res.data.watch_list));
        setRerender(Math.random());
        setLoading(false)
      });
    });
  };

  const moreDetailShow = (event) => {
    setMovietoShow(event.target.dataset.movie);
    setShowPopup(true);
    setDeepBackground(true);
  }
  const closePop = () => {
    setShowPopup(false);
    setDeepBackground(false);
    setMovietoShow(null);
  }

  const runEmbed = (statusMovie, tmdbid) => {
    if (statusMovie == "movie") {
      setLinkEmbed(`https://vidsrc.xyz/embed/movie?imdb=${tmdbid}&ds_lang=fa`);
      setStatusEmbed(true);
    } else {
      setLinkEmbed(`https://vidsrc.xyz/embed/tv?imdb=${tmdbid}&ds_lang=fa`);
      setStatusEmbed(true);
    }
  }

  const closeEmbed = () => {
    setStatusEmbed(false);
    setLinkEmbed("")
  }

  if (getWatch.length != 0) {
    return (
      <div className={styles.mainContainer}>
        <div onClick={closePop} style={{ display: deepBackground ? "block" : "none" }} className={styles.deepbackground}></div>
        {loading ? <div className={styles.three_body}>
          <div className={styles.three_body__dot}></div>
          <div className={styles.three_body__dot}></div>
          <div className={styles.three_body__dot}></div>
        </div> :
          <div className={styles.body}>
            {statusEmbed ? <>
              <img onClick={closeEmbed} src={evaclose} alt="close" className={styles.closeEmbed} />
              <iframe className={styles.iframeStream} src={linkEmbed} allowFullScreen frameBorder="320"></iframe>
            </> : <></>}
            {showPopup ? <MoreDetailMyMovies movie={movietoShow} close={closePop} /> : <></>}
            <Swiper
              effect={"freemode"}
              grabCursor={false}
              centeredSlides={false}
              slidesPerView={"2.5"}
              freeMode
              direction={"vertical"}
              className={styles.mySwiper}
            >
              {getWatch.map((index, i) => {
                const [orgName, persName] = index.name.split(" - ");
                return (
                  <>
                    <SwiperSlide key={i} className={styles.swiperActors}>
                      <div
                        style={{
                          background:
                            window.width < 435
                              ? index.banner_path != null
                                ? `linear-gradient(45deg,rgba(0,0,0,0.63),rgba(0,0,0,0.87)),url("https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${index.banner_path
                                  .split("/")
                                  .join("")}&w=2048&q=75`
                                : `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.87)), url(${img1})`
                              : "none",
                        }}
                        className={styles.listMovie}
                      >
                        <img
                          src={
                            index.image_path == null
                              ? img1
                              : `https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${index.image_path
                                .split("/")
                                .join("")}&w=2048&q=75`
                          }
                          alt="movie"
                        />
                        <div className={styles.detailMovie}>
                          <h2>{orgName}</h2>
                          <div className={styles.votes}>
                            <div className={styles.addstarshow}>
                              <p>نمره شما :</p>
                              {getWatch[i].user_rating == null ? (
                                <p className={`${styles.textPointnone} ${open[i].status != false ? styles.textPointnoneverse : ""}`}>
                                  چیزی ثبت نکردی
                                </p>
                              ) : (
                                <p className={`${styles.textPoint} ${open[i].status != false ? styles.textPointverse : ""}`}>
                                  {getWatch[i].user_rating}
                                </p>
                              )}
                              {!open[i].status ? <img onClick={showStarsToPage} src={addstar} alt="" /> : <></>}
                              <div className={`${styles.yourRate} ${styles.numberStar}`} data-imdb={index.imdb_id} ref={refStars}>
                                {open[i].status ? (
                                  <>
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={0}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={1}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={2}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={3}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={4}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={5}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={6}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={7}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={8}
                                      src={starimg}
                                      alt="star"
                                    />
                                    <img
                                      onMouseEnter={handleStars}
                                      onMouseLeave={handleResetStars}
                                      onClick={selectStar}
                                      data-set={9}
                                      src={starimg}
                                      alt="star"
                                    />
                                    {/* {getWatch[i].user_rating != null ? (
                                  <p className={styles.sabt} onClick={() => handleAllStars(index.imdb_id)}>
                                    ثبت
                                  </p>
                                ) : (
                                  <></>
                                )} */}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <p>
                              نمره فیلم : <span>{index.imdb_rate}</span>
                            </p>
                            <p>
                              ژانر فیلم : <span>{index.genre}</span>
                            </p>
                          </div>
                          <div className={styles.divMoreOption}>
                            <button data-movie={JSON.stringify(index)} onClick={(event) => moreDetailShow(event)}>اطلاعات فیلم</button>
                            <button className={styles.streamVideo} onClick={() => runEmbed(index.link, index.imdb_id)}>پخش آنلاین</button>
                          </div>
                        </div>
                        <div className={styles.optionSetup}>
                          <button onClick={() => reomveFromWatchList(index.imdb_id)}>حذف فیلم</button>
                          {/* {index.link == "movie" ? */}
                          {/* <button className={styles.streamVideo} onClick={() => runEmbed(index.link, index.imdb_id)}>پخش آنلاین</button> */}
                        </div>
                      </div>
                    </SwiperSlide >
                  </>
                  // test
                );
              })}
            </Swiper>
          </div>}
      </div >
    );
  }
  else {
    return (
      <div className={styles.notexistmovie}>
        <p>فیلمی برای تماشا به لیست فیلم های موردعلاقت اضافه نکردی</p>
        <p>! کافیه جستجو کنی , تا آنلاین بتونی ببینی</p>
        <p>بعد دیدن فیلم نمره یادت نره</p>
      </div>
    )
  }
}
export default MyMovies;
