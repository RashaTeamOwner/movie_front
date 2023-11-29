import { useState } from "react";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import styles from "./HandleSearch.module.scss";
export default function App() {
  const [query, setQuery] = useState("");
  const [lengthMovie, setLengthMovie] = useState("");
  const [idmovie, setIdmovie] = useState("");
  const lengthMovies = (data) => {
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
        <div className={styles.logo}>
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className={styles.search}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className={styles.numresults}>
          Found <strong>{lengthMovie ? lengthMovie : 0}</strong> results
        </p>
      </nav>

      <main className={styles.main}>
        <LeftBox querydata={query ? query : "tarifnashode"} backsize={lengthMovies} backIdmovie={handleIdmovie} />
        <RightBox id={idmovie} />
      </main>
    </>
  );
}
