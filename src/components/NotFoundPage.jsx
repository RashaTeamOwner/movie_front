import styles from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
function NotFoundPage() {
  useEffect(() => {
    document.title = "صفحه یافت نشد";
  }, []);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.error404}>
        <h1>404</h1>
        <p>صفحه مورد نظر وجود ندارد</p>
        <div className={styles.routeToOtherPages}>
          <Link to="/" className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
            صفحه اصلی
          </Link>
          <Link to="/signin" className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`}>
            ورود به حساب
          </Link>
          <a className={`${styles.btn} ${styles.btn_default} ${styles.btn_lg} ${styles.btn3d}`} href="http://92.63.169.226:8080/">
            توسعه دهندگان
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
