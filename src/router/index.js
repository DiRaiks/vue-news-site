import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Registration from '@/components/Registration'
import AllNews from '@/components/AllNews'

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
      name: 'registration',
      component: Registration
    },
    {
      path: '/allnews',
      name: 'all-news',
      component: AllNews
    }
  ]
})
