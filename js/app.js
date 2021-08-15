Vue.component('todo-footer', {
  template: '<p>This is another global child component</p>',
})

const todoList = {
  template: '<p>This is another local child component</p>',
}

const app = new Vue({
  el: '#app',
  data() {
    return {
      message: 'This is a parent component',
    }
  },

  components: {
    'todo-list': todoList,
  },
})
