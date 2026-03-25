import { useState } from "react";
import "./App.css";
import { useLocalStoradge } from "./hooks/use-localstoradge.hooks";
import { LeftPanel } from "./hooks/layouts/LeftPanel/LeftPanel";
import { Body } from "./hooks/layouts/Body/Body";
import { Notice } from "./components/notice/Notice";
import { NoticeAddButton } from "./components/notice add button/NoticeAddButton";
import { NoticeForme } from "./components/notice form/NoticeForme";

function App() {
  const [items, setItems] = useLocalStoradge("data");
  const [selectedItem, setSelectedItem] = useState(null);

  const addNotice = (item) => {
    if (!item.id) {
      setItems([
        ...items,
        {
          ...item,
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems(
        items.map((i) => {
          if (i.id === item.id) {
            return { ...item };
          }
          return i;
        }),
      );
    }

    setSelectedItem(null);
  };

  const deleteNotice = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedItem(null);
  };

  return (
    <>
      <div className="app">
        <LeftPanel>
          <img src="logo.png" alt="logo" />
          <NoticeAddButton onClick={() => setSelectedItem(null)} />
          <Notice
            items={items}
            onSelect={setSelectedItem}
          />
        </LeftPanel>
        <Body>
          <NoticeForme
            data={selectedItem}
            onSubmit={addNotice}
            onDelete={deleteNotice}
          />
        </Body>
      </div>
    </>
  );
}

export default App;
