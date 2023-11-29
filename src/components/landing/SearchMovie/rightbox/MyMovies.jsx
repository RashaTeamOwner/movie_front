/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Mymovies.module.scss";
function MyMovies() {
  const tempWatchedData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     url: "https://api.themoviedb.org/3/movie/346698/credits",
  //     params: { language: "en-US" },
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {})
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }, []);

  const [watched, setWatched] = useState(tempWatchedData);

  const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const sum = (arr) => arr.reduce((acc, cur) => acc + cur);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = sum(watched.map((movie) => movie.runtime));

  return (
    <div>
      {
        <>
          <div className={styles.summary}>
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{tempWatchedData.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className={styles.list}>
            {watched.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      }
    </div>
  );
}

export default MyMovies;

// ------------------------search by genre
// const options = {
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
//   },
// };

// axios
//   .get(`https://api.themoviedb.org/3/discover/movie?with_genres=${12}`, options)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// ------------------------catch id movie and send id to ->

// const options = {
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
//   },
// };

// axios
//   .get("https://api.themoviedb.org/3/movie/346698?language=en-US", options)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// and get idImdb and send req with idImdb to ->
// http://www.omdbapi.com/?i=tt1517268

// search by imdb id
// const options = {
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
//   },
// };

// axios
//   .get("https://api.themoviedb.org/3/find/tt1517268?external_source=imdb_id", options)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// search person with name
// const idact = element.target.dataset.idactor;
// const options = {
//   method: "GET",
//   url: "https://api.themoviedb.org/3/search/person",
//   params: { query: idact, include_adult: "false", language: "en-US", page: "1" },
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data.results[0]);
//     // pass to detailActor
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
