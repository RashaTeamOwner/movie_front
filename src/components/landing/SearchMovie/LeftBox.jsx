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
    axios
      .get(`${process.env.VITE_URL_OMDB}/?s=${query}&apikey=${process.env.VITE_KEY_OMDB}`)
      .then((res) => {
        setError("");
        if (res.status != 200) {
          throw new Error("! مشکلی رخ داده است");
        }
        const data = res.data;
        if (data.Response) {
          setMovies(data.Search);
          return data;
        } else {
          return;
        }
      })
      .then((response) => {
        setLoading(true);
        if (query == "tarifnashode" || response.Response == "False") {
          if (response.Response == "False" && query != "tarifnashode") {
            throw new Error(`${response.Error} 😒`);
          } else {
            throw new Error("🔎 جستجوی فیلم");
          }
        } else props.backsize(response.Search.length);
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
            <li data-movie={movie.imdbID} className={styles.SearchMoviesli} onClick={handleDetailMovie} key={movie.imdbID}>
              <img src={movie.Poster} alt={`poster`} />
              <div>
                <h3>{movie.Title}</h3>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
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
