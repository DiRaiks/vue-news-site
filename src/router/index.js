import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Registration from '@/components/RegLogPage'
import AllNews from '@/components/AllNews'
import UserPage from '@/components/UserPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/test',
      name: 'reglogpage',
      component: Registration
    },
    {
      path: '/allnews',
      name: 'all-news',
      component: AllNews
    },
    {
      path: '/user',
      name: 'user-page',
      component: UserPage
    }
  ]
})
