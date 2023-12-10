import { useState } from "react";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import styles from "./HandleSearch.module.scss";
import favicon from "../../../assets/landing/favourite.svg";
import searchicon from "../../../assets/landing/search-line.svg";
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
        <div className={styles.favIconBox}>
          <div className={styles.favIcon}>
            <p>بیشترین جستجو</p>
            <img src={searchicon} alt="fav" />
          </div>
          <div className={styles.favIcon}>
            <p>فیلم های مورد علاقه</p>
            <img src={favicon} alt="fav" />
          </div>
        </div>
        <input className={styles.search} type="text" placeholder="جستجو ..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <p className={styles.numresults}>جستجوی فیلم</p>
      </nav>

      <main className={styles.main}>
        <LeftBox querydata={query ? query : "tarifnashode"} backsize={lengthMovies} backIdmovie={handleIdmovie} />
        <RightBox
          id={idmovie}
          backActorKnownToHandleSearch={(data) => {
            setIdmovie(data);
          }}
        />
      </main>
    </>
  );
}
