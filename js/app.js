Vue.component('todo-footer', {
  template: '<p>This is another global child component</p>',
})

const todoList = {
  template: '<p>This is another local child component</p>',
}

const cmp1 = {
  template: '<div>첫 번째 지역 컴포넌트: {{cmp1Data}}</div>',
  data() {
    return {
      cmp1Data: 100,
    }
  },
}

const cmp2 = {
  template: '<div>두 번째 지역 컴포넌트: {{cmp2Data}}</div>',
  data() {
    return {
      cmp2Data: cmp1.data.cmp1Data,
    }
  },
}

const childComponent1 = {
  props: ['propsdata'],
  template: '<p>{{propsdata}}</p>',
}

const childComponent2 = {
  template: '<button v-on:click="showLog">show</button>',
  methods: {
    showLog() {
      this.$emit('show-log')
    },
  },
}

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

// quiz03
const siblingComponent = {
  props: ['siblingdata'],
  template: '<div>{{siblingdata}}</div>',
}

const app = new Vue({
  el: '#app',
  data() {
    return {
      message: 'This is a parent component',
      message2: 'This is a child component',
      message3: 'This is a sibling component',
    }
  },

  components: {
    'todo-list': todoList,
    'my-component1': cmp1,
    'my-component2': cmp2,
    'child-component1': childComponent1,
    'child-component2': childComponent2,
    'child-component3': childComponent3,
    'sibling-component': siblingComponent,
  },

  created: function () {
    eventBus.$on('triggerEventBus', function (value) {
      console.log('이벤트 전달 받음: ', value)
    })
  },

  methods: {
    printText() {
      console.log('received an event')
    },
  },
})
