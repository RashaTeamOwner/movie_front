import styles from "./NotFoundPage.module.scss";
function NotFoundPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.error404}>
        <h1>404</h1>
        <p>صفحه مورد نظر وجود ندارد</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
