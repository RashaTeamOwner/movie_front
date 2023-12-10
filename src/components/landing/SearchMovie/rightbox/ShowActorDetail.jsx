import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ShowActor.module.scss";
import arrow from "../../../../assets/landing/arrow-up.svg";
import infGif from "../../../../assets/landing/infinity.gif";
// eslint-disable-next-line react/prop-types
function ShowActorDetail({ actorId, backArrow, backImdbId }) {
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
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [actorId]);

  const handleCloseDetailActor = () => {
    backArrow("");
    backImdbId("");
  };

  const handleKnowsMovie = (ele) => {
    const idMovie = ele.target.dataset.tab;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDE3MTk4NDI4ZDkxZGZiYThlNWU1YTQ1OWU1Mjc1MiIsInN1YiI6IjY1MTkzMmYxYTE5OWE2MDBlMWZjN2JlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjZkw5ryAz3bt9Jf-TRCmW947WKGwgTAze3TrsfGDRU",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => backImdbId(response.imdb_id))
      .catch(() => backImdbId(""));
  };

  return (
    <div className={styles.container}>
      {Object.keys(actor).length == 0 ? (
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
                  : `https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${actor.profile_path
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
                    : `https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${actor.profile_path
                        .split("/")
                        .join("")}&w=2048&q=75`
                }
                alt=""
              />
              <div className={styles.actorNameBorn}>
                <p>میشل ویلیامز</p>
                {/* <p>{`${new Date().getFullYear() - deepActor.birthday.split("-")[0]} Yo`}</p> */}
                <p>29 ساله</p>
                <p>کالیسپل مونتانا , آمریکا</p>
              </div>
            </div>
            <div className={styles.biography}>
              <h2>بیوگرافی :</h2>
              <p>
                میشل اینگرید ویلیامز (زاده 9 سپتامبر 1980) یک هنرپیشه اهل ایالات متحده آمریکا است. او که عمدتاً به خاطر بازی در فیلم‌های
                مستقل در مقیاس کوچک با مضامین تاریک یا تراژیک شناخته می‌شود، جوایز مختلفی از جمله دو جایزه گلدن گلوب و یک جایزه امی پرایم
                تایم، علاوه بر نامزدی پنج جایزه اسکار و یک جایزه تونی دریافت کرده است. ویلیامز، دختر سیاستمدار و تاجر لری آر. ویلیامز، کار
                خود را با حضور مهمان در تلویزیون آغاز کرد و اولین فیلم خود را در فیلم خانوادگی Lassie در سال 1994 انجام داد. او در پانزده
                سالگی از دست والدین خود رهایی یافت و به زودی به خاطر نقش آفرینی خود به شهرت رسید. نقش در مجموعه تلویزیونی درام نوجوان داوسون
                کریک (1998-2003). پس از آن، فیلم‌های کم‌رنگی دنبال شد، قبل از اینکه او با فیلم درام «کوهستان شکسته» (2005) به موفقیت دست
                پیدا کرد. ویلیامز به خاطر بازی در نقش زنانی که از نظر عاطفی با فقدان یا تنهایی کنار می‌آیند در درام‌های مستقل وندی و لوسی
                (2008)، ولنتاین آبی (2010) و منچستر کنار دریا (2016) مورد تحسین منتقدان قرار گرفت. او برنده دو گلدن گلوب برای ایفای نقش
                مرلین مونرو در درام هفته من با مرلین (2011) و گوئن وردون در مینی سریال Fosse/Verdon (2019) شد، علاوه بر این جایزه امی پرایم
                تایم برای دومی دریافت کرد. پردرآمدترین اکران او با فیلم هیجان انگیز Shutter Island (2010)، فیلم فانتزی Oz the Great and
                Powerful (2013)، موزیکال The Greatest Showman (2017) و فیلم های ابرقهرمانی Venom (2018) و Venom: Let There Be بود. قتل عام
                (2021). ویلیامز همچنین کارگردانی فیلم‌های بزرگ استودیویی، مانند فیلم جنایی ریدلی اسکات، همه پول‌های جهان (2017) و درام
                استیون اسپیلبرگ The Fabelmans (2022) را بر عهده داشته است. در برادوی، ویلیامز در احیای موزیکال کاباره در سال 2014 و درام بلک
                برد در سال 2016 بازی کرد، که برای آن نامزدی جایزه تونی برای بهترین بازیگر زن در یک نمایشنامه را دریافت کرد. او مدافع حقوق
                برابر در محل کار است. ویلیامز که دائماً در مورد زندگی شخصی خود خصوصی است، یک دختر از رابطه خود با بازیگر هیث لجر دارد و برای
                مدت کوتاهی با فیل الوروم موسیقیدان ازدواج کرد. او از شوهر دومش، کارگردان تئاتر توماس کیل، دو فرزند دارد.
              </p>
            </div>
            <div className={styles.knownby}>
              <h2>فیلم های معروف :</h2>
              <div className={styles.knownmovies}>
                {actor.known_for.map((ele, key) => {
                  return (
                    <div key={key}>
                      <img
                        onClick={handleKnowsMovie}
                        src={`https://suggestream.com/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw780%2F${ele.poster_path
                          .split("/")
                          .join("")}&w=2048&q=75`}
                        alt={ele.id}
                        data-tab={ele.id}
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
