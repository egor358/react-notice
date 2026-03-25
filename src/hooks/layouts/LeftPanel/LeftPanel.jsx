import React from "react";
import styles from "./LeftPanel.module.css";
export const LeftPanel = ({ children }) => {
  return <aside className={styles["left-panel"]}>{children}</aside>;
};
