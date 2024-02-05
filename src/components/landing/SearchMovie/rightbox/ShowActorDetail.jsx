/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ShowActor.module.scss";
import arrow from "../../../../assets/landing/arrow-up.svg";
import infGif from "../../../../assets/landing/infinity.gif";
// eslint-disable-next-line react/prop-types
function ShowActorDetail({ actorId, backArrow, backImdbId }) {
  const [actor, setActor] = useState({});
  const [deepActor, setDeepActor] = useState({});
  const [loading, setLoading] = useState(false);
  const sendReqIdAcotr = (person_id) => {
    setLoading(false);
    const options = {
      method: "GET",
      url: `${process.env.VITE_URL_TMDB}/3/person/${person_id}`,
      params: { include_adult: "false", language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: process.env.VITE_KEY_TMDB,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        axios
          .post(`${process.env.VITE_API_URL}/api/v1/translate/`, response.data)
          .then((data) => {
            setDeepActor(data.data);
            setLoading(true);
          })
          .catch(() => {
            setDeepActor(response.data);
            setLoading(true);
          });
      })
      .catch(function (error) {
        setLoading(true);
        console.error(error);
      });
  };
  useEffect(() => {
    setDeepActor({});
    const options = {
      method: "GET",
      url: `${process.env.VITE_URL_TMDB}/3/search/person`,
      params: { query: actorId, include_adult: "true", language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: process.env.VITE_KEY_TMDB,
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

  const handleCloseDetailActor = () => {
    backArrow("");
    // backImdbId("");
  };

  const handleKnowsMovie = (ele) => {
    const idMovie = ele.target.dataset.tab;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.VITE_KEY_TMDB,
      },
    };

    fetch(`${process.env.VITE_URL_TMDB}/3/${ele.target.dataset.how}/${idMovie}?language=en-US&append_to_response=external_ids`, options)
      .then((response) => response.json())
      .then((response) => backImdbId(response.external_ids.imdb_id))
      .catch(() => backImdbId(""));
  };

  return (
    <div className={styles.container}>
      {!loading ? (
        <div className={styles.loadingGif}>
          <img src={infGif} alt="loading" />
        </div>
      ) : (
        <>
          <div className={styles.containerBackimg}>
            <img
              className={styles.backImg}
              src={
                actor.profile_path == undefined
                  ? ""
                  : `${process.env.VITE_URL_IMAGES}/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${actor.profile_path
                      .split("/")
                      .join("")}&w=2048&q=75`
              }
              alt=""
            />
          </div>
          <img onClick={handleCloseDetailActor} className={styles.arrowIcon} src={arrow} alt="arrow-icon" />
          <div className={styles.actorBox}>
            <div className={styles.actorDet}>
              <img
                className={styles.backImg}
                src={
                  actor.profile_path == undefined
                    ? ""
                    : `${process.env.VITE_URL_IMAGES}/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${actor.profile_path
                        .split("/")
                        .join("")}&w=2048&q=75`
                }
                alt=""
              />
              <div className={styles.actorNameBorn}>
                <p>{deepActor.name}</p>
                {console.log(deepActor)}
                {/* <p>{`${new Date().getFullYear() - deepActor.birthday.split("-")[0]} ساله`}</p> */}
                <p>{deepActor.birthday}</p>
                <p>{deepActor.place_of_birth}</p>
              </div>
            </div>
            <div className={styles.biography}>
              <h2>بیوگرافی :</h2>
              <p>{deepActor.biography ? deepActor.biography : "در دسترس نیست"}</p>
            </div>
            <div className={styles.knownby}>
              <h2>فیلم های معروف :</h2>
              <div className={styles.knownmovies}>
                {actor.known_for.map((ele, key) => {
                  return (
                    <div key={key}>
                      <img
                        onClick={handleKnowsMovie}
                        src={`${process.env.VITE_URL_IMAGES}/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${ele.poster_path
                          .split("/")
                          .join("")}&w=2048&q=75`}
                        alt={ele.id}
                        data-tab={ele.id}
                        data-how={ele.name ? "tv" : "movie"}
                      />
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
