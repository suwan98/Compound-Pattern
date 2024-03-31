import Accordian from "./components/Accordian/Accordian";
import AccoridianItem from "./components/Accordian/AccoridianItem";
import Lorem from "./components/Lorem";

function App() {
  return (
    <main>
      <section>
        <Accordian className="accordion">
          <AccoridianItem
            className="accordion-item"
            title="아코디언 1"
            id="accordian-1">
            <Lorem />
          </AccoridianItem>
        </Accordian>
        <Accordian className="accordion">
          <AccoridianItem
            className="accordion-item"
            title="아코디언 2"
            id="accordian-2">
            <Lorem />
          </AccoridianItem>
        </Accordian>
      </section>
    </main>
  );
}

export default App;
