import {useContext} from "react";
import {useState} from "react";
import {createContext} from "react";
import AccordianItem from "./AccordianItem";
import AccordianTitle from "./AccordianTitle";
import AccoridanContent from "./AccoridanContent";

const AccordionContext = createContext();

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("아코디언 컨텍스트는 Accoodian 컴포넌트로 래핑해야합니다.");
  }

  return context;
}

function Accordian({children, className}) {
  const [openItemId, setOpenItemId] = useState();

  const toggleItem = (id) => {
    setOpenItemId((prevItemId) => (prevItemId === id ? null : id));
  };

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordian.Item = AccordianItem;
Accordian.Title = AccordianTitle;
Accordian.Content = AccoridanContent;

export default Accordian;
