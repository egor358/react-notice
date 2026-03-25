import React, { useMemo } from "react";
import styles from "./Notice.module.css";
import { ListNotice } from "../ListNotice/ListNotice";
import CardButton from "../CardButton/CardButton";

export const Notice = ({ items, onSelect }) => {
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(() => [...items].sort(sortItems), [items]);
  return (
    <div className={styles["journal-list"]}>
      {filteredItems.map((item) => (
        <CardButton
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
        >
          <ListNotice {...item} />
        </CardButton>
      ))}
    </div>
  );
};
