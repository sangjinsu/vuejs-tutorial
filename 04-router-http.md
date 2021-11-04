# router & http

## view router

- 라우팅은 웹 페이지 간의 이동 방법이다 

```html
  <div id="app">
      <h1>뷰 라우터 예제</h1>
      <p>
        <router-link to="/main">Main</router-link>
        <router-link to="/login">Login</router-link>
      </p>
      <router-view></router-view>
    </div>
```

```js
 const Main = {
        template: '<div>main</div>',
      }
      const Login = {
        template: '<div>login</div>',
      }

      const routes = [
        {
          path: '/main',
          component: Main,
        },
        {
          path: '/login',
          component: Login,
        },
      ]

      const router = new VueRouter({
        routes,
      })

      const app = new Vue({
        router,
      }).$mount('#app')
```

- `$mount()` API 
  - el 속성과 동일하게 인스턴스를 화면에 붙이는 역할을 한다
  - 강제로 인스턴스를 화면에 붙인다
  - 뷰 라우터 공식 문서에서 사용하는 방식이다

## Nested Router

````html
<div id="app">
      <router-view></router-view>
</div>
````

```js
const User = {
        template: `
          <div>
            User Component
            <router-view></router-view>
          </div>
        `,
      }

      const UserProfile = {
        template: '<p>User Profile Component</p>',
      }
      const UserPost = {
        template: '<p>User Post Component</p>',
      }

      const routes = [
        {
          path: '/user',
          component: User,
          children: [
            {
              path: 'posts',
              component: UserPost,
            },
            {
              path: 'profile',
              component: UserProfile,
            },
          ],
        },
      ]
```

## Names View 

```html
<div id="app">
      <router-view name="header"></router-view>
      <router-view></router-view>
      <router-view name="footer"></router-view>
</div>
```

```js
 	  const Body = {
        template: '<div>This is Body</div>',
      }
      const Header = {
        template: '<div>This is Header</div>',
      }
      const Footer = {
        template: '<div>This is Footer</div>',
      }

      const router = new VueRouter({
        routes: [
          {
            path: '/',
            components: {
              default: Body,
              header: Header,
              footer: Footer,
            },
          },
        ],
      })

```

