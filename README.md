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

### 1. Context API로 멀티 컴포넌트 상태 관리하기

**기본 컴포넌트 구성시 생긴 문제점이 존재한다**

- `children` props는 쉽게 상호작용하기 어렵다는 점.
  - 컴포넌트 내부에서 렌더하는게 아닌 그냥 전달만하는 props이기 때문에.

**createContext로 Context 생성하기**

- `React.createContext`는 Context 객체를 만들고 해당 객체를 통해 `Provider`와 `Consumer`를 사용할 수 있다.
- `createContext`로 `Accoridain` 컴포넌트에 대한 Context를 생성한다.

```jsx
/* 📑 components/Accordian/Accordian.jsx */

import {createContext} from "react";

const AccordianContext = createContext();

function Accordian({children, className}) {
  return (
    <>
      <ul className={className}>{children}</ul>
    </>
  );
}

export default Accordian;
```

<br />

- 생성한 Context객체를 기존 `ul`태그를 리턴하는 대신 `AccordianContext.Provider`를 래핑해 리턴한다.

```jsx
/* 📑 components/Accordian/Accordian.jsx */

import {createContext} from "react";

const AccordianContext = createContext();

function Accordian({children, className}) {
  return (
    <AccordianContext.Provider>
      <ul className={className}>{children}</ul>
    </AccordianContext.Provider>
  );
}

export default Accordian;
```

<br />

- Provider는 필수적으로 `value`를 필요로 한다
- 아코디언을 열고/닫는 로직과 아코디언 컴포넌트의 열고 닫힌 상태를 판별하게 될 상태인 `openItemId`를 value로 할당한다.

```jsx
/* 📑 components/Accordian/Accordian.jsx */

import {useState} from "react";
import {createContext} from "react";

const AccordianContext = createContext();

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
```

<br />

- Accordian의 Context를 쉽게 접근하기 위해 `useAccordionContext`라는 커스텀훅을 생성해 관리한다.

```js
export function useAccordianContext() {
  const context = useContext(AccordianContext);

  if (!context) {
    throw new Error(
      "아코디언 컴포넌트 사용시 반드시 Accordian 컴포넌트 내부에 래핑해야합니다."
    );
  }

  return context;
}
```

<br />

- 이제 `AccoridianItem` 컴포넌트 내부에서도 Accordian의 Context를 사용할 수 있게된다.
  - `AccoridianItem` 컴포넌트에 `id` `props`를 추가해 `useAccordianContext`로 가져오는 `openItemId`와 `id`를 비교하는 `isOpen`이라는 파생상태를 추가한다.
- 추가로 가져온 `openItem`과 `closeItem` 함수를 이벤트핸들러에 바인딩한다.

```jsx
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
```

<br />
<br />
