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

**아코디언 컴포넌트 요구사항**

1. 한가지 요소를 열면 열려있는 다른 요소는 닫힌다.
2. 동시에 모든 요소들은 독립적으로 구성되어야 하며, 원하는대로 스타일링 할 수 있어야 한다.
3. 요소에 전달되는 어떠한 내용도 유연하게 받을 수 있어야 한다.

<br />

### 1. 파일 구성하기

**1. 래퍼컴포넌트가 될 Accordian.jsx**

- 해당 컴포넌트는 아코디언 컴포넌트의 가장 부모요소격인 래핑 컴포넌트로써 역할을 담당하게 된다.
- 기본적으로 목록을 출력하므로, wraaper는 `ul`요소가 되며, 핵심은 아코디언 래핑 컴포넌트는 내부 구현로직을 몰라도 되는 점이다.

- 이후 `App.jsx`에서 만든 아코디언 컴포넌트를 렌더하게되는데, 해당 컴포넌트와 함께 더 많은 아코디언 컴포넌트를 만들어 그 컴포넌들을 내부에서 출력해야하는게 목표이다.

![alt text](/public/docs/assets/docs-1.png)

**2. AccordianItem.jsx**

- 일단 기본적으로 `className`, `title`, `children`을 `props`로 받는 컴포넌트로 구성한다.

![alt text](/public/docs/assets/docs-2.png)

<br />

### 1-1 이제 생긴 문제점은 뭘까?

**children 프롭은 쉽게 상호작용하기 어렵다**

- 컴포넌트 내부에서 렌더링하는 것이 아닌 그저 전달만 하는 역할을 하기 때문에

**createContext**

- 이를 해결하기위해 `context API`를 사용할 것이다.
- 먼저 `createContext`로 래퍼 아코디언 컴포넌트 상단에 `AccordionContext` 변수를 `createContext`로 생성한다.

![alt text](/public/docs/assets/docs-3.png)

- 이제 여기서 기존 `ul`태그를 반환하는 대신 `AccordionContext.Provider`로 래핑해 `ul`요소를 반환한다.

![alt text](/public/docs/assets/docs-4.png)

- 이후 만든 `Context.Provider`엔 `value` 속성이 필수적으로 전달되어야 한다.

  - 이유는 컨텍스트를 통해 자식 컴포넌트에 전달하려는 데이터를 명시적으로 지정해줘야 하기 때문이다.
  - `value`를 통해 데이터가 제공되지 않는다면, 자식 컴포넌트들이 예상한 데이터를 받지 못해 오류를 발생시키거나 예상치못한 동작을 할 수 있다.

- 이제 여기서 설정될 `value`는 아코디언 컴포넌트에 의해 관리될 것이다.
  - `useState`로 상태를 정의하고 `id`값을 인자로 전달받는 `openItem`, 상태를 초기화하는(=아코디언을 닫는) `closeItem` 함수를 구현후 `contextValue` 객체에 전달 후 `value` 프로퍼티에 내보낸다.

![alt text](/public/docs/assets/docs-5.png)

<br />

**이후, Accoridian 컴포넌트 내부에서 useAccordionContext 커스텀훅을 만들어 사용자가 쉽게 해당 콘텍스트에 접근할 수 있도록 만든다.**

![alt text](/public/docs/assets/docs-6.png)

<br />

**AccordianItem 컴포넌트에서 리턴한 contextValue를 사용할 수 있게되는데 구조분해할당을 통해 획득한다.**

- `isOpen` 상태는 `openItemId`값과 `props` 전달되는 `id`가 같은지여부를 판단하는 불리언이다.

```jsx
import {useAccordionContext} from "./Accordian";

function AccordianItem({id, className, title, children}) {
  const {openItemId, openItem, closeItem} = useAccordionContext();

  const isOpen = openItemId === id;

  return (
    <li className={className}>
      <h3>{title}</h3>
      <div className={isOpen ? "open" : ""}>{children}</div>
    </li>
  );
}

export default AccordianItem;
```

<br />

**가져온 openItem과 closeItem 함수를 기반으로 아코디언이 토글될 수 있도록 관련 `CSS`를 구성하고 로직을 작성한다.**

![alt text](/public/docs/assets/docs-7.png)

<br />

```css
.close {
  display: none;
}

.open {
  display: block;
}
```

<br />

**여기서 리팩토링을 진행하자면, 아래 두개의 함수를 그룹화해서 하나의 함수로 만들 수 있다.**

```js
/* Accordian.jsx => before */

const openItem = (id) => {
  setOpenItemId(id);
};

const closeItem = () => {
  setOpenItemId(null);
};
```

**리팩토링한 toggleItem 함수**

- 파라미터로 id를 받으며, 전달된 id와 현재 itemId가 같다면 다시 클릭시 해당 아이템을 닫기 위해 `null`로 설정하고, 전달된 id가 다르다면 전달된 Id를 `openItemId` 상태로 업데이트한다.

```js
/* Accordian.jsx => after */

const toggleItem = (id) => {
  setOpenItemId((prevItemId) => (prevItemId === id ? null : id));
};
```

- `AccordianItem` 컴포넌트도 이제 `toggleItem`을 리턴하니 `toggleItem`을 받도록 고치고 로직도 수정한다
  - 아래는 최종적으로 수정된 `Accordian` 컴포넌트이다.

```jsx
const AccordionContext = createContext();

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("아코디언 컨텍스트는 Accoodian 컴포넌트로 래핑해야합니다.");
  }

  return context;
}

function Accordian({children, className}) {
  const [openItemId, setOpenItemId] = useState();

  const toggleItem = (id) => {
    setOpenItemId((prevItemId) => (prevItemId === id ? null : id));
  };

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}
```

<br />
<br />

### Accordian컴포넌트와 AccordianItem 컴포넌트 하나의 아코디언 컴포넌트 파일 내부에서 관리하기

**일반적으로 합성 컴포넌트 패턴에서 모든 컴포넌트에 대해서 식별자를 하나의 객체로 합쳐 관리하게 된다.**

- 이를 위해 아코디언 컴포넌트에 `Item` 프로퍼티를 추가함으로 `Item`이라는 키값으로 `AccordianItem` 컴포넌트에 접근할 수 있게 된다.

![alt text](/public/docs/assets/docs-8.png)

<br />

- 그렇게 되면 이제 더이상 App.js에서도 `AccordianItem` 컴포넌트를 import할 필요없이 `Accordian.Item`으로 기존 `AccordianItem` 에 접근할 수 있게된다.

![alt text](/public/docs/assets/docs-9.png)
