/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import starimg from "../../../../assets/landing/star-solid.svg";
import arrow from "../../../../assets/landing/arrow-up.svg";
import axios from "axios";
import styles from "./Showsearchmovie.module.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ShowSearchMovie(props) {
  const KEY = "6502fbb3";
  const refStars = useRef(null);
  const [stars, setStars] = useState(null);
  const [renderStars, setRenderStars] = useState(null);
  const [movieshow, setMovieshow] = useState([]);
  const [posterBack, setPosterBack] = useState([]);
  const [actors, setActors] = useState([]);

  // // test
  // const keyGoogle = "AIzaSyA-o4brgpVDcXeyOnTuB1kzAGikB228I98";
  // const [trGoogle, setTrGoogle] = useState("");
  // useEffect(() => {
  //   // ترجمه متن به فارسی
  //   const translateText = async () => {
  //     const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${keyGoogle}`, {
  //       q: trGoogle,
  //       target: "fa",
  //     });

  //     setTrGoogle(response.data.data.translations[0].translatedText);
  //   };

  //   translateText().then(() => console.log(trGoogle));
  // }, [actors]);

  const KEYtmdb =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU";
  // image actors
  useEffect(() => {
    if (movieshow.Actors == undefined) return;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: KEYtmdb,
      },
    };

    axios
      .get(`https://api.themoviedb.org/3/find/${movieshow.imdbID}?external_source=imdb_id&append_to_response=credits`, options)
      .then((response) => {
        if (response.data.movie_results[0] != undefined) {
          setPosterBack(response.data.movie_results[0]);
          console.log(response.data);
          return ["movie", response.data.movie_results[0].id];
        } else if (response.data.tv_results[0] != undefined) {
          setPosterBack(response.data.tv_results[0]);
          return ["tv", response.data.tv_results[0].id];
        }
      })
      .then((data) => {
        axios
          .get(`https://api.themoviedb.org/3/${data[0]}/${data[1]}?&append_to_response=credits`, options)
          .then((response) => {
            setActors(response.data.credits.cast);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieshow]);

  useEffect(() => {
    setStars(-1);
    setRenderStars(0);
    setMovieshow([]);
    setPosterBack([]);
    setActors([]);

    const sendId = props.id;
    if (sendId == "") return;
    axios
      .get(`http://www.omdbapi.com/?i=${sendId}&apikey=${KEY}`)
      .then((res) => {
        setMovieshow(res.data);
      })
      .catch((error) => {
        console.log(error);
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

  // -----start stars ----- //
  useEffect(() => {
    if (refStars.current == null) return;
    const starelement = refStars.current.children;
    for (let j = 9; j >= stars + 1; j--) {
      starelement[j].style.filter = "none";
    }
    for (let i = 0; i <= stars; i++) {
      let element = starelement[i];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
  }, [stars]);
  const handleStars = (event) => {
    const list = event.target.parentElement.children;
    setRenderStars(Number(event.target.dataset.set) + 1);
    for (let j = 9; j >= Number(event.target.dataset.set); j--) {
      list[j].style.filter = "none";
    }
    for (let i = 0; i <= Number(event.target.dataset.set); i++) {
      let element = list[i];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
  };
  const handleResetStars = (event) => {
    const list = event.target.parentElement.children;
    setRenderStars(stars + 1);
    // reset stars to select item
    for (let j = 9; j >= stars + 1; j--) {
      list[j].style.filter = "none";
    }
    for (let i = 0; i <= stars; i++) {
      let element = list[i];
      element.style.filter = "invert(64%) sepia(68%) saturate(1071%) hue-rotate(355deg) brightness(101%) contrast(103%)";
    }
  };
  const selectStar = (event) => {
    setStars(Number(event.target.dataset.set));
  };
  // -----end stars ----- //

  return (
    <div className={styles.mainBox}>
      {movieshow.Poster == undefined ? (
        <p className={styles.loader}>... صبر کنید</p>
      ) : (
        <>
          <img
            className={styles.posterBox}
            src={posterBack == undefined ? movieshow.Poster : `https://www.themoviedb.org/t/p/w1280${posterBack.poster_path}`}
            alt=""
          />
          <div className={styles.shodowMainBox}></div>
          <img onClick={handleCloseDetailMovie} className={styles.arrowIcon} src={arrow} alt="arrow-icon" />
          <div className={styles.detailMovie}>
            {/* <h1>{movieshow.Title}</h1> */}
            <h1>مرد عنکبوتی</h1>
            {/* <div className={styles.timeandsec}>
              <p>{movieshow.Genre}</p>
              <p>{movieshow.Runtime}</p>
            </div> */}
            <div className={styles.timeandsec}>
              <p>اکشن ، علمی تخیلی</p>
              <p className={styles.breackTopIntext}>|</p>
              <p>121 دقیقه</p>
              <p className={styles.breackTopIntext}>|</p>
              <p className={styles.imdbRate}>⭐️ {movieshow.imdbRating}</p>
              <p className={styles.breackTopIntext}>|</p>
              <p>2012</p>
            </div>
            {/* <p className={styles.imdbRate}>⭐️ {movieshow.imdbRating} IMDb rating</p>
            <p className={styles.textDetailMovie}>{movieshow.Plot}</p>
            <div className={styles.rateRightPage}>
              <div className={styles.yourRate}>
                <div className={styles.subandpop}>
                  <p>your rating :</p>
                  {stars == -1 ? <></> : <button className={styles.whatchlist}>+ Add To Watched Movies</button>}
                </div>
                <div className={styles.numberStar}>
                  <div ref={refStars}>
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
                  </div>
                  {renderStars == 0 ? <p></p> : <p>{renderStars}</p>}
                </div>
              </div>
            </div> */}
            <div className={styles.boxDetMovie}>
              <p>خلاصه فیلم :</p>
              <p className={styles.textDetailMovie}>
                یک نوجوان خجالتی پس از گزیده شدن توسط یک عنکبوت اصلاح شده ژنتیکی، در برابر توانایی های عنکبوت مانندی که از آنها برای مبارزه
                با بی عدالتی به عنوان یک ابرقهرمان نقابدار استفاده می کند و با دشمن انتقام جو روبرو می شود.
              </p>
            </div>
            <div className={styles.rateRightPage}>
              <div className={styles.yourRate}>
                <div className={styles.subandpop}>
                  <p>امتیاز شما :</p>
                  {stars == -1 ? (
                    <></>
                  ) : (
                    <Link className={styles.whatchlist} to="/signin">
                      افزودن به لیست فیلم های موردعلاقه
                    </Link>
                  )}
                </div>
                <div className={styles.numberStar}>
                  <div ref={refStars}>
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
                  </div>
                  {renderStars == 0 ? <p></p> : <p>{renderStars}</p>}
                </div>
              </div>
            </div>
            {/* image actors */}
            <p className={styles.boxBazigaran}>بازیگران :</p>
            <div className={styles.imageActors}>
              {actors.map((ele, i) => {
                if (ele.profile_path == null) return;
                return (
                  <img
                    onClick={handleClickActor}
                    data-idactor={ele.name}
                    key={i}
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${ele.profile_path}`}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowSearchMovie;
