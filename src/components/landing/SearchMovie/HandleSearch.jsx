import { useRef, useState } from "react";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import styles from "./HandleSearch.module.scss";
import UseWindowSize from "../../../hooks/UseWindowSize";
import { useEffect } from "react";
export default function App() {
  const sizeWidth = UseWindowSize();
  const refMainBox = useRef(null);
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
  useEffect(() => {
    const leftBox = refMainBox.current.children[0];
    const rightBox = refMainBox.current.children[1];
    if (sizeWidth.width < 855) {
      if (query != "") {
        if (idmovie == "") {
          leftBox.style.display = "block";
          rightBox.style.display = "none";
        } else {
          leftBox.style.display = "none";
          rightBox.style.display = "block";
        }
      } else {
        leftBox.style.display = "none";
        rightBox.style.display = "block";
      }
    } else {
      leftBox.style = "";
      rightBox.style = "";
    }
  }, [sizeWidth, query, idmovie]);
  useEffect(() => {
    const leftBox = refMainBox.current.children[0];
    const rightBox = refMainBox.current.children[1];
    if (sizeWidth.width < 855) {
      if (query.length == 0) {
        leftBox.style.display = "none";
        rightBox.style.display = "block";
      } else {
        leftBox.style.display = "block";
        rightBox.style.display = "none";
      }
    } else {
      leftBox.style = "";
      rightBox.style = "";
    }
  }, [sizeWidth, query]);
  return (
    <div className={styles.boxSearch}>
      <nav className={styles.navbar}>
        <input
          className={styles.search}
          type="text"
          placeholder="... جستجوی فیلم"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </nav>

      <main ref={refMainBox} className={styles.main}>
        <LeftBox querydata={query ? query : "tarifnashode"} backsize={lengthMovies} backIdmovie={handleIdmovie} />
        <RightBox
          id={idmovie}
          backActorKnownToHandleSearch={(data) => {
            setIdmovie(data);
          }}
          backIdForReset={(data) => {
            setIdmovie(data);
          }}
        />
      </main>
    </div>
  );
}
