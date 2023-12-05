import { useState } from "react";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import styles from "./HandleSearch.module.scss";
export default function App() {
  const [query, setQuery] = useState("");
  const [lengthMovie, setLengthMovie] = useState("");
  const [idmovie, setIdmovie] = useState("");
  const lengthMovies = (data) => {
    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
    //   },
    // };

    // fetch("https://api.themoviedb.org/3/configuration/primary_translations", options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
    setLengthMovie(data);
  };
  const handleIdmovie = (id) => {
    const asy = async () => {
      setIdmovie("");
    };
    asy().then(() => {
      setIdmovie(id);
    });
  };
  return (
    <>
      <nav className={styles.navbar}>
        <input className={styles.search} type="text" placeholder="جستجو ..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <p className={styles.numresults}>جستجوی فیلم</p>
      </nav>

      <main className={styles.main}>
        <LeftBox querydata={query ? query : "tarifnashode"} backsize={lengthMovies} backIdmovie={handleIdmovie} />
        <RightBox id={idmovie} />
      </main>
    </>
  );
}
