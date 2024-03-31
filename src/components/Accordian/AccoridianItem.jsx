import {useAccordianContext} from "./Accordian";

function AccoridianItem({id, className, title, children}) {
  const {openItemId, openItem, closeItem} = useAccordianContext();

  const isOpen = openItemId === id;

  const handleToggleAccoridian = () => {
    if (isOpen) {
      closeItem();
    } else {
      openItem(id);
    }
  };

  return (
    <li className={className}>
      <h3 onClick={handleToggleAccoridian}>{title}</h3>
      <div className={isOpen ? "oepn" : "close"}>{children}</div>
    </li>
  );
}

export default AccoridianItem;
