import React from "react";

export const NoteItems = () => {
  return (
    <div>
      {filterItems.map((item) => (
        <Notice {...item} />
      ))}
    </div>
  );
};
