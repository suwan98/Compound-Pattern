# Compound Component Patterns

<br />
<br />

## Compound Component Pattern (합성 컴포넌트 패턴)

### 합성 컴포넌트 패턴이란?

- 여러 독립적인 컴포넌트들을 조합해, 서로 의존성없이 재사용 가능한 컴포넌트를 만드는 패턴
- 이 패턴으로 컴포넌트 간의 결합도를 낮추고, 유지보수성과 재사용성을 극대화할 수 있게 된다.
- 컴포넌트를 유연하게 구성하고 필요에 따라 쉽게 교체하거나 업데이트를 할수 있다.

<br />
<br />

## 컴파운드 컴포넌트 패턴으로 아코디언 컴포넌트 구축하기

**아코디언 컴포넌트 구성 시 요구사항**

1. 한가지 요소를 열면 열려있는 다른 요소는 닫힌다.
2. 동시에 모든 요소들은 독립적으로 구성되어야 하며, 원하는대로 스타일링 할 수 있어야 한다.
3. 요소에 전달되는 어떠한 내용도 유연하게 받을 수 있어야 한다.

<br />
<br />

### 0. 폴더 구조 구성 / 기본 컴포넌트 생성

- 폴더구조는 components/Accordian 폴더 내부에서 아코디언 컴포넌트 관련로직을 전부 관리한다.
- 기본 구성을 위한 래퍼컴포넌트가 될 Accordian 래퍼 컴포넌트의 아이템이 될 AccordianItem 컴포넌트를 생성한다.
  - 해당 컴포넌트들은 내부의 자원들을 유동적으로 받을 수 있도록 `children` 프로퍼티를 추가했다.
- 이후 `App.jsx`에서 만든 아코디언 컴포넌트를 렌더하게되는데, 해당 컴포넌트와 함께 더 많은 아코디언 컴포넌트를 만들어 그 컴포넌들을 내부에서 출력해야하는게 목표이다.

```jsx

/* 📑 components/Accordian/Accordian.jsx */

function Accordian({children, className}) {
  return (
    <>
      <ul className={className}>{children}</ul>
    </>
  );
}

export default Accordian;


/* 📑 components/Accordian/AccordianItem.jsx */

function AccoridianItem({className, title, children}) {
  return (
    <li className={className}>
      <h3>{title}</h3>
      <div>{children}</div>
    </li>
  );
}

export default AccoridianItem;


```

<br />
<br />
