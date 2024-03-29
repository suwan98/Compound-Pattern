import {useAccordionContext} from "./Accordian";
import {useAccordianItemContext} from "./AccordianItem";

function AccordianTitle({className, children}) {
  const {toggleItem} = useAccordionContext();

  const id = useAccordianItemContext();

  const handleClick = () => {
    toggleItem(id);
  };

  return (
    <>
      <h3 className={className} onClick={handleClick}>
        {children}
      </h3>
    </>
  );
}

export default AccordianTitle;
