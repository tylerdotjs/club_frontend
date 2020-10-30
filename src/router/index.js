import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import Login from '../views/Login.vue'
import NewAccount from '../views/NewAccount'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
      path: '/events',
      name: 'Events',
      component: Events,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/newaccount',
    name: 'NewAccount',
    component: NewAccount,
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
