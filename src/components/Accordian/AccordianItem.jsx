import {useContext} from "react";
import {createContext} from "react";

const AcordianItemContext = createContext();

export function useAccordianItemContext() {
  const context = useContext(AcordianItemContext);

  if (!context) {
    throw new Error("엘어");
  }

  return context;
}

function AccordianItem({id, className, children}) {
  const AccordianItemValue = {
    id,
  };

  return (
    <AcordianItemContext.Provider value={AccordianItemValue}>
      <li className={className}>{children}</li>
    </AcordianItemContext.Provider>
  );
}

export default AccordianItem;
