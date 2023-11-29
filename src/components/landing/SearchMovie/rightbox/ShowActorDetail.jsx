import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ShowActor.module.scss";
// eslint-disable-next-line react/prop-types
function ShowActorDetail({ actorId }) {
  const [actor, setActor] = useState({});
  const [deepActor, setDeepActor] = useState({});
  const sendReqIdAcotr = (person_id) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/person/${person_id}`,
      params: { include_adult: "false", language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setDeepActor(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    setDeepActor({});
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/person",
      params: { query: actorId, include_adult: "true", language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setActor(response.data.results[0]);
        sendReqIdAcotr(response.data.results[0].id);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [actorId]);
  return (
    <div className={styles.container}>
      {deepActor.id == undefined ? (
        <p className={styles.loader}>Loading...</p>
      ) : (
        <>
          <div className={styles.containerBackimg}>
            <img className={styles.backImg} src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="" />
          </div>
          <div className={styles.actorBox}>
            <div className={styles.actorDet}>
              <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="" />
              <div className={styles.actorNameBorn}>
                <p>{actor.name}</p>
                <p>{`${new Date().getFullYear() - deepActor.birthday.split("-")[0]} Yo`}</p>
                <p>{deepActor.place_of_birth}</p>
              </div>
            </div>
            <div className={styles.biography}>
              <h2>Biography</h2>
              <p>{deepActor.biography}</p>
            </div>
            <div className={styles.knownby}>
              <h2>Known by</h2>
              <div className={styles.knownmovies}>
                {actor.known_for.map((ele, key) => {
                  return (
                    <div key={key}>
                      <img src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} alt={ele.id} />
                      <p>{ele.title == undefined ? ele.original_name : ele.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowActorDetail;
