import {useAccordionContext} from "./Accordian";
import {useAccordianItemContext} from "./AccordianItem";

function AccoridanContent({className, children}) {
  const {openItemId} = useAccordionContext();
  const id = useAccordianItemContext();

  const isOpen = openItemId === id;

  return (
    <>
      <div
        className={isOpen ? `${className ?? ""} open` : `${className} close`}>
        {children}
      </div>
    </>
  );
}

export default AccoridanContent;
