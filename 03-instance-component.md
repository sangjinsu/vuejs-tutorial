# 인스턴스와 컴포넌트

## 인스턴스

### 인스턴스 옵션 속성

```html
	<div id="app">{{message}}</div>

	<script>
      new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue.js!',
        },
      })
    </script>
```

- 렌더링시 화면이 그려질 위치의 DOM 요소를 지정해야 한다
- 선택자
- template - 화면에 표시할 HTML, CSS 마크업 요소를 정의하는 속성
- methods - 화면 로직 제어, 이벤트와 관련된 메서드를 정의하는 속성
- created - 인스턴스 생성시 실행할 로직 정의하는 속성

### 화면 적용 순서

1. 뷰 라이브러리 파일 로딩
2. 인스턴스 객체 생성
3. 특정 화면 요소에 인스턴스 부착
4. 인스턴스 내용을 화면 요소로 변환
5. 변환된 화면 요소 확인

### 라이프 사이클

- [vuejs 라이프사이클 다이어그램](https://kr.vuejs.org/v2/guide/instance.html#%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8)

  ![](https://kr.vuejs.org/images/lifecycle.png)

```js
      new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue.js!',
        },
        beforeCreate: function () {
          console.log('beforeCreate')
        },
        created: function () {
          console.log('created')
        },
        mounted: function () {
          console.log('mounted')
          this.message = 'Hello World!'
        },
        beforeUpdated: function () {
          console.log('beforeUpdated')
        },
        updated: function () {
          console.log('updated')
        },
      })
```



## 컴포넌트

### 전역 및 지역 컴포넌트

- 지역 컴포넌트는 유효 범위가 설정되어 사용된다
- 이름 표기법은 케말 표기법과 파스칼 표기법이 사용된다 하지만 DOM에 바로 사용할 때는 케말 표기법을 따른다

```html
    <div id="app">
      <h3>component register</h3>
      <my-global-component></my-global-component>
      <my-local-component></my-local-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      Vue.component('my-global-component', {
        template: '<div>전역 컴포넌트가 등록되었습니다</div>',
      })

      const cmp = {
        template: '<div>지역 컴포넌트가 등록되었습니다</div>',
      }

      new Vue({
        el: '#app',
        components: {
          'my-local-component': cmp,
        },
      })
    </script>
```

 ## 컴포넌트 통신

### 컴포넌트 간 통신과 유효 범위

- 컴포넌트로 화면을 구성한다

- 컴포넌트 고유 범위로 인해 서로 데이터 공유가 불가하다

  #### 상하위 컴포넌트 관계

  - 직접 다른 컴포넌트 값을 참조할 수 없다

  - 상위에서 하위로 데이터 전달

    - `propsdata`: props 속성 이름
    - `"message"`:  상위 컴포넌트 데이터 속성

    ```html
    <child-component1 v-bind:propsdata="message2"></child-component1>
    ```

    ```js
    const childComponent1 = {
      props: ['propsdata'],
      template: '<p>{{propsdata}}</p>',
    }
    ```

  - 하위에서 상위로 이벤트 전달

    - `show-log`: 하위 컴포넌트의 이벤트명

    - `printText`: 상위 컴포넌트의 메서드명

    - `this.$emit('show-log')`: 이벤트 발생 로직

      ```html
      <child-component2 v-on:show-log="printText"></child-component2>
      ```

      ```js
      const childComponent2 = {
        template: '<button v-on:click="showLog">show</button>',
        methods: {
          showLog() {
            this.$emit('show-log')
          },
        },
      }
      
      // app methods
        methods: {
          printText() {
            console.log('received an event')
          },
        },
      ```


  #### 같은 레벨 사이의 통신

  - 관계 없는 컴포넌트 간 통신 => 이벤트 버스

  - 컴포넌트가 많아지면 관리가 힘들어진다

  - `created`: created 라이프 사이클 훅에 `eventBus0.$on()` 으로 이벤트를 받는 로직을 선언한다

    ```js
    // event bus: 관계 없는 컴포넌트 간 통신
    const eventBus = new Vue()
    const childComponent3 = {
      template: `
        <div>
          하위 컴포넌트 영역입니다
          <button v-on:click="showLog">show</button>
        </div>`,
      methods: {
        showLog() {
          eventBus.$emit('triggerEventBus', 100)
        },
      },
    }
    
    // app
      created: function () {
        eventBus.$on('triggerEventBus', function (value) {
          console.log('이벤트 전달 받음: ', value)
        })
      },
    ```

    

