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
          <h1>جستجوی فیلم ها</h1>
        </div>
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
