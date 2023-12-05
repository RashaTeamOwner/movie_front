/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./Rightbox.module.scss";
import MyMovies from "./rightbox/MyMovies";
import ShowSearchMovie from "./rightbox/ShowSearchMovie";
import ShowActorDetail from "./rightbox/ShowActorDetail";
function RightBox(props) {
  const [clickDetail, setClickDetail] = useState(1);
  const [actorId, setActorId] = useState("");
  useEffect(() => {
    setActorId("");
    props.id == "" ? setClickDetail(0) : setClickDetail(1);
  }, [props.id]);

  const backActorId = (id) => {
    setActorId(id);
  };
  return (
    <div className={styles.boxRight}>
      {clickDetail == 0 ? (
        <div>film hay mored alaqat</div>
      ) : actorId == "" ? (
        <ShowSearchMovie
          id={props.id}
          backActorId={backActorId}
          backArrow={(databack) => {
            setClickDetail(databack);
          }}
        />
      ) : (
        <ShowActorDetail actorId={actorId} />
      )}
      {/* <div className={styles.footerBox}>
        <button>Users</button>
        <button>My Movies</button>
        <button>Genres</button>
      </div> */}
    </div>
  );
}

export default RightBox;
