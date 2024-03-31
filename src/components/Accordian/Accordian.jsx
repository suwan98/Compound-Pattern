import {useContext} from "react";
import {useState} from "react";
import {createContext} from "react";

const AccordianContext = createContext();

export function useAccordianContext() {
  const context = useContext(AccordianContext);

  if (!context) {
    throw new Error(
      "아코디언 컴포넌트 사용시 반드시 Accordian 컴포넌트 내부에 래핑해야합니다."
    );
  }

  return context;
}

function Accordian({children, className}) {
  const [openItemId, setOpenItemId] = useState(null);

  const openItem = (id) => {
    setOpenItemId(id);
  };

  const closeItem = () => {
    setOpenItemId(null);
  };

  const accoridainContextValue = {
    openItem,
    closeItem,
    openItemId,
  };

  return (
    <AccordianContext.Provider value={accoridainContextValue}>
      <ul className={className}>{children}</ul>
    </AccordianContext.Provider>
  );
}

export default Accordian;
