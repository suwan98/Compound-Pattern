import Accordian from "./components/Accordian/Accordian";
import Lorem from "./components/Lorem";

function App() {
  return (
    <main>
      <section>
        <Accordian className="accordion">
          <Accordian.Item
            className="accordion-item"
            title="아코디언 1"
            id="accordian-1">
            <Lorem />
          </Accordian.Item>
        </Accordian>
        <Accordian className="accordion">
          <Accordian.Item
            className="accordion-item"
            title="아코디언 2"
            id="accordian-2">
            <Lorem />
          </Accordian.Item>
        </Accordian>
      </section>
    </main>
  );
}

export default App;
