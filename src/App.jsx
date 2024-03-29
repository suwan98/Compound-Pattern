import Accordian from "./components/Accordian/Accordian";
import Lorem from "./components/Lorem";

function App() {
  return (
    <main>
      <section>
        <Accordian className="accordion" id="경험">
          <Accordian.Item className="accordion-item">
            <Accordian.Title className="accordion-item-title">
              20살 이상이요
            </Accordian.Title>
            <Accordian.Content className="accordion-item-content">
              <Lorem />
            </Accordian.Content>
          </Accordian.Item>
          <Accordian.Item className="accordion-item" id="로컬-가이드">
            <Accordian.Title className="accordion-item-title">
              로컬가이드
            </Accordian.Title>
            <Accordian.Content className="accordion-item-content">
              <Lorem />
            </Accordian.Content>
          </Accordian.Item>
        </Accordian>
      </section>
    </main>
  );
}

export default App;
