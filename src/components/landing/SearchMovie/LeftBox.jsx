/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Leftbox.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import LazyLoad from "react-lazy-load";
function LeftBox(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idmovie, setIdmovie] = useState("");
  const [popList, setPopList] = useState([]);
  const query = props.querydata;

  useEffect(() => {
    if (query == "tarifnashode") {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: process.env.VITE_KEY_TMDB,
        },
      };
      axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options).then((res) => {
        setPopList(res.data.results);
      })
    }
  }, [])

  const getSeries = (query, dataMovies) => {
    if (!query || query === "") return;
    // setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.VITE_KEY_TMDB,
      },
    };

    // get req => tv
    axios
      .get(`${process.env.VITE_URL_TMDB}/3/search/tv?query=${query}&include_adult=false`, options)
      .then((res) => {
        if (res.data.total_results) {
          setError("");
          setLoading(true);
          dataMovies.results.push.apply(dataMovies.results, res.data.results);
          if (dataMovies.total_results) {
            let sorted = dataMovies.results.sort((a, b) => {
              if (b.poster_path == "null") {
                return;
              }
              return b.vote_count - a.vote_count;
            });
            setMovies(sorted);
            return sorted;
          } else {
            return;
          }
        }
      })
      .then((response) => {
        if (query == "tarifnashode" || response == undefined) {
          if (response == undefined && query != "tarifnashode") {
            throw new Error(` درست جستجو کنید`);
          } else {
            throw new Error("🔎 جستجوی فیلم");
          }
        } else {
          props.backsize(response.total_results);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(false);
    if (query.length < 3) {
      setMovies([]);
      setError("! تعداد نتایج بالاست");
      return;
    }
    const options = {
      method: "GET",
      signal: controller.signal,
      headers: {
        accept: "application/json",
        Authorization: process.env.VITE_KEY_TMDB,
      },
    };
    axios
      .get(`${process.env.VITE_URL_TMDB}/3/search/movie?query=${query}&include_adult=false`, options)
      .then((res) => {
        setError("");
        if (res.status != 200) {
          throw new Error("! مشکلی رخ داده است");
        }
        const data = res.data;
        getSeries(query, data);
      })
      .catch(() => {
        return;
      });
    return () => {
      controller.abort();
    };
  }, [props.querydata]);

  useEffect(() => {
    props.backIdmovie(idmovie);
  }, [idmovie]);

  const handleDetailMovie = (event) => {
    const asy = async () => {
      setIdmovie("");
    };
    asy().then(() => {
      const idMovie = event.target.dataset.movie;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: process.env.VITE_KEY_TMDB,
        },
      };

      fetch(`${process.env.VITE_URL_TMDB}/3/${event.target.dataset.how}/${idMovie}?language=en-US&append_to_response=external_ids`, options)
        .then((response) => response.json())
        .then((response) => {
          setIdmovie(response.external_ids.imdb_id);
        })
        .catch(() => setIdmovie(""));
    });
  };


  if (query == "tarifnashode") {
    return <div className={styles.box}>
      <h4>فیلم های پرطرفدار</h4>
      <div className={styles.boxPopularList}>
        <Swiper
          effect={"freemode"}
          grabCursor={true}
          centeredSlides={false}
          freeMode
          modules={[FreeMode]}
          className="mySwiper"
          breakpoints={
            {
              1100: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1140: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1400: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1500: {
                slidesPerView: 5,
                spaceBetween: 10,
              }
            }
          }
        >
          {popList?.map((ele, i) => {
            return (
              <SwiperSlide className={styles.popularList} key={i}>
                <LazyLoad threshold={0.5}>
                  <div key={i}>
                    <img
                      data-idactor={ele.name}
                      src={`${process.env.VITE_URL_IMAGES
                        }/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${ele.poster_path
                          .split("/")
                          .join("")}&w=2048&q=75`}
                      alt="image"
                    />
                    <p>{ele.title}</p>
                  </div>
                </LazyLoad>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>

  } else {
    return (
      <div className={styles.box}>
        {!loading && !error && (
          <div className={styles.loadingBox}>
            <p className={styles.loader}>صبر کنید</p>
            <div className={styles.dots}></div>
          </div>
        )}
        {loading && !error && (
          <ul className={styles.list}>
            {movies?.map((movie) => (
              <li
                data-movie={movie.id}
                data-how={movie.name ? "tv" : "movie"}
                className={styles.SearchMoviesli}
                onClick={handleDetailMovie}
                key={movie.id}
              >
                <img
                  src={`${process.env.VITE_URL_IMAGES}/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${movie.poster_path ? movie.poster_path : "/".split("/").join("")
                    }&w=2048&q=75`}
                  alt={`poster`}
                />
                <div>
                  <h3>{movie.original_title || movie.original_name}</h3>
                  <p>
                    <span>🗓</span>
                    <span>{movie.release_date || movie.first_air_date}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
}

export default LeftBox;
