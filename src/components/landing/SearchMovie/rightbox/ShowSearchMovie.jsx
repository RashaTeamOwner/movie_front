/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import UseLogedIn from "../../../../hooks/UseLogedin";
import arrow from "../../../../assets/landing/arrow-up.svg";
import axios from "axios";
import styles from "./Showsearchmovie.module.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import listaddimg from "../../../../assets/landing/listadd.svg";
import bookadd from "../../../../assets/landing/bookadded.svg";
import LazyLoad from "react-lazy-load";


function ShowSearchMovie(props) {
  const logedinStatus = UseLogedIn();
  // const refStars = useRef(null);
  const [stars, setStars] = useState(null);
  const [movieshow, setMovieshow] = useState([]);
  const [posterBack, setPosterBack] = useState([]);
  const [actors, setActors] = useState([]);
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const KEYtmdb = process.env.VITE_KEY_TMDB;

  // image actors
  useEffect(() => {
    if (movieshow.Actors == undefined) return;
    else {
      const options = {
        headers: {
          accept: "application/json",
          Authorization: KEYtmdb,
        },
      };
      axios
        .get(
          `${process.env.VITE_URL_TMDB}/3/find/${movieshow.imdbID.toLowerCase()}?external_source=imdb_id&append_to_response=credits`,
          options
        )
        .then((response) => {
          if (response.data.movie_results[0] != undefined) {
            setPosterBack(response.data.movie_results[0]);
            return ["movie", response.data.movie_results[0].id];
          } else if (response.data.tv_results[0] != undefined) {
            setPosterBack(response.data.tv_results[0]);
            return ["tv", response.data.tv_results[0].id];
          }
        })
        .then((data) => {
          axios
            .get(`${process.env.VITE_URL_TMDB}/3/${data[0]}/${data[1]}?&append_to_response=credits`, options)
            .then((response) => {
              setActors(response.data.credits.cast);
            })
            .catch(() => {
              // console.error(error);
            });
        })
        .catch(() => {
          // console.error(error);
        });
    }
  }, [movieshow]);

  useEffect(() => {
    setStars(-1);
    // setRenderStars(0);
    setMovieshow([]);
    setPosterBack([]);
    setActors([]);

    const sendId = props.id;
    if (sendId == "") return;
    axios
      .get(`${process.env.VITE_URL_OMDB}/?i=${sendId}&apikey=${process.env.VITE_KEY_OMDB}`)
      .then((res) => {
        // send to my movies and watch list
        setMyList(res.data);
        // no translate if text is persian
        let regexlang = /^[\u0600-\u06FF\s]+$/;
        axios
          .post(`${process.env.VITE_API_URL}/api/v1/translate/`, res.data)
          .then((data) => {
            setMovieshow(data.data);
          })
          .catch(() => {
            setMovieshow(res.data);
          });
      })
      .catch(() => {
        // console.log(error);
      });
  }, [props.id]);

  // click actor
  const handleClickActor = (element) => {
    const idact = element.target.dataset.idactor;
    props.backActorId(idact);
  };

  const handleCloseDetailMovie = () => {
    props.backArrow(0);
  };
  const postToWatchList = () => {
    setLoading(true);
    console.log(movieshow, myList)
    let data = {
      name:
        String(posterBack.original_name) == "undefined"
          ? `${posterBack.original_title} - ${movieshow.Title}`
          : `${posterBack.original_name} - ${movieshow.Title}`,
      description: movieshow.Plot,
      imdb_id: myList.imdbID,
      imdb_rate: myList.imdbRating,
      link: myList.Type,
      genre: movieshow.Genre,
      image_path: posterBack.poster_path,
      banner_path: posterBack.backdrop_path,
      duration: movieshow.Runtime,
      country: movieshow.Country,
      year: movieshow.Year,
    };
    axios({
      method: "post",
      url: `${process.env.VITE_API_URL}/api/v1/add-to-watchlist/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      data: data,
    })
      .then(() => {
        // end loading
        setLoading(false);
        axios({
          method: "get",
          url: `${process.env.VITE_API_URL}/api/v1/watchlist`,
          headers: {
            Authorization:
              localStorage.getItem("token") != null ? `Token ${localStorage.getItem("token")}` : `Tokene ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
          res.data.watch_list.map((index) => {
            setWatchlist((prev) => [...prev, index.imdb_id]);
          });
          localStorage.setItem("watch_list", JSON.stringify(res.data.watch_list));
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // handle set stars and get start in localStorage
  useEffect(() => {
    if (movieshow.imdbID != undefined) {
      // get from server in local and set
      const array = JSON.parse(localStorage.getItem("starsMovie"));
      let [item] = array.filter((item) => item.id.toLowerCase().includes(movieshow.imdbID));
      if (item == undefined) return;
      if (item.length == 0) {
        setStatusStars({});
        setStatusRate(false);
      } else {
        setStatusStars(item);
        setStatusRate(true);
      }
    }
  }, [movieshow.imdbID]);
  return (
    <div className={styles.mainBox}>
      {Object.keys(movieshow).length == 0 ? (
        <div className={styles.loadingGif}>
          <div className={styles.three_body}>
            <div className={styles.three_body__dot}></div>
            <div className={styles.three_body__dot}></div>
            <div className={styles.three_body__dot}></div>
          </div>
        </div>
      ) : (
        <>
          <img
            className={styles.posterBox}
            src={
              posterBack.poster_path == undefined
                ? ""
                : `https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${posterBack.poster_path
                  .split("/")
                  .join("")}&w=2048&q=75`
            }
            alt=""
          />
          <div className={styles.shodowMainBox}></div>
          <img onClick={handleCloseDetailMovie} className={styles.arrowIcon} src={arrow} alt="arrow-icon" />
          <div className={styles.detailMovie}>
            <h1>{myList.Title}</h1>
            <div className={styles.timeandsec}>
              <p>{movieshow.Genre}</p>
              <p className={styles.breackTopIntext}>|</p>
              <p>{movieshow.Runtime}</p>
              <p className={styles.breackTopIntext}>|</p>
              <p className={styles.imdbRate}>⭐️ {movieshow.imdbRating}</p>
              <p className={styles.breackTopIntext}>|</p>
              <p>{movieshow.Year}</p>
            </div>
            <div className={styles.boxDetMovie}>
              <p>خلاصه فیلم :</p>
              <p className={styles.textDetailMovie}>{movieshow.Plot}</p>
            </div>
            <div className={styles.rateRightPage}>
              <div className={styles.yourRate}>
                <div style={{ display: !loading ? "flex" : "none" }} className={`${styles.subandpop} ${styles.loadwave}`}>
                  {logedinStatus ? (
                    watchlist.includes(myList.imdbID) ? (
                      <>
                        <img src={bookadd} alt="add" />
                        <p>به لیست تماشای شما اضافه شده</p>
                      </>
                    ) : (
                      <>
                        <img src={listaddimg} alt="add" />
                        <p onClick={postToWatchList}>افزودن به لیست تماشا</p>
                      </>
                    )
                  ) : (
                    <Link className={styles.whatchlist} to="/signin">
                      برای افزودن فیلم به لیست تماشا وارد حساب خود شوید
                    </Link>
                  )}
                </div>
                <div style={{ display: loading ? "block" : "none" }} className={styles.three_body}>
                  <div className={styles.three_body__dot}></div>
                  <div className={styles.three_body__dot}></div>
                  <div className={styles.three_body__dot}></div>
                </div>
              </div>
            </div>
            {/* image actors */}
            <p className={styles.boxBazigaran}>بازیگران :</p>
            <div className={styles.imageActors}>
              <Swiper
                effect={"freemode"}
                grabCursor={true}
                centeredSlides={false}
                slidesPerView={"auto"}
                freeMode
                // autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
                modules={[FreeMode]}
                className="mySwiper"
              >
                {actors.map((ele, i) => {
                  if (ele.profile_path == null) return;
                  return (
                    <SwiperSlide className={styles.swiperActors} key={i}>
                      <LazyLoad width={20} threshold={0.5} onContentVisible={() => { console.log('loaded!') }}>
                        <img
                          onClick={handleClickActor}
                          data-idactor={ele.name}
                          src={`${process.env.VITE_URL_IMAGES
                            }/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${ele.profile_path
                              .split("/")
                              .join("")}&w=2048&q=75`}
                          alt=""
                        />
                      </LazyLoad>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowSearchMovie;
