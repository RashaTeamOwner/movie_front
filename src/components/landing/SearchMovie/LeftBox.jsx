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
              if (!b.poster_path) {
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
    axios.get(`${process.env.VITE_URL_TMDB}/3/search/movie?query=${query}&include_adult=false`, options).then((res) => {
      setError("");
      if (res.status != 200) {
        throw new Error("! مشکلی رخ داده است");
      }
      const data = res.data;
      getSeries(query, data);
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
                src={`${process.env.VITE_URL_IMAGES}/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${
                  movie.poster_path ? movie.poster_path : "/".split("/").join("")
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
