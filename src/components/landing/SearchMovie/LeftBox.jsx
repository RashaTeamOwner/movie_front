/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Leftbox.module.scss";
function LeftBox(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idmovie, setIdmovie] = useState("");

  const query = props.querydata;
  useEffect(() => {
    setLoading(false);
    if (query.length < 3) {
      setMovies([]);
      setError("! تعداد نتایج بالاست");
      return;
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.VITE_KEY_TMDB,
      },
    };
    axios
      .get(`${process.env.VITE_URL_TMDB}/3/search/movie?query=${query}&include_adult=true`, options)
      .then((res) => {
        setError("");
        if (res.status != 200) {
          throw new Error("! مشکلی رخ داده است");
        }
        const data = res.data;
        if (data.total_results) {
          let sorted = data.results.sort((a, b) => {
            return b.vote_count - a.vote_count;
          });
          setMovies(sorted);
          return data;
        } else {
          return;
        }
      })
      .then((response) => {
        setLoading(true);
        if (query == "tarifnashode" || response == undefined) {
          if (response == undefined && query != "tarifnashode") {
            throw new Error(`😒 درست جستجو کن`);
          } else {
            throw new Error("🔎 جستجوی فیلم");
          }
        } else props.backsize(response.total_results);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [props.querydata]);

  useEffect(() => {
    props.backIdmovie(idmovie);
  }, [idmovie]);

  const handleDetailMovie = (event) => {
    const asy = async () => {
      setIdmovie("");
    };
    asy().then(() => {
      setIdmovie(event.target.dataset.movie);
    });
  };

  return (
    <div className={styles.box}>
      {!loading && !error && <p className={styles.loader}>... صبر کنید</p>}
      {loading && !error && (
        <ul className={styles.list}>
          {movies?.map((movie) => (
            <li data-movie={movie.id} className={styles.SearchMoviesli} onClick={handleDetailMovie} key={movie.id}>
              <img
                src={`${process.env.VITE_URL_IMAGES}/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${
                  movie.poster_path ? movie.poster_path : "/".split("/").join("")
                }&w=2048&q=75`}
                alt={`poster`}
              />
              <div>
                <h3>{movie.original_title}</h3>
                <p>
                  <span>🗓</span>
                  <span>{movie.release_date}</span>
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

export default LeftBox;

//     axios
// .get(`${process.env.VITE_URL_OMDB}/?s=${query}&apikey=${process.env.VITE_KEY_OMDB}`)
// .then((res) => {
//   setError("");
//   if (res.status != 200) {
//     throw new Error("! مشکلی رخ داده است");
//   }
//   const data = res.data;
//   if (data.Response) {
//     setMovies(data.Search);
//     return data;
//   } else {
//     return;
//   }
// })
