
import styles from "./ListNotice.module.css";

export const ListNotice = ({ title, date, text, tag }) => {
  return (
    <div className={styles["journal-item"]}>
      <h2 className={styles["journal-item__header"]}>Title: {title}</h2>
      <div className={styles["journal-item__body"]}>
        <div className={styles["journal-item__date"]}>Data: {date}</div>
        <div className={styles["journal-item__text"]}>Text: {text}</div>
        <div className={styles["journal-item__tag"]}>Tags: {tag}</div>
      </div>
    </div>
  );
};
