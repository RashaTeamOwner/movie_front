/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react"
import styles from "./MoreDetailMyMovies.module.scss";
import imgbackup from "../../../../assets/landing/upcoming/default.webp";
import closeicon from "../../../../assets/landing/close-bold.svg"
function MoreDetailMyMovies({ movie, close }) {
  const [dmovie, setDmovie] = useState(JSON.parse(movie));
  const closePopupShodow = () => {
    return close()
  }
  if (Object(dmovie).length != 0) {
    return (
      <div
        style={{
          background: dmovie.banner_path == null ? `linear-gradient(45deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.87)), url(${imgbackup})` : `linear-gradient(45deg,rgba(0,0,0,0.63),rgba(0,0,0,0.87)),url("https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${dmovie.banner_path
            .split("/")
            .join("")}&w=2048&q=75`,
        }}
        className={styles.openDetailMovies}
      >
        <img onClick={closePopupShodow} className={styles.closeicon} src={closeicon} alt="close" />
        <div className={styles.popimgMovie}>
          <img className={styles.imageMovie} src={dmovie.image_path == null ? imgbackup : `https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${dmovie.image_path
            .split("/")
            .join("")}&w=2048&q=75`} alt="image" />
          <div>
            <p>
              <span>نام فیلم :</span> {dmovie.name.split(" - ")[0]}
            </p>
            <div>
              <p>{dmovie.country}</p>
              <span>|</span>
              <p>
                <span>محصول</span> {dmovie.year}
              </p>
              <span>|</span>
              <p>{dmovie.genre}</p>
            </div>
            <div>
              <p>
                <span>امتیاز جهانی : </span>{dmovie.imdb_rate}
              </p>
              <span>|</span>
              <p>
                <span>مدت زمان : </span> {dmovie.duration}
              </p>
            </div>
            <p>
              <span>خلاصه فیلم : </span>
              {dmovie.description}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoreDetailMyMovies